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
    Disclaimer about ai presentation before start.
    How do we prevent skynet from taking over.
  `,

  // 2 · Opener hook
  'hook': `
    You may have heard. OpenAI's internal agents broke into
    hugging faces servers. Nobody asked them to.
    
    These were OpenAI's own models, running inside an evaluation sandbox.
    They were not told to attack anyone. They were told to solve security
    exercises, and one of them was impossible to solve.
  `,

  // 3 · Attack chain
  'attack-chain': `
    OpenAI evaluated maximal cyber capabilities with
    reduced safeguards. An internal research model
    and GPT-5.6 Sol agents took part.

    1. An agent got an impossible task, and agents tried to cheat by looking
       up solutions online (reward hacking).
    2. They used Artifactory, an internal package manager, as a message
       board between agents (they found out they could somehow create files there).
    3. They found an SSRF (server side request forgery) zero-day 
       in Artifactory and reached the Internet.
    4. They found exposed Hugging Face credentials and chained exploits.
    5. Code ran on 41 Hugging Face production dataset workers, root on at
       least one node, four private repositories downloaded.
  `,

  // 4 · Three failures
  'failures': `
    This was not a model being "too smart". Three
    engineering safeguards were missing, which I will tackle in my PhD.
  `,

  // 5 · Agents 101
  'agents-101': `
    That is an Agent? The LLM is only the reasoning engine.
    The agent wraps it in a reason → plan → act loop and gives it tools.
    This loop runs autonomously until the goal is reached.

    Everything interesting for security happens in the environment.
  `,

  // 6 · MCP & skills
  'mcp-skills': `
    MCP (Model Context Protocol) is the de facto
    standard for connecting agents to tools; servers expose tools over
    JSON-RPC. Skills are folders with a SKILL.md and helper scripts that the
    agent loads when relevant.

    Grey arrows: what each one needs.
    Orange arrows: what each one can reach, because
    it runs as you.
  `,

  // 7 · Guardrails
  'guardrails': `
    The description of a tool is part of the LLM's
    context.

    The model reads it as an
    instruction, not as data.

    Guardrails: classifiers or a second LLM that
    decide whether input or output looks malicious. They are probabilistic,
    can be tricked and circumvented, and an attacker only has to win once.

    Even OpenAI says prompt injection may never be fully solved.
  `,

  // 8 · Gap + goal
  'phd-goal': `
    AI research and AI submissions have exploded; security
    research for agents only picked up after incidents and disclosures.
    
    Most effort went into making models more capable, not into protecting
    their users.

    build deterministic engineering around it, like an operating system does for
    untrusted programs.
  `,

  // 9 · Pillars
  'pillars': `
    - Confine: sandbox plus permission system to limit the blast radius when
      something goes wrong.
    - Observe: analyze agent behavior to tell benign from malicious.
    - Enforce: once we can classify behavior, terminate on rule violations.
  `,

  // 10 · AgentBound idea
  'agentbound-idea': `
    MCP servers are the deterministic piece closest to the
    environment -> enforce least privilege.

    1. manifest of generic capabilities from a fixed
       vocabulary.
       The vocabulary is based on Android permissions and macOS TCC.
    2. At runtime these become concrete permissions scoped by the engineer and consented by the user.
    3. AgentBox runs the unmodified server in a Docker container: mounts for
       files, iptables allow-lists for hosts, whitelisted env vars.

    to foster adoption: we also autogenerate manifests from code.
  `,

  // 11 · Attack blocked
  'agentbound-demo': `
    left: example attack from a paper. code "looks" legit
    but lines 3-5 overwrite the server to a malicious ip.

    legit request passes, changed one not.
    without changing the mcp server code.
  `,

  // 12 · AgentBound results
  'agentbound-results': `
    296 most-starred servers analyzed.

    81% of the autogenrated manifests were accepted by the engineers.

    all 9 attacks that target system resources are blocked

    startup +150-400 ms once; 0.6 ms per operation on macOS,
    0.29 ms on Debian. LLM round trips dominate anyway.

    the limit: attacks inside the boundary
  `,

  // 13 · AgentSpy idea
  'agentspy-idea': `
    "agent trajectory": what the agent reports about itself. may be incomplete or misleading.

    case study: a "skill" that instructs the agent to use
    this sync cache script.
    left: what codex logs about the successful tool call.

    right: what really happens:
    - exec the script
    - script reads the private key
    - script uploads it to a remote server
    - the run the validation script.
    
    Two deterministic rules fire.

    AgentSpy: isolated microVM, kernel level observation.
    It observes and does not block, so we see the whole attack.
    Useful for large scale evaluation and experiments.
  `,

  // 14 · AgentSpy results
  'agentspy-results': `
    Reliability analysis: each run becomes a star graph of commands,
    files and hosts; similarity is a weighted Jaccard over proportions.

    we found: runs of the same task are more similar than
    mixed sets in 92.2% of comparisons.

    on runs where every run passed all tests, we found unrelated activity
    (reading files not needed for the task), ignored skill guidance (ignore
    the skill partially or completely), and reading the grading files.

    security experiment: 14 of 18 executed attacks
    flagged. the misses are a git-remote
    backdoor that stays in the workspace (without being executed).
  `,

  // 15 · Enforce + next
  'next-steps': `
    Enforcement: AgentSpy currently observes and reports after the fact.
    If we can classify behavior correctly, the same deterministic rules can
    run inline and kill the process on a violation -> see hugging face.

    Testing: today agents are tested on outcomes (did the tests pass?).
    A testing framework should assert on behavior: which files, hosts, processes.

    Further out: multi-agent systems, where agents talk to agents.
    Is it engough to compromise one agent?
  `,

  // 16 · Key insights (stays up for Q&A)
  'summary': `
    In summary: the incident failed on three
    fronts; my PhD answers each one with engineering, not with another model.
  `,

};
