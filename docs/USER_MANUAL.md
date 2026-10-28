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

#### 1. Synonym Swapping (with Alignment Probability Slider)
* **Word Count Impact:** **0 Words (1:1 Parity)**
* **What It Changes:** Replaces statistically predictable single words overrepresented in AI text with contextually accurate, lower-frequency synonyms without adding extra tokens. The slider (`0.50` to `1.00`) controls semantic precision (`0.90–0.95` strict technical fidelity; `0.80–0.85` standard natural flow).
* **Live Output Example:**
  ```diff
  - Original:    "The algorithm demonstrates substantial efficacy in mitigating network latency across distributed clusters."
  + Transformed: "The algorithm shows significant effectiveness in reducing network delay across distributed clusters."
  ```
* **Recommendation:** Keep **ON**. Essential for breaking AI n-grams while strictly maintaining 100% word-count neutrality.

#### 2. Phrase Rewriting
* **Word Count Impact:** -2 to +1 Words
* **What It Changes:** Scans for telltale multi-word AI clichés, formulaic transitional phrases, and conversational fillers, replacing them with direct, authentic human academic phrasing.
* **Live Output Example:**
  ```diff
  - Original:    "In order to delve into the multifaceted dimensions of this phenomenon, it is of paramount importance to consider..."
  + Transformed: "To examine the various aspects of this phenomenon, one must consider..."
  ```
* **Recommendation:** Highly recommended **ON**. Strips recognizable AI patterns like *"delve into"*, *"multifaceted"*, and *"paramount importance"*.

#### 3. Determiner Swapping
* **Word Count Impact:** **0 Words (1:1 Parity)**
* **What It Changes:** Contextually alternates articles (*"the"*, *"a"*) and demonstratives (*"this"*, *"these"*, *"such"*). Prevents sentences from uniformly opening with *"The [subject]"*.
* **Live Output Example:**
  ```diff
  - Original:    "The experiment validates the hypothesis. The results suggest the model generalizes well across the unseen test datasets."
  + Transformed: "This experiment validates the hypothesis. These results suggest the model generalizes well across such unseen test datasets."
  ```
* **Recommendation:** Keep **ON**. Varies sentence starts with exact 1-to-1 word count preservation.

#### 4. Voice Transformations (Active ↔ Passive)
* **Word Count Impact:** ± 1 to 3 Words
* **What It Changes:** Converts rigid passive constructions into dynamic active voice, or converts repetitive active statements into scholarly passive constructions where objective agency is preferred.
* **Live Output Example:**
  ```diff
  - Original (Passive): "A novel optimization framework was engineered by the research group to accelerate gradient descent."
  + Transformed (Active):  "The research group engineered a novel optimization framework to accelerate gradient descent."
  ```
* **Recommendation:** Keep **ON** for standard humanization. Elevates stylistic burstiness.

#### 5. Sentence Fusion
* **Word Count Impact:** +1 to 3 Words
* **What It Changes:** Merges adjacent short, staccato sentences into cohesive compound or complex sentences using coordinating or subordinating conjunctions.
* **Live Output Example:**
  ```diff
  - Original (Staccato): "The dataset contains 50,000 samples. The training process required 12 hours. The final validation loss was minimal."
  + Transformed (Fused):    "The dataset contains 50,000 samples, and while training required 12 hours, the final validation loss remained minimal."
  ```
* **Recommendation:** Enable for fragmented AI drafts. Disable if targeting a strict exact word count ceiling.

#### 6. Transition Injection
* **Word Count Impact:** +2 to 4 Words / Sentence
* **What It Changes:** Injects authentic scholarly discourse markers and transitional signposts (*"Furthermore"*, *"In contrast"*, *"Consequently"*, *"To this end"*) to enhance reading rhythm.
* **Live Output Example:**
  ```diff
  - Original:    "The baseline model struggled with long-range dependencies. The attention-augmented architecture maintained high accuracy."
  + Transformed: "The baseline model struggled with long-range dependencies. In contrast, the attention-augmented architecture maintained high accuracy."
  ```
* **Recommendation:** Excellent for literature reviews. **Turn OFF if working under a strict word limit!**

#### 7. Clause & Word Reorder
* **Word Count Impact:** **0 Words (1:1 Parity)**
* **What It Changes:** Reorders dependent clauses, introductory adverbials, and prepositional adjuncts to natural alternative positions without altering semantic meaning or document length.
* **Live Output Example:**
  ```diff
  - Original:    "The model achieves superior convergence speeds when evaluated on GPU clusters."
  + Transformed: "When evaluated on GPU clusters, the model achieves superior convergence speeds."
  ```
* **Recommendation:** Always keep **ON**. Disrupts predictable sequence starts with zero word count inflation.

#### 8. Nominalization / Verbalization
* **Word Count Impact:** ± 1 to 2 Words
* **What It Changes:** Alternates between direct action verbs and abstract nominal forms (e.g., *"analyze"* ↔ *"conduct an analysis of"*, *"measure"* ↔ *"perform a measurement of"*).
* **Live Output Example:**
  ```diff
  - Original:    "We systematically measured the latency variances across all worker nodes."
  + Transformed: "We conducted a systematic measurement of latency variances across all worker nodes."
  ```
