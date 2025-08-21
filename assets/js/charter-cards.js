// ===== ANIMATION DES CARTES DE LA CHARTE =====

/**
 * Données des cartes de la charte
 */
const charterData = {
    confidentialite: {
        title: "CONFIDENTIALITÉ",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
               </svg>`,
        content: `
            <p class="text-lg mb-4">Ce qui est partagé dans ce cercle reste <strong>anonyme</strong>.</p>
            <p class="text-gray-600">Chaque participant est libre de se présenter avec le nom qu'il ou elle souhaite. L'anonymat garantit un espace de liberté et de sécurité pour tous les participants.</p>
        `
    },
    ecoute: {
        title: "ÉCOUTE ACTIVE",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
               </svg>`,
        content: `
            <p class="text-lg mb-4">Je suis ici pour travailler mon écoute. Je prends le temps de recevoir ce qui est partagé et j'écoute sans chercher à répondre.</p>
            <p class="text-gray-600">Cet espace n'est pas destiné au débat, à la confrontation d'opinions ou à convaincre les autres. L'écoute active permet de créer un environnement bienveillant et respectueux.</p>
        `
    },
    parler: {
        title: "PARLER EN SON \"JE\"",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
               </svg>`,
        content: `
            <p class="text-lg mb-4">Je partage mon expérience personnelle et ce que je ressens, en évitant les généralités et le recours au "On".</p>
            <p class="text-gray-600">Parler en son "je" permet d'ancrer les échanges dans l'expérience vécue et d'éviter les jugements ou les généralités qui peuvent créer des tensions.</p>
        `
    },
    mediatrices: {
        title: "RÔLE DES MÉDIATRICES",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
               </svg>`,
        content: `
            <p class="text-lg mb-4">Les médiatrices facilitent le bon déroulement des cercles. Elles peuvent intervenir, rebondir, réagir ou témoigner, mais également stopper un discours si celui-ci dépasse le cadre du cercle.</p>
            <p class="text-gray-600">Leur rôle est de garantir un cadre de sécurité émotionnelle pour tous les participants. Elles veillent au respect du cadre et à la bienveillance des échanges.</p>
        `
    },
    bienveillance: {
        title: "BIENVEILLANCE",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
               </svg>`,
        content: `
            <p class="text-lg mb-4"><strong>Envers moi-même et les autres :</strong> Je fais preuve d'honnêteté et je respecte mes propres limites ainsi que celles des autres.</p>
            <p class="text-gray-600">Si je suis en difficulté, je le nomme et je peux sortir de la pièce ou faire un signe pour stopper le discours, sans avoir besoin de me justifier. Chacun est responsable de soi et de son bien-être.</p>
        `
    },
    parole: {
        title: "PRISE DE PAROLE",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 4v10a2 2 0 002 2h6a2 2 0 002-2V8M7 8h10M9 12h6m-6 4h6" />
               </svg>`,
        content: `
            <p class="text-lg mb-4">Je veille à ne pas couper la parole et à parler lorsque c'est mon tour. Je fais attention à ne pas monopoliser la parole, afin que chacun puisse avoir l'espace nécessaire pour s'exprimer.</p>
            <p class="text-gray-600">Les médiatrices ne feront pas la distribution de la parole. C'est à nous, participants, de nous réguler entre nous et d'être attentifs à la gestion de la parole.</p>
        `
    }
};

/**
 * Ouvre une carte de la charte et affiche son contenu
 * @param {string} cardType - Le type de carte à ouvrir
 */
function openCharterCard(cardType) {
    const data = charterData[cardType];
    if (!data) return;
    
    const contentDiv = document.getElementById('charter-content');
    const iconDiv = document.getElementById('charter-icon');
    const titleDiv = document.getElementById('charter-title');
    const descriptionDiv = document.getElementById('charter-description');
    
    if (contentDiv && iconDiv && titleDiv && descriptionDiv) {
        // Mettre à jour le contenu
        iconDiv.innerHTML = data.icon;
        titleDiv.textContent = data.title;
        descriptionDiv.innerHTML = data.content;
        
        // Animation d'apparition fluide sans scroll automatique
        contentDiv.style.opacity = '0';
        contentDiv.style.transform = 'translateY(20px)';
        contentDiv.style.display = 'block';
        
        // Animation d'apparition plus fluide
        requestAnimationFrame(() => {
            contentDiv.style.transition = 'all 0.4s ease-out';
            contentDiv.style.opacity = '1';
            contentDiv.style.transform = 'translateY(0)';
        });
    }
}

/**
 * Ferme la carte de la charte
 */
