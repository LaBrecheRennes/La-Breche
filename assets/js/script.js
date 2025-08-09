// Structure des données pour les cercles - Version 2025-08-03-12:45
// Cache invalidation timestamp: 1722681900
let circles = [];

// Debug: Vérification de la version du script
console.log('Script version: 2025-08-03-12:45 - Cache invalidated');

// Fonction pour animer une image de fond avec effet de fondu
function animateBackgroundImage(elementId) {
    const image = document.getElementById(elementId);
    if (!image) return;
    
    let opacity = 0;
    const targetOpacity = 1;
    const step = 0.2; // 20% par seconde
    const interval = 1000; // 1 seconde
    
    // Animation progressive
    const fadeIn = setInterval(() => {
        opacity = Math.min(opacity + step, targetOpacity);
        image.style.opacity = opacity;
        
        if (opacity >= targetOpacity) {
            clearInterval(fadeIn);
        }
    }, interval);
}

// Fonction pour animer l'image de fond du Hero
function animateHeroBackground() {
    animateBackgroundImage('hero-bg-image');
}

// Fonction pour animer l'image de fond de la section Fonctionnement
function animateFonctionnementBackground() {
    animateBackgroundImage('fonctionnement-bg-image');
}

// Variables pour l'animation d'impact supprimées

// Fonction createScreenShake supprimée

// Fonction createImpactAnimation supprimée

// Fonction clearAllImpacts supprimée

// Variables pour l'animation d'empilement anxiogène - SUPPRIMÉES

// Fonction createStackingPhrase supprimée

// Fonction stopStackingPhrases supprimée

// Fonction d'initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    initializePopup();
    initializeForm();
    initializeContactForm();
    loadCirclesFromGoogleSheet();
    
    // Initialiser l'intégration calendrier si disponible
    if (typeof initializeCalendarIntegration === 'function') {
        initializeCalendarIntegration();
    }
    
    // Initialisation du reste de l'application
    initializeApp();
    
    // Animation progressive des images de fond
    animateHeroBackground();
    animateFonctionnementBackground();
    
    // Événement de clic pour l'animation d'impact supprimé
    
    // Animation d'empilement anxiogène supprimée
    
    // S'assurer que l'animation est prête
    const tearAnimation = document.getElementById('tear-animation');
    if (!tearAnimation) {
        // Si l'animation n'est pas présente, afficher directement le contenu
        document.querySelectorAll('.content').forEach(element => {
            element.classList.add('show-content');
        });
    }
    
    // Initialiser les animations au scroll
    initScrollAnimations();
});

/**
 * Initialise les animations déclenchées par le défilement
 */
function initScrollAnimations() {
    // Observer qui détecte quand un élément devient visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animation une seule fois
            }
        });
    }, {
        threshold: 0.15, // Déclenche quand 15% de l'élément est visible
        rootMargin: '0px 0px -50px 0px' // Déclenche un peu avant que l'élément soit complètement visible
    });
    
    // Observer les éléments avec la classe scroll-animated
    setTimeout(() => {
        document.querySelectorAll('.scroll-animated').forEach(element => {
            observer.observe(element);
        });
    }, 1800); // Attendre la fin de l'animation initiale
}

/**
 * Animation de révélation de la brèche (approche CSS pure inspirée de test_cartes.html)
 */
function startBreachRevealAnimation() {
    const breachReveal = document.getElementById('breach-reveal');
    const breachImage = document.getElementById('breach-image');
    
    if (!breachReveal || !breachImage) {
        console.log('Elements de brèche non trouvés, passage à l\'animation classique');
        continueWithTearAnimation();
        return;
    }
    
    console.log('Démarrage de l\'animation de révélation de la brèche (CSS)');
    
    // DIAGNOSTIC : Vérifier l'état avant nettoyage
    console.log('Avant nettoyage - inline style :', breachImage.getAttribute('style'));
    console.log('Avant nettoyage - computed clipPath :', getComputedStyle(breachImage).clipPath);
    
    // NETTOYAGE ROBUSTE : Supprimer tout style inline qui pourrait bloquer
    breachImage.style.clipPath = '';
    breachImage.style.webkitClipPath = '';
    breachImage.removeAttribute('style');
    
    // DIAGNOSTIC : Vérifier l'état après nettoyage
    console.log('Après nettoyage - inline style :', breachImage.getAttribute('style'));
    console.log('Après nettoyage - computed clipPath :', getComputedStyle(breachImage).clipPath);
    
    // Déclencher l'animation CSS (inspirée de test_cartes.html)
    breachImage.classList.add('breach-reveal-animation');
    
    // DIAGNOSTIC : Vérifier que l'animation se lance
    setTimeout(() => {
        console.log('Animation en cours - animationName :', getComputedStyle(breachImage).animationName);
        console.log('Animation en cours - clipPath :', getComputedStyle(breachImage).clipPath);
    }, 100);
    
    // Après 2.5 secondes (durée de l'animation CSS), masquer les éléments et continuer
    setTimeout(() => {
        hideElementsAndContinue();
    }, 3000); // 2.5s animation + 500ms pause
}

/**
 * Masque les éléments après la révélation de la brèche et continue l'animation
 */
function hideElementsAndContinue() {
    console.log('Brèche complètement révélée, masquage des éléments...');
    
    // Masquer la div de texte/bouton
    const textOverlay = document.getElementById('text-overlay');
    if (textOverlay) {
        textOverlay.style.zIndex = '-9999';
        textOverlay.style.opacity = '0';
        textOverlay.style.transition = 'opacity 0.3s ease-out';
    }

    // Désactiver l'animation d'impact
    impactAnimationActive = false;

    // Supprimer toutes les images d'impact affichées
    clearAllImpacts();

    // Arrêter les phrases empilées
    stopStackingPhrases();
    
    // Continuer avec l'ouverture de l'écran
    setTimeout(() => {
        openScreenAlongBreach();
    }, 300);
}

/**
 * Ouvre l'écran en deux en suivant la brèche
 */
function openScreenAlongBreach() {
    console.log('Ouverture de l\'ecran en suivant la brèche');
    continueWithTearAnimation();
}

/**
 * Continue avec l'animation de déchirure classique
 */
