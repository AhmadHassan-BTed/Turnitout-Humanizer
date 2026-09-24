/**
 * TURNITOUT: Interactive Xerox Notebook & AI Pattern Evader Simulator
 * Real-time pattern disruption, handwritten margin markup, state machine, and theme toggling.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle: 3 AM Study Session (Dark) vs Xerox Aged Paper (Light)
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const currentTheme = localStorage.getItem("turnitout_theme") || "light";

  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggleBtn) themeToggleBtn.innerHTML = "☀️ Study Session: 3 AM (Dark)";
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("turnitout_theme", isDark ? "dark" : "light");
      themeToggleBtn.innerHTML = isDark ? "☀️ Study Session: 3 AM (Dark)" : "🌙 Study Session: 3 AM (Dark)";
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
          const sentences = rawText.split(/(?<=[.?!])\s+/);
          markedHtml = sentences.map((s, idx) => {
            if (idx % 2 === 0 && s.length > 25) {
              return `<span class="ai-crossed">${s.substring(0, Math.floor(s.length / 2))}</span> <span class="human-replacement">rephrased authentically</span> ${s.substring(Math.floor(s.length / 2))}`;
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
          humanizeBtn.textContent = "RESOLVE TO CLEAN TEXT ✓";
          currentSimState = "MARKED";
        }, 400);

      } else if (currentSimState === "MARKED") {
        // --- TRANSITION: MARKED -> CLEAN (Clean Final Paper Without Strikethroughs) ---
        let cleanText = cachedRawText;
        replacements.forEach(item => {
          cleanText = cleanText.replace(item.pattern, item.replace);
        });

        paperSheet.textContent = cleanText;
        humanizeBtn.textContent = "RESET TO RAW AI SAMPLE 🔄";
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
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "Copied Clean Text! ✓";
        setTimeout(() => {
          copyBtn.textContent = originalText;
        }, 2000);
      }).catch(err => {
        console.error("Clipboard copy error:", err);
      });
    });
  }
});
