<p align="center">
  <img src="docs/assets/logo-banner.svg" alt="Turnitout Logo" width="100%"/>
</p>

<h1 align="center">Turnitout — Plagiarism & AI Detector Evasion Engine</h1>

<p align="center">
  <a href="https://turnitout.streamlit.app/"><img src="https://img.shields.io/badge/Deployment-Live%20Hosted%20App-blue.svg?style=for-the-badge&logo=streamlit" alt="Deployment: Live Hosted App"/></a>
  <img src="https://img.shields.io/badge/Version-v1.9.2-green.svg?style=for-the-badge" alt="Version: v1.9.2"/>
  <img src="https://img.shields.io/badge/Python-3.9%2B-brightgreen.svg?style=for-the-badge" alt="Python 3.9+"/>
  <a href="https://github.com/AhmadHassan-BTed/Turnitout-Humanizer/issues"><img src="https://img.shields.io/badge/Community-GitHub%20Issues-orange.svg?style=for-the-badge&logo=github" alt="GitHub Issues"/></a>
  <img src="https://img.shields.io/badge/Privacy-100%25%20Local-purple.svg?style=for-the-badge" alt="Privacy: 100% Local"/>
</p>

<p align="center">
  <strong>The ultimate programmatic, zero-AI plagiarism and AI-detection removal suite. Engineered for research papers, LaTeX documents, Word files, source code files, and technical manuscripts with hierarchical academic discipline taxonomy, developer skill personas, multi-format batch document processing, and automatic BibTeX / JSON / LaTeX reference generation.</strong>
</p>

---

## 💡 Why Turnitout?

Academic, technical, and software writing is a personal human craft. Under the rigid rules of automated similarity checkers (**Turnitin**, **iThenticate**) and AI pattern detectors (**GPTZero**, **Turnitin AI**, **CopyLeaks**, **ZeroGPT**), researchers, students, and software developers are often forced to rewrite their natural voice or destroy complex document layouts simply to clear string-matching thresholds.

Other commercial tools use generative AI to rewrite text — which ironically leaves **new AI footprints, hallucinated facts, syntax errors in code, and compromises document privacy**. 

**Turnitout does NOT use AI to eliminate AI.** It is **100% programmatic, rule-based, and deterministic**, mathematically disrupting contiguous n-gram word sequences while leaving equations, matrices, figures, source code logic, variable names, line indentation, and citation indexes completely untouched.

---

## 📊 Commercial AI Tool Comparison

| Feature / Guarantee | 🤖 Commercial AI Humanizers | 🛡️ **Turnitout Engine** |
| :--- | :---: | :---: |
| **New AI Footprint Risk** | ❌ High (Generates new AI patterns) | ✅ **0% (100% Rule-Based & Deterministic)** |
| **Fact & Data Preservation** | ❌ Frequent Hallucinations | ✅ **Zero (Facts & Numbers Stay 100% Exact)** |
| **Document Layout Preservation** | ❌ Destroys tables, XML & formatting | ✅ **Preserves XML, Fonts, Bold/Italic & Headers** |
| **Source Code Execution Safety** | ❌ Breaks code syntax & logic | ✅ **100% Executable Code Safety Guarantee** |
| **LaTeX & Math Protection** | ❌ Destroys `\cite{}`, `$x^2$`, equations | ✅ **Keeps LaTeX & Equations 100% Untouched** |
| **Reference Generation** | ❌ None | ✅ **BibTeX (.bib), LaTeX & JSON Generator** |

---

## 🚀 Core Capabilities & Highlights

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                           TURNITOUT CORE SUITE                                         │
├───────────────────────────────┬───────────────────────────────┬───────────────────────────────┬────────┤
│  ⚡ Plagiarism & AI Remover   │  💻 Code Comment Humanizer    │  📜 Citation & Reference Gen  │  📦 ZIP│
│  - Zero Generative AI         │  - 100% Executable Safety     │  - IEEE [1] & APA (Author)    │  - DOCX│
│  - XML Paragraph Formatting   │  - Developer Skill Personas   │  - BibTeX (.bib) Exporter     │  - TEX │
│  - BERT / LLM Pattern Evader  │  - Single-Line Comment Preserv│  - LaTeX (\cite{key}) Package │  - Code│
└───────────────────────────────┴───────────────────────────────┴───────────────────────────────┴────────┘
```

### 1. ⚡ Plagiarism & AI Remover (Text & Document Humanizer)
- **Multi-Format In-Place Processing**: Humanizes `.docx`, `.tex`, `.txt`, `.md`, and `.py` documents in-place while keeping XML styling, font colors, bold/italic runs, tables, headers, and footers intact.
- **Section-Aware Protection**: Abstract, Introduction, Conclusion, Title, Declarations, and Appendices are humanized, while code blocks and math environments are strictly protected.
- **BERT & LLM Pattern Evader**: Automatically neutralizes AI signature triggers (`"delve into"`, `"plays a pivotal role"`, `"provides a robust framework"`, `"the interplay between"`) and cleans em-dashes (`—`).

### 2. 💻 Code Comment & Docstring Humanizer (100% Executable Code Safety Guarantee)
- **Executable Code Safety**: Only natural language comments (`#`, `//`, `/* ... */`, `""" ... """`, `<!-- ... -->`) are humanized. Code statements, logic, variables, functions, syntax, and indentation remain **100% untouched and runnable**.
- **Developer Skill Personas**:
  - 🐣 **Beginner Developer**: Simple, everyday conversational words (`"finds"`, `"sets up"`, `"breakdown"`).
  - ⚙️ **Intermediate Developer**: Standard working software engineering English.
  - 👨‍💻 **Senior Architect / Expert**: Formal technical jargon (`"evaluates"`, `"initializes"`, `"spectral decomposition"`).
