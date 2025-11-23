// Script simple pour la transition des logos lors du défilement
document.addEventListener('DOMContentLoaded', function() {
  // Récupération des logos
  const logoInitial = document.getElementById('header-logo-initial');
  const logoFinal = document.getElementById('header-logo-final');
  
  // Vérifier que les deux logos existent
  if (!logoInitial || !logoFinal) {
    console.error('Un des logos est introuvable');
    return;
  }
  
  // Fonction de transition sur le scroll
  function updateLogoOpacity() {
    // Calculer le pourcentage de transition (0 à 1) sur 400px de défilement
    const scrollRatio = Math.min(1, window.scrollY / 400);
    
    // Appliquer l'opacité inverse pour la transition
    logoInitial.style.opacity = 1 - scrollRatio;
    logoFinal.style.opacity = scrollRatio;
  }
  
  // Initialiser l'état des logos
  logoInitial.style.opacity = 1;
  logoFinal.style.opacity = 0;
  
  // Mettre à jour l'opacité au défilement
  window.addEventListener('scroll', updateLogoOpacity);
  
  // Appliquer immédiatement pour tenir compte de la position initiale
  updateLogoOpacity();
});
