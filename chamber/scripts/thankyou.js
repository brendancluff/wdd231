// thankyou.js - displays required form values from URL parameters
document.addEventListener("DOMContentLoaded", () => {
  const summary = document.querySelector("#formSummary");
  if (!summary) return;

  const params = new URLSearchParams(window.location.search);

  const required = [
    ["First Name", "firstName"],
    ["Last Name", "lastName"],
    ["Email", "email"],
    ["Mobile Phone", "phone"],
    ["Business Name", "businessName"],
    ["Timestamp", "timestamp"]
  ];

  // Build a styled list (similar to Advanced Forms)
  const dl = document.createElement("dl");
  dl.classList.add("summary-dl");

  required.forEach(([label, key]) => {
    const value = params.get(key) || "(not provided)";

    const dt = document.createElement("dt");
    dt.textContent = label;

    const dd = document.createElement("dd");
    dd.textContent = value;

    dl.append(dt, dd);
  });

  summary.appendChild(dl);
});
