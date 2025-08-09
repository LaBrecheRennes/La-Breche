// Fonction simplifiée pour le bouton "Ouvrir une brèche ensemble"
// Cette fonction remplace l'ancienne animation complexe par une transition simple
function startTearAnimation() {
    console.log('Démarrage de l\'animation de brèche simplifiée');
    
    // Masquer l'overlay de texte et l'animation de déchirure
    const textOverlay = document.getElementById('text-overlay');
    const tearAnimation = document.getElementById('tear-animation');
    
    if (textOverlay) {
        textOverlay.style.transition = 'opacity 0.5s ease-out';
        textOverlay.style.opacity = '0';
        
        setTimeout(() => {
            textOverlay.style.display = 'none';
        }, 500);
    }
    
    if (tearAnimation) {
        tearAnimation.style.transition = 'opacity 0.5s ease-out';
        tearAnimation.style.opacity = '0';
        
        setTimeout(() => {
            tearAnimation.style.display = 'none';
            
            // Afficher le contenu principal du site
            document.querySelectorAll('.content').forEach(element => {
                element.style.display = 'block';
                element.classList.add('show-content');
            });
            
            // Scroll vers le haut pour s'assurer que l'utilisateur voit le contenu
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 500);
    }
}