function continueWithTearAnimation() {
    const leftHalf = document.getElementById('left-half');
    const rightHalf = document.getElementById('right-half');
    const tearAnimation = document.getElementById('tear-animation');
    const logoCenter = document.getElementById('logo-center');
    const mainContent = document.querySelectorAll('.content');
    const heroWave = document.getElementById('hero-wave');
    
    console.log('Animation de déchirure démarrée - Images d\'impact et phrases supprimées');
    
    // Faire disparaître progressivement le logo central
    if (logoCenter) {
        logoCenter.style.transition = 'opacity 0.5s ease';
        logoCenter.style.opacity = '0';
    }
    
    // Appliquer les animations de déchirure
    leftHalf.classList.add('tear-left');
    rightHalf.classList.add('tear-right');
    
    // Après l'animation, afficher le contenu principal et supprimer l'animation
    setTimeout(() => {
        console.log('DIAGNOSTIC - Nombre d\'éléments .content trouvés :', mainContent.length);
        
        mainContent.forEach((element, index) => {
            element.classList.add('show-content');
            console.log(`DIAGNOSTIC - Élément ${index} - classes après ajout :`, element.className);
            console.log(`DIAGNOSTIC - Élément ${index} - opacity computed :`, getComputedStyle(element).opacity);
        });
        
        // Masquer l'animation de déchirure
        tearAnimation.style.display = 'none';
        console.log('DIAGNOSTIC - Animation de déchirure masquée');
        
        // Vérification finale
        setTimeout(() => {
            const showContentElements = document.querySelectorAll('.show-content');
            console.log('DIAGNOSTIC FINAL - Nombre d\'éléments .show-content :', showContentElements.length);
            console.log('DIAGNOSTIC FINAL - Display de tear-animation :', getComputedStyle(tearAnimation).display);
        }, 100);
        
        // Activer l'animation de la vague Hero SVG
        if (heroWave) {
            heroWave.classList.add('animate');
        }
    }, 1500);
}

/**
 * Démarre l'animation de déchirure et révèle le contenu
 */
function startTearAnimation() {
    // PREMIÈRE ACTION : Démarrer immédiatement l'animation de révélation de la brèche
    startBreachRevealAnimation();
}

/**
 * Fonction inutilisée - gardée pour compatibilité
 */
function showMainContent() {
    const contentElements = document.querySelectorAll('.content');
    contentElements.forEach(element => {
        element.classList.add('show-content');
    });
    
    console.log('Contenu principal affiché');
}



/**
 * Initialisation de l'application
 */
function initializeApp() {
    // Charger les données des cercles
    loadCirclesData()
        .then(data => {
            // Stocker les données des cercles
            circles = data;
            // Afficher les cercles dans l'interface
            renderCircles();
            // Initialiser la gestion de la popup
            initializePopup();
            // Initialiser le formulaire
            initializeForm();
            // Initialiser le formulaire de contact
            initializeContactForm();
        })
        .catch(error => {
            console.error('Erreur lors du chargement des cercles:', error);
            // Afficher un message d'erreur dans le conteneur
            const container = document.getElementById('cercles-container');
            if (container) {
                container.innerHTML = `
                    <div class="col-span-2 text-center py-8 bg-red-50 border border-red-200 rounded-lg">
                        <svg class="mx-auto h-12 w-12 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h4 class="text-lg font-medium text-red-800 mb-2">Erreur de chargement</h4>
                        <p class="text-red-700">Impossible de charger les cercles disponibles.</p>
                    </div>
                `;
            }
        });
}

/**
 * Charge les données des cercles depuis Google Sheets en utilisant l'API et la clé API fournie
 * @returns {Promise} Promise qui résout avec les données des cercles
 */
async function loadCirclesData() {
    // ID du Google Sheet et clé API
    const sheetId = '1klaUaZOED9tztQkSrLxlG-bOSbChAx95jZbCjqNEBaY';
    const apiKey = 'AIzaSyBTx30LCTda0WYkfEJ-k2-rahNGkFMggJ0'; // Clé API fournie
    
    // Afficher un message de débogage
    console.log('Début du chargement des cercles via API Google Sheets');
    console.log(`Utilisation de l'ID de feuille: ${sheetId}`);
    
    try {
        // 1. Récupérer les informations sur le spreadsheet, incluant tous les onglets
        const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?key=${apiKey}`;
        console.log(`Appel API URL: ${apiUrl}`);
        
        const sheetsResponse = await fetch(apiUrl);
        
        if (!sheetsResponse.ok) {
            const errorText = await sheetsResponse.text();
            console.error('Erreur réponse API:', sheetsResponse.status, errorText);
            throw new Error(`Erreur lors de la récupération des informations du Google Sheet: ${sheetsResponse.status} ${errorText}`);
        }
        
        console.log('Réponse API reçue avec succès');
        
        const sheetsData = await sheetsResponse.json();
        console.log('Données du spreadsheet reçues');
        
        const sheets = sheetsData.sheets || [];
        console.log(`Nombre total d'onglets: ${sheets.length}`);
        
        // 2. Filtrer les onglets (exclure "Historique des cercles")
        const circleSheets = sheets.filter(sheet => 
            sheet.properties && 
            sheet.properties.title && 
            sheet.properties.title !== "Historique des cercles"
        );
        
        console.log(`Nombre d'onglets après filtrage: ${circleSheets.length}`);
        circleSheets.forEach(sheet => console.log(`- Onglet: ${sheet.properties.title}`));
        
        // 3. Récupérer les données de chaque onglet
        const circlesData = [];
        
        for (const sheet of circleSheets) {
            const sheetTitle = sheet.properties.title;
            // Récupérer les données de cet onglet (prendre une plage suffisante)
            const range = `${sheetTitle}!C1:C10`;
            
            // Requête pour récupérer les données de cet onglet
            const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
            console.log(`Récupération des données de l'onglet ${sheetTitle}`);
            
            const response = await fetch(sheetUrl);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Erreur lors de la récupération des données pour l'onglet ${sheetTitle}:`, response.status);
                continue;
            }
            
            console.log(`Données de l'onglet ${sheetTitle} reçues`);
            
            const data = await response.json();
            const values = data.values || [];
            
            // Définir une fonction helper pour extraire une valeur spécifique
            const getValue = (index) => {
                return (values.length > index && values[index] && values[index][0]) ? values[index][0] : '';
            };
            
            // Créer un objet cercle avec les données de l'onglet
            const circle = {
                id: sheetTitle.toLowerCase().replace(/\s+/g, '-'),
                nom: sheetTitle,
                // Thématique = C2 (index 1 car C1 est à l'index 0)
                thematique: getValue(1) || 'Thématique à confirmer',
                // Nombre places max = C3 (index 2)
                places_totales: parseInt(getValue(2), 10) || 20,
                // Date et heure = C4 (index 3)
                date: getValue(3) || 'Date à confirmer',
                // Lieu = C5 (index 4)
                lieu: getValue(4) || 'Lieu à confirmer',
                // Places disponibles = C6 (index 5)
                places_disponibles: parseInt(getValue(5), 10) || 0,
                // Valeurs par défaut pour d'autres champs
                description: `Cercle d'écoute sur ${getValue(1) || 'thématique à confirmer'}`,
                referentes: 'Equipe La Brèche'
            };
            
            // S'assurer que places_disponibles n'est pas négatif
            circle.places_disponibles = Math.max(0, circle.places_disponibles);
            
            // Ajouter le cercle à la liste
            circlesData.push(circle);
            console.log(`Cercle ajouté: ${circle.nom}, thématique: ${circle.thematique}, date: ${circle.date}, places: ${circle.places_disponibles}/${circle.places_totales}`);
        }
        
        console.log(`Total des cercles chargés: ${circlesData.length}`);
        
        // Si aucun cercle n'a été chargé, lancer une erreur
        if (circlesData.length === 0) {
            throw new Error('Aucun cercle n\'a pu être chargé');
        }
        
        // Trier les cercles par ordre chronologique
        return sortCirclesByDate(circlesData);
    } catch (error) {
        console.error('Erreur lors du chargement des cercles:', error);
        
        // En cas d'erreur, retourner des données de test pour ne pas bloquer le site
        return sortCirclesByDate([
            {
                id: 'cercle-test',
                nom: 'Cercle Test (données de secours)',
                date: '1er janvier 2026',  // Date future pour les tests
                lieu: 'Lieu à confirmer',
                referentes: 'Equipe La Brèche',
                description: 'Les données réelles n\'ont pas pu être chargées. Vérifiez l\'accès au Google Sheet.',
                places_disponibles: 10,
                places_totales: 20
            }
        ]);
    }
}

