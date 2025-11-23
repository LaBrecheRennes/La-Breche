// Flag global
let animationAlreadyPlayed = false;

/**
 * Fonction pour supprimer complètement les overlays du DOM
 * Cette fonction garantit que les overlays ne bloqueront plus les clics
 */
function killOverlay() {
  const tear = document.getElementById('tear-animation');
  const overlay = document.getElementById('text-overlay');

  // Neutralise toute interaction tout de suite
  if (tear) tear.style.pointerEvents = 'none';
  if (overlay) overlay.style.pointerEvents = 'none';

  // Cache immédiatement par sécurité
  if (tear) { tear.style.display = 'none'; tear.setAttribute('aria-hidden', 'true'); }
  if (overlay) { overlay.style.display = 'none'; overlay.setAttribute('aria-hidden', 'true'); }

  // Et supprime du DOM dès que possible (plus aucun risque de hitbox)
  requestAnimationFrame(() => {
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    if (tear && tear.parentNode) tear.parentNode.removeChild(tear);
  });
}

// Animation simplifiée et rapide pour l'ouverture du site
function startTearAnimation() {
    // Si déjà joué => on bloque
    if (animationAlreadyPlayed) {
        console.log("Animation déjà jouée, on ne relance pas.");
        return;
    }
    animationAlreadyPlayed = true; // on verrouille

    console.log("Démarrage de l'animation simplifiée");

    const textOverlay = document.getElementById("text-overlay");
    const tearAnimation = document.getElementById("tear-animation");
    const leftHalf = document.getElementById("left-half");
    const rightHalf = document.getElementById("right-half");
    const logoCentre = document.getElementById("logo-center");

    // Neutraliser immédiatement toute interception de clics
    if (textOverlay) textOverlay.style.pointerEvents = 'none';
    if (tearAnimation) tearAnimation.style.pointerEvents = 'none';
    
    // Animation simplifiée - déplacer directement les moitiés et laisser le logo visible
    if (leftHalf && rightHalf) {
        // Transition plus lente
        leftHalf.style.transition = "transform 1.2s ease-out";
        rightHalf.style.transition = "transform 1.2s ease-out";
        
        // Animation des deux côtés
        leftHalf.style.transform = "translateX(-100%)";
        rightHalf.style.transform = "translateX(100%)";
        
        // Le logo reste visible (pas d'animation de disparition)
        if (logoCentre) {
            logoCentre.style.opacity = "1";
            // Petit effet de zoom simple
            logoCentre.style.transition = "transform 1.2s ease-out";
            logoCentre.style.transform = "scale(1.1)";
        }
    }
    
    // Masquer très rapidement le texte pour éviter la superposition
    if (textOverlay) {
        textOverlay.style.transition = "opacity 0.25s ease-out";
        textOverlay.style.opacity = "0";
        // Masquer complètement après la transition
        setTimeout(() => {
            if (textOverlay) textOverlay.style.display = "none";
        }, 250);
    }
    
    // Afficher le contenu principal après la fin de l'animation (1.3 secondes)
    setTimeout(() => {
        // Détruire l'overlay définitivement
        killOverlay();
        
        // Afficher le contenu avec une animation simple et rapide
        document.querySelectorAll(".content").forEach((element, index) => {
            element.style.display = "block";
            element.style.opacity = "0";
            element.style.transform = "translateY(15px)";
            element.style.transition = "all 0.6s ease-out";
            
            // Décalage minimal entre les éléments
            setTimeout(() => {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
                element.classList.add("show-content");
            }, 50 + index * 50); // Timing beaucoup plus court
        });
        
        // Afficher l'en-tête plus rapidement
        if (typeof showHeaderAfterAnimation === "function") {
            setTimeout(() => {
                showHeaderAfterAnimation();
            }, 300);
        }
        
        // S'assurer que la page est en haut
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        
    }, 1300); // Délai ajusté pour correspondre à la durée de l'animation
}
