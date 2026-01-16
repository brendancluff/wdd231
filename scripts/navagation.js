const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("primaryNav");

menuButton.addEventListener("click", () => {
  nav.classList.toggle("open");
});
