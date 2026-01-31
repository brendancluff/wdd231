// join.js - sets the hidden timestamp when the join form loads
document.addEventListener("DOMContentLoaded", () => {
  const ts = document.querySelector("#timestamp");

  // ISO is great for consistency and grading (easy to read/verify)
  if (ts) {
    ts.value = new Date().toISOString();
  }
});

// Modal open/close (accessible <dialog>)
document.addEventListener("click", (e) => {
  const opener = e.target.closest("[data-open]");
  if (opener) {
    e.preventDefault();
    const id = opener.getAttribute("data-open");
    const dialog = document.querySelector(`#${id}`);
    if (dialog && typeof dialog.showModal === "function") {
      dialog.showModal();
    }
    return;
  }

  if (e.target.classList.contains("modal-close")) {
    const dialog = e.target.closest("dialog");
    if (dialog) dialog.close();
  }
});
