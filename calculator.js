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
