// ==========================================
//  NEURONEST — MAIN JS
// ==========================================

// ---- NAV TOGGLE ----
function toggleNav() {
  document.querySelector('.nav-links').classList.toggle('open');
}

// ---- DAILY BRAIN BOOST ----
const brainBoosts = [
  "Try recalling 5 items from this morning's breakfast in reverse order — this strengthens episodic memory.",
  "Do 10 minutes of brisk walking today. Physical movement directly promotes new neuron growth in the hippocampus.",
  "Learn one new word today. Vocabulary growth is linked to reduced Alzheimer's risk.",
  "Solve a simple math problem without a calculator — mental arithmetic keeps the prefrontal cortex active.",
  "Write down three things you are grateful for. Positive emotion supports healthy neural pathways.",
  "Try brushing your teeth with your non-dominant hand — novel motor tasks boost brain plasticity.",
  "Call a friend or family member. Social connection is one of the strongest protectors against cognitive decline.",
  "Try a new recipe today. Combining reading, planning, and motor skills gives your brain a full workout.",
  "Close your eyes and identify 5 sounds around you. Mindful listening exercises the auditory cortex.",
  "Spend 5 minutes meditating — even brief sessions measurably reduce cortisol, which damages brain cells.",
  "Read a physical book for 20 minutes. Deep reading activates more brain regions than screen-based reading.",
  "Draw a simple map of your neighborhood from memory to exercise your spatial navigation circuits.",
  "Hum or sing a song — musical activity engages the widest array of brain regions of almost any activity.",
  "Try to remember the names of 10 people you went to school with — name retrieval is a powerful memory drill.",
  "Do a 'body scan' — slowly notice sensations from your toes to your head. This anchors mind-body connection.",
  "Play 20 questions with a family member. Deductive reasoning is a powerful cognitive exercise.",
  "Look at an old photo album and narrate the memories out loud — storytelling strengthens long-term memory.",
  "Drink a full glass of water right now. Mild dehydration measurably impairs memory and focus.",
  "Try to list all 50 US states from memory. Systematic recall exercises your working memory capacity.",
  "Before bed, replay your entire day chronologically. This nightly review consolidates daily memories.",
  "Watch a documentary on a topic you know nothing about — novelty is the brain's favorite fertilizer.",
  "Rearrange small items on your desk, then try to recall the original arrangement later today.",
  "Practice deep nasal breathing for 2 minutes. Slow breathing has been shown to synchronize brain waves.",
  "Write a short letter to your past self — narrative writing activates the brain's default mode network.",
  "Play a musical instrument, even just a few notes. Motor-musical coordination builds new neural connections.",
  "Do a jigsaw puzzle — pattern recognition and spatial reasoning keep the parietal lobe sharp.",
  "Try to recall the plot of a movie you saw years ago in as much detail as possible.",
  "Cook a dish entirely from memory without looking at a recipe — procedural recall at its finest.",
  "Count backwards from 100 by 7s: 100, 93, 86... This is a classic working memory exercise.",
  "Close your eyes and visualize a peaceful place in vivid detail — mental imagery is a powerful brain workout.",
  "Take a different route on your walk today — spatial novelty creates new navigational memories.",
];

function setDailyBoost() {
  const el = document.getElementById('dailyBoost');
  const dateEl = document.getElementById('boostDate');
  if (!el) return;
  const today = new Date();
  const dayIndex = Math.floor(today.getTime() / 86400000) % brainBoosts.length;
  el.textContent = brainBoosts[dayIndex];
  if (dateEl) {
    dateEl.textContent = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  }
}

// ---- LEARN PAGE: TAB SWITCHING ----
function initLearnTabs() {
  const tabs = document.querySelectorAll('.cond-tab');
  const sections = document.querySelectorAll('.condition-section');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.target);
      if (target) target.classList.add('active');
    });
  });

  // Handle hash links
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const matchTab = document.querySelector(`[data-target="${hash}"]`);
    if (matchTab) matchTab.click();
  }
}

// ---- MEMORY GAME ----
const memoryEmojis = ['🧩', '🌿', '🦋', '🌸', '🎵', '🦊', '🍀', '⭐'];
let flippedCards = [];
let matchedPairs = 0;
let totalPairs = 8;
let memoryScore = 0;
let canFlip = true;
let moveCount = 0;

function initMemoryGame() {
  const grid = document.getElementById('memoryGrid');
  if (!grid) return;

  const deck = [...memoryEmojis, ...memoryEmojis]
    .sort(() => Math.random() - 0.5);

  grid.innerHTML = '';
  flippedCards = [];
  matchedPairs = 0;
  moveCount = 0;
  canFlip = true;
  updateMemoryScore(0);

  deck.forEach((emoji, i) => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.dataset.emoji = emoji;
    card.dataset.index = i;
    card.innerHTML = `<span class="card-face">${emoji}</span>`;
    card.addEventListener('click', () => flipMemoryCard(card));
    grid.appendChild(card);
  });
}

