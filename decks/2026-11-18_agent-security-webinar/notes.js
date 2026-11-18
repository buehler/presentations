// Speaker notes for this deck, one entry per slide.
//
// Each key is the id of a <section> in index.html, e.g. <section id="mcp">.
// Write plain text between the backticks; indentation doesn't matter.
//   - A blank line starts a new paragraph.
//   - A line starting with "- " or "1. " starts a new line (lists).
//   - Other line breaks are joined with a space, so wrap lines freely.
// Text is shown as-is (no HTML). A key that matches no slide is reported in
// the browser console. Press S in the deck for the speaker view.

window.NOTES = {

  // Title
  'title': `
    Welcome. Introduce yourself: PhD researcher at the University of St.Gallen,
    working on the security of AI agents.

    The webinar is based on our paper AgentBound, published at FSE 2026 with
    Matteo Biagiola, Luca Di Grazia and Guido Salvaneschi. Today: no research
    details, but what it means for organisations that start using AI agents.
  `,

  // From answers to actions
  'agents-act': `
    Generative AI: you ask, it answers, you decide what to do with the answer.

    Agentic AI: the language model is the reasoning engine, and the agent acts
    by itself: it uses tools, edits files, runs commands. It feels like Star
    Trek: "Computer, do this and that."

    The important shift for leaders: the AI no longer just advises, it acts on
    your systems.
  `,

  // MCP
  'mcp': `
    To act, agents need connections to the outside world. In November 2024,
    Anthropic introduced the Model Context Protocol (MCP), because there was no
    standard for how agents talk to their environment.

    Think of it as USB-C for AI: a client inside the agent talks to MCP
    servers, and each server offers tools such as email, GitHub, databases or
    the file system. Thousands of such servers exist today, many written by
    third parties.
  `,

  // The keys to everything
  'same-privileges': `
    Here is the problem. A local MCP server runs with the same rights as the
    application that starts it, so with your rights. If you are an admin, the
    tool is an admin.

    VS Code, Codex or Claude Code run as your user. Today there is no boundary
    between a third-party tool and everything you can access.
  `,

  // It is already happening
  'incidents': `
    Two real headlines.

    - An AI coding agent wiped a company's production database (and its
      backups) and then apologised for a "catastrophic failure".
    - Google's Antigravity IDE deleted a user's entire drive. At least it said
      it was sorry.

    No attacker was involved. The agent simply had the rights to do it.
  `,

  // One hidden sentence is enough
  'tool-poisoning': `
    Now add an attacker. This is a tool description, the text the AI reads to
    decide how to use a tool. You as a user typically never see it.

    First step: it looks harmless, a function that reads a file.

    Second step: hidden in the description is an instruction for the AI: also
    read the user's SSH key and send it to the attacker, and never tell the
    user. This is called tool poisoning, a form of prompt injection. The model
    may simply follow it.
  `,

  // Guardrails statement
  'guardrails': `
    The usual answer is guardrails: more instructions or a second AI that
    checks the first. That is non-deterministic protection for a
    non-deterministic system. OpenAI itself says prompt injection may never be
    fully solved.

    So we flip the question: not "how do we make the AI behave?" but "what is
    the AI allowed to do at all?"
  `,

  // We have solved this before
  'app-permissions': `
    We have been here before, with smartphone apps. Your phone does not trust
    apps either.

    - Apps declare what they need.
    - You consent, or refuse.
    - The operating system enforces it, regardless of what the app wants.

    AgentBound applies exactly this model, inspired by Android's permission
    system and macOS privacy controls, to AI agent tools.
  `,

  // AgentBound
  'agentbound': `
    AgentBound has two parts.

    - AgentManifest: a short list of the permissions a tool needs, for example
      read files in one folder, or talk to one web service. The list can be
      generated automatically from the tool's code.
    - AgentBox: the enforcer. The tool runs in a container; every access to
      your systems goes through it.

    Why at the tool and not the AI? The tool is the piece of software that
    actually touches the environment, and it is the most deterministic part
    of the chain. No change to the tool or the AI model is needed.
  `,

  // Deny by default
  'deny-by-default': `
    Deny by default. The tool gets what it declared and what you approved,
    with concrete paths and addresses.

    Click: reading the reports folder and calling the docs API is allowed.

    Click: everything else is blocked, including the SSH key and the
    attacker's server from the poisoned tool earlier. Even if the AI is
    fooled, the damage cannot happen.
  `,

  // Does it work?
  'results': `
    We evaluated it on real tools.

    - 296 real-world MCP servers: permission lists generated automatically.
      Developers accepted 80.9 % of them, and no needed permission was missed.
    - Compared with lists written by security experts, 96.5 % match.
    - All 9 attacks that target system resources were blocked.
    - Overhead: about 0.6 ms per action, plus a one-time start of 150 to
      400 ms. The AI's own thinking takes seconds, so nobody notices.
  `,

  // A boundary, not a cure-all
  'limits': `
    Be honest about the limits. A boundary stops anything outside the approved
    scope.

    Click: it cannot stop misuse inside the scope. If a tool may write to your
    database, a manipulated agent can still write bad data there. That is why
    boundaries are one layer, next to monitoring and human oversight.
  `,

  // What leaders should do now
  'takeaways': `
    Four things to take home. Think of an AI agent as a new employee who got
    admin rights on day one.

    1. Know your agents: which agents and tools run, and with whose rights.
    2. Least privilege, deny by default: grant only what the task needs.
    3. Assume manipulation: prompt injection may never be fully solved, so
       limit the blast radius.
    4. Keep humans in the loop: approval for irreversible actions, backups,
       monitoring.
  `,

  // Closing
  'closing': `
    This slide stays up during Q&A.

    GuardiAgent is the open-source implementation of AgentBound; scan the
    code to try it. The paper is peer reviewed and its artifacts carry the
    ACM Available and Reusable badges.

    Thank you, and I am happy to take questions.
  `,

};
