# Turnitout Architecture & Rule Management Guidelines

This document outlines the strict coding and design constraints established for this repository. All developers contributing to the project must adhere to these guidelines.

## 1. Decoupling Words, Topics, and Dictionaries from Source Code

**CRITICAL RULE**: Do not define or hardcode any lists of words, synonym dictionaries, adverbs, helper verbs, conjunctions, topic dictionaries, or regex pattern lists directly inside Python source files (e.g. `citation_engine.py`, `similarity_evasion.py`, `ai_evasion.py`, `modifier.py`, etc.).

### Rationale
* **Asset Decoupling**: Keep language, parsing data, and topic taxonomy completely separate from core processing code.
* **Easy Maintenance**: Content adjustments and new academic disciplines can be added directly in JSON files under the `rules/` directory without editing source code.
* **Architecture Integrity**: Ensures that the pipeline code focuses strictly on logic, flow, and parsing, rather than linguistic or topic databases.

---

## 2. Hierarchical Academic Discipline Taxonomy (`rules/academic/taxonomy/`)

All academic topics, research sub-fields, author pools, and prestigious journal mappings must reside in dedicated subfolders organized by discipline:

```
rules/academic/taxonomy/
├── computer_science/
│   ├── artificial_intelligence.json
│   ├── cybersecurity.json
│   ├── software_engineering.json
│   └── systems_networking.json
├── engineering_physics/
│   ├── fluid_dynamics.json
│   └── signal_processing.json
├── mathematics_statistics/
│   ├── differential_equations.json
│   └── numerical_analysis.json
├── quantitative_finance/
│   ├── option_pricing.json
│   └── risk_modeling.json
└── medical_life_sciences/
    ├── bioinformatics.json
    └── genomics.json
```

The dynamic rules loader (`rules.py`) uses a recursive directory walker to load all JSON files across all discipline subfolders into `ACADEMIC_TAXONOMY`.

---

## 3. JSON Prompt Metadata & Rule Formatting

All JSON rule files and taxonomy files must contain a `__prompt__` metadata block incorporating role definition, task rules, and strict negative prompting for future AI agents or automated contributors:

### Dictionary Mappings (JSON Objects)
For JSON files structured as objects/dictionaries:
```json
{
  "__prompt__": "Role: Syntactic Variator...\nRules:\n- ...",
  "a": ["a certain", "a given"]
}
```

### Word Lists & Taxonomy Arrays (JSON Arrays)
For JSON files structured as lists/arrays (e.g., `qualifiers.json`, `artificial_intelligence.json`), the **first element** (index 0) of the array must be an object containing the `__prompt__` key:
```json
[
  {
    "__prompt__": "Role: Expert Academic Editor...\nTask: Define sub-fields, concepts, keyword triggers, author pools, and prestigious journals...\nNegative Prompting (Strict Alignment):\n- Do NOT include casual, non-academic, or informal terms."
  },
  {
    "subfield_id": "machine_learning_deep_learning",
    "subfield_name": "Machine Learning & Deep Neural Networks",
    "topics": [...]
  }
]
```
The dynamic rules loader automatically filters out the `__prompt__` key/element during import.

---

## 4. Dynamic Rule Loading in Python

All JSON rule files are loaded dynamically inside `src/turnitout/core/rules.py`:

```python
from turnitout.core.rules import ACADEMIC_TAXONOMY, ACADEMIC_GENERAL_TOPICS
```

---

## 5. UI & Citation Engine Decoupling

* **Citation Engine**: Must be 100% decoupled from Streamlit or UI dependencies. All UI logic belongs in `src/turnitout/ui/`.
* **Citation Count Field**: Single `Citation Count` field supports contextual auto-detection (`Auto`) or exact integer counts.
* **In-App Feedback Routing**: Internal buttons navigate users to the `Feature Request & Bug Reporter` page instead of raw external links.
