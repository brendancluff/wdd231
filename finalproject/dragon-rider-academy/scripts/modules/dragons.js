import { fetchRoster } from "./data.js";
import { createModal } from "./modal.js";

const PREF_KEY = "dra_dragons_prefs";
const FAV_KEY = "dra_favorites";

export async function initDragons() {
  const grid = document.querySelector("#rosterGrid");
  const status = document.querySelector("#rosterStatus");
  const temperSelect = document.querySelector("#temperSelect");
  const sortSelect = document.querySelector("#sortSelect");
  const searchInput = document.querySelector("#searchInput");

  const modalEl = document.querySelector("#detailModal");
  const modalContent = document.querySelector("#modalContent");
  const modalTitle = document.querySelector("#modalTitle");

  if (!grid || !status || !temperSelect || !sortSelect || !searchInput || !modalEl || !modalContent || !modalTitle) return;

  const modal = createModal(modalEl);

  const prefs = loadPrefs();
  temperSelect.value = prefs.temperament;
  sortSelect.value = prefs.sort;

  status.textContent = "Loading directory…";
  const dragons = await fetchRoster();

  if (dragons.length === 0) {
    status.textContent = "Directory unavailable. Check your JSON path and try again.";
    return;
  }

  function update() {
    const temperament = temperSelect.value;
    const sortMode = sortSelect.value;
    const query = searchInput.value.trim().toLowerCase();
    savePrefs({ temperament, sort: sortMode });

    const favorites = loadFavorites();

    let list = dragons
      .filter((d) => (temperament === "all" ? true : d.temperament === temperament))
      .filter((d) => {
        if (!query) return true;
        return `${d.name} ${d.species} ${d.specialty}`.toLowerCase().includes(query);
      });

    list = list.slice();
    if (sortMode === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sortMode === "speed") list.sort((a, b) => b.top_speed_kmh - a.top_speed_kmh);
    if (sortMode === "wing") list.sort((a, b) => b.wingspan_m - a.wingspan_m);

    status.textContent = `${list.length} dragon${list.length === 1 ? "" : "s"} shown.`;

    grid.innerHTML = list
      .map((d) => {
        const isFav = favorites.includes(d.id);
        return `
          <article class="roster-card">
            <div class="roster-card__top">
              <div>
                <h2 style="margin:0 0 0.15rem">${d.name}</h2>
                <p class="muted small" style="margin:0">${d.species}</p>
              </div>
              <div style="display:flex; flex-direction:column; gap:0.35rem; align-items:flex-end">
                <span class="badge">${capitalize(d.temperament)}</span>
                ${isFav ? `<span class="badge badge--fav" aria-label="Favorite">★ Favorite</span>` : ""}
              </div>
            </div>

            <div class="kv" aria-label="Dragon stats">
              <div>
                <strong>Top speed</strong>
                <span>${d.top_speed_kmh} km/h</span>
              </div>
              <div>
                <strong>Wingspan</strong>
                <span>${d.wingspan_m} m</span>
              </div>
              <div>
                <strong>Specialty</strong>
                <span>${d.specialty}</span>
              </div>
              <div>
                <strong>Best for</strong>
                <span>${d.rider_level} riders</span>
              </div>
            </div>

            <div style="display:flex; gap:0.5rem; flex-wrap:wrap">
              <button class="btn btn--outline" type="button" data-detail="${d.id}">View details</button>
              <button class="btn" type="button" data-fav="${d.id}">${isFav ? "Unfavorite" : "Save favorite"}</button>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function openDetails(id) {
    const d = dragons.find((x) => String(x.id) === String(id));
    if (!d) return;

    const isFav = loadFavorites().includes(d.id);

    modalTitle.textContent = `${d.name} — Details`;
    modalContent.innerHTML = `
      <p class="muted">${d.species} • Temperament: <strong>${capitalize(d.temperament)}</strong></p>
      <ul>
        <li><strong>Top speed:</strong> ${d.top_speed_kmh} km/h</li>
        <li><strong>Wingspan:</strong> ${d.wingspan_m} m</li>
        <li><strong>Specialty:</strong> ${d.specialty}</li>
        <li><strong>Recommended rider level:</strong> ${d.rider_level}</li>
      </ul>
      <p class="small muted">Favorites are saved in localStorage so you can compare later.</p>
      <p class="small"><strong>Status:</strong> ${isFav ? "★ This dragon is in your favorites." : "Not favorited yet."}</p>
    `;
    modal.open();
  }

  function toggleFavorite(id) {
    const numericId = Number(id);
    const saved = loadFavorites();
    const exists = saved.includes(numericId);
    const updated = exists ? saved.filter((x) => x !== numericId) : [...saved, numericId];
    localStorage.setItem(FAV_KEY, JSON.stringify(updated));
    update();
  }

  temperSelect.addEventListener("change", update);
  sortSelect.addEventListener("change", update);
  searchInput.addEventListener("input", update);

  grid.addEventListener("click", (e) => {
    const detailBtn = e.target.closest("button[data-detail]");
    if (detailBtn) {
      openDetails(detailBtn.getAttribute("data-detail"));
      return;
    }
    const favBtn = e.target.closest("button[data-fav]");
    if (favBtn) {
      toggleFavorite(favBtn.getAttribute("data-fav"));
    }
  });

  update();
}

function loadPrefs() {
  try {
    const raw = localStorage.getItem(PREF_KEY);
    if (!raw) return { temperament: "all", sort: "name" };
    const parsed = JSON.parse(raw);
    return {
      temperament: parsed.temperament ?? "all",
      sort: parsed.sort ?? "name"
    };
  } catch {
    return { temperament: "all", sort: "name" };
  }
}

function savePrefs(prefs) {
  localStorage.setItem(PREF_KEY, JSON.stringify(prefs));
}

function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.map(Number) : [];
  } catch {
    return [];
  }
}

function capitalize(s) {
  return `${s[0].toUpperCase()}${s.slice(1)}`;
}
