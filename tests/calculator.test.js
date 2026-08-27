const { calculateNetSalary } = require("../calculator.js");

const result = calculateNetSalary(65000);
const expected = 39608.43;
const rounded = Math.round(result.nettoAnnuale * 100) / 100;

if (rounded === expected) {
  console.log(`✅ Test passed: nettoAnnuale correct: ${expected}`);
} else {
  console.log(`❌ Test failed: expected ${expected}, got ${rounded}`);
}
