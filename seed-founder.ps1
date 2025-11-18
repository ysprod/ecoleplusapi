# Script pour créer le compte fondateur sur Render
# Usage: .\seed-founder.ps1

$adminToken = "EcolePlus2024SecureAdminToken!"
$apiUrl = "https://ecoleplus-api.onrender.com/api/auth/admin/seed-founder"

$body = @{
    token = $adminToken
    email = "fondateur@ecoleplus.ci"
    password = "Fondateur2024!"
    firstName = "YAYA"
    lastName = "SIDIBE"
} | ConvertTo-Json

Write-Host "🚀 Création du compte fondateur sur Render..." -ForegroundColor Cyan
Write-Host "📧 Email: fondateur@ecoleplus.ci" -ForegroundColor Yellow
Write-Host "🔗 URL: $apiUrl" -ForegroundColor Yellow
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri $apiUrl -Method POST -ContentType "application/json" -Body $body
    
    Write-Host "✅ SUCCÈS!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Réponse:" -ForegroundColor Cyan
    $response | ConvertTo-Json -Depth 10 | Write-Host
    Write-Host ""
    Write-Host "🎉 Tu peux maintenant te connecter avec:" -ForegroundColor Green
    Write-Host "   Email: fondateur@ecoleplus.ci" -ForegroundColor White
    Write-Host "   Mot de passe: Fondateur2024!" -ForegroundColor White
    
} catch {
    Write-Host "❌ ERREUR!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Message d'erreur:" -ForegroundColor Yellow
    Write-Host $_.Exception.Message -ForegroundColor Red
    
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host ""
        Write-Host "Détails de la réponse:" -ForegroundColor Yellow
        Write-Host $responseBody -ForegroundColor Red
    }
}
