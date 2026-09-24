/**
 * TURNITOUT: Interactive Xerox Notebook & AI Pattern Evader Simulator
 * Real-time pattern disruption, handwritten margin markup, state machine, and theme toggling.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle: 3 AM Study Session (Dark) vs Xerox Aged Paper (Light)
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const currentTheme = localStorage.getItem("turnitout_theme") || "light";

  const MOON_SVG = '<svg class="icon icon-moon" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
  const SUN_SVG = '<svg class="icon icon-sun" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
  const CHECK_SVG = '<svg class="icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
  const REFRESH_SVG = '<svg class="icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>';

  function updateThemeButton(isDark) {
    if (!themeToggleBtn) return;
    themeToggleBtn.innerHTML = `${isDark ? SUN_SVG : MOON_SVG} <span>Study Session: 3 AM (Dark)</span>`;
  }

  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    updateThemeButton(true);
  } else {
    updateThemeButton(false);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("turnitout_theme", isDark ? "dark" : "light");
      updateThemeButton(isDark);
    });
  }

  // Pre-configured AI Cliché Test Snippets
  const SAMPLE_ACADEMIC = 
`In conclusion, it is important to delve into the comprehensive tapestry of modern neural networks. This study plays a pivotal role in illustrating that artificial intelligence stands as a testament to human innovation. Furthermore, the interplay between stochastic optimization and computational scalability provides a robust framework for subsequent empirical inquiries.`;

  const SAMPLE_ESSAY = 
`Moreover, in today's fast-paced digital era, climate change serves as a critical milestone that cannot be overlooked. It is crucial to delve deep into the multifaceted dimensions of environmental sustainability. Ultimately, this paradigm shift plays a pivotal role in reshaping societal perspectives.`;

  const paperSheet = document.getElementById("paperSheet");
  const humanizeBtn = document.getElementById("humanizeBtn");
  const copyBtn = document.getElementById("copyBtn");
  const meterFill = document.getElementById("meterFill");
  const meterScore = document.getElementById("meterScore");
  const sampleAcademicBtn = document.getElementById("sampleAcademicBtn");
  const sampleEssayBtn = document.getElementById("sampleEssayBtn");
  const statusStamp = document.getElementById("statusStamp");
  const tutorNote = document.getElementById("tutorNote");

  // State Machine: "RAW" -> "MARKED" -> "CLEAN"
  let currentSimState = "RAW";
  let cachedRawText = paperSheet ? paperSheet.textContent.trim() : SAMPLE_ACADEMIC;

  // AI Cliché dictionary for live demo replacement
  const replacements = [
    { pattern: /\bIn conclusion,?\b/gi, replace: "To wrap up," },
    { pattern: /\bit is important to delve into\b/gi, replace: "we look closely at" },
    { pattern: /\bdelve into\b/gi, replace: "explore" },
    { pattern: /\bcomprehensive tapestry\b/gi, replace: "broad range" },
    { pattern: /\bplays a pivotal role in illustrating\b/gi, replace: "clearly shows" },
    { pattern: /\bplays a pivotal role\b/gi, replace: "is essential" },
    { pattern: /\bstands as a testament to\b/gi, replace: "reflects" },
    { pattern: /\bFurthermore, the interplay between\b/gi, replace: "Also, balancing" },
    { pattern: /\bFurthermore,?\b/gi, replace: "Also," },
    { pattern: /\bprovides a robust framework\b/gi, replace: "gives a solid basis" },
    { pattern: /\bMoreover, in today's fast-paced digital era,?\b/gi, replace: "Today," },
    { pattern: /\bMoreover,?\b/gi, replace: "In addition," },
    { pattern: /\bserves as a critical milestone\b/gi, replace: "is a major turning point" },
    { pattern: /\bcannot be overlooked\b/gi, replace: "we must address" },
    { pattern: /\bdelve deep into the multifaceted dimensions of\b/gi, replace: "examine the details of" },
    { pattern: /\bUltimately, this paradigm shift\b/gi, replace: "In the end, this shift" }
  ];

  function resetToRaw(text, initialScore = 96) {
    cachedRawText = text;
    currentSimState = "RAW";
    paperSheet.textContent = text;
    meterFill.style.width = `${initialScore}%`;
    meterFill.style.backgroundColor = "var(--red-pen)";
    meterScore.textContent = `${initialScore}%`;
    meterScore.style.color = "var(--red-pen)";
    
    if (statusStamp) statusStamp.style.display = "none";
    if (tutorNote) tutorNote.style.display = "none";
    if (humanizeBtn) humanizeBtn.textContent = "HUMANIZE THIS PAPER →";
  }

  // Load sample texts
  if (sampleAcademicBtn && paperSheet) {
    sampleAcademicBtn.addEventListener("click", () => {
      resetToRaw(SAMPLE_ACADEMIC, 96);
    });
  }

  if (sampleEssayBtn && paperSheet) {
    sampleEssayBtn.addEventListener("click", () => {
      resetToRaw(SAMPLE_ESSAY, 98);
    });
  }

  // Detect user typing / paste in the sheet
  if (paperSheet) {
    paperSheet.addEventListener("input", () => {
      if (currentSimState !== "RAW") {
        currentSimState = "RAW";
        if (humanizeBtn) humanizeBtn.textContent = "HUMANIZE THIS PAPER →";
        if (statusStamp) statusStamp.style.display = "none";
        if (tutorNote) tutorNote.style.display = "none";
        meterFill.style.width = "94%";
        meterFill.style.backgroundColor = "var(--red-pen)";
        meterScore.textContent = "94%";
        meterScore.style.color = "var(--red-pen)";
      }
      cachedRawText = paperSheet.textContent.trim();
    });
  }

  if (humanizeBtn && paperSheet) {
    humanizeBtn.addEventListener("click", () => {
      if (currentSimState === "RAW") {
        // --- TRANSITION: RAW -> MARKED (Show Tutor Strikethrough & Handwriting) ---
        let rawText = cachedRawText || paperSheet.textContent.trim();
        if (!rawText) {
          alert("Please paste some text or select a sample first!");
          return;
        }

        humanizeBtn.disabled = true;
        humanizeBtn.textContent = "Marking Up Patterns...";

        let markedHtml = rawText;
        let matchFound = false;

        replacements.forEach(item => {
          if (item.pattern.test(markedHtml)) {
            matchFound = true;
            markedHtml = markedHtml.replace(item.pattern, (match) => {
              return `<span class="ai-crossed">${match}</span><span class="human-replacement">${item.replace}</span>`;
            });
          }
        });

        if (!matchFound) {
          // If no canned cliché was found, introduce natural burstiness manually
          const sentences = rawText.split(/(?<=[.?!])\s+/);
          markedHtml = sentences.map((s, idx) => {
            if (idx === 0) {
              return `<span class="human-replacement" style="margin-left:0; margin-right:6px;">In particular,</span> ` + s;
            }
            if (idx % 2 === 1 && s.length > 50) {
              const words = s.split(" ");
              if (words.length > 6) {
                const mid = Math.floor(words.length / 2);
                return words.slice(0, mid).join(" ") + 
                  ` <span class="ai-crossed">—</span> <span class="human-replacement">specifically</span> ` + 
                  words.slice(mid).join(" ");
              }
            }
            return s;
          }).join(" ");
        }

        paperSheet.innerHTML = markedHtml;

        setTimeout(() => {
          meterFill.style.width = "4%";
          meterFill.style.backgroundColor = "#2E7D32"; // Green
          meterScore.textContent = "4%";
          meterScore.style.color = "#2E7D32";

          if (statusStamp) {
            statusStamp.style.display = "inline-block";
          }
          if (tutorNote) {
            tutorNote.style.display = "block";
          }

          humanizeBtn.disabled = false;
          humanizeBtn.innerHTML = `RESOLVE TO CLEAN TEXT ${CHECK_SVG}`;
          currentSimState = "MARKED";
        }, 400);

      } else if (currentSimState === "MARKED") {
        // --- TRANSITION: MARKED -> CLEAN (Clean Final Paper Without Strikethroughs) ---
        let cleanText = cachedRawText;
        replacements.forEach(item => {
          cleanText = cleanText.replace(item.pattern, item.replace);
        });

        paperSheet.textContent = cleanText;
        humanizeBtn.innerHTML = `RESET TO RAW AI SAMPLE ${REFRESH_SVG}`;
        currentSimState = "CLEAN";

      } else if (currentSimState === "CLEAN") {
        // --- TRANSITION: CLEAN -> RAW (Cycle back for another demo) ---
        resetToRaw(cachedRawText, 96);
      }
    });
  }

  // Copy Clean Text to Clipboard
  if (copyBtn && paperSheet) {
    copyBtn.addEventListener("click", () => {
      let textToCopy = "";
      if (currentSimState === "MARKED") {
        // Extract text excluding the red crossed-out AI spans
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = paperSheet.innerHTML;
        const crossed = tempDiv.querySelectorAll(".ai-crossed");
        crossed.forEach(el => el.remove());
        textToCopy = tempDiv.textContent.replace(/\s+/g, " ").trim();
      } else if (currentSimState === "CLEAN") {
        textToCopy = paperSheet.textContent.trim();
      } else {
        // If raw, humanize first before copying
        let cleanText = cachedRawText || paperSheet.textContent.trim();
        replacements.forEach(item => {
          cleanText = cleanText.replace(item.pattern, item.replace);
        });
        textToCopy = cleanText;
      }

      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalHtml = copyBtn.innerHTML;
        copyBtn.innerHTML = `Copied Clean Text! ${CHECK_SVG}`;
        setTimeout(() => {
          copyBtn.innerHTML = originalHtml;
        }, 2000);
      }).catch(err => {
        console.error("Clipboard copy error:", err);
      });
    });
  }
});
