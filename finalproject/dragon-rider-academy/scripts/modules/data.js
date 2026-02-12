export async function fetchRoster() {
  try {
    const res = await fetch("data/dragons.json", { cache: "no-store" });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} while loading roster`);
    }

    const data = await res.json();
    return data.dragons ?? [];
  } catch (err) {
    console.error("Roster load error:", err);
    return [];
  }
}
