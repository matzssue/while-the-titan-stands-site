// Every number on this page was measured in the (private) game repository.
// Sources are noted next to each figure; update them only from a new measurement.

export const site = {
  title: "While the Titan Stands",
  tagline: "A 2D action roguelite about defending a stone titan from the horde.",
  summary:
    "Horde defense with Path of Exile-style loot, made in Godot 4.7. I've been building it alone since July 2026. " +
    "Claude Code writes most of the code, and I design the architecture, measure and review every change.",
  author: "Mateusz",
  github: "https://github.com/matzssue",
  linkedin: "https://www.linkedin.com/in/mateusz-kluska/",
  toolRepo: "https://github.com/matzssue/ai-motion-to-sprites",
} as const;

// Gameplay capture recorded by the author, placed in public/media/.
// While `src` is null the hero shows a placeholder instead of requesting a missing file.
// AV1 first (5.0 MB); browsers without AV1 fall back to the H.264 file (7.6 MB), same 1600 px take.
export const heroVideo: { av1: string | null; src: string | null; poster: string | null } = {
  av1: "media/gameplay.webm",
  src: "media/gameplay.mp4",
  poster: "media/gameplay-poster.jpg",
};

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
  note: string;
}

// git rev-list --count develop; distinct commit dates; .claude/skills; tools/sim/*.tscn; native/
export const stats: Stat[] = [
  { value: 555, label: "commits", note: "since 24 Jul 2026" },
  { value: 95, label: "days of work", note: "days with at least one commit" },
  { value: 14, label: "project skills", note: "instruction files for the AI agent" },
  { value: 47, label: "headless probes", note: "test and measurement scenes" },
  { value: 4, label: "C++ hot loops", note: "the rest is GDScript" },
];

export interface Metric {
  label: string;
  before: number;
  after: number;
  unit: string;
  // How the "after" value is shown when it is a range.
  afterText?: string;
  lowerIsBetter: boolean;
  source: string;
}

// docs/optymalizacja.md (loading 2026-10-02, frame probe 2026-11-18, combat 2026-10-20)
export const metrics: Metric[] = [
  {
    label: "Frame time, 1,000 enemies on screen",
    before: 306,
    after: 19,
    afterText: "17–20",
    unit: "ms",
    lowerIsBetter: true,
    source: "frame probe, median",
  },
  {
    label: "Startup to title screen",
    before: 26.7,
    after: 2.7,
    unit: "s",
    lowerIsBetter: true,
    source: "loading probe, warm disk cache",
  },
  {
    label: "Texture memory in a match",
    before: 3.9,
    after: 0.8,
    afterText: "~0.8",
    unit: "GB",
    lowerIsBetter: true,
    source: "loading probe, VRAM",
  },
  {
    label: "Peak process memory",
    before: 11.6,
    after: 2.7,
    unit: "GB",
    lowerIsBetter: true,
    source: "loading probe",
  },
];

export const honestNote =
  "A full fight against 1,000 enemies with an explosion-heavy build still runs at about 40 FPS " +
  "(Ryzen 5 7500F, RTX 4060 Ti). I've profiled what's left, mostly hit feedback and status effects, " +
  "and written down the next steps. Each one goes in only if its own A/B measurement shows a gain.";

export interface Decision {
  kicker: string;
  title: string;
  body: string;
  proof: string;
}

