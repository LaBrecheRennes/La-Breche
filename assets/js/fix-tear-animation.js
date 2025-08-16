// Animation organique et féministe pour l'ouverture du site
function startTearAnimation() {
    console.log('Démarrage de l\'animation organique et féministe');
    
    const textOverlay = document.getElementById('text-overlay');
    const tearAnimation = document.getElementById('tear-animation');
    const leftHalf = document.getElementById('left-half');
    const rightHalf = document.getElementById('right-half');
    const logoCentre = document.getElementById('logo-center');
    
    // Phase 1: Faire disparaître le texte avec animation douce
    if (textOverlay) {
        textOverlay.classList.remove('text-fade-out');
        textOverlay.classList.add('text-gentle-fade');
        
        setTimeout(() => {
            textOverlay.style.display = 'none';
        }, 1200);
    }
    
    // Phase 2: Animation du logo (effet "bloom" organique) - délai prolongé
    if (logoCentre) {
        setTimeout(() => {
            logoCentre.classList.remove('logo-fade-out');
            logoCentre.classList.add('logo-bloom');
        }, 3400); // +1 seconde pour laisser plus de temps d'appréciation du logo
    }
    
    // Phase 3: Animation organique des portes (mouvement fluide et courbes)
    setTimeout(() => {
        if (leftHalf && rightHalf) {
            // Ajouter des effets de transition CSS pour plus de fluidité
            leftHalf.style.transition = 'box-shadow 0.5s ease-out';
            rightHalf.style.transition = 'box-shadow 0.5s ease-out';
            
            // Ajouter un léger effet d'ombre pendant l'animation
            leftHalf.style.boxShadow = '10px 0 30px rgba(122, 101, 191, 0.3)';
            rightHalf.style.boxShadow = '-10px 0 30px rgba(122, 101, 191, 0.3)';
            
            leftHalf.classList.remove('barn-door-left');
            rightHalf.classList.remove('barn-door-right');
            leftHalf.classList.add('organic-door-left');
            rightHalf.classList.add('organic-door-right');
        }
        
        // Phase 4: Afficher le contenu principal avec transition organique
        setTimeout(() => {
            if (tearAnimation) {
                tearAnimation.style.display = 'none';
            }
            
            // Afficher le contenu principal du site avec transition très douce
            document.querySelectorAll('.content').forEach((element, index) => {
                element.style.display = 'block';
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px) scale(0.98)';
                element.style.filter = 'blur(2px)';
                element.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                
                // Déclencher l'animation d'apparition avec délai échelonné
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0) scale(1)';
                    element.style.filter = 'blur(0px)';
                    element.classList.add('show-content');
                }, 150 + (index * 100)); // Délai échelonné pour un effet cascade
            });
            
            // Afficher le header après l'animation avec transition douce
            if (typeof showHeaderAfterAnimation === 'function') {
                setTimeout(() => {
                    showHeaderAfterAnimation();
                }, 600);
            }
            
            // Scroll vers le haut avec animation très douce
            setTimeout(() => {
                window.scrollTo({ 
                    top: 0, 
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300);
            
        }, 3200); // Attendre la fin de l'animation organique (plus longue)
        
    }, 1900); // Délai ajusté pour correspondre au nouveau timing du logo (1400ms + 500ms)
}
