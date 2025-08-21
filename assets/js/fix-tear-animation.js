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

// Animation organique et féministe pour l'ouverture du site
function startTearAnimation() {
    // Si déjà joué => on bloque
    if (animationAlreadyPlayed) {
        console.log("Animation déjà jouée, on ne relance pas.");
        return;
    }
    animationAlreadyPlayed = true; // on verrouille

    console.log("Démarrage de l'animation organique et féministe");

    const textOverlay = document.getElementById("text-overlay");
    const tearAnimation = document.getElementById("tear-animation");
    const leftHalf = document.getElementById("left-half");
    const rightHalf = document.getElementById("right-half");
    const logoCentre = document.getElementById("logo-center");

    // 1) Neutraliser immédiatement toute interception de clics
    if (textOverlay) textOverlay.style.pointerEvents = 'none';
    if (tearAnimation) tearAnimation.style.pointerEvents = 'none';

    // Phase 1: disparition du texte
    if (textOverlay) {
        textOverlay.classList.remove("text-fade-out");
        textOverlay.classList.add("text-gentle-fade");

        setTimeout(() => {
            textOverlay.style.display = "none";
        }, 1200);
    }

    // Phase 2: logo
    if (logoCentre) {
        setTimeout(() => {
            logoCentre.classList.remove("logo-fade-out");
            logoCentre.classList.add("logo-bloom");
        }, 3400);
    }

    // Phase 3: portes
    setTimeout(() => {
        if (leftHalf && rightHalf) {
            leftHalf.style.transition = "box-shadow 0.5s ease-out";
            rightHalf.style.transition = "box-shadow 0.5s ease-out";

            leftHalf.style.boxShadow = "10px 0 30px rgba(122,101,191,0.3)";
            rightHalf.style.boxShadow = "-10px 0 30px rgba(122,101,191,0.3)";

            // Forcer un reflow pour que la transition parte bien
            void leftHalf.offsetWidth;
            void rightHalf.offsetWidth;

            leftHalf.classList.remove("barn-door-left");
            rightHalf.classList.remove("barn-door-right");
            leftHalf.classList.add("organic-door-left");
            rightHalf.classList.add("organic-door-right");
        }

        // Phase 4: contenu
        setTimeout(() => {
            // 2) DÉTRUIRE l'overlay définitivement
            killOverlay();

            document.querySelectorAll(".content").forEach((element, index) => {
                element.style.display = "block";
                element.style.opacity = "0";
                element.style.transform = "translateY(30px) scale(0.98)";
                element.style.filter = "blur(2px)";
                element.style.transition =
                    "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

                setTimeout(() => {
                    element.style.opacity = "1";
                    element.style.transform = "translateY(0) scale(1)";
                    element.style.filter = "blur(0px)";
                    element.classList.add("show-content");
                }, 150 + index * 100);
            });

            if (typeof showHeaderAfterAnimation === "function") {
                setTimeout(() => {
                    showHeaderAfterAnimation();
                }, 600);
            }

            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            }, 300);
        }, 3200);
    }, 1900);
}
