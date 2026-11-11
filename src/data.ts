export const links = {
  email: 'avichaldwivedi2005@gmail.com',
  github: 'https://github.com/AvichalDwivedi2205',
  linkedin: 'https://linkedin.com/in/avichal-dwivedi',
  x: 'https://x.com/Avichal2205',
  resume: 'https://drive.google.com/file/d/1wCVoctIM7zoDTbrMNWidFH2VlU5uy5so/view?usp=sharing',
}

export type Hue = 'coral' | 'moss' | 'sky' | 'lav' | 'sun' | 'rose'

export const scrambleWords = ['talks back', 'listens', 'cites sources', 'ships', 'works at 3am', 'pays rent']


export const statement = "I'm Avichal, an engineer building AI products that have to work when a *real* *human* is on the other end."

export const marquee = [
  'Voice agents', 'Multi-agent systems', 'Post-training', 'RL environments', 'LangGraph', 'MCP',
  'LiveKit', 'Next.js', 'Convex', 'PyTorch', 'On-device inference', 'Ships weekly',
]

/* Aperture, the voice interviewer I built, asks. I answer. */
export type QA = { q: string; a: string }
export const interview: QA[] = [
  {
    q: 'You built me to interview people, so this is awkward. What do you actually do?',
    a: 'I build AI products for the moment a real person is on the other end: <b>voice agents, multi-agent systems, eval environments and post-training.</b> I work the whole stack, from the LiveKit room down to the PyTorch loop.',
  },
  {
    q: 'Everyone says “AI products”. What have you done that most people haven’t?',
    a: 'I shipped a voice interviewer that knows when to <b>shut up</b>. I built <b>Guild</b>, a multiplayer canvas where people and local Codex and Claude workers build software together, with fencing tokens so a stale agent can’t overwrite a fresh one. And I fine-tuned Qwen with dendritic layers and moved GSM8K by 2.56 points.',
  },
  {
    q: 'Real-world reps, or just hackathons?',
    a: 'Both. At <b>Expedia</b> I shipped a debugging framework their Android engineers adopted, and it cut debugging effort by 99%. For <b>Siemens Energy</b> I turned 2.5M sensor rows into a 92% classifier. I’ve merged PRs into <b>Orca</b>, a remote browser runtime with 100K+ stars. I’ve also worked with <b>Agnikul Cosmos</b> and <b>DRDO</b>, and those projects stay off this page. And yes, two hackathon wins.',
  },
  {
    q: 'Biggest failure?',
    a: 'The first version of you interrupted people constantly. I had tuned for speed when I should have tuned for listening. I rewrote the turn detection twice before it felt polite. <b>Latency turned out to be a product decision.</b>',
  },
  {
    q: 'Why should someone hire you?',
    a: 'I show up: 4K+ commits. I deliver when it counts: first place and $3,000 at Fetch.ai’s agents league. And I stay on a problem until it works, end to end.',
  },
]
export const verdict = { stamp: 'Strong hire', line: 'Also, please fix my interruption bug.' }