/**
 * Trie les cercles par date (du plus proche au plus lointain)
 * @param {Array} circles - Tableau des cercles à trier
 * @returns {Array} - Tableau trié
 */
function sortCirclesByDate(circles) {
    if (!circles || !Array.isArray(circles) || circles.length <= 1) {
        return circles;
    }
    
    // Créer une copie pour ne pas modifier le tableau original
    const sortedCircles = [...circles];
    
    // Log pour diagnostic
    console.log('Cercles avant tri:', sortedCircles.map(c => ({ id: c.id, date: c.date })));
    
    return sortedCircles.sort((a, b) => {
        // Extraire les composantes de date
        const dateComponentsA = extractDateComponents(a.date || '');
        const dateComponentsB = extractDateComponents(b.date || '');
        
        console.log(`Composantes de date pour ${a.id || 'cercle'}: `, dateComponentsA);
        console.log(`Composantes de date pour ${b.id || 'cercle'}: `, dateComponentsB);
        
        // Comparer par année d'abord
        if (dateComponentsA.year !== dateComponentsB.year) {
            return dateComponentsA.year - dateComponentsB.year;
        }
        
        // Si les années sont identiques, comparer par mois
        if (dateComponentsA.month !== dateComponentsB.month) {
            return dateComponentsA.month - dateComponentsB.month;
        }
        
        // Si les mois sont identiques, comparer par jour
        return dateComponentsA.day - dateComponentsB.day;
    });
}

/**
 * Extrait les composantes de date (année, mois, jour) d'une chaîne de texte
 * @param {string} dateString - Chaîne contenant potentiellement une date
 * @returns {Object} - Objet contenant année, mois, jour (grandes valeurs pour dates inconnues)
 */
function extractDateComponents(dateString) {
    // Vérifier que dateString est bien une chaîne de caractères
    if (!dateString || typeof dateString !== 'string') {
        console.log(`Type invalide reçu dans extractDateComponents: ${typeof dateString}`, dateString);
        return { year: 9999, month: 12, day: 31 }; // Date très lointaine pour les dates vides ou invalides
    }
    
    // Valeurs par défaut (date lointaine)
    const result = {
        year: 9999,
        month: 12,
        day: 31
    };
    
    // Nettoyage du texte (suppression des articles, prépositions, etc.)
    let cleanText = dateString.toLowerCase()
        .replace(/^le\s+/i, '')
        .replace(/\s+[\u00e0\u00e0a]\s+/gi, ' ')
        .replace(/\s+de\s+/gi, ' ')
        .replace(/\s+du\s+/gi, ' ')
        .replace(/\s+des\s+/gi, ' ')
        .trim();
    
    console.log(`Date avant nettoyage: "${dateString}"`);
    console.log(`Date après nettoyage: "${cleanText}"`);
    
    // Recherche d'année (4 chiffres)
    const yearMatch = cleanText.match(/(20\d{2}|19\d{2})/); // Années 19xx ou 20xx
    if (yearMatch) {
        result.year = parseInt(yearMatch[0], 10);
        // Enlever l'année du texte pour faciliter la recherche des autres éléments
        cleanText = cleanText.replace(yearMatch[0], '');
    }
    
    // Dictionnaire des mois avec leurs valeurs numériques
    const monthDict = {
        'janvier': 1, 'janv': 1, 'jan': 1, '01': 1, '1': 1,
        'février': 2, 'fevrier': 2, 'fév': 2, 'fev': 2, '02': 2, '2': 2,
        'mars': 3, 'mar': 3, '03': 3, '3': 3,
        'avril': 4, 'avr': 4, '04': 4, '4': 4,
        'mai': 5, '05': 5, '5': 5,
        'juin': 6, '06': 6, '6': 6,
        'juillet': 7, 'juil': 7, '07': 7, '7': 7,
        'août': 8, 'aout': 8, '08': 8, '8': 8,
        'septembre': 9, 'sept': 9, 'sep': 9, '09': 9, '9': 9,
        'octobre': 10, 'oct': 10, '10': 10,
        'novembre': 11, 'nov': 11, '11': 11,
        'décembre': 12, 'decembre': 12, 'déc': 12, 'dec': 12, '12': 12
    };
    
    // Recherche du mois (texte ou chiffre)
    for (const [monthName, monthValue] of Object.entries(monthDict)) {
        if (cleanText.includes(monthName)) {
            result.month = monthValue;
            // Enlever le mois pour faciliter la recherche du jour
            cleanText = cleanText.replace(monthName, '');
            break;
        }
    }
    
    // Format court avec slashs ou tirets (JJ/MM ou MM/JJ ou JJ-MM)
    const datePatterns = [
        /(\d{1,2})[\/\-](\d{1,2})/, // JJ/MM ou JJ-MM
        /(\d{1,2})\s+(\d{1,2})/ // JJ MM
    ];
    
    for (const pattern of datePatterns) {
        const match = cleanText.match(pattern);
        if (match) {
            const num1 = parseInt(match[1], 10);
            const num2 = parseInt(match[2], 10);
            
            // Si le premier nombre est <= 12, il pourrait être le mois
            if (num1 <= 12 && result.month === 12) {
                result.month = num1;
                if (num2 <= 31) result.day = num2;
            } 
            // Si le deuxième nombre est <= 12, il pourrait être le mois
            else if (num2 <= 12 && result.month === 12) {
                result.month = num2;
                if (num1 <= 31) result.day = num1;
            }
            // Sinon, supposer que le premier est le jour
            else if (num1 <= 31) {
                result.day = num1;
            }
            
            break;
        }
    }
    
    // Recherche d'un jour simple (1 ou 2 chiffres isolés)
    const dayMatch = cleanText.match(/\b(\d{1,2})\b/);
    if (dayMatch && !result.day) {
        const potentialDay = parseInt(dayMatch[1], 10);
        if (potentialDay >= 1 && potentialDay <= 31) {
            result.day = potentialDay;
        }
    }
    
    return result;
}

