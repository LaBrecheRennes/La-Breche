from PIL import Image
import numpy as np

def remove_pure_white(input_path, output_path):
    """
    Met alpha=0 uniquement pour les pixels RGB == (255, 255, 255).
    Ne modifie pas les autres pixels.
    """
    im = Image.open(input_path).convert("RGBA")
    arr = np.array(im, dtype=np.uint8)
    r, g, b, a = arr.T
    mask = (r == 255) & (g == 255) & (b == 255)
    arr[..., 3][mask.T] = 0  # transparents uniquement pour les blancs purs
    Image.fromarray(arr, "RGBA").save(output_path, compress_level=6)

# Exemple
remove_pure_white("fond_pour_cercle.png", "fond_pour_cercle_1.png")
