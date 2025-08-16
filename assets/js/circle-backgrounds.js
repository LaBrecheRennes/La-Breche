// ===== GESTION DES FONDS ALÉATOIRES POUR LES CERCLES =====

/**
 * Liste des fonds disponibles pour les cercles
 */
const availableBackgrounds = [
    'assets/images/fond_pour_cercle_1.png',
    'assets/images/fond_pour_cercle_2.png',
    'assets/images/fond_pour_cercle_3.png'
];

/**
 * Génère une liste de fonds uniques pour les cercles
 * @param {number} circleCount - Nombre de cercles
 * @returns {Array} - Tableau des fonds assignés
 */
function generateUniqueBackgrounds(circleCount) {
    console.log(`🎨 Génération de ${circleCount} fonds uniques pour les cercles`);
    
    const assignedBackgrounds = [];
    const shuffledBackgrounds = [...availableBackgrounds];
    
    // Mélanger les fonds disponibles
    for (let i = shuffledBackgrounds.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledBackgrounds[i], shuffledBackgrounds[j]] = [shuffledBackgrounds[j], shuffledBackgrounds[i]];
    }
    
    // Assigner des fonds uniques
    for (let i = 0; i < circleCount; i++) {
        // Si on a plus de cercles que de fonds, on recommence la liste mélangée
        const backgroundIndex = i % shuffledBackgrounds.length;
        assignedBackgrounds.push(shuffledBackgrounds[backgroundIndex]);
        
        console.log(`✅ Cercle ${i + 1}: ${shuffledBackgrounds[backgroundIndex]}`);
    }
    
    return assignedBackgrounds;
}

/**
 * Applique les fonds aux cercles existants
 */
function applyBackgroundsToCircles() {
    const circles = document.querySelectorAll('.cercle-item');
    if (circles.length === 0) {
        console.log('⚠️ Aucun cercle trouvé pour appliquer les fonds');
        return;
    }
    
    const backgrounds = generateUniqueBackgrounds(circles.length);
    
    circles.forEach((circle, index) => {
        const background = backgrounds[index];
        
        // Appliquer le fond avec les paramètres optimisés pour la lisibilité
        circle.style.backgroundImage = `url('${background}')`;
        circle.style.backgroundSize = 'cover';
        circle.style.backgroundPosition = 'center';
        circle.style.backgroundRepeat = 'no-repeat';
        circle.style.backgroundBlendMode = 'soft-light';
        circle.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        
        // Renforcer le texte pour une meilleure lisibilité
        const textElements = circle.querySelectorAll('h3, h4, p, span, div');
        textElements.forEach(element => {
            element.style.textShadow = '0 1px 2px rgba(255, 255, 255, 0.8)';
            element.style.fontWeight = element.style.fontWeight || 'normal';
            if (element.tagName === 'H3' || element.tagName === 'H4') {
                element.style.fontWeight = 'bold';
            }
        });
        
        console.log(`🎨 Fond appliqué au cercle ${index + 1}:`, background);
    });
}

// Observer pour détecter quand les cercles sont ajoutés dynamiquement
const circleObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
            const addedNodes = Array.from(mutation.addedNodes);
            const hasCircles = addedNodes.some(node => 
                node.nodeType === Node.ELEMENT_NODE && 
                (node.classList?.contains('cercle-item') || node.querySelector?.('.cercle-item'))
            );
            
            if (hasCircles) {
                console.log('🔄 Nouveaux cercles détectés, application des fonds...');
                setTimeout(() => applyBackgroundsToCircles(), 100);
            }
        }
    });
});

// Démarrer l'observation
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cercles-container');
    if (container) {
        circleObserver.observe(container, {
            childList: true,
            subtree: true
        });
        console.log('👀 Observer des cercles démarré');
    }
    
    // Appliquer les fonds aux cercles existants
    setTimeout(() => applyBackgroundsToCircles(), 500);
});
