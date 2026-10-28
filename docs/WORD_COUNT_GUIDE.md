# Guide: Restricting Word Count & Zero-Expansion Mode

> **For Academic Papers, Theses, and Assignments with Strict Word Ceilings**  
> Learn how to configure Turnitout's **Advanced Settings** to perform 100% deterministic AI-evasion and humanization with **exact 1-to-1 word count parity (zero net words added)**.

---

## 📌 Executive Summary (The 10-Second Fix)

When processing documents under a hard word limit:
1. Open the **`Advanced Transformation Settings & Protected Terms`** expander.
2. Keep **Synonym Swapping** `[x]` **ON** and set the **Synonym Alignment Probability** slider to **`0.85 – 0.90`**.
3. Turn `[ ]` **OFF** expansion toggles: **Transition Injection**, **Appositive Insertion**, **Conceptual Bridging**, and **Contractions Swapping**.
4. Click **Transform & Humanize**.

Your text will be humanized via strict 1:1 contextual substitution with **0 added words**.

---

## 1. Why Do Default Presets Increase Word Count?

AI detectors (such as Turnitin, GPTZero, and CopyLeaks) scan documents for **Burstiness**—the statistical variation in sentence length and syntactic complexity across paragraphs. Machine-generated text tends to have uniform, flat sentence lengths.

To naturally break this uniformity, Turnitout's default high-intensity presets inject:
* **Discourse Connectives (Transition Injection):** Phrases like *"Furthermore"*, *"In contrast"*, or *"Consequently"* (+2 to +4 words per sentence).
* **Explanatory Appositives (Appositive Insertion):** Informative parentheticals and context expansions (+5 to +15 words per occurrence).
* **Inter-Sentence Bridges (Conceptual Bridging):** Thematic connecting clauses (+10 to +25 words per paragraph).

While these additions maximize natural human flow, they can expand total text length by **10% to 25%** (often 50–100+ words across several paragraphs). 

For documents with rigid ceilings (e.g. 2,000 words maximum), this expansion must be restricted.

---

## 2. The Core Solution: 1-to-1 Synonym Swapping & Alignment Ratio

When running Turnitout with only **Synonym Swapping** enabled, the engine operates on a strict **1-to-1 token replacement model**:

```text
Original Word  ──▶  Context-Matched Synonym  ──▶  Net Word Change = 0
```

### The Synonym Alignment Probability Slider

Under the Synonym Swapping checkbox, adjust the **Synonym Alignment Probability** slider (range: `0.50` to `1.00`):

| Slider Value | Mode | Best Used For | Semantic Fidelity | Word Count Impact |
| :---: | :--- | :--- | :---: | :---: |
| **0.90 – 0.95** | **Strict Technical & Academic** | Theses, STEM manuscripts, medical, legal, and quantitative finance | Maximum (No drift) | **0 added words** |
| **0.80 – 0.85** | **Standard Balanced (Recommended)** | University essays, literature reviews, reports, and coursework | High (Natural flow) | **0 added words** |
| **0.70 – 0.75** | **Expressive / Conversational** | Opinion pieces, creative writing, blog posts, and informal prose | Moderate | **0 added words** |

> **Pro-Tip: "Randomize Alignment (Human Variation)" Checkbox**  
> Checking this box adds subtle, non-uniform human variance to the alignment score per word, mimicking the natural vocabulary shifts of authentic student drafting—while still keeping word count strictly 1-to-1.

---

## 3. Transformation Safety Matrix

Use this breakdown to configure the toggles inside **Advanced Transformation Settings & Protected Terms**:

| Transformation Feature | Word Count Impact | Status for Strict Limits | What It Does (User-Facing) |
| :--- | :---: | :---: | :--- |
| **Synonym Swapping** | **0 Words (1:1)** | ✅ **KEEP ON** | Replaces target words with contextually equivalent single words. |
| **Clause & Word Reorder** | **0 Words** | ✅ **KEEP ON** | Rearranges dependent clauses and adverbial order; zero new vocabulary. |
| **Determiner Swapping** | **0 Words** | ✅ **KEEP ON** | Alternates demonstratives and articles (e.g., *"this"* ↔ *"the"*). |
| **Information Reordering** | **0 Words** | ✅ **KEEP ON** | Reorders sentence elements for thematic focus without adding words. |
| **N-Gram Chain Breaking** | **0 Words** | ✅ **KEEP ON** | Audits and disrupts surviving 5-gram AI sequences with targeted swaps. |
| **Custom Protected Terms** | **0 Words** | ✅ **RECOMMENDED** | Locks domain keywords, author citations, and acronyms from alteration. |
| **Nominalization / Verbalization** | **± 1–2 Words** | ⚖️ **OPTIONAL** | Converts between verbs and abstract nouns; negligible count impact. |
| **Voice Transformations** | **± 2–4 Words** | ⚖️ **OPTIONAL** | Converts active/passive voice; minor auxiliary verb adjustments. |
| **Sentence Fusion** | **+ 1–3 Words** | ❌ **TURN OFF** | Fuses adjacent short sentences using conjunctions (*"and"*, *"whereas"*). |
| **Contractions Swapping** | **+ 1 Word / Exp** | ❌ **TURN OFF** | Expanding contractions (e.g., *"don't"* ➔ *"do not"*) adds 1 word each. |
| **Transition Injection** | **+ 2–4 Words / Sent** | ❌ **TURN OFF** | Injects discourse markers and transitional phrases. |
| **Appositive Insertion** | **+ 5–15 Words / Inst** | ❌ **TURN OFF** | Inserts parenthetical descriptions and contextual expansions. |
| **Conceptual Bridging** | **+ 10–25 Words / Para** | ❌ **TURN OFF** | Inserts inter-sentence thematic connectors. |
| **Discourse Rotation** | **Variable** | ❌ **TURN OFF** | Rotates rhetorical connectors between paragraphs. |

