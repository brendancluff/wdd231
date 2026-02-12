import { fetchRoster } from "./data.js";

export async function initHome() {
  const featuredEl = document.querySelector("#featured");
  if (!featuredEl) return;

  featuredEl.innerHTML = "<p class='muted'>Loading featured dragons…</p>";

  const dragons = await fetchRoster();
  if (dragons.length === 0) {
    featuredEl.innerHTML = "<p class='muted'>Roster unavailable. Please try again later.</p>";
    return;
  }

  const picks = dragons
    .filter((d) => d.temperament === "calm" || d.temperament === "curious")
    .slice(0, 3);

  featuredEl.innerHTML = picks
    .map((d) => {
      return `
        <div class="card" style="padding:0.85rem">
          <strong>${d.name}</strong>
          <div class="small muted">${d.species} • ${capitalize(d.temperament)}</div>
          <div class="small">Top speed: ${d.top_speed_kmh} km/h • Wingspan: ${d.wingspan_m} m</div>
        </div>
      `;
    })
    .join("");
}

function capitalize(s) {
  return `${s[0].toUpperCase()}${s.slice(1)}`;
}
