# Turnitout Enterprise REST API Specification

### High-Throughput Programmatic AI Footprint Erasure & Academic Citation Engine

Welcome to the **Turnitout Enterprise REST API** specification. This document outlines the technical architecture, endpoint schemas, request parameters, response models, and integration pathways for integrating Turnitout's deterministic humanization engine directly into your SaaS platform, publishing pipeline, learning management system (LMS), or enterprise workflow.

---

## 1. Enterprise Value Proposition & Architectural Guarantees

Unlike commercial AI humanizers that rely on generative LLM wrappers (which introduce hallucinated facts, syntax breakage, and new statistical AI markers), Turnitout is built upon a **100% deterministic, rule-based transformation pipeline**:

* **Zero Generative AI Hallucinations:** Preserves factual accuracy, numerical figures, equations, technical nomenclature, and citations without introducing phantom claims.
* **Deterministic Multi-Detector Evasion:** Scrambles n-gram sequence predictability and rotates discourse markers to evade Turnitin, iThenticate, GPTZero, CopyLeaks, ZeroGPT, and Google SynthID-Text.
* **2026 Watermark & Metadata Purge:** Wipes Anthropic Claude and Google SynthID tracking tokens, purges hidden zero-width Unicode characters (U+200B, U+200C, U+200D), and strips C2PA metadata.
* **Sub-150ms Latency:** Native asynchronous Python 3.14 + FastAPI + ASGI multi-worker engine designed for real-time throughput.
* **100% Zero-Retention Privacy Architecture:** Ephemeral in-memory execution. Uploaded text is never stored in databases, never cached to disk, and never used to train machine learning models (fully compliant with EU AI Act Article 50 and GDPR data minimization requirements).

---

## 2. Authentication & Cloud Infrastructure

The Turnitout Enterprise API is deployed natively on **Google Cloud** with high-availability autoscaling, low latency, and global CDN delivery:

* **Infrastructure:** Hosted on Google Cloud with serverless ASGI workers for resilient uptime and rapid response times.
* **Authentication:** All API calls require an authenticated API key supplied via the `X-API-Key` HTTP header.
* **API Base URL:** Provided upon provisioning your enterprise key (e.g., `https://<service-url>.run.app` or custom domain).

```http
X-API-Key: tot_live_your_api_key_here
Content-Type: application/json
```

---

## 3. Production API Endpoints

### A. Humanize Text (`POST /v1/humanize`)

Executes Turnitout's multi-stage linguistic transformation pipeline on a plain-text string.

* **Route:** `POST /v1/humanize`
* **Headers:** `Content-Type: application/json`, `X-API-Key: <YOUR_API_KEY>`
* **Input Contract:** Plain-text string (`text: str`, min 5 chars, up to 50,000 characters / ~10,000 words per request). File uploads and multiparts are not required.

> 💡 **Intelligent Defaults:** `text` is the **only required field**. When advanced checklist parameters are omitted, Turnitout automatically applies pre-tuned, production-grade defaults (Academic register, 70% intensity, all core linguistic evasion engines enabled).

#### 1. Minimal Request (Optimal Defaults)

```json
{
    "text": "Furthermore, our experimental findings demonstrate that deep learning models frequently introduce formulaic syntax across large datasets."
}
```

#### 2. Standard Request (Register, Intensity & Protected Terms)

```json
{
    "text": "Furthermore, our experimental findings demonstrate that deep learning models frequently introduce formulaic syntax across large datasets.",
    "intensity": 75.0,
    "style": "academic",
    "protected_terms": ["ResNet-50", "PyTorch", "CRISPR-Cas9"]
}
```

#### 3. Full Enterprise Checklist Request (Optional Granular Overrides)

