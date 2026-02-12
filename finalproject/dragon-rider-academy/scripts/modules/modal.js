export function createModal(modalEl) {
  const panel = modalEl.querySelector(".modal__panel");
  const closeTargets = modalEl.querySelectorAll("[data-close='true']");
  let lastFocus = null;

  function open() {
    lastFocus = document.activeElement;
    modalEl.classList.add("is-open");
    modalEl.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    const focusable = panel.querySelectorAll(
      "button, a, input, select, textarea, [tabindex]:not([tabindex='-1'])"
    );
    if (focusable.length) focusable[0].focus();
  }

  function close() {
    modalEl.classList.remove("is-open");
    modalEl.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  closeTargets.forEach((el) => el.addEventListener("click", close));

  modalEl.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();

    if (e.key === "Tab") {
      const focusable = panel.querySelectorAll(
        "button, a, input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  return { open, close };
}
