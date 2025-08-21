# remove_white_bg.py
from PIL import Image, ImageFilter
import numpy as np
from collections import deque
import os

def remove_white_bg(input_path, output_path,
                    tolerance=15,         # distance à 255 pour considérer "blanc"
                    chroma_tolerance=40,  # dispersion max des canaux (évite de prendre du beige)
                    blur_radius=1.5):     # plume de l’alpha
    """
    Supprime le fond blanc connecté aux bords et exporte en PNG transparent.
    """
    im = Image.open(input_path).convert("RGB")
    arr = np.array(im, dtype=np.uint8)
    h, w, _ = arr.shape

    # Pixels "presque blancs"
    maxc = arr.max(axis=2).astype(np.int16)
    minc = arr.min(axis=2).astype(np.int16)
    spread = (maxc - minc)
    near_white = (minc >= (255 - tolerance)) & (spread <= chroma_tolerance)

    # Flood-fill depuis les bords uniquement à travers "presque blanc"
    bg = np.zeros((h, w), dtype=bool)
    q = deque()
    for x in range(w):
        if near_white[0, x]: q.append((0, x))
        if near_white[h-1, x]: q.append((h-1, x))
    for y in range(h):
        if near_white[y, 0]: q.append((y, 0))
        if near_white[y, w-1]: q.append((y, w-1))

    while q:
        y, x = q.popleft()
        if bg[y, x]: continue
        bg[y, x] = True
        if y>0   and near_white[y-1,x] and not bg[y-1,x]: q.append((y-1,x))
        if y<h-1 and near_white[y+1,x] and not bg[y+1,x]: q.append((y+1,x))
        if x>0   and near_white[y,x-1] and not bg[y,x-1]: q.append((y,x-1))
        if x<w-1 and near_white[y,x+1] and not bg[y,x+1]: q.append((y,x+1))

    # Alpha = inversion d’un flou du masque de fond (bords doux)
    bg_img = Image.fromarray((bg.astype(np.uint8)*255), mode="L")
    if blur_radius>0:
        bg_img = bg_img.filter(ImageFilter.GaussianBlur(radius=blur_radius))
    alpha = Image.eval(bg_img, lambda v: 255 - v)

    out = im.convert("RGBA")
    out.putalpha(alpha)
    os.makedirs(os.path.dirname(output_path) or ".", exist_ok=True)
    out.save(output_path, compress_level=6)

if __name__ == "__main__":
    # Exemple d'utilisation
    remove_white_bg("Discussion autour du tapis rectangulaire.png", "fond_pour_cercle.png", tolerance=18, chroma_tolerance=60, blur_radius=1.2)
