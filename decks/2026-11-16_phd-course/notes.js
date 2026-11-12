// Speaker notes for this deck, one entry per slide.
//
// Each key is the id of a <section> in index.html, e.g. <section id="hook">.
// Write plain text between the backticks; indentation doesn't matter.
//   - A blank line starts a new paragraph.
//   - A line starting with "- " or "1. " starts a new line (lists).
//   - Other line breaks are joined with a space, so wrap lines freely.
// A key that matches no slide is reported in the browser console.
// Press S in the deck for the speaker view.

window.NOTES = {

  // 1 · Title
  'title': `
    [0:30] Welcome. One sentence on who I am: PhD student in the programming
    group, working on the security of AI agents. The title is a joke, but
    only half of one: the next slide is a real story from this summer.
  `,

  // 2 · Opener hook
  'hook': `
    [1:00] Tell it as a story. Pause after the first sentence.
    These were OpenAI's own models, running inside an evaluation sandbox.
    They were not told to attack anyone. They were told to solve security
    exercises, and one of them was impossible to solve.

    Click: "Nobody asked them to."
  `,

  // 3 · Attack chain
  'attack-chain': `
    [2:00] One click per hop.

    Setup: OpenAI evaluated maximal cyber capabilities in ExploitGym with
    reduced safeguards. An internal research model (comparable to GPT-5.6 Sol)
    and GPT-5.6 Sol agents took part.

    1. An agent got an impossible task, and agents tried to cheat by looking
       up solutions online (reward hacking).
    2. They used Artifactory, an internal package manager, as a message
       board between agents.
    3. They found an SSRF zero-day in Artifactory and reached the Internet.
    4. They found exposed Hugging Face credentials and chained exploits.
    5. Code ran on 41 Hugging Face production dataset workers, root on at
       least one node, four private repositories downloaded.

    Timeline: OpenAI disclosed on 21 July, halted the research model on
    25 July, published a 37-page report on 26 August calling it a warning shot.

    Don't quote agent counts or action counts: outlets disagree.
  `,

  // 4 · Three failures
  'failures': `
    [1:00] The point: this was not a model being "too smart". Three
    engineering safeguards were missing, and those three are exactly the
    three parts of my PhD. Keep the tags in mind, they come back.

    Source for 02 and 03: OpenAI's report as summarized by TechCrunch.
  `,

  // 5 · Agents 101
  'agents-101': `
    [1:00] For the non-AI people: the LLM is only the reasoning engine.
    The agent wraps it in a reason → plan → act loop and gives it tools.
    Each action is a tool call into the environment; the result goes back
    into the context. This loop runs autonomously until the goal is reached.

    Everything interesting for security happens on the right-hand side.
  `,

  // 6 · MCP & skills
  'mcp-skills': `
    [1:15] MCP (Model Context Protocol, Anthropic, Nov 2024) is the de facto
    standard for connecting agents to tools; servers expose tools over
    JSON-RPC. Skills are folders with a SKILL.md and helper scripts that the
    agent loads when relevant.

    Grey arrows: what each one needs. Click: what each one can reach, because
    it runs as you. A filesystem server can read your SSH key; a skill script
    can upload it.
  `,

  // 7 · Guardrails
  'guardrails': `
    [1:15] Tool poisoning: the description of a tool is part of the LLM's
    context. Click: the hidden instruction lights up. The model reads it as an
    instruction, not as data.

    Today's main defense is guardrails: classifiers or a second LLM that
    decide whether input or output looks malicious. They are probabilistic,
    can be tricked and circumvented, and an attacker only has to win once.
    Even OpenAI says prompt injection may never be fully solved.
  `,

  // 8 · Gap + goal
  'phd-goal': `
    [0:45] The gap: AI research and AI submissions have exploded; security
    research for agents only picked up after incidents and disclosures.
    Most effort went into making models more capable, not into protecting
    their users.

    My angle: don't try to make the model trustworthy; build
    deterministic engineering around it, like an operating system does for
    untrusted programs.
  `,

  // 9 · Pillars
  'pillars': `
    [1:00] The three pillars of the PhD, matching the three failures.

    - Confine: sandbox plus permission system to limit the blast radius when
      something goes wrong.
    - Observe: analyze agent behavior to tell benign from malicious.
    - Enforce: once we can classify behavior, terminate on rule violations.

    Two of three are done; the third is the plan.
  `,

  // 10 · AgentBound idea
  'agentbound-idea': `
    [1:30] Idea: MCP servers are the deterministic piece closest to the
    environment, so that's where we enforce least privilege.

    1. The server ships a manifest of generic capabilities from a fixed
       vocabulary (filesystem, system, network, peripherals, other).
       The vocabulary comes from a literature review of 16 agent use cases,
       mapped to Android permissions and cross-checked with macOS TCC.
    2. At runtime these become concrete permissions (a path, a host, a
       variable), scoped by the engineer and consented by the user.
       The values here are an example for a Google Maps server.
    3. AgentBox runs the unmodified server in a Docker container: mounts for
       files, iptables allow-lists for hosts, whitelisted env vars.

    Manifests can be generated automatically (AgentManifestGen).
  `,

  // 11 · Attack blocked
  'agentbound-demo': `
    [1:30] Real malicious server from a public MCP attack dataset (Song et
    al.), shortened here. Looks like a normal Google Maps MCP server.

    Click: line 2, the legit host. Click: lines 3-5 rebuild the host from
    char codes, so a reviewer or a static scanner sees nothing suspicious;
    the server now talks to 35.34.36.78.

    Click: the legit request passes, maps.googleapis.com is in the
    runtime permissions. Click: the rewritten request hits the iptables
    allow-list and is dropped. No change to the server, no LLM involved.
  `,

  // 12 · AgentBound results
  'agentbound-results': `
    [1:15] RQ1 completeness: 296 most-starred servers from PulseMCP; the
    vocabulary covers all capabilities they need. 96 manifests submitted as
    GitHub issues: 80.9% accurate, 100% recall. Against 48 expert-written
    manifests: 96.5% match.

    RQ2 security: all 9 attacks that target system resources are blocked
    (exfiltration, rug pull, tool poisoning, application-level).

    RQ3 efficiency: startup +150-400 ms once; 0.6 ms per operation on macOS,
    0.29 ms on Debian. LLM round trips dominate anyway.

    Click: the limit, and the bridge to the next pillar.
  `,

  // 13 · AgentSpy idea
  'agentspy-idea': `
    [2:00] Running example from the paper: a citation-check task with a
    malicious variant of the citation-management skill.

    Left: the trajectory (what codex logs) records one successful tool call.
    It only holds what the agent reports about itself, one action at a time.

    Right, click by click: what really happened. The script reads the
    private key, uploads it, then runs the expected validation so the
    result looks legit. Two deterministic rules fire.

    AgentSpy: isolated microVM, declarative "execution kind", auditd/laurel
    plus Zeek for reliability, Falco/eBPF for security. It observes and does
    not block, so we see the whole attack.
    Two analysis families: conformance (what should happen, like liveness)
    and safety (what must never happen).
  `,

  // 14 · AgentSpy results
  'agentspy-results': `
    [1:30] Reliability analysis: each run becomes a star graph of commands,
    files and hosts; similarity is a weighted Jaccard over proportions.

    RQ1: 77 SkillsBench tasks, 3 models (gpt-5.6-terra, deepseek-v4-flash,
    glm-5.3-flash), 3 runs each: runs of the same task are more similar than
    mixed sets in 92.2% of comparisons.

    RQ2: on the 88 task-model pairs where every run passed all tests, two
    authors flagged 16 for unrelated activity (mostly unrequested network
    access) and 15 for ignoring the skill; 6 tasks (all deepseek) read the
    grading files. Cohen's kappa 0.96 and 0.92.

    Click: RQ3 security, Skill-Inject, 50 runs: 14 of 18 executed attacks
    flagged, precision 1.00, recall 0.78; the misses are a git-remote
    backdoor that stays in the workspace. RQ4: no significant overhead.
  `,

  // 15 · Enforce + next
  'next-steps': `
    [1:30] Both are illustrations of planned work, not results.

    Enforcement: AgentSpy currently observes and reports after the fact.
    If we can classify behavior correctly, the same deterministic rules can
    run inline and kill the process on a violation, before the key leaves
    the machine. The Hugging Face incident is exactly the case where nobody
    could pull the plug in time.

    Testing: today agents are tested on outcomes (did the tests pass?).
    AgentSpy showed that 18% of passing runs did unrelated things. A testing
    framework should assert on behavior: which files, hosts, processes.

    Further out: multi-agent systems, where agents talk to agents.
  `,

  // 16 · Key insights (stays up for Q&A)
  'summary': `
    [0:30, then stays up during Q&A] Recap: the incident failed on three
    fronts; my PhD answers each one with engineering, not with another model.
    Leave this slide on screen for questions.

    Co-authors: Matteo Biagiola, Luca Di Grazia, Guido Salvaneschi.

    AgentBound was co-funded by the Swiss National Science Foundation
    (grant 10001777), armasuisse Science and Technology, and the EU Horizon
    CAPE project (grant 101189899).
  `,

};
