// ===========================
// Dragon Riders Academy
// Roster Script
// ===========================

const roster = document.querySelector("#roster");
const filterSelect = document.querySelector("#elementFilter");
const modal = document.querySelector("#dragonModal");
const modalContent = document.querySelector("#modalContent");

const DATA_URL = "data/dragons.json";

// ---------- Fetch Data ----------
async function getDragons() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error("Failed to fetch dragon data");
    const data = await response.json();
    displayDragons(data.dragons);
    populateFilter(data.dragons);
  } catch (error) {
    roster.innerHTML = `<p>Error loading dragon data.</p>`;
    console.error(error);
  }
}

// ---------- Display Dragons ----------
function displayDragons(dragons) {
  roster.innerHTML = "";

  dragons.forEach(dragon => {
    const card = document.createElement("section");
    card.classList.add("card");

    card.innerHTML = `
      <img src="images/${dragon.image}" 
           alt="${dragon.name} dragon"
           loading="lazy"
           width="600"
           height="400">
      <h3>${dragon.name}</h3>
      <p><strong>Element:</strong> ${dragon.element}</p>
      <p><strong>Rank:</strong> ${dragon.rank}</p>
      <p><strong>Temperament:</strong> ${dragon.temperament}</p>
      <button data-id="${dragon.id}">View Details</button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      openModal(dragon);
    });

    roster.appendChild(card);
  });
}

// ---------- Modal ----------
function openModal(dragon) {
  modalContent.innerHTML = `
    <h2>${dragon.name}</h2>
    <p><strong>Element:</strong> ${dragon.element}</p>
    <p><strong>Rank:</strong> ${dragon.rank}</p>
    <p><strong>Temperament:</strong> ${dragon.temperament}</p>
    <p><strong>Compatibility:</strong> ${dragon.compatibility}</p>
    <button id="closeModal">Close</button>
  `;

  modal.showModal();

  document.querySelector("#closeModal").addEventListener("click", () => {
    modal.close();
  });
}

// ---------- Filter ----------
function populateFilter(dragons) {
  const elements = [...new Set(dragons.map(d => d.element))];

  elements.forEach(el => {
    const option = document.createElement("option");
    option.value = el;
    option.textContent = el;
    filterSelect.appendChild(option);
  });
}

filterSelect.addEventListener("change", async (e) => {
  try {
    const response = await fetch(DATA_URL);
    const data = await response.json();

    const filtered = e.target.value === "all"
      ? data.dragons
      : data.dragons.filter(d => d.element === e.target.value);

    displayDragons(filtered);
    localStorage.setItem("dragonFilter", e.target.value);
  } catch (error) {
    console.error(error);
  }
});

// ---------- Restore Preference ----------
const savedFilter = localStorage.getItem("dragonFilter");
if (savedFilter) {
  filterSelect.value = savedFilter;
}

// ---------- Init ----------
getDragons();
