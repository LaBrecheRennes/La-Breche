/**
 * Script minimal pour tester la connexion à Google Sheets
 */

// Fonctions principales Apps Script pour gérer les requêtes web
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: "Connexion réussie!",
    timestamp: new Date().toString()
  }))
  .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetNames = ss.getSheets().map(sheet => sheet.getName());
    
    let response = {
      success: true,
      message: "Connexion POST réussie!",
      sheetNames: sheetNames,
      timestamp: new Date().toString()
    };
    
    // Tenter d'écrire dans une feuille de test si elle existe
    const testSheet = ss.getSheetByName("Test") || ss.getSheets()[0];
    if (testSheet) {
      // Écrire dans les colonnes E/F/G au lieu de A/B
      const row = Math.max(3, testSheet.getLastRow() + 1);   // ≥ 3
      testSheet.getRange(row, 5, 1, 3).setValues([
        ["Test de connexion", new Date().toString(), "test@example.com"]
      ]);
      response.written = true;
      response.sheetUsed = testSheet.getName();
      response.rowWritten = row;
    }
    
    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString(),
      stack: error.stack
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}