/**
 * Affiche les cercles dans l'interface
 */
function renderCircles() {
    const container = document.getElementById('cercles-container');
    const template = document.getElementById('template-cercle');
    
    if (!container || !template) {
        console.error('Éléments DOM manquants');
        return;
    }
    
    // Vider le conteneur de chargement
    container.innerHTML = '';
    
    // Log le nombre de cercles chargés uniquement dans la console
    console.log(`Nombre de cercles chargés : ${circles.length}`);
    
    // Si aucun cercle n'est disponible
    if (circles.length === 0) {
        container.innerHTML = `
            <div class="col-span-2 text-center py-8 bg-blue-50 border border-blue-200 rounded-lg">
                <svg class="mx-auto h-12 w-12 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h4 class="text-lg font-medium text-blue-800 mb-2">Aucun cercle disponible</h4>
                <p class="text-blue-700">Revenez bientôt pour découvrir nos prochains cercles.</p>
            </div>
        `;
        return;
    }
    
    // Créer et ajouter chaque cercle avec animation synchronisée
    // On utilise déjà les cercles triés (par loadCirclesData)
    circles.forEach((cercle, index) => {
        // Cloner le template
        const cercleElement = template.content.cloneNode(true);
        
        // Mettre à jour les informations du cercle
        cercleElement.querySelector('.cercle-nom').textContent = cercle.nom;
        cercleElement.querySelector('.cercle-date').textContent = cercle.date;
        cercleElement.querySelector('.cercle-lieu').textContent = cercle.lieu;
        cercleElement.querySelector('.cercle-referentes').textContent = cercle.referentes;
        // Afficher la thématique à la place de la description
        cercleElement.querySelector('.cercle-description').textContent = cercle.thematique || cercle.description;
        
        // Places disponibles
        const placesDispoElement = cercleElement.querySelector('.cercle-places-dispo');
        if (placesDispoElement) {
            placesDispoElement.textContent = cercle.places_disponibles;
            // Stocker l'ID du cercle dans l'élément pour référence
            placesDispoElement.dataset.circleId = cercle.id;
            
            // Gérer les icônes d'état
            const availableIcon = cercleElement.querySelector('.cercle-available-icon');
            const fullIcon = cercleElement.querySelector('.cercle-full-icon');
            
            if (cercle.places_disponibles <= 0) {
                // Cercle complet : afficher point d'exclamation rouge
                if (availableIcon) availableIcon.style.display = 'none';
                if (fullIcon) fullIcon.style.display = 'block';
            } else {
                // Places disponibles : afficher coche verte
                if (availableIcon) availableIcon.style.display = 'block';
                if (fullIcon) fullIcon.style.display = 'none';
            }
        }
        
        // Places totales
        const placesTotalElement = cercleElement.querySelector('.cercle-places-total');
        if (placesTotalElement) {
            placesTotalElement.textContent = cercle.places_totales;
        }
        
        // Gestion des boutons d'inscription
        const inscriptionBtn = cercleElement.querySelector('.cercle-inscription-btn');
        const listeAttenteBtn = cercleElement.querySelector('.cercle-liste-attente-btn');
        
        // Stocker l'ID du cercle dans les boutons pour référence
        if (inscriptionBtn) inscriptionBtn.dataset.circleId = cercle.id;
        if (listeAttenteBtn) listeAttenteBtn.dataset.circleId = cercle.id;
        
        // Vérifier si l'utilisateur s'est déjà inscrit à ce cercle
        const userRegistrations = JSON.parse(localStorage.getItem('labreche_registrations') || '{}');
        let isAlreadyRegistered = false;
        
        // Parcourir tous les emails enregistrés pour voir si ce cercle est déjà pris
        for (const email in userRegistrations) {
            if (userRegistrations[email].includes(cercle.id)) {
                isAlreadyRegistered = true;
                break;
            }
        }
        
        // Si l'utilisateur s'est déjà inscrit à ce cercle
        if (isAlreadyRegistered) {
            // Désactiver et modifier le bouton d'inscription
            if (inscriptionBtn) {
                inscriptionBtn.disabled = true;
                inscriptionBtn.classList.remove('hover:bg-[#665aa5]', 'bg-[#7A65BF]');
                inscriptionBtn.classList.add('bg-green-500', 'cursor-not-allowed');
                
                const textSpan = inscriptionBtn.querySelector('.inscription-texte');
                if (textSpan) {
                    textSpan.textContent = 'Merci pour votre inscription !';
                } else {
                    inscriptionBtn.innerHTML = 'Merci pour votre inscription !';
                }
            }
            
            // Cacher le bouton liste d'attente
            if (listeAttenteBtn) {
                listeAttenteBtn.style.display = 'none';
            }
        }
        // Si le cercle est complet ET que l'utilisateur ne s'est pas déjà inscrit
        else if (cercle.places_disponibles <= 0) {
            // Cacher le bouton d'inscription standard
            if (inscriptionBtn) {
                inscriptionBtn.style.display = 'none';
            }
            
            // Afficher le bouton liste d'attente
            if (listeAttenteBtn) {
                listeAttenteBtn.style.display = 'flex';
                // Ajouter l'événement click pour ouvrir le popup (même formulaire)
                listeAttenteBtn.addEventListener('click', function() {
                    openPopupForCircle(cercle.id, true); // true indique liste d'attente
                });
            }
        } else {
            // Cercle avec places disponibles ET utilisateur pas encore inscrit
            if (inscriptionBtn) {
                // Ajouter l'événement click pour ouvrir le popup
                inscriptionBtn.addEventListener('click', function() {
                    openPopupForCircle(cercle.id, false); // false indique inscription normale
                });
            }
            
            // Cacher le bouton liste d'attente
            if (listeAttenteBtn) {
                listeAttenteBtn.style.display = 'none';
            }
        }
        
        // Ajouter le cercle au conteneur avec animation synchronisée
        const cercleDiv = cercleElement.querySelector('.cercle-item');
        if (cercleDiv) {
            // Initialiser l'opacité à 0 et décaler vers le bas
            cercleDiv.style.opacity = '0';
            cercleDiv.style.transform = 'translateY(30px)';
            cercleDiv.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        
        container.appendChild(cercleElement);
        
        // Animer l'apparition avec un délai progressif
        setTimeout(() => {
            if (cercleDiv) {
                cercleDiv.style.opacity = '1';
                cercleDiv.style.transform = 'translateY(0)';
            }
        }, index * 150); // Délai de 150ms entre chaque cercle
    });
}

/**
 * Ouvre le popup d'inscription pour un cercle spécifique
 * @param {string} circleId - L'identifiant du cercle
 * @param {boolean} isWaitingList - Indique si c'est une inscription sur liste d'attente
 */
function openPopupForCircle(circleId, isWaitingList = false) {
    // Trouver le cercle correspondant
    const cercle = circles.find(c => c.id === circleId);
    if (!cercle) return;
    
    const popupOverlay = document.getElementById('inscription-popup');
    if (!popupOverlay) return;
    
    // IMPORTANT: Réinitialiser complètement le formulaire avant d'ouvrir
    resetPopupForm();
    
    // Mettre à jour le titre du popup avec le nom du cercle et le statut de liste d'attente si applicable
    const popupTitle = popupOverlay.querySelector('.popup-title');
    if (popupTitle) {
        if (isWaitingList) {
            popupTitle.textContent = `Inscription sur liste d'attente - ${cercle.nom}`;
        } else {
            popupTitle.textContent = `Inscription au ${cercle.nom}`;
        }
    }
    
    // Ajouter une information dans le formulaire pour indiquer qu'il s'agit d'une inscription sur liste d'attente
    const waitingListInfo = popupOverlay.querySelector('.waiting-list-info');
    if (waitingListInfo) {
        waitingListInfo.style.display = isWaitingList ? 'block' : 'none';
    }
    
    // Stocker l'ID du cercle dans le formulaire pour la soumission
    const popupForm = document.getElementById('popup-registration-form');
    if (popupForm) {
        popupForm.dataset.circleId = circleId;
    }
    
    // Afficher le popup
    popupOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Empêcher le scroll de la page
}

/**
 * Met à jour l'affichage du nombre de places disponibles pour un cercle spécifique
 * @param {string} circleId - L'identifiant du cercle
 * @param {boolean} updateAfterSubmit - Indique si la mise à jour se fait après une soumission de formulaire
 */
function updateCircleDisplay(circleId, updateAfterSubmit = false) {
    // Trouver le cercle dans les données
    const circleIndex = circles.findIndex(c => c.id === circleId);
    if (circleIndex === -1) return;
    
    // Mettre à jour le nombre de places disponibles après soumission
    if (updateAfterSubmit) {
        circles[circleIndex].places_disponibles -= 1;
    }
    
    const availableSpots = circles[circleIndex].places_disponibles;
    const totalSpots = circles[circleIndex].places_totales;
    
    // Trouver tous les éléments du cercle dans le DOM
    document.querySelectorAll(`[data-circle-id="${circleId}"]`).forEach(element => {
        // Mettre à jour l'affichage des places disponibles
        if (element.classList.contains('cercle-places-dispo')) {
            element.textContent = availableSpots;
        }
        
        // Si c'est un bouton d'inscription
        if (element.classList.contains('cercle-inscription-btn')) {
            if (availableSpots <= 0) {
                // Désactiver le bouton si complet
                element.disabled = true;
                element.classList.add('opacity-50', 'cursor-not-allowed');
                
                // Afficher le message de cercle complet
                const cercleItem = element.closest('.cercle-item');
                if (cercleItem) {
                    const messageComplet = cercleItem.querySelector('.cercle-complet-message');
                    if (messageComplet) {
                        messageComplet.style.display = 'block';
                    }
                }
            }
        }
    });
    
    // Mettre à jour l'affichage dans le popup si ouvert
    const popupForm = document.getElementById('popup-registration-form');
    if (popupForm && popupForm.dataset.circleId === circleId) {
        // Mettre à jour l'affichage des places dans le popup si nécessaire
    }
}

/**
 * Initialise la gestion de la popup
 */
function initializePopup() {
    const popupOverlay = document.getElementById('inscription-popup');
    const closePopupBtn = document.getElementById('close-popup');
    
    if (!popupOverlay) return;
    
    // Fermeture de la popup avec le bouton
    if(closePopupBtn) {
        closePopupBtn.addEventListener('click', function() {
            popupOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Réactiver le scroll
            resetPopupForm();
        });
    }
    
    // Fermer la popup en cliquant en dehors
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            popupOverlay.classList.remove('active');
            document.body.style.overflow = '';
            resetPopupForm();
        }
    });
}

