<p align="center">
  <img src="docs/assets/logo-banner.svg" alt="Turnitout Logo" width="100%"/>
</p>

<h1 align="center">Turnitout — Plagiarism & AI Detector Evasion Engine</h1>

<p align="center">
  <a href="https://turnitout.streamlit.app/"><img src="https://img.shields.io/badge/Deployment-Live%20Hosted%20App-blue.svg" alt="Deployment: Live Hosted App"/></a>
  <img src="https://img.shields.io/badge/Version-v1.6.0-green.svg" alt="Version: v1.6.0"/>
  <img src="https://img.shields.io/badge/Python-3.9%2B-brightgreen.svg" alt="Python 3.9+"/>
  <a href="https://github.com/AhmadHassan-BTed/Turnitout-Humanizer/issues"><img src="https://img.shields.io/badge/Community-GitHub%20Issues-orange.svg" alt="GitHub Issues"/></a>
  <img src="https://img.shields.io/badge/Privacy-100%25%20Local-purple.svg" alt="Privacy: 100% Local"/>
</p>

<p align="center">
  <strong>The ultimate programmatic, zero-AI plagiarism and AI-detection removal suite. Engineered for research papers, LaTeX documents, Word files, and technical manuscripts with hierarchical academic discipline taxonomy, multi-format batch document processing, and automatic BibTeX / JSON / LaTeX reference generation.</strong>
</p>

---

## 💡 Why Turnitout?

Academic and technical writing is a personal, human craft. Under the rigid rules of automated similarity checkers (**Turnitin**, **iThenticate**) and AI pattern detectors (**GPTZero**, **Turnitin AI**, **CopyLeaks**, **ZeroGPT**), researchers and students are often forced to rewrite their natural voice or destroy complex document layouts simply to clear string-matching thresholds.

Other commercial tools use generative AI to rewrite text — which ironically leaves **new AI footprints, hallucinated facts, and compromises document privacy**. 

**Turnitout does NOT use AI to eliminate AI.** It is **100% programmatic, rule-based, and deterministic**, mathematically disrupting contiguous n-gram word sequences while leaving equations, matrices, figures, formatting macros, and citation indexes completely untouched.

---

