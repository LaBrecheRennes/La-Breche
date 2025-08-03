// Script de test pour l'API Google Sheets
const https = require('https');

// Configuration
const sheetId = '1klaUaZOED9tztQkSrLxlG-bOSbChAx95jZbCjqNEBaY';
const apiKey = 'AIzaSyBTx30LCTda0WYkfEJ-k2-rahNGkFMggJ0';
const fs = require('fs');

// Fonction utilitaire pour effectuer des requêtes HTTP
function httpGet(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];

            let error;
            if (statusCode !== 200) {
                error = new Error(`Requête échouée.\nStatut: ${statusCode}`);
            }

            if (error) {
                res.resume();
                reject(error);
                return;
            }

            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData);
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', (e) => {
            reject(e);
        });
    });
}

// Fonction pour écrire dans le fichier de rapport
function writeToReport(message) {
    fs.appendFileSync('rapport_api_google_sheets.txt', message + '\n');
    console.log(message);
}

// Fonction principale qui teste l'API
async function testGoogleSheetsApi() {
    // Initialiser le fichier de rapport
    fs.writeFileSync('rapport_api_google_sheets.txt', `RAPPORT DE TEST DE L'API GOOGLE SHEETS\n${'='.repeat(50)}\nDate: ${new Date().toLocaleString()}\n\n`);

    try {
        // 1. Récupérer les métadonnées du Spreadsheet
        writeToReport("ÉTAPE 1: Récupération des informations du Google Sheets");
        writeToReport(`ID du Sheet: ${sheetId}`);
        writeToReport(`Clé API: ${apiKey.substring(0, 10)}...\n`);

        const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?key=${apiKey}`;
        writeToReport(`URL d'appel: ${sheetsUrl}\n`);

        const sheetsData = await httpGet(sheetsUrl);
        writeToReport("✓ Métadonnées récupérées avec succès!");
        writeToReport(`Titre du document: ${sheetsData.properties.title}`);
        writeToReport(`Nombre d'onglets: ${sheetsData.sheets.length}`);

        // Liste des onglets
        writeToReport("\nLISTE DES ONGLETS:");
        const sheets = sheetsData.sheets || [];
        sheets.forEach(sheet => {
            writeToReport(`- ${sheet.properties.title} (ID: ${sheet.properties.sheetId})`);
        });

        // 2. Filtrer les onglets (exclure "Historique des cercles")
        const circleSheets = sheets.filter(sheet => 
            sheet.properties.title !== "Historique des cercles"
        );
        
        writeToReport(`\nOnglets après filtrage (exclusion de "Historique des cercles"): ${circleSheets.length}`);
        circleSheets.forEach(sheet => {
            writeToReport(`- ${sheet.properties.title}`);
        });

        // 3. Récupérer les données d'un onglet exemple
        if (circleSheets.length > 0) {
            writeToReport("\nÉTAPE 2: Récupération des données d'un onglet exemple");
            
            const sampleSheet = circleSheets[0];
            const sheetTitle = sampleSheet.properties.title;
            const range = `${sheetTitle}!B1:E50`;
            
            writeToReport(`Onglet sélectionné: ${sheetTitle}`);
            writeToReport(`Plage: ${range}`);
            
            const valuesUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
            writeToReport(`URL d'appel: ${valuesUrl}\n`);
            
            const valuesData = await httpGet(valuesUrl);
            writeToReport("✓ Données récupérées avec succès!");
            
            if (valuesData.values && valuesData.values.length > 0) {
                writeToReport(`Nombre de lignes récupérées: ${valuesData.values.length}`);
                
                // Afficher un échantillon des données
                writeToReport("\nÉCHANTILLON DE DONNÉES (5 premières lignes max):");
                const sampleData = valuesData.values.slice(0, Math.min(5, valuesData.values.length));
                sampleData.forEach((row, index) => {
                    writeToReport(`Ligne ${index + 1}: ${JSON.stringify(row)}`);
                });
                
                // Calculer le nombre de participants
                const participantsRows = valuesData.values.filter((row, index) => 
                    index > 0 && row.length >= 4 && row[3]
                );
                
                const participantsCount = Math.max(0, participantsRows.length - 2);
                writeToReport(`\nNombre de participants calculé (lignes avec colonne E non vide - 2): ${participantsCount}`);
            } else {
                writeToReport("Aucune donnée trouvée dans cet onglet.");
            }
        } else {
            writeToReport("\nAUCUN ONGLET VALIDE TROUVÉ après filtrage!");
        }
        
        writeToReport("\nCONCLUSION:");
        writeToReport("✓ Test terminé avec succès!");
        writeToReport("✓ L'API Google Sheets est accessible avec la clé fournie.");
        
    } catch (error) {
        writeToReport(`\nERREUR: ${error.message}`);
        writeToReport("Veuillez vérifier l'ID du spreadsheet et la clé API.");
    }
}

// Exécuter le test
testGoogleSheetsApi();
