/**
 * Web App La Brèche – v2
 *  ▸ Colonnes :  E = Nom  |  F = Prénom  |  G = Email
 *  ▸ Les écritures commencent en ligne 3 (getLastRow + 1, min = 3)
 */
const API_KEY = 'AIzaSyBTx30LCTda0WYkfEJ-k2-rahNGkFMggJ0';  // ← ta clé actuelle
const SHEET   = SpreadsheetApp.getActive()
                 .getSheetByName('Inscrits');                // change si besoin

/* Réponse JSON + CORS */
function out(obj){
  return ContentService.createTextOutput(JSON.stringify(obj))
         .setMimeType(ContentService.MimeType.JSON);
}

/* GET – ping santé */
function doGet(){ return out({status:'up', ts:new Date().toISOString()}); }

/* POST – inscription */
function doPost(e){
  try{
    // Détermine si les données viennent d'un formulaire HTML ou d'une requête JSON
    let firstName, lastName, email, secretKey;
    
    if(e.postData && e.postData.type === 'application/json') {
      // Format JSON (fetch API)
      const d = JSON.parse(e.postData.contents);
      firstName = d.firstName || '';
      lastName = d.lastName || '';
      email = d.email || '';
      secretKey = d.secretKey || '';
    } else if (e.parameter) {
      // Format formulaire HTML (form submit)
      firstName = e.parameter.firstName || '';
      lastName = e.parameter.lastName || '';
      email = e.parameter.email || '';
      secretKey = e.parameter.secretKey || '';
    } else {
      throw 'Format de données non reconnu';
    }

    // Vérifie la clé API
    if(secretKey !== API_KEY) throw 'Clé API invalide';

    const row = Math.max(3, SHEET.getLastRow() + 1);   // ≥ 3

    /* Écrit Nom / Prénom / Email en E–G */
    SHEET.getRange(row, 5, 1, 3).setValues([[
      lastName,
      firstName,
      email
    ]]);

    return out({ok:true, insertedRow:row});

  }catch(err){
    return out({ok:false, error:err.toString()});
  }
}
