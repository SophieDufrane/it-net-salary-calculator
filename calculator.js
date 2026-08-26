// Thresholds with reusable fixed values
const INCOME_THRESHOLD_MIN = 15000;
const INCOME_THRESHOLD_LOW = 28000;
const INCOME_THRESHOLD_MID = 50000;
// INPS rate
const RATE_FIX_INPS = 0.0919;
// Addizionale comunale - one object for now: Milano
const RATE_FIX_ADD_COMUNALE = { Milano: { rate: 0.008, exemption: 23000 } };
// IRPEF rate
const RATE_IRPEF = [
  { valMax: INCOME_THRESHOLD_LOW, rate: 0.23 },
  { valMax: INCOME_THRESHOLD_MID, rate: 0.35 },
  { valMax: Infinity, rate: 0.43 },
];
// Addizionale regionale - one object for now: Lombardia
const RATE_REGIONALE = {
  Lombardia: [
    { valMax: INCOME_THRESHOLD_MIN, rate: 0.0123 },
    { valMax: INCOME_THRESHOLD_LOW, rate: 0.0158 },
    { valMax: INCOME_THRESHOLD_MID, rate: 0.0172 },
    { valMax: Infinity, rate: 0.0173 },
  ],
};

// Detrazione per lavoro dipendente
const DEDUCTION_FIXED_LOW = 1955;
const DEDUCTION_BASE = 1910;
const DEDUCTION_VARIABLE_MID = 1190;
const DEDUCTION_RANGE_MID = 13000;
const DEDUCTION_RANGE_HIGH = 22000;
// Tax surcharge
const DEDUCTION_BONUS = 65;
const DEDUCTION_BONUS_MIN = 25000;
const DEDUCTION_BONUS_MAX = 35000;

// Number of months for the monthly net
const NB_FIX_MONTHS = 13;

// Calculations with a temporary const for RAL for testing
const ral = 28000;

function calculateINPS(ral) {
  return RATE_FIX_INPS * ral;
}
const inps = calculateINPS(ral);

function calculateTaxableIncome(ral, inps) {
  return ral - inps;
}
const taxableIncome = calculateTaxableIncome(ral, inps);

console.log(inps); // -> 5973.5
console.log(taxableIncome); // -> 59026.5

// Reusable function for the IRPEF and the Regionale calculation
let tranche1 = 0;
let tranche2 = 0;
let tranche3 = 0;

tranche1 = Math.min(taxableIncome, RATE_IRPEF[0].valMax) * RATE_IRPEF[0].rate;

if (taxableIncome > RATE_IRPEF[0].valMax) {
  tranche2 =
    (Math.min(taxableIncome, RATE_IRPEF[1].valMax) - RATE_IRPEF[0].valMax) *
    RATE_IRPEF[1].rate;
}

tranche3 =
  (Math.max(taxableIncome, RATE_IRPEF[1].valMax) - RATE_IRPEF[1].valMax) *
  RATE_IRPEF[2].rate;

let total = tranche1 + tranche2 + tranche3;

console.log(tranche1);
console.log(tranche2);
console.log(tranche3);
console.log(total);
