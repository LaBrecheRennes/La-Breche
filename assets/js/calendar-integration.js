// ===== INTÉGRATION CALENDRIER =====

/**
 * Initialise l'intégration calendrier après une inscription réussie
 * @param {Object} circleData - Les données du cercle inscrit
 */
function initializeCalendarIntegration(circleData) {
    const googleCalendarLink = document.getElementById('google-calendar-link');
    const downloadIcsButton = document.getElementById('download-ics');
    
    if (googleCalendarLink && circleData) {
        // Générer le lien Google Calendar
        const googleCalendarUrl = generateGoogleCalendarUrl(circleData);
        googleCalendarLink.href = googleCalendarUrl;
        googleCalendarLink.style.display = 'inline-block';
    }
    
    if (downloadIcsButton && circleData) {
        // Ajouter l'événement pour télécharger le fichier .ics
        downloadIcsButton.addEventListener('click', () => {
            generateAndDownloadIcs(circleData);
        });
        downloadIcsButton.style.display = 'inline-block';
    }
}

/**
 * Génère une URL Google Calendar pré-remplie
 * @param {Object} circleData - Les données du cercle
 * @returns {string} - URL Google Calendar
 */
function generateGoogleCalendarUrl(circleData) {
    const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    
    // Titre de l'événement
    const title = encodeURIComponent(`Cercle d'écoute - ${circleData.title || 'La Brèche'}`);
    
    // Dates (format YYYYMMDDTHHMMSSZ en UTC)
    const startDate = formatDateForCalendar(circleData.date, circleData.time || '18:00');
    const endDate = formatDateForCalendar(circleData.date, circleData.endTime || '20:00');
    
    // Description
    const description = encodeURIComponent(
        `Cercle d'écoute organisé par La Brèche.\n\n` +
        `Thématique : ${circleData.title || 'À définir'}\n` +
        `Durée : 2 heures (accueil 15 minutes avant)\n\n` +
        `Informations pratiques :\n` +
        `- Participation gratuite\n` +
        `- Cadre bienveillant et confidentiel\n` +
        `- Médiatrices présentes pour faciliter les échanges\n\n` +
        `Contact : contact@labreche.org`
    );
    
    // Lieu
    const location = encodeURIComponent('CRIDEV, Avenue Janvier, Rennes');
    
    // Fuseau horaire
    const timezone = 'Europe/Paris';
    
    return `${baseUrl}&text=${title}&dates=${startDate}/${endDate}&details=${description}&location=${location}&ctz=${timezone}`;
}

/**
 * Génère et télécharge un fichier .ics
 * @param {Object} circleData - Les données du cercle
 */
