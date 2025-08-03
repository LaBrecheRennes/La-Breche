/**
 * Google Apps Script pour gérer les inscriptions aux cercles d'écoute La Brèche
 * Ce script doit être déployé comme une application web dans Google Apps Script
 */

function doPost(e) {
  try {
    // Vérifier que la requête contient des données
    if (!e.postData || !e.postData.contents) {
      return createResponse(false, "Aucune donnée reçue");
    }
    
    // Parser les données JSON
    const data = JSON.parse(e.postData.contents);
    
    // Vérifier la clé secrète pour sécuriser l'API
    if (data.secretKey !== 'la-breche-2025-inscription') {
      return createResponse(false, "Clé d'authentification invalide");
    }
    
    // Vérifier que toutes les données nécessaires sont présentes
    if (!data.circleName || !data.firstName || !data.lastName || !data.email) {
      return createResponse(false, "Données manquantes (circleName, firstName, lastName, email requis)");
    }
    
    // ID du Google Sheet
    const sheetId = '1klaUaZOED9tztQkSrLxlG-bOSbChAx95jZbCjqNEBaY';
    
    // Ouvrir le spreadsheet
    const spreadsheet = SpreadsheetApp.openById(sheetId);
    
    // Trouver l'onglet correspondant au nom du cercle
    const sheet = spreadsheet.getSheetByName(data.circleName);
    if (!sheet) {
      return createResponse(false, `Onglet "${data.circleName}" non trouvé`);
    }
    
    // Trouver la première ligne vide dans la colonne E
    const columnE = sheet.getRange('E:E').getValues();
    let nextRow = 1;
    
    for (let i = 0; i < columnE.length; i++) {
      if (!columnE[i][0] || columnE[i][0].toString().trim() === '') {
        nextRow = i + 1;
        break;
      }
      nextRow = i + 2; // +2 car on veut la ligne suivante
    }
    
    // Écrire les données dans les colonnes E, F, G
    sheet.getRange(nextRow, 5).setValue(data.lastName);   // Colonne E: Nom
    sheet.getRange(nextRow, 6).setValue(data.firstName);  // Colonne F: Prénom
    sheet.getRange(nextRow, 7).setValue(data.email);      // Colonne G: Email
    
    // Optionnel: ajouter la date d'inscription en colonne H
    sheet.getRange(nextRow, 8).setValue(new Date());
    
    // Log pour le débogage
    console.log(`Inscription ajoutée: ${data.firstName} ${data.lastName} (${data.email}) dans "${data.circleName}" à la ligne ${nextRow}`);
    
    return createResponse(true, `Inscription réussie pour ${data.firstName} ${data.lastName}`, {
      row: nextRow,
      circleName: data.circleName
    });
    
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return createResponse(false, `Erreur serveur: ${error.message}`);
  }
}

/**
 * Fonction pour tester l'API (optionnelle)
 */
function doGet(e) {
  return createResponse(true, "API Google Apps Script pour La Brèche - Inscriptions aux cercles d'écoute");
}

/**
 * Crée une réponse JSON standardisée
 */
function createResponse(success, message, data = null) {
  const response = {
    success: success,
    message: message,
    timestamp: new Date().toISOString()
  };
  
  if (data) {
    response.data = data;
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

/**
 * Gestion des requêtes OPTIONS pour CORS
 */
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
