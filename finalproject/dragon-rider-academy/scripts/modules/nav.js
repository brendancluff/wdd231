export function initNav() {
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");

  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.addEventListener("click", (e) => {
    const target = e.target;
    if (target instanceof HTMLAnchorElement) {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  const path = window.location.pathname.toLowerCase();
  let current = "home";
  if (path.includes("dragons")) current = "dragons";
  if (path.includes("enroll")) current = "enroll";

  document.querySelectorAll(".nav__link").forEach((a) => {
    if (a.getAttribute("data-nav") === current) a.classList.add("is-active");
  });
}