function generateAndDownloadIcs(circleData) {
    const startDate = formatDateForIcs(circleData.date, circleData.time || '18:00');
    const endDate = formatDateForIcs(circleData.date, circleData.endTime || '20:00');
    const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const uid = `${circleData.id || Date.now()}@labreche.org`;
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//La Brèche//Cercles d'écoute//FR
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${now}
DTSTART;TZID=Europe/Paris:${startDate}
DTEND;TZID=Europe/Paris:${endDate}
SUMMARY:Cercle d'écoute - ${circleData.title || 'La Brèche'}
DESCRIPTION:Cercle d'écoute organisé par La Brèche.\\n\\nThématique : ${circleData.title || 'À définir'}\\nDurée : 2 heures (accueil 15 minutes avant)\\n\\nInformations pratiques :\\n- Participation gratuite\\n- Cadre bienveillant et confidentiel\\n- Médiatrices présentes pour faciliter les échanges\\n\\nContact : contact@labreche.org
LOCATION:CRIDEV\\, Avenue Janvier\\, Rennes
STATUS:CONFIRMED
TRANSP:OPAQUE
BEGIN:VALARM
TRIGGER:-PT1H
DESCRIPTION:Rappel : Cercle d'écoute dans 1 heure
ACTION:DISPLAY
END:VALARM
END:VEVENT
END:VCALENDAR`.trim();

    // Créer et télécharger le fichier
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cercle-ecoute-${circleData.title ? circleData.title.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'labreche'}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Formate une date pour Google Calendar (format YYYYMMDDTHHMMSSZ en UTC)
 * @param {string} dateString - Date au format français (ex: "15/09/2024")
 * @param {string} timeString - Heure au format HH:MM
 * @returns {string} - Date formatée pour Google Calendar
 */
function formatDateForCalendar(dateString, timeString) {
    if (!dateString) return '';
    
    try {
        // Parser la date française (DD/MM/YYYY)
        const dateParts = dateString.split('/');
        if (dateParts.length !== 3) return '';
        
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Mois 0-indexé
        const year = parseInt(dateParts[2], 10);
        
        // Parser l'heure
        const timeParts = timeString.split(':');
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10) || 0;
        
        // Créer la date en heure locale française
        const date = new Date(year, month, day, hours, minutes);
        
        // Convertir en UTC et formater
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    } catch (error) {
        console.error('Erreur lors du formatage de la date:', error);
        return '';
    }
}

/**
 * Formate une date pour fichier .ics (format YYYYMMDDTHHMMSS sans Z car on spécifie le timezone)
 * @param {string} dateString - Date au format français
 * @param {string} timeString - Heure au format HH:MM
 * @returns {string} - Date formatée pour .ics
 */
function formatDateForIcs(dateString, timeString) {
    if (!dateString) return '';
    
    try {
        const dateParts = dateString.split('/');
        if (dateParts.length !== 3) return '';
        
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1;
        const year = parseInt(dateParts[2], 10);
        
        const timeParts = timeString.split(':');
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10) || 0;
        
        const date = new Date(year, month, day, hours, minutes);
        
        // Format YYYYMMDDTHHMMSS (heure locale)
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        const ss = '00';
        
        return `${yyyy}${mm}${dd}T${hh}${min}${ss}`;
    } catch (error) {
        console.error('Erreur lors du formatage de la date ICS:', error);
        return '';
    }
}

// ============================================================================
// NOUVELLE INTÉGRATION GOOGLE CALENDAR - VERSION ROBUSTE
// ============================================================================

(function(){
    const MONTHS = {
        'janvier':1,'février':2,'fevrier':2,'mars':3,'avril':4,'mai':5,'juin':6,
        'juillet':7,'août':8,'aout':8,'septembre':9,'octobre':10,'novembre':11,'décembre':12,'decembre':12
    };

    function pad(n){ return String(n).padStart(2,'0'); }

    // Convertit {y,m,d,hh,mm} -> "YYYYMMDDTHHMMSS"
    function toLocalGCalStamp(obj){
        const {y,m,d,hh=0,mm=0} = obj;
        return `${y}${pad(m)}${pad(d)}T${pad(hh)}${pad(mm)}00`;
    }

    function addMinutes({y,m,d,hh,mm}, minutes){
        const dt = new Date(y, m-1, d, hh, mm, 0); // local
        dt.setMinutes(dt.getMinutes() + minutes);
        return { y: dt.getFullYear(), m: dt.getMonth()+1, d: dt.getDate(), hh: dt.getHours(), mm: dt.getMinutes() };
    }

    // Parse formats FR courants
    function parseFrenchDate(text){
        if(!text) return null;
        const s = text.trim().toLowerCase();

        // 1) dd/mm/yyyy [hh[:|h]mm?]
        let m = s.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})[^0-9]*?(\d{1,2})(?:[:h](\d{2}))?/i);
        if(m){
            const d = parseInt(m[1],10), mo = parseInt(m[2],10), y = parseInt(m[3],10);
            const hh = parseInt(m[4] ?? '0',10), mm = parseInt(m[5] ?? '0',10);
            return { y, m:mo, d, hh, mm };
        }

        // 2) [le] dd <mois> yyyy [à] hh[:|h]mm?
        m = s.match(/(?:le\s+)?(\d{1,2})(?:\s*er)?\s+(janvier|février|fevrier|mars|avril|mai|juin|juillet|août|aout|septembre|octobre|novembre|décembre|decembre)\s+(\d{4})(?:\s*(?:a|à)\s*(\d{1,2})(?:[:h](\d{2}))?)?/i);
        if(m){
            const d = parseInt(m[1],10);
            const moName = m[2].normalize('NFD').replace(/\p{Diacritic}/gu,'');
            const mo = MONTHS[m[2]] ?? MONTHS[moName] ?? null;
            const y = parseInt(m[3],10);
            const hh = parseInt(m[4] ?? '0',10);
            const mm = parseInt(m[5] ?? '0',10);
            if(!mo) return null;
            return { y, m:mo, d, hh, mm };
        }

        return null;
    }

    function buildGCalUrl({title, details, location, startObj, durationMinutes=120}){
        const start = toLocalGCalStamp(startObj);
        const endObj = addMinutes(startObj, durationMinutes);
        const end = toLocalGCalStamp(endObj);

        const params = new URLSearchParams({
            action: 'TEMPLATE',
            text: title || 'Cercle d\'écoute - La Brèche',
            dates: `${start}/${end}`,
            details: details || '',
            location: location || 'CRIDEV, Rennes',
            ctz: 'Europe/Paris'
        });

        return `https://calendar.google.com/calendar/render?${params.toString()}`;
    }

    // Gestionnaire pour les boutons calendrier avec la nouvelle logique
    function initCalendarButtons(){
        // Écouter les clics sur les boutons calendrier
        document.addEventListener('click', function(e) {
            // Vérifier si on clique sur un bouton calendrier ou ses enfants
            const calendarBtn = e.target.closest('.cercle-calendar-btn');
            if (!calendarBtn) return;
            
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🎯 Bouton calendrier cliqué !');
            
            // Trouver le cercle parent pour extraire les vraies données
            const cercleElement = calendarBtn.closest('.cercle-item');
            if (!cercleElement) {
                console.error('Aucun cercle parent trouvé');
                return;
            }
            
            // Extraire les données du cercle spécifique
            const cercleData = extractCercleDataFromDOM(cercleElement);
            console.log('📊 Données extraites:', cercleData);
            
            // Parser la date française
            const parsed = parseFrenchDate(cercleData.dateText);
            if (!parsed) {
                console.warn('Date illisible:', cercleData.dateText);
                alert('Date illisible. Impossible d\'ajouter l\'événement au calendrier.');
                return;
            }
            
            // Construire l'URL Google Calendar
            const url = buildGCalUrl({
                title: cercleData.title,
                details: cercleData.details,
                location: cercleData.location,
                startObj: parsed,
                durationMinutes: 120
            });
            
            console.log('🔗 Lien Google Calendar:', url);
            
            // Ouvrir directement Google Calendar
            window.open(url, '_blank', 'noopener');
        });
    }

    // Fonction pour extraire les données d'un cercle depuis le DOM
    function extractCercleDataFromDOM(cercleElement) {
        // Extraire le nom du cercle
        const nomElement = cercleElement.querySelector('.cercle-nom');
        const title = nomElement ? `Cercle d'écoute - ${nomElement.textContent.trim()}` : 'Cercle d\'écoute - La Brèche';
        
        // Extraire la date et l'heure (texte brut pour le parser français)
        const dateElement = cercleElement.querySelector('.cercle-date');
        const dateText = dateElement ? dateElement.textContent.trim() : '';
        
        // Extraire le lieu
        const lieuElement = cercleElement.querySelector('.cercle-lieu');
        const location = lieuElement ? lieuElement.textContent.trim() : 'CRIDEV, Avenue Janvier, Rennes';
        
        // Détails par défaut
        const details = `Cercle d'écoute organisé par La Brèche.

Thématique : ${nomElement ? nomElement.textContent.trim() : 'Cercle d\'écoute'}
Durée : 2 heures (accueil 15 minutes avant)

Infos pratiques :
- Participation gratuite
- Cadre bienveillant et confidentiel
- Médiatrices présentes pour faciliter les échanges

Contact : contact@labreche.org`;
        
        return {
            title: title,
            dateText: dateText,
            location: location,
            details: details
        };
    }

    // Variable globale pour stocker les données du cercle sélectionné
    let selectedCercleData = null;

    // Fonction pour définir les données du cercle sélectionné (appelée lors de l'inscription)
    function setSelectedCercleData(cercleElement) {
        if (cercleElement) {
            selectedCercleData = extractCercleDataFromDOM(cercleElement);
            console.log('📊 Données du cercle sélectionné sauvegardées:', selectedCercleData);
        }
    }

    // Fonction pour gérer le bouton calendrier dans la popup de succès
    function initPopupCalendarButton() {
        const popupCalendarBtn = document.getElementById('popup-calendar-btn');
        if (popupCalendarBtn && selectedCercleData) {
            // Supprimer les anciens event listeners
            const newBtn = popupCalendarBtn.cloneNode(true);
            popupCalendarBtn.parentNode.replaceChild(newBtn, popupCalendarBtn);
            
            // Ajouter le nouvel event listener avec les bonnes données
            newBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('🎯 Bouton calendrier popup cliqué avec données:', selectedCercleData);
                
                // Parser la date française
                const parsed = parseFrenchDate(selectedCercleData.dateText);
                if (!parsed) {
                    console.warn('Date illisible:', selectedCercleData.dateText);
                    alert('Date illisible. Impossible d\'ajouter l\'événement au calendrier.');
                    return;
                }
                
                // Construire l'URL Google Calendar
                const url = buildGCalUrl({
                    title: selectedCercleData.title,
                    details: selectedCercleData.details,
                    location: selectedCercleData.location,
                    startObj: parsed,
                    durationMinutes: 120
                });
                
                console.log('🔗 Lien Google Calendar (popup):', url);
                
                // Ouvrir directement Google Calendar
                window.open(url, '_blank', 'noopener');
            });
        }
    }

    // Exposer les fonctions globalement pour que script.js puisse les utiliser
    window.setSelectedCercleData = setSelectedCercleData;
    window.initPopupCalendarButton = initPopupCalendarButton;
    window.buildGCalUrl = buildGCalUrl;
    window.parseFrenchDate = parseFrenchDate;

    // Initialiser au chargement de la page
    document.addEventListener('DOMContentLoaded', initCalendarButtons);
    
    // Initialiser immédiatement si le DOM est déjà chargé
    if (document.readyState === 'loading') {
        // Le DOM n'est pas encore chargé, l'event listener ci-dessus s'en chargera
    } else {
        // Le DOM est déjà chargé, initialiser maintenant
        initCalendarButtons();
    }
})();

