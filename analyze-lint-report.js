const fs = require('fs');

const report = JSON.parse(fs.readFileSync('apps/GABOR45/lint-report.json', 'utf8'));
let errorCount = 0;
let warningCount = 0;

report.forEach(file => {
  errorCount += file.errorCount;
  warningCount += file.warningCount;
});

const totalProblems = errorCount + warningCount;
// Vous pouvez ajuster la logique de calcul ici en fonction de vos besoins
if (totalProblems > threshold) {
  console.error(`Code quality threshold not met. Found ${totalProblems} problems.`);
  process.exit(1); // Sort avec une erreur
}
