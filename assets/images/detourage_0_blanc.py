from PIL import Image
import numpy as np

def remove_pure_white(input_path, output_path, tol=0):
    """
    Met alpha=0 pour les pixels blancs (ou quasi blancs si tol>0).
    Ne modifie pas les autres pixels.
    tol=0 : strictement (255,255,255)
    tol=10 : >=245 sur chaque canal, etc.
    """
    im = Image.open(input_path).convert("RGBA")
    arr = np.array(im, dtype=np.uint8)

    r, g, b = arr[...,0], arr[...,1], arr[...,2]
    a = arr[...,3]

    if tol == 0:
        mask = (r == 255) & (g == 255) & (b == 255)
    else:
        t = 255 - int(tol)
        mask = (r >= t) & (g >= t) & (b >= t)

    a[mask] = 0
    arr[...,3] = a

    Image.fromarray(arr, "RGBA").save(output_path, compress_level=6)

# Exemple
remove_pure_white("Logo_breche.png", "test_1.png",25)        # blanc pur
# remove_pure_white("Logo_breche.png", "test_1.png", tol=8)  # si halo JPEG