/**
 * Initialise les boutons calendrier individuels pour chaque cercle
 */
function initializeIndividualCalendarButtons() {
    // Observer pour détecter quand de nouveaux cercles sont ajoutés au DOM
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1 && node.classList && node.classList.contains('cercle-item')) {
                    setupCalendarButtonForCercle(node);
                }
            });
        });
    });
    
    // Observer les changements dans toute la section d'inscription
    const inscriptionSection = document.getElementById('inscriptions cercles');
    if (inscriptionSection) {
        observer.observe(inscriptionSection, { childList: true, subtree: true });
    }
    
    // Initialiser les cercles déjà présents
    const existingCercles = document.querySelectorAll('.cercle-item');
    existingCercles.forEach(setupCalendarButtonForCercle);
    
    // Vérifier périodiquement s'il y a de nouveaux cercles (fallback)
    setInterval(() => {
        const cercles = document.querySelectorAll('.cercle-item');
        cercles.forEach(cercle => {
            const calendarBtn = cercle.querySelector('.cercle-calendar-btn');
            if (calendarBtn && !calendarBtn.hasAttribute('data-calendar-initialized')) {
                setupCalendarButtonForCercle(cercle);
            }
        });
    }, 1000);
}

/**
 * Configure le bouton calendrier pour un cercle spécifique
 * @param {HTMLElement} cercleElement - L'élément DOM du cercle
 */
