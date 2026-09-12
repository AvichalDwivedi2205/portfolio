export const links = {
  email: 'avichaldwivedi2005@gmail.com',
  github: 'https://github.com/AvichalDwivedi2205',
  linkedin: 'https://linkedin.com/in/avichal-dwivedi',
  x: 'https://x.com/Avichal2205',
  resume: 'https://drive.google.com/file/d/1wCVoctIM7zoDTbrMNWidFH2VlU5uy5so/view?usp=sharing',
}

export const scrambleWords = ['talks back', 'listens', 'cites sources', 'ships', 'works at 3am', 'pays rent']

export const marquee = [
  'Voice agents', 'Multi-agent systems', 'Post-training', 'RL environments', 'LangGraph', 'MCP',
  'LiveKit', 'Next.js', 'Convex', 'PyTorch', 'On-device inference', 'Ships weekly',
]

export type Sticker = { text: string; sub: string; color: 'lime' | 'pink' | 'blue' | 'orange' | 'white'; x: string; y: string; rot: number }
export const stickers: Sticker[] = [
  { text: '$3,000', sub: 'Agentverse champion', color: 'lime', x: '66%', y: '6%', rot: 8 },
  { text: '67.3K★', sub: 'Orca · open source contributor', color: 'pink', x: '62%', y: '42%', rot: -5 },
  { text: '99%', sub: 'debug effort cut @ Expedia', color: 'blue', x: '2%', y: '70%', rot: 4 },
  { text: '2.5M+', sub: 'sensor rows · Siemens Energy', color: 'white', x: '68%', y: '76%', rot: -9 },
  { text: '$18K+', sub: 'hackathon prizes, cumulative', color: 'orange', x: '40%', y: '84%', rot: 6 },
]

export type Msg = { who: 'ai' | 'me'; html: string }
export const interview: Msg[] = [
  { who: 'ai', html: "Hi Avichal. I'm Aperture. You built me to interview people. Awkward. What do you actually do?" },
  { who: 'me', html: 'I build AI products that have to work when a real human is on the other end. <b>Voice agents, multi-agent systems, eval environments, post-training.</b> Full-stack: from the LiveKit room to the PyTorch loop.' },
  { who: 'ai', html: 'Everyone says "AI products". What\'s the thing you\'ve done that most people haven\'t?' },
  { who: 'me', html: 'Shipped a voice interviewer that knows when to <b>shut up</b>. Built <b>Guild</b>, a multiplayer canvas where humans and local Codex/Claude workers build software together, with fencing tokens so stale agents can\'t clobber each other. Fine-tuned Qwen with dendritic layers and actually moved GSM8K.' },
  { who: 'ai', html: 'Real-world reps, or just hackathons?' },
  { who: 'me', html: 'Both. <b>Expedia</b>: shipped a debugging framework their Android engineers adopted, cut debug effort 99%. <b>Siemens Energy</b>: 2.5M sensor rows → 92% classifier. <b>Orca</b> (67.3K★): merged PRs into a remote browser runtime. Also worked with <b>Agnikul Cosmos</b> and <b>DRDO</b>. Those projects stay off this page. Plus 2 hackathon wins.' },
  { who: 'ai', html: 'Biggest failure?' },
  { who: 'me', html: 'First version of me, of you, interrupted people constantly. I optimised for speed, not for listening. Rewrote the turn detection twice. <b>Latency is a product decision.</b>' },
  { who: 'ai', html: 'Why should someone hire you remotely from India?' },
  { who: 'me', html: "3K+ commits say I show up. $3,000 from Fetch.ai says I win when it counts. Overlap with US/EU hours is fine. <b>I'm the guy already awake when your deploy breaks.</b>" },
  { who: 'ai', html: 'Verdict: <b class="hl">strong hire</b>. Also please fix my interruption bug.' },
]

