# Adi & Aru: The Ultimate Relationship Hot Seat 👑

A premium, KBC-inspired party game built for two contestants — Adi and Aru — to sit in the
"hot seat" and answer questions about their relationship in front of an audience.

Dark blue + gold stage lighting, a dramatic host, audience reaction buttons, secret-answer
mind reading, lifelines, a relationship point ladder, and an emotional final report card.
All built with plain HTML/CSS/JS — **no build tools, no backend, no external audio/image
files.** Just open `index.html`.

---

## How to run

1. Download / clone this folder (`adi-aru-hotseat/`).
2. Double-click `index.html`, or open it in any modern browser (Chrome, Edge, Firefox, Safari).
3. That's it — there is nothing to install and nothing to build.

> Tip: sound needs a user gesture to start (browser autoplay rules). Just tap **"🎬 Start
> Game + Enable Sound"** on the opening screen. If a phone's browser is still stubborn about
> it, a small "🔈 Tap anywhere to enable sound" banner appears — one more tap fixes it.

Your relationship point score is saved to the browser's local storage, so refreshing the
page (or accidentally closing the tab) won't wipe out the score mid-party.

---

## How to play at a party

1. Sit Adi and Aru in the "hot seat" (any two chairs, ideally facing the audience/laptop screen).
2. Whoever is hosting reads the question and host commentary out loud, in full dramatic voice.
3. Adi/Aru answer **out loud** — most rounds don't need typing, they just talk. The A/B/C/D
   cards under each question (Safe / Honest / Dangerous / Full story) are just flavor —
   tap one to nudge which style of answer you want, purely for fun.
4. The host taps **🔒 Lock Answer** for the big dramatic moment — it runs a suspense beat,
   reveals the host's reaction, and automatically awards that question's points. Use
   **✨ Reveal** instead if you just want the host commentary without scoring anything.
5. Invite the audience to smash the reaction buttons (Clap, Laugh, Gasp, Awww, Oooooh,
   Danger, Confetti, Hearts) — and use **Award Points** / **Deduct Points** any time you want
   to adjust the score manually.
6. Use lifelines when a question gets too dangerous. Each lifeline works once per game.
7. For the **Mind Reader Round**, Adi and Aru privately type their secret answers into the
   two text boxes (masked as you type) — then hit **Reveal Answers** for the big simultaneous
   reveal.
8. After all 9 rounds (or whenever you want to stop), hit **Final Report** for the closing
   report card and host speech.

All the core controls (Prev / Reveal / Lock Answer / Next, plus the secondary row) live in a
dock that stays pinned to the bottom of the screen on mobile, so nothing is ever hidden below
the fold. There's also a floating **➡ Next** button on desktop for quick access, and a
**❓ Keys** button in the top bar shows the keyboard shortcuts at a glance.

Play the **Full Show** (all 9 rounds, 90 questions) for the whole experience, or jump into
a single round from the round-select screen if you're short on time.

---

## Keyboard shortcuts

While on the main game screen:

| Key | Action |
|-----|--------|
| `Space` | Next question |
| `Enter` | Lock Answer (dramatic reveal + auto-awards points) |
| `R` | Reveal / host commentary |
| `C` | Clap reaction |
| `L` | Laugh reaction |
| `G` | Gasp reaction |
| `A` | Awww reaction |
| `H` | Hearts reaction |
| `M` | Mute / unmute music + sound effects |

A `❓ Keys` button in the top bar also shows this list in-app, so no one has to
remember it mid-party.
| `F` | Jump to Final Report |

(Shortcuts are disabled while typing in the secret-answer text boxes.)

---

## How to edit questions

Everything lives in **`questions.js`** as one plain JavaScript array called `QUESTIONS`.
Each question is an object like this:

```js
{
  id: 1,
  round: 1,                    // which round (1-9) this belongs to
  category: "The Beginning",   // round name, shown as a label
  question: "What was your actual first impression of them?",
  answerMode: "both",          // "adi" | "aru" | "both" | "secret-both" | "rapid-fire" | "story"
  vibe: "funny",                // "funny" | "emotional" | "roast" | "nostalgic" | "dangerous" | "future"
  hostIntro: "Careful now — this is the unfiltered version.",
  hostReveal: "The honest first impression. Always more entertaining.",
  audienceCue: "laugh",         // suggested reaction: clap | laugh | gasp | aww | ooh | danger | confetti | hearts
  points: 100,
}
```

To add, remove, or rewrite a question, just edit that array — nothing else needs to change.
To add a whole new round, add an entry to the `ROUNDS` array too (id, name, icon, tagline).

### `answerMode` reference

- `"adi"` / `"aru"` — only one contestant answers.
- `"both"` — both contestants answer out loud, one after another.
- `"secret-both"` — shows two hidden text boxes; both type privately, then a **Reveal
  Answers** button shows them side by side.
- `"rapid-fire"` — a fast "finish the sentence" prompt, no long pauses allowed.
- `"story"` — a longer storytelling prompt.

### Lifelines, reactions, and the point ladder

These also live in `questions.js`:

- `LIFELINES` — the 5 lifeline cards (icon, label, description, and random commentary lines).
- `REACTIONS` — the 8 audience reaction buttons (icon, label, and random host lines).
- `POINT_LADDER` — the relationship point milestones shown in the sidebar ladder.
- `REPORT_CATEGORIES` — the categories shown on the Final Report Card.

Edit any of these arrays the same way — add, remove, or reword entries freely.

---

## How to customize the contestant names

At the very top of `questions.js`:

```js
const CONTESTANTS = {
  a: "Adi",
  b: "Aru",
};
```

Change `"Adi"` and `"Aru"` to any names you like — the intro screen, contestant cards,
host lines, question labels, and closing speech all pull from these two values
automatically. (The show title in `index.html` and `styles.css` class names still say
"Adi & Aru" cosmetically, but the actual gameplay text updates everywhere.)

---

## Project structure

```
adi-aru-hotseat/
├── index.html      # all screens/markup
├── styles.css       # dark blue + gold game-show visual design & animations
├── script.js        # game engine: state, screens, sound, scoring, lifelines, reactions
├── questions.js      # all game data — questions, rounds, lifelines, reactions, ladder
└── README.md
```

- **No backend.** No `npm install`. No bundler. Just static files.
- **No external audio/image assets.** All sound effects and background music are
  synthesized live with the Web Audio API. All visuals are CSS gradients, glows,
  animations, and emoji.

---

## Notes

This game is an original creation "inspired by" the vibe, suspense, and pacing of a
classic Indian TV quiz show — it does not use any of that show's branding, logos, exact
music, or scripted dialogue. All host lines, sound effects, and visuals here are original.

Have fun, and remember: there is no lifeline strong enough for some of these questions. 💛
