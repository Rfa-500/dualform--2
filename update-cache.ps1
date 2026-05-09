$dirs = @('impresion-3d','inyeccion-de-plastico','aplicaciones','industria','servicios','contacto')
foreach ($dir in $dirs) {
  $path = Join-Path $dir 'index.html'
  if (Test-Path $path) {
    $c = Get-Content $path -Raw
    $c = $c -replace 'dualform-header\.css(\?v=\d+)?', 'dualform-header.css?v=5'
    $c = $c -replace 'dualform-overrides\.css(\?v=\d+)?', 'dualform-overrides.css?v=5'
    $c = $c -replace 'dualform-pages\.css(\?v=\d+)?', 'dualform-pages.css?v=2'
    $c = $c -replace 'dualform-header\.js(\?v=\d+)?', 'dualform-header.js?v=5'
    $c = $c -replace 'dualform-page-common\.js(\?v=\d+)?', 'dualform-page-common.js?v=2'
    Set-Content $path $c -NoNewline
    Write-Host "Updated: $path"
  } else {
    Write-Host "NOT FOUND: $path"
  }
}
Write-Host "Done."