export type Project = {
  id: string; num: string; cat: string; title: string; tagline: string; body: string;
  chips: string[]; cta: string; href: string; demo?: string; repo?: string; cur: string; color: string; size: 'big' | 'half';
  mock?: 'aperture' | 'guild' | 'canvas'
}
export const projects: Project[] = [
  {
    id: 'aperture', num: '01', cat: 'Voice AI · Recruiting', title: 'Aperture.', tagline: 'The interviewer that reads the room.',
    body: 'Scores resumes against a rubric, shortlists, then runs a 5-10 minute voice interview. Real-time rooms, agent dispatch, STT/TTS loop, turn detection, speaker-tagged transcripts, recruiter dashboard, PDF reports with a hire/no-hire and resume verification flags.',
    chips: ['Next.js', 'Convex', 'LiveKit', 'STT/TTS', 'Voice agents'], cta: 'Watch it interview someone',
    href: 'https://www.loom.com/share/9b3e7060f0f74d0cb352bf35693ff64c', repo: 'https://github.com/AvichalDwivedi2205/aperture',
    cur: 'demo', color: 'var(--lime)', size: 'big', mock: 'aperture',
  },
  {
    id: 'guild', num: '02', cat: 'Multi-agent · Collaboration', title: 'Guild.', tagline: 'Humans and AI workers, one canvas.',
    body: 'Multiplayer infinite canvas where people and local Codex CLI / Claude Code workers build software together. Role Profiles → Teams → deterministic Jobs with leases, fencing tokens and reserved regions so concurrent agents never clobber each other. 25 WebMCP tools. Cloud coordinates, never infers. Your keys stay on your machine.',
    chips: ['Next.js 16', 'Convex', 'WorkOS', 'WebMCP', 'React Flow', 'Bun runner'], cta: 'Open Guild',
    href: 'https://guild-rose-two.vercel.app', demo: 'https://www.youtube.com/watch?v=ZiHCxt4vyX8', repo: 'https://github.com/AvichalDwivedi2205/Guild',
    cur: 'live', color: 'var(--purple)', size: 'big', mock: 'guild',
  },
  {
    id: 'cue', num: '03', cat: 'Enterprise copilot · built in 48h', title: 'Cue.', tagline: 'Shows its receipts.',
    body: 'Slack-native agent across 7 enterprise tools (Linear, GitHub, Notion, PostHog, Vercel…). Source-grounded answers with confidence checks, persistent memory, Vault-backed OAuth, GitHub change previews, draft PRs, and a human approval gate before every write.',
    chips: ['TypeScript', 'LangGraph.js', 'MCP', 'Aurora PG'], cta: 'Demo',
    href: 'https://www.youtube.com/watch?v=-2fV_kg2tZA', cur: 'demo', color: 'var(--pink)', size: 'half',
  },
  {
    id: 'looplens', num: '04', cat: 'B2B · Devtools', title: 'LoopLens.', tagline: 'Is AI coding helping?',
    body: 'Links Codex, Claude Code and Cursor sessions to CI, PR review, deploys, Jira and token spend. Surfaces retry loops and review rework instead of vanity velocity. Local collectors, SQLite spool, WorkOS auth.',
    chips: ['TypeScript', 'SQLite', 'Webhooks', 'WorkOS'], cta: 'Demo',
    href: 'https://www.youtube.com/watch?v=uZdqtOzxgMY', cur: 'demo', color: 'var(--blue)', size: 'half',
  },
  {
    id: 'latchgrid', num: '05', cat: 'Live product · Creator OS', title: 'LatchGrid.', tagline: 'A canvas that thinks with you.',
    body: 'Canvas-first workspace indexing 8+ content types (YouTube, PDFs, notes, voice memos, images…) into a persistent knowledge graph. Deep research across 5+ sources, multilingual chat, model routing, context-aware image gen, real-time node sync. Outputs land back on the canvas.',
    chips: ['Next.js', 'Convex', 'LangGraph', 'Real-time'], cta: 'Open latchgrid.in',
    href: 'https://latchgrid.in', cur: 'live', color: 'var(--orange)', size: 'big', mock: 'canvas',
  },
]

