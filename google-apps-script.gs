/**
 * Google Apps Script pour gérer les inscriptions aux cercles de parole La Brèche
 * Ce script doit être déployé comme une application web dans Google Apps Script
 */

function doPost(e) {
  try {
    // Log pour débogage
    console.log('Requête POST reçue');
    console.log('e.postData:', e.postData);
    
    // Vérifier que la requête contient des données
    if (!e.postData || !e.postData.contents) {
      console.log('Erreur: Aucune donnée postData');
      return createResponse(false, "Aucune donnée reçue");
    }
    
    // Parser les données JSON
    const data = JSON.parse(e.postData.contents);
    console.log('Données reçues:', data);
    
    // Vérifier la clé secrète pour sécuriser l'API
    if (data.secretKey !== 'la-breche-2025-inscription') {
      console.log('Erreur: Clé secrète invalide');
      return createResponse(false, "Clé d'authentification invalide");
    }
    
    // Vérifier que toutes les données nécessaires sont présentes
    if (!data.circleName || !data.firstName || !data.lastName || !data.email) {
      console.log('Erreur: Données manquantes');
      return createResponse(false, "Données manquantes (circleName, firstName, lastName, email requis)");
    }
    
    // ID du Google Sheet
    const sheetId = '1klaUaZOED9tztQkSrLxlG-bOSbChAx95jZbCjqNEBaY';
    
    // Ouvrir le spreadsheet
    const spreadsheet = SpreadsheetApp.openById(sheetId);
    
    // Trouver l'onglet correspondant au nom du cercle
    const sheet = spreadsheet.getSheetByName(data.circleName);
    if (!sheet) {
      console.log('Erreur: Onglet non trouvé:', data.circleName);
      return createResponse(false, `Onglet "${data.circleName}" non trouvé`);
    }
    
    // Trouver la prochaine ligne disponible : COUNT(E:E) + 1
    const countRange = sheet.getRange('E:E');
    const countFormula = `=COUNTA(E:E)`;
    const tempCell = sheet.getRange('Z1'); // Utiliser une cellule temporaire
    tempCell.setFormula(countFormula);
    const count = tempCell.getValue();
    tempCell.clear(); // Nettoyer la cellule temporaire
    
    const nextRow = count + 1;
    
    console.log(`Nombre d'entrées en colonne E: ${count}, prochaine ligne: ${nextRow}`);
    
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
 * Fonction pour tester l'API et gérer les requêtes GET
 */
function doGet(e) {
  console.log('Requête GET reçue');
  return createResponse(true, "API Google Apps Script pour La Brèche - Inscriptions aux cercles de parole");
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
  
  // Google Apps Script ne supporte pas setHeader, on utilise seulement createTextOutput
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Gestion des requêtes OPTIONS pour CORS
 * Note: Google Apps Script gère automatiquement CORS pour les applications web
 */
function doOptions(e) {
  console.log('Requête OPTIONS reçue');
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}