export type PlayId = 'aperture' | 'cue' | 'guild' | 'foreach' | 'bifrost' | 'latchgrid' | 'suapp' | 'studydeck'
export type Project = {
  id: string; num: string; cat: string; title: string; tagline: string; body: string;
  chips: string[]; cta: string; href: string; demo?: string; repo?: string; cur: string; hue: Hue; size: 'big' | 'half';
  play?: PlayId
}
export const projects: Project[] = [
  {
    id: 'aperture', num: '01', cat: 'Voice AI · Recruiting', title: 'Aperture.', tagline: 'The interviewer that reads the room.',
    body: 'Scores resumes against a rubric, shortlists, then runs a 5-10 minute voice interview. Real-time rooms, agent dispatch, STT/TTS loop, turn detection, speaker-tagged transcripts, recruiter dashboard, PDF reports with a hire/no-hire and resume verification flags.',
    chips: ['Next.js', 'Convex', 'LiveKit', 'STT/TTS', 'Voice agents'], cta: 'Watch it interview someone',
    href: 'https://www.loom.com/share/9b3e7060f0f74d0cb352bf35693ff64c', repo: 'https://github.com/AvichalDwivedi2205/aperture',
    cur: 'demo', hue: 'coral', size: 'big', play: 'aperture',
  },
  {
    id: 'cue', num: '02', cat: 'Brand-voice AI teammate', title: 'Cue.', tagline: 'Your brand, on every channel.',
    body: 'An AI teammate that gives your brand a recognizable personality in the conversations it has with customers. It brings together your product knowledge, tone and guidelines to draft on-brand replies to questions, feedback and mentions across X, Slack and email. Your team stays in control of what gets published, and Cue flags conversations that need a human. Recurring questions become knowledge gaps; bugs and feature requests become engineering tasks.',
    chips: ['Convex', 'Gemini', 'Claude', 'Codex', 'WorkOS', 'Cloud Run'], cta: 'Open cue.latchgrid.in',
    href: 'https://cue.latchgrid.in', repo: 'https://github.com/AvichalDwivedi2205/cue-b2c',
    cur: 'live', hue: 'rose', size: 'big', play: 'cue',
  },
  {
    id: 'guild', num: '03', cat: 'Multi-agent · Collaboration', title: 'Guild.', tagline: 'Humans and AI workers, one canvas.',
    body: 'Multiplayer infinite canvas where people and local Codex CLI / Claude Code workers build software together. Role Profiles → Teams → deterministic Jobs with leases, fencing tokens and reserved regions so concurrent agents never clobber each other. 25 WebMCP tools. Cloud coordinates, never infers. Your keys stay on your machine.',
    chips: ['Next.js 16', 'Convex', 'WorkOS', 'WebMCP', 'React Flow', 'Bun runner'], cta: 'Open Guild',
    href: 'https://guild-rose-two.vercel.app', demo: 'https://www.youtube.com/watch?v=ZiHCxt4vyX8', repo: 'https://github.com/AvichalDwivedi2205/Guild',
    cur: 'live', hue: 'lav', size: 'big', play: 'guild',
  },
  {
    id: 'foreach', num: '04', cat: 'Mac MCP · Wajo GSD hackathon', title: 'Fo Reach.', tagline: 'Fixes your Mac, with permission.',
    body: "A permission-controlled local MCP companion that lets Fo, Wajo's AI assistant, work on your Mac. It switches and unmutes sound output, opens apps, reads and writes files only in folders you pick, and builds editable slide decks. Every change runs inspect, propose, approve, apply, verify, with an undo you approve too. A native Swift helper talks to CoreAudio: no shell, no sudo.",
    chips: ['MCP', 'TypeScript', 'Swift', 'CoreAudio', 'SQLite'], cta: 'See it on X',
    href: 'https://x.com/Avichal2205/status/2112235879389647239', repo: 'https://github.com/AvichalDwivedi2205/wajo-hack',
    cur: 'post', hue: 'sky', size: 'half', play: 'foreach',
  },
  {
    id: 'bifrost', num: '05', cat: 'Governed agents · Solana', title: 'Bifrost.', tagline: 'Missions with a budget and a veto.',
    body: 'Coordinator, research, risk, execution, verifier, and settlement agents run a Solana-native mission stack under scoped budgets, approval policies, and capability-based routing. Wallet auth, spending limits, live WebSocket mission streams, and verifier-gated settlement in native Rust.',
    chips: ['LangGraph.js', 'Solana', 'Rust', 'WebSockets'], cta: 'Watch the demo',
    href: 'https://www.loom.com/share/3af086e21d2c445a90fc70a052041010', repo: 'https://github.com/AvichalDwivedi2205/Bifrost',
    cur: 'demo', hue: 'sun', size: 'half', play: 'bifrost',
  },
  {
    id: 'latchgrid', num: '06', cat: 'Live product · Creator OS', title: 'LatchGrid.', tagline: 'A canvas that thinks with you.',
    body: 'Canvas-first workspace indexing 8+ content types (YouTube, PDFs, notes, voice memos, images…) into a persistent knowledge graph. Deep research across 5+ sources, multilingual chat, model routing, context-aware image gen, real-time node sync. Outputs land back on the canvas.',
    chips: ['Next.js', 'Convex', 'LangGraph', 'Real-time'], cta: 'Open latchgrid.in',
    href: 'https://latchgrid.in', demo: 'https://youtu.be/nVjDcO01haY', cur: 'live', hue: 'moss', size: 'big', play: 'latchgrid',
  },
  {
    id: 'suapp', num: '07', cat: 'Campus super app · with SUTT', title: 'SU App.', tagline: 'All of campus in one app.',
    body: "The official BITS Pilani Students' Union app, 10K+ downloads: food ordering with QR checkout, SU cabs and carpooling, event and merch signings, expense tracking, timetables and the campus map. I led AI/ML at SUTT, building a personalized AI Wrapped from student activity, an ML mailbox classifier that assigns priority in under 50 ms, and recommendation and backend features.",
    chips: ['React Native', 'FastAPI', 'PostgreSQL', 'Recommendations'], cta: 'Get it on Play Store',
    href: 'https://play.google.com/store/apps/details?id=org.subitspilani.bits_su_app', cur: 'live', hue: 'coral', size: 'half', play: 'suapp',
  },
  {
    id: 'studydeck', num: '08', cat: 'Academic planner · with SUTT', title: 'StudyDeck.', tagline: 'Timetables without the clashes.',
    body: 'BITS lets you build your own timetable, which mostly means building your own clashes. StudyDeck adds courses and sections in a tap, flags class and exam clashes, checks minimum credits, shares timetables by ID, reminds you before class, and keeps notes, slides, handouts and PYQs in one place. Android, iOS and web. I was on the SUTT team that builds it.',
    chips: ['Android', 'iOS', 'Web', 'Team build'], cta: 'Open StudyDeck',
    href: 'https://studydeck.bits-sutechteam.org', cur: 'live', hue: 'lav', size: 'half', play: 'studydeck',
  },
]

