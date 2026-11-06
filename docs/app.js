const DEFAULT_PROJECTS = [
  { id: "desert-house", name: "Desert house, blue hour", description: "A study in warm light and quiet geometry.", count: 12, updated: "today", color: "desert" },
  { id: "botanical-station", name: "Botanical station", description: "Lush worlds inside forgotten architecture.", count: 8, updated: "yesterday", color: "botanical" },
  { id: "soft-objects", name: "Soft objects", description: "Material studies for a gentler future.", count: 5, updated: "Nov 4", color: "soft" },
  { id: "field-notes", name: "Field notes", description: "Fragments, references, and loose directions.", count: 3, updated: "Nov 2", color: "field" }
];

const readJson = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; }
};
const saveJson = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
const projects = () => readJson("turnitout-projects", DEFAULT_PROJECTS);

function protectApp() {
  const loggedIn = localStorage.getItem("turnitout-user");
  if ((/dashboard|projects|project|references/.test(window.location.pathname) || document.body.dataset.authRequired === "true") && !loggedIn) {
    window.location.replace("auth.html");
    return false;
  }
  return true;
}

function renderProjectCards() {
  const grid = document.querySelector("#projectGrid");
  if (!grid) return;
  grid.innerHTML = projects().map((project) => `
    <article class="app-card project-card" data-project-id="${escapeHtml(project.id)}">
      <a href="project.html?id=${encodeURIComponent(project.id)}">
        <div class="project-thumb ${escapeHtml(project.color || "desert")}"></div>
        <div class="project-card-body"><h3>${escapeHtml(project.name)}</h3><p>${escapeHtml(project.count || 0)} explorations · Updated ${escapeHtml(project.updated || "just now")}</p><div class="project-card-footer"><span>Private</span><span>Open ↗</span></div></div>
      </a>
    </article>`).join("");
  const count = document.querySelector("#projectCount");
  if (count) count.textContent = `${projects().length} projects`;
}

function bindProjectControls() {
  renderProjectCards();
  document.querySelector("#projectSearch")?.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase();
    document.querySelectorAll(".project-card").forEach((card) => {
      card.style.display = card.textContent.toLowerCase().includes(query) ? "" : "none";
    });
  });
  document.querySelector("#newProject")?.addEventListener("click", () => {
    const name = window.prompt("Name your new project", "Untitled exploration")?.trim();
    if (!name) return;
    const next = { id: `project-${Date.now()}`, name, description: "A new space for your next idea.", count: 0, updated: "just now", color: "desert" };
    saveJson("turnitout-projects", [next, ...projects()]);
    renderProjectCards();
  });
}

function bindAuth() {
  document.querySelector("#logout")?.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.removeItem("turnitout-user");
    window.location.href = "auth.html";
  });
  document.querySelector("#authForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    localStorage.setItem("turnitout-user", JSON.stringify({ name: document.querySelector("#name").value.trim() || "Creator", email: document.querySelector("#email").value.trim() }));
    window.location.href = "dashboard.html";
  });
  document.querySelector("#signupForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    localStorage.setItem("turnitout-user", JSON.stringify({ name: document.querySelector("#signupName").value.trim() || "Creator", email: document.querySelector("#signupEmail").value.trim() }));
    window.location.href = "dashboard.html";
  });
  const user = readJson("turnitout-user", { name: "Creator", email: "personal@studio.local" });
  document.querySelectorAll("[data-user-name]").forEach((element) => { element.textContent = element.classList.contains("avatar") ? user.name.charAt(0).toUpperCase() : user.name; });
  document.querySelectorAll("[data-user-email]").forEach((element) => { element.textContent = user.email; });
}

function bindProjectDetail() {
  const id = new URLSearchParams(window.location.search).get("id") || "desert-house";
  const project = projects().find((item) => item.id === id) || projects()[0];
  if (!project) return;
  document.querySelectorAll("[data-project-name]").forEach((element) => { element.textContent = project.name; });
  document.querySelector("#projectDescription")?.setAttribute("value", project.description || "");
  document.querySelector("#projectDescription") && (document.querySelector("#projectDescription").value = project.description || "");
  document.querySelector("#projectName") && (document.querySelector("#projectName").value = project.name);
  document.querySelector("#projectForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const all = projects().map((item) => item.id === project.id ? { ...item, name: document.querySelector("#projectName").value.trim() || project.name, description: document.querySelector("#projectDescription").value.trim() } : item);
    saveJson("turnitout-projects", all);
    document.querySelector("#projectSaved").textContent = "Saved just now";
    document.querySelectorAll("[data-project-name]").forEach((element) => { element.textContent = all.find((item) => item.id === project.id).name; });
  });
  const outputs = readJson(`turnitout-outputs-${project.id}`, []);
  const outputGrid = document.querySelector("#outputGrid");
  if (outputGrid) outputGrid.innerHTML = outputs.length ? outputs.map((output) => `<article class="output-card"><div class="output-art ${escapeHtml(output.color || "desert")}"></div><div><strong>${escapeHtml(output.title)}</strong><span>${escapeHtml(output.created)}</span></div></article>`).join("") : `<div class="empty-state">No saved outputs yet. Generate an idea and save it here.</div>`;
  const refs = readJson(`turnitout-references-${project.id}`, []);
  renderReferences(refs);
  document.querySelector("#referenceUpload")?.addEventListener("change", (event) => {
    [...event.target.files].forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => { const next = [...readJson(`turnitout-references-${project.id}`, []), { name: file.name, type: file.type, data: reader.result }]; saveJson(`turnitout-references-${project.id}`, next); renderReferences(next); };
      reader.readAsDataURL(file);
    });
  });
}

function renderReferences(references) {
  const library = document.querySelector("#referenceLibrary");
  if (!library) return;
  library.innerHTML = references.length ? references.map((reference) => `<div class="reference-item"><img src="${reference.data}" alt="${escapeHtml(reference.name)}"><span>${escapeHtml(reference.name)}</span></div>`).join("") : `<div class="empty-state">Upload images to build your visual reference library.</div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  if (!protectApp()) return;
  bindAuth();
  if (document.querySelector("#projectGrid")) bindProjectControls();
  if (document.querySelector("#projectForm")) bindProjectDetail();
});
