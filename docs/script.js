/**
 * TURNITOUT: Interactive Xerox Notebook & AI Pattern Evader Simulator
 * Real-time pattern disruption, handwritten margin markup, and theme toggling.
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

  // Load sample texts
  if (sampleAcademicBtn && paperSheet) {
    sampleAcademicBtn.addEventListener("click", () => {
      resetNotebook(SAMPLE_ACADEMIC, 96);
    });
  }

  if (sampleEssayBtn && paperSheet) {
    sampleEssayBtn.addEventListener("click", () => {
      resetNotebook(SAMPLE_ESSAY, 98);
    });
  }

  function resetNotebook(text, initialScore) {
    paperSheet.textContent = text;
    meterFill.style.width = `${initialScore}%`;
    meterFill.style.backgroundColor = "var(--red-pen)";
    meterScore.textContent = `${initialScore}%`;
    meterScore.style.color = "var(--red-pen)";
    if (statusStamp) {
      statusStamp.style.display = "none";
    }
  }

  // AI Cliché dictionary for live demo replacement
  const replacements = [
    { pattern: /In conclusion,?/gi, replace: "To wrap up," },
    { pattern: /it is important to delve into/gi, replace: "we look closely at" },
    { pattern: /comprehensive tapestry/gi, replace: "broad range" },
    { pattern: /plays a pivotal role in illustrating/gi, replace: "clearly shows" },
    { pattern: /stands as a testament to/gi, replace: "reflects" },
    { pattern: /Furthermore, the interplay between/gi, replace: "Also, balancing" },
    { pattern: /provides a robust framework/gi, replace: "gives a solid basis" },
    { pattern: /Moreover, in today's fast-paced digital era,/gi, replace: "Today," },
    { pattern: /serves as a critical milestone/gi, replace: "is a major turning point" },
    { pattern: /cannot be overlooked/gi, replace: "we must address" },
    { pattern: /delve deep into the multifaceted dimensions of/gi, replace: "examine the details of" },
    { pattern: /Ultimately, this paradigm shift/gi, replace: "In the end, this shift" }
  ];

  if (humanizeBtn && paperSheet) {
    humanizeBtn.addEventListener("click", () => {
      let rawText = paperSheet.textContent.trim();
      if (!rawText) {
        alert("Please paste some text or click one of the sample buttons first!");
        return;
      }

      humanizeBtn.disabled = true;
      humanizeBtn.textContent = "Marking Up Patterns...";

      // Animate: mark up text with strikethroughs & handwritten margins
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
        // Fallback generic split & rewrite for custom input
        const sentences = rawText.split(/(?<=[.?!])\s+/);
        markedHtml = sentences.map((s, idx) => {
          if (idx % 2 === 0 && s.length > 25) {
            return `<span class="ai-crossed">${s.substring(0, Math.floor(s.length / 2))}</span> <span class="human-replacement">rephrased authentically</span> ${s.substring(Math.floor(s.length / 2))}`;
          }
          return s;
        }).join(" ");
      }

      paperSheet.innerHTML = markedHtml;

      // Drop AI detection score meter
      setTimeout(() => {
        meterFill.style.width = "4%";
        meterFill.style.backgroundColor = "#2E7D32"; // calm green
        meterScore.textContent = "4%";
        meterScore.style.color = "#2E7D32";

        // Display "HUMANIZED" Stamp with physical slam effect
        if (statusStamp) {
          statusStamp.style.display = "inline-block";
          statusStamp.classList.add("stamp-slam");
        }

        humanizeBtn.disabled = false;
        humanizeBtn.textContent = "HUMANIZE THIS PAPER →";
      }, 450);
    });
  }

  // Copy to clipboard
  if (copyBtn && paperSheet) {
    copyBtn.addEventListener("click", () => {
      // Extract text content excluding crossed-out text
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = paperSheet.innerHTML;
      
      const crossed = tempDiv.querySelectorAll(".ai-crossed");
      crossed.forEach(el => el.remove());

      const cleanText = tempDiv.textContent.replace(/\s+/g, " ").trim();
      navigator.clipboard.writeText(cleanText).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "Copied to Clipboard! ✓";
        setTimeout(() => {
          copyBtn.textContent = originalText;
        }, 2000);
      }).catch(err => {
        console.error("Clipboard copy error:", err);
      });
    });
  }
});
