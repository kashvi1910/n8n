/* ============================================================
   ADI & ARU: THE ULTIMATE RELATIONSHIP HOT SEAT
   questions.js — all game data lives here.
   Edit questions, names, points, or rounds freely — the engine
   in script.js just reads this file.
   ============================================================ */

// ---------- Contestant names (edit these to reuse the game for other couples) ----------
const CONTESTANTS = {
  a: "Adi",
  b: "Aru",
};

// ---------- Game title ----------
const GAME_TITLE = "Adi & Aru: The Ultimate Relationship Hot Seat";
const GAME_SUBTITLE = "Kaun Banega Relationshippati";

// ---------- Rounds ----------
const ROUNDS = [
  { id: 1, name: "The Beginning", icon: "💫", tagline: "First impressions, nerves, and how it all started." },
  { id: 2, name: "Things You Never Said Properly", icon: "💌", tagline: "The sincere stuff, said out loud for once." },
  { id: 3, name: "Expose Your Partner", icon: "🔥", tagline: "A loving, public roast session." },
  { id: 4, name: "Memory Lane", icon: "🎞️", tagline: "Storytelling, chaos, and nostalgia." },
  { id: 5, name: "Mind Reader Round", icon: "🧠", tagline: "Secret answers. Simultaneous reveal. No cheating." },
  { id: 6, name: "Finish The Sentence", icon: "⚡", tagline: "Fast prompts. No overthinking allowed." },
  { id: 7, name: "Green Flag Round", icon: "🟢", tagline: "Sweet, sincere, certified wholesome." },
  { id: 8, name: "Dangerous But Cute", icon: "🚨", tagline: "A little spicy. Still loving." },
  { id: 9, name: "The Future", icon: "🌅", tagline: "Where this whole thing is headed." },
];

// ---------- Lifelines ----------
const LIFELINES = [
  {
    id: "audience",
    label: "Ask The Audience",
    icon: "🗳️",
    description: "Poll the room. The audience will absolutely have opinions.",
    commentary: [
      "The audience has spoken. Democracy has never been this petty.",
      "A live poll, for a question with no correct answer. Beautiful.",
      "The room is divided. Just like family group chats during elections.",
    ],
  },
  {
    id: "friend",
    label: "Call A Best Friend",
    icon: "📞",
    description: "Phone a friend for an outside, brutally honest opinion.",
    commentary: [
      "Incoming call from someone who has seen EVERYTHING and told NO ONE. Until now.",
      "The best friend has entered the chat, and they are not being diplomatic.",
      "This friend was subpoenaed. There was no other way.",
    ],
  },
  {
    id: "blame",
    label: "Blame It On Miscommunication",
    icon: "🌀",
    description: "Escape a tricky question by blaming a classic miscommunication.",
    commentary: [
      "Ah yes. The oldest excuse in the relationship handbook. Filed and accepted.",
      "\"It was a miscommunication\" — the couple's national anthem.",
      "The judge (me) accepts this defense purely for comedic value.",
    ],
  },
  {
    id: "pause",
    label: "Take A Dramatic Pause",
    icon: "🎭",
    description: "Buy time with a slow-motion, soap-opera-worthy dramatic pause.",
    commentary: [
      "A pause so dramatic, the lighting crew is adjusting the spotlight as we speak.",
      "Silence. Suspense. A single tear, possibly. Incredible television.",
      "This pause will be remembered longer than most of the actual answers tonight.",
    ],
  },
  {
    id: "compliment",
    label: "Compliment Your Way Out",
    icon: "💐",
    description: "Dodge the hard question with a well-timed, distracting compliment.",
    commentary: [
      "A compliment, deployed at the exact right moment. Tactical. Respect.",
      "Flattery as a lifeline. Bold strategy. Surprisingly, it's working.",
      "The question has been successfully distracted into submission.",
    ],
  },
];

// ---------- Audience reactions ----------
const REACTIONS = [
  { id: "clap", label: "Clap", icon: "👏", hostLines: ["That answer deserves applause.", "The room agrees — that was a good one.", "Applause! Real, earned applause."] },
  { id: "laugh", label: "Laugh", icon: "😂", hostLines: ["The studio has lost it.", "Nobody was ready for that one.", "That's going straight into the highlight reel."] },
  { id: "gasp", label: "Gasp", icon: "😲", hostLines: ["Ohhh! The studio audibly gasped.", "Did NOT see that coming.", "This question has caused silence in the studio."] },
  { id: "aww", label: "Awww", icon: "🥹", hostLines: ["That was dangerously cute.", "Someone pass the tissues, please.", "Okay that's just unfair how sweet that was."] },
  { id: "ooh", label: "Oooooh", icon: "👀", hostLines: ["The audience is pretending not to judge, but they absolutely are.", "Eyebrows have been raised across the entire studio.", "There's a story behind that answer and we all know it."] },
  { id: "danger", label: "Danger", icon: "🚨", hostLines: ["This is no longer a game. This is emotional damage.", "Someone is one follow-up question away from trouble.", "Danger levels rising. Security, stand by."] },
  { id: "confetti", label: "Confetti", icon: "🎉", hostLines: ["A confetti-worthy answer if I've ever heard one!", "Let's celebrate that properly.", "Tonight's prize is not money. It is permanent screenshot material."] },
  { id: "hearts", label: "Hearts", icon: "❤️", hostLines: ["Lock kiya jaaye? Emotionally, of course.", "The love in this room just went up by several notches.", "Somebody is earning major relationship points tonight."] },
];

