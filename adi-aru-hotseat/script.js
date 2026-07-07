/* ============================================================
   ADI & ARU: THE ULTIMATE RELATIONSHIP HOT SEAT
   script.js — game engine. Reads data from questions.js.
   No frameworks, no build step — just vanilla JS.
   ============================================================ */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     SOUND ENGINE (Web Audio API — no audio files)
  --------------------------------------------------------- */
  const SoundEngine = (() => {
    let ctx = null;
    let musicOn = true;
    let sfxOn = true;
    let musicTimer = null;

    function getCtx() {
      if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === "suspended") ctx.resume();
      return ctx;
    }

    function tone({ freq = 440, dur = 0.2, type = "sine", gain = 0.18, when = 0, glideTo = null }) {
      if (!sfxOn) return;
      const c = getCtx();
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, c.currentTime + when);
      if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, c.currentTime + when + dur);
      g.gain.setValueAtTime(0.0001, c.currentTime + when);
      g.gain.exponentialRampToValueAtTime(gain, c.currentTime + when + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + when + dur);
      osc.connect(g).connect(c.destination);
      osc.start(c.currentTime + when);
      osc.stop(c.currentTime + when + dur + 0.08);
    }

    function noiseBurst({ dur = 0.4, gain = 0.22, filterFreq = 1500, when = 0 }) {
      if (!sfxOn) return;
      const c = getCtx();
      const bufferSize = Math.max(1, Math.floor(c.sampleRate * dur));
      const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const src = c.createBufferSource();
      src.buffer = buffer;
      const filter = c.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = filterFreq;
      const g = c.createGain();
      g.gain.setValueAtTime(gain, c.currentTime + when);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + when + dur);
      src.connect(filter).connect(g).connect(c.destination);
      src.start(c.currentTime + when);
    }

    const sounds = {
      chime() { [523, 659, 784, 1046].forEach((f, i) => tone({ freq: f, dur: 0.25, type: "triangle", gain: 0.16, when: i * 0.09 })); },
      buzz() { tone({ freq: 180, dur: 0.4, type: "sawtooth", gain: 0.18, glideTo: 80 }); },
      clap() { for (let i = 0; i < 12; i++) noiseBurst({ dur: 0.14, gain: 0.14, filterFreq: 1200 + Math.random() * 2000, when: i * 0.055 }); },
      laugh() { [400, 500, 420, 520, 440, 560].forEach((f, i) => tone({ freq: f, dur: 0.11, type: "square", gain: 0.1, when: i * 0.09 })); },
      gasp() { tone({ freq: 950, dur: 0.35, type: "sine", gain: 0.18, glideTo: 300 }); },
      hearts() { [660, 830, 990].forEach((f, i) => tone({ freq: f, dur: 0.3, type: "sine", gain: 0.15, when: i * 0.12 })); },
      drumroll() { for (let i = 0; i < 16; i++) noiseBurst({ dur: 0.08, gain: 0.09, filterFreq: 220, when: i * 0.065 }); },
      ooh() { tone({ freq: 520, dur: 0.4, type: "sine", gain: 0.14, glideTo: 760 }); },
      danger() { [220, 180, 220, 180].forEach((f, i) => tone({ freq: f, dur: 0.17, type: "square", gain: 0.14, when: i * 0.15 })); },
      confetti() { for (let i = 0; i < 7; i++) tone({ freq: 600 + Math.random() * 700, dur: 0.1, type: "triangle", gain: 0.14, when: i * 0.05 }); },
      click() { tone({ freq: 720, dur: 0.06, type: "sine", gain: 0.09 }); },
    };

    function play(name) {
      if (sounds[name]) sounds[name]();
    }

    function stepMusic() {
      if (!musicOn) return;
      const notes = [220, 261.6, 329.6, 261.6, 246.9, 293.7, 220, 196];
      const c = getCtx();
      const idx = stepMusic._i || 0;
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = "sine";
      osc.frequency.value = notes[idx % notes.length];
      g.gain.setValueAtTime(0.0001, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.045, c.currentTime + 0.06);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.9);
      osc.connect(g).connect(c.destination);
      osc.start();
      osc.stop(c.currentTime + 1);
      stepMusic._i = idx + 1;
    }

    function startMusic() {
      stopMusic();
      if (!musicOn) return;
      stepMusic();
      musicTimer = setInterval(stepMusic, 950);
    }
    function stopMusic() {
      if (musicTimer) clearInterval(musicTimer);
      musicTimer = null;
    }
    function setMusic(on) {
      musicOn = on;
      if (on) startMusic();
      else stopMusic();
    }
    function setSfx(on) {
      sfxOn = on;
    }

    return { play, setMusic, setSfx, startMusic, stopMusic, unlock: getCtx };
  })();

  /* ---------------------------------------------------------
     STATE
  --------------------------------------------------------- */
  const state = {
    order: QUESTIONS.slice(),
    currentIndex: 0,
    score: 0,
    musicOn: true,
    sfxOn: true,
    revealed: false,
    roundFilter: null,
    lifelinesUsed: {},
    reactionCounts: { clap: 0, laugh: 0, gasp: 0, aww: 0, ooh: 0, danger: 0, confetti: 0, hearts: 0 },
  };
  LIFELINES.forEach((l) => (state.lifelinesUsed[l.id] = false));

  /* ---------------------------------------------------------
     DOM SHORTCUTS
  --------------------------------------------------------- */
  const $ = (id) => document.getElementById(id);
  const screens = {
    intro: $("screen-intro"),
    contestants: $("screen-contestants"),
    welcome: $("screen-welcome"),
    rounds: $("screen-rounds"),
    game: $("screen-game"),
    final: $("screen-final"),
  };

  function showScreen(name) {
    Object.values(screens).forEach((s) => s.classList.remove("active"));
    screens[name].classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------------------------------------------------------
     PARTICLES (ambient background)
  --------------------------------------------------------- */
  function spawnParticles() {
    const container = $("particles");
    const count = 26;
    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.left = Math.random() * 100 + "vw";
      p.style.animationDuration = 6 + Math.random() * 10 + "s";
      p.style.animationDelay = Math.random() * 10 + "s";
      p.style.opacity = 0.3 + Math.random() * 0.5;
      container.appendChild(p);
    }
  }

  /* ---------------------------------------------------------
     FLOATING FX (emoji bursts + confetti)
  --------------------------------------------------------- */
  function spawnEmojiBurst(emoji, count = 10) {
    const layer = $("fxLayer");
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "fx-emoji";
      el.textContent = emoji;
      el.style.left = 5 + Math.random() * 90 + "vw";
      el.style.animationDelay = Math.random() * 0.4 + "s";
      el.style.fontSize = 1.4 + Math.random() * 1.6 + "rem";
      layer.appendChild(el);
      setTimeout(() => el.remove(), 3200);
    }
  }

  function spawnConfetti(count = 40) {
    const layer = $("fxLayer");
    const colors = ["#f7cf6b", "#ff8fc4", "#6fb7ff", "#ffe08a", "#ffffff"];
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "fx-confetti";
      el.style.left = Math.random() * 100 + "vw";
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      el.style.animationDuration = 1.6 + Math.random() * 1.6 + "s";
      el.style.animationDelay = Math.random() * 0.5 + "s";
      layer.appendChild(el);
      setTimeout(() => el.remove(), 3600);
    }
  }

  /* ---------------------------------------------------------
     INTRO SCREEN
  --------------------------------------------------------- */
  const INTRO_LINES = [
    "Welcome to the hot seat…",
    "Tonight, we find out how well Adi and Aru really know each other.",
    "Love. Drama. Memories. Roasts. Dangerous revelations.",
    "There is no lifeline strong enough for some of these questions.",
  ];
  const TAGLINES = [
    "Kaun Banega Relationshippati",
    "No prize money. Only permanent screenshot material.",
    "Nine rounds. Ninety questions. Zero chill.",
  ];

  function playIntroLines() {
    const wrap = $("introLines");
    wrap.innerHTML = "";
    INTRO_LINES.forEach((line, i) => {
      const p = document.createElement("p");
      p.textContent = line;
      p.style.animationDelay = i * 0.9 + "s";
      wrap.appendChild(p);
    });
    let ti = 0;
    const tagEl = $("taglineText");
    tagEl.textContent = TAGLINES[0];
    setInterval(() => {
      ti = (ti + 1) % TAGLINES.length;
      tagEl.style.opacity = 0;
      setTimeout(() => {
        tagEl.textContent = TAGLINES[ti];
        tagEl.style.transition = "opacity .5s";
        tagEl.style.opacity = 1;
      }, 400);
    }, 4000);
  }

  /* ---------------------------------------------------------
     HOST WELCOME
  --------------------------------------------------------- */
  const WELCOME_TEXT =
    `Good evening, everyone. I'm your host for tonight, and we are about to find out ` +
    `exactly how well ${CONTESTANTS.a} and ${CONTESTANTS.b} know each other — and themselves. ` +
    `Nine rounds await: nostalgia, roasts, secrets, rapid fire, and a few dangerously cute confessions. ` +
    `There is no cash prize tonight. Just love, laughter, a little bit of chaos, and relationship points ` +
    `that matter far more than they should. Are we ready? Lock kiya jaaye!`;

  /* ---------------------------------------------------------
     ROUND SELECT SCREEN
  --------------------------------------------------------- */
  function renderRoundGrid() {
    const grid = $("roundGrid");
    grid.innerHTML = "";

    const allCard = document.createElement("div");
    allCard.className = "round-card";
    allCard.innerHTML = `<span class="r-num">FULL SHOW</span><span class="r-icon">🎬</span>
      <div class="r-name">Play All 9 Rounds</div>
      <div class="r-tag">The complete 90-question experience, in order.</div>`;
    allCard.addEventListener("click", () => startGame(null));
    grid.appendChild(allCard);

    ROUNDS.forEach((r) => {
      const card = document.createElement("div");
      card.className = "round-card";
      card.innerHTML = `<span class="r-num">Round ${r.id}</span><span class="r-icon">${r.icon}</span>
        <div class="r-name">${r.name}</div>
        <div class="r-tag">${r.tagline}</div>`;
      card.addEventListener("click", () => startGame(r.id));
      grid.appendChild(card);
    });

    $("scorePreviewRounds").textContent = `Current Relationship Points: ${state.score}`;
  }

  function startGame(roundId) {
    state.roundFilter = roundId;
    state.order = roundId ? QUESTIONS.filter((q) => q.round === roundId) : QUESTIONS.slice();
    state.currentIndex = 0;
    showScreen("game");
    renderLadder();
    renderLifelines();
    renderReactions();
    renderQuestion();
  }

  /* ---------------------------------------------------------
     LADDER
  --------------------------------------------------------- */
  function currentTierIndex() {
    let idx = 0;
    POINT_LADDER.forEach((tier, i) => {
      if (state.score >= tier.threshold) idx = i;
    });
    return idx;
  }

  function renderLadder() {
    const list = $("ladderList");
    list.innerHTML = "";
    const curIdx = currentTierIndex();
    POINT_LADDER.forEach((tier, i) => {
      const li = document.createElement("li");
      li.textContent = tier.label;
      if (i === curIdx) li.classList.add("current");
      else if (i < curIdx) li.classList.add("reached");
      list.appendChild(li);
    });
    $("scoreValue").textContent = state.score;
  }

  /* ---------------------------------------------------------
     LIFELINES
  --------------------------------------------------------- */
  function renderLifelines() {
    const row = $("lifelineRow");
    row.innerHTML = "";
    LIFELINES.forEach((l) => {
      const card = document.createElement("div");
      card.className = "lifeline-card" + (state.lifelinesUsed[l.id] ? " used" : "");
      card.innerHTML = `<span class="l-icon">${l.icon}</span>${l.label}`;
      card.title = l.description;
      card.addEventListener("click", () => useLifeline(l.id, card));
      row.appendChild(card);
    });
  }

  function useLifeline(id, cardEl) {
    if (state.lifelinesUsed[id]) return;
    const lifeline = LIFELINES.find((l) => l.id === id);
    state.lifelinesUsed[id] = true;
    cardEl.classList.add("activating");
    SoundEngine.play(id === "pause" ? "drumroll" : "chime");
    const line = lifeline.commentary[Math.floor(Math.random() * lifeline.commentary.length)];
    setHostText(`${lifeline.icon} ${lifeline.label}! ${line}`);
    setTimeout(() => {
      cardEl.classList.remove("activating");
      cardEl.classList.add("used");
    }, 650);
  }

  /* ---------------------------------------------------------
     REACTIONS
  --------------------------------------------------------- */
  function renderReactions() {
    const grid = $("reactionGrid");
    grid.innerHTML = "";
    REACTIONS.forEach((r) => {
      const btn = document.createElement("div");
      btn.className = "reaction-btn";
      btn.innerHTML = `<span>${r.icon}</span>${r.label}`;
      btn.addEventListener("click", () => triggerReaction(r.id));
      grid.appendChild(btn);
    });
  }

  function triggerReaction(id) {
    const reaction = REACTIONS.find((r) => r.id === id);
    if (!reaction) return;
    state.reactionCounts[id] = (state.reactionCounts[id] || 0) + 1;
    SoundEngine.play(id);
    if (id === "confetti") spawnConfetti(45);
    else spawnEmojiBurst(reaction.icon, id === "hearts" ? 14 : 10);
    const line = reaction.hostLines[Math.floor(Math.random() * reaction.hostLines.length)];
    setHostText(line);
  }

  /* ---------------------------------------------------------
     QUESTION RENDERING
  --------------------------------------------------------- */
  const MODE_LABEL = {
    adi: `${CONTESTANTS.a} Answers`,
    aru: `${CONTESTANTS.b} Answers`,
    both: "Both Answer",
    "secret-both": "Secret Mode",
    "rapid-fire": "Rapid Fire",
    story: "Story Mode",
  };
  const ANSWER_TARGET = {
    adi: `🎤 ${CONTESTANTS.a}, the hot seat is yours.`,
    aru: `🎤 ${CONTESTANTS.b}, the hot seat is yours.`,
    both: `🎤 ${CONTESTANTS.a} & ${CONTESTANTS.b} — both of you, out loud.`,
    "secret-both": "🔒 Type your answers below secretly, then reveal together.",
    "rapid-fire": "⚡ No overthinking. Finish the sentence, fast!",
    story: "📖 Tell us the full story — details, please.",
  };

  function currentQuestion() {
    return state.order[state.currentIndex];
  }

  function setHostText(text) {
    const el = $("hostText");
    el.style.opacity = 0;
    setTimeout(() => {
      el.textContent = text;
      el.style.transition = "opacity .3s";
      el.style.opacity = 1;
    }, 120);
  }

  function renderQuestion() {
    const q = currentQuestion();
    if (!q) return;
    state.revealed = false;

    const round = ROUNDS.find((r) => r.id === q.round);
    $("roundBanner").textContent = `Round ${q.round} · ${round ? round.name : q.category} — Question ${state.currentIndex + 1} of ${state.order.length}`;

    $("vibeBadge").textContent = q.vibe;
    $("modeBadge").textContent = MODE_LABEL[q.answerMode] || q.answerMode;
    $("pointsBadge").textContent = `+${q.points}`;
    $("questionText").textContent = q.question;
    $("answerTarget").textContent = ANSWER_TARGET[q.answerMode] || "";

    setHostText(q.hostIntro);

    const secretPanel = $("secretPanel");
    if (q.answerMode === "secret-both") {
      secretPanel.classList.remove("hidden");
      $("secretAdi").value = "";
      $("secretAru").value = "";
      $("secretRevealBox").classList.add("hidden");
    } else {
      secretPanel.classList.add("hidden");
    }

    // little glow pulse for the new question
    const box = $("questionBox");
    box.style.animation = "none";
    void box.offsetWidth;
    box.style.animation = "";
  }

  function revealCurrent() {
    const q = currentQuestion();
    if (!q) return;
    const btn = $("btnReveal");
    btn.disabled = true;
    SoundEngine.play("drumroll");
    setHostText("Lock kiya jaaye… suspense building…");
    setTimeout(() => {
      state.revealed = true;
      setHostText(q.hostReveal);
      SoundEngine.play(q.audienceCue === "confetti" ? "confetti" : q.audienceCue);
      if (q.audienceCue === "confetti") spawnConfetti(35);
      else {
        const reaction = REACTIONS.find((r) => r.id === q.audienceCue);
        if (reaction) spawnEmojiBurst(reaction.icon, 10);
      }
      btn.disabled = false;
    }, 750);
  }

  function revealSecret() {
    const a = $("secretAdi").value.trim() || "(no answer typed)";
    const b = $("secretAru").value.trim() || "(no answer typed)";
    SoundEngine.play("drumroll");
    setHostText("Two secret answers. One dramatic reveal. Here we go…");
    setTimeout(() => {
      $("revealAdiText").textContent = a;
      $("revealAruText").textContent = b;
      $("secretRevealBox").classList.remove("hidden");
      SoundEngine.play("chime");
      spawnEmojiBurst("🧠", 8);
      setHostText("Let's see just how well you two actually read each other's minds.");
    }, 700);
  }

  function goNext() {
    if (state.currentIndex < state.order.length - 1) {
      state.currentIndex++;
      renderQuestion();
    } else {
      setHostText("That's the last question of this round! Head to the Final Report whenever you're ready.");
    }
  }
  function goPrev() {
    if (state.currentIndex > 0) {
      state.currentIndex--;
      renderQuestion();
    }
  }
  function shuffleQuestions() {
    for (let i = state.order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [state.order[i], state.order[j]] = [state.order[j], state.order[i]];
    }
    state.currentIndex = 0;
    SoundEngine.play("click");
    setHostText("Questions shuffled! Absolutely anything could come up now.");
    renderQuestion();
  }

  function awardPoints() {
    const q = currentQuestion();
    if (!q) return;
    const before = currentTierIndex();
    state.score += q.points;
    SoundEngine.play("chime");
    renderLadder();
    if (currentTierIndex() > before) {
      spawnConfetti(50);
      SoundEngine.play("confetti");
      setHostText(`Level up! You've just reached "${POINT_LADDER[currentTierIndex()].label}". Somebody is earning major relationship points tonight.`);
    } else {
      setHostText(`+${q.points} Relationship Points awarded. That answer deserves it.`);
    }
  }
  function deductPoints() {
    state.score = Math.max(0, state.score - 50);
    SoundEngine.play("buzz");
    renderLadder();
    setHostText("Ohhh… we have a difference of opinion. -50 points, tough crowd tonight.");
  }
  function resetScore() {
    if (!confirm("Reset Relationship Points back to zero?")) return;
    state.score = 0;
    renderLadder();
    setHostText("A clean slate. Fresh start. Let's build those points back up.");
  }
  function restartGame() {
    if (!confirm("Restart the whole show? This resets score, lifelines, and reactions.")) return;
    state.score = 0;
    state.currentIndex = 0;
    state.roundFilter = null;
    state.order = QUESTIONS.slice();
    LIFELINES.forEach((l) => (state.lifelinesUsed[l.id] = false));
    Object.keys(state.reactionCounts).forEach((k) => (state.reactionCounts[k] = 0));
    showScreen("rounds");
    renderRoundGrid();
  }

  /* ---------------------------------------------------------
     FINAL REPORT CARD
  --------------------------------------------------------- */
  const CLOSING_SPEECH =
    `${CONTESTANTS.a} and ${CONTESTANTS.b}, tonight we learned that your relationship has drama, comedy, ` +
    `suspense, emotional depth, and excellent content value. But most importantly, it has heart. ` +
    `May your future have more memories, more laughter, fewer overthinking spirals, and unlimited relationship points.`;

  function pick(seed) {
    return Math.abs(Math.floor(seed)) % 2 === 0 ? CONTESTANTS.a : CONTESTANTS.b;
  }

  function tierLabel() {
    return POINT_LADDER[currentTierIndex()].label;
  }

  function computeReport() {
    const c = state.reactionCounts;
    const lifelinesUsedCount = Object.values(state.lifelinesUsed).filter(Boolean).length;
    const totalReactions = Object.values(c).reduce((a, b) => a + b, 0);
    const scorePct = Math.min(100, Math.round((state.score / 25000) * 100));
    const chaos = Math.min(100, Math.max(28, Math.round(c.laugh * 9 + c.danger * 11 + lifelinesUsedCount * 7 + totalReactions * 2)));
    const soulmate = Math.min(100, Math.max(35, Math.round(c.hearts * 9 + c.aww * 7 + scorePct * 0.6)));

    const values = {
      softie: pick(c.aww + c.hearts + 1),
      menace: pick(c.laugh + c.danger + 2),
      greenflag: pick(state.score + 3),
      dramatic: pick(c.gasp + lifelinesUsedCount + 4),
      memory: pick(state.currentIndex + 5),
      overthinker: pick(lifelinesUsedCount + totalReactions + 6),
      chaos: chaos + "%",
      soulmate: soulmate + "%",
      goat: tierLabel(),
    };
    return values;
  }

  function renderFinalReport() {
    const values = computeReport();
    $("finalScoreValue").textContent = state.score;
    $("finalScoreLabel").textContent = `Relationship Points · ${tierLabel()}`;

    const grid = $("reportGrid");
    grid.innerHTML = "";
    REPORT_CATEGORIES.forEach((cat, i) => {
      const card = document.createElement("div");
      card.className = "report-card";
      card.style.animationDelay = i * 0.08 + "s";
      card.innerHTML = `<div class="rc-icon">${cat.icon}</div>
        <div class="rc-label">${cat.label}</div>
        <div class="rc-value">${values[cat.id]}</div>`;
      grid.appendChild(card);
    });

    $("closingSpeech").textContent = CLOSING_SPEECH;
    spawnConfetti(60);
    SoundEngine.play("confetti");
    setTimeout(() => spawnEmojiBurst("❤️", 16), 400);
  }

  function goFinalReport() {
    showScreen("final");
    renderFinalReport();
  }

  /* ---------------------------------------------------------
     SOUND TOGGLES
  --------------------------------------------------------- */
  function toggleMusic() {
    state.musicOn = !state.musicOn;
    SoundEngine.setMusic(state.musicOn);
    $("musicToggle").classList.toggle("off", !state.musicOn);
  }
  function toggleSfx() {
    state.sfxOn = !state.sfxOn;
    SoundEngine.setSfx(state.sfxOn);
    $("sfxToggle").classList.toggle("off", !state.sfxOn);
  }
  function muteAll(muted) {
    state.musicOn = !muted;
    state.sfxOn = !muted;
    SoundEngine.setMusic(state.musicOn);
    SoundEngine.setSfx(state.sfxOn);
    $("musicToggle").classList.toggle("off", !state.musicOn);
    $("sfxToggle").classList.toggle("off", !state.sfxOn);
  }

  /* ---------------------------------------------------------
     EVENT WIRING
  --------------------------------------------------------- */
  function wireEvents() {
    $("btnEnterShow").addEventListener("click", () => {
      SoundEngine.unlock();
      SoundEngine.startMusic();
      SoundEngine.play("chime");
      showScreen("contestants");
    });
    $("btnToWelcome").addEventListener("click", () => {
      SoundEngine.play("clap");
      spawnEmojiBurst("👏", 8);
      $("welcomeText").textContent = WELCOME_TEXT;
      showScreen("welcome");
    });
    $("btnToRounds").addEventListener("click", () => {
      SoundEngine.play("drumroll");
      showScreen("rounds");
      renderRoundGrid();
    });

    $("btnPrev").addEventListener("click", goPrev);
    $("btnNext").addEventListener("click", goNext);
    $("btnReveal").addEventListener("click", revealCurrent);
    $("btnSkip").addEventListener("click", () => {
      setHostText("Skipped! Some questions live to haunt another day.");
      goNext();
    });
    $("btnShuffle").addEventListener("click", shuffleQuestions);
    $("btnAward").addEventListener("click", awardPoints);
    $("btnDeduct").addEventListener("click", deductPoints);
    $("btnResetScore").addEventListener("click", resetScore);
    $("btnRestart").addEventListener("click", restartGame);
    $("btnFinal").addEventListener("click", goFinalReport);
    $("btnRevealSecret").addEventListener("click", revealSecret);
    $("btnPlayAgain").addEventListener("click", restartGame);

    $("musicToggle").addEventListener("click", toggleMusic);
    $("sfxToggle").addEventListener("click", toggleSfx);

    document.addEventListener("keydown", (e) => {
      const tag = document.activeElement.tagName;
      if (tag === "TEXTAREA" || tag === "INPUT") return;
      if (!screens.game.classList.contains("active")) return;

      switch (e.key.toLowerCase()) {
        case " ":
          e.preventDefault();
          goNext();
          break;
        case "r":
          revealCurrent();
          break;
        case "c":
          triggerReaction("clap");
          break;
        case "l":
          triggerReaction("laugh");
          break;
        case "g":
          triggerReaction("gasp");
          break;
        case "a":
          triggerReaction("aww");
          break;
        case "h":
          triggerReaction("hearts");
          break;
        case "m":
          muteAll(state.musicOn || state.sfxOn);
          break;
        case "f":
          goFinalReport();
          break;
      }
    });
  }

  /* ---------------------------------------------------------
     INIT
  --------------------------------------------------------- */
  function init() {
    spawnParticles();
    playIntroLines();
    wireEvents();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
