// Riddle Jeopardy - Core Game Engine

document.addEventListener("DOMContentLoaded", () => {
  // --- STATE ---
  const state = {
    teams: [],
    currentTeamIndex: 0,
    categories: [],
    riddles: {}, // { category: { diff: Riddle } }
    answeredTilesCount: 0,
    roundNumber: 1,
    questionsAnsweredThisRound: 0,
    
    // Active riddle state
    activeRiddle: null,
    activeTileEl: null,
    activeCategory: null,
    activePoints: 0,
    
    // Timer state
    timerInterval: null,
    timerSecondsLeft: 0,
    timerDurationTotal: 0,
    
    // Tie breaker state
    isTieBreaker: false,
    tieBreakerTeams: [],
    currentTieBreakerIndex: 0,
    
    // Confetti animation loop request ID
    confettiRequestID: null
  };

  // Pre-selected harmonized team colors
  const TEAM_COLORS = [
    { border: "#00f0ff", rgb: "0, 240, 255" }, // Neon Cyan
    { border: "#ff007f", rgb: "255, 0, 127" }, // Neon Pink
    { border: "#06d6a0", rgb: "6, 214, 160" }, // Neon Emerald
    { border: "#ffb703", rgb: "255, 183, 3" },  // Neon Gold
    { border: "#9d4edf", rgb: "157, 78, 223" } // Neon Purple
  ];

  // Large Catalog of Emojis for Avatars
  const AVATAR_CATALOG = {
    "Smileys": ["😁", "😊", "😂", "😍", "😎", "🤪", "🤠", "🤖"],
    "Animals": ["🐶", "🐱", "🦁", "🦄", "🐼", "🦊", "🐸", "🐙", "🦖"],
    "Food": ["🍎", "🍔", "🍕", "🎂", "🍩", " popcorn", "🍓", "🍦"],
    "Travel": ["🚀", "✈️", "🗽", "⛰️", "🛸", "🎈", "⛺", "🌈"],
    "Objects": ["⚽", "🎮", "💡", "💰", "🏆", "🎁", "🎨", "🧩"],
    "Symbols": ["❤️", "⭐", "🔥", "👑", "🍀", "⚡", "🔮", "👽"]
  };

  // --- AUDIO INITIALIZATION ---
  const muteBtn = document.getElementById("btn-toggle-mute");
  const resetBtn = document.getElementById("btn-reset-game");

  function syncMuteButtonUI() {
    const isMuted = SoundEffects.getMuted();
    muteBtn.textContent = isMuted ? "🔇" : "🔊";
  }

  muteBtn.addEventListener("click", () => {
    const muted = SoundEffects.toggleMute();
    muteBtn.textContent = muted ? "🔇" : "🔊";
    SoundEffects.playClick();
  });
  
  resetBtn.addEventListener("click", () => {
    SoundEffects.playClick();
    if (confirm("Are you sure you want to restart the game? You will lose all current scores.")) {
      resetGameToSetup();
    }
  });

  syncMuteButtonUI();

  // --- FLOATING BACKGROUND ANIMATION ---
  function initFloatingBackground() {
    const container = document.getElementById("floating-elements-container");
    const icons = ["❓", "💡", "🔍", "✨", "⭐", "🧩", "❔", "🧠"];
    
    // Create 15 floating items
    for (let i = 0; i < 15; i++) {
      const item = document.createElement("div");
      item.className = "float-item";
      item.textContent = icons[Math.floor(Math.random() * icons.length)];
      
      // Randomize layout properties
      item.style.left = `${Math.random() * 95}%`;
      item.style.fontSize = `${1.2 + Math.random() * 1.8}rem`;
      
      const duration = 12 + Math.random() * 10;
      const delay = Math.random() * -15; // negative delay so they spawn at offsets immediately
      
      item.style.animationDuration = `${duration}s`;
      item.style.animationDelay = `${delay}s`;
      
      container.appendChild(item);
    }
  }

  initFloatingBackground();

  // --- HIGH-PERFORMANCE CUSTOM CONFETTI ---
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  let confettiParticles = [];
  
  function resizeConfettiCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  window.addEventListener("resize", resizeConfettiCanvas);
  resizeConfettiCanvas();

  class ConfettiParticle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.size = 8 + Math.random() * 8;
      this.color = color;
      
      // Velocity vector
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 8;
      this.vx = Math.cos(angle) * speed;
      this.vy = (Math.sin(angle) * speed) - 4; // bias upward
      
      this.rotation = Math.random() * 360;
      this.rotationSpeed = -5 + Math.random() * 10;
      
      this.gravity = 0.15;
      this.opacity = 1;
      this.fade = 0.005 + Math.random() * 0.01;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.gravity;
      this.rotation += this.rotationSpeed;
      this.opacity -= this.fade;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
      ctx.restore();
    }
  }

  function launchConfettiBurst(x, y, count = 60) {
    const colors = ["#00f0ff", "#ff007f", "#ffb703", "#06d6a0", "#9d4edf", "#ffffff"];
    for (let i = 0; i < count; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      confettiParticles.push(new ConfettiParticle(x, y, color));
    }
    
    if (!state.confettiRequestID) {
      animateConfetti();
    }
  }

  function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    confettiParticles = confettiParticles.filter(p => p.opacity > 0);
    confettiParticles.forEach(p => {
      p.update();
      p.draw();
    });
    
    if (confettiParticles.length > 0) {
      state.confettiRequestID = requestAnimationFrame(animateConfetti);
    } else {
      state.confettiRequestID = null;
    }
  }

  // Confetti Fountain for Victory
  let victoryFountainInterval = null;
  function startVictoryConfettiFountain() {
    stopVictoryConfettiFountain();
    victoryFountainInterval = setInterval(() => {
      // Launch from bottom corners
      launchConfettiBurst(100, canvas.height - 50, 15);
      launchConfettiBurst(canvas.width - 100, canvas.height - 50, 15);
      // Launch from random top positions
      launchConfettiBurst(Math.random() * canvas.width, 50, 5);
    }, 250);
  }

  function stopVictoryConfettiFountain() {
    if (victoryFountainInterval) {
      clearInterval(victoryFountainInterval);
      victoryFountainInterval = null;
    }
  }

  // --- SCREEN SWITCHER STATE MACHINE ---
  function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll(".screen").forEach(s => {
      s.classList.remove("active");
    });
    
    // Show active screen
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add("active");
    }
    
    // Toggle Reset Button Visibility
    if (screenId === "screen-game-board" || screenId === "screen-leaderboard" || screenId === "screen-final-podium") {
      resetBtn.style.display = "flex";
    } else {
      resetBtn.style.display = "none";
    }
  }

  // --- PLAYFLOW NAVIGATION ---
  document.getElementById("btn-start-play-flow").addEventListener("click", () => {
    SoundEffects.playClick();
    showScreen("screen-team-setup");
    initTeamSetupCards();
  });

  document.getElementById("btn-back-to-howtoplay").addEventListener("click", () => {
    SoundEffects.playClick();
    showScreen("screen-how-to-play");
  });

  // --- TEAM SETUP MANAGEMENT ---
  const teamSetupListEl = document.getElementById("teams-setup-list");
  const addTeamCardBtn = document.getElementById("btn-add-team-card");

  function initTeamSetupCards() {
    // Clear any active team setups except the Add Team button
    const setupCards = teamSetupListEl.querySelectorAll(".team-setup-card");
    setupCards.forEach(c => c.remove());
    
    state.teams = [];
    
    // Add two default teams to make the setup fast
    addTeamSetupField("Riddle Masters", "🦄");
    addTeamSetupField("Brain Busters", "🎮");
  }

  function addTeamSetupField(defaultName = "", defaultAvatar = "Skip") {
    const totalSetupCards = teamSetupListEl.querySelectorAll(".team-setup-card").length;
    if (totalSetupCards >= 5) {
      alert("Maximum of 5 teams allowed!");
      return;
    }

    const teamIndex = totalSetupCards;
    const colorTheme = TEAM_COLORS[teamIndex];

    const card = document.createElement("div");
    card.className = "team-setup-card active";
    card.style.setProperty("--color-border", colorTheme.border);
    card.setAttribute("data-team-setup-index", teamIndex);

    // Build unique UI ID tags
    const inputId = `team-input-name-${teamIndex}`;
    
    card.innerHTML = `
      <div class="team-header">
        <span>Team ${teamIndex + 1}</span>
        ${teamIndex >= 2 ? `<button class="remove-team-btn" title="Remove Team">✖</button>` : ''}
      </div>
      <input type="text" id="${inputId}" placeholder="Enter Team Name" value="${defaultName}" maxlength="18">
      <div class="avatar-section">
        <div class="selected-avatar-preview" id="avatar-preview-${teamIndex}" style="--color-border: ${colorTheme.border};">
          ${defaultAvatar === "Skip" ? "👤" : defaultAvatar}
        </div>
        <span style="font-size: 0.75rem; color: var(--text-dim);">Click to pick Avatar</span>
      </div>
      
      <!-- Pop-up overlay grid selector -->
      <div class="avatar-grid-overlay" id="avatar-overlay-${teamIndex}">
        <div class="avatar-overlay-header">
          <span>Choose Avatar</span>
          <button class="remove-team-btn" style="color: #fff; font-size: 1.1rem;" id="close-avatar-${teamIndex}">✖</button>
        </div>
        <div class="avatar-tab-content">
          ${Object.values(AVATAR_CATALOG).flat().map(emoji => `
            <button class="avatar-option-btn" type="button" data-emoji="${emoji}">${emoji}</button>
          `).join('')}
        </div>
        <button class="skip-avatar-btn" type="button" id="skip-btn-${teamIndex}">Skip Avatar</button>
      </div>
    `;

    // Insert before the Add Team button
    teamSetupListEl.insertBefore(card, addTeamCardBtn);

    // Bind Event Listeners for Avatar selection overlay
    const avatarPreview = card.querySelector(".selected-avatar-preview");
    const overlay = card.querySelector(".avatar-grid-overlay");
    const closeBtn = card.querySelector(`#close-avatar-${teamIndex}`);
    const skipBtn = card.querySelector(`#skip-btn-${teamIndex}`);

    avatarPreview.addEventListener("click", () => {
      SoundEffects.playClick();
      overlay.classList.add("active");
    });

    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      SoundEffects.playClick();
      overlay.classList.remove("active");
    });

    skipBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      SoundEffects.playClick();
      avatarPreview.textContent = "👤";
      overlay.classList.remove("active");
    });

    overlay.querySelectorAll(".avatar-option-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const emoji = btn.getAttribute("data-emoji");
        SoundEffects.playClick();
        avatarPreview.textContent = emoji;
        overlay.classList.remove("active");
      });
    });

    // Remove team button (only for card 3, 4, 5)
    const removeBtn = card.querySelector(".remove-team-btn");
    if (removeBtn) {
      removeBtn.addEventListener("click", () => {
        SoundEffects.playIncorrect();
        card.remove();
        reindexTeamCards();
      });
    }

    // Toggle styling if the user adds names
    const textInput = card.querySelector("input[type='text']");
    textInput.addEventListener("input", () => {
      if (textInput.value.trim() === "") {
        card.classList.remove("active");
      } else {
        card.classList.add("active");
      }
    });

    // Animate item entry
    card.style.transform = "scale(0.8)";
    setTimeout(() => {
      card.style.transform = "scale(1)";
    }, 50);
  }

  function reindexTeamCards() {
    const cards = teamSetupListEl.querySelectorAll(".team-setup-card");
    cards.forEach((card, index) => {
      card.setAttribute("data-team-setup-index", index);
      const colorTheme = TEAM_COLORS[index];
      card.style.setProperty("--color-border", colorTheme.border);
      
      const headerSpan = card.querySelector(".team-header span");
      headerSpan.textContent = `Team ${index + 1}`;
      
      const textInput = card.querySelector("input[type='text']");
      textInput.id = `team-input-name-${index}`;
      
      const preview = card.querySelector(".selected-avatar-preview");
      preview.id = `avatar-preview-${index}`;
      preview.style.setProperty("--color-border", colorTheme.border);
    });
  }

  addTeamCardBtn.addEventListener("click", () => {
    SoundEffects.playClick();
    const suggestions = ["Word Wizards", "Logic Lions", "Puzzle Pirates", "Curiosity Kids", "Mind Benders"];
    const avatars = ["🦊", "🦁", "🍎", "🚀", "💡"];
    const count = teamSetupListEl.querySelectorAll(".team-setup-card").length;
    addTeamSetupField(
      suggestions[count] || `Team ${count + 1}`,
      avatars[count] || "⭐"
    );
  });

  // --- START GAME BUTTON CLICKED ---
  document.getElementById("btn-start-jeopardy-game").addEventListener("click", () => {
    SoundEffects.playClick();
    
    // Parse team data
    const setupCards = teamSetupListEl.querySelectorAll(".team-setup-card");
    const compiledTeams = [];

    let validationFailed = false;

    setupCards.forEach((card, index) => {
      const nameInput = card.querySelector(`input[type='text']`);
      const name = nameInput.value.trim();
      const avatarEl = card.querySelector(`.selected-avatar-preview`);
      let avatar = avatarEl.textContent.trim();
      
      if (avatar === "👤") {
        avatar = null; // skipped avatar
      }

      if (name === "") {
        validationFailed = true;
        card.style.animation = "pulse 0.3s 2";
      } else {
        compiledTeams.push({
          name: name,
          avatar: avatar,
          score: 0,
          color: TEAM_COLORS[index].border,
          colorRGB: TEAM_COLORS[index].rgb
        });
      }
    });

    if (validationFailed) {
      alert("Please fill in names for all active teams!");
      return;
    }

    if (compiledTeams.length === 0) {
      alert("Please configure at least one team!");
      return;
    }

    // Save state
    state.teams = compiledTeams;
    state.currentTeamIndex = 0;
    state.answeredTilesCount = 0;
    state.roundNumber = 1;
    state.questionsAnsweredThisRound = 0;
    
    // Start session and create board
    startNewGameSession();
  });

  // --- NEW GAME SESSION INITIALIZER ---
  function startNewGameSession() {
    // Generate Riddle board mappings from riddles.js
    const setupData = generateGameSessionRiddles();
    state.categories = setupData.categories;
    state.riddles = setupData.riddles;

    // Render Jeopardy board GUI
    buildJeopardyBoardGUI();
    
    // Update Indicators
    updateTurnIndicatorUI();
    updateScoresSummaryUI();
    
    // Show Screen
    showScreen("screen-game-board");
    
    // Sound cue
    SoundEffects.playCorrect();
  }

  function resetGameToSetup() {
    stopVictoryConfettiFountain();
    state.teams = [];
    showScreen("screen-team-setup");
    initTeamSetupCards();
  }

  // --- BOARD GENERATOR ---
  const catHeadersRow = document.getElementById("board-category-headers");
  const tilesGrid = document.getElementById("board-tiles-grid");

  function buildJeopardyBoardGUI() {
    catHeadersRow.innerHTML = "";
    tilesGrid.innerHTML = "";

    const catColors = ["#00f0ff", "#ff007f", "#ffb703", "#06d6a0"];

    // Render categories headers
    state.categories.forEach((cat, index) => {
      const catEl = document.createElement("div");
      catEl.className = "category-card";
      catEl.style.setProperty("--cat-color", catColors[index]);
      catEl.textContent = cat;
      catHeadersRow.appendChild(catEl);
    });

    // Grid details: organized by difficulty levels (rows) first
    // Row 1: $100 for each of the 4 categories
    // Row 2: $200 for each of the 4 categories...
    const difficulties = [100, 200, 300, 400, 500];

    difficulties.forEach(diff => {
      state.categories.forEach(cat => {
        const tile = document.createElement("button");
        tile.className = "tile-card";
        tile.textContent = `$${diff}`;
        
        // Add ID tag for automation tests
        tile.id = `tile-${cat.replace(/\s+/g, '-').toLowerCase()}-${diff}`;
        
        // Save references
        tile.addEventListener("click", () => {
          triggerRiddleQuestion(cat, diff, tile);
        });

        tilesGrid.appendChild(tile);
      });
    });
  }

  function updateTurnIndicatorUI() {
    const activeTeam = state.teams[state.currentTeamIndex];
    const borderEl = document.getElementById("active-turn-box");
    const avatarEl = document.getElementById("turn-avatar-indicator");
    const nameEl = document.getElementById("turn-team-name-indicator");

    borderEl.style.setProperty("--team-color", activeTeam.color);
    borderEl.style.setProperty("--team-color-rgb", activeTeam.colorRGB);
    
    avatarEl.textContent = activeTeam.avatar || "👤";
    avatarEl.style.setProperty("--team-color", activeTeam.color);

    nameEl.textContent = `${activeTeam.name}'s Turn!`;
  }

  function updateScoresSummaryUI() {
    const panel = document.getElementById("board-scores-panel");
    panel.innerHTML = "";

    state.teams.forEach((team, idx) => {
      const pill = document.createElement("div");
      pill.className = `board-team-pill ${idx === state.currentTeamIndex ? 'active-turn' : ''}`;
      pill.style.setProperty("--team-color", team.color);
      pill.style.setProperty("--team-color-rgb", team.colorRGB);

      pill.innerHTML = `
        <span style="font-size: 1.1rem; margin-right: 4px;">${team.avatar || "👤"}</span>
        <span style="color: #fff; font-weight: bold; margin-right: 8px;">${team.name}:</span>
        <span style="color: var(--neon-gold); font-weight: 800;">$${team.score}</span>
      `;

      panel.appendChild(pill);
    });
  }

  // --- TRIGGER QUESTION SCREEN ---
  const modal = document.getElementById("screen-question-modal");
  const modalCloseBtn = document.getElementById("btn-close-question");
  const readyBtn = document.getElementById("btn-answer-ready");
  
  const modalCatTitle = document.getElementById("question-category-title");
  const modalPointVal = document.getElementById("question-point-value");
  const modalRiddleText = document.getElementById("riddle-question-id");
  const modalTeamAvatar = document.getElementById("question-team-avatar");
  const modalTeamName = document.getElementById("question-team-name");
  
  const discussionOverlay = document.getElementById("question-discussion-overlay");
  const choicesGrid = document.getElementById("question-choices-grid");
  const stateOverlay = document.getElementById("question-state-overlay");

  const diffDifficultyMap = {
    100: "Easy Peasy",
    200: "Getting Warm",
    300: "Mind Bender",
    400: "Brain Buster",
    500: "Impossible"
  };

  const diffTimerDurations = {
    100: 60,  // 1 min
    200: 90,  // 1 min 30s
    300: 120, // 2 mins
    400: 150, // 2 mins 30s
    500: 150  // 2 mins 30s
  };

  function triggerRiddleQuestion(category, difficulty, tileEl) {
    if (tileEl.classList.contains("disabled")) return;
    
    SoundEffects.playClick();
    
    state.activeCategory = category;
    state.activePoints = difficulty;
    state.activeTileEl = tileEl;
    
    // Get Riddle object
    let riddle;
    if (state.isTieBreaker) {
      riddle = TIE_BREAKER_POOL[state.currentTieBreakerIndex % TIE_BREAKER_POOL.length];
    } else {
      riddle = state.riddles[category][difficulty];
    }
    
    state.activeRiddle = riddle;

    // Fill screen details
    modalCatTitle.textContent = state.isTieBreaker ? "Sudden Death Tie-Breaker!" : category;
    modalPointVal.textContent = state.isTieBreaker ? "First to Answer Wins!" : `$${difficulty} - ${diffDifficultyMap[difficulty]}`;
    
    modalRiddleText.textContent = riddle.question;

    const activeTeam = state.teams[state.currentTeamIndex];
    modalTeamAvatar.textContent = activeTeam.avatar || "👤";
    modalTeamName.textContent = activeTeam.name;
    modalTeamName.style.color = activeTeam.color;

    // Reset overlay elements
    discussionOverlay.style.display = "flex";
    stateOverlay.classList.remove("active");
    stateOverlay.innerHTML = "";
    choicesGrid.innerHTML = "";

    // Show close button (disable during animations or sudden tiebreaker)
    modalCloseBtn.style.display = state.isTieBreaker ? "none" : "flex";

    // Setup Multiple Choice buttons (hidden until Ready)
    riddle.choices.forEach((choice, index) => {
      const letters = ["A", "B", "C", "D"];
      const btn = document.createElement("button");
      btn.className = "answer-choice-btn";
      btn.id = `btn-choice-${letters[index]}`;
      btn.innerHTML = `
        <span class="answer-letter">${letters[index]}</span>
        <span>${choice}</span>
      `;
      
      btn.addEventListener("click", () => {
        submitAnswerChoice(choice, btn);
      });
      
      choicesGrid.appendChild(btn);
    });

    // Start Timer
    const secondsLimit = diffTimerDurations[state.isTieBreaker ? 300 : difficulty];
    initQuestionTimer(secondsLimit);

    // Open dialogue HTML5 modal
    modal.showModal();
    modal.classList.add("active");
  }

  // Ready Button clicked - hides overlay discussion
  readyBtn.addEventListener("click", () => {
    SoundEffects.playClick();
    discussionOverlay.style.display = "none";
  });

  // --- TIMER PROGRESS COUNTDOWN ---
  const timerProgressBar = document.getElementById("timer-progress-bar");
  const timerCountdownText = document.getElementById("timer-countdown-text");
  const timerWrapper = document.getElementById("question-timer-wrapper");

  function initQuestionTimer(seconds) {
    clearInterval(state.timerInterval);
    
    state.timerSecondsLeft = seconds;
    state.timerDurationTotal = seconds;

    timerCountdownText.textContent = seconds;
    timerWrapper.classList.remove("warning");
    
    // Circumference = 2 * PI * r = 2 * 3.1415 * 35 = ~220
    timerProgressBar.style.strokeDashoffset = 0;

    state.timerInterval = setInterval(() => {
      state.timerSecondsLeft--;
      timerCountdownText.textContent = state.timerSecondsLeft;
      
      // Sync SVG dashoffset
      const percentLeft = state.timerSecondsLeft / state.timerDurationTotal;
      const offset = 220 - (percentLeft * 220);
      timerProgressBar.style.strokeDashoffset = offset;

      // Audio tick sound
      if (state.timerSecondsLeft <= 10) {
        timerWrapper.classList.add("warning");
        SoundEffects.playTick();
      } else if (state.timerSecondsLeft % 2 === 0) {
        SoundEffects.playTick();
      }

      // Timeout Check
      if (state.timerSecondsLeft <= 0) {
        clearInterval(state.timerInterval);
        handleQuestionTimeout();
      }
    }, 1000);
  }

  function pauseQuestionTimer() {
    clearInterval(state.timerInterval);
  }

  // --- SUBMIT CHOICE FLOW ---
  function submitAnswerChoice(selectedChoice, clickedBtn) {
    pauseQuestionTimer();
    SoundEffects.playClick();

    // Visual highlights
    document.querySelectorAll(".answer-choice-btn").forEach(btn => {
      btn.style.pointerEvents = "none";
      if (btn !== clickedBtn) {
        btn.style.opacity = "0.5";
      }
    });

    // Television dramatic Loading suspense...
    stateOverlay.innerHTML = `
      <div class="spinner"></div>
      <p class="loading-headline">Locking in answer...</p>
    `;
    stateOverlay.classList.add("active");

    setTimeout(() => {
      renderAnswerEvaluation(selectedChoice, clickedBtn);
    }, 1200);
  }

  function handleQuestionTimeout() {
    pauseQuestionTimer();
    SoundEffects.playIncorrect();
    
    // Suspend answers
    document.querySelectorAll(".answer-choice-btn").forEach(btn => {
      btn.style.pointerEvents = "none";
      btn.style.opacity = "0.5";
    });

    stateOverlay.innerHTML = `
      <div class="result-icon">⏰</div>
      <p class="result-headline incorrect">Time's Up!</p>
      <p class="result-score-change">No points awarded. Let's see the answer.</p>
      <button class="btn-primary" id="btn-reveal-explanation" style="font-size: 1.1rem; padding: 10px 24px;">Show Answer & Explanation</button>
    `;
    stateOverlay.classList.add("active");

    document.getElementById("btn-reveal-explanation").addEventListener("click", () => {
      SoundEffects.playClick();
      renderExplanationOverlay(false);
    });
  }

  function renderAnswerEvaluation(selectedChoice, clickedBtn) {
    const isCorrect = selectedChoice === state.activeRiddle.answer;
    const activeTeam = state.teams[state.currentTeamIndex];

    if (isCorrect) {
      SoundEffects.playCorrect();
      
      // Confetti burst from selected button
      const rect = clickedBtn.getBoundingClientRect();
      launchConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 80);

      // Add scores
      if (!state.isTieBreaker) {
        activeTeam.score += state.activePoints;
      }

      stateOverlay.innerHTML = `
        <div class="result-icon">✅</div>
        <p class="result-headline correct">Correct!</p>
        <p class="result-score-change">${state.isTieBreaker ? 'Winner Crowned!' : `Nice Job! +$${state.activePoints} for ${activeTeam.name}!`}</p>
        <button class="btn-primary" id="btn-reveal-explanation" style="font-size: 1.1rem; padding: 10px 24px;">Show Explanation</button>
      `;
    } else {
      SoundEffects.playIncorrect();
      clickedBtn.style.animation = "pulse 0.3s 2";
      clickedBtn.style.borderColor = "var(--error)";
      clickedBtn.querySelector(".answer-letter").style.background = "var(--error)";

      stateOverlay.innerHTML = `
        <div class="result-icon">❌</div>
        <p class="result-headline incorrect">Oops, Not Quite!</p>
        <p class="result-score-change">Let's find out why...</p>
        <button class="btn-primary" id="btn-reveal-explanation" style="font-size: 1.1rem; padding: 10px 24px;">Show Explanation</button>
      `;
    }

    document.getElementById("btn-reveal-explanation").addEventListener("click", () => {
      SoundEffects.playClick();
      renderExplanationOverlay(isCorrect);
    });
  }

  function renderExplanationOverlay(wasCorrect) {
    stateOverlay.innerHTML = `
      <div class="explanation-box">
        <h4 class="explanation-title">Riddle Answer:</h4>
        <div class="explanation-reveal">🎉 Correct Answer: <span style="color: var(--neon-gold);">${state.activeRiddle.answer}</span></div>
        <h4 class="explanation-title" style="margin-top: 15px;">Why is it correct?</h4>
        <p class="explanation-text">${state.activeRiddle.explanation}</p>
      </div>
      
      <button class="btn-primary" id="btn-question-done-next" style="margin-top: 10px;">
        ${state.isTieBreaker && wasCorrect ? 'Claim Crown!' : 'Next Turn ➔'}
      </button>
    `;

    document.getElementById("btn-question-done-next").addEventListener("click", () => {
      SoundEffects.playClick();
      completeTurnProcessing(wasCorrect);
    });
  }

  // --- COMPLETE TURN STATE ADVANCE ---
  function completeTurnProcessing(wasCorrect) {
    // Close dialogue modal
    modal.classList.remove("active");
    modal.close();

    clearInterval(state.timerInterval);

    if (state.isTieBreaker) {
      if (wasCorrect) {
        // Sudden death winner crowns!
        const winningTeam = state.teams[state.currentTeamIndex];
        // Give 1 point just to ensure they lead clearly
        winningTeam.score += 1;
        state.isTieBreaker = false;
        document.getElementById("tie-breaker-announcement").style.display = "none";
        triggerPodiumScreenFlow();
      } else {
        // Tie breaker continues! Move to next tied team
        state.currentTieBreakerIndex++;
        
        // Find which tied team goes next
        let foundNext = false;
        let checks = 0;
        while (!foundNext && checks < state.teams.length) {
          state.currentTeamIndex = (state.currentTeamIndex + 1) % state.teams.length;
          const nextTeam = state.teams[state.currentTeamIndex];
          if (state.tieBreakerTeams.some(t => t.name === nextTeam.name)) {
            foundNext = true;
          }
          checks++;
        }

        // Trigger next tie-breaker riddle
        setTimeout(() => {
          triggerRiddleQuestion(null, null, null);
        }, 1000);
      }
      return;
    }

    // Normal Jeopardy play path: disable answered tile
    if (state.activeTileEl) {
      state.activeTileEl.classList.add("disabled");
      state.activeTileEl.setAttribute("aria-disabled", "true");
    }

    state.answeredTilesCount++;
    state.questionsAnsweredThisRound++;

    // Switch turns: standard circular queue
    state.currentTeamIndex = (state.currentTeamIndex + 1) % state.teams.length;

    // Check end of round intervals (when each team has played once)
    const roundCompleted = state.questionsAnsweredThisRound >= state.teams.length;

    if (roundCompleted) {
      state.questionsAnsweredThisRound = 0;
      
      // Delay transition to leaderboard so scores sync nicely
      setTimeout(() => {
        triggerLeaderboardScreenFlow();
      }, 500);
    } else {
      // Advance to next team's turn on active board
      updateTurnIndicatorUI();
      updateScoresSummaryUI();

      // Check if board fully cleared
      if (state.answeredTilesCount >= 20) {
        setTimeout(() => {
          triggerPodiumScreenFlow();
        }, 800);
      }
    }
  }

  // --- CLOSE OVERLAY MODAL FOR BOARD RETURN ---
  modalCloseBtn.addEventListener("click", () => {
    SoundEffects.playClick();
    modal.classList.remove("active");
    modal.close();
    clearInterval(state.timerInterval);
  });

  // --- SCREEN 5: LEADERBOARD PRESENTATION ---
  const leaderboardRoundTitle = document.getElementById("leaderboard-round-title");
  const leaderboardScoresList = document.getElementById("leaderboard-scores-list");
  const leaderboardContinueBtn = document.getElementById("btn-leaderboard-continue");

  function triggerLeaderboardScreenFlow() {
    leaderboardRoundTitle.textContent = `End of Round ${state.roundNumber}`;
    leaderboardScoresList.innerHTML = "";

    // Sort teams by descending score
    const rankedTeams = [...state.teams].sort((a, b) => b.score - a.score);

    // Render list
    rankedTeams.forEach((team, index) => {
      const item = document.createElement("div");
      item.className = "leaderboard-item";
      item.style.setProperty("--team-color", team.color);

      // Check if there is a score tie with another team
      const isTied = rankedTeams.some((t, i) => t.score === team.score && i !== index);
      
      // Compute ordinal rank
      let rankDisplay = `${index + 1}`;
      if (index === 0) rankDisplay = "👑";

      item.innerHTML = `
        <div class="leaderboard-rank rank-${index + 1}">${rankDisplay}</div>
        <div class="leaderboard-avatar" style="--team-color: ${team.color};">${team.avatar || "👤"}</div>
        <div class="leaderboard-name">
          ${team.name}
          ${isTied ? `<span class="tie-badge">TIE</span>` : ""}
        </div>
        <div class="leaderboard-score">$${team.score}</div>
      `;

      leaderboardScoresList.appendChild(item);
    });

    showScreen("screen-leaderboard");
    SoundEffects.playCorrect();
    launchConfettiBurst(canvas.width / 2, canvas.height / 3, 40);

    state.roundNumber++;
  }

  leaderboardContinueBtn.addEventListener("click", () => {
    SoundEffects.playClick();
    
    // Check if board fully cleared, if so route directly to podium
    if (state.answeredTilesCount >= 20) {
      triggerPodiumScreenFlow();
    } else {
      updateTurnIndicatorUI();
      updateScoresSummaryUI();
      showScreen("screen-game-board");
    }
  });

  document.getElementById("btn-leaderboard-home").addEventListener("click", () => {
    SoundEffects.playClick();
    updateTurnIndicatorUI();
    updateScoresSummaryUI();
    showScreen("screen-game-board");
  });

  // --- SCREEN 6: CHAMPION PODIUM PRESENTATION ---
  const finalAnnouncement = document.getElementById("final-announcement-headline");
  const podiumContainer = document.getElementById("podium-standings-container");
  const playAgainBtn = document.getElementById("btn-play-again");

  function triggerPodiumScreenFlow() {
    stopVictoryConfettiFountain();
    finalAnnouncement.textContent = "Drumroll please... 🥁";
    podiumContainer.innerHTML = "";
    playAgainBtn.style.display = "none";
    
    showScreen("screen-final-podium");

    // Retro drumroll synthesis sequence (2.5s)
    SoundEffects.playDrumroll(2.5);

    setTimeout(() => {
      evaluateWinnerAndRenderPodium();
    }, 2500);
  }

  function evaluateWinnerAndRenderPodium() {
    // Sort teams by score descending
    const rankedTeams = [...state.teams].sort((a, b) => b.score - a.score);
    const topScore = rankedTeams[0].score;

    // Filter first-place candidates
    const firstPlaceTiedTeams = state.teams.filter(t => t.score === topScore);

    // TIE BREAKER DETECTED!
    if (firstPlaceTiedTeams.length > 1 && !state.isTieBreaker) {
      initiateTieBreakerSuddenDeath(firstPlaceTiedTeams);
      return;
    }

    // Standard single winner podium build
    finalAnnouncement.textContent = `🏆 ${rankedTeams[0].name} wins the Riddle Crown! 🏆`;
    playAgainBtn.style.display = "inline-flex";

    // Setup podium pedestals: 1st, 2nd, 3rd, 4th, 5th
    // To arrange them visually on screen: 2nd, 1st, 3rd, 4th, 5th
    const visualOrdering = [];
    if (rankedTeams[1]) visualOrdering.push({ team: rankedTeams[1], rank: 2, heightClass: "podium-2nd", glow: "rgba(203, 213, 225, 0.2)" });
    visualOrdering.push({ team: rankedTeams[0], rank: 1, heightClass: "podium-1st", glow: "rgba(255, 183, 3, 0.4)" });
    if (rankedTeams[2]) visualOrdering.push({ team: rankedTeams[2], rank: 3, heightClass: "podium-3rd", glow: "rgba(180, 83, 9, 0.2)" });
    
    // Remaining ranks trailing at the side
    for (let i = 3; i < rankedTeams.length; i++) {
      visualOrdering.push({
        team: rankedTeams[i],
        rank: i + 1,
        heightClass: `podium-${i + 1}th`,
        glow: "rgba(255,255,255,0.05)"
      });
    }

    visualOrdering.forEach(item => {
      const stand = document.createElement("div");
      stand.className = `podium-stand ${item.heightClass}`;

      stand.innerHTML = `
        <div class="podium-team">
          <div class="podium-avatar-wrapper">
            <div class="podium-avatar" style="--team-color: ${item.team.color};">${item.team.avatar || "👤"}</div>
            ${item.rank === 1 ? `<div class="podium-crown">👑</div>` : ""}
          </div>
          <div class="podium-team-name">${item.team.name}</div>
          <div class="podium-team-score">$${item.team.score}</div>
        </div>
        <div class="pedestal" style="--glow-color: ${item.glow};">
          ${item.rank}
          <div class="pedestal-glow"></div>
        </div>
      `;

      podiumContainer.appendChild(stand);
    });

    // Sound victory cues
    SoundEffects.playVictory();
    
    // Rain infinite celebratory confetti fountains!
    startVictoryConfettiFountain();
  }

  // --- TIE BREAKER INTERSTITIAL ROUTINES ---
  function initiateTieBreakerSuddenDeath(tiedTeams) {
    const banner = document.getElementById("tie-breaker-announcement");
    const namesEl = document.getElementById("tie-breaker-teams-names");

    state.isTieBreaker = true;
    state.tieBreakerTeams = tiedTeams;
    state.currentTieBreakerIndex = 0;
    
    // Set active team turn to the first tied team
    const firstTiedIdx = state.teams.findIndex(t => t.name === tiedTeams[0].name);
    state.currentTeamIndex = firstTiedIdx;

    namesEl.textContent = tiedTeams.map(t => t.name).join(" & ") + " are tied for first!";
    
    // Open interstitial sound
    SoundEffects.playIncorrect();
    banner.style.display = "flex";

    // Play rapid warnings alarm beep after drumroll
    let alarmTick = 0;
    const alarm = setInterval(() => {
      SoundEffects.playTick();
      alarmTick++;
      if (alarmTick >= 5) clearInterval(alarm);
    }, 400);

    setTimeout(() => {
      banner.style.display = "none";
      // Open Tie breaker Riddle modal directly!
      triggerRiddleQuestion(null, null, null);
    }, 4500);
  }

  // --- PLAY AGAIN REPLAY ---
  playAgainBtn.addEventListener("click", () => {
    SoundEffects.playClick();
    stopVictoryConfettiFountain();
    showScreen("screen-how-to-play");
  });
});