/**
 * Soumet une inscription via Google Apps Script
 * @param {string} circleName - Nom du cercle (nom de l'onglet)
 * @param {string} firstName - Prénom de la personne
 * @param {string} lastName - Nom de la personne  
 * @param {string} email - Email de la personne
 * @returns {Promise<boolean>} - true si succès, false sinon
 */
async function submitRegistrationToGoogleSheets(circleName, firstName, lastName, email) {
    // URL du Google Apps Script déployé
    const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbyJwAt6eyzH_2OJL16OfVGTl6Bjm6sxz_BKf_0frsGWi4NT0SsLiuYOHqtGquDi8isEMA/exec';
    
    console.log('URL Google Apps Script utilisée:', appsScriptUrl);
    console.log(`Tentative d'inscription pour ${firstName} ${lastName} (${email}) dans l'onglet: ${circleName}`);
    
    try {
        // Créer les données du formulaire
        const formData = new FormData();
        formData.append('Name', firstName);
        formData.append('LastName', lastName);
        formData.append('Email', email);
        formData.append('SheetName', circleName); // Ajouter le nom de l'onglet
        
        const response = await fetch(appsScriptUrl, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            console.error('Erreur réseau:', response.status);
            throw new Error(`Erreur réseau: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Réponse du serveur:', result);
        
        if (result.result === 'success') {
            console.log('Inscription réussie! Ligne ajoutée:', result.row);
            return true;
        } else {
            console.error('Erreur d\'inscription:', result.error || result);
            return false;
        }
        
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        return false;
    }
}

/**
 * Initialise le formulaire d'inscription
 */
function initializeForm() {
    const popupForm = document.getElementById('popup-registration-form');
    const popupOverlay = document.getElementById('inscription-popup');
    
    if (!popupForm) return;
    
    popupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Réinitialiser les messages d'erreur
        document.querySelectorAll('.popup-error').forEach(err => {
            err.style.display = 'none';
        });
        
        // Masquer les messages d'erreur personnalisés s'ils sont affichés
        const apiErrorElement = document.getElementById('popup-api-error');
        if (apiErrorElement) {
            apiErrorElement.style.display = 'none';
        }
        
        // Récupérer les valeurs
        const firstName = document.getElementById('popup-first-name').value.trim();
        const lastName = document.getElementById('popup-last-name').value.trim();
        const email = document.getElementById('popup-email').value.trim();
        const phone = document.getElementById('popup-phone') ? document.getElementById('popup-phone').value.trim() : '';
        
        // Valider les champs
        let hasErrors = false;
        
        if (!firstName) {
            document.getElementById('popup-first-name-error').style.display = 'block';
            hasErrors = true;
        }
        
        if (!lastName) {
            document.getElementById('popup-last-name-error').style.display = 'block';
            hasErrors = true;
        }
        
        if (!email || !validateEmail(email)) {
            document.getElementById('popup-email-error').style.display = 'block';
            hasErrors = true;
        }
        
        // Si aucune erreur, traiter le formulaire
        if (!hasErrors) {
            // Désactiver le bouton de soumission et afficher chargement
            const submitBtn = document.getElementById('popup-submit-btn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Inscription en cours...
                `;
            }
            
            // Récupérer l'ID du cercle concerné
            const circleId = popupForm.dataset.circleId;
            
            // Trouver le cercle correspondant dans les données
            const circle = circles.find(c => c.id === circleId || c.title === circleId);
            if (!circle) {
                console.error("Cercle non trouvé:", circleId);
                showApiError("Cercle non trouvé. Veuillez réessayer.");
                return false;
            }
            
            // Appeler la fonction d'inscription dans Google Sheets
            submitRegistrationToGoogleSheets(circle.nom, firstName, lastName, email)
                .then(success => {
                    if (success) {
                        // Inscription réussie
                        console.log('Inscription réussie dans Google Sheets');
                        
                        // Marquer ce cercle comme inscrit dans le localStorage
                        markCircleAsRegistered(circleId, email);
                        
                        // Désactiver le bouton d'inscription pour ce cercle
                        disableCircleButton(circleId);
                        
                        // Mettre à jour le nombre de places disponibles
                        updateCircleDisplay(circleId, true);
                        
                        // Mettre à jour le titre du message de succès avec le nom du cercle
                        const successMessageTitle = document.getElementById('popup-success-title');
                        if (successMessageTitle) {
                            successMessageTitle.textContent = `Inscription confirmée au ${circle.nom}`;
                        }
                    
                    // Cacher le formulaire et afficher le message de succès
                    const popupForm = document.getElementById('popup-registration-form');
                    const successMessage = document.getElementById('popup-success-message');
                    const messagesContainer = document.getElementById('popup-messages-container');
                    
                    if (popupForm) popupForm.style.display = 'none';
                    if (messagesContainer) messagesContainer.style.display = 'block';
                    if (successMessage) {
                        successMessage.style.display = 'block';
                        
                        // Mettre à jour le message avec les données du cercle
                        const circleDate = circle.date || circle.dateText || 'date à confirmer';
                        successMessage.innerHTML = `
                            <div class="text-center">
                                <svg class="mx-auto h-12 w-12 text-green-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <h3 class="text-lg font-semibold text-green-800 mb-2">Inscription confirmée !</h3>
                                <p class="text-green-700 mb-6">Merci pour votre inscription au cercle du <strong>${circleDate}</strong></p>
                                
                                <!-- Bouton calendrier stylisé -->
                                <button id="popup-calendar-btn" class="cercle-calendar-btn inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-105">
                                    <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                                    </svg>
                                    Ajouter à mon agenda
                                </button>
                                
                                <p class="text-xs text-green-600 mt-3">
                                    💡 L'événement sera ajouté à votre Google Calendar avec tous les détails
                                </p>
                            </div>
                        `;
                    }
                    
                    // Créer directement le lien Google Calendar
                    const createGoogleCalendarLink = (circleData) => {
                        const title = encodeURIComponent(`Cercle d'écoute - ${circleData.nom || circleData.title || 'La Brèche'}`);
                        const location = encodeURIComponent('CRIDEV, 41 Av. Jean Janvier, 35000 Rennes');
                        const details = encodeURIComponent(`Cercle d'écoute organisé par La Brèche.

Thématique : ${circleData.nom || circleData.title || 'À définir'}
Durée : 2 heures (accueil 15 minutes avant)

Infos pratiques :
- Participation gratuite
- Cadre bienveillant et confidentiel
- Médiatrices présentes pour faciliter les échanges

Contact : contact@labreche.org`);
                        
                        // Parser la date du cercle pour créer les dates de début et fin
                        const dateText = circleData.date || circleData.dateText || '';
                        let startDate = '';
                        let endDate = '';
                        
                        // Essayer de parser la date (format attendu: "15 octobre 2024, 18h45 - 20h45" ou similaire)
                        const dateMatch = dateText.match(/(\d{1,2})\s+(\w+)\s+(\d{4})/);
                        const timeMatch = dateText.match(/(\d{1,2})h(\d{2})/);
                        
                        if (dateMatch && timeMatch) {
                            const day = dateMatch[1].padStart(2, '0');
                            const monthName = dateMatch[2].toLowerCase();
                            const year = dateMatch[3];
                            const hour = timeMatch[1].padStart(2, '0');
                            const minute = timeMatch[2];
                            
                            // Conversion des mois français
                            const months = {
                                'janvier': '01', 'février': '02', 'mars': '03', 'avril': '04',
                                'mai': '05', 'juin': '06', 'juillet': '07', 'août': '08',
                                'septembre': '09', 'octobre': '10', 'novembre': '11', 'décembre': '12'
                            };
                            
                            const month = months[monthName] || '01';
                            
                            // Format: YYYYMMDDTHHMMSS
                            startDate = `${year}${month}${day}T${hour}${minute}00`;
                            
                            // Ajouter 2 heures pour la fin
                            let endHour = parseInt(hour) + 2;
                            if (endHour >= 24) endHour -= 24;
                            endDate = `${year}${month}${day}T${endHour.toString().padStart(2, '0')}${minute}00`;
                        } else {
                            // Date par défaut si parsing échoue
                            const now = new Date();
                            const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
                            const year = nextWeek.getFullYear();
                            const month = (nextWeek.getMonth() + 1).toString().padStart(2, '0');
                            const day = nextWeek.getDate().toString().padStart(2, '0');
                            
                            startDate = `${year}${month}${day}T184500`;
                            endDate = `${year}${month}${day}T204500`;
                        }
                        
                        return `https://calendar.google.com/calendar/u/0/r/eventedit?text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}&ctz=Europe/Paris`;
                    };
                    
                    // Stocker le lien Google Calendar
                    const googleCalendarUrl = createGoogleCalendarLink(circle);
                    
                    // Initialiser le bouton calendrier dans la popup de succès
                    setTimeout(() => {
                        const calendarBtn = document.getElementById('popup-calendar-btn');
                        if (calendarBtn) {
                            calendarBtn.addEventListener('click', function(e) {
                                e.preventDefault();
                                console.log('Ouverture du lien Google Calendar:', googleCalendarUrl);
                                window.open(googleCalendarUrl, '_blank', 'noopener');
                            });
                        }
                    }, 100);
                    
                    // Initialiser l'intégration calendrier (ancienne méthode - garder pour compatibilité)
                    if (typeof initializeCalendarIntegration === 'function') {
                        const circleData = getSelectedCircleData();
                        initializeCalendarIntegration(circleData);
                    }
                    

                } else {
                    // Échec de l'inscription
                    console.error('Échec de l\'inscription');
                    showApiError('Une erreur est survenue lors de l\'inscription');
                }
            })
            .catch(error => {
                console.error('Erreur lors de l\'envoi des données:', error);
                showApiError('Problème de connexion au serveur. Veuillez réessayer.');
            });
        }
    });
    
    // Fonction pour afficher les erreurs d'API
    function showApiError(message) {
        // Créer un élément d'erreur s'il n'existe pas
        let apiErrorElement = document.getElementById('popup-api-error');
        if (!apiErrorElement) {
            apiErrorElement = document.createElement('div');
            apiErrorElement.id = 'popup-api-error';
            apiErrorElement.className = 'text-red-600 font-medium mt-4 text-center';
            const formContainer = document.getElementById('popup-form-container');
            if (formContainer) {
                formContainer.appendChild(apiErrorElement);
            }
        }
        
        // Afficher le message d'erreur
        apiErrorElement.textContent = message;
        apiErrorElement.style.display = 'block';
        
        // Réactiver le bouton
        const submitBtn = document.getElementById('popup-submit-btn');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = "S'inscrire";
        }
    }
}

