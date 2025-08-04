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
        
        // Afficher la zone de contenu avec animation
        contentDiv.style.display = 'block';
        
        // Attendre que le contenu soit affiché puis scroll vers le H3 à mi-hauteur
        setTimeout(() => {
            const h3Element = titleDiv; // Le H3 est dans titleDiv
            if (h3Element) {
                const h3Top = h3Element.getBoundingClientRect().top + window.pageYOffset;
                const windowHeight = window.innerHeight;
                const targetPosition = h3Top - (windowHeight / 2); // H3 à mi-hauteur de l'écran
                
                window.scrollTo({ 
                    top: targetPosition, 
                    behavior: 'smooth' 
                });
            }
        }, 100); // Petit délai pour s'assurer que le contenu est affiché
        
        // Animation d'apparition
        contentDiv.style.opacity = '0';
        contentDiv.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            contentDiv.style.transition = 'all 0.3s ease';
            contentDiv.style.opacity = '1';
            contentDiv.style.transform = 'translateY(0)';
        }, 50);
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

// Initialiser les cartes de la charte quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    initializeCharterCards();
});