export const decisions: Decision[] = [
  {
    kicker: "Architecture",
    title: "Content lives in data",
    body:
      "Enemies, towers, items, runes and waves are Godot Resources. Systems talk to each other through signals. " +
      "Only the UI reads names, descriptions and icons.",
    proof: "Adding an enemy, a tower or an item doesn't touch the code.",
  },
  {
    kicker: "Performance",
    title: "Measure first, then C++",
    body:
      "GDScript is the default. Four loops that are pure math moved to a C++ GDExtension: flock separation, " +
      "terrain collision, the enemy hit grid and flow-field sampling. Each one moved only after the profiler showed it was the cost.",
    proof: "Each port gives bit-identical results to the GDScript version, for example over 3,600 movement steps.",
  },
  {
    kicker: "Hot loop",
    title: "Math instead of physics",
    body:
      "Anything short-lived comes from a pool, so nothing is created or freed during combat. Regular enemies skip " +
      "the physics solver and make decisions every second step. All damage numbers are drawn through one MultiMesh.",
    proof: "Damage numbers alone used to take about two thirds of the combat cost.",
  },
  {
    kicker: "Memory",
    title: "Stream art per wave",
    body:
      "Sprite sheets are BC7-compressed with mipmaps, and an import check rejects any that aren't. Only the current " +
      "and the next wave stay in memory. Hero frames are cropped into a tight atlas.",
    proof: "The Wizard's frames went from 639 MB to 183 MB of VRAM.",
  },
];

export interface Step {
  title: string;
  body: string;
  gate?: string;
}

// tools/art/ai_motion README (public repo)
export const pipeline: Step[] = [
  { title: "3D model", body: "A generated character, cleaned up and reduced to about 25k triangles." },
  { title: "Auto-rig", body: "Joints are found from the silhouette and fitted to a Mixamo-style skeleton.", gate: "review rig" },
  { title: "Key poses", body: "I describe each phase of the move in one sentence and pick key poses from the best AI sample.", gate: "review poses" },
  { title: "AI motion", body: "NVIDIA Kimodo generates the motion through the approved poses, then it's retargeted to the rig." },
  { title: "Prop in hands", body: "Two-arm IK wraps the fingers around the real weapon without the arms passing through the body." },
  { title: "Audit", body: "The tool checks every fourth frame for problems I would reject, like hands inside the body.", gate: "review motion" },
  { title: "8-dir sprites", body: "The motion is rendered in isometric view into sprite sheets the game imports." },
];

export interface Practice {
  title: string;
  body: string;
}

// The author's own words (2026-11-19), lightly edited into English.
export const lessons: string[] = [
  "The biggest lesson was about running the project itself. Documentation, architecture and rules need to stay " +
    "in a shape the agent can actually work from, and that takes ongoing care. Early on Claude cuts corners " +
    "wherever it can, and getting to a process that reliably gives me what I planned took many small, patient steps.",
  "Along the way I learned to build pipelines for the work that keeps coming back, from game builds to assets, " +
    "art and sound. I also got hands-on experience with running AI models locally.",
  "I now have a good feel for how Claude works: how its context fills up and how to keep it clean, where the " +
    "tokens go, when a smaller model is enough and when a task needs a stronger one, and how to coordinate " +
    "several agents working at once.",
];

export const practices: Practice[] = [
  {
    title: "One file of project rules",
    body:
      "Architecture rules, language and git conventions are in one file that every session reads first. " +
      "When the design changes, I update that file in the same step.",
  },
  {
    title: "Skills built from past mistakes",
    body:
      "There are 14 project skills, one for each kind of work, such as enemies, runes, sound, UI and performance. " +
      "Each one lists the mistakes that once gave a result that looked fine but wasn't.",
  },
  {
    title: "I play it before it's done",
    body:
      "Passing tests only tell me the code runs. A change is finished when I've played it. For visual work " +
      "I get a few variants to compare, and nothing is committed until I pick one.",
  },
  {
    title: "Speed-ups need a measurement",
    body:
      "A performance change needs an A/B run on the same seed and build. If the gain is within the noise, " +
      "the change is dropped.",
  },
  {
    title: "Parallel sessions, one reviewer",
    body:
      "Independent tasks run in separate sessions, each in its own git worktree. I check every diff, the tests " +
      "and the result in the game before anything is merged.",
  },
  {
    title: "Paid tools wait for my approval",
    body:
      "Paid generation of 3D models and sound runs only after I approve the credit cost. AI models and datasets " +
      "are used only under commercial licences, and I check those separately from the code licence.",
  },
];