## 🚀 Core Capabilities & Highlights

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                   TURNITOUT CORE SUITE                                 │
├───────────────────────────────┬───────────────────────────────┬─────────────────────────┤
│  ⚡ Plagiarism & AI Remover   │  📜 Citation & Reference Gen  │  📦 Multi-Format Batch  │
│  - Zero Generative AI         │  - IEEE [1] & APA (Author)    │  - .docx / .tex / .txt  │
│  - XML Paragraph Formatting   │  - BibTeX (.bib) Exporter     │  - .md / .py Code Files │
│  - BERT / LLM Pattern Evader  │  - LaTeX (\cite{key}) Package │  - Branded ZIP Packages │
└───────────────────────────────┴───────────────────────────────┴─────────────────────────┘
```

### 1. ⚡ Plagiarism & AI Remover (Humanizer)
- **Multi-Format In-Place Processing**: Humanizes `.docx`, `.tex`, `.txt`, `.md`, and `.py` documents in-place while keeping XML styling, font colors, bold/italic runs, tables, headers, and footers intact.
- **Section-Aware Protection**: Abstract, Introduction, Conclusion, Title, Declarations, and Appendices are humanized, while code blocks and math environments are strictly protected.
- **BERT & LLM Pattern Evader**: Automatically neutralizes AI signature triggers (`"delve into"`, `"plays a pivotal role"`, `"provides a robust framework"`, `"the interplay between"`) and cleans em-dashes (`—`).

### 2. 📜 Citation Inserter & BIB / JSON / LaTeX Generator
- **Multi-Format Reference Export**: Inserts contextual citations into document sentences and exports matching **BibTeX (`citations.bib`)**, **LaTeX (`\cite{key}`)**, and **Structured JSON (`citations.json`)** reference packages.
- **Unified Citation Count Field**: Combobox supporting contextual auto-detection (`Auto`) or clean numeric entry (`3`, `5`, `10`, `20`, `50`, or custom numbers).
- **100% Dynamic Discipline Taxonomy**: Real-time rule taxonomy traversing subfolder rules (`rules/academic/taxonomy/*`) covering:
  - 💻 `Computer Science & AI` (Artificial Intelligence, Cybersecurity, Systems)
  - ⚙️ `Engineering & Physics` (Fluid Dynamics, Heat Transfer, Signal Processing)
  - 📐 `Mathematics & Statistics` (Differential Equations, Numerical Analysis)
  - 📈 `Quantitative Finance & Economics` (Option Pricing, Risk Modeling)
  - 🧬 `Medical & Life Sciences` (Bioinformatics, Genomics)

### 3. 📦 Multi-File Branded ZIP Packaging
- **Stateless In-Memory Bundling**: Automatically packages processed documents, cited files, and reference bibliographies into branded ZIP download archives:
  - `Turnitout_Humanized_Docs_<YYYYMMDD_HHMMSS>.zip`
  - `Turnitout_Citations_<YYYYMMDD_HHMMSS>.zip`

### 4. 🔍 AI Pattern & Signature Checker
- **ZipPy Compression Perplexity Engine**: Combines `zlib`/`lzma` dictionary entropy signals alongside phrase matching, burstiness variance, and discourse markers for 100% local, ultra-fast AI detection.
- **Side-by-Side Dashboard**: Similarity scores, AI probability meters, and passage highlight marks.

### 5. 💬 Feature Request & Discipline Addition Hub
- **Dedicated Navigation Page**: Request new academic disciplines, report bugs, or suggest features directly inside the application.
- **Pre-Filled GitHub Issue Templates**: Integrates with [GitHub Issues](https://github.com/AhmadHassan-BTed/Turnitout-Humanizer/issues/new) for transparent community tracking.

---

## ⚡ Quick Start & Deployment Options

### 🌐 Live Web Interface (Recommended)
Access the live interactive application at **[turnitout.streamlit.app](https://turnitout.streamlit.app/)**

### 💻 Local Installation
```bash
git clone https://github.com/AhmadHassan-BTed/Turnitout-core.git
cd Turnitout-core
pip install -r requirements.txt
streamlit run streamlit_app.py
```

---

## 🤝 Support & Community

- 💬 **Instant Developer Chat**: [Chat on WhatsApp (+92 322 5522383)](https://wa.me/923225522383)
- 🐛 **Issue Tracker**: [Submit a Feature Request or Bug Report](https://github.com/AhmadHassan-BTed/Turnitout-Humanizer/issues/new)
- ⭐️ **Support the Project**: Star and follow our public GitHub repositories!

---

## 🛠️ Architecture & Codebase Map

```
Turnitout-core/
├── rules/
│   ├── academic/
│   │   ├── taxonomy/                     # Hierarchical Discipline Rules
│   │   │   ├── computer_science/         # AI, Cybersecurity, Systems
│   │   │   ├── engineering_physics/      # Fluid Dynamics, Transport
│   │   │   ├── mathematics_statistics/   # PDEs, Numerical Analysis
│   │   │   ├── quantitative_finance/     # Option Pricing, Risk
│   │   │   └── medical_life_sciences/    # Bioinformatics, Genomics
│   │   ├── general_academic_topics.json
│   │   ├── phrases.json
│   │   └── synonyms.json
│   └── global_config.json
├── src/turnitout/
│   ├── core/
│   │   ├── citation_engine.py            # Decoupled Rules-Driven Citation Engine
│   │   ├── doc_processor.py              # In-Place DOCX Stream & ZIP Generator
│   │   ├── modifier.py                   # Rule Transformer Coordinator
│   │   ├── rules.py                      # Recursive Rules & Taxonomy Loader
│   │   └── transformers/                 # AI & Similarity Evader Transformers
│   ├── ui/
│   │   ├── citation_ui.py                # Citation & BIB/JSON/LaTeX UI Page
│   │   ├── feedback_ui.py                # Dedicated Feature & Bug Reporter Page
│   │   ├── humanizer_ui.py               # Plagiarism & AI Remover UI Page
│   │   ├── checker_ui.py                 # Multi-Pass Checker UI Page
│   │   └── common.py                     # Global Styling & Banner Headers
│   └── ai_detector.py                    # ZipPy Entropy & Signature Detector
├── tests/                                # Comprehensive Pytest Test Suite
│   ├── test_academic_taxonomy.py
│   ├── test_citation_engine.py
│   ├── test_doc_processor.py
│   ├── test_modifier.py
│   └── test_rules.py
└── streamlit_app.py                      # Multi-Page Navigation Entrypoint
```

---

## 🧪 Testing & Verification

Run the complete automated unit test suite:
```bash
PYTHONPATH=src python3 -m pytest -v tests/
```

---

## 🤝 Community, Support & Feature Requests

- **GitHub Issues**: Submit feature requests, bug reports, or request new academic discipline fields at **[Turnitout Issues](https://github.com/AhmadHassan-BTed/Turnitout-Humanizer/issues/new)**.
- **WhatsApp Support**: Chat directly with developer **Ahmad Hassan** at **[+92 322 5522383](https://wa.me/923225522383)**.
- **Email Contact**: For full humanizing services or enterprise inquiries, email **[ahmadhassan.bted@gmail.com](mailto:ahmadhassan.bted@gmail.com)**.
