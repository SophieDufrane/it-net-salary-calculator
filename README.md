# IT Net Salary Calculator

A simple web-based calculator that estimates the annual and monthly **net salary** (netto) of a full-time permanent employee in Italy, starting from their **gross annual salary** (RAL).

Built as a technical prototype for a Jet HR product builder assessment.

## Scope

Simplified, standard case: full-time permanent employee, resident in Milano (Lombardia), no special tax benefits or Bonus.  
Full assumptions and calculation details will be documented as the project progresses.

## Progress Log

### Day 1 — Research & calculation design

- Researched the Italian gross-to-net salary system: IRPEF (2025 brackets), INPS employee contribution, employee tax credit ("detrazione lavoro dipendente"), regional surtax (Lombardia) and municipal surtax (Milano)
- Validated the full calculation manually in a spreadsheet, using a test case (RAL = €35,000), to confirm formulas and expected results before writing any code
- Decided on tech stack: HTML, Bootstrap (CDN), vanilla JavaScript to keep the calculation logic transparent and the deployment simple (GitHub Pages)
- Decided to test the calculation logic with plain Javascript

### Day 2 — Structure & design

- Set up project structure (flat file layout, no subfolders)
- Created wireframes (mobile + larger screen) in a mobile-first approach, since this type of tool is likely to be checked quickly on a phone
- UI includes Region/Comune dropdowns, structured for future extensibility — but only Lombardia/Milano are implemented and calculable in this prototype. This keeps the calculation logic simple while showing how the data model could scale to other regions.
  <details>
     <summary>Wireframes</summary>

     <p>
        <img src="images/Wireframes-it-net-salary-calculator.webp" alt="Wireframes" />
     </p>
  </details>

## Tech Stack

- **Frontend:** HTML, CSS (Bootstrap), vanilla JavaScript
- **Testing:**
- **Deployment:** GitHub Pages

## Setup

_TODO once the app is functional_
