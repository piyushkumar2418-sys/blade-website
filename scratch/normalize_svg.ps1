param($file, $skipPaths)
$c = Get-Content $file
# Lines 0 and 1 are usually <?xml... and <svg...
# Paths start at line 2 (0-indexed)
$startIndex = 2 + $skipPaths
$n = $c[0,1] + $c[$startIndex..($c.Length-1)]
$n = $n -replace 'fill="#[0-9A-Fa-f]{6}"', 'fill="currentColor"'
$n = $n -replace 'stroke="#[0-9A-Fa-f]{6}"', 'stroke="currentColor"'
$n | Set-Content $file