/**
 * Réinitialise le formulaire de la popup
 */
function resetPopupForm() {
    const popupForm = document.getElementById('popup-registration-form');
    if (!popupForm) return;
    
    // Réinitialiser les champs
    popupForm.reset();
    
    // Cacher tous les messages d'erreur
    document.querySelectorAll('.popup-error').forEach(err => {
        err.style.display = 'none';
    });
    
    // Cacher les messages d'erreur d'API
    const apiErrorElement = document.getElementById('popup-api-error');
    if (apiErrorElement) {
        apiErrorElement.style.display = 'none';
    }
    
    // Réinitialiser le bouton de soumission
    const submitBtn = document.getElementById('popup-submit-btn');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = "S'inscrire";
    }
    
    // Afficher le formulaire et cacher le message de succès
    const formContainer = document.getElementById('popup-form-container');
    const successMessage = document.getElementById('popup-success-message');
    const messagesContainer = document.getElementById('popup-messages-container');
    
    if (formContainer) formContainer.style.display = 'block';
    if (popupForm) popupForm.style.display = 'block';
    if (successMessage) successMessage.style.display = 'none';
    if (messagesContainer) messagesContainer.style.display = 'none';
    
    // Supprimer le bouton de fermeture s'il existe
    const closeBtn = document.getElementById('popup-close-after-success');
    if (closeBtn) {
        closeBtn.remove();
    }
    
    // Réinitialiser le titre de la popup
    const popupTitle = document.querySelector('.popup-title');
    if (popupTitle) {
        popupTitle.textContent = 'Inscription';
    }
    
    // Supprimer l'ID du cercle du formulaire
    popupForm.removeAttribute('data-circle-id');
}

