// Structure des données pour les cercles
let circles = [];

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

// Fonction d'initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation du reste de l'application
    initializeApp();
    
    // Animation progressive des images de fond
    animateHeroBackground();
    animateFonctionnementBackground();
    
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
 * Démarre l'animation de déchirure et révèle le contenu
 */
function startTearAnimation() {
    const leftHalf = document.getElementById('left-half');
    const rightHalf = document.getElementById('right-half');
    const tearAnimation = document.getElementById('tear-animation');
    const logoCenter = document.getElementById('logo-center');
    const mainContent = document.querySelectorAll('.content');
    const heroWave = document.getElementById('hero-wave');
    
    console.log('Animation de déchirure démarrée');
    
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
        mainContent.forEach(element => {
            element.classList.add('show-content');
        });
        tearAnimation.style.display = 'none';
        
        // Activer l'animation de la vague Hero SVG
        if (heroWave) {
            heroWave.classList.add('animate');
        }
    }, 1500);
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
    console.log(`Utilisation de l'ID de feuille: ${sheetId}`)
    
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
        console.log('Données du spreadsheet reçues:', JSON.stringify(sheetsData).substring(0, 200) + '...');
        
        const sheets = sheetsData.sheets || [];
        console.log(`Nombre total d'onglets: ${sheets.length}`);
        
        // 2. Filtrer les onglets (exclure "Historique des cercles")
        const circleSheets = sheets.filter(sheet => 
            sheet.properties.title !== "Historique des cercles"
        );
        
        console.log(`Nombre d'onglets après filtrage: ${circleSheets.length}`);
        circleSheets.forEach(sheet => console.log(`- Onglet: ${sheet.properties.title}`));
        
        // 3. Récupérer les données de chaque onglet
        const circlesData = [];
        
        for (const sheet of circleSheets) {
            const sheetTitle = sheet.properties.title;
            // Récupérer les colonnes B à E (indices 1-4) des lignes 1 à 50
            const range = `${sheetTitle}!B1:E50`;
            
            // Requête pour récupérer les données de cet onglet
            const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
            console.log(`Récupération des données de l'onglet ${sheetTitle}: ${sheetUrl}`);
            
            const response = await fetch(sheetUrl);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Erreur lors de la récupération des données pour l'onglet ${sheetTitle}:`, response.status, errorText);
                continue;
            }
            
            console.log(`Données de l'onglet ${sheetTitle} reçues avec succès`);
            
            const data = await response.json();
            const values = data.values || [];
            
            // Créer un objet cercle
            const circle = {
                id: sheetTitle.toLowerCase().replace(/\s+/g, '-'),
                nom: sheetTitle
            };
            
            // Récupérer les valeurs spécifiques selon le nouveau mapping demandé
            // C2: thématique
            if (values && values.length >= 2 && values[1] && values[1].length >= 2) {
                circle['thematique'] = values[1][1] || 'Thématique à confirmer';
            }
            
            // C3: nombre de places maximum
            if (values && values.length >= 3 && values[2] && values[2].length >= 2) {
                const placesMax = parseInt(values[2][1], 10);
                if (!isNaN(placesMax)) {
                    circle['places_max'] = placesMax;
                }
            }
            
            // C4: date et heure
            if (values && values.length >= 4 && values[3] && values[3].length >= 2) {
                circle['date'] = values[3][1] || 'Date à confirmer';
            }
            
            // C5: lieu
            if (values && values.length >= 5 && values[4] && values[4].length >= 2) {
                circle['lieu'] = values[4][1] || 'Lieu à confirmer';
            }
            
            // C6: nombre de places restantes
            if (values && values.length >= 6 && values[5] && values[5].length >= 2) {
                const placesRestantes = parseInt(values[5][1], 10);
                if (!isNaN(placesRestantes)) {
                    circle['places_disponibles'] = Math.max(0, placesRestantes);
                }
            }
            
            // Conserver le traitement des autres lignes pour compatibilité
            for (let i = 1; i < values.length; i++) {
                if (values[i] && values[i].length >= 2 && values[i][0]) {
                    const key = values[i][0].toLowerCase().replace(/\s+/g, '_');
                    // Éviter d'écraser les valeurs déjà définies par le nouveau mapping
                    if (!['thematique', 'date', 'lieu', 'places_disponibles', 'places_max'].includes(key)) {
                        circle[key] = values[i][1] || '';
                    }
                }
            }
            
            // Compter le nombre de participants (colonne E moins 2)
            const participantsRows = values.filter((row, index) => 
                index > 0 && // Ignorer l'en-tête
                row.length >= 4 && row[3] // Vérifier que la colonne E (indice 3) existe et n'est pas vide
            );
            
            const participantsCount = Math.max(0, participantsRows.length - 2);
            
            // Ajouter les places totales
            // Utiliser places_max si disponible (extrait de C2), sinon fallback sur les propriétés existantes
            const capaciteTotale = circle.places_max || parseInt(circle.capacite_totale || circle.capacité_totale || "20");
            circle.places_totales = capaciteTotale;
            
            // Si places_disponibles n'est pas déjà défini à partir de C6, le calculer comme avant
            if (typeof circle.places_disponibles === 'undefined') {
                circle.places_disponibles = Math.max(0, capaciteTotale - participantsCount);
            }
            
            // S'assurer que toutes les propriétés nécessaires existent
            circle.date = circle.date || "Date à confirmer";
            circle.lieu = circle.lieu || "Lieu à confirmer";
            circle.referentes = circle.referentes || "A confirmer";
            circle.thematique = circle.thematique || "Thématique à confirmer";
            circle.description = circle.description || circle.thematique || `Description du cercle ${sheetTitle}`;
            
            circlesData.push(circle);
        }
        
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
    if (!dateString) {
        return { year: 9999, month: 12, day: 31 }; // Date très lointaine pour les dates vides
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
    
    // Créer et ajouter chaque cercle
    // On utilise déjà les cercles triés (par loadCirclesData)
    circles.forEach(cercle => {
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
        
        // Si le cercle est complet
        if (cercle.places_disponibles <= 0) {
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
            
            // Le message 'cercle complet' a été supprimé, nous utilisons maintenant les icônes d'état
        } else {
            // Cercle avec places disponibles
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
        
        // Ajouter le cercle au conteneur
        container.appendChild(cercleElement);
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
            
            // Préparer les données à envoyer à l'API
            const formData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone
            };
            
            // URL de l'API Google Apps Script
            const apiUrl = 'https://script.google.com/macros/s/AKfycbynsyYR5GtOMpy6xomXTA0RUvHiHVLnvp77LHMP_51NcQcz4aZIvW36LYlzzF2lKzBXXQ/exec';
            
            // Envoyer les données à l'API
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    secretKey: 'la-breche-2025',
                    circleName: circle.title,
                    formData: formData
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur réseau: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    // Inscription réussie
                    console.log('Inscription réussie:', data);
                    
                    // Mettre à jour le nombre de places disponibles
                    updateCircleDisplay(circleId, true);
                    
                    // Mettre à jour le titre du message de succès avec le nom du cercle
                    const successMessageTitle = document.getElementById('popup-success-title');
                    if (successMessageTitle) {
                        successMessageTitle.textContent = `Inscription confirmée au ${circle.title}`;
                    }
                    
                    // Cacher le formulaire et afficher le message de succès
                    document.getElementById('popup-form-container').style.display = 'none';
                    document.getElementById('popup-success-message').style.display = 'block';
                    
                    // Ajouter un bouton pour fermer le popup après l'inscription
                    const successMessage = document.getElementById('popup-success-message');
                    if (successMessage) {
                        // Créer le bouton de fermeture s'il n'existe pas déjà
                        let closeBtn = document.getElementById('popup-close-after-success');
                        if (!closeBtn) {
                            closeBtn = document.createElement('button');
                            closeBtn.id = 'popup-close-after-success';
                            closeBtn.className = 'bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded mt-4';
                            closeBtn.textContent = 'Fermer';
                            successMessage.appendChild(closeBtn);
                            
                            // Ajouter l'événement de clic pour fermer la popup complètement
                            closeBtn.addEventListener('click', function() {
                                const popupOverlay = document.getElementById('inscription-popup');
                                if (popupOverlay) {
                                    popupOverlay.classList.remove('active');
                                    document.body.style.overflow = ''; // Réactiver le scroll
                                }
                            });
                        }
                    }
                } else {
                    // Échec de l'inscription
                    console.error('Erreur d\'inscription:', data.error);
                    showApiError(data.error || 'Une erreur est survenue lors de l\'inscription');
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
    
    // Cacher les messages d'erreur
    document.querySelectorAll('.popup-error').forEach(err => {
        err.style.display = 'none';
    });
    
    // Afficher le formulaire et cacher le message de succès
    if (document.getElementById('popup-form-container')) {
        document.getElementById('popup-form-container').style.display = 'block';
    }
    if (document.getElementById('popup-success-message')) {
        document.getElementById('popup-success-message').style.display = 'none';
    }
    
    // Réinitialiser le bouton de soumission
    const submitBtn = document.getElementById('popup-submit-btn');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Confirmer mon inscription';
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
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Dans une future implémentation : charger les informations des cercles depuis un Google Sheet
 * Cette fonction peut être adaptée pour utiliser l'API Google Sheets ou un service proxy
 */
function loadCirclesFromGoogleSheet() {
    // URL de l'API (à remplacer par l'URL réelle de l'API Google Sheets ou d'un service intermédiaire)
    const apiUrl = 'https://example.com/api/google-sheets-proxy';
    
    // Dans une implémentation réelle :
    /*
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }
            return response.json();
        })
        .then(data => {
            // Transformer les données du format Google Sheets vers notre format de cercles
            return data.values.map((row, index) => {
                if (index === 0) return null; // Ignorer l'en-tête
                
                return {
                    id: row[0] || `cercle-${index}`,
                    nom: row[1] || 'Cercle sans nom',
                    date: row[2] || 'Date non précisée',
                    lieu: row[3] || 'Lieu non précisé',
                    referentes: row[4] || 'Référentes non précisées',
                    description: row[5] || 'Pas de description disponible',
                    places_disponibles: parseInt(row[6], 10) || 0,
                    places_totales: parseInt(row[7], 10) || 0
                };
            }).filter(item => item !== null); // Filtrer l'en-tête
        });
    */
    
    // Pour le moment, on utilise des données simulées
    console.log('Chargement des cercles depuis Google Sheet - simulation');
    return loadCirclesData(); // Utilise notre fonction de simulation pour l'instant
}