// ---------- Point ladder ----------
const POINT_LADDER = [
  { threshold: 0, label: "100 Love Points" },
  { threshold: 500, label: "500 Love Points" },
  { threshold: 1000, label: "1,000 Love Points" },
  { threshold: 2500, label: "2,500 Love Points" },
  { threshold: 5000, label: "5,000 Love Points" },
  { threshold: 10000, label: "Green Flag Level" },
  { threshold: 15000, label: "Chaos Couple Level" },
  { threshold: 20000, label: "Soulmate Energy Level" },
  { threshold: 25000, label: "Couple GOAT Level" },
];

// ---------- Final report card categories (engine fills in the name + score) ----------
const REPORT_CATEGORIES = [
  { id: "softie", label: "Biggest Softie", icon: "🥹" },
  { id: "menace", label: "Biggest Menace", icon: "😈" },
  { id: "greenflag", label: "Green Flag Champion", icon: "🟢" },
  { id: "dramatic", label: "Most Dramatic", icon: "🎭" },
  { id: "memory", label: "Best Memory Keeper", icon: "🎞️" },
  { id: "overthinker", label: "Certified Overthinker", icon: "🌀" },
  { id: "chaos", label: "Chaos Compatibility Score", icon: "⚡", isPercent: true },
  { id: "soulmate", label: "Soulmate Energy Score", icon: "✨", isPercent: true },
  { id: "goat", label: "Couple GOAT Status", icon: "🏆" },
];

/* ============================================================
   QUESTIONS — 9 rounds x 10 questions = 90 total
   answerMode: "adi" | "aru" | "both" | "secret-both" | "rapid-fire" | "story"
   vibe: "funny" | "emotional" | "roast" | "nostalgic" | "dangerous" | "future"
   ============================================================ */
