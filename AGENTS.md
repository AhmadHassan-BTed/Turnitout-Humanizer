# Turnitout-Core: Developer & Agent Runbook

> **CRITICAL FOR ALL DEVELOPERS & AI AGENTS**: Read this document before making any code modifications or deployments. It contains the complete architectural context, hard-won operational gotchas, configuration rules, and the multi-cluster synchronization protocol.

---

## 1. Project Overview & Multi-Cluster Architecture

Turnitout-core is a deterministic, privacy-first document humanization and AI-detection evasion engine supporting in-place processing of LaTeX (`.tex`), Word (`.docx`), Markdown (`.md`), Code (`.py`), and Plain Text.

To guarantee high availability and bypass Streamlit Cloud CPU/RAM throttling during viral spikes, the application is deployed across a **8-node cluster** spanning seven separate GitHub accounts and Streamlit Cloud instances:

| Node | GitHub Repository Remote | Live URL | Purpose |
| :--- | :--- | :--- | :--- |
| **Main Server (Heart)** | `origin` (`AhmadHassan-BTed/Turnitout-core`) | `turnitout.streamlit.app` | Resilient cluster anchor & active heart (offloads 85%+ direct traffic) |
| **Worker Mirror 1** | `node1` (`Turnitout-1/Turnitout-core`) | `turnitout1.streamlit.app` | High-speed dedicated evasion worker node |
| **Worker Mirror 2** | `node2` (`Turnitout-2/Turnitout-core`) | `turnitout2.streamlit.app` | High-speed dedicated evasion worker node |
| **Worker Mirror 3** | `node3` (`turnitout3/Turnitout-core`) | `turnitout3.streamlit.app` | High-speed dedicated evasion worker node |
| **Worker Mirror 4** | `node4` (`Turnitout4/Turnitout-core`) | `turnitout4.streamlit.app` | High-speed dedicated evasion worker node |
| **Worker Mirror 5** | `node5` (`turnitout5/Turnitout-core`) | `turnitout5.streamlit.app` | High-speed dedicated evasion worker node |
| **Worker Mirror 6** | `node6` (`turnitout6/Turnitout-core`) | `turnitout6.streamlit.app` | High-speed dedicated evasion worker node |
| **Worker Mirror 7** | `node7` (`turnitout7/Turnitout-core`) | `turnitout7.streamlit.app` | High-speed dedicated evasion worker node |

- **Public Marketing & Documentation Website**:
  Hosted at `https://github.com/AhmadHassan-BTed/Turnitout-Humanizer` (`docs/` branch deployed to GitHub Pages). Features client-side cluster load balancing in `docs/cluster-balancer.js` with weighted distribution routing ~90% of traffic across the 7 worker mirrors and ~10% to the main server heart.

---

## 2. Universal Push Protocol (Deploying Live to All Nodes)

> ⚠️ **RULE**: NEVER push to `origin` alone. Code changes must ALWAYS be pushed to all 8 cluster repositories so mirrors remain 100% in sync.

### Single-Command Sync
```bash
./scripts/sync_cluster.sh
```
*Fast push (skipping test suite rerun):*
```bash
./scripts/sync_cluster.sh --no-verify
```
*Direct Git command:*
```bash
git push all main
```

### New Machine / PC Setup
When cloning this repository on a new computer:
1. Ensure SSH keys for `Turnitout-1` (`~/.ssh/id_ed25519_node2`) and `Turnitout-2` (`~/.ssh/id_ed25519_node3`) are present with `chmod 600`. Node 3 (`turnitout3`) uses collaborator access via GitHub credentials.
2. Run the automated remote configuration script:
   ```bash
   ./scripts/setup_cluster_sync.sh
   ```
   This configures `~/.ssh/config` host aliases and sets up the combined `all` push remote automatically.

---

## 3. Configuration & Single Source of Truth

