// Script pour précharger et recharger le logo de l'animation
document.addEventListener('DOMContentLoaded', function() {
  const logoCenter = document.getElementById('logo-center');
  
  if (logoCenter) {
    // Forcer un rechargement de l'image
    const originalSrc = logoCenter.src;
    const newSrc = originalSrc + '?v=' + new Date().getTime(); // Ajoute un paramètre cache-buster
    
    // Créer une nouvelle image et l'attacher uniquement quand elle est chargée
    const img = new Image();
    
    img.onload = function() {
      logoCenter.src = newSrc;
      console.log("Logo rechargé avec succès");
    };
    
    img.onerror = function() {
      console.error("Erreur lors du chargement du logo");
      // En cas d'erreur, on revient à l'original
      logoCenter.src = originalSrc;
    };
    
    // Démarrer le chargement
    img.src = newSrc;
  }
});
