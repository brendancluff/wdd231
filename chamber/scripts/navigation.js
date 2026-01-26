const menuButton = document.querySelector("#menu");
const nav = document.querySelector("#primaryNav");

menuButton.addEventListener("click", () => {
  menuButton.classList.toggle("open");
  nav.classList.toggle("open");

  const isOpen = nav.classList.contains("open");
  menuButton.setAttribute("aria-expanded", isOpen);
});
