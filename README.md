# IT Net Salary Calculator

A simple web-based calculator that estimates the annual and monthly **net salary** (netto) of a full-time permanent employee in Italy, starting from their **gross annual salary** (RAL).

Built as a technical prototype for a Jet HR product builder assessment.

[Link to live version](https://sophiedufrane.github.io/it-net-salary-calculator/)

## Scope

- Simplified case: full-time permanent employee, resident in Milano (Lombardia), no special tax benefits or Bonus
- Included in the calculation: INPS employee contribution, IRPEF 2025, tax credit, addizionale regionale and addizionale comunale
- Salary is calculated over 13 monthly payments
- Explicitly excluded: "trattamento integrativo", "ulteriore detrazione" 2025, personal deductions and support for regions/comuni other than Lombardia/Milano.

## Progress Log

### Research & calculation design

- Researched the Italian gross-to-net salary system: IRPEF (2025 brackets), INPS employee contribution, employee tax credit ("detrazione lavoro dipendente"), regional surtax (Lombardia) and municipal surtax (Milano)
- Validated the full calculation manually in a spreadsheet, using a test case (RAL = €35,000), to confirm formulas and expected results before writing any code
- Decided on tech stack: HTML, Bootstrap (CDN), vanilla JavaScript to keep the calculation logic transparent and the deployment simple (GitHub Pages)
- Decided to test the calculation logic with plain Javascript

### Structure & design

- Set up project structure (flat file layout, no subfolders)
- Created wireframes (mobile + larger screen) in a mobile-first approach, since this type of tool is likely to be checked quickly on a phone
- UI includes Region/Comune fields, structured for future extensibility (but only Lombardia/Milano are implemented and calculable in this prototype). These fields are currently disabled rather than dropdowns, since only one option exists; this keeps the prototypt simple while showing how it could scale to other regions

  <details>
     <summary>Wireframes</summary>

     <p>
        <img src="images/Wireframes-it-net-salary-calculator.webp" alt="Wireframes" />
     </p>
  </details>

### Development and calculation logic

- Chose 2025 IRPEF brackets (23%/35%/43%) as the reference year, for a stable dataset
- Regional/municipal data structures (`RATE_REGIONALE`, `RATE_FIX_ADD_COMUNALE`) are keyed by name (e.g. "Lombardia", "Milano") to allow future extension to other regions/comuni, even though only one of each is implemented in this prototype
- `applyBrackets` is a single generic function used for both IRPEF and addizionale regional as both are progressive calculations based on brackets
- `calculateComunaleTax` currently hardcodes "Milano" (would need to accept a comune parameter to support other municipalities)

## Testing

Basic automated tests were added in `tests/calculator.test.js`, validating `calculateNetSalary()` against three reference RAL.

While testing the RAL=27,635€ case, a discrepancy was found between the JS calculation and the original Excel reference. After manual recalculation, the Excel reference itself contained an error and the JavaScript implementation was correct.

  <details>
     <summary>Testing Validation</summary>
     <p>
        <img src="images/testing.webp" alt="Testing" />
     </p>
  </details>

## Areas for Improvement

- Generate results table rows dynamically from `calculateNetSalary()` output length (currently hardcoded per bracket), so adding/removing tax brackets wouldn't require manual HTML changes
- Dynamically compute the displayed tax year instead of hardcoding "2025" (needs to confirm the exact Italian fiscal year reference rule before implementing)

## Tech Stack

- **Frontend:** HTML, CSS (Bootstrap), vanilla JavaScript
- **Testing:** Plain Node.js scripts (no framework)
- **Deployment:** GitHub Pages

## Setup

No build step or dependencies required — this is a static HTML/CSS/JS project.

To run locally:

1. Clone the repository
2. Open `index.html` directly in a browser

To run the tests: `node tests/calculator.test.js`

## Lessons Learned

- Translating the spreadsheet logic into JavaScript wasn't a direct transcription. Calculations for IRPEF and addizionale regionale with brackets, required understanding _why_ each tranche depends on the cumulative amount from the previous one (hence the use of `previousLimit`), not just replicating a fixed formula
- Using `forEach` on two separate arrays at once required understanding that the loop's `index` connects them: it points to the same position in both arrays at the same time, so each calculated value ends up matched with the correct HTML element
