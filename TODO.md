# Implementation Plan: Turnitout Core v1.6.0 Feature & Architecture Enhancements

**Branching Strategy:** `main`  
**Target Integration:** `src/turnitout/core/citation_engine.py`, `rules/academic/taxonomy/*`, `src/turnitout/ui/citation_ui.py`, `src/turnitout/ui/feedback_ui.py`  
**Architectural Principles:** High Functional Cohesion, Strict Data Coupling, Decoupled UI and Engine Logic, Zero Hardcoded Word/Topic Lists  

---

## 📋 Architectural Checklist & Completed Features

### Phase 1: Decoupled Citation Engine & Reference Generator
- [x] `src/turnitout/core/citation_engine.py`: Decoupled `CitationEngine` and `CitationResult` dataclass
- [x] Contextual auto-detection (`Auto`) and manual count insertion
- [x] Multi-format reference exporter: BibTeX (`citations.bib`), LaTeX (`\cite{key}`), and structured JSON (`citations.json`)

### Phase 2: Hierarchical Academic Discipline Taxonomy
- [x] `rules/academic/taxonomy/*`: Subfolder-structured taxonomy dataset (`computer_science`, `engineering_physics`, `mathematics_statistics`, `quantitative_finance`, `medical_life_sciences`)
- [x] Expert `__prompt__` metadata headers incorporating prompt engineering and negative prompting rules in every JSON file
- [x] `src/turnitout/core/rules.py`: Recursive directory loader `load_academic_taxonomy()`

### Phase 3: Multi-File Batch Upload & In-Memory ZIP Bundling
- [x] `src/turnitout/core/doc_processor.py`: `create_humanized_docs_zip` in-memory stateless bundler
- [x] Clean ZIP filename conventions: `Turnitout_Humanized_Docs_<TIMESTAMP>.zip`, `Turnitout_Citations_<TIMESTAMP>.zip`, `Turnitout_Checker_Reports_<TIMESTAMP>.zip`

### Phase 4: UI & Navigation Integration
- [x] `src/turnitout/ui/citation_ui.py`: Citation Inserter & BIB / JSON / LaTeX Generator page with unified `Citation Count` field (`Auto` or number input)
- [x] `src/turnitout/ui/feedback_ui.py`: In-app Feature Request & Bug Reporter page
- [x] `streamlit_app.py`: Top-level sidebar navigation page routing and unlock gate bypass for feedback page
- [x] `src/turnitout/ui/common.py`: Sidebar issue type dropdown with GitHub template URLs

### Phase 5: Verification & Automated Test Suite
- [x] `tests/test_academic_taxonomy.py`: Taxonomy schema & discipline filtering unit tests
- [x] `tests/test_citation_engine.py`: Citation insertion & reference exporter unit tests
- [x] `tests/test_doc_processor.py`: Multi-file ZIP buffer unit tests
- [x] `18/18 unit tests passed (100% pass rate)`
