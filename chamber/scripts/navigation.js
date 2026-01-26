const menuButton = document.querySelector("#menu");
const nav = document.querySelector("#primaryNav");

menuButton.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuButton.classList.toggle("open");
});