/**
 * Fonction de validation d'email simple
 * @param {string} email - L'adresse email à valider
 * @returns {boolean} - true si l'email est valide, false sinon
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Marque un cercle comme inscrit dans le localStorage
 * @param {string} circleId - ID du cercle
 * @param {string} email - Email de l'utilisateur
 */
function markCircleAsRegistered(circleId, email) {
    try {
        // Récupérer les inscriptions existantes
        const registrations = JSON.parse(localStorage.getItem('labreche_registrations') || '{}');

        // Ajouter cette inscription
        if (!registrations[email]) {
            registrations[email] = [];
        }

        // Vérifier si déjà inscrit (sécurité)
        if (!registrations[email].includes(circleId)) {
            registrations[email].push(circleId);
            localStorage.setItem('labreche_registrations', JSON.stringify(registrations));
            console.log(`Cercle ${circleId} marqué comme inscrit pour ${email}`);
        }
    } catch (error) {
        console.error('Erreur lors de la sauvegarde de l\'inscription:', error);
    }
}

/**
 * Vérifie si un utilisateur est déjà inscrit à un cercle
 * @param {string} circleId - ID du cercle
 * @param {string} email - Email de l'utilisateur
 * @returns {boolean} - true si déjà inscrit
 */
function isUserRegisteredToCircle(circleId, email) {
    try {
        const registrations = JSON.parse(localStorage.getItem('labreche_registrations') || '{}');
        return registrations[email] && registrations[email].includes(circleId);
    } catch (error) {
        console.error('Erreur lors de la vérification de l\'inscription:', error);
        return false;
    }
}

/**
 * Désactive le bouton d'inscription pour un cercle
 * @param {string} circleId - ID du cercle
 */
function disableCircleButton(circleId) {
    // Trouver tous les boutons d'inscription pour ce cercle
    const inscriptionBtns = document.querySelectorAll(`[data-circle-id="${circleId}"]`);

    inscriptionBtns.forEach(btn => {
        if (btn.classList.contains('cercle-inscription-btn')) {
            // Désactiver le bouton
            btn.disabled = true;
            btn.classList.remove('hover:bg-[#665aa5]');
            btn.classList.add('bg-green-500', 'cursor-not-allowed');

            // Changer le texte
            const textSpan = btn.querySelector('.inscription-texte');
            if (textSpan) {
                textSpan.textContent = 'Merci pour votre inscription !';
            } else {
                btn.innerHTML = 'Merci pour votre inscription !';
            }

            // Supprimer l'événement de clic
            btn.onclick = null;
            btn.removeEventListener('click', btn._clickHandler);

            console.log(`Bouton désactivé pour le cercle ${circleId}`);
        }
    });
}

/**
 * Dans une future implémentation : charger les informations des cercles depuis un Google Sheet
 * Cette fonction peut être adaptée pour utiliser l'API Google Sheets ou un service proxy
 */
function loadCirclesFromGoogleSheet() {
    // Placeholder pour une future implémentation
    // Cette fonction pourrait utiliser l'API Google Sheets pour charger dynamiquement
    // les informations des cercles depuis une feuille de calcul
    
    console.log('loadCirclesFromGoogleSheet: Fonction non implémentée');
    
    // Exemple de structure de retour attendue :
    /*
    return [
        {
            id: 'cercle-1',
            nom: 'Masculinités et émotions',
            date: '15 septembre 2024',
            heure: '14h00 - 16h00',
            lieu: 'CRIDEV, Rennes',
            description: 'Explorer la relation entre masculinité et expression émotionnelle.',
            places_disponibles: 8,
            places_totales: 12,
            animateur: 'Équipe La Brèche',
            thematique: 'Émotions et vulnérabilité',
            prerequis: 'Aucun prérequis',
            materiel: 'Aucun matériel nécessaire'
        },
        // ... autres cercles
    ];
    */
    
    // Pour l'instant, retourner un tableau vide
    return [];
}

