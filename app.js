// DOM references: form input and all result table cells/spans
const formEntries = document.getElementById("form-entries");
const incomeInput = document.getElementById("income-input");
const resultRal = document.getElementById("result-ral");
const inps = document.getElementById("result-inps");
const baseImponibile = document.getElementById("result-baseImponibile");
const detrazione = document.getElementById("result-detrazione");
const irpefNetta = document.getElementById("result-irpefNetta");
const comunale = document.getElementById("result-comunale");
const prelievoTotale = document.getElementById("result-prelievoTotale");
const nettoAnnuale = document.getElementById("result-nettoAnnuale");
const nettoMensile = document.getElementById("result-nettoMensile");
const irpefTotale = document.getElementById("result-irpefTotale");
const regionale = document.getElementById("result-regionale");
const irpefRateElements = document.querySelectorAll(".irpef-rate");
const irpefTaxElements = document.querySelectorAll(".irpef-tax");
const regionaleRateElements = document.querySelectorAll(".regionale-rate");
const regionaleTaxElements = document.querySelectorAll(".regionale-tax");

// Calculate and display results on form submission
formEntries.addEventListener("submit", (event) => {
  event.preventDefault();
  const ral = Number(incomeInput.value);
  const results = calculateNetSalary(ral);
  displayResults(ral, results);
});

// Populate the results table with calculated values, including bracket details
function displayResults(ral, results) {
  resultRal.textContent = ral.toLocaleString("it-IT");
  inps.textContent = results.inps.toLocaleString("it-IT");
  baseImponibile.textContent = results.baseImponibile.toLocaleString("it-IT");
  detrazione.textContent = results.detrazione.toLocaleString("it-IT");
  irpefNetta.textContent = results.irpefNetta.toLocaleString("it-IT");
  comunale.textContent = results.comunale.toLocaleString("it-IT");
  prelievoTotale.textContent = results.prelievoTotale.toLocaleString("it-IT");
  nettoAnnuale.textContent = results.nettoAnnuale.toLocaleString("it-IT");
  nettoMensile.textContent = results.nettoMensile.toLocaleString("it-IT");
  irpefTotale.textContent = results.irpefTotale.total.toLocaleString("it-IT");
  regionale.textContent = results.regionale.total.toLocaleString("it-IT");

  results.irpefTotale.details.forEach((row, index) => {
    irpefRateElements[index].textContent = row.rate.toLocaleString("it-IT", {
      style: "percent",
    });
    irpefTaxElements[index].textContent = row.tax.toLocaleString("it-IT");
  });

  results.regionale.details.forEach((row, index) => {
    regionaleRateElements[index].textContent = row.rate.toLocaleString(
      "it-IT",
      {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    );
    regionaleTaxElements[index].textContent = row.tax.toLocaleString("it-IT");
  });
}

// Reset result amounts to zero while keeping displayed tax rates
function clearResults() {
  resultRal.textContent = "0";
  inps.textContent = "0";
  baseImponibile.textContent = "0";
  detrazione.textContent = "0";
  irpefNetta.textContent = "0";
  comunale.textContent = "0";
  prelievoTotale.textContent = "0";
  nettoAnnuale.textContent = "0";
  nettoMensile.textContent = "0";
  irpefTotale.textContent = "0";
  regionale.textContent = "0";

  irpefTaxElements.forEach((el) => (el.textContent = "0"));
  regionaleTaxElements.forEach((el) => (el.textContent = "0"));
}

// Clear results table when the form is reset (Cancella button)
formEntries.addEventListener("reset", () => {
  clearResults();
});
