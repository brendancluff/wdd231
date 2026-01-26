const url = "data/members.json";
const membersContainer = document.querySelector("#members");
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");

async function getMembers() {
  const response = await fetch(url);
  const data = await response.json();
  displayMembers(data.members);
}

function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <h2>${member.name}</h2>
      <p>${member.category}</p>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">${member.website}</a>
      <p>Membership Level: ${member.membershipLevel}</p>
    `;

    membersContainer.appendChild(card);
  });
}

gridbutton.addEventListener("click", () => {
  membersContainer.className = "grid";
});

listbutton.addEventListener("click", () => {
  membersContainer.className = "list";
});

getMembers();