export type Design = { id: string; title: string; tagline: string; body: string; hue: Hue; href: string; kind: 'live' | 'shot' | 'strip'; poster?: string; shots?: string[]; cta: string }
export const designs: Design[] = [
  {
    id: 'remi', title: 'Remi', tagline: 'A cozy companion for a busy life.', hue: 'coral', kind: 'live',
    body: 'A habit app that plays like a tiny game: pick a companion, plan a doable day, finish quests, keep your Hearth warm and dress your pet with what you earned. 57 screens, 9 companions, every mood and growth stage.',
    href: 'https://remi-design-avichal.avichaldwivedi2005.chatgpt.site/design/', poster: '/designs/remi.webp', cta: 'Tap to play',
  },
  {
    id: 'latchgrid', title: 'LatchGrid', tagline: 'Your whole creative process. One canvas.', hue: 'moss', kind: 'shot',
    body: 'The landing and canvas for LatchGrid: research, notes and media wired into chat on an infinite board.',
    href: 'https://latchgrid.in', poster: '/designs/latchgrid.webp', cta: 'Open live',
  },
  {
    id: 'suapp', title: 'SU App', tagline: 'Campus life, one tap away.', hue: 'lav', kind: 'strip',
    body: 'Store screens for the BITS Students\' Union app: food, cabs, signings and the expense tracker. Drag to scroll.',
    href: 'https://play.google.com/store/apps/details?id=org.subitspilani.bits_su_app', shots: [1, 2, 3, 4, 5, 6].map(n => `/designs/su-${n}.webp`), cta: 'Play Store',
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
]

export type Xp = { yr: string; role: string; org: string; body: string; loc: string; href?: string }
export const experience: Xp[] = [
  { yr: 'Jul 2026 - now', role: 'Open Source Contributor', org: '@ Orca · stablyai/orca · 100K+ ★', loc: 'remote', href: 'https://github.com/stablyai/orca',
    body: 'Production CDP Page.printToPDF for a remote browser runtime: parameter mapping, streamed delivery, unit conversion, lifecycle cleanup, orphaned-buffer safeguards. Host-aware SSH session discovery + recovery across local/remote agent orchestration, tested unit → e2e (PR #7044, #7367).' },
  { yr: 'Jun - Jul 2026', role: 'Mobile Engineering Intern', org: '@ Expedia Group', loc: 'kotlin · android · graphql',
    body: 'Built a zero-integration X-Ray debugging framework adopted by Expedia Android engineers across 3 GraphQL API generations. Cut debugging effort by 99% in the production mobile ecosystem.' },
  { yr: 'Jan - May 2026', role: 'Freelance ML Engineer', org: '@ Siemens Energy', loc: 'python · optuna',
    body: 'End-to-end ML pipeline over 2.5M+ sensor observations from 62 turbine rotors. Temporal/vibration features, Optuna-tuned classifiers to 92% accuracy; +15% downstream predictive accuracy.' },
  { yr: 'Aug 2025 - Aug 2026', role: 'AI/ML Vertical Lead', org: '@ Postman API Labs · BITS Pilani', loc: 'pilani, in',
    body: 'Led applied AI + RL across a 15-member team. Worked with Agnikul Cosmos. Won hackathons with $18K+ in cumulative prizes.' },
  { yr: 'Aug 2025 - Aug 2026', role: 'AI/ML Lead', org: "@ SUTT · Students' Union Technical Team", loc: 'pilani, in',
    body: 'Led AI/ML for the BITS SU App (10K+ downloads): a personalized AI Wrapped built from student activity, and an ML mailbox classifier that assigns priority in under 50 ms. Also on the team behind StudyDeck.' },
  { yr: 'classified', role: 'Collaborator', org: '@ Agnikul Cosmos · DRDO', loc: 'confidential',
    body: 'Worked with Agnikul Cosmos and DRDO. Those projects stay off this page.' },
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

/* Headline numbers for the receipts section. */
export const facts = {
  prizes: { to: 18, prefix: '$', suffix: 'K+', note: 'Hackathon prizes, cumulative.' },
  stars: { to: 100, suffix: 'K+', note: 'Stars on Orca, the open-source browser runtime I merge PRs into.' },
  debug: { to: 99, suffix: '%', note: "Less debugging effort for Expedia's Android engineers after my X-Ray framework shipped." },
  strip: [
    { to: 2.5, decimals: 1, suffix: 'M+', note: 'sensor rows modelled · Siemens Energy' },
    { to: 92, suffix: '%', note: 'classifier accuracy on 62 turbine rotors' },
    { to: 4, suffix: 'K+', note: 'GitHub commits and counting' },
    { to: 10, suffix: 'K+', note: 'downloads · BITS SU App' },
  ],
}

export const clients = ['Expedia Group', 'Siemens Energy', 'Orca', 'Agnikul Cosmos', 'DRDO', 'Postman API Labs', 'Meerahi VR']

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Designs', href: '#designs' },
  { label: 'Interview', href: '#chat' },
  { label: 'Lab notes', href: '#research' },
  { label: 'Experience', href: '#xp' },
  { label: 'Contact', href: '#contact' },
]
