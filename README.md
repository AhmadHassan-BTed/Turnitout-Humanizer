<p align="center">
  <img src="docs/assets/logo-banner.svg" alt="Turnitout Logo" width="100%"/>
</p>

<h1 align="center">Turnitout Core</h1>

<p align="center">
  <a href="https://turnitout.streamlit.app/"><img src="https://img.shields.io/badge/Deployment-Hosted%20App-blue.svg" alt="Deployment: Hosted App"/></a>
  <img src="https://img.shields.io/badge/Version-v1.6.0-green.svg" alt="Version: v1.6.0"/>
  <img src="https://img.shields.io/badge/Python-3.9%2B-brightgreen.svg" alt="Python 3.9+"/>
  <a href="https://github.com/AhmadHassan-BTed/Turnitout-Humanizer/issues"><img src="https://img.shields.io/badge/Community-GitHub%20Issues-orange.svg" alt="GitHub Issues"/></a>
</p>

<p align="center">
  <strong>An intelligent LaTeX & Word document plagiarism, similarity, and AI-detection removal engine with hierarchical academic discipline taxonomy, multi-file batch processing, and automatic BibTeX / JSON / LaTeX reference generation.</strong>
</p>

---

## 💡 The Philosophy

Academic and technical writing is a personal, human craft. Under the rigid rules of automated similarity checkers (like **Turnitin**) and AI pattern detectors (like **GPTZero**, **Turnitin AI**, and **CopyLeaks**), researchers and students are often forced to rewrite their natural voice or break document layouts simply to clear string-matching thresholds.

Other tools use generative AI to rewrite text (which ironically leaves new AI footprints and compromises your privacy). **Turnitout does NOT use AI to eliminate AI.** It is **100% programmatic and deterministic**, mathematically disrupting contiguous word sequences while leaving equations, matrices, figures, formatting macros, and citation indexes completely untouched.

---

## 🚀 Key Modules & Capabilities

### 1. ⚡ Plagiarism & AI Remover (Humanizer)
- **Multi-File & Single-File Word (.docx) Processing**: Humanizes `.docx` files paragraph-by-paragraph in-place, preserving all images, tables, headers, footers, and XML typography intact.
- **Section-Aware Protection**: Abstract, Introduction, Conclusion, Title, Declarations, and Appendices are 100% humanized, but shielded from citation insertions.
- **BERT & LLM Pattern Evader**: Automatically neutralizes AI signature triggers (`"delve into"`, `"plays a pivotal role"`, `"provides a robust framework"`, `"the interplay between"`) and cleans em-dashes (`—`).

### 2. 📜 Citation Inserter & BIB / JSON / LaTeX Generator
- **Multi-Format Export**: Inserts contextual citations into text and exports matching **BibTeX (`citations.bib`)**, **LaTeX (`\cite{key}`)**, and **Structured JSON (`citations.json`)** reference packages.
- **Contextual & Manual Controls**: Single unified **Citation Count** field supports contextual auto-detection (`Auto`) or exact user-specified counts (e.g. `5`).
- **Hierarchical Discipline Taxonomy**: Matches research claim sentences against a categorized subfolder taxonomy (`rules/academic/taxonomy/*`) spanning:
  - `computer_science/` (Artificial Intelligence, Cybersecurity, Systems)
  - `engineering_physics/` (Fluid Dynamics, Heat Transfer, Signal Processing)
  - `mathematics_statistics/` (Differential Equations, Numerical Analysis)
  - `quantitative_finance/` (Option Pricing, Risk Modeling)
  - `medical_life_sciences/` (Bioinformatics, Genomics)

### 3. 📦 Multi-File Branded ZIP Packaging
- **Stateless In-Memory Bundling**: Automatically packages multiple processed files, cited documents, and reference bibliographies into branded ZIP archives:
  - `Turnitout_Humanized_Docs_<YYYYMMDD_HHMMSS>.zip`
  - `Turnitout_Citations_<YYYYMMDD_HHMMSS>.zip`
  - `Turnitout_Checker_Reports_<YYYYMMDD_HHMMSS>.zip`

### 4. 🔍 AI Pattern & Signature Checker
- **ZipPy Compression Perplexity Engine**: Combines native `zlib`/`lzma` dictionary entropy signals alongside phrase matching, burstiness variance, and discourse markers for 100% local, ultra-fast AI detection.
- **QuillBot-Style Stats Dashboard**: Side-by-side similarity scores and highlighted text passage marks.

### 5. 💬 In-App Feature Request & Bug Reporter Hub
- **Dedicated Navigation Page**: Users can submit feature requests, bug reports, or suggest new academic discipline fields directly inside the app without needing to navigate away.
- **Pre-Filled GitHub Issue Templates**: Integrates with [GitHub Issues](https://github.com/AhmadHassan-BTed/Turnitout-Humanizer/issues/new) for community feature tracking.

---

## ⚡ Quick Start & Deployment Options

### 🌐 Option A: Streamlit Web Interface (Recommended)
- **Hosted Live App**: Access instantly at **[turnitout.streamlit.app](https://turnitout.streamlit.app/)**
- **Local Run**:
  ```bash
  streamlit run streamlit_app.py
  ```

### 🖥️ Option B: Tkinter Desktop GUI
- **Windows / macOS / Linux**:
  ```bash
  python src/turnitout/ui_launcher.py
  ```

### 💻 Option C: CLI / Batch Directory Pipeline
1. Place target files in `paper_input/`.
2. Run the pipeline:
   ```bash
   python -m turnitout.cli --input paper_input/ --output paper_output/
   ```

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
