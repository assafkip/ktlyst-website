# =============================================================================
# KTLYST - Session Invalidation Script
# Advisory: CI/CD Supply Chain Attack (Trivy/TeamPCP Campaign)
# Generated: 2026-04-13
#
# Force session invalidation for developers who ran Trivy v0.69.4 or
# triggered compromised GitHub Actions during the March 19-23 attack window.
#
# Prerequisites:
#   - Microsoft Graph PowerShell SDK: Install-Module Microsoft.Graph
#   - Appropriate admin permissions (User Administrator or Global Administrator)
# =============================================================================

#Requires -Modules Microsoft.Graph.Users, Microsoft.Graph.Authentication

[CmdletBinding(SupportsShouldProcess)]
param(
    # Path to CSV file with affected users (columns: UserPrincipalName, Reason)
    # If not provided, script will prompt for manual input
    [Parameter()]
    [string]$AffectedUsersCSV,

    # Skip confirmation prompts (use with caution)
    [Parameter()]
    [switch]$Force,

    # Log file path
    [Parameter()]
    [string]$LogFile = ".\trivy-session-invalidation-$(Get-Date -Format 'yyyy-MM-dd-HHmmss').log"
)

function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $entry = "[$timestamp] [$Level] $Message"
    Write-Host $entry -ForegroundColor $(switch ($Level) {
        "ERROR" { "Red" }
        "WARN"  { "Yellow" }
        "OK"    { "Green" }
        default { "White" }
    })
    Add-Content -Path $LogFile -Value $entry
}

# --- Connect to Microsoft Graph ---
Write-Log "Connecting to Microsoft Graph..."
try {
    Connect-MgGraph -Scopes "User.ReadWrite.All", "Directory.ReadWrite.All" -ErrorAction Stop
    Write-Log "Connected to Microsoft Graph" -Level "OK"
} catch {
    Write-Log "Failed to connect to Microsoft Graph: $_" -Level "ERROR"
    exit 1
}

# --- Load affected users ---
$affectedUsers = @()

if ($AffectedUsersCSV -and (Test-Path $AffectedUsersCSV)) {
    Write-Log "Loading affected users from $AffectedUsersCSV"
    $affectedUsers = Import-Csv $AffectedUsersCSV
    Write-Log "Loaded $($affectedUsers.Count) users from CSV"
} else {
    Write-Log "No CSV provided. Enter affected user UPNs (one per line, empty line to finish):" -Level "WARN"
    $upns = @()
    while ($true) {
        $userInput = Read-Host "UPN"
        if ([string]::IsNullOrWhiteSpace($userInput)) { break }
        $upns += [PSCustomObject]@{
            UserPrincipalName = $userInput
            Reason = "Manually identified - Trivy/TeamPCP compromise"
        }
    }
    $affectedUsers = $upns
}

if ($affectedUsers.Count -eq 0) {
    Write-Log "No affected users specified. Exiting." -Level "WARN"
    exit 0
}

Write-Log "Processing $($affectedUsers.Count) affected user(s)..."
Write-Log "Advisory: Trivy/TeamPCP Supply Chain Attack (March 19-23, 2026)"

# --- Summary before execution ---
Write-Host "`n=== SESSION INVALIDATION PLAN ===" -ForegroundColor Cyan
Write-Host "Users to invalidate: $($affectedUsers.Count)" -ForegroundColor White
Write-Host "Actions per user:" -ForegroundColor White
Write-Host "  1. Revoke all refresh tokens (Microsoft Graph)" -ForegroundColor White
Write-Host "  2. Revoke all sign-in sessions (Entra ID)" -ForegroundColor White
Write-Host "  3. Force password change on next login with MFA" -ForegroundColor White
Write-Host "================================`n" -ForegroundColor Cyan

if (-not $Force) {
    $confirm = Read-Host "Proceed with session invalidation? (yes/no)"
    if ($confirm -ne "yes") {
        Write-Log "Operation cancelled by user" -Level "WARN"
        exit 0
    }
}

# --- Process each user ---
$results = @()

foreach ($user in $affectedUsers) {
    $upn = $user.UserPrincipalName
    $reason = $user.Reason
    Write-Log "--- Processing: $upn (Reason: $reason) ---"

    $result = [PSCustomObject]@{
        UserPrincipalName    = $upn
        Reason               = $reason
        TokensRevoked        = $false
        PasswordResetRequired = $false
        Error                = $null
        Timestamp            = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    }

    try {
        # Step 1: Revoke all refresh tokens and sign-in sessions
        if ($PSCmdlet.ShouldProcess($upn, "Revoke sign-in sessions")) {
            Write-Log "  Revoking sign-in sessions for $upn..."
            Invoke-MgInvalidateUserRefreshToken -UserId $upn -ErrorAction Stop
            $result.TokensRevoked = $true
            Write-Log "  Sessions revoked for $upn" -Level "OK"
        }

        # Step 2: Force password change on next sign-in (with MFA)
        if ($PSCmdlet.ShouldProcess($upn, "Require password change")) {
            Write-Log "  Setting password change requirement for $upn..."
            $passwordProfile = @{
                ForceChangePasswordNextSignIn        = $true
                ForceChangePasswordNextSignInWithMfa = $true
            }
            Update-MgUser -UserId $upn -PasswordProfile $passwordProfile -ErrorAction Stop
            $result.PasswordResetRequired = $true
            Write-Log "  Password change required for $upn" -Level "OK"
        }

    } catch {
        $result.Error = $_.Exception.Message
        Write-Log "  Error processing ${upn}: $_" -Level "ERROR"
    }

    $results += $result
}

# --- Summary Report ---
Write-Host "`n=== INVALIDATION RESULTS ===" -ForegroundColor Cyan

$successCount = ($results | Where-Object { $_.TokensRevoked -eq $true }).Count
$failCount = ($results | Where-Object { $null -ne $_.Error }).Count

Write-Log "Total processed: $($results.Count)"
Write-Log "Successful invalidations: $successCount" -Level "OK"
if ($failCount -gt 0) {
    Write-Log "Failed: $failCount" -Level "ERROR"
    $results | Where-Object { $null -ne $_.Error } | ForEach-Object {
        Write-Log "  FAILED: $($_.UserPrincipalName) - $($_.Error)" -Level "ERROR"
    }
}

# Export results to CSV
$resultsFile = ".\trivy-invalidation-results-$(Get-Date -Format 'yyyy-MM-dd-HHmmss').csv"
$results | Export-Csv -Path $resultsFile -NoTypeInformation
Write-Log "Results exported to $resultsFile"
Write-Log "Log file: $LogFile"

Write-Host "`n=== NEXT STEPS ===" -ForegroundColor Yellow
Write-Host "1. Notify affected users that their sessions have been invalidated" -ForegroundColor White
Write-Host "2. Users will need to re-authenticate with MFA on next sign-in" -ForegroundColor White
Write-Host "3. Users must change their password before gaining access" -ForegroundColor White
Write-Host "4. Monitor sign-in logs for the next 72 hours for anomalous re-authentication" -ForegroundColor White
Write-Host "5. Cross-reference with GitHub token rotation (see identity/github_token_rotation.md)" -ForegroundColor White

# Disconnect
Disconnect-MgGraph | Out-Null
Write-Log "Disconnected from Microsoft Graph"