const QUESTIONS = [

  // ============ ROUND 1: THE BEGINNING ============
  { id: 1, round: 1, category: "The Beginning", question: "What was your actual first impression of them — not the polite version?", answerMode: "both", vibe: "funny", hostIntro: "Careful now — this is the unfiltered version, not the one told to relatives.", hostReveal: "The honest first impression. Always more entertaining than the polite one.", audienceCue: "laugh", points: 100 },
  { id: 2, round: 1, category: "The Beginning", question: "What was the first thing about them that made you curious?", answerMode: "both", vibe: "nostalgic", hostIntro: "Somewhere in here is the exact moment curiosity turned into something else.", hostReveal: "And there it is — chapter one of this whole story.", audienceCue: "aww", points: 120 },
  { id: 3, round: 1, category: "The Beginning", question: "What did you notice about them before you admitted you liked them?", answerMode: "both", vibe: "nostalgic", hostIntro: "Denial phase testimony. Take the stand.", hostReveal: "Noticed, but not admitted. The classic opening move.", audienceCue: "ooh", points: 140 },
  { id: 4, round: 1, category: "The Beginning", question: "What was one thing you were nervous about in the beginning?", answerMode: "both", vibe: "emotional", hostIntro: "Back to being nervous for a second. Take your time.", hostReveal: "Nerves and all, look where we are now.", audienceCue: "aww", points: 160 },
  { id: 5, round: 1, category: "The Beginning", question: "What was one thing you were worried may not work out?", answerMode: "both", vibe: "dangerous", hostIntro: "A little vulnerability round. The audience is leaning in.", hostReveal: "That worry clearly didn't win. Noted for the record.", audienceCue: "gasp", points: 180 },
  { id: 6, round: 1, category: "The Beginning", question: "What was the moment where you thought, \"Okay, this person is different\"?", answerMode: "both", vibe: "emotional", hostIntro: "Every love story has this exact scene. Roll it.", hostReveal: "That was dangerously cute. Write that one down.", audienceCue: "hearts", points: 200 },
  { id: 7, round: 1, category: "The Beginning", question: "What did you pretend to be chill about but were secretly overthinking?", answerMode: "both", vibe: "funny", hostIntro: "The performance of chillness. A genre both of you clearly starred in.", hostReveal: "Nobody was chill. Nobody is ever chill. Thank you for confirming.", audienceCue: "laugh", points: 220 },
  { id: 8, round: 1, category: "The Beginning", question: "What is something you remember from your first few conversations?", answerMode: "both", vibe: "nostalgic", hostIntro: "Rewind the tape to the very first conversations.", hostReveal: "The origin story, straight from the source.", audienceCue: "aww", points: 240 },
  { id: 9, round: 1, category: "The Beginning", question: "What did you think they thought of you?", answerMode: "both", vibe: "funny", hostIntro: "This is the overthinking Olympics, and everyone qualifies.", hostReveal: "Spoiler: you were almost certainly wrong. That's how this always goes.", audienceCue: "laugh", points: 260 },
  { id: 10, round: 1, category: "The Beginning", question: "What was the first small thing they did that stayed with you?", answerMode: "both", vibe: "emotional", hostIntro: "The small things. Always the ones that end up mattering most.", hostReveal: "And that, right there, is how it all quietly began.", audienceCue: "hearts", points: 280 },

  // ============ ROUND 2: THINGS YOU NEVER SAID PROPERLY ============
  { id: 11, round: 2, category: "Never Said Properly", question: "What is one quality you admire in them but rarely say out loud?", answerMode: "both", vibe: "emotional", hostIntro: "Say the quiet compliment out loud. Just this once.", hostReveal: "Said out loud, on a stage, in front of everyone. That counts double now.", audienceCue: "hearts", points: 180 },
  { id: 12, round: 2, category: "Never Said Properly", question: "What is something they do that makes your life easier?", answerMode: "both", vibe: "emotional", hostIntro: "The unglamorous, unromantic, deeply real stuff. Let's hear it.", hostReveal: "Love, it turns out, is often just logistics done kindly.", audienceCue: "aww", points: 200 },
  { id: 13, round: 2, category: "Never Said Properly", question: "What is one thing they helped you through, even if they don't realize it?", answerMode: "both", vibe: "emotional", hostIntro: "This one gets quiet. Studio, hold your applause for a second.", hostReveal: "They didn't even realize it. Now they do. Big moment.", audienceCue: "hearts", points: 220 },
  { id: 14, round: 2, category: "Never Said Properly", question: "What is your favourite version of them?", answerMode: "both", vibe: "emotional", hostIntro: "Not a version they perform — the real one you love most.", hostReveal: "A very specific kind of love, that one.", audienceCue: "aww", points: 240 },
  { id: 15, round: 2, category: "Never Said Properly", question: "What is something about them you hope never changes?", answerMode: "both", vibe: "emotional", hostIntro: "Some things should stay exactly as they are.", hostReveal: "Noted, protected, and hereby requested to remain unchanged forever.", audienceCue: "hearts", points: 260 },
  { id: 16, round: 2, category: "Never Said Properly", question: "What is one moment where you felt really proud of them?", answerMode: "both", vibe: "emotional", hostIntro: "Pride round. The good kind of pressure.", hostReveal: "That's the kind of pride that doesn't fade with time.", audienceCue: "clap", points: 280 },
  { id: 17, round: 2, category: "Never Said Properly", question: "What is something they do that makes you feel safe?", answerMode: "both", vibe: "emotional", hostIntro: "Safety. Underrated, and rarely said this directly.", hostReveal: "That's the kind of safe that's very hard to fake.", audienceCue: "hearts", points: 300 },
  { id: 18, round: 2, category: "Never Said Properly", question: "What is one thing you wish they understood about how much they mean to you?", answerMode: "both", vibe: "emotional", hostIntro: "This is the one you've maybe never fully said. Go on.", hostReveal: "Well, now it's on the record. Permanently. Loudly.", audienceCue: "hearts", points: 320 },
  { id: 19, round: 2, category: "Never Said Properly", question: "What would you thank them for if you had only one minute?", answerMode: "both", vibe: "emotional", hostIntro: "Sixty seconds. Say the real thing.", hostReveal: "That's a thank-you worth more than most speeches.", audienceCue: "aww", points: 340 },
  { id: 20, round: 2, category: "Never Said Properly", question: "What is one thing you've learned from them?", answerMode: "both", vibe: "emotional", hostIntro: "Relationships are secretly just long, ongoing lessons. What's yours?", hostReveal: "Growth, live on stage. Beautiful stuff.", audienceCue: "clap", points: 360 },

  // ============ ROUND 3: EXPOSE YOUR PARTNER ============
  { id: 21, round: 3, category: "Expose Your Partner", question: "What is the most Adi thing Adi has ever done?", answerMode: "aru", vibe: "roast", hostIntro: "Aru, the floor is yours. Be honest. Be merciless.", hostReveal: "That is DEEPLY on brand. No notes.", audienceCue: "laugh", points: 260 },
  { id: 22, round: 3, category: "Expose Your Partner", question: "What is the most Aru thing Aru has ever done?", answerMode: "adi", vibe: "roast", hostIntro: "Adi, your turn for testimony. The court is listening.", hostReveal: "Objection overruled — that is exactly, painfully accurate.", audienceCue: "laugh", points: 280 },
  { id: 23, round: 3, category: "Expose Your Partner", question: "What is one habit of theirs that should come with a warning label?", answerMode: "both", vibe: "roast", hostIntro: "Health and safety round. Please answer responsibly.", hostReveal: "\"Caution: contents may cause chaos.\" Duly noted for the label.", audienceCue: "laugh", points: 300 },
  { id: 24, round: 3, category: "Expose Your Partner", question: "What is something they think they are amazing at but are actually suspiciously average at?", answerMode: "both", vibe: "roast", hostIntro: "This one requires courage. And possibly a safe exit route.", hostReveal: "Confidence: 100%. Actual skill: under review. Iconic combination.", audienceCue: "laugh", points: 320 },
  { id: 25, round: 3, category: "Expose Your Partner", question: "What is one sentence they say so often you can hear it in their voice?", answerMode: "both", vibe: "funny", hostIntro: "Do the impression if you dare. The audience is ready.", hostReveal: "Uncanny. Somebody's catchphrase has officially been exposed on national- well, living-room television.", audienceCue: "laugh", points: 340 },
  { id: 26, round: 3, category: "Expose Your Partner", question: "What is their funniest red flag?", answerMode: "both", vibe: "roast", hostIntro: "A red flag, but the funny kind. Not the leave-immediately kind.", hostReveal: "That answer has dangerous levels of red flag energy — the fun kind.", audienceCue: "laugh", points: 360 },
  { id: 27, round: 3, category: "Expose Your Partner", question: "What is one thing they overthink for absolutely no reason?", answerMode: "both", vibe: "funny", hostIntro: "We all know someone is about to be exposed here.", hostReveal: "Overthinking: confirmed, documented, and now performed live for an audience.", audienceCue: "laugh", points: 380 },
  { id: 28, round: 3, category: "Expose Your Partner", question: "What is the most dramatic reaction they've ever had?", answerMode: "both", vibe: "roast", hostIntro: "Reenactments are allowed. Encouraged, even.", hostReveal: "Somewhere, a Bollywood director is taking notes for their next film.", audienceCue: "laugh", points: 400 },
  { id: 29, round: 3, category: "Expose Your Partner", question: "If they were arrested, what would everyone assume they did?", answerMode: "both", vibe: "funny", hostIntro: "Hypothetical crime scenario. Purely for entertainment. Mostly.", hostReveal: "The whole friend group would nod in unison at that theory.", audienceCue: "laugh", points: 420 },
  { id: 30, round: 3, category: "Expose Your Partner", question: "What reality show would they be eliminated from first and why?", answerMode: "both", vibe: "funny", hostIntro: "Final roast question. Make it count.", hostReveal: "Eliminated in week one, and everybody knows exactly why.", audienceCue: "laugh", points: 440 },

  // ============ ROUND 4: MEMORY LANE ============
  { id: 31, round: 4, category: "Memory Lane", question: "Tell us about your most chaotic memory together.", answerMode: "story", vibe: "funny", hostIntro: "Storytime. Full detail, no summarizing.", hostReveal: "A certified chaos classic. The studio wants a sequel.", audienceCue: "laugh", points: 340 },
  { id: 32, round: 4, category: "Memory Lane", question: "Which moment still makes you laugh when you think about it?", answerMode: "both", vibe: "funny", hostIntro: "The one that still gets you, even years later.", hostReveal: "The kind of memory that never fully stops being funny.", audienceCue: "laugh", points: 360 },
  { id: 33, round: 4, category: "Memory Lane", question: "What is the most wholesome memory you have with them?", answerMode: "both", vibe: "nostalgic", hostIntro: "Switching gears — pure, uncomplicated wholesomeness incoming.", hostReveal: "Certified wholesome. Framing that memory as we speak.", audienceCue: "aww", points: 380 },
  { id: 34, round: 4, category: "Memory Lane", question: "What was your funniest misunderstanding?", answerMode: "story", vibe: "funny", hostIntro: "Two people, one conversation, zero shared understanding. Go.", hostReveal: "Communication: attempted. Communication: hilariously failed. Ten out of ten.", audienceCue: "laugh", points: 400 },
  { id: 35, round: 4, category: "Memory Lane", question: "Which day would you relive again?", answerMode: "both", vibe: "nostalgic", hostIntro: "If you could press replay on one day — which one?", hostReveal: "A day worth reliving. That's the whole point of memories, really.", audienceCue: "hearts", points: 420 },
  { id: 36, round: 4, category: "Memory Lane", question: "What is one tiny memory that nobody else would understand but means a lot to you?", answerMode: "both", vibe: "nostalgic", hostIntro: "The inside-joke memory. The one that needs no explanation between you two.", hostReveal: "Nobody else needed to get it. That's exactly what makes it yours.", audienceCue: "aww", points: 440 },
  { id: 37, round: 4, category: "Memory Lane", question: "What was the most unexpected fun you've had together?", answerMode: "story", vibe: "funny", hostIntro: "The plan-that-wasn't-a-plan story. Everyone loves those.", hostReveal: "Unplanned, unbothered, and clearly unforgettable.", audienceCue: "laugh", points: 460 },
  { id: 38, round: 4, category: "Memory Lane", question: "What is the most \"only we would find this funny\" moment?", answerMode: "both", vibe: "funny", hostIntro: "Private humor, now made very public. Let's hear it.", hostReveal: "The audience is confused and that is exactly correct — this one was never for us.", audienceCue: "laugh", points: 480 },
  { id: 39, round: 4, category: "Memory Lane", question: "What is one memory that defines your relationship?", answerMode: "both", vibe: "emotional", hostIntro: "If the whole relationship had to be summarized in one memory — this is it.", hostReveal: "That's the memory that basically explains everything else.", audienceCue: "hearts", points: 500 },
  { id: 40, round: 4, category: "Memory Lane", question: "What is one fight that now feels hilarious?", answerMode: "story", vibe: "funny", hostIntro: "A fight, now retold purely for comedy. Time heals, apparently.", hostReveal: "Serious at the time, absurd in hindsight. The relationship classic arc.", audienceCue: "laugh", points: 520 },

  // ============ ROUND 5: MIND READER ROUND ============
  { id: 41, round: 5, category: "Mind Reader", question: "What does your partner secretly overthink the most?", answerMode: "secret-both", vibe: "funny", hostIntro: "Write it down. Don't look at each other. No cheating.", hostReveal: "Let's see if you two actually know what's going on in each other's heads.", audienceCue: "ooh", points: 420 },
  { id: 42, round: 5, category: "Mind Reader", question: "What instantly puts them in a better mood?", answerMode: "secret-both", vibe: "emotional", hostIntro: "Secret answers, please. No peeking at each other's screens.", hostReveal: "A perfect match means genuinely paying attention. Let's check the scores.", audienceCue: "aww", points: 440 },
  { id: 43, round: 5, category: "Mind Reader", question: "What is their comfort zone?", answerMode: "secret-both", vibe: "emotional", hostIntro: "Type quietly. Reveal loudly.", hostReveal: "The comfort zone, mapped out by the person who should know it best.", audienceCue: "aww", points: 460 },
  { id: 44, round: 5, category: "Mind Reader", question: "What is their biggest soft spot?", answerMode: "secret-both", vibe: "emotional", hostIntro: "Everybody has one. Type what you think theirs is.", hostReveal: "The soft spot, exposed live in front of a studio audience. Sorry, not sorry.", audienceCue: "hearts", points: 480 },
  { id: 45, round: 5, category: "Mind Reader", question: "What is one thing they are currently stressed about?", answerMode: "secret-both", vibe: "emotional", hostIntro: "This one matters. Actually think before you type.", hostReveal: "This is the round where paying attention actually gets rewarded.", audienceCue: "aww", points: 500 },
  { id: 46, round: 5, category: "Mind Reader", question: "What would make them happiest this year?", answerMode: "secret-both", vibe: "future", hostIntro: "Secret predictions. Let's see who's actually been listening.", hostReveal: "A match here means somebody's been paying very close attention indeed.", audienceCue: "hearts", points: 520 },
  { id: 47, round: 5, category: "Mind Reader", question: "What is one dream they don't talk about enough?", answerMode: "secret-both", vibe: "emotional", hostIntro: "The quiet dream. The one that doesn't come up often.", hostReveal: "Maybe it should get talked about more, starting right now.", audienceCue: "aww", points: 540 },
  { id: 48, round: 5, category: "Mind Reader", question: "What is their hidden insecurity?", answerMode: "secret-both", vibe: "dangerous", hostIntro: "Handle this one gently. Type carefully.", hostReveal: "Delicate territory, handled — hopefully — with care.", audienceCue: "aww", points: 560 },
  { id: 49, round: 5, category: "Mind Reader", question: "What do they need more of: reassurance, space, attention, food, sleep, or compliments?", answerMode: "secret-both", vibe: "funny", hostIntro: "Multiple choice, but the stakes are still emotional.", hostReveal: "The answer to this one basically doubles as relationship advice.", audienceCue: "ooh", points: 580 },
  { id: 50, round: 5, category: "Mind Reader", question: "What is one thing they wish people understood about them?", answerMode: "secret-both", vibe: "emotional", hostIntro: "Final Mind Reader question. Make it a good one.", hostReveal: "And that's a wrap on the Mind Reader Round — verdict pending on how well you two actually know each other.", audienceCue: "hearts", points: 600 },

  // ============ ROUND 6: FINISH THE SENTENCE ============
  { id: 51, round: 6, category: "Finish The Sentence", question: "I knew I was dating a menace when…", answerMode: "rapid-fire", vibe: "funny", hostIntro: "No thinking. Just finish the sentence.", hostReveal: "The menace has been officially identified.", audienceCue: "laugh", points: 500 },
  { id: 52, round: 6, category: "Finish The Sentence", question: "I secretly love it when you…", answerMode: "rapid-fire", vibe: "emotional", hostIntro: "Quick — before you can overthink it.", hostReveal: "Secret's out. That's the fun part of this round.", audienceCue: "hearts", points: 520 },
  { id: 53, round: 6, category: "Finish The Sentence", question: "You make my life better because…", answerMode: "rapid-fire", vibe: "emotional", hostIntro: "Fast answer, real answer. Go.", hostReveal: "Unscripted and still that sincere. Impressive.", audienceCue: "aww", points: 540 },
  { id: 54, round: 6, category: "Finish The Sentence", question: "The one thing I never want to hear you say again is…", answerMode: "rapid-fire", vibe: "funny", hostIntro: "Rapid fire! Don't filter it.", hostReveal: "Filed under: household rules, effective immediately.", audienceCue: "laugh", points: 560 },
  { id: 55, round: 6, category: "Finish The Sentence", question: "Our relationship should come with a warning label that says…", answerMode: "rapid-fire", vibe: "funny", hostIntro: "Quick, before the lawyers show up.", hostReveal: "That label should genuinely be printed and framed.", audienceCue: "laugh", points: 580 },
  { id: 56, round: 6, category: "Finish The Sentence", question: "I knew you were special when…", answerMode: "rapid-fire", vibe: "emotional", hostIntro: "No pausing. Straight from the gut.", hostReveal: "Unfiltered and still that sweet. The rapid-fire round has a heart, apparently.", audienceCue: "hearts", points: 600 },
  { id: 57, round: 6, category: "Finish The Sentence", question: "I get most annoyed when you…", answerMode: "rapid-fire", vibe: "roast", hostIntro: "Fast and honest. That's the deal.", hostReveal: "That is a very specific, very real complaint. Respect the honesty.", audienceCue: "laugh", points: 620 },
  { id: 58, round: 6, category: "Finish The Sentence", question: "I feel closest to you when…", answerMode: "rapid-fire", vibe: "emotional", hostIntro: "Quick answer, big meaning.", hostReveal: "Sometimes the fast answers are the truest ones.", audienceCue: "hearts", points: 640 },
  { id: 59, round: 6, category: "Finish The Sentence", question: "If we had a movie title, it would be…", answerMode: "rapid-fire", vibe: "funny", hostIntro: "Working title. Go with your gut.", hostReveal: "Box office gold, honestly. Someone option the rights.", audienceCue: "laugh", points: 660 },
  { id: 60, round: 6, category: "Finish The Sentence", question: "One thing I want more of with you is…", answerMode: "rapid-fire", vibe: "future", hostIntro: "Last one of the round. Quick and true.", hostReveal: "A perfect note to end the rapid-fire round on.", audienceCue: "hearts", points: 680 },

  // ============ ROUND 7: GREEN FLAG ROUND ============
  { id: 61, round: 7, category: "Green Flag", question: "What is their biggest green flag?", answerMode: "both", vibe: "emotional", hostIntro: "Time to be sincere. No roasting allowed this round.", hostReveal: "A genuine, certified green flag. The good kind of headline.", audienceCue: "clap", points: 580 },
  { id: 62, round: 7, category: "Green Flag", question: "What is the kindest thing they've done for you?", answerMode: "both", vibe: "emotional", hostIntro: "Kindness round. Let's hear the real one.", hostReveal: "That's the kind of kindness that stays with you.", audienceCue: "aww", points: 600 },
  { id: 63, round: 7, category: "Green Flag", question: "What is something they do that shows they care?", answerMode: "both", vibe: "emotional", hostIntro: "The small proof-of-love moments. Give us one.", hostReveal: "Actions over words, and it clearly shows.", audienceCue: "hearts", points: 620 },
  { id: 64, round: 7, category: "Green Flag", question: "What is one thing about the way they love that you appreciate?", answerMode: "both", vibe: "emotional", hostIntro: "Get specific here. This is the good part.", hostReveal: "That's a very specific, very earned kind of appreciation.", audienceCue: "hearts", points: 640 },
  { id: 65, round: 7, category: "Green Flag", question: "What is one thing they do better than anyone else?", answerMode: "both", vibe: "emotional", hostIntro: "Their specialty. Their thing. What is it?", hostReveal: "Undefeated in that category, apparently.", audienceCue: "clap", points: 660 },
  { id: 66, round: 7, category: "Green Flag", question: "What makes them dependable?", answerMode: "both", vibe: "emotional", hostIntro: "Reliability isn't glamorous, but it matters. Talk to us.", hostReveal: "Dependable, and proven so on live television. Great endorsement.", audienceCue: "clap", points: 680 },
  { id: 67, round: 7, category: "Green Flag", question: "What is something they do that feels like home?", answerMode: "both", vibe: "emotional", hostIntro: "The feeling-like-home question. Take a moment.", hostReveal: "Home, defined as a feeling instead of a place. Beautiful answer.", audienceCue: "hearts", points: 700 },
  { id: 68, round: 7, category: "Green Flag", question: "What is one trait that makes you respect them more?", answerMode: "both", vibe: "emotional", hostIntro: "Respect round. The underrated ingredient.", hostReveal: "Respect: earned, stated, and now broadcast.", audienceCue: "clap", points: 720 },
  { id: 69, round: 7, category: "Green Flag", question: "What is one thing they do that makes you think, \"I'm lucky\"?", answerMode: "both", vibe: "emotional", hostIntro: "The gratitude question. Let it land.", hostReveal: "That's the feeling this entire round was built around.", audienceCue: "hearts", points: 740 },
  { id: 70, round: 7, category: "Green Flag", question: "What is one reason you choose them again and again?", answerMode: "both", vibe: "emotional", hostIntro: "Last question of the Green Flag Round. Make it count.", hostReveal: "Chosen, again and again. That's the whole point of all of this.", audienceCue: "hearts", points: 760 },

  // ============ ROUND 8: DANGEROUS BUT CUTE ============
  { id: 71, round: 8, category: "Dangerous But Cute", question: "What is one thing you were scared to tell them in the beginning?", answerMode: "both", vibe: "dangerous", hostIntro: "We're back to the scary stuff. In a fun way. Mostly.", hostReveal: "Said it, survived it, still together. Good outcome.", audienceCue: "gasp", points: 660 },
  { id: 72, round: 8, category: "Dangerous But Cute", question: "What is one thing you still disagree on?", answerMode: "both", vibe: "dangerous", hostIntro: "The unresolved debate. We're airing it live.", hostReveal: "An unresolved disagreement, now officially documented in front of witnesses.", audienceCue: "ooh", points: 680 },
  { id: 73, round: 8, category: "Dangerous But Cute", question: "What is one habit you have accepted because you love them?", answerMode: "both", vibe: "funny", hostIntro: "The habit you'd never accept from anyone else. Confess it.", hostReveal: "That is what love looks like, apparently — tolerating very specific nonsense.", audienceCue: "laugh", points: 700 },
  { id: 74, round: 8, category: "Dangerous But Cute", question: "What is one thing they do that tests your patience?", answerMode: "both", vibe: "roast", hostIntro: "Patience-testing round. Let it out.", hostReveal: "A very real, very relatable frustration. The audience feels seen.", audienceCue: "laugh", points: 720 },
  { id: 75, round: 8, category: "Dangerous But Cute", question: "What is one thing you were wrong about?", answerMode: "both", vibe: "dangerous", hostIntro: "Accountability round. Painful, but character-building.", hostReveal: "Admitting fault, on stage, with a spotlight on you. Respect.", audienceCue: "ooh", points: 740 },
  { id: 76, round: 8, category: "Dangerous But Cute", question: "What is something you wish both of you handled better?", answerMode: "both", vibe: "dangerous", hostIntro: "Getting real for a second. Take your time.", hostReveal: "That kind of honesty is exactly what makes relationships actually work.", audienceCue: "aww", points: 760 },
  { id: 77, round: 8, category: "Dangerous But Cute", question: "What is one thing you want to understand better about them?", answerMode: "both", vibe: "emotional", hostIntro: "A genuine question, no punchline needed.", hostReveal: "That's the kind of question good relationships keep asking.", audienceCue: "aww", points: 780 },
  { id: 78, round: 8, category: "Dangerous But Cute", question: "What is one thing that made the relationship stronger?", answerMode: "both", vibe: "emotional", hostIntro: "Every strong relationship has a moment like this. What's yours?", hostReveal: "Tested and strengthened. That's the whole arc right there.", audienceCue: "clap", points: 800 },
  { id: 79, round: 8, category: "Dangerous But Cute", question: "What is one lesson you learned the hard way?", answerMode: "both", vibe: "dangerous", hostIntro: "The hard-earned lesson round. No judgment here.", hostReveal: "Learned the hard way, but learned nonetheless. That's growth.", audienceCue: "aww", points: 820 },
  { id: 80, round: 8, category: "Dangerous But Cute", question: "What is one thing you are still figuring out together?", answerMode: "both", vibe: "dangerous", hostIntro: "Final Dangerous But Cute question. End it honestly.", hostReveal: "Still figuring it out, together. Honestly, that's the healthiest answer possible.", audienceCue: "hearts", points: 840 },

  // ============ ROUND 9: THE FUTURE ============
  { id: 81, round: 9, category: "The Future", question: "What is one experience you are excited to share together?", answerMode: "both", vibe: "future", hostIntro: "Let's look forward now. The final round begins.", hostReveal: "Something to look forward to. Put it on the calendar.", audienceCue: "confetti", points: 740 },
  { id: 82, round: 9, category: "The Future", question: "What is one tradition you want to create?", answerMode: "both", vibe: "future", hostIntro: "Every couple needs a tradition. What's yours going to be?", hostReveal: "A brand new tradition, born live on this very stage.", audienceCue: "clap", points: 760 },
  { id: 83, round: 9, category: "The Future", question: "What do you hope your relationship feels like five years from now?", answerMode: "both", vibe: "future", hostIntro: "Fast forward five years. Paint the picture.", hostReveal: "That's a beautiful five-year forecast. Framing it now.", audienceCue: "hearts", points: 780 },
  { id: 84, round: 9, category: "The Future", question: "What is one promise you want to make today?", answerMode: "both", vibe: "emotional", hostIntro: "This one's on the record. Choose your words.", hostReveal: "A promise, made live, in front of witnesses. That's binding now.", audienceCue: "hearts", points: 800 },
  { id: 85, round: 9, category: "The Future", question: "What is one thing you want to protect in this relationship?", answerMode: "both", vibe: "emotional", hostIntro: "What's worth protecting, no matter what?", hostReveal: "Noted, and the whole studio will hold you to it.", audienceCue: "hearts", points: 820 },
  { id: 86, round: 9, category: "The Future", question: "What is one dream you want to build together?", answerMode: "both", vibe: "future", hostIntro: "Big dreams round. Don't hold back.", hostReveal: "That's a dream worth building, brick by brick.", audienceCue: "confetti", points: 840 },
  { id: 87, round: 9, category: "The Future", question: "What should never change between you two?", answerMode: "both", vibe: "emotional", hostIntro: "Some things shouldn't evolve. What are yours?", hostReveal: "Locked in, permanently, by popular demand.", audienceCue: "hearts", points: 860 },
  { id: 88, round: 9, category: "The Future", question: "What is one adventure you want to go on?", answerMode: "both", vibe: "future", hostIntro: "Pick your adventure. The studio is taking notes.", hostReveal: "Add it to the list. The studio expects photos.", audienceCue: "confetti", points: 880 },
  { id: 89, round: 9, category: "The Future", question: "What kind of home/life do you imagine together?", answerMode: "both", vibe: "future", hostIntro: "Paint the whole picture. Take your time.", hostReveal: "That sounds like a genuinely lovely life. Building it starts now.", audienceCue: "hearts", points: 900 },
  { id: 90, round: 9, category: "The Future", question: "What is one message you want to give your future selves?", answerMode: "both", vibe: "future", hostIntro: "Final question of the night. Speak to your future selves directly.", hostReveal: "And that's the last question of the night — straight from the heart.", audienceCue: "hearts", points: 920 },

];

// Expose to global scope for script.js (no build tools / modules used, by design)
window.CONTESTANTS = CONTESTANTS;
window.GAME_TITLE = GAME_TITLE;
window.GAME_SUBTITLE = GAME_SUBTITLE;
window.ROUNDS = ROUNDS;
window.LIFELINES = LIFELINES;
window.REACTIONS = REACTIONS;
window.POINT_LADDER = POINT_LADDER;
window.REPORT_CATEGORIES = REPORT_CATEGORIES;
window.QUESTIONS = QUESTIONS;
