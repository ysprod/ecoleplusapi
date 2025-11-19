# Script pour créer un utilisateur de test en local
$ErrorActionPreference = "Stop"

$apiUrl = "http://localhost:3001/api"
$email = "professeur@ecoleplus.ci"
$password = "Test1234"
$firstName = "PROFESSEUR"
$lastName = "TEST"

Write-Host "🚀 Création de l'utilisateur de test..." -ForegroundColor Cyan
Write-Host "📧 Email: $email" -ForegroundColor Yellow
Write-Host "🔑 Mot de passe: $password" -ForegroundColor Yellow
Write-Host "🌐 URL: $apiUrl/user" -ForegroundColor Gray
Write-Host ""

try {
    $body = @{
        email = $email
        password = $password
        firstName = $firstName
        lastName = $lastName
        role = "teacher"
        profileType = "staff"
        gender = "male"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "$apiUrl/users/register" -Method POST -Body $body -ContentType "application/json"
    
    Write-Host "✅ SUCCÈS!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Réponse:" -ForegroundColor White
    $response | ConvertTo-Json -Depth 10
    Write-Host ""
    Write-Host "🎉 Tu peux maintenant te connecter avec:" -ForegroundColor Green
    Write-Host "   Email: $email" -ForegroundColor Cyan
    Write-Host "   Mot de passe: $password" -ForegroundColor Cyan
}
catch {
    Write-Host "❌ ERREUR!" -ForegroundColor Red
    Write-Host ""
    if ($_.Exception.Response) {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "Status: $statusCode" -ForegroundColor Red
        
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Détails: $responseBody" -ForegroundColor Red
    }
    else {
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
    exit 1
}
