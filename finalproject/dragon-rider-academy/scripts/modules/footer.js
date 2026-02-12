export function initFooter() {
  const year = document.querySelector("#year");
  const lastModified = document.querySelector("#lastModified");

  if (year) year.textContent = String(new Date().getFullYear());
  if (lastModified) lastModified.textContent = document.lastModified;
}
