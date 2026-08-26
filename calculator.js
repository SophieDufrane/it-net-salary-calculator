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

function calculateINPS(ral) {
  return RATE_FIX_INPS * ral;
}

function calculateTaxableIncome(ral, inps) {
  return ral - inps;
}

// Reusable function for the IRPEF and the Regionale calculation with total and details
function applyBrackets(taxableIncome, brackets) {
  let totalTax = 0;
  let previousLimit = 0;
  let bracketDetails = [];

  for (let i = 0; i < brackets.length; i++) {
    const taxableAmount = Math.max(
      0,
      Math.min(taxableIncome, brackets[i].valMax) - previousLimit,
    );
    previousLimit = brackets[i].valMax;
    const tax = taxableAmount * brackets[i].rate;
    totalTax += tax;
    bracketDetails.push({
      rate: brackets[i].rate,
      taxableAmount: taxableAmount,
      tax: tax,
    });
  }
  return { total: totalTax, details: bracketDetails };
}

// Calculate Comunale tax based on Milano parameters
function calculateComunaleTax(taxableIncome) {
  if (taxableIncome >= RATE_FIX_ADD_COMUNALE.Milano.exemption) {
    return taxableIncome * RATE_FIX_ADD_COMUNALE.Milano.rate;
  } else return 0;
}

// Calculate the deduction + bonus based on brackets
function calculateDeduction(taxableIncome) {
  let deduction = 0;
  if (taxableIncome <= INCOME_THRESHOLD_MIN) {
    deduction = DEDUCTION_FIXED_LOW;
  }
  if (
    taxableIncome > INCOME_THRESHOLD_MIN &&
    taxableIncome < INCOME_THRESHOLD_LOW
  ) {
    deduction =
      DEDUCTION_BASE +
      DEDUCTION_VARIABLE_MID *
        ((INCOME_THRESHOLD_LOW - taxableIncome) / DEDUCTION_RANGE_MID);
  }
  if (
    taxableIncome > INCOME_THRESHOLD_LOW &&
    taxableIncome < INCOME_THRESHOLD_MID
  ) {
    deduction =
      DEDUCTION_BASE *
      ((INCOME_THRESHOLD_MID - taxableIncome) / DEDUCTION_RANGE_HIGH);
  }
  if (
    taxableIncome >= DEDUCTION_BONUS_MIN &&
    taxableIncome <= DEDUCTION_BONUS_MAX
  ) {
    deduction += DEDUCTION_BONUS;
  }
  return deduction;
}

// refactor and combine all calculation steps into the final net salary result
function calculateNetSalary(ral) {
  const inps = calculateINPS(ral);
  const taxableIncome = calculateTaxableIncome(ral, inps);
  const irpefResult = applyBrackets(taxableIncome, RATE_IRPEF);
  const deduction = calculateDeduction(taxableIncome);
  const irpefNet = irpefResult.total - deduction;
  const regionaleResult = applyBrackets(
    taxableIncome,
    RATE_REGIONALE.Lombardia,
  );
  const comunaleTax = calculateComunaleTax(taxableIncome);
  const totalTaxes = inps + irpefNet + regionaleResult.total + comunaleTax;
  const netAnnual = ral - totalTaxes;
  const netMonthly = netAnnual / NB_FIX_MONTHS;

  return {
    INPS: inps,
    "Base Imponibile fiscale": taxableIncome,
    "IRPEF Totale": irpefResult,
    Detrazione: deduction,
    "IRPEF netta": irpefNet,
    Regionale: regionaleResult,
    Comunale: comunaleTax,
    "Prelievi Totale": totalTaxes,
    "Netto annuale": netAnnual,
    "Netto Mensile": netMonthly,
  };
}
console.log(calculateNetSalary(45000));