function flipMemoryCard(card) {
  if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) return;

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    canFlip = false;
    moveCount++;
    const [a, b] = flippedCards;
    if (a.dataset.emoji === b.dataset.emoji) {
      a.classList.add('matched');
      b.classList.add('matched');
      matchedPairs++;
      memoryScore += 10;
      updateMemoryScore(memoryScore);
      flippedCards = [];
      canFlip = true;
      if (matchedPairs === totalPairs) {
        setTimeout(() => {
          alert(`🎉 Excellent! You matched all pairs in ${moveCount} moves! Score: ${memoryScore}`);
          saveGameScore('Memory Match', memoryScore);
        }, 400);
      }
    } else {
      setTimeout(() => {
        a.classList.remove('flipped');
        b.classList.remove('flipped');
        flippedCards = [];
        canFlip = true;
        memoryScore = Math.max(0, memoryScore - 1);
        updateMemoryScore(memoryScore);
      }, 900);
    }
  }
}

function updateMemoryScore(score) {
  const el = document.getElementById('memoryScore');
  if (el) el.textContent = score;
}

// ---- WORD RECALL GAME ----
const wordLists = [
  ['Apple', 'River', 'Candle', 'Elephant', 'Sunshine'],
  ['Piano', 'Garden', 'Thunder', 'Compass', 'Blanket'],
  ['Mirror', 'Cricket', 'Lantern', 'Mountain', 'Feather'],
  ['Anchor', 'Cinnamon', 'Telescope', 'Harvest', 'Bridge'],
];
let wordRecallPhase = 'study';
let wordRecallList = [];
let wordScore = 0;

function initWordRecall() {
  const area = document.getElementById('wordRecallArea');
  if (!area) return;
  wordRecallList = wordLists[Math.floor(Math.random() * wordLists.length)];
  wordScore = 0;
  wordRecallPhase = 'study';
  showWordStudy();
}

function showWordStudy() {
  const area = document.getElementById('wordRecallArea');
  area.innerHTML = `
    <h3 style="color:var(--forest);margin-bottom:20px;">Study these 5 words for 15 seconds:</h3>
    <div style="display:flex;gap:14px;flex-wrap:wrap;margin-bottom:30px;">
      ${wordRecallList.map(w => `<span style="background:var(--cream);border:2px solid var(--border);border-radius:12px;padding:14px 24px;font-size:1.2rem;font-weight:600;color:var(--forest);">${w}</span>`).join('')}
    </div>
    <div id="wordCountdown" style="font-size:2rem;font-family:'Fraunces',serif;color:var(--sage);"></div>
  `;
  let seconds = 15;
  const countdown = document.getElementById('wordCountdown');
  countdown.textContent = seconds + 's';
  const timer = setInterval(() => {
    seconds--;
    countdown.textContent = seconds + 's';
    if (seconds <= 0) {
      clearInterval(timer);
      showWordRecall();
    }
  }, 1000);
}

function showWordRecall() {
  const area = document.getElementById('wordRecallArea');
  area.innerHTML = `
    <h3 style="color:var(--forest);margin-bottom:20px;">Now type the words you remember (one per line):</h3>
    <textarea id="wordInput" style="width:100%;height:160px;border:2px solid var(--border);border-radius:12px;padding:14px;font-size:1rem;font-family:'DM Sans',sans-serif;resize:none;outline:none;" placeholder="Type each word on a new line..."></textarea>
    <button onclick="checkWordRecall()" style="margin-top:16px;background:var(--forest);color:white;border:none;padding:14px 32px;border-radius:30px;font-size:1rem;cursor:pointer;font-family:'DM Sans',sans-serif;">Check Answers</button>
  `;
}

function checkWordRecall() {
  const input = document.getElementById('wordInput').value;
  const typed = input.split('\n').map(w => w.trim().toLowerCase()).filter(Boolean);
  let correct = 0;
  const results = wordRecallList.map(word => {
    const hit = typed.includes(word.toLowerCase());
    if (hit) correct++;
    return `<span style="padding:8px 16px;border-radius:10px;background:${hit ? '#E8F5EE' : '#FEE8E8'};color:${hit ? '#2D7A4F' : '#C04040'};font-weight:500;">${word} ${hit ? '✓' : '✗'}</span>`;
  });
  wordScore = correct * 20;
  const area = document.getElementById('wordRecallArea');
  area.innerHTML = `
    <h3 style="color:var(--forest);margin-bottom:20px;">Results: ${correct}/5 correct — Score: ${wordScore}</h3>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:24px;">${results.join('')}</div>
    <button onclick="initWordRecall()" style="background:var(--forest);color:white;border:none;padding:14px 32px;border-radius:30px;font-size:1rem;cursor:pointer;font-family:'DM Sans',sans-serif;">Play Again</button>
  `;
  saveGameScore('Word Recall', wordScore);
}