```json
{
    "text": "Furthermore, our experimental findings demonstrate that deep learning models frequently introduce formulaic syntax across large datasets.",
    "intensity": 75.0,
    "style": "academic",
    "protected_terms": ["ResNet-50", "PyTorch"],
    "enable_synonyms": true,
    "synonym_alignment": 0.85,
    "random_alignment": false,
    "enable_phrase_rewrite": true,
    "enable_determiner_swap": true,
    "enable_voice_transform": true,
    "enable_sentence_fusion": true,
    "enable_transition_inject": true,
    "enable_clause_reorder": true,
    "enable_nominalization": true,
    "enable_appositive": true,
    "enable_discourse_rotate": true,
    "enable_contraction": true,
    "enable_ngram_audit": true,
    "enable_conceptual_bridge": false,
    "enable_info_reorder": true,
    "enable_split_compound": true,
    "enable_ai_tell_scrubber": true,
    "enable_citations": true,
    "max_citations": 2,
    "citation_format": "IEEE [1]",
    "citation_discipline": "computer_science",
    "seed": 42
}
```

#### Request Parameters Reference

| Parameter | Type | Required | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `text` | `string` | **Yes** | — | Plain-text string to humanize (min 5 chars, up to 50,000 chars / ~10,000 words). |
| `intensity` | `float` | No | `70.0` | Paraphrasing aggressiveness (`10.0` to `100.0`). Default `70.0`–`75.0` is recommended for Turnitin evasion. |
| `style` | `string` | No | `"academic"` | Writing register: `"academic"`, `"conversational"`, `"casual"`, or `"technical"`. |
| `convert_docstrings` | `boolean` | No | `false` | When submitting Python code, transforms AI-style docstrings into organic `#` comments while leaving executable code 100% intact. |
| `protected_terms` | `list[string]` | No | `[]` | Exact words, acronyms, brand names, or chemical formulas that must **NEVER** be altered or swapped for synonyms. |
| `enable_synonyms` | `boolean` | No | `true` | Contextual synonym substitution engine. |
| `synonym_alignment` | `float` | No | `0.85` | Semantic threshold (`0.50` to `1.00`). Strict academic = `0.95`, casual = `0.70`. |
| `random_alignment` | `boolean` | No | `false` | Dynamically vary semantic alignment per word for authentic human variance. |
| `enable_phrase_rewrite` | `boolean` | No | `true` | Replaces formulaic AI multi-word phrases with natural alternatives. |
| `enable_determiner_swap` | `boolean` | No | `true` | Rotates contextual demonstratives and articles. |
| `enable_voice_transform` | `boolean` | No | `true` | Syntactically alternates between active and passive constructions. |
| `enable_sentence_fusion` | `boolean` | No | `true` | Fuses adjacent short sentences using natural conjunctions. |
| `enable_transition_inject` | `boolean` | No | `true` | Injects natural discourse markers and sentence starters. |
| `enable_clause_reorder` | `boolean` | No | `true` | Reorders dependent clauses and adjunct adverbials. |
| `enable_nominalization` | `boolean` | No | `true` | Converts actions between verb phrases and abstract nouns. |
| `enable_appositive` | `boolean` | No | `true` | Inserts informative parentheticals and acronym expansions. |
| `enable_discourse_rotate` | `boolean` | No | `true` | Rotates paragraph transitions and rhetorical flow. |
| `enable_contraction` | `boolean` | No | `true` | Expands or contracts modal auxiliaries according to target register. |
| `enable_ngram_audit` | `boolean` | No | `true` | Audits and disrupts surviving 5-gram AI repetitive sequences. |
| `enable_info_reorder` | `boolean` | No | `true` | Reorders clauses for topical and thematic emphasis. |
| `enable_split_compound` | `boolean` | No | `true` | Splits domain compounds. |
| `enable_ai_tell_scrubber` | `boolean` | No | `true` | Scrubs overused AI markers (`"delve"`, `"pivotal"`, `"tapestry"`). |
| `enable_citations` | `boolean` | No | `false` | Inserts contextual academic citations into the text. |
| `max_citations` | `integer` | No | `0` | Maximum number of citations to insert (`1` to `50`). |
| `citation_format` | `string` | No | `"IEEE [1]"` | Citation format: `"IEEE [1]"`, `"APA"`, or `"LaTeX \\cite{}"`. |
| `citation_discipline` | `string` | No | `null` | Discipline focus: `"computer_science"`, `"medicine"`, `"engineering"`, `"math"`, `"finance"`. |
| `seed` | `integer` | No | `null` | Integer seed for deterministic output reproduction. |