function closeCharterCard() {
    const contentDiv = document.getElementById('charter-content');
    if (contentDiv) {
        contentDiv.style.transition = 'all 0.3s ease';
        contentDiv.style.opacity = '0';
        contentDiv.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            contentDiv.style.display = 'none';
            contentDiv.style.transform = 'translateY(0)';
        }, 300);
    }
}

/**
 * Initialise les cartes de la charte
 */
function initializeCharterCards() {
    const charterCards = document.querySelectorAll('.charter-card');
    
    charterCards.forEach(card => {
        card.addEventListener('click', function() {
            const cardType = this.getAttribute('data-card');
            if (cardType) {
                openCharterCard(cardType);
            }
        });
        
        // Améliorer l'effet hover
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 40px rgba(122, 101, 191, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

/**
 * Initialise l'animation coverflow pour les cartes de la charte
 */
function initializeCharterCoverflow() {
    const container = document.querySelector('.charter-coverflow-container');
    
    function showActiveCard(idx) {
      openCharterCard(charterCards[idx].id);
    }
    const coverflowContainer = document.querySelector('.charter-coverflow-container');
    
    // Données des cartes avec leurs icônes
    const charterCards = [
        { id: 'confidentialite', title: 'CONFIDENTIALITÉ', icon: charterData.confidentialite.icon },
        { id: 'ecoute', title: 'ÉCOUTE ACTIVE', icon: charterData.ecoute.icon },
        { id: 'parler', title: 'PARLER EN SON "JE"', icon: charterData.parler.icon },
        { id: 'mediatrices', title: 'RÔLE DES MÉDIATRICES', icon: charterData.mediatrices.icon },
        { id: 'bienveillance', title: 'BIENVEILLANCE', icon: charterData.bienveillance.icon },
        { id: 'parole', title: 'PRISE DE PAROLE', icon: charterData.parole.icon }
    ];
    
    let currentIndex = 2; // Index de départ (carte centrale)
    let virtualIndex = currentIndex; // Position flottante pour le défilement continu
    const maxIndex = charterCards.length - 1;
    const clamp = (n) => Math.max(0, Math.min(n, maxIndex));
    
    // Hover scroll functionality supprimée sur demande de l'utilisateur
    
    // Create cards (copié de test_cartes avec adaptation du style)
    charterCards.forEach((cardData, index) => {
        const card = document.createElement('div');
        card.className = 'charter-card absolute bg-gradient-to-br from-[#7A65BF] to-[#9B7DC7] text-white flex flex-col items-center justify-center font-bold rounded-lg shadow-lg cursor-pointer';
        card.style.width = '140px';
        card.style.height = '200px';
        card.dataset.index = index;
        card.dataset.card = cardData.id;
        
        card.innerHTML = `
            <div class="card-icon mb-2">${cardData.icon}</div>
            <div class="card-title text-xs text-center px-2">${cardData.title}</div>
        `;
        
        // Initial positioning
        updateCardPosition(card, index);
        
        card.addEventListener('click', () => {
          if (isDragging || totalMovement > DRAG_THRESHOLD) return;
          const from = virtualIndex;
          const to = index;
          currentIndex = to;
          if (from !== to) {
            animateSnap(from, to, () => showActiveCard(to));   // ✅
          } else {
            updateCards();
            showActiveCard(to);                                 // ✅
          }
        });
        
        container.appendChild(card);
    });
    
    function updateCardPosition(card, index) {
      const distance = index - virtualIndex;
      const absDistance = Math.abs(distance);

      // --- 3D / position ---
      let rotateY = distance * 30;
      let translateX = distance * 100;
      let translateZ = -absDistance * 50;

      card.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`;

      // Z-order : la carte devant est au-dessus
      card.style.zIndex = 1000 - Math.round(absDistance * 10);

      // Scale (comme avant)
      const scale = 1 - (absDistance * 0.1);
      card.style.transform += ` scale(${scale})`;

      // --- Opacité du FOND uniquement (le texte reste opaque) ---
      // 1 au centre ; ~0.65 à 1 carte ; ~0.35 au-delà (clamp)
      const bgAlpha = Math.max(0.35, 1 - absDistance * 0.35);

      // Override le gradient Tailwind avec un gradient RGBA en inline-style
      card.style.backgroundImage =
        `linear-gradient(135deg,
          rgba(122,101,191,${bgAlpha}) 0%,
          rgba(155,125,199,${bgAlpha}) 100%)`;

      // (optionnel) ombre plus marquée pour la carte centrale
      const shadowAlpha = 0.15 + (0.35 * (bgAlpha - 0.35) / (1 - 0.35));
      card.style.boxShadow = `0 20px 40px rgba(122,101,191, ${shadowAlpha})`;
    }
    
    // Update all cards (copié de test_cartes)
    function updateCards() {
        document.querySelectorAll('.charter-card').forEach((card, index) => {
            updateCardPosition(card, index);
        });
    }
    
    // Animation douce pour recentrer une carte
    function animateSnap(from, to, onDone) {
        const startTime = Date.now();
        const duration = 300; // ms

        function step() {
            const elapsed = Date.now() - startTime;
            if (elapsed < duration) {
                const progress = 1 - Math.pow(1 - elapsed / duration, 3); // ease-out
                virtualIndex = from + (to - from) * progress;
                updateCards();
                requestAnimationFrame(step);
            } else {
                virtualIndex = to;
                currentIndex = to;
                updateCards();
                if (typeof onDone === 'function') onDone();  // ✅ ouvre le panneau ici
            }
        }
        
        requestAnimationFrame(step);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      let next = currentIndex;
      if (e.key === 'ArrowLeft' && currentIndex > 0) next--;
      else if (e.key === 'ArrowRight' && currentIndex < maxIndex) next++;
      else return;

      if (next === currentIndex) return;
      currentIndex = next;
      animateSnap(virtualIndex, currentIndex, () => showActiveCard(currentIndex)); // ✅
    });  
    
    // Initialize (copié de test_cartes)
    updateCards();
    showActiveCard(currentIndex); // 

    // ===== Drag (cliquer-glisser) pour défiler le coverflow =====
    let isPointerDown = false;
    let isDragging = false;
    let lastX = 0;
    let startX = 0;
    let totalMovement = 0;

    // Sensibilité (plus grand = moins sensible)
    let DRAG_STEP = 150;
    const DRAG_THRESHOLD = 10;

    container.addEventListener('pointerdown', (e) => {
      isPointerDown = true;
      isDragging = false;
      lastX = e.clientX;
      startX = e.clientX;
      totalMovement = 0;
      container.classList.add('dragging');

      // adaptatif : touch = gestes plus "larges"
      DRAG_STEP = (e.pointerType === 'touch') ? 220 : 150;
    });

    container.addEventListener('pointermove', (e) => {
      if (!isPointerDown) return;

      const dx = e.clientX - lastX;
      lastX = e.clientX;

      totalMovement += Math.abs(dx);
      if (!isDragging && totalMovement > DRAG_THRESHOLD) {
        isDragging = true;
        container.setPointerCapture?.(e.pointerId); // ✅ capture seulement quand ça glisse
      }

      if (isDragging) {
        // dx pixels -> fraction de carte, avec limite par frame
        const rawDelta = -dx / DRAG_STEP;
        const cappedDelta = Math.max(-0.6, Math.min(0.6, rawDelta));
        virtualIndex = clamp(virtualIndex + cappedDelta);
        updateCards();
      }

      e.preventDefault();
    }, { passive: false });

    function endDrag(e) {
      if (!isPointerDown) return;

      // fin de séquence pointer
      isPointerDown = false;

      // snap sur la carte la plus proche
      const targetIndex = Math.round(virtualIndex);

      if (isDragging) {
        if (targetIndex !== virtualIndex) {
          animateSnap(virtualIndex, targetIndex, () => showActiveCard(targetIndex));
        } else {
          currentIndex = targetIndex;
          updateCards();
          showActiveCard(targetIndex);
        }
      }
      isDragging = false;
      container.classList.remove('dragging');

      try { container.releasePointerCapture?.(e.pointerId); } catch {}
    }

    container.addEventListener('pointerup', endDrag);
    container.addEventListener('pointercancel', endDrag);
    container.addEventListener('pointerleave', endDrag);

    // Bloquer les "faux clics" après un vrai drag
    document.querySelectorAll('.charter-card').forEach((card) => {
      card.addEventListener('click', (evt) => {
        if (isDragging || totalMovement > DRAG_THRESHOLD) {
          evt.stopPropagation();
          evt.preventDefault();
          return false;
        }
      }, true);
    });

    // Wheel / trackpad: léger défilement gauche/droite
    container.addEventListener('wheel', (e) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 30) return;

      const dir = delta > 0 ? 1 : -1;
      const target = clamp(currentIndex + dir);
      if (target !== currentIndex) {
        currentIndex = target;
        animateSnap(virtualIndex, target, () => showActiveCard(target));
      }
      e.preventDefault();
    }, { passive: false });
  }

// Initialiser les cartes de la charte quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    initializeCharterCards();
    initializeCharterCoverflow();
});
