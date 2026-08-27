const formEntries = document.getElementById("form-entries");
const incomeInput = document.getElementById("income-input");

formEntries.addEventListener("submit", (event) => {
  event.preventDefault();
  const ral = Number(incomeInput.value);
  const results = calculateNetSalary(ral);
  console.log(results);
});