function setupCalendarButtonForCercle(cercleElement) {
    const calendarBtn = cercleElement.querySelector('.cercle-calendar-btn');
    if (!calendarBtn) return;
    
    // Éviter la double initialisation
    if (calendarBtn.hasAttribute('data-calendar-initialized')) return;
    calendarBtn.setAttribute('data-calendar-initialized', 'true');
    
    // Ajouter l'événement de clic
    calendarBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Extraire les données du cercle
        const cercleData = extractCercleData(cercleElement);
        
        // Afficher un menu contextuel pour choisir Google Calendar ou ICS
        showCalendarOptionsMenu(e.target, cercleData);
    });
}

/**
 * Extrait les données d'un cercle depuis son élément DOM
 * @param {HTMLElement} cercleElement - L'élément DOM du cercle
 * @returns {Object} - Les données du cercle
 */
function extractCercleData(cercleElement) {
    const titleElement = cercleElement.querySelector('.cercle-nom');
    const dateElement = cercleElement.querySelector('.cercle-date');
    const lieuElement = cercleElement.querySelector('.cercle-lieu');
    
    // Extraire le titre
    const title = titleElement ? titleElement.textContent.trim() : 'Cercle d\'écoute';
    
    // Extraire et parser la date
    const dateText = dateElement ? dateElement.textContent.trim() : '';
    const { date, time, endTime } = parseDateText(dateText);
    
    // Extraire le lieu
    const lieu = lieuElement ? lieuElement.textContent.trim() : 'CRIDEV, Avenue Janvier, Rennes';
    
    return {
        id: `cercle-${Date.now()}`,
        title: title,
        date: date,
        time: time,
        endTime: endTime,
        lieu: lieu
    };
}