// ---- PATTERN GAME ----
const patternColors = ['#4A7C63', '#C8913A', '#C46A5A', '#5A8FA8'];
let patternSequence = [];
let playerPattern = [];
let patternRound = 0;
let patternScore = 0;
let acceptingInput = false;

function initPatternGame() {
  const area = document.getElementById('patternArea');
  if (!area) return;
  patternSequence = [];
  playerPattern = [];
  patternRound = 0;
  patternScore = 0;
  area.innerHTML = `
    <p style="margin-bottom:20px;color:var(--text-mid);">Watch the pattern, then repeat it!</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;max-width:320px;margin:0 auto 30px;">
      ${patternColors.map((c, i) => `<div id="pb${i}" onclick="patternPress(${i})" style="height:120px;border-radius:16px;background:${c};cursor:pointer;opacity:0.4;transition:all 0.2s;"></div>`).join('')}
    </div>
    <div id="patternMsg" style="font-size:1.1rem;color:var(--forest);font-weight:500;margin-bottom:20px;">Press Start to begin</div>
    <div id="patternScoreDisp" style="font-size:1.5rem;font-family:'Fraunces',serif;color:var(--sage);">Score: 0</div>
    <button onclick="nextPatternRound()" id="patternStartBtn" style="margin-top:16px;background:var(--forest);color:white;border:none;padding:14px 32px;border-radius:30px;font-size:1rem;cursor:pointer;font-family:'DM Sans',sans-serif;">Start</button>
  `;
}

function flashPatternButton(index, duration = 500) {
  return new Promise(resolve => {
    const btn = document.getElementById('pb' + index);
    if (btn) {
      btn.style.opacity = '1';
      btn.style.transform = 'scale(1.05)';
      setTimeout(() => {
        btn.style.opacity = '0.4';
        btn.style.transform = 'scale(1)';
        setTimeout(resolve, 200);
      }, duration);
    } else resolve();
  });
}

async function nextPatternRound() {
  const startBtn = document.getElementById('patternStartBtn');
  if (startBtn) startBtn.style.display = 'none';
  acceptingInput = false;
  patternRound++;
  patternSequence.push(Math.floor(Math.random() * 4));
  playerPattern = [];
  document.getElementById('patternMsg').textContent = 'Watch carefully...';
  await new Promise(r => setTimeout(r, 600));
  for (const idx of patternSequence) {
    await flashPatternButton(idx);
  }
  document.getElementById('patternMsg').textContent = 'Your turn! Repeat the pattern.';
  acceptingInput = true;
}

function patternPress(index) {
  if (!acceptingInput) return;
  flashPatternButton(index, 250);
  playerPattern.push(index);
  const step = playerPattern.length - 1;
  if (playerPattern[step] !== patternSequence[step]) {
    acceptingInput = false;
    document.getElementById('patternMsg').textContent = `❌ Wrong! Game over. Final score: ${patternScore}`;
    saveGameScore('Pattern Memory', patternScore);
    const btn = document.getElementById('patternStartBtn');
    if (btn) { btn.style.display = 'inline-block'; btn.textContent = 'Play Again'; btn.onclick = initPatternGame; }
    return;
  }
  if (playerPattern.length === patternSequence.length) {
    acceptingInput = false;
    patternScore += patternRound * 10;
    document.getElementById('patternScoreDisp').textContent = 'Score: ' + patternScore;
    document.getElementById('patternMsg').textContent = '✅ Correct! Get ready for the next round...';
    setTimeout(nextPatternRound, 1200);
  }
}

// ---- SAVE / LOAD GAME SCORES ----
function saveGameScore(game, score) {
  const scores = JSON.parse(localStorage.getItem('neuronest_scores') || '[]');
  scores.push({ game, score, date: new Date().toISOString() });
  localStorage.setItem('neuronest_scores', JSON.stringify(scores));
}

// ---- JOURNAL ----
function initJournal() {
  loadJournalEntries();
  loadStreak();
}

function saveJournalEntry() {
  const mood = document.getElementById('moodSlider')?.value;
  const notes = document.getElementById('journalNotes')?.value;
  const sharpness = document.getElementById('sharpnessSlider')?.value;
  if (!notes || notes.trim() === '') { alert('Please add some notes before saving.'); return; }

  const entries = JSON.parse(localStorage.getItem('neuronest_journal') || '[]');
  entries.unshift({
    date: new Date().toISOString(),
    mood,
    sharpness,
    notes: notes.trim()
  });
  localStorage.setItem('neuronest_journal', JSON.stringify(entries));

  // Streak
  updateStreak();
  loadJournalEntries();
  document.getElementById('journalNotes').value = '';
  document.getElementById('moodSlider').value = 5;
  document.getElementById('sharpnessSlider').value = 5;

  showToast('Journal entry saved! 🧠');
}

