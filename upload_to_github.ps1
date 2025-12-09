# Script PowerShell pour uploader sur GitHub
# Repository: LaBrecheRennes/La-Breche

$owner = "LaBrecheRennes"
$repo = "La-Breche"
$email = "labreche.rennes@gmail.com"
$password = "T@rte-auxfr@ises35!!"

# Créer les credentials encodés en base64
$credentials = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("$email`:$password"))

Write-Host "🚀 Upload vers GitHub Repository: $owner/$repo"

# Fonction pour uploader un fichier
function Upload-File {
    param($filePath, $githubPath)
    
    $url = "https://api.github.com/repos/$owner/$repo/contents/$githubPath"
    
    $body = @{
        message = "🎉 Update: Nouvelle version avec intégration Google Calendar"
        content = [Convert]::ToBase64String([IO.File]::ReadAllBytes($filePath))
        branch = "main"
    } | ConvertTo-Json
    
    $headers = @{
        "Authorization" = "Basic $credentials"
        "User-Agent" = "PowerShell-Script"
        "Accept" = "application/vnd.github.v3+json"
    }
    
    try {
        Write-Host "📤 Upload: $githubPath"
        $response = Invoke-RestMethod -Uri $url -Method PUT -Body $body -Headers $headers -ContentType "application/json"
        Write-Host "✅ Success: $githubPath"
        return $true
    }
    catch {
        Write-Host "❌ Error uploading $githubPath : $($_.Exception.Message)"
        return $false
    }
}
}

# Liste des fichiers à uploader
$files = @(
    @{ local = "index.html"; github = "index.html" }
    @{ local = "README.md"; github = "README.md" }
    @{ local = "netlify.toml"; github = "netlify.toml" }
    @{ local = "assets\css\styles.css"; github = "assets/css/styles.css" }
    @{ local = "assets\js\script.js"; github = "assets/js/script.js" }
    @{ local = "assets\js\calendar-integration.js"; github = "assets/js/calendar-integration.js" }
    @{ local = "assets\js\mobile-menu.js"; github = "assets/js/mobile-menu.js" }
    @{ local = "assets\js\charter-cards.js"; github = "assets/js/charter-cards.js" }
    @{ local = "assets\js\fix-tear-animation.js"; github = "assets/js/fix-tear-animation.js" }
    @{ local = "assets\images\Logo_breche.svg"; github = "assets/images/Logo_breche.svg" }
    @{ local = "assets\images\6_sans_texte.png"; github = "assets/images/6_sans_texte.png" }
    @{ local = "assets\images\breche_sans_bord.png"; github = "assets/images/breche_sans_bord.png" }
)

$successCount = 0
$totalFiles = $files.Count

Write-Host "🎯 Début de l'upload de $totalFiles fichiers..."

foreach ($file in $files) {
    $localPath = $file.local
    $githubPath = $file.github
    
    if (Test-Path $localPath) {
        if (Upload-File -filePath $localPath -githubPath $githubPath) {
            $successCount++
        }
        Start-Sleep -Seconds 1  # Pause pour éviter les rate limits
    }
    else {
        Write-Host "⚠️  Fichier non trouvé: $localPath"
    }
}

Write-Host ""
Write-Host "📊 Résultat: $successCount/$totalFiles fichiers uploadés avec succès"

if ($successCount -eq $totalFiles) {
    Write-Host "🎉 SUCCESS! Tous les fichiers ont été uploadés sur GitHub!"
    Write-Host "🌐 Votre site sera disponible sur: https://labrecherennes.github.io/La-Breche/"
}
else {
    Write-Host "⚠️  Certains fichiers n'ont pas pu être uploadés. Vérifiez les erreurs ci-dessus."
}

Write-Host ""
Write-Host "🔧 Si GitHub Pages n'est pas activé:"
Write-Host "   1. Allez sur https://github.com/LaBrecheRennes/La-Breche"
Write-Host "   2. Settings > Pages"
Write-Host "   3. Source: Deploy from a branch"
Write-Host "   4. Branch: main / (root)"
Write-Host "   5. Save"
