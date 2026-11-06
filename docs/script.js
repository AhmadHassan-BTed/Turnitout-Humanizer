document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.querySelector("#themeToggle");
  const menuToggle = document.querySelector("#menuToggle");
  const nav = document.querySelector(".main-nav");
  const promptInput = document.querySelector("#promptInput");
  const resultTitle = document.querySelector("#resultTitle");
  const generationResult = document.querySelector("#generationResult");
  const generateButton = document.querySelector("#generateButton");
  const clearPrompt = document.querySelector("#clearPrompt");
  const saveGeneration = document.querySelector("#saveGeneration");
  let latestPrompt = promptInput?.value || "";

  if (localStorage.getItem("turnitout-theme") === "light") body.classList.add("light");
  themeToggle?.addEventListener("click", () => {
    body.classList.toggle("light");
    localStorage.setItem("turnitout-theme", body.classList.contains("light") ? "light" : "dark");
  });

  menuToggle?.addEventListener("click", () => {
    nav?.classList.toggle("open");
    menuToggle.textContent = nav?.classList.contains("open") ? "×" : "☰";
  });

  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip").forEach((item) => item.classList.remove("active"));
      chip.classList.add("active");
      promptInput.value = chip.dataset.prompt || "";
      latestPrompt = promptInput.value;
    });
  });

  clearPrompt?.addEventListener("click", () => {
    promptInput.value = "";
    promptInput.focus();
  });

  generateButton?.addEventListener("click", () => {
    const prompt = promptInput.value.trim();
    if (!prompt) {
      promptInput.focus();
      return;
    }
    generateButton.disabled = true;
    generateButton.innerHTML = "Exploring <span>✦</span>";
    generationResult.classList.add("is-generating");
    latestPrompt = prompt;
    window.setTimeout(() => {
      const title = prompt.split(",")[0].trim();
      resultTitle.textContent = title.length > 34 ? `${title.slice(0, 34)}…` : title;
      document.querySelector("#resultPrompt").textContent = prompt;
      generateButton.disabled = false;
      generateButton.innerHTML = "Generate <span>✦</span>";
      generationResult.classList.remove("is-generating");
    }, 850);
  });

  saveGeneration?.addEventListener("click", () => {
    const title = document.querySelector("#resultTitle")?.textContent || "Untitled exploration";
    const projectId = "desert-house";
    const key = `turnitout-outputs-${projectId}`;
    const outputs = JSON.parse(localStorage.getItem(key) || "[]");
    outputs.unshift({ title, prompt: latestPrompt, created: "just now", color: "desert" });
    localStorage.setItem(key, JSON.stringify(outputs.slice(0, 12)));
    saveGeneration.textContent = "Saved ✓";
    window.setTimeout(() => { saveGeneration.textContent = "Save to project"; }, 1600);
  });

  document.querySelectorAll(".model-row").forEach((row) => {
    row.addEventListener("click", () => {
      document.querySelectorAll(".model-row").forEach((item) => item.classList.remove("active"));
      row.classList.add("active");
    });
  });
});
