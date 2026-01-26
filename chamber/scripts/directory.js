const url = "data/members.json";
const membersContainer = document.querySelector("#members");
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");

/* Use real image dimensions if you know them.
   If your webps are exported around 600x400, keep these. */
const IMG_W = 600;
const IMG_H = 400;

async function getMembers() {
  const response = await fetch(url);
  const data = await response.json();
  displayMembers(data.members);
}

function displayMembers(members) {
  membersContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();

  members.forEach((member, index) => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    const img = document.createElement("img");
    img.src = `images/${member.image}`;
    img.alt = `${member.name} logo`;
    img.width = IMG_W;
    img.height = IMG_H;
    img.decoding = "async";

    // LCP: first visible image should be eager + high priority
    if (index === 0) {
      img.loading = "eager";
      img.fetchPriority = "high";
    } else {
      img.loading = "lazy";
    }

    const name = document.createElement("h2");
    name.textContent = member.name;

    const category = document.createElement("p");
    category.textContent = `Category: ${member.category}`;

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
    level.textContent = `Membership Level: ${member.membershipLevel}`;

    card.append(img, name, category, address, phone, link, level);
    fragment.appendChild(card);
  });

  membersContainer.appendChild(fragment);
}

// Toggle views
gridbutton.addEventListener("click", () => {
  membersContainer.classList.add("grid");
  membersContainer.classList.remove("list");
});

listbutton.addEventListener("click", () => {
  membersContainer.classList.add("list");
  membersContainer.classList.remove("grid");
});

// Default view
membersContainer.classList.add("grid");

getMembers();
