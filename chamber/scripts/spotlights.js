const membersUrl = "data/members.json";
const spotlightWrap = document.querySelector("#spotlightCards");

// should match your image export sizing
const SPOT_W = 600;
const SPOT_H = 400;

function levelName(level) {
  if (level === 3) return "Gold";
  if (level === 2) return "Silver";
  return "Member";
}

function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function getMembers() {
  const response = await fetch(membersUrl);
  if (!response.ok) throw new Error("Members fetch failed");
  return response.json();
}

function buildSpotlightCard(member) {
  const card = document.createElement("section");
  card.classList.add("spotlight-card");

  const img = document.createElement("img");
  img.src = `images/${member.image}`;
  img.alt = `${member.name} logo`;
  img.width = SPOT_W;
  img.height = SPOT_H;
  img.loading = "lazy";
  img.decoding = "async";

  const h3 = document.createElement("h3");
  h3.textContent = member.name;

  const address = document.createElement("p");
  address.textContent = member.address;

  const phone = document.createElement("p");
  phone.textContent = member.phone;

  const link = document.createElement("a");
  link.href = member.website;
  link.textContent = member.website;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  const level = document.createElement("p");
  level.textContent = `Membership: ${levelName(member.membershipLevel)}`;

  card.append(img, h3, address, phone, link, level);
  return card;
}

async function loadSpotlights() {
  try {
    const data = await getMembers();

    const eligible = data.members.filter(m => m.membershipLevel === 2 || m.membershipLevel === 3);
    const shuffled = shuffle(eligible);

    // randomly choose 2 or 3
    const count = Math.random() < 0.5 ? 2 : 3;
    const picks = shuffled.slice(0, Math.min(count, shuffled.length));

    spotlightWrap.innerHTML = "";
    const fragment = document.createDocumentFragment();
    picks.forEach(m => fragment.appendChild(buildSpotlightCard(m)));
    spotlightWrap.appendChild(fragment);
  } catch (err) {
    spotlightWrap.textContent = "Spotlights unavailable.";
    console.error(err);
  }
}

loadSpotlights();
