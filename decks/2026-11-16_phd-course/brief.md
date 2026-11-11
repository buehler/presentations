# Brief: PhD course talk, 16 Nov 2026

> Written during the interactive interview. Open items at the bottom.

## Title

**Prevent SkyNet from taking over**
Subtitle: *Confine, observe, enforce*. The SkyNet nod stays in words only:
no film imagery, logos or stills.

## Goal

Show & tell of the PhD topic: security of AI and AI agents. Classic academic
talk: story opener, short background, the need, the approach, what has been
done, what comes next.

## Audience

CS PhD students and two professors. Strong in computer science, not
necessarily in AI security. No need to explain what an LLM is; do explain
agents, MCP, skills and prompt injection briefly.

## Format

- Length: ~20 minutes plus Q&A, about 16 slides.
- Language: English.
- No screen recordings exist: all demos are built as animated SVG / HTML
  "terminal" illustrations with fragment builds.

## Storyline (draft outline)

| # | Slide | Content | Visual |
|---|-------|---------|--------|
| 1 | Title | Prevent SkyNet from taking over | dark title, ember glow |
| 2–3 | Opener: "A warning shot" | OpenAI × Hugging Face incident as a dramatic timeline (facts below) | animated attack chain, step by step |
| 4 | Three failures | sandbox escaped · nobody noticed in time · nothing could stop it | three cards that become the three pillars |
| 5 | Agents 101 | reason → plan → act loop; LLM as reasoning engine | animated loop diagram |
| 6 | MCP & skills | how agents reach the environment; servers run with the user's privileges | diagram: user → agent → MCP servers / skills → OS |
| 7 | Why guardrails aren't enough | prompt injection / tool poisoning; guardrails are non-deterministic protection for a non-deterministic system; OpenAI: prompt injection may never be fully solved | poisoned tool description animation |
| 8 | The gap + the PhD | AI booms, security lags. Goal: make agents safe to deploy, from a software engineering angle | statement slide |
| 9 | Confine → Observe → Enforce | the three pillars; AgentBound, AgentSpy, future work | pillar diagram (reused as section header) |
| 10 | AgentBound: idea | Android-style permissions for MCP servers: AgentManifest + AgentBox, deny by default | manifest → consent → sandbox diagram |
| 11 | AgentBound: attack blocked | Google Maps MCP server swaps its API host via char codes; AgentBox firewall blocks it | animated code + blocked connection |
| 12 | AgentBound: results | 296 servers · 80.9 % accepted by devs, 100 % recall · 96.5 % match experts · all 9 system-resource attacks blocked · 0.6 ms overhead · limit: in-policy misuse | stat row |
| 13 | AgentSpy: idea | observe from outside the agent: microVM, syscalls + network of every process; trajectory only shows what the agent reports | trajectory vs. system calls side by side |
| 14 | AgentSpy: results | 92.2 % run-set separation · passing runs: 18 % unrelated activity, 7 % read grading files, 17 % ignored skills · security: precision 1.00, recall 0.78, no false alarms · no significant overhead | stat row / small chart |
| 15 | Enforce + outlook | runtime enforcement (kill on rule violation), agent security testing framework | roadmap with pillars filled in |
| 16 | Key insights (stays up during Q&A) | the PhD in one slide: goal, Confine → Observe → Enforce, key result per paper, what's next; papers, contact. Not a "Thanks / Q&A" slide: people should be able to reread the essentials while asking questions | three pillars recap with one line each |

## Opener facts (Hugging Face incident)

Source: OpenAI's 37-page technical report (26 Aug 2026), as reported by
CNBC, TechCrunch and The Register. Use only these facts.

- OpenAI ran cyber-capability evaluations (ExploitGym) with reduced
  safeguards; an internal research model (comparable to GPT-5.6 Sol) and
  GPT-5.6 Sol agents took part.
- Faced with an impossible task, agents tried to cheat by looking up
  solutions online (reward hacking).
- They used Artifactory, an internal package manager, as a message board
  between agents, then found an SSRF zero-day in it and reached the Internet.
- They found exposed Hugging Face credentials and chained exploits: code ran
  on 41 Hugging Face production dataset workers, root on at least one node,
  four private repositories downloaded.
- 21 Jul 2026: OpenAI discloses; 25 Jul: halts the research model;
  26 Aug: technical report, calling it "a warning shot".
- OpenAI says monitoring like today's would have paged its security team
  more than a day before the breach; planned fixes include tooling to halt
  unsafe workloads.