export type Research = { title: string; sub: string; body: string; stack: string[]; href?: string; badge?: string }
export const research: Research[] = [
  {
    title: 'Dendritic Qwen', sub: 'Specialist post-training', badge: '+2.56pp GSM8K',
    body: 'Controlled baseline vs dendritic fine-tuning on Qwen2.5-1.5B. Converted 196 linear layers into staged dendritic training; peak validation accuracy 60.22% → 62.78%. Tracked loss, runtime, LR changes and parameter growth across architecture switches.',
    stack: ['PyTorch', 'Transformers', 'W&B'], href: 'https://github.com/AvichalDwivedi2205/dendrites_qwen',
  },
  {
    title: 'LatentGoalOps', sub: 'RL agent evaluation environment', badge: '7 tasks',
    body: 'Non-stationary tasks where agents must infer latent operational goals and recover from silent objective shifts. Deterministic graders, leakage-safe rewards, trajectory-level scoring. Random / heuristic / oracle / model / synthetic-operator baselines with resumable JSONL traces.',
    stack: ['Python', 'OpenEnv', 'FastAPI'], href: 'https://github.com/AvichalDwivedi2205/neurips-paper-latent',
  },
  {
    title: 'Aura', sub: 'Local-first AI learning system · lead contributor', badge: '0 network calls',
    body: 'Fully on-device Gemma multiplexing 6 agent workflows through a priority inference broker with GPU/MTP controls and p50/p95/p99 telemetry. Property-tested scheduling, atomic SQLite transitions, multilingual generation, CI-backed validation.',
    stack: ['LiteRT-LM', 'Gemma', 'TypeScript'], href: 'https://github.com/Aarush-Dubey/aura',
  },
  {
    title: 'Story.AI', sub: 'Multi-agent therapy & journaling', badge: '$3,000 · 1st place',
    body: '6-agent system with planning, vector memory, tool use and an eval harness hitting 92% agreement with human-labeled responses. Won the Fetch.ai Global AI Agents League among 1,500+ participants.',
    stack: ['Fetch.ai', 'Multi-agent', 'Evals'], href: 'https://devpost.com/software/story-ai-agents-and-others',
  },
  {
    title: 'Explainer Video Generator', sub: 'Multi-agent research → animation', badge: '2nd · EduHacks intl',
    body: 'Automated the whole pipeline: research, scripting, Manim animation, Remotion rendering, Google Cloud TTS narration. One prompt in, narrated explainer video out.',
    stack: ['LangGraph', 'Manim', 'Remotion'],
  },
]

export const brags = [
  { n: '3K+', l: 'github commits', bg: 'var(--lime)', rot: -3 },
  { n: '$18K+', l: 'prize money, cumulative', bg: 'var(--pink)', rot: 2 },
  { n: '67.3K★', l: 'repo I merge PRs into', bg: 'var(--fg)', rot: -1 },
  { n: 'DRDO', l: 'worked with · can\'t say more', bg: 'var(--blue)', rot: 3 },
  { n: '92%', l: 'my favourite accuracy, twice', bg: 'var(--orange)', rot: -2 },
]

export const takes = [
  { q: "Grounded or it didn't happen.", a: "Every AI answer I ship points at its evidence. Cue cites sources; Aperture flags resume claims it can't verify; Guild refuses to count evidence as proof until the check exists. Confident text without a receipt is a liability with good grammar.", src: 'from building Cue & Guild' },
  { q: 'Agents draft. Humans send.', a: 'A Slack message or Linear ticket goes out only after a person clicks yes. It\'s a 40-line approval gate. It\'s also the difference between "cool demo" and "we can actually use this."', src: 'from building Cue' },
  { q: 'Latency is a feature, not infra.', a: 'A voice agent that answers in 2 seconds is a phone tree. Turn detection, streaming, knowing when to shut up. Those are product decisions and the PM should own them.', src: 'from building Aperture' },
]

