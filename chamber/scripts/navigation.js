const menuButton = document.querySelector("#menu");
const nav = document.querySelector("#primaryNav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.classList.toggle("open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  // Active link indicator
  const current = window.location.pathname.split("/").pop() || "index.html";
  nav.querySelectorAll("a").forEach((link) => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }
  });
}
