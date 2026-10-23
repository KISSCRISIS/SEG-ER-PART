param(
  [Parameter(Mandatory = $true)][string]$ArchivePath
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot
$targetRoot = Join-Path $projectRoot "SEG_CONTENT_LIBRARY\01_RECOVERY_SOURCE_ARTIFACTS"
$questionRoot = Join-Path $targetRoot "QUESTION_BANKS"
$referenceRoot = Join-Path $targetRoot "REFERENCE_LIBRARY"
New-Item -ItemType Directory -Force -Path $questionRoot, $referenceRoot | Out-Null

Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [System.IO.Compression.ZipFile]::OpenRead((Resolve-Path -LiteralPath $ArchivePath))
$wanted = @{
  "1400q_Questions_and_Arabic_Explanations_UTF8.txt" = Join-Path $questionRoot "1400q_Questions_and_Arabic_Explanations_UTF8.txt"
  "PreTest_All_Chapters_Questions_and_Arabic_Explanations_UTF8.txt" = Join-Path $questionRoot "PreTest_All_Chapters_Questions_and_Arabic_Explanations_UTF8.txt"
  "OSCE_Emergency_Medicine_Imaging_Section_UTF8.txt" = Join-Path $targetRoot "OSCE_Emergency_Medicine_Imaging_Section_UTF8.txt"
  "appFlashcards.json" = Join-Path $referenceRoot "appFlashcards.json"
  "chapterStudyMap.json" = Join-Path $referenceRoot "chapterStudyMap.json"
  "fullReferenceLibrary.json" = Join-Path $referenceRoot "fullReferenceLibrary.json"
  "masterTopicFamilyIndex.json" = Join-Path $referenceRoot "masterTopicFamilyIndex.json"
  "masterTrapIndex.json" = Join-Path $referenceRoot "masterTrapIndex.json"
  "flashcards.json" = Join-Path $referenceRoot "flashcards.json"
  "examTraps.json" = Join-Path $referenceRoot "examTraps.json"
  "arabicMentorExplanations.json" = Join-Path $referenceRoot "arabicMentorExplanations.json"
}

$manifest = @()
try {
  foreach ($entry in $archive.Entries) {
    if (-not $wanted.ContainsKey($entry.Name)) { continue }
    $destination = $wanted[$entry.Name]
    $inputStream = $entry.Open()
    $outputStream = [System.IO.File]::Create($destination)
    try { $inputStream.CopyTo($outputStream) } finally { $outputStream.Dispose(); $inputStream.Dispose() }
    $hash = (Get-FileHash -Algorithm SHA256 -LiteralPath $destination).Hash.ToLowerInvariant()
    $manifest += [ordered]@{ file = $entry.Name; sourcePath = $entry.FullName; bytes = $entry.Length; sha256 = $hash }
  }
} finally {
  $archive.Dispose()
}

if ($manifest.Count -ne $wanted.Count) { throw "Expected $($wanted.Count) artifacts but extracted $($manifest.Count)." }
$envelope = [ordered]@{
  schemaVersion = 1
  importedAt = (Get-Date).ToUniversalTime().ToString("o")
  sourceArchive = [System.IO.Path]::GetFileName($ArchivePath)
  operationalState = "private-pilot-under-review"
  artifacts = $manifest
  gates = [ordered]@{
    "1400q" = "quarantined-missing-correct-answers"
    pretest = "quarantined-ocr-corruption"
    osce = "text-only-images-missing"
    referenceLibrary = "private-pilot-under-review"
  }
}
$envelope | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath (Join-Path $targetRoot "manifest.json") -Encoding utf8
Write-Output "Imported $($manifest.Count) recovery artifacts into $targetRoot"
