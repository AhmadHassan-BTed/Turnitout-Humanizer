# Turnitout: Comprehensive User Manual & Technical Reference

> **The Authoritative Guide for Power Users, Researchers, and Developers**  
> *Deterministic, Zero-Generative-AI Linguistic Transformation & Detection Evasion Engine*

---

## 📑 Table of Contents

1. [System Architecture & Deterministic Philosophy](#1-system-architecture--deterministic-philosophy)
2. [Module 1: Plagiarism & AI Humanizer](#2-module-1-plagiarism--ai-humanizer)
   - [2.1 Document Ingestion & Formatting Preservation](#21-document-ingestion--formatting-preservation)
   - [2.2 Anti-Tracking, Invisible Unicode & Metadata Scrubbing](#22-anti-tracking-invisible-unicode--metadata-scrubbing)
   - [2.3 Advanced Transformation Controls (The 14 Knobs)](#23-advanced-transformation-controls-the-14-knobs)
   - [2.4 Custom Protected Terms (Synonym Exclusion Blacklist)](#24-custom-protected-terms-synonym-exclusion-blacklist)
   - [2.5 Empirical Voice Matching (Beta)](#25-empirical-voice-matching-beta)
   - [2.6 Telemetry Dashboard & Interactive Diff View](#26-telemetry-dashboard--interactive-diff-view)
3. [Module 2: Code Comment & Docstring Humanizer](#3-module-2-code-comment--docstring-humanizer)
   - [3.1 AST String-Aware Comment Isolation & Safety](#31-ast-string-aware-comment-isolation--safety)
   - [3.2 Multi-Language Grammar Support](#32-multi-language-grammar-support)
   - [3.3 Developer Skill Personas](#33-developer-skill-personas)
   - [3.4 Docstring Conversion](#34-docstring-conversion)
4. [Module 3: Citation Inserter & BibTeX Generator](#4-module-3-citation-inserter--bibtex-generator)
   - [4.1 Citation Formats & Contextual Placement](#41-citation-formats--contextual-placement)
   - [4.2 Discipline Taxonomies](#42-discipline-taxonomies)
   - [4.3 Self-Executing AI Auto-Fill BibTeX Package](#43-self-executing-ai-auto-fill-bibtex-package)
5. [Module 4: AI Pattern & Signature Checker](#5-module-4-ai-pattern--signature-checker)
   - [5.1 ZipPy Entropic Perplexity Analysis](#51-zippy-entropic-perplexity-analysis)
   - [5.2 Composite Risk Scoring & Span Highlighting](#52-composite-risk-scoring--span-highlighting)
6. [Module 5: Pairwise Document Similarity](#6-module-5-pairwise-document-similarity)
   - [6.1 Multi-Pass Cross-Audit Algorithms](#61-multi-pass-cross-audit-algorithms)
   - [6.2 Synchronized Passage Comparison](#62-synchronized-passage-comparison)
7. [Module 6: Cluster Architecture & High Availability](#7-module-6-cluster-architecture--high-availability)
   - [7.1 The 8-Node Distributed Cluster](#71-the-8-node-distributed-cluster)
   - [7.2 In-Memory Ephemeral Execution & Privacy Guarantee](#72-in-memory-ephemeral-execution--privacy-guarantee)
8. [Power-User FAQ & Quick Troubleshooting](#8-power-user-faq--quick-troubleshooting)

---

## 1. System Architecture & Deterministic Philosophy

Most commercial humanizers (e.g., QuillBot, Undetectable AI, StealthGPT) rely on third-party Large Language Models (LLMs) to re-paraphrase user text. For academic research, theses, and technical publications, this approach carries severe vulnerabilities:

* **Factual Hallucinations:** Generative models frequently alter historical dates, mathematical values, statistical significance levels ($p$-values), and citation references.
* **Secondary AI Footprints:** Because LLMs generate text based on next-token predictability, their output produces low mathematical perplexity and flat sentence burstiness, leading to secondary flags on detectors like Turnitin AI and CopyLeaks.
* **Format Corruption:** Plaintext LLM wrappers destroy LaTeX math environments, equations, Word XML styles, footnotes, tables, and programming syntax.

### The Black-Box Paradigm

```
┌────────────────────────────────────────────────────────────────────────┐
│                        TURNITOUT CORE ENGINE                           │
│                                                                        │
│   Input Document (.docx / .tex / .md / .py / text)                    │
│      │                                                                 │
│      ├─► AST / XML Run Parser (Separates Prose from Formatting & Code) │
│      ├─► Steganographic Scrubbing (Purges Zero-Width Unicode & C2PA)   │
│      ├─► 15-Stage Deterministic Syntactic Pipeline                    │
│      │    • 1:1 Contextual Synonym Alignment                           │
│      │    • PDTB 2.0 Discourse Connective Rotation                    │
│      │    • Active/Passive Grammatical Voice Balancing                │
│      │    • Contiguous N-Gram Chain Breaking                           │
│      └─► In-Place Document Reconstruction (Exact Layout Preservation)  │
│                                                                        │
│   Output Document (Identical Formatting • Zero AI • 100% Deterministic)│
└────────────────────────────────────────────────────────────────────────┘
```

Turnitout utilizes **zero generative AI**. It operates as a deterministic, rule-based linguistic transformation engine. The tool restructures syntax, permutes clauses, and swaps token patterns without making unconstrained external API calls or altering factual assertions.

---

## 2. Module 1: Plagiarism & AI Humanizer

The primary workspace provides dual execution paths: interactive plaintext humanization and multi-format document batch processing.

### 2.1 Document Ingestion & Formatting Preservation

Turnitout avoids flat text extraction. Instead, it parses document Abstract Syntax Trees and XML run streams:

* **Microsoft Word (`.docx`):** Traverses paragraph runs (`w:p`) and operates exclusively on innermost text runs (`w:t`). Typography, fonts, colors, bold/italics, headers, footers, footnotes, tables, images, and track-change metadata boundaries are preserved *in-place*.
* **LaTeX Manuscripts (`.tex`):** Isolates prose blocks while mathematically locking:
  * Inline and display math: `$ ... $`, `$$ ... $$`, `\[ ... \]`
  * Complex math environments: `\begin{equation}`, `\begin{align}`, `\begin{matrix}`
  * Bibliographic keys: `\cite{...}`, `\citep{...}`, `\citet{...}`
  * Preambles, custom macros, and structural commands (`\section`, `\label`, `\ref`)
* **Markdown (`.md`) & Plain Text (`.txt`):** Preserves headers (`#`), blockquotes, code blocks (```), bullet hierarchies, and table pipes (`|`).
* **Batch ZIP Packages:** Upload a `.zip` archive containing dozens of files. Turnitout extracts, processes, and re-packages them in-memory into `Turnitout_Humanized_Docs_<TIMESTAMP>.zip`, preserving directory folder structures.

---

### 2.2 Anti-Tracking, Invisible Unicode & Metadata Scrubbing

Recent regulatory frameworks (such as the EU AI Act Article 50) require generative AI tools to embed covert tracking markers. Turnitout includes automatic sanitizers:

| Tracking Mechanism | Description & Vector | Functional Outcome |
| :--- | :--- | :--- |
| **Zero-Width Unicode Spaces** | Covert characters (`U+200B`, `U+200C`, `U+200D`, `U+2060`) injected between words to identify AI origin. | Automatically detected and purged from all text and document runs. |
| **C2PA Manifest Metadata** | Content Credentials metadata embedded in Office and PDF manifests indicating machine generation. | Export packaging streams are sanitized, stripping internal provenance manifests. |
| **LLM Cliché Signatures** | High-frequency AI marker phrases (e.g., *"delve into"*, *"pivotal role"*, *"tapestry"*) and uniform em-dashes (`—`). | Systematically identified and replaced with natural, diverse academic equivalents. |

---

### 2.3 Advanced Transformation Controls (The 14 Knobs)

Accessible via `:material/tune: Advanced Transformation Settings & Protected Terms`:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [x] Synonym Swapping        [x] Transition Injection    [x] Contractions    │
│     Slider: [───●─────] 0.85[x] Clause & Word Reorder   [x] N-Gram Breaking │
│ [x] Phrase Rewriting        [x] Nominalization          [ ] Conceptual Bridg│
│ [x] Determiner Swapping     [x] Appositive Insertion    [x] Info Reordering │
│ [x] Voice Transformations   [x] Discourse Rotation                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

1. **Synonym Swapping (with Alignment Probability Slider):**  
   Replaces predictable tokens with contextually aligned synonyms. The slider (`0.50` to `1.00`) controls semantic precision:
   * `0.90 – 0.95`: Strict academic and technical precision (zero semantic drift).
   * `0.80 – 0.85`: Standard recommended sweet spot for natural human flow.
   * `0.70 – 0.75`: Creative/expressive variation.
   * *Randomize Alignment Checkbox:* Simulates natural, imperfect human vocabulary variance without adding words.
2. **Phrase Rewriting:**  
   Substitutes multi-word idiomatic patterns and repetitive transitional phrases with natural human alternatives.
3. **Determiner Swapping:**  
   Alternates demonstratives and articles (e.g., *"the"* ↔ *"this"*, *"these"* ↔ *"such"*) to break rigid AI article distributions.
4. **Voice Transformations:**  
   Converts passive voice to active voice and vice-versa according to academic discourse conventions, elevating burstiness.
5. **Sentence Fusion:**  
   Merges adjacent short sentences using conjunctions (*"and"*, *"whereas"*), varying sentence length rhythms.
6. **Transition Injection:**  
   Injects natural academic discourse markers (*"Furthermore"*, *"In contrast"*, *"Consequently"*). Adds word count.
7. **Clause & Word Reorder:**  
   Permutes dependent clauses, introductory adverbials, and prepositional phrases without adding words.
8. **Nominalization / Verbalization:**  
   Converts actions between verbs and abstract nouns (e.g., *"analyze"* ↔ *"conduct an analysis of"*).
9. **Appositive Insertion:**  
   Inserts clarifying parentheticals, acronym definitions, and appositive noun phrases. Adds word count.
10. **Discourse Rotation:**  
    Rotates paragraph-level rhetorical flow and macro-connectives according to discourse tree conventions.
11. **Contractions Swapping:**  
    Expands contracted auxiliaries (*"don't"* ➔ *"do not"*) for formal papers, or contracts for casual tones.
12. **N-Gram Chain Breaking:**  
    Audits surviving 5-gram token chains against common AI sequences, applying micro-substitutions.
13. **Conceptual Bridging:**  
    Injects thematic transition connectors between adjacent conceptual paragraphs. Adds word count.
14. **Information Reordering:**  
    Restructures clauses to shift focus based on the given-versus-new information principle.

---

### 2.4 Custom Protected Terms (Synonym Exclusion Blacklist)

Guarantees that proprietary terms, chemical formulas, code keywords, or author names are never modified.

* **Manual Input:** Type comma-separated terms into the text field:
  ```text
  CRISPR-Cas9, TensorFlow, O(N log N), React, Dirichlet
  ```
* **JSON File Upload:** Upload a `.json` blacklist. Supports both array and key-value formats:
  ```json
  ["CRISPR-Cas9", "TensorFlow", "PyTorch", "Dirichlet"]
  ```

---

### 2.5 Empirical Voice Matching (Beta)

Calibrates transformation heuristics to mimic your authentic authorial cadence:
1. Enable the toggle and upload an authentic reference sample (essay, thesis chapter, or published paper; 100+ words).
2. The engine evaluates sentence length variance, clause depth, contraction preferences, and lexical formality.
3. Transformation probabilities dynamically adapt to match your personal writing rhythm.

---

### 2.6 Telemetry Dashboard & Interactive Diff View

Expand the **Telemetry & Transformation Breakdown** panel after humanizing:
* **Word Count Delta:** Instant before/after comparison to verify length boundaries.
* **Transformation Intensity:** Number of lexical replacements, clause reorderings, and discourse shifts applied.
* **Color-Coded Diff Preview:** Side-by-side comparison highlighting all modified spans for rapid inspection.

---

## 3. Module 2: Code Comment & Docstring Humanizer

Generic AI rewriters often corrupt code logic, change variable names, or break Python indentation. Turnitout includes a dedicated code-aware engine.

### 3.1 AST String-Aware Comment Isolation & Safety

The code engine uses a character-by-character scanner that tracks quote states (single quotes, double quotes, escape sequences) to isolate only natural language comment blocks:
* `#` single-line comments (Python, R, Shell)
* `//` single-line comments (C/C++, Java, JS/TS, Go, Rust, C#, PHP)
* `/* ... */` multi-line blocks
* `<!-- ... -->` markup comments (HTML, XML)
* `""" ... """` / `''' ... '''` Python docstrings

**Executable Safety Guarantee:** Code statements, variable names, logic conditions, function signatures, and indentation remain 100% untouched.

---

### 3.2 Developer Skill Personas

Control the vocabulary tone of rewritten comments:
* **Beginner Developer:** Simple, everyday phrasing (e.g., *"checks if list is empty"*, *"loops through items"*).
* **Intermediate Developer:** Standard industry working English (e.g., *"validates container boundary"*, *"iterates over dataset"*).
* **Senior Architect / Expert:** Advanced technical terminology (e.g., *"evaluates invariant constraint"*, *"executes sequential traversal"*).

---

### 3.3 Docstring Conversion

AI coding assistants (ChatGPT, Copilot) frequently generate lengthy triple-quoted docstrings. Enabling **Convert AI Docstrings (""") → Human '#' Comments** refactors multi-line docstring blocks into concise developer line comments.

---

## 4. Module 3: Citation Inserter & BibTeX Generator

Scholarly papers require citations to support claims. The Citation Inserter anchors references where academic literature is standard.

### 4.1 Citation Formats & Contextual Placement

* **IEEE Format:** Numeric bracketed references (e.g., `[1]`, `[2]`, `[3]`).
* **APA Format:** Author-year markers (e.g., `(Vaswani et al., 2017)`).
* **LaTeX Format:** Verifiable citation keys (e.g., `\cite{vaswani2017attention}`).

---

### 4.2 Discipline Taxonomies

Select your academic field or leave on **Auto-Detect Field (Recommended)**:
* `Computer Science & AI`
* `Engineering & Physics`
* `Mathematics & Statistics`
* `Quantitative Finance`
* `Medical & Life Sciences`

---

### 4.3 Self-Executing AI Auto-Fill BibTeX Package

When downloading the generated `citations.bib`, it contains matching citation keys alongside an **embedded prompt header**. To populate real peer-reviewed papers:
1. Download or copy `citations.bib`.
2. Paste the text into ChatGPT, Claude, Gemini, or DeepSeek.
3. The AI reads the instructions and fills in **real peer-reviewed papers, authors, and DOIs** while retaining the exact citation keys in your document.

---

## 5. Module 4: AI Pattern & Signature Checker

Modeled after QuillBot and ZeroGPT diagnostic dashboards, this tool allows local verification before submission.

### 5.1 ZipPy Entropic Perplexity Analysis

Evaluates entropic compression ratios across contiguous text chunks. AI-generated text compresses abnormally well due to repetitive token probabilities; human drafting produces high entropy and varied compression resistance.

### 5.2 Composite Risk Scoring & Span Highlighting

* **Composite Risk Percentage (0% to 100%):** Overall probability of detection.
* **Trilateral Split:** Displays **AI-Generated**, **AI-Refined**, and **Human-Written** percentages.
* **Highlighted Overlapping Spans:** Amber/yellow marks highlight predictable spans for targeted editing.

---

## 6. Module 5: Pairwise Document Similarity

Compares Document A vs Document B for version overlap or cross-document plagiarism checks.

### 6.1 Multi-Pass Cross-Audit Algorithms

Simultaneously computes:
* **5-Gram Overlap:** Detects exact 5-word contiguous matches.
* **Winnowing Fingerprints:** Evaluates rolling hash windows against matching thresholds.
* **Cosine TF-IDF:** Evaluates topical and vocabulary overlap.
* **Longest Common Subsequence (LCS):** Identifies persistent structural reordering.

### 6.2 Synchronized Passage Comparison

Displays matching passages in synchronized scroll windows with risk ratings (**Low**, **Moderate**, or **High Risk**).

---

## 7. Module 6: Cluster Architecture & High Availability

To bypass cloud hosting throttling and prevent service interruptions during exam peaks, Turnitout operates across an **8-node distributed cluster**:

| Node | URL | Purpose |
| :--- | :--- | :--- |
| **Server Nodes 1–7** | `turnitout1.streamlit.app` ... `turnitout7.streamlit.app` | Dedicated high-speed evasion worker mirrors handling ~90% of global traffic. |
| **Main Server (Heart)** | `turnitout.streamlit.app` | Resilient cluster anchor, OAuth gateway, and fallback node. |

### In-Memory Ephemeral Execution & Privacy Guarantee

All document processing executes in transient RAM. Files are never saved to physical disks, never stored in databases, and never used to train machine learning models. Once your session ends, all document data dissolves.

---

## 8. Power-User FAQ & Quick Troubleshooting

### Q: How do I achieve exact 1:1 word count parity (0 added words)?
Open **Advanced Transformation Settings & Protected Terms**. Keep **Synonym Swapping** enabled (slider at `0.85 – 0.90`), and turn **OFF** *Transition Injection*, *Appositive Insertion*, and *Conceptual Bridging*. Read the [Word Limit Guide](word-limit-guide.html) for full toggle instructions.

### Q: Will Turnitout alter math formulas or tables in LaTeX or Word?
No. LaTeX math environments (`$...$`, `equation`, `align`) and Word XML tables/formatting runs are strictly protected. Only natural prose paragraphs are modified.

### Q: What if I encounter GitHub rate limits during verification?
Contact developer **Ahmad Hassan** directly on WhatsApp at [**+92 322 5522383**](https://wa.me/923225522383) for immediate manual access.