---

## 4. Ready-to-Use Profiles

### 🛡️ Profile A: "Strict Zero-Expansion" (Exact Word Match)
* **Goal:** Zero extra words added.
* **Settings:**
  * ✅ **Synonym Swapping** (Slider: `0.85` – `0.90`)
  * ✅ **Clause & Word Reorder**
  * ✅ **Determiner Swapping**
  * ✅ **Information Reordering**
  * ✅ **N-Gram Chain Breaking**
  * ❌ **Turn OFF:** Transition Injection, Appositive Insertion, Conceptual Bridging, Contractions Swapping, Sentence Fusion, Discourse Rotation.

### ⚖️ Profile B: "Academic Tolerance" (±1% to 2% Margin)
* **Goal:** Mild length variation for assignments with a standard ±10% margin.
* **Settings:**
  * Keep all Profile A settings **ON**.
  * ✅ **Nominalization / Verbalization** enabled.
  * ✅ **Voice Transformations** enabled.
  * ❌ Keep **Appositive Insertion** and **Conceptual Bridging** **OFF**.

---

## 5. Step-by-Step UI Walkthrough

1. **Open the Application:**  
   Launch any cluster mirror (e.g. [turnitout.streamlit.app](https://turnitout.streamlit.app/)) and select the **⚡ Plagiarism & AI Remover** page.

2. **Paste or Upload Text:**  
   Paste your text or upload your Word (`.docx`) or LaTeX (`.tex`) file.

3. **Expand Advanced Settings:**  
   Below the text area, expand:  
   `:material/tune: Advanced Transformation Settings & Protected Terms`

4. **Apply Profile Toggles:**  
   - Uncheck *Transition Injection*, *Appositive Insertion*, and *Conceptual Bridging*.
   - Verify *Synonym Swapping* is checked.
   - Adjust *Synonym Alignment Probability* to `0.85` or higher.

5. **Protect Key Terminology (Optional):**  
   If your text contains specialized vocabulary, acronyms, or proper names, enter them into the **Protected Terms** text box (comma-separated). They will be preserved 100% verbatim.

6. **Execute and Check Telemetry:**  
   Click **Transform & Humanize**. Once processed, expand the **Telemetry & Transformation Breakdown** to verify before and after word counts.

---

## 6. Official Cluster Mirrors

Turnitout is deployed across an 8-node cluster to guarantee zero downtime and bypass server throttling:

| Node | Access URL | Status |
| :--- | :--- | :---: |
| ⚡ **Server Node 1** | [turnitout1.streamlit.app](https://turnitout1.streamlit.app/) | 🟢 Active |
| 🚀 **Server Node 2** | [turnitout2.streamlit.app](https://turnitout2.streamlit.app/) | 🟢 Active |
| 🌟 **Server Node 3** | [turnitout3.streamlit.app](https://turnitout3.streamlit.app/) | 🟢 Active |
| 🔥 **Server Node 4** | [turnitout4.streamlit.app](https://turnitout4.streamlit.app/) | 🟢 Active |
| ✨ **Server Node 5** | [turnitout5.streamlit.app](https://turnitout5.streamlit.app/) | 🟢 Active |
| 💎 **Server Node 6** | [turnitout6.streamlit.app](https://turnitout6.streamlit.app/) | 🟢 Active |
| 🔮 **Server Node 7** | [turnitout7.streamlit.app](https://turnitout7.streamlit.app/) | 🟢 Active |
| ❤️ **Main Server (Heart)** | [turnitout.streamlit.app](https://turnitout.streamlit.app/) | 🟢 Active |

---

## 7. Need Direct Developer Assistance?

* 💬 **WhatsApp Direct Developer Support:** [Chat on WhatsApp (+92 322 5522383)](https://wa.me/923225522383)
* 🌐 **Official Website & Docs:** [https://ahmadhassan-bted.github.io/Turnitout-Humanizer/](https://ahmadhassan-bted.github.io/Turnitout-Humanizer/)
* 🐞 **Feature Requests & Bug Reporting:** [Submit a GitHub Issue](https://github.com/AhmadHassan-BTed/Turnitout-Humanizer/issues/new)