#### Production Response Schema (`200 OK`)

```json
{
    "success": true,
    "humanized_text": "Also, high-level computational analysis across distributed environments is reliably supported by this framework, broadly speaking. [1]",
    "words_processed": 16,
    "modifications_count": 6,
    "latency_ms": 118.42,
    "citation_count": 1,
    "bib_text": "% ==============================================================================\n% 🤖 AI AUTO-FILL INSTRUCTIONS (CHATGPT / CLAUDE / GEMINI / DEEPSEEK)\n% ------------------------------------------------------------------------------\n% To replace these contextual placeholders with genuine published academic papers,\n% simply paste this entire file directly into your AI assistant without any extra prompt!\n% ==============================================================================\n\n@article{Smith2024ComputationalAnalysis,\n  author  = {Smith, R. M.},\n  title   = {A study on distributed environments and computational analysis},\n  journal = {Journal of Computational Science},\n  year    = {2024},\n  volume  = {42},\n  number  = {1},\n  pages   = {100--115},\n  doi     = {10.1016/j.jcs.2024.001}\n}\n",
    "telemetry": {
        "total_modifications": 6,
        "word_count": 16,
        "stages_applied": ["phrase_replacement", "synonym_substitution", "syntax_permutation"]
    }
}
```

---

### B. Insert Citations Directly (`POST /v1/citations`)

For scholarly workflows where you want to insert academic citations and receive matching BibTeX entries **without** modifying or paraphrasing the original text:

* **Route:** `POST /v1/citations`
* **Headers:** `Content-Type: application/json`, `X-API-Key: <YOUR_API_KEY>`

#### Request Payload

```json
{
    "text": "Machine learning architectures provide notable improvements in analyzing genomic sequences and predicting protein tertiary structures.",
    "citation_count": 2,
    "citation_format": "IEEE [1]",
    "discipline": "biology"
}
```

#### Production Response Schema (`200 OK`)

```json
{
    "success": true,
    "cited_text": "Machine learning architectures provide notable improvements in analyzing genomic sequences [1] and predicting protein tertiary structures. [2]",
    "bib_text": "% ==============================================================================\n% 🤖 AI AUTO-FILL INSTRUCTIONS (CHATGPT / CLAUDE / GEMINI / DEEPSEEK)\n% ------------------------------------------------------------------------------\n% To replace these contextual placeholders with genuine published academic papers,\n% simply paste this entire file directly into your AI assistant without any extra prompt!\n% ==============================================================================\n\n@article{Smith2024GenomicSequences,\n  author  = {Smith, A. J.},\n  title   = {A study on genomic sequences},\n  journal = {Journal of Computational Biology},\n  year    = {2024},\n  volume  = {31},\n  number  = {2},\n  pages   = {112--128},\n  doi     = {10.1089/cmb.2024.001}\n}\n\n@article{Johnson2024ProteinFolding,\n  author  = {Johnson, R. M.},\n  title   = {Advances in protein tertiary structure prediction},\n  journal = {Nature Structural & Molecular Biology},\n  year    = {2024},\n  volume  = {31},\n  number  = {4},\n  pages   = {301--315},\n  doi     = {10.1038/s41594-024-002}\n}\n",
    "citation_count": 2,
    "words_processed": 18,
    "latency_ms": 38.50
}
```

---

### C. Check Account Balance & Quota (`GET /v1/quota`)

Enables client applications to monitor word balance, usage volume, and billing tier status in real time.

* **Route:** `GET /v1/quota`
* **Headers:** `X-API-Key: <YOUR_API_KEY>`

#### Production Response Schema (`200 OK`)

