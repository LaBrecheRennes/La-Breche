/*****  CONFIG  *****/
const SHEET_HISTORIQUE = 'Historique des cercles';
const ALLOW_ORIGIN    = '*';    // Peut être restreint à votre domaine pour la sécurité
const SECRET_KEY      = 'la-breche-2025'; // Clé utilisée par le client web

/*****  ROUTER  *****/
function doGet(e) {
  // Simple test de connexion
  if (e.parameter.test === 'connection') {
    return jsonOut({status: 'success', message: 'API connectée avec succès'});
  }
  
  // Si aucun paramètre valide, refuser
  return refuse();
}

function doPost(e) {
  // Log pour debug
  console.log("Requête POST reçue: " + JSON.stringify(e));
  
  try {
    // Vérifier si les données sont dans le corps POST ou dans un paramètre
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter.data) {
      data = JSON.parse(e.parameter.data);
    } else {
      // Essayer de traiter comme un formulaire direct
      data = {
        secretKey: e.parameter.secretKey,
        circleName: e.parameter.circleName,
        formData: {
          firstName: e.parameter.firstName,
          lastName: e.parameter.lastName,
          email: e.parameter.email,
          phone: e.parameter.phone
        }
      };
    }

    // Vérifier la clé secrète
    if (data.secretKey !== SECRET_KEY) {
      return refuse('Clé secrète invalide');
    }

    // Ajouter l'inscription dans l'onglet du cercle
    const result = addInscription(data.circleName, data.formData);
    return jsonOut(result);
  } catch (error) {
    console.error("Erreur lors du traitement: " + error.message);
    return jsonOut({
      success: false,
      error: error.message,
      stack: error.stack
    }, 400);
  }
}

/*****  HANDLERS  *****/
function addInscription(circleName, formData) {
  try {
    // Vérifier si l'onglet existe
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(circleName);
    
    // Si l'onglet n'existe pas, vérifier s'il s'agit d'un nom de cercle valide
    if (!sheet) {
      return {
        success: false,
        error: `L'onglet "${circleName}" n'existe pas dans le Google Sheet`
      };
    }
    
    // Trouver la prochaine ligne disponible
    const lastRow = sheet.getLastRow();
    let headerRow = [];
    
    // Si la feuille est vide, créer les en-têtes
    if (lastRow === 0) {
      headerRow = ["Date d'inscription", "Prénom", "Nom", "Email", "Téléphone"];
      sheet.appendRow(headerRow);
    } else {
      // Obtenir les en-têtes existants
      headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    }
    
    // Préparer les données à insérer
    const date = new Date().toLocaleDateString('fr-FR');
    const rowData = [date, formData.firstName, formData.lastName, formData.email, formData.phone || ''];
    
    // Ajouter la ligne à la feuille
    sheet.appendRow(rowData);
    
    // Enregistrer également dans l'historique
    const historySheet = ss.getSheetByName(SHEET_HISTORIQUE);
    if (historySheet) {
      const historyData = [date, circleName, formData.firstName, formData.lastName, formData.email, formData.phone || ''];
      historySheet.appendRow(historyData);
    }
    
    return {
      success: true,
      message: `Inscription ajoutée avec succès à l'onglet "${circleName}"`
    };
    
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'inscription: " + error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/*****  HELPERS  *****/
function jsonOut(obj, code = 200) {
  const response = ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', ALLOW_ORIGIN)
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  return response;
}

function refuse(message = 'Accès refusé') {
  return jsonOut({
    success: false,
    error: message
  }, 403);
}

// Fonction pour le callback JSONP (si nécessaire)
function processFormCallback(data, callback) {
  const result = addInscription(data.circleName, data.formData);
  return ContentService.createTextOutput(callback + '(' + JSON.stringify(result) + ')')
    .setMimeType(ContentService.MimeType.JAVASCRIPT)
    .setHeader('Access-Control-Allow-Origin', ALLOW_ORIGIN);
}
