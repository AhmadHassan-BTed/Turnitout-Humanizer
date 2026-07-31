# Getting Started Guide: Turnitout Core

This guide outlines how to use the Turnitout application to process single and batch documents, insert academic citations, export BibTeX / JSON / LaTeX reference packages, and submit feature requests.

---

## Accessing the Application

Access Turnitout instantly at:
**[https://turnitout.streamlit.app/](https://turnitout.streamlit.app/)**

Or run locally:
```bash
streamlit run streamlit_app.py
```

---

## Navigation & Page Breakdown

### 1. ⚡ Plagiarism & AI Remover (Humanizer)
- **Single & Multi-File Upload**: Upload one or multiple `.docx` Word files.
- **In-Place Formatting Preservation**: Processes text runs while leaving images, tables, headers, footers, and XML typography 100% intact.
- **Branded ZIP Bundles**: Download processed files as an in-memory ZIP package (`Turnitout_Humanized_Docs_<TIMESTAMP>.zip`).

### 2. 📜 Citation Inserter & BIB / JSON / LaTeX Generator
- **Unified Citation Count Field**: Pre-filled with `Auto` for contextual density, or enter a number (e.g. `5`) for exact citation count.
- **Hierarchical Field of Study Dropdown**: Select your discipline (`Computer Science & AI`, `Engineering & Physics`, `Mathematics & Statistics`, `Quantitative Finance`, `Medical & Life Sciences`) or leave on `Auto-Detect Field`.
- **Multi-Format Bibliography Export**: Downloads cited text, BibTeX (`citations.bib`), LaTeX (`\cite{key}`), and structured JSON (`citations.json`).

### 3. 🔍 AI Pattern & Signature Checker
- **ZipPy Perplexity Engine**: Evaluates text entropy signals and shows side-by-side QuillBot-style similarity stats.

### 4. 💬 Feature Request & Bug Reporter Hub
- **In-App Form (Bypasses Unlock Gate)**: Accessible at any time, even before unlocking. Submit feature requests, bug reports, or request new academic discipline fields with direct GitHub Issues templates.
