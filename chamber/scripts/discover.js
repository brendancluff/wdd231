import { places } from "../data/discover.mjs";

const grid = document.querySelector("#discoverGrid");
const visitMessageEl = document.querySelector("#visitMessage");

function buildCard(place, index) {
  const card = document.createElement("article");
  card.className = `discover-card area-${index + 1}`;

  card.innerHTML = `
    <h2>${place.title}</h2>
    <figure>
      <img src="${place.image}" alt="${place.alt}" loading="lazy" width="300" height="200">
    </figure>
    <address>${place.address}</address>
    <p>${place.description}</p>
    <button type="button">Learn more</button>
  `;

  return card;
}

function renderCards() {
  const frag = document.createDocumentFragment();
  places.forEach((p, i) => frag.appendChild(buildCard(p, i)));
  grid.appendChild(frag);
}

function setVisitMessage() {
  const KEY = "discoverLastVisit";
  const now = Date.now();
  const last = Number(localStorage.getItem(KEY));

  if (!last) {
    visitMessageEl.textContent = "Welcome! Let us know if you have any questions.";
    localStorage.setItem(KEY, String(now));
    return;
  }

  const msPerDay = 24 * 60 * 60 * 1000;
  const days = Math.floor((now - last) / msPerDay);

  if (days < 1) {
    visitMessageEl.textContent = "Back so soon! Awesome!";
  } else {
    visitMessageEl.textContent = `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
  }

  localStorage.setItem(KEY, String(now));
}

renderCards();
setVisitMessage();
