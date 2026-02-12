export function initThanks() {
  const el = document.querySelector("#submission");
  if (!el) return;

  const params = new URLSearchParams(window.location.search);

  if ([...params.keys()].length === 0) {
    el.innerHTML = "<p class='muted'>No data was received. Please submit the form from the Enroll page.</p>";
    return;
  }

  const safe = (s) =>
    String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");

  const rows = [];
  for (const [key, value] of params.entries()) {
    rows.push(`<tr><th scope="row">${safe(key)}</th><td>${safe(value)}</td></tr>`);
  }

  el.innerHTML = `
    <table class="table">
      <caption class="sr-only">Submitted enrollment inquiry data</caption>
      <tbody>
        ${rows.join("")}
      </tbody>
    </table>
  `;
}