- **Single Continuous Line Preservation**: Converts multi-line AI docstrings and block comments into clean single-line `#` or `//` comments without breaking continuous sentences.
- **Multi-File Batch & ZIP Upload**: Upload multiple code files or `.zip` code archives for in-memory extraction, comment humanization, folder hierarchy preservation, and 1-click downloadable ZIP export.
- **Supported Languages**: Python (`.py`), C/C++ (`.c`, `.cpp`), Java/C# (`.java`, `.cs`), JavaScript/TypeScript (`.js`, `.ts`), Go/Rust (`.go`, `.rs`), Shell/Bash (`.sh`), SQL (`.sql`), HTML/CSS (`.html`, `.css`).

### 3. 📜 Citation Inserter & BIB / JSON / LaTeX Generator
- **Multi-Format Reference Export**: Inserts contextual citations into document sentences and exports matching **BibTeX (`citations.bib`)**, **LaTeX (`\cite{key}`)**, and **Structured JSON (`citations.json`)** reference packages.
- **Unified Citation Count Field**: Combobox supporting contextual auto-detection (`Auto`) or clean numeric entry (`3`, `5`, `10`, `20`, `50`, or custom numbers).
- **100% Dynamic Discipline Taxonomy**: Real-time rule taxonomy traversing subfolder rules (`rules/academic/taxonomy/*`) covering:
  - 💻 `Computer Science & AI` (Artificial Intelligence, Cybersecurity, Systems)
  - ⚙️ `Engineering & Physics` (Fluid Dynamics, Heat Transfer, Signal Processing)
  - 📐 `Mathematics & Statistics` (Differential Equations, Numerical Analysis)
  - 📈 `Quantitative Finance & Economics` (Option Pricing, Risk Modeling)
  - 🧬 `Medical & Life Sciences` (Bioinformatics, Genomics)

### 4. 🔍 Multi-Algorithm Real-Time AI Detector
- **ZipPy Compression Perplexity Engine**: Local entropy analyzer combining `zlib`/`lzma` dictionary perplexity with phrase matching, burstiness variance, and discourse markers for instant local AI scoring.

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
│   ├── conversational/                   # 4,068+ Conversational JSON Rules
│   │   ├── phrases.json
│   │   └── synonyms.json
│   └── global_config.json                # Centralized Feature & UI Toggles
├── src/turnitout/
│   ├── auth_persistence.py               # Triple-Layer Cookie & Query Param Persistence
│   ├── github_verifier.py                # GitHub Stargazer, Follower & OAuth Exchange
│   ├── core/
│   │   ├── citation_engine.py            # Decoupled Rules-Driven Citation Engine
│   │   ├── code_comment_parser.py        # Code Comment & Docstring Humanizer Pipeline
│   │   ├── doc_processor.py              # In-Place DOCX Stream & ZIP Code Batch Generator
│   │   ├── modifier.py                   # Rule Transformer Coordinator
│   │   ├── rules.py                      # Recursive Rules & Taxonomy Loader
│   │   ├── code/                         # Modular Language Rules Engines
│   │   │   ├── base.py                   # String-Aware Comment Token Finder
│   │   │   ├── registry.py               # Language Extension & Syntax Auto-Detector
│   │   │   └── languages/                # Python, C-Family, Shell, Markup/SQL Rules
│   │   └── transformers/                 # AI & Similarity Evader Transformers
│   ├── ui/
│   │   ├── citation_ui.py                # Citation & BIB/JSON/LaTeX UI Page
│   │   ├── code_humanizer_ui.py          # Standalone Code Comment Humanizer Page
│   │   ├── feedback_ui.py                # Dedicated Feature & Bug Reporter Page
│   │   ├── humanizer_ui.py               # Plagiarism & AI Remover UI Page
│   │   ├── checker_ui.py                 # Multi-Pass Checker UI Page
│   │   └── common.py                     # Global Styling & Banner Headers
│   └── ai_detector.py                    # ZipPy Entropy & Signature Detector
├── tests/                                # Comprehensive Pytest Test Suite (34 Unit Tests)
├── CHANGELOG.md                          # Version Release History
├── PRIVACY.md                            # Privacy & Data Retention Policy
├── TERMS.md                              # Terms of Service
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

- 💬 **Instant Developer Chat**: [Chat on WhatsApp (+92 322 5522383)](https://wa.me/923225522383)
- 🐛 **Issue Tracker**: [Submit a Feature Request or Bug Report](https://github.com/AhmadHassan-BTed/Turnitout-Humanizer/issues/new)
- ⭐️ **Support the Project**: Star and follow our public GitHub repositories!
- 📧 **Email Contact**: For enterprise deployment or custom humanizing services, email **[ahmadhassan.bted@gmail.com](mailto:ahmadhassan.bted@gmail.com)**.

---

## 🔒 Compliance & Security

- **Privacy Policy**: [PRIVACY.md](PRIVACY.md)
- **Terms of Service**: [TERMS.md](TERMS.md)
- **Architecture Guidelines**: [ARCHITECTURE_RULES.md](ARCHITECTURE_RULES.md)