export type Xp = { yr: string; role: string; org: string; body: string; loc: string; href?: string }
export const experience: Xp[] = [
  { yr: 'Jul 2026 - now', role: 'Open Source Contributor', org: '@ Orca · stablyai/orca · 67.3K ★', loc: 'remote', href: 'https://github.com/stablyai/orca',
    body: 'Production CDP Page.printToPDF for a remote browser runtime: parameter mapping, streamed delivery, unit conversion, lifecycle cleanup, orphaned-buffer safeguards. Host-aware SSH session discovery + recovery across local/remote agent orchestration, tested unit → e2e (PR #7044, #7367).' },
  { yr: 'Jun - Jul 2026', role: 'Mobile Engineering Intern', org: '@ Expedia Group', loc: 'kotlin · android · graphql',
    body: 'Built a zero-integration X-Ray debugging framework adopted by Expedia Android engineers across 3 GraphQL API generations. Cut debugging effort by 99% in the production mobile ecosystem.' },
  { yr: 'Jan - May 2026', role: 'Freelance ML Engineer', org: '@ Siemens Energy', loc: 'python · optuna',
    body: 'End-to-end ML pipeline over 2.5M+ sensor observations from 62 turbine rotors. Temporal/vibration features, Optuna-tuned classifiers to 92% accuracy; +15% downstream predictive accuracy.' },
  { yr: 'Aug 2025 - Aug 2026', role: 'AI/ML Vertical Lead', org: '@ Postman API Labs · BITS Pilani', loc: 'pilani, in',
    body: 'Led applied AI + RL across a 15-member team. Worked with Agnikul Cosmos. Won hackathons with $18K+ in cumulative prizes.' },
  { yr: 'n/a', role: 'Collaborator', org: '@ Agnikul Cosmos', loc: 'confidential',
    body: 'Worked with Agnikul Cosmos. The project stays off this page.' },
  { yr: 'n/a', role: 'Collaborator', org: '@ DRDO', loc: 'classified',
    body: 'Worked with DRDO. I cannot reveal the project.' },
  { yr: 'May - Jul 2025', role: 'Founding AI Engineer', org: '@ Meerahi VR', loc: 'python · transformers · langgraph',
    body: 'Fine-tuned MentalRoBERTa for suicidal-ideation risk; real-time STT/TTS therapy pipeline routing high-risk language to clinicians. Longitudinal patient intelligence across 500+ sessions and 5 modalities with embeddings, knowledge graphs and a 6-tool LangGraph copilot.' },
  { yr: '2023 - 2027', role: 'B.E. Electronics & Communication', org: '@ BITS Pilani', loc: 'pilani, in',
    body: 'Spent most of it shipping software instead. No regrets, some missed lectures.' },
]

export const awards = [
  { n: 'Agentverse Champion', d: 'Global AI Agents League · Fetch.ai · Apr 2025', s: '$3,000 · 1st of 1,500+', href: 'https://devpost.com/software/story-ai-agents-and-others' },
  { n: 'EduHacks AI Fest', d: 'Multi-agent explainer video generator · Oct 2025', s: '2nd · international' },
]

export const skills = {
  Languages: ['Python', 'TypeScript', 'JavaScript', 'C++', 'Kotlin', 'Rust'],
  'Training / Eval': ['PyTorch', 'Transformers', 'SFT', 'Post-training', 'RL environments', 'W&B', 'Optuna'],
  'Inference / Agents': ['LLM inference', 'RAG', 'Tool routing', 'LangGraph', 'MCP', 'On-device', 'Multi-agent', 'Voice (LiveKit)'],
  Infra: ['Next.js', 'Convex', 'FastAPI', 'Node.js', 'PostgreSQL', 'SQLite', 'Docker', 'AWS', 'Vercel'],
}