**ALL settings are maintained in a single JSON file: [`configs/global_config.json`](file:///home/leech/Projects/Turnitout-core/configs/global_config.json)**.
Do **NOT** create separate JSON config files for sub-features.

### A. VIP / Compensation Whitelist (`whitelisted_users`)
Users listed here **bypass all repository star, follow, and verification gates completely**:
```json
{
  "whitelisted_users": [
    "username1",
    "friend_github_handle",
    "vip_user_k8x9m2"
  ]
}
```
- Case-insensitive and URL-tolerant (e.g., `octocat`, `OctoCat`, and `https://github.com/octocat` all match).
- Automatically writes persistent auth cookies and localStorage upon entry so returning VIP visitors stay permanently unlocked.
- *Private Alternative:* You can also define VIPs in Streamlit Secrets (`WHITELISTED_USERS = ["username1"]`) or in Python code via `DEFAULT_WHITELISTED_USERS` in `src/textpipe/auth/verifier.py`.

### B. High-Demand Traffic Offloading (`traffic_balancing`)
Controls whether the main server offloads ~85% of incoming unauthenticated direct traffic to Worker Mirrors 1, 2 & 3:
```json
{
  "traffic_balancing": {
    "enable_offload": true,
    "offload_percentage": 85,
    "worker_nodes": [
      "https://turnitout1.streamlit.app/",
      "https://turnitout2.streamlit.app/",
      "https://turnitout3.streamlit.app/"
    ]
  }
}
```
- **Normal Operations**: Set `"enable_offload": false`. All users access the main server directly.
- **Viral / High Demand Spikes (Active Mode)**: Set `"enable_offload": true`. 85%+ of direct visitors receive the High Demand redirect card immediately, offloading work to the 3 mirrors and preventing main server OOM crashes.
- **Developer Preview**: You can test/preview the offload card anytime by appending `?test_card=1` to the URL regardless of the flag state.

---

## 4. Critical Architectural Gotchas & Invariants

### 🚨 1. Python 3.14 `KeyError` & File Watcher Invariant
Streamlit Cloud operates on **Python 3.14.8** with multi-threaded runners.
- In Python 3.14, `importlib._bootstrap._load_unlocked:949` executes `module = sys.modules.pop(spec.name)`.
- If Streamlit's `LocalSourcesWatcher` runs in production, it executes `del sys.modules[...]` when files are touched or reloaded, causing fatal `KeyError` crashes in `_load_unlocked`.
- **MANDATORY**: Keep file watchers disabled in [`.streamlit/config.toml`](file:///home/leech/Projects/Turnitout-core/.streamlit/config.toml):
  ```toml
  [server]
  fileWatcherType = "none"
  runOnSave = false

  [runner]
  fastReruns = false
  ```

### 🚨 2. No Eager Circular Imports in `src/textpipe/core/__init__.py`
- `src/textpipe/core/__init__.py` must remain completely clean (docstrings only).
- **NEVER** import transformer stages, linguistic alignment engines, or syntax modules inside `textpipe/core/__init__.py`. Doing so triggers a circular import loop with `rules.py` and `config.py` that corrupts `sys.modules`.

### 🚨 3. Strict Lazy Model Loading
- **NEVER** import spaCy (`en_core_web_sm`), WordNet, lemminflect, wordfreq, or orchestrators at the top level of `streamlit_app.py` or before user authentication.
- Heavy models consume ~400MB RAM and 2-3 seconds of CPU on cold start.
- `streamlit_app.py` MUST start with:
  ```python
  st.set_page_config(...)
  from textpipe.ui.common import render_traffic_offload_guard
  render_traffic_offload_guard()
  ```
  This ensures offloaded visitors halt via `st.stop()` in under 15ms with 0MB memory allocated.
- Heavy pages are imported dynamically in the page router only after star verification or cookie auth passes.

---

## 5. Local Development & Testing

- **Virtual Environment**: `.venv`
- **Start Local Server**:
  ```bash
  .venv/bin/streamlit run streamlit_app.py --server.port 8501
  ```
- **Run Fast Validation Tests**:
  ```bash
  .venv/bin/pytest tests/core/test_whitelist.py tests/linguistics/test_synonym_alignment.py
  ```
- **Automated Streamlit App Test**:
  ```python
  from streamlit.testing.v1 import AppTest
  at = AppTest.from_file("streamlit_app.py")
  at.query_params["test_card"] = "1"
  at.run()
  assert not at.exception
  ```

---

## 6. Footer & External Integrations
The application footer is rendered by `render_footer()` in [`src/textpipe/ui/common.py`](file:///home/leech/Projects/Turnitout-core/src/textpipe/ui/common.py):
- Contains author attribution to **Ahmad Hassan**.
- Prominently guides users to test their output:
  > 🔍 **Verify AI Content:** Paste your paragraph [**here on QuillBot AI Content Detector**](https://quillbot.com/ai-content-detector) to check the AI content of it.
- Rendered on the lock screen and at the bottom of all unlocked humanizer modules.