/**
 * Parse le texte de date pour extraire date, heure de début et heure de fin
 * @param {string} dateText - Le texte contenant la date et l'heure
 * @returns {Object} - {date, time, endTime}
 */
function parseDateText(dateText) {
    // Exemples de formats attendus :
    // "Vendredi 15 décembre 2024, 18h00 - 20h00"
    // "15/12/2024 à 18h00"
    // "15 décembre 2024, 18h00"
    
    let date = '';
    let time = '18:00';
    let endTime = '20:00';
    
    try {
        // Rechercher une date au format DD/MM/YYYY
        const dateMatch = dateText.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        if (dateMatch) {
            date = `${dateMatch[1].padStart(2, '0')}/${dateMatch[2].padStart(2, '0')}/${dateMatch[3]}`;
        } else {
            // Rechercher une date au format "15 décembre 2024"
            const frenchMonths = {
                'janvier': '01', 'février': '02', 'mars': '03', 'avril': '04',
                'mai': '05', 'juin': '06', 'juillet': '07', 'août': '08',
                'septembre': '09', 'octobre': '10', 'novembre': '11', 'décembre': '12'
            };
            
            const frenchDateMatch = dateText.match(/(\d{1,2})\s+(\w+)\s+(\d{4})/i);
            if (frenchDateMatch) {
                const day = frenchDateMatch[1].padStart(2, '0');
                const monthName = frenchDateMatch[2].toLowerCase();
                const year = frenchDateMatch[3];
                const month = frenchMonths[monthName] || '01';
                date = `${day}/${month}/${year}`;
            }
        }
        
        // Rechercher l'heure de début (18h00, 18:00, etc.)
        const timeMatch = dateText.match(/(\d{1,2})[h:](\d{2})/);
        if (timeMatch) {
            time = `${timeMatch[1].padStart(2, '0')}:${timeMatch[2]}`;
        }
        
        // Rechercher l'heure de fin (après un tiret ou "à")
        const endTimeMatch = dateText.match(/[-–]\s*(\d{1,2})[h:](\d{2})/);
        if (endTimeMatch) {
            endTime = `${endTimeMatch[1].padStart(2, '0')}:${endTimeMatch[2]}`;
        }
        
        // Si pas de date trouvée, utiliser le prochain vendredi
        if (!date) {
            date = getNextCircleDate();
        }
        
    } catch (error) {
        console.error('Erreur lors du parsing de la date:', error);
        date = getNextCircleDate();
    }
    
    return { date, time, endTime };
}

/**
 * Affiche un menu contextuel pour choisir Google Calendar ou ICS
 * @param {HTMLElement} buttonElement - Le bouton qui a été cliqué
 * @param {Object} cercleData - Les données du cercle
 */
function showCalendarOptionsMenu(buttonElement, cercleData) {
    // Supprimer tout menu existant
    const existingMenu = document.querySelector('.calendar-options-menu');
    if (existingMenu) {
        existingMenu.remove();
    }
    
    // Créer le menu
    const menu = document.createElement('div');
    menu.className = 'calendar-options-menu fixed bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-2';
    menu.style.minWidth = '200px';
    
    // Positionner le menu près du bouton
    const rect = buttonElement.getBoundingClientRect();
    menu.style.top = (rect.bottom + window.scrollY + 5) + 'px';
    menu.style.left = (rect.left + window.scrollX) + 'px';
    
    // Contenu du menu
    menu.innerHTML = `
        <div class="text-sm font-medium text-gray-900 mb-2 px-2">${cercleData.title}</div>
        <div class="text-xs text-gray-500 mb-3 px-2">${cercleData.date} à ${cercleData.time}</div>
        <button class="google-calendar-option w-full text-left px-3 py-2 text-sm hover:bg-blue-50 rounded flex items-center">
            <svg class="w-4 h-4 mr-2 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
            Google Calendar
        </button>
        <button class="ics-download-option w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded flex items-center">
            <svg class="w-4 h-4 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Télécharger (.ics)
        </button>
    `;
    
    // Ajouter les événements
    const googleOption = menu.querySelector('.google-calendar-option');
    const icsOption = menu.querySelector('.ics-download-option');
    
    googleOption.addEventListener('click', () => {
        const googleUrl = generateGoogleCalendarUrl(cercleData);
        window.open(googleUrl, '_blank');
        menu.remove();
    });
    
    icsOption.addEventListener('click', () => {
        generateAndDownloadIcs(cercleData);
        menu.remove();
    });
    
    // Fermer le menu en cliquant ailleurs
    document.addEventListener('click', function closeMenu(e) {
        if (!menu.contains(e.target)) {
            menu.remove();
            document.removeEventListener('click', closeMenu);
        }
    });
    
    // Ajouter le menu au DOM
    document.body.appendChild(menu);
}

