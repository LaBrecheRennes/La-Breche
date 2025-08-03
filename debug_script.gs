/**
 * Script de diagnostic pour tester l'écriture dans les bonnes colonnes
 */

// Clé API pour sécuriser les appels
const API_KEY = 'AIzaSyBTx30LCTda0WYkfEJ-k2-rahNGkFMggJ0';

function doGet(e) {
  // Récupérer l'état actuel du sheet et les dernières écritures
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();
  const sheetInfo = sheets.map(s => ({
    name: s.getName(),
    lastRow: s.getLastRow(),
    lastCol: s.getLastColumn()
  }));
  
  // Récupérer le contenu des dernières cellules de "Test" ou du premier sheet
  const testSheet = ss.getSheetByName("Test") || ss.getSheets()[0];
  const lastRows = [];
  
  if (testSheet && testSheet.getLastRow() > 0) {
    // Récupère les 3 dernières lignes, colonnes A à H
    const lastRowNum = testSheet.getLastRow();
    const startRow = Math.max(1, lastRowNum - 2);
    
    // Récupérer les valeurs
    const values = testSheet.getRange(startRow, 1, 3, 8).getValues();
    
    for (let i = 0; i < values.length; i++) {
      lastRows.push({
        rowNum: startRow + i,
        values: values[i].map(v => v ? v.toString() : "")
      });
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: "Diagnostic sheet réussi",
    timestamp: new Date().toString(),
    sheets: sheetInfo,
    lastRows: lastRows
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test d'écriture dans des colonnes spécifiques
 */
function doPost(e) {
  try {
    let response = {
      received: {},
      actions: [],
      results: {}
    };
    
    // Analyser les données reçues
    if (e.postData && e.postData.type === 'application/json') {
      const data = JSON.parse(e.postData.contents);
      response.received = {type: 'json', data: data};
      
      // Vérifier la clé API si fournie
      if (data.secretKey !== API_KEY) {
        response.actions.push("API key check failed");
        throw "Clé API invalide";
      }
      
      // Tester l'écriture
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const sheet = ss.getSheetByName("Test") || ss.getSheets()[0];
      
      if (sheet) {
        const lastRow = sheet.getLastRow();
        const row = Math.max(3, lastRow + 1); // Commencer à la ligne 3 minimum
        response.actions.push(`Using row ${row} (lastRow=${lastRow})`);
        
        // 1. Test d'écriture en colonnes A-C
        sheet.getRange(row, 1, 1, 3).setValues([[
          "Test A", "Test B", "Test C"
        ]]);
        response.actions.push("Written to A-C");
        
        // 2. Test d'écriture en colonnes E-G (index 5-7)
        sheet.getRange(row+1, 5, 1, 3).setValues([[
          "Test E", "Test F", "Test G"
        ]]);
        response.actions.push("Written to E-G");
        
        // Vérifier les cellules écrites pour le rapport
        const writtenA = sheet.getRange(row, 1).getValue();
        const writtenE = sheet.getRange(row+1, 5).getValue();
        
        response.results = {
          rowA: row,
          valueA: writtenA,
          rowE: row+1,
          valueE: writtenE
        };
      }
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        debug: response
      })).setMimeType(ContentService.MimeType.JSON);
    } else if (e.parameter) {
      // Gestion du formulaire HTML
      response.received = {type: 'form', data: e.parameter};
      
      // Vérifier la clé API
      if (e.parameter.secretKey !== API_KEY) {
        response.actions.push("API key check failed (form)");
        throw "Clé API invalide (formulaire)";
      }
      
      // Test d'écriture similaire
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const sheet = ss.getSheetByName("Test") || ss.getSheets()[0];
      
      if (sheet) {
        const row = Math.max(3, sheet.getLastRow() + 1);
        response.actions.push(`Form: Using row ${row}`);
        
        // Écrire en colonnes A-C avec les données du formulaire
        sheet.getRange(row, 1, 1, 3).setValues([[
          "Form A", "Form B", "Form C"
        ]]);
        response.actions.push("Form: Written to A-C");
        
        // Écrire en colonnes E-G
        sheet.getRange(row+1, 5, 1, 3).setValues([[
          "Form E", "Form F", "Form G"
        ]]);
        response.actions.push("Form: Written to E-G");
      }
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        debug: response
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    throw "Format de données non reconnu";
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString(),
      stack: error.stack
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
