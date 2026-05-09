# Remove inline buildFooter function + its call from impresion-3d page
# The page has its own inline script with buildFooter - we remove just that function
# and its call, keeping the chip logic intact.

$file = 'impresion-3d\index.html'
$c = Get-Content $file -Raw

# Remove the buildFooter function block and its calls in the inline script
# Pattern: from "  function buildFooter() {" to "  buildFooter();" 
$c = $c -replace '(\r?\n  function buildFooter\(\) \{[\s\S]*?^\}.*\r?\n)', ''
# Also remove standalone buildFooter() calls
$c = $c -replace '[ \t]*buildFooter\(\);[ \t]*\r?\n', ''

Set-Content $file $c -NoNewline
Write-Host "Cleaned: $file"