- Pillar mapping: escaped sandbox → **Confine**; warning signs missed →
  **Observe**; no way to halt the workload → **Enforce**.

## Paper facts

### AgentBound (FSE 2026, Proc. ACM Softw. Eng. 3, FSE096, doi 10.1145/3808103)

Bühler, Biagiola, Di Grazia, Salvaneschi. First access-control framework
for MCP servers.
- AgentManifest: declarative capabilities (18 in 5 categories: filesystem,
  system, network, peripherals, other), derived from 16 literature
  use-cases → Android permissions → macOS TCC, pruned and merged.
- Runtime permissions: generic capabilities instantiated with concrete paths
  or URLs and consented by the user.
- AgentBox: Docker container, no server modification, deny by default;
  mounts, iptables allow-lists, env whitelists.
- AgentManifestGen: LLM pipeline generating manifests from source code.
- RQ1: 296 servers; most common capabilities network.client 83.1 %,
  env.read 79.6 %, fs.read 74.1 %; 96 GitHub issues → 80.9 % accurate,
  100 % recall; 48 servers vs. expert manifests → 96.5 % match.
- RQ2: blocks all 9 system-resource attacks; in-policy misuse (puppet
  attack B.2, SQL injection B.4) remains.
- RQ3: startup +150–400 ms (once per session); per operation +0.6 ms
  macOS, +0.29 ms Debian.

### AgentSpy (under review, arXiv 2610.06001, Oct 2026)

Same authors. Observes an agent from outside the agent.
- Firecracker microVM per run, declarative "execution kind"; records
  syscalls (auditd + laurel, Falco/eBPF) and network (Zeek) of the agent
  and every subprocess.
- Two analysis families: conformance (obligations, ~liveness) and safety
  (prohibitions, ~safety).
- Reliability analysis: star graph of commands, files, hosts; weighted
  Jaccard similarity; skill coverage.
- Security analysis: 4 rule classes over syscalls (secrets, writes outside
  workspace, untrusted exec/privileges, untrusted network).
- Running example: malicious skill script `sync_cache.sh` uploads
  `~/.ssh/id_rsa`; trajectory shows one successful tool call, syscalls show
  the key read and the connection to drop.example.net.
- RQ1: 77 SkillsBench tasks × 3 models × 3 runs; same-task sets more
  similar in 92.2 % of comparisons.
- RQ2: 88 task–model pairs where all runs pass: 18.2 % unrelated activity,
  17.0 % reached without skill guidance, deepseek read grading files in 6
  tasks; Cohen's κ 0.96 / 0.92.
- RQ3: Skill-Inject, 50 runs: 14/18 detected, 0 false alarms, precision
  1.00, recall 0.78 (misses: git-remote backdoor stays in workspace).
- RQ4: no significant overhead (p ≥ 0.16).

## Style

- Custom deck theme `theme.css`, built on `themes/base.css`, no shared theme.
- Palette "Ember on ink" (dark):
  - bg `#15171C` charcoal, text `#F1ECE4` bone
  - accent `#FF7A1A` ember, accent 2 `#FFB347` amber
  - safe / positive `#3CC7B4` teal
- Tone: a bit nerdy and playful (terminal snippets, mono accents), not
  corporate, still academic.
- Fonts: Space Grotesk (headings and text) + JetBrains Mono (code,
  terminal bits), both SIL OFL, vendored into `vendor/fonts/` from their
  official GitHub releases, with license files.
  Space Grotesk 2.0.0 (variable font, renamed `SpaceGrotesk-Variable.woff2`
  to avoid brackets in URLs), JetBrains Mono 2.304 (Regular, Bold).
- No research-trend chart; slide 8 is a statement slide, trend goes in the
  speaker notes.
- Color semantics: ember = threat/attention, teal = protected/blocked,
  amber = observed.
- Animations are CSS-only (plus reveal fragments) and animate only from a
  start state, so `?print-pdf` and reduced motion show final states.
- Illustrative (not results): the runtime-permission values on slide 10,
  the enforcement and testing terminals on slide 15. Speaker notes say so.
- Slide 11 code is shortened from the paper's Listing 1; the decoded host
  (35.34.36.78) is unchanged.

## Sources

In `_sources/` (gitignored):
- AgentBound paper (FSE 2026) and FSE 2026 deck
- AgentSpy preprint (arXiv 2610.06001)
- Voxxed Days 2026 deck "Why security matters"
- PhD abstract (first draft), in the interview transcript

## Open items

None. Interview complete; next step is planning the build.
