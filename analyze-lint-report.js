import { readFileSync } from 'fs';

const report = JSON.parse(readFileSync('apps/GABOR45/lint-report.json', 'utf8'));
let errorCount = 0;
let warningCount = 0;

report.forEach(file => {
  errorCount += file.errorCount;
  warningCount += file.warningCount;
});

const totalProblems = errorCount + warningCount;
//si plus de 10% de problèmes, on sort avec une erreur
const threshold = totalProblems / 10;
if (totalProblems > threshold) {
  console.error(`Code quality threshold not met. Found ${totalProblems} problems.`);
  process.exit(1); // Sort avec une erreur
}
