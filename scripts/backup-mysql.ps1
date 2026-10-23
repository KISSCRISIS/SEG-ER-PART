param(
  [Parameter(Mandatory = $false)][string]$Container = "jem-nexus-mysql",
  [Parameter(Mandatory = $false)][string]$Database = "seg",
  [Parameter(Mandatory = $false)][string]$OutputDirectory = ".\\backups"
)

$ErrorActionPreference = "Stop"
$resolvedOutput = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot "..\\$OutputDirectory"))
New-Item -ItemType Directory -Path $resolvedOutput -Force | Out-Null
$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$target = Join-Path $resolvedOutput "$Database-$stamp.sql"

docker inspect $Container | Out-Null
docker exec $Container sh -c 'exec mysqldump --single-transaction --routines --triggers -uroot -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE"' | Set-Content -LiteralPath $target -Encoding utf8

if ((Get-Item -LiteralPath $target).Length -lt 100) {
  Remove-Item -LiteralPath $target
  throw "Backup validation failed: dump is unexpectedly small."
}

$hash = Get-FileHash -Algorithm SHA256 -LiteralPath $target
Write-Output "Backup created: $target"
Write-Output "SHA256: $($hash.Hash)"
