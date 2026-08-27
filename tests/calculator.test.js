const { calculateNetSalary } = require("../calculator.js");

// Test 1: RAL = 65000
const result = calculateNetSalary(65000);
const expected = 39608.43;
const rounded = Math.round(result.nettoAnnuale * 100) / 100;

if (rounded === expected) {
  console.log(
    `✅ Test passed: nettoAnnuale correct: ${expected} for RAL 65000`,
  );
} else {
  console.log(`❌ Test failed: expected ${expected}, got ${rounded}`);
}

// Test 2: RAL = 45685
const result2 = calculateNetSalary(45685);
const expected2 = 30111.62;
const rounded2 = Math.round(result2.nettoAnnuale * 100) / 100;

if (rounded2 === expected2) {
  console.log(
    `✅ Test passed: nettoAnnuale correct: ${expected2} for RAL 45685`,
  );
} else {
  console.log(`❌ Test failed: expected ${expected2}, got ${rounded2}`);
}

// Test 3: RAL = 27635
const result3 = calculateNetSalary(27635);
const expected3 = 21019.53;
const rounded3 = Math.round(result3.nettoAnnuale * 100) / 100;

if (rounded3 === expected3) {
  console.log(
    `✅ Test passed: nettoAnnuale correct: ${expected3} for RAL 27635`,
  );
} else {
  console.log(`❌ Test failed: expected ${expected3}, got ${rounded3}`);
}