* **Recommendation:** Keep **ON** for formal scientific manuscripts and academic theses.

#### 9. Appositive Insertion
* **Word Count Impact:** +5 to 15 Words / Instance
* **What It Changes:** Inserts clarifying parentheticals, informative noun phrases, or acronym definitions directly alongside subjects, replicating human explanatory prose.
* **Live Output Example:**
  ```diff
  - Original:    "We evaluated BERT on the SQuAD benchmark."
  + Transformed: "We evaluated BERT, a transformer-based language representation model, on the SQuAD benchmark."
  ```
* **Recommendation:** Great for deep explanatory papers. **Turn OFF if working under a strict word limit!**

#### 10. Discourse Rotation
* **Word Count Impact:** 0 to +2 Words
* **What It Changes:** Rotates macro-connectives across paragraph openers according to discourse tree taxonomies, preventing adjacent paragraphs from opening with identical transitions.
* **Live Output Example:**
  ```diff
  - Original (Repetitive):
    Para 1: "Moreover, the system minimizes query overhead."
    Para 2: "Moreover, the cache structure improves latency."
  + Transformed (Rotated):
    Para 1: "Moreover, the system minimizes query overhead."
    Para 2: "Concurrently, the cache structure improves latency."
  ```
* **Recommendation:** Essential for multi-page documents, research reports, and dissertations.

#### 11. Contractions Swapping
* **Word Count Impact:** +1 Word / Expansion
* **What It Changes:** In academic presets, expands informal contractions into rigorous formal pairs (*"don't"* ➔ *"do not"*). In casual mode, contracts them for natural dialogue.
* **Live Output Example:**
  ```diff
  - Original:    "It's evident that the pipeline didn't encounter memory fragmentation."
  + Transformed: "It is evident that the pipeline did not encounter memory fragmentation."
  ```
* **Recommendation:** Turn on for formal academic submissions.

#### 12. N-Gram Chain Breaking
* **Word Count Impact:** 0 to ±1 Word
* **What It Changes:** Audits surviving 5-gram token chains against precomputed statistical AI sequences and applies targeted micro-adjustments to shatter hash fingerprints checked by Turnitin and GPTZero.
* **Live Output Example:**
  ```diff
  - Original:    "...serves as a testament to the remarkable capabilities of modern deep learning..."
  + Transformed: "...highlights the notable performance and capabilities of modern deep learning..."
  ```
* **Recommendation:** Always keep **ON**. Critical defense against Winnowing and hash fingerprint algorithms.

#### 13. Conceptual Bridging
* **Word Count Impact:** +10 to 25 Words / Paragraph
* **What It Changes:** Analyzes conceptual relationships between adjacent paragraphs and generates an introductory thematic bridge to smoothly link disparate arguments.
* **Live Output Example:**
  ```diff
  - Original (Abrupt Transition):
    [End of Para 1]: "...concluding our evaluation of loss functions."
    [Start of Para 2]: "Distributed training requires specialized hardware."
  + Transformed (Smooth Thematic Bridge):
    [Start of Para 2]: "Building upon these loss function dynamics, distributed training necessitates specialized hardware..."
  ```
* **Recommendation:** Excellent for capstone theses requiring narrative cohesion. **Turn OFF for strict word limits.**

#### 14. Information Reordering
* **Word Count Impact:** **0 Words (1:1 Parity)**
* **What It Changes:** Reorders sentence clauses according to the linguistic "given-before-new" principle, placing foundational context at the start and novel discoveries at the climax.
* **Live Output Example:**
  ```diff
  - Original:    "Substantial throughput gains emerged when the engineers parallelized the pipeline."
  + Transformed: "When the engineers parallelized the pipeline, substantial throughput gains emerged."
  ```
* **Recommendation:** Keep **ON**. Optimizes reader emphasis and sentence cadence with zero word count inflation.

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

* **Live Output Example:**
  ```diff
  - Original:    "We initialized the AdamW optimizer with a learning rate of 0.001 to train the BioBERT architecture on our custom clinical dataset."
  + Transformed: "We configured the AdamW optimizer with a learning rate of 0.001 to fine-tune the BioBERT architecture on our custom clinical dataset."
  ```
  *(Note: Words around them are humanized, but `AdamW`, `learning rate`, and `BioBERT` remain 100% frozen).*

---

### 2.5 Empirical Voice Matching (Beta)

Calibrates transformation heuristics to mimic your authentic authorial cadence:
1. Enable the toggle and upload an authentic reference sample (essay, thesis chapter, or published paper; 100+ words).
2. The engine evaluates sentence length variance, clause depth, contraction preferences, and lexical formality.
3. Transformation probabilities dynamically adapt to match your personal writing rhythm.

* **Live Output Example:**
  ```diff
  - Generic Output: "Furthermore, it is of paramount importance to recognize that the dataset presents multifaceted challenges regarding class imbalance."
  + Voice-Matched:  "Crucially, the dataset presents substantial challenges regarding class imbalance."
  ```

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
