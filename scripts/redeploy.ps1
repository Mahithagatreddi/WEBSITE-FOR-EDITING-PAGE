# Run this from the project folder to push code and deploy with videos included.
# GitHub push alone often times out because videos are ~530 MB total.

Write-Host "Step 1: Bigger upload buffer for Git..."
git config http.postBuffer 524288000
git config http.version HTTP/1.1

Write-Host "Step 2: Commit any changes..."
git add -A
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) {
  git commit -m "Fix video playback and redeploy media"
}

Write-Host "Step 3: Push to GitHub (may take several minutes)..."
git push origin main
if ($LASTEXITCODE -ne 0) {
  Write-Host "Git push failed or timed out. Use Vercel direct deploy instead:"
  Write-Host "  npx vercel --prod"
  exit 1
}

Write-Host "Done. Vercel will auto-redeploy from GitHub in a few minutes."
