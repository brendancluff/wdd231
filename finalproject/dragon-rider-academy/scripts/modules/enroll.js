import { createModal } from "./modal.js";

const DRAFT_KEY = "dra_enroll_draft";

export function initEnroll() {
  const form = document.querySelector("#enrollForm");
  const status = document.querySelector("#formStatus");
  const clearBtn = document.querySelector("#clearDraft");

  const modalEl = document.querySelector("#enrollModal");
  const modalContent = document.querySelector("#enrollModalContent");

  if (!form || !status || !clearBtn || !modalEl || !modalContent) return;

  const modal = createModal(modalEl);

  const draft = loadDraft();
  if (draft) {
    for (const [key, value] of Object.entries(draft)) {
      const el = form.elements.namedItem(key);
      if (!el) continue;

      if (el instanceof HTMLInputElement && el.type === "checkbox" && Array.isArray(value)) {
        const boxes = form.querySelectorAll(`input[name="${key}"]`);
        boxes.forEach((b) => (b.checked = value.includes(b.value)));
      } else if (el instanceof HTMLInputElement && el.type === "checkbox") {
        el.checked = Boolean(value);
      } else {
        el.value = String(value);
      }
    }
    status.textContent = "Draft restored from localStorage.";
  }

  form.addEventListener("input", () => {
    saveDraft(serializeForm(form));
    status.textContent = "Draft saved.";
  });

  clearBtn.addEventListener("click", () => {
    localStorage.removeItem(DRAFT_KEY);
    form.reset();
    status.textContent = "Draft cleared.";
  });

  form.addEventListener("submit", (e) => {
    const errors = validate(form);

    if (errors.length) {
      e.preventDefault();
      modalContent.innerHTML = `
        <p>Please fix the following:</p>
        <ul>${errors.map((m) => `<li>${m}</li>`).join("")}</ul>
      `;
      modal.open();
      return;
    }

    localStorage.removeItem(DRAFT_KEY);
  });
}

function validate(form) {
  const messages = [];

  const fullName = form.elements.namedItem("fullName");
  const email = form.elements.namedItem("email");
  const agree = form.elements.namedItem("agree");

  if (!fullName.value.trim()) messages.push("Full name is required.");
  if (!email.value.trim()) messages.push("Email is required.");
  if (email.value && !email.value.includes("@")) messages.push("Please enter a valid email address.");
  if (!agree.checked) messages.push("You must agree to the safety and welfare policy.");

  return messages;
}

function serializeForm(form) {
  const data = new FormData(form);
  const obj = {};

  for (const key of data.keys()) {
    const values = data.getAll(key);
    obj[key] = values.length > 1 ? values : values[0];
  }
  return obj;
}

function saveDraft(obj) {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(obj));
}

function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