// ===== FORMULAIRE DE CONTACT =====

/**
 * Ouvre la pop-up de contact
 */
function openContactPopup() {
    const contactPopup = document.getElementById('contact-popup');
    if (contactPopup) {
        resetContactPopupForm();
        contactPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Ferme la pop-up de contact
 */
function closeContactPopup() {
    const contactPopup = document.getElementById('contact-popup');
    if (contactPopup) {
        contactPopup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

/**
 * Initialise le formulaire de contact
 */
function initializeContactForm() {
    const contactForm = document.getElementById('contact-popup-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleContactFormSubmit);
    
    // Gestionnaires pour fermer la pop-up
    const closeBtn = document.getElementById('close-contact-popup');
    const closeBtns = document.querySelectorAll('.contact-popup-close-btn');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeContactPopup);
    }
    
    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeContactPopup);
    });
    
    // Fermer en cliquant sur l'overlay
    const contactPopup = document.getElementById('contact-popup');
    if (contactPopup) {
        contactPopup.addEventListener('click', function(e) {
            if (e.target === contactPopup) {
                closeContactPopup();
            }
        });
    }
}

/**
 * Gère la soumission du formulaire de contact
 * @param {Event} event - L'événement de soumission du formulaire
 */
async function handleContactFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = document.getElementById('contact-popup-submit-btn');
    const submitText = document.getElementById('contact-popup-submit-text');
    const loading = document.getElementById('contact-popup-loading');
    const successContent = document.getElementById('contact-popup-success-content');
    const successMessage = document.getElementById('contact-popup-success-message');
    const errorMessage = document.getElementById('contact-popup-error-message');
    
    // Récupérer les données du formulaire
    const formData = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        subject: form.subject.value,
        message: form.message.value.trim()
    };
    
    // Validation basique
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showContactError('Veuillez remplir tous les champs.');
        return;
    }
    
    if (!validateEmail(formData.email)) {
        showContactError('Veuillez entrer une adresse email valide.');
        return;
    }
    
    // Masquer les messages précédents
    if (successMessage) successMessage.classList.add('hidden');
    if (errorMessage) errorMessage.classList.add('hidden');
    if (successContent) successContent.style.display = 'none';
    form.style.display = 'block';
    
    // Afficher l'état de chargement
    submitBtn.disabled = true;
    submitText.textContent = 'Envoi en cours...';
    loading.classList.remove('hidden');
    
    try {
        // Envoyer le message via EmailJS ou un service similaire
        const success = await sendContactEmail(formData);
        
        if (success) {
            // Succès
            form.reset();
            form.style.display = 'none';
            if (successContent) {
                successContent.style.display = 'block';
            }
            
            // Initialiser l'intégration calendrier pour le formulaire de contact
            if (typeof initializeContactCalendarIntegration === 'function') {
                initializeContactCalendarIntegration();
            }
        } else {
            throw new Error('Échec de l\'envoi');
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi du message de contact:', error);
        showContactError('Une erreur est survenue lors de l\'envoi. Veuillez réessayer.');
    } finally {
        // Réinitialiser l'état du bouton
        submitBtn.disabled = false;
        submitText.textContent = 'Envoyer le message';
        loading.classList.add('hidden');
    }
}

/**
 * Envoie un email de contact via un service externe
{{ ... }}
 * @returns {Promise<boolean>} - true si succès, false sinon
 */
async function sendContactEmail(formData) {
    // Pour l'instant, nous allons utiliser un service simple comme formspree.io
    // ou créer un script Google Apps Script pour envoyer l'email
    
    // URL du script Google Apps Script pour l'envoi d'emails
    // Vous devrez créer ce script et remplacer cette URL
    const CONTACT_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
    
    try {
        // Préparer les données à envoyer
        const payload = {
            to: 'labreche.rennes@gmail.com',
            subject: `[Site La Brèche] ${formData.subject}`,
            name: formData.name,
            email: formData.email,
            message: formData.message,
            timestamp: new Date().toISOString()
        };
        
        // Pour l'instant, simuler un envoi réussi
        // Dans une vraie implémentation, vous feriez :
        /*
        const response = await fetch(CONTACT_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        
        return response.ok;
        */
        
        // Simulation d'un délai d'envoi
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Pour les tests, toujours retourner true
        // En production, vous devrez implémenter l'envoi réel
        console.log('Message de contact à envoyer:', payload);
        return true;
        
    } catch (error) {
        console.error('Erreur lors de l\'envoi du message de contact:', error);
        return false;
    }
}

/**
 * Réinitialise le formulaire de contact de la pop-up
 */
function resetContactPopupForm() {
    const form = document.getElementById('contact-popup-form');
    const successContent = document.getElementById('contact-popup-success-content');
    const successMessage = document.getElementById('contact-popup-success-message');
    const errorMessage = document.getElementById('contact-popup-error-message');
    const submitBtn = document.getElementById('contact-popup-submit-btn');
    const submitText = document.getElementById('contact-popup-submit-text');
    const loading = document.getElementById('contact-popup-loading');
    
    if (form) {
        form.reset();
        form.style.display = 'block';
    }
    
    if (successContent) successContent.style.display = 'none';
    if (successMessage) successMessage.style.display = 'none';
    if (errorMessage) errorMessage.style.display = 'none';
    
    if (submitBtn) {
        submitBtn.disabled = false;
    }
    if (submitText) {
        submitText.textContent = 'Envoyer le message';
    }
    if (loading) {
        loading.classList.add('hidden');
    }
}

/**
 * Affiche un message d'erreur pour le formulaire de contact
 * @param {string} message - Le message d'erreur à afficher
 */
function showContactError(message) {
    const errorMessage = document.getElementById('contact-popup-error-message');
    const successMessage = document.getElementById('contact-popup-success-message');
    const successContent = document.getElementById('contact-popup-success-content');
    
    if (successMessage) successMessage.style.display = 'none';
    if (successContent) successContent.style.display = 'none';
    if (errorMessage) {
        errorMessage.style.display = 'block';
        
        // Mettre à jour le message si nécessaire
        if (message) {
            const textContent = errorMessage.textContent;
            if (textContent.includes('Une erreur est survenue')) {
                errorMessage.innerHTML = errorMessage.innerHTML.replace(
                    /Une erreur est survenue\..*/,
                    message
                );
            }
        }
    }
}
