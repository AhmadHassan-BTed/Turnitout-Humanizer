/**
 * TURNITOUT: Spatial Academic Desk Engine
 * Infinite Pan & Zoom Canvas, Radial Ray Dial Generator, and Interactive Vitals
 * Inspired by Architectural Skeuomorphic Desk Photography
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 1. Spatial Infinite Canvas Engine (Pan & Zoom)
  // ==========================================================================
  const viewport = document.getElementById("deskViewport");
  const world = document.getElementById("deskWorld");
  const zoomDisplay = document.getElementById("zoomDisplay");
  const zoomInBtn = document.getElementById("zoomInBtn");
  const zoomOutBtn = document.getElementById("zoomOutBtn");
  const resetViewBtn = document.getElementById("resetViewBtn");
  const toastHint = document.getElementById("spatialToastHint");

  const focusVitalsBtn = document.getElementById("focusVitalsBtn");
  const focusThesisBtn = document.getElementById("focusThesisBtn");
  const focusDeskBtn = document.getElementById("focusDeskBtn");

  const mainPrintedSheet = document.getElementById("mainPrintedSheet");
  const adjacentThesisSheet = document.getElementById("adjacentThesisSheet");

  let scale = 0.85;
  let panX = 0;
  let panY = 0;

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let velocityX = 0;
  let velocityY = 0;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let animFrameId = null;

  // Center on main printed sheet initially
  function initialCenter() {
    const vWidth = window.innerWidth;
    const vHeight = window.innerHeight;
    
    // Choose initial scale based on window size
    if (vWidth < 900) {
      scale = 0.48;
    } else if (vWidth < 1400) {
      scale = 0.72;
    } else {
      scale = 0.88;
    }

    // Target center of main sheet: left 920 + 1560/2 = 1700, top 520 + 720/2 = 880
    const targetCenterX = 1700;
    const targetCenterY = 920;

    panX = (vWidth / 2) - (targetCenterX * scale);
    panY = (vHeight / 2) - (targetCenterY * scale);

    updateTransform(false);
  }

  function updateTransform(animate = false) {
    if (animate) {
      world.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)";
    } else {
      world.style.transition = "none";
    }
    world.style.transform = `translate3d(${panX}px, ${panY}px, 0) scale(${scale})`;
    if (zoomDisplay) {
      zoomDisplay.textContent = `${Math.round(scale * 100)}%`;
    }
  }

  // Smooth Camera Glide to Specific Coordinate
  function glideTo(targetX, targetY, targetScale) {
    const vWidth = window.innerWidth;
    const vHeight = window.innerHeight;

    scale = targetScale;
    panX = (vWidth / 2) - (targetX * scale);
    panY = (vHeight / 2) - (targetY * scale);

    updateTransform(true);
    setTimeout(() => {
      world.style.transition = "none";
    }, 450);
  }

  // Mouse Pan Handlers
  if (viewport) {
    viewport.addEventListener("mousedown", (e) => {
      // Don't drag if clicking buttons, inputs, contenteditable, or checkboxes
      if (e.target.closest("button, a, input, [contenteditable='true'], .planner-task-row, .toggle-segment-btn")) {
        return;
      }
      isDragging = true;
      viewport.classList.add("is-dragging");
      startX = e.clientX - panX;
      startY = e.clientY - panY;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      velocityX = 0;
      velocityY = 0;
      cancelAnimationFrame(animFrameId);
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      panX = e.clientX - startX;
      panY = e.clientY - startY;

      velocityX = e.clientX - lastMouseX;
      velocityY = e.clientY - lastMouseY;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;

      updateTransform(false);
    });

    window.addEventListener("mouseup", () => {
      if (!isDragging) return;
      isDragging = false;
      viewport.classList.remove("is-dragging");

      // Inertia / momentum on release
      function applyInertia() {
        if (Math.abs(velocityX) > 0.3 || Math.abs(velocityY) > 0.3) {
          panX += velocityX;
          panY += velocityY;
          velocityX *= 0.91;
          velocityY *= 0.91;
          updateTransform(false);
          animFrameId = requestAnimationFrame(applyInertia);
        }
      }
      applyInertia();
    });

    // Mouse Wheel Zoom Centered at Cursor
    viewport.addEventListener("wheel", (e) => {
      e.preventDefault();
      const zoomFactor = -e.deltaY * 0.0012;
      const newScale = Math.min(Math.max(scale + zoomFactor, 0.38), 1.6);

      if (newScale === scale) return;

      const rect = viewport.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      panX = mouseX - (mouseX - panX) * (newScale / scale);
      panY = mouseY - (mouseY - panY) * (newScale / scale);
      scale = newScale;

      updateTransform(false);

      if (toastHint) {
        toastHint.style.opacity = "0";
      }
    }, { passive: false });

    // Touch Support for Mobile / Tablets
    let initialTouchDist = 0;
    let initialTouchScale = 0;

    viewport.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        if (e.target.closest("button, a, input, [contenteditable='true'], .planner-task-row")) return;
        isDragging = true;
        startX = e.touches[0].clientX - panX;
        startY = e.touches[0].clientY - panY;
      } else if (e.touches.length === 2) {
        isDragging = false;
        initialTouchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        initialTouchScale = scale;
      }
    }, { passive: true });

    viewport.addEventListener("touchmove", (e) => {
      if (e.touches.length === 1 && isDragging) {
        panX = e.touches[0].clientX - startX;
        panY = e.touches[0].clientY - startY;
        updateTransform(false);
      } else if (e.touches.length === 2) {
        const currentDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const touchFactor = currentDist / initialTouchDist;
        scale = Math.min(Math.max(initialTouchScale * touchFactor, 0.38), 1.6);
        updateTransform(false);
      }
    }, { passive: true });

    viewport.addEventListener("touchend", () => {
      isDragging = false;
    });
  }

  // Zoom Button Controls
  if (zoomInBtn) {
    zoomInBtn.addEventListener("click", () => {
      scale = Math.min(scale + 0.15, 1.6);
      updateTransform(true);
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener("click", () => {
      scale = Math.max(scale - 0.15, 0.38);
      updateTransform(true);
    });
  }

  if (resetViewBtn) {
    resetViewBtn.addEventListener("click", () => {
      initialCenter();
    });
  }

  // Quick Focus Bookmark Buttons
  if (focusVitalsBtn) {
    focusVitalsBtn.addEventListener("click", () => {
      document.querySelectorAll(".spatial-jump-btn").forEach(b => b.classList.remove("active"));
      focusVitalsBtn.classList.add("active");
      glideTo(1700, 920, 0.88);
    });
  }

  if (focusThesisBtn) {
    focusThesisBtn.addEventListener("click", () => {
      document.querySelectorAll(".spatial-jump-btn").forEach(b => b.classList.remove("active"));
      focusThesisBtn.classList.add("active");
      glideTo(270, 920, 0.95);
    });
  }

  if (focusDeskBtn) {
    focusDeskBtn.addEventListener("click", () => {
      document.querySelectorAll(".spatial-jump-btn").forEach(b => b.classList.remove("active"));
      focusDeskBtn.classList.add("active");
      glideTo(1350, 950, 0.52);
    });
  }

  // ==========================================================================
  // 2. Radial Ray Dial Generator (The Big Radial Gauge from Reference Photo)
  // ==========================================================================
  const radialRayDialSvg = document.getElementById("radialRayDialSvg");
  const TOTAL_RAYS = 64;
  const rayElements = [];

  if (radialRayDialSvg) {
    const center = 125;
    const rInner = 82;
    const rOuter = 118;

    for (let i = 0; i < TOTAL_RAYS; i++) {
      const angleDeg = (i * 360) / TOTAL_RAYS;
      const angleRad = (angleDeg * Math.PI) / 180;

      const x1 = center + rInner * Math.cos(angleRad);
      const y1 = center + rInner * Math.sin(angleRad);
      const x2 = center + rOuter * Math.cos(angleRad);
      const y2 = center + rOuter * Math.sin(angleRad);

      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", x1);
      line.setAttribute("y1", y1);
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
      line.setAttribute("class", "dial-ray-tick");

      // Initially color first 58 rays active/flagged
      if (i < 58) {
        line.classList.add("active-safe");
      }

      radialRayDialSvg.appendChild(line);
      rayElements.push(line);
    }
  }

  // Animate the Radial Ray Dial
  function setDialRiskScore(scorePercent) {
    const dialScoreNum = document.getElementById("dialScoreNum");
    const dialScoreLabel = document.getElementById("dialScoreLabel");

    if (dialScoreNum) {
      dialScoreNum.textContent = `${scorePercent}%`;
      if (scorePercent <= 10) {
        dialScoreNum.style.color = "var(--ink-green-safe)";
        if (dialScoreLabel) dialScoreLabel.textContent = "Safe Non-AI";
      } else {
        dialScoreNum.style.color = "var(--ink-primary)";
        if (dialScoreLabel) dialScoreLabel.textContent = "Detection Risk";
      }
    }

    const activeCount = Math.round((scorePercent / 100) * TOTAL_RAYS);
    rayElements.forEach((ray, idx) => {
      if (scorePercent <= 10) {
        if (idx < 6) {
          ray.setAttribute("class", "dial-ray-tick active-safe");
          ray.style.stroke = "var(--ink-green-safe)";
        } else {
          ray.setAttribute("class", "dial-ray-tick");
          ray.style.stroke = "rgba(20, 20, 24, 0.15)";
        }
      } else {
        if (idx < activeCount) {
          ray.setAttribute("class", "dial-ray-tick active-safe");
          ray.style.stroke = "var(--ink-primary)";
        } else {
          ray.setAttribute("class", "dial-ray-tick");
          ray.style.stroke = "rgba(20, 20, 24, 0.15)";
        }
      }
    });
  }

  // ==========================================================================
  // 3. Horizontal Segmented Battery / Pill Bar Generator (From Reference Photo)
  // ==========================================================================
  const segmentedBatteryBar = document.getElementById("segmentedBatteryBar");
  const TOTAL_PILLS = 22;
  const batteryPillElements = [];

  if (segmentedBatteryBar) {
    for (let i = 0; i < TOTAL_PILLS; i++) {
      const pill = document.createElement("div");
      pill.className = "battery-pill";
      if (i < 18) {
        pill.classList.add("filled");
      }
      segmentedBatteryBar.appendChild(pill);
      batteryPillElements.push(pill);
    }
  }

  function setBatteryFill(percent) {
    const filledCount = Math.round((percent / 100) * TOTAL_PILLS);
    batteryPillElements.forEach((p, idx) => {
      if (idx < filledCount) {
        p.classList.add("filled");
      } else {
        p.classList.remove("filled");
      }
    });
    const batteryPercentText = document.getElementById("batteryPercentText");
    if (batteryPercentText) {
      batteryPercentText.textContent = `${percent}%`;
    }
  }

  // ==========================================================================
  // 4. Interactive In-Place Humanizer Simulator
  // ==========================================================================
  const SAMPLE_ACADEMIC = 
`In conclusion, it is important to delve into the comprehensive tapestry of modern neural networks. This study plays a pivotal role in illustrating that artificial intelligence stands as a testament to human innovation. Furthermore, the interplay between stochastic optimization and computational scalability provides a robust framework for subsequent empirical inquiries.`;

  const SAMPLE_ESSAY = 
`Moreover, in today's fast-paced digital era, climate change serves as a critical milestone that cannot be overlooked. It is crucial to delve deep into the multifaceted dimensions of environmental sustainability. Ultimately, this paradigm shift plays a pivotal role in reshaping societal perspectives.`;

  const paperSheet = document.getElementById("paperSheet");
  const executeHumanizeBtn = document.getElementById("executeHumanizeBtn");
  const dialActionArrow = document.getElementById("dialActionArrow");
  const dialMotivationText = document.getElementById("dialMotivationText");
  const sampleAcademicTab = document.getElementById("sampleAcademicTab");
  const sampleEssayTab = document.getElementById("sampleEssayTab");
  const sampleResetTab = document.getElementById("sampleResetTab");
  const interactiveWordCount = document.getElementById("interactiveWordCount");

  let isHumanized = false;

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

  function updateWordCount() {
    if (!paperSheet || !interactiveWordCount) return;
    const words = paperSheet.textContent.trim().split(/\s+/).filter(Boolean);
    interactiveWordCount.textContent = `${words.length} words`;
  }

  function resetToRaw(text) {
    if (!paperSheet) return;
    isHumanized = false;
    paperSheet.textContent = text;
    setDialRiskScore(96);
    setBatteryFill(85);
    updateWordCount();

    if (dialMotivationText) {
      dialMotivationText.textContent = 
        `"Raw text exhibits unvaried n-gram perplexity and high detector probability. Click 'DISRUPT AI PATTERNS' to execute deterministic rule replacement."`;
    }
    if (executeHumanizeBtn) {
      executeHumanizeBtn.innerHTML = `<span>DISRUPT AI PATTERNS</span> <svg class="icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`;
    }
  }

  function executeDisruption() {
    if (!paperSheet) return;
    if (isHumanized) {
      // Toggle back to raw
      resetToRaw(paperSheet.textContent.trim());
      return;
    }

    let rawText = paperSheet.textContent.trim();
    let markedHtml = rawText;

    replacements.forEach(item => {
      if (item.pattern.test(markedHtml)) {
        markedHtml = markedHtml.replace(item.pattern, (match) => {
          return `<span class="ai-crossed">${match}</span><span class="human-replacement">${item.replace}</span>`;
        });
      }
    });

    paperSheet.innerHTML = markedHtml;
    isHumanized = true;

    // Smoothly drop the radial ray dial from 96% down to 4%
    let cur = 96;
    const timer = setInterval(() => {
      cur -= 4;
      if (cur <= 4) {
        cur = 4;
        clearInterval(timer);
      }
      setDialRiskScore(cur);
    }, 25);

    setBatteryFill(100);

    if (dialMotivationText) {
      dialMotivationText.textContent = 
        `"BRING IT ON: A zero-generative-AI pass has dismantled predictable 3-gram contiguous sequences. Turnitin, GPTZero, and CopyLeaks statistical classifiers neutralized (4% Risk)."`;
    }

    if (executeHumanizeBtn) {
      executeHumanizeBtn.innerHTML = `<span>RESOLVED TO NON-AI (4%)</span> <svg class="icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    }
  }

  if (executeHumanizeBtn) {
    executeHumanizeBtn.addEventListener("click", executeDisruption);
  }
  if (dialActionArrow) {
    dialActionArrow.addEventListener("click", executeDisruption);
  }

  if (sampleAcademicTab) {
    sampleAcademicTab.addEventListener("click", () => {
      document.querySelectorAll(".toggle-segment-btn").forEach(b => b.classList.remove("active"));
      sampleAcademicTab.classList.add("active");
      resetToRaw(SAMPLE_ACADEMIC);
    });
  }

  if (sampleEssayTab) {
    sampleEssayTab.addEventListener("click", () => {
      document.querySelectorAll(".toggle-segment-btn").forEach(b => b.classList.remove("active"));
      sampleEssayTab.classList.add("active");
      resetToRaw(SAMPLE_ESSAY);
    });
  }

  if (sampleResetTab) {
    sampleResetTab.addEventListener("click", () => {
      resetToRaw(SAMPLE_ACADEMIC);
    });
  }

  // ==========================================================================
  // 5. Interactive Sprints Task Checklist (Handwritten Ink Strikethrough)
  // ==========================================================================
  const taskRows = document.querySelectorAll(".planner-task-row");
  taskRows.forEach(row => {
    row.addEventListener("click", () => {
      row.classList.toggle("is-done");
    });
  });

  // ==========================================================================
  // 6. Initialize Canvas Layout
  // ==========================================================================
  window.addEventListener("resize", () => {
    // Keep scale intact on resize
    updateTransform(false);
  });

  // Initialize
  initialCenter();
  updateWordCount();

  // Dismiss toast after 7 seconds
  setTimeout(() => {
    if (toastHint) {
      toastHint.style.opacity = "0";
      setTimeout(() => toastHint.remove(), 600);
    }
  }, 7000);
});
