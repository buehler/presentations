# Brief: Executive webinar on AI agent security (AgentBound)

> Written by the agent from the interactive session on 18 Nov 2026. Sources:
> the FSE 2026 talk `2026-07-FSE-agentbound.pptx` and the user's simplified
> draft `webinar_simplified_FSE.pptx`.

## Title

**Securing AI Agents**
Subtitle: *Why autonomous AI needs boundaries, and how to set them*

## Goal

A simplified, non-research version of the FSE AgentBound talk. It works as
a webinar for executive continuing education and advertises continuing
education on AI and agent security. Executives should leave knowing why
agents are a new risk, why guardrails alone don't help, what a boundary
(least privilege, deny by default) looks like, and what to do now.

## Audience

Executives and managers in continuing education. Not technical: no research
questions, no methodology, explain MCP and prompt injection in plain words.

## Format

- Language: English.
- Length: ~20 minutes plus Q&A, 14 slides.
- Technical depth: minimal code. One short poisoned-tool snippet is the
  "aha" moment; everything else is diagrams, plain language and a few key
  numbers.
- Closing: GuardiAgent (guardiagent.com, QR) + paper (QR, DOI, ACM badges)
  + contact. It stays up during Q&A. No program advert slide.

## Style

Local HSG theme in `theme.css`, based on the two PPTX files:
- Title slide: top half solid HSG green (#00802F), white centered title,
  speaker on the white half, HSG logo bottom right.
- Content slides: white, centered heading with a green subtitle line, green
  HSG logo bottom left, slide number bottom right.
- Font: Aptos if installed (Office font), else Helvetica/Arial. JetBrains Mono
  (vendored) for code.
- Red (#C0392B) only for threats and "deny".

## Storyline

| # | Slide id | Content |
|---|----------|---------|
| 1 | title | Securing AI Agents, speaker, HSG, based on AgentBound (FSE 2026) |
| 2 | agents-act | From answers to actions: generative vs. agentic AI (figure from FSE deck) |
| 3 | mcp | Agents plug into everything: MCP as universal connector (figure) |
| 4 | same-privileges | Tools run with the user's rights; no boundary (figure) |
| 5 | incidents | Two headlines: AI coding tool wiped a database; Antigravity deleted a drive |
| 6 | tool-poisoning | Poisoned tool description stealing the SSH key (code, two steps) |
| 7 | guardrails | Statement: asking an AI to behave is not security; limiting what it can do is |
| 8 | app-permissions | Phone analogy: declare, consent, enforce |
| 9 | agentbound | Architecture: AgentManifest + AgentBox around the tool |
| 10 | deny-by-default | Allow declared resource, deny everything else |
| 11 | results | 296 tools · 96.5 % match experts · 9/9 attacks blocked · 0.6 ms |
| 12 | limits | What a boundary stops and what it doesn't (in-policy misuse) |
| 13 | takeaways | Four actions for leaders |
| 14 | closing | GuardiAgent, paper, contact (stays up during Q&A) |

Dropped from the FSE talk for this audience: capability-vocabulary
derivation, research questions, efficiency chart, preventable vs.
non-preventable attack code, industry landscape (AWS AgentCore, OpenAI
sandboxes); the last one can come back as an extra slide if time allows.

## Facts used (AgentBound, Proc. ACM Softw. Eng. 3, FSE 2026, doi 10.1145/3808103)

Bühler, Biagiola, Di Grazia, Salvaneschi.
- 296 real-world MCP servers; manifests generated automatically; 80.9 %
  accepted by developers, 100 % recall; 96.5 % match with expert manifests.
- Blocks all 9 system-resource attacks; in-policy misuse remains.
- Overhead: ~0.6 ms per operation; one-time startup 150–400 ms.
- Artifacts: ACM Available and Reusable badges. Open source at
  guardiagent.com.

## Open items

- Event name and date for the title slide.
- Whether to add a slide advertising a specific continuing-education program.
