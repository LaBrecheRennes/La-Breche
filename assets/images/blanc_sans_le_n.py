from PIL import Image, ImageFilter
import numpy as np
import os

def build_arrow_mask(im, white_thresh=245, sat_thresh=30,
                     dog_radius_small=1.2, dog_radius_large=3.0,
                     mask_threshold=12, dilate=1):
    # RGB -> luminance + saturation-like
    arr = np.array(im.convert("RGB"), dtype=np.uint8)
    lum = (0.2126*arr[...,0] + 0.7152*arr[...,1] + 0.0722*arr[...,2]).astype(np.float32)
    maxc = arr.max(axis=2).astype(np.int16)
    minc = arr.min(axis=2).astype(np.int16)
    spread = (maxc - minc).astype(np.float32)
    sat_like = (spread / np.maximum(maxc, 1)) * 255.0

    near_white = (arr[...,0] >= white_thresh) & (arr[...,1] >= white_thresh) & (arr[...,2] >= white_thresh) & (sat_like <= sat_thresh)

    # Difference of Gaussians pour isoler les traits fins clairs
    L1 = Image.fromarray(np.clip(lum,0,255).astype(np.uint8), "L").filter(ImageFilter.GaussianBlur(radius=dog_radius_small))
    L2 = Image.fromarray(np.clip(lum,0,255).astype(np.uint8), "L").filter(ImageFilter.GaussianBlur(radius=dog_radius_large))
    dog = np.array(L1, dtype=np.int16) - np.array(L2, dtype=np.int16)
    dog_mask = dog > mask_threshold

    mask = near_white | dog_mask
    if dilate > 0:
        mask = np.array(Image.fromarray(mask.astype(np.uint8)*255, "L")
                        .filter(ImageFilter.MaxFilter(size=dilate*2+1))) > 127
    return mask

def inpaint_by_neighbor_mean(im, mask, max_iter=400, neighbors=8):
    assert neighbors in (4,8)
    arr = np.array(im.convert("RGBA"), dtype=np.uint8)
    R, G, B, A = [arr[...,i].astype(np.float32) for i in range(4)]
    h, w = R.shape
    target = mask.copy()
    offsets = [(0,1),(1,0),(0,-1),(-1,0)] + ([(1,1),(1,-1),(-1,1),(-1,-1)] if neighbors==8 else [])

    for _ in range(max_iter):
        nonmasked = ~target
        Rp = np.pad(R, ((1,1),(1,1)), mode='edge')
        Gp = np.pad(G, ((1,1),(1,1)), mode='edge')
        Bp = np.pad(B, ((1,1),(1,1)), mode='edge')
        Mp = np.pad(nonmasked.astype(np.float32), ((1,1),(1,1)), mode='constant', constant_values=0.0)

        sumR = np.zeros_like(R); sumG = np.zeros_like(G); sumB = np.zeros_like(B); cnt = np.zeros_like(R)
        for dy, dx in offsets:
            y0, y1 = 1+dy, 1+dy+h; x0, x1 = 1+dx, 1+dx+w
            m = Mp[y0:y1, x0:x1]
            sumR += Rp[y0:y1, x0:x1] * m; sumG += Gp[y0:y1, x0:x1] * m; sumB += Bp[y0:y1, x0:x1] * m
            cnt  += m

        can_fill = target & (cnt > 0)
        if not np.any(can_fill): break

        R[can_fill] = sumR[can_fill] / cnt[can_fill]
        G[can_fill] = sumG[can_fill] / cnt[can_fill]
        B[can_fill] = sumB[can_fill] / cnt[can_fill]
        R = np.clip(np.rint(R),0,255); G = np.clip(np.rint(G),0,255); B = np.clip(np.rint(B),0,255)
        target[can_fill] = False

    return Image.fromarray(np.stack([R.astype(np.uint8), G.astype(np.uint8), B.astype(np.uint8), arr[...,3]], axis=-1), "RGBA")

def auto_crop_white_borders(im, white_thresh=245, sat_thresh=35, max_crop=120):
    arr = np.array(im.convert("RGB"), dtype=np.uint8)
    h, w, _ = arr.shape
    maxc = arr.max(axis=2).astype(np.int16); minc = arr.min(axis=2).astype(np.int16)
    spread = (maxc - minc).astype(np.float32)
    sat_like = (spread / np.maximum(maxc, 1)) * 255.0
    whiteish = (arr[...,0] >= white_thresh) & (arr[...,1] >= white_thresh) & (arr[...,2] >= white_thresh) & (sat_like <= sat_thresh)

    def scan(mask, side):
        cut=0
        if side=="top":
            for y in range(min(max_crop, mask.shape[0])):
                if mask[y].mean()>0.8: cut=y+1
                else: break
        if side=="bottom":
            for i,y in enumerate(range(mask.shape[0]-1,-1,-1)):
                if i>=max_crop: break
                if mask[y].mean()>0.8: cut=i+1
                else: break
        if side=="left":
            for x in range(min(max_crop, mask.shape[1])):
                if mask[:,x].mean()>0.8: cut=x+1
                else: break
        if side=="right":
            for i,x in enumerate(range(mask.shape[1]-1,-1,-1)):
                if i>=max_crop: break
                if mask[:,x].mean()>0.8: cut=i+1
                else: break
        return cut

    t=scan(whiteish,"top"); b=scan(whiteish,"bottom"); l=scan(whiteish,"left"); r=scan(whiteish,"right")
    return im.crop((l,t,w-r,h-b)), (t,b,l,r)

def clean_image_remove_arrow_and_border(input_path, output_path):
    im = Image.open(input_path).convert("RGBA")
    mask = build_arrow_mask(im, white_thresh=245, sat_thresh=35, dog_radius_small=1.0, dog_radius_large=2.8, mask_threshold=11, dilate=1)
    inpainted = inpaint_by_neighbor_mean(im, mask, max_iter=500, neighbors=8)
    cropped, cuts = auto_crop_white_borders(inpainted, white_thresh=245, sat_thresh=35, max_crop=150)
    os.makedirs(os.path.dirname(output_path) or ".", exist_ok=True)
    cropped.save(output_path)
    Image.fromarray((mask.astype(np.uint8)*255), "L").save(os.path.splitext(output_path)[0] + "_mask.png")
    return output_path, cuts

clean_image_remove_arrow_and_border("fond_bleu_rouge_fleche.png","fond_bleu_rouge.png")