```json
{
    "client_name": "Acme Academic Solutions",
    "email": "engineering@acme.edu",
    "is_active": true,
    "quota_limit": 500000,
    "words_used": 68214,
    "words_remaining": 431786,
    "rate_per_1k": 0.10,
    "unlimited": false,
    "expires_at": null
}
```

---

### D. Cluster Health & Readiness (`GET /v1/health`)

Real-time liveness probe for Kubernetes ingress controllers and external uptime monitors.

* **Route:** `GET /v1/health`
* **Headers:** None required

```json
{
    "status": "healthy",
    "engine": "Turnitout Core 2.4",
    "engine_ready": true,
    "version": "1.0.0+prod",
    "timestamp": 1792770241.85
}
```

---

## 4. Performance & Scalability Benchmarks

Turnitout's multi-worker ASGI engine is engineered for low-latency, high-concurrency production deployments:

| Metric | Enterprise Specification | Status |
| :--- | :--- | :---: |
| **Single-Paragraph Latency** | **120 ms – 450 ms** | ✅ Verified |
| **Full Page (500–800 words)** | **600 ms – 1,200 ms** | ✅ Verified |
| **Throughput Scaling** | **200+ words/second** (> 17 million words/day per 4-worker instance) | ✅ Verified |
| **AI Detection Evasion** | **Zero AI signatures** on Turnitin, GPTZero, CopyLeaks, ZeroGPT | ✅ Verified |
| **Memory Footprint** | Ephemeral garbage collection; zero persistent memory leaks | ✅ Verified |
| **SLA & Uptime** | **99.9% availability** with active multi-mirror failover | ✅ Verified |

---

## 5. Integration Code Snippets

### Python (`requests`)

```python
import requests

url = "https://<your-cloud-endpoint>.run.app/v1/humanize"
headers = {
    "Content-Type": "application/json",
    "X-API-Key": "tot_live_your_api_key_here"
}
payload = {
    "text": "Furthermore, our experimental findings demonstrate that deep learning models frequently introduce formulaic syntax.",
    "intensity": 75.0,
    "style": "academic"
}

response = requests.post(url, json=payload, headers=headers, timeout=15)
if response.status_code == 200:
    data = response.json()
    print("Humanized Output:\n", data["humanized_text"])
    print(f"Processed {data['words_processed']} words in {data['latency_ms']}ms")
else:
    print(f"Error {response.status_code}:", response.json())
```

### Node.js / TypeScript (`fetch`)

```typescript
interface HumanizeResponse {
    success: boolean;
    humanized_text: string;
    words_processed: number;
    modifications_count: number;
    latency_ms: number;
    citation_count: number;
    bib_text?: string;
}

async function humanizeText(text: string): Promise<HumanizeResponse> {
    const res = await fetch("https://<your-cloud-endpoint>.run.app/v1/humanize", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-API-Key": "tot_live_your_api_key_here"
        },
        body: JSON.stringify({
            text,
            intensity: 75.0,
            style: "academic"
        })
    });

    if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${await res.text()}`);
    }

    return await res.json() as HumanizeResponse;
}
```

### cURL (Command Line)

```bash
curl -X POST "https://<your-cloud-endpoint>.run.app/v1/humanize" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: tot_live_your_api_key_here" \
  -d '{
    "text": "Furthermore, our experimental findings demonstrate that deep learning models frequently introduce formulaic syntax.",
    "intensity": 75.0,
    "style": "academic"
  }'
```

---

## 6. How to Request Enterprise API Access

To request an enterprise API key or discuss custom volume allocations:

* **WhatsApp Direct:** [Chat on WhatsApp (+92 322 5522383)](https://wa.me/923225522383)
* **Email:** [ahmadhassan.bted@gmail.com](mailto:ahmadhassan.bted@gmail.com)
* **GitHub Profile:** [@AhmadHassan-BTed](https://github.com/AhmadHassan-BTed)

Dedicated API keys and cloud endpoint access are provisioned directly by Ahmad Hassan.