function loadJournalEntries() {
  const container = document.getElementById('journalEntries');
  if (!container) return;
  const entries = JSON.parse(localStorage.getItem('neuronest_journal') || '[]');
  if (entries.length === 0) {
    container.innerHTML = '<p style="color:var(--text-light);font-size:0.9rem;">No entries yet. Start journaling today!</p>';
    return;
  }
  container.innerHTML = entries.slice(0, 10).map(e => {
    const d = new Date(e.date);
    const dateStr = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const moodEmoji = e.mood >= 8 ? '😄' : e.mood >= 5 ? '🙂' : '😔';
    return `
      <div class="journal-entry">
        <div class="entry-date">${dateStr}</div>
        <div class="entry-mood">${moodEmoji} Mood: ${e.mood}/10 &nbsp;|&nbsp; 🧠 Sharpness: ${e.sharpness}/10</div>
        <div class="entry-text">${e.notes}</div>
      </div>`;
  }).join('');
}

function updateStreak() {
  const entries = JSON.parse(localStorage.getItem('neuronest_journal') || '[]');
  const today = new Date().toDateString();
  const streak = parseInt(localStorage.getItem('neuronest_streak') || '0');
  const lastDate = localStorage.getItem('neuronest_streak_date');
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  let newStreak = streak;
  if (lastDate === today) return;
  if (lastDate === yesterday) { newStreak = streak + 1; }
  else { newStreak = 1; }
  localStorage.setItem('neuronest_streak', newStreak);
  localStorage.setItem('neuronest_streak_date', today);
}

function loadStreak() {
  const el = document.getElementById('streakCount');
  if (!el) return;
  const streak = localStorage.getItem('neuronest_streak') || '0';
  el.textContent = streak;
}

// ---- CHAT ----
function initChat() {
  const input = document.getElementById('chatInput');
  if (!input) return;
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChat(); }
  });

  // Suggested questions
  document.querySelectorAll('.suggested-q').forEach(q => {
    q.addEventListener('click', () => {
      input.value = q.textContent.trim();
      sendChat();
    });
  });
}

async function sendChat() {
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSend');
  const messages = document.getElementById('chatMessages');
  const typing = document.getElementById('typingIndicator');
  const msg = input.value.trim();
  if (!msg) return;

  input.value = '';
  sendBtn.disabled = true;

  // User bubble
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-bubble bubble-user';
  userBubble.textContent = msg;
  messages.appendChild(userBubble);
  messages.scrollTop = messages.scrollHeight;

  // Typing
  typing.classList.add('visible');
  messages.scrollTop = messages.scrollHeight;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: `You are NeuroNest, a warm, compassionate, and knowledgeable brain health assistant specifically designed to help older adults and their caregivers understand neurological conditions. 

Your expertise covers: Alzheimer's disease, Parkinson's disease, dementia, stroke, and mild cognitive impairment. 

Guidelines:
- Use simple, plain English — avoid medical jargon unless you explain it
- Be warm, encouraging, and empathetic
- Always recommend consulting a doctor for personal medical decisions
- Keep answers concise and easy to read (use bullet points when helpful)
- Focus on education, prevention tips, and understanding symptoms
- Never diagnose or prescribe
- If someone seems distressed, acknowledge their feelings first`,
        messages: [{ role: 'user', content: msg }]
      })
    });

    const data = await response.json();
    typing.classList.remove('visible');

    const botBubble = document.createElement('div');
    botBubble.className = 'chat-bubble bubble-bot';
    const text = data.content?.map(c => c.text || '').join('') || 'I\'m sorry, I had trouble responding. Please try again.';
    botBubble.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
    messages.appendChild(botBubble);
    messages.scrollTop = messages.scrollHeight;
  } catch (err) {
    typing.classList.remove('visible');
    const errBubble = document.createElement('div');
    errBubble.className = 'chat-bubble bubble-bot';
    errBubble.textContent = 'I\'m having trouble connecting right now. Please try again in a moment.';
    messages.appendChild(errBubble);
    messages.scrollTop = messages.scrollHeight;
  }

  sendBtn.disabled = false;
  input.focus();
}

// ---- TOAST ----
function showToast(msg) {
  const toast = document.createElement('div');
  toast.style.cssText = `position:fixed;bottom:30px;right:30px;background:var(--forest);color:white;padding:16px 28px;border-radius:50px;font-size:0.95rem;z-index:9999;box-shadow:0 8px 30px rgba(0,0,0,0.2);animation:fadeIn 0.3s ease;`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  setDailyBoost();
  initLearnTabs();
  initMemoryGame();
  initWordRecall();
  initPatternGame();
  initJournal();
  initChat();
});