/**
 * Initialise l'intégration calendrier pour le formulaire de contact
 * Utilise des données génériques pour les prochains cercles
 */
function initializeContactCalendarIntegration() {
    const googleCalendarLink = document.getElementById('contact-google-calendar-link');
    const downloadIcsButton = document.getElementById('contact-download-ics');
    
    // Données génériques pour les prochains cercles
    const genericCircleData = {
        id: 'prochains-cercles',
        title: 'Prochains cercles d\'écoute',
        date: getNextCircleDate(),
        time: '18:00',
        endTime: '20:00'
    };
    
    if (googleCalendarLink) {
        const googleCalendarUrl = generateGoogleCalendarUrl(genericCircleData);
        googleCalendarLink.href = googleCalendarUrl;
        googleCalendarLink.style.display = 'inline-flex';
    }
    
    if (downloadIcsButton) {
        downloadIcsButton.addEventListener('click', () => {
            generateAndDownloadIcs(genericCircleData);
        });
        downloadIcsButton.style.display = 'inline-flex';
    }
}

/**
 * Initialise l'intégration calendrier pour la section principale de la page
 * Appelée au chargement de la page
 */
function initializeMainCalendarIntegration() {
    const googleCalendarLink = document.getElementById('main-google-calendar-link');
    const downloadIcsButton = document.getElementById('main-download-ics');
    
    // Données génériques pour les prochains cercles
    const genericCircleData = {
        id: 'prochains-cercles-main',
        title: 'Prochains cercles d\'écoute',
        date: getNextCircleDate(),
        time: '18:00',
        endTime: '20:00'
    };
    
    if (googleCalendarLink) {
        const googleCalendarUrl = generateGoogleCalendarUrl(genericCircleData);
        googleCalendarLink.href = googleCalendarUrl;
    }
    
    if (downloadIcsButton) {
        downloadIcsButton.addEventListener('click', () => {
            generateAndDownloadIcs(genericCircleData);
        });
    }
}

/**
 * Génère une date pour le prochain cercle (exemple: prochain vendredi)
 * @returns {string} - Date au format DD/MM/YYYY
 */
function getNextCircleDate() {
    const today = new Date();
    const nextFriday = new Date(today);
    
    // Trouver le prochain vendredi (jour 5)
    const daysUntilFriday = (5 - today.getDay() + 7) % 7;
    if (daysUntilFriday === 0 && today.getHours() >= 20) {
        // Si c'est vendredi après 20h, prendre le vendredi suivant
        nextFriday.setDate(today.getDate() + 7);
    } else {
        nextFriday.setDate(today.getDate() + daysUntilFriday);
    }
    
    // Formater en DD/MM/YYYY
    const day = String(nextFriday.getDate()).padStart(2, '0');
    const month = String(nextFriday.getMonth() + 1).padStart(2, '0');
    const year = nextFriday.getFullYear();
    
    return `${day}/${month}/${year}`;
}

/**
 * Extrait les données du cercle depuis le formulaire d'inscription
 * @returns {Object} - Données du cercle sélectionné
 */
function getSelectedCircleData() {
    const form = document.getElementById('registration-form');
    if (!form) return null;
    
    const formData = new FormData(form);
    const selectedCircle = formData.get('cercle');
    
    // Exemple de données - à adapter selon votre structure de données
    const circlesData = {
        'cercle1': {
            id: 'cercle1',
            title: 'Cercle d\'écoute thématique',
            date: '15/12/2024',
            time: '18:00',
            endTime: '20:00'
        },
        'cercle2': {
            id: 'cercle2', 
            title: 'Cercle d\'écoute libre',
            date: '22/12/2024',
            time: '18:00',
            endTime: '20:00'
        }
    };
    
    return circlesData[selectedCircle] || {
        id: selectedCircle || 'default',
        title: 'Cercle d\'écoute',
        date: new Date().toLocaleDateString('fr-FR'),
        time: '18:00',
        endTime: '20:00'
    };
}
