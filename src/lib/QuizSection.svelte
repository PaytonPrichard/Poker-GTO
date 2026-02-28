<script>
  import { quizCategories, quizQuestions } from './data/quiz.js';

  let activeCategory = $state('All');
  let questions      = $state([]);
  let current        = $state(0);
  let selected       = $state(null);   // index of chosen option, or null
  let score          = $state(0);
  let finished       = $state(false);
  let showHistory    = $state(false);
  let confirmClear   = $state(false);

  // ── History ─────────────────────────────────────────────────────────────────
  let history = $state(JSON.parse(localStorage.getItem('quizHistory') ?? '[]'));

  function saveScore() {
    const entry = {
      category: activeCategory,
      score,
      total: questions.length,
      pct: Math.round((score / questions.length) * 100),
      date: new Date().toISOString(),
    };
    history = [...history, entry];
    localStorage.setItem('quizHistory', JSON.stringify(history));
  }

  function clearHistory() {
    history = [];
    localStorage.removeItem('quizHistory');
    confirmClear = false;
  }

  // Best score per category
  let bestScores = $derived.by(() => {
    const map = {};
    for (const h of history) {
      const key = h.category;
      if (!map[key] || h.pct > map[key].pct) {
        map[key] = h;
      }
    }
    return map;
  });

  let totalAttempts = $derived(history.length);

  // Fisher-Yates shuffle
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Rebuild shuffled question list whenever category changes
  $effect(() => {
    const filtered = activeCategory === 'All'
      ? quizQuestions
      : quizQuestions.filter(q => q.category === activeCategory);
    questions = shuffle(filtered);
    current  = 0;
    selected = null;
    score    = 0;
    finished = false;
    showHistory = false;
  });

  function choose(idx) {
    if (selected !== null) return; // already answered
    selected = idx;
    if (idx === questions[current].correct) score += 1;
  }

  function next() {
    if (current + 1 >= questions.length) {
      finished = true;
      saveScore();
    } else {
      current += 1;
      selected = null;
    }
  }

  function restart() {
    const filtered = activeCategory === 'All'
      ? quizQuestions
      : quizQuestions.filter(q => q.category === activeCategory);
    questions = shuffle(filtered);
    current  = 0;
    selected = null;
    score    = 0;
    finished = false;
  }

  function rating(s, total) {
    const pct = total === 0 ? 0 : (s / total) * 100;
    if (pct >= 80) return 'Excellent';
    if (pct >= 60) return 'Good';
    return 'Keep Practicing';
  }

  function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }

  let q = $derived(questions[current]);
  let progressPct = $derived(questions.length === 0 ? 0 : (current / questions.length) * 100);
</script>

<div class="quiz">
  <h2>Quiz Mode</h2>
  <div class="quiz-header">
    <p class="intro">Test your GTO knowledge. Choose a category and work through randomized questions.</p>
    <button class="history-toggle" onclick={() => { showHistory = !showHistory; }}>
      {showHistory ? '← Back to Quiz' : '📊 History'}
      {#if totalAttempts > 0}
        <span class="history-badge">{totalAttempts}</span>
      {/if}
    </button>
  </div>

  {#if showHistory}
    <!-- ── HISTORY DASHBOARD ── -->
    <div class="history-panel">
      <h3>Quiz History</h3>

      {#if history.length === 0}
        <p class="history-empty">No quiz attempts yet. Complete a quiz to see your history!</p>
      {:else}
        <!-- Best scores per category -->
        <div class="history-section">
          <h4>Best Score by Category</h4>
          <div class="best-grid">
            {#each Object.entries(bestScores) as [cat, entry]}
              <div class="best-card">
                <span class="best-cat">{cat}</span>
                <span class="best-pct" class:excellent={entry.pct >= 80} class:good={entry.pct >= 60 && entry.pct < 80} class:practice={entry.pct < 60}>
                  {entry.pct}%
                </span>
                <span class="best-detail">{entry.score}/{entry.total}</span>
              </div>
            {/each}
          </div>
        </div>

        <!-- Recent attempts -->
        <div class="history-section">
          <h4>Recent Attempts</h4>
          <div class="attempts-table">
            <div class="at-header">
              <span>Category</span>
              <span>Score</span>
              <span>%</span>
              <span>Date</span>
            </div>
            {#each [...history].reverse().slice(0, 20) as h}
              <div class="at-row">
                <span class="at-cat">{h.category}</span>
                <span>{h.score}/{h.total}</span>
                <span class:excellent={h.pct >= 80} class:good={h.pct >= 60 && h.pct < 80} class:practice={h.pct < 60}>{h.pct}%</span>
                <span class="at-date">{formatDate(h.date)}</span>
              </div>
            {/each}
          </div>
        </div>

        <div class="history-actions">
          {#if confirmClear}
            <span class="confirm-text">Clear all history?</span>
            <button class="clear-yes" onclick={clearHistory}>Yes, clear</button>
            <button class="clear-no" onclick={() => confirmClear = false}>Cancel</button>
          {:else}
            <button class="clear-btn" onclick={() => confirmClear = true}>Clear History</button>
          {/if}
        </div>
      {/if}
    </div>

  {:else}
    <!-- Category filter pills -->
    <div class="cat-filters">
      {#each quizCategories as cat}
        <button
          class="cat-btn"
          class:active={activeCategory === cat}
          onclick={() => activeCategory = cat}
        >{cat}</button>
      {/each}
    </div>

    {#if finished}
      <!-- ── END SCREEN ── -->
      <div class="end-screen">
        <div class="end-score">{score}<span class="end-total">/{questions.length}</span></div>
        <div class="end-rating"
          class:excellent={rating(score, questions.length) === 'Excellent'}
          class:good={rating(score, questions.length) === 'Good'}
          class:practice={rating(score, questions.length) === 'Keep Practicing'}
        >{rating(score, questions.length)}</div>
        <p class="end-note">
          {Math.round((score / questions.length) * 100)}% correct in {questions.length} questions
          {#if activeCategory !== 'All'} — {activeCategory} category{/if}
        </p>
        <p class="end-saved">Score saved to history</p>
        <div class="end-actions">
          <button class="restart-btn" onclick={restart}>↺ Restart</button>
          <button class="history-btn" onclick={() => showHistory = true}>📊 View History</button>
          <p class="cat-hint">Change category above to quiz a different topic.</p>
        </div>
      </div>

    {:else if q}
      <!-- ── PROGRESS BAR + SCORE ── -->
      <div class="progress-row">
        <div class="progress-wrap">
          <div class="progress-bar" style="width: {progressPct}%"></div>
        </div>
        <div class="progress-label">Question {current + 1} / {questions.length}</div>
        <div class="score-chip">Score: {score} / {current}</div>
      </div>

      <!-- ── QUESTION CARD ── -->
      <div class="quiz-card">
        <div class="difficulty-badge" class:easy={q.difficulty === 'easy'} class:medium={q.difficulty === 'medium'} class:hard={q.difficulty === 'hard'}>
          {q.difficulty}
        </div>
        <p class="scenario">{q.scenario}</p>
        <p class="question">{q.question}</p>

        <div class="options-grid">
          {#each q.options as opt, idx}
            <button
              class="option-btn"
              class:correct={selected !== null && idx === q.correct}
              class:wrong={selected !== null && idx === selected && idx !== q.correct}
              class:dimmed={selected !== null && idx !== selected && idx !== q.correct}
              onclick={() => choose(idx)}
              disabled={selected !== null}
            >
              <span class="opt-letter">{String.fromCharCode(65 + idx)}</span>
              <span class="opt-text">{opt}</span>
            </button>
          {/each}
        </div>

        {#if selected !== null}
          <div class="explanation-card">
            <div class="exp-icon">{selected === q.correct ? '✓' : '✗'}</div>
            <p class="exp-text">{q.explanation}</p>
          </div>
          <div class="next-wrap">
            <button class="next-btn" onclick={next}>
              {current + 1 >= questions.length ? 'See Results' : 'Next Question →'}
            </button>
          </div>
        {/if}
      </div>
    {/if}
  {/if}
</div>

<style>
  .quiz { display: flex; flex-direction: column; gap: 20px; }

  h2 { font-size: 22px; font-weight: 700; color: var(--c-text-h); margin: 0; }
  .intro { font-size: 14px; color: var(--c-text-3); margin: 0; line-height: 1.5; }

  .quiz-header { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
  .quiz-header .intro { flex: 1; min-width: 200px; }

  .history-toggle {
    padding: 6px 14px;
    border-radius: 6px;
    border: 1px solid var(--c-border);
    background: var(--c-bg-card);
    color: var(--c-text-3);
    font-size: 13px; font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;
    display: flex; align-items: center; gap: 6px;
    white-space: nowrap;
  }
  .history-toggle:hover { color: var(--c-text); border-color: var(--c-accent-dark); }
  .history-badge {
    font-size: 10px; font-weight: 800;
    background: var(--c-accent-dark); color: #fff;
    padding: 1px 6px; border-radius: 10px;
  }

  /* ── History panel ── */
  .history-panel {
    display: flex; flex-direction: column; gap: 20px;
    max-width: 700px;
  }
  .history-panel h3 { font-size: 18px; font-weight: 700; color: var(--c-text-h); margin: 0; }
  .history-panel h4 { font-size: 13px; font-weight: 700; color: var(--c-text-3); margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.05em; }
  .history-empty { font-size: 14px; color: var(--c-text-4); }

  .history-section {
    background: var(--c-bg-card);
    border: 1px solid var(--c-border);
    border-radius: 8px;
    padding: 14px 16px;
  }

  .best-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 8px;
  }
  .best-card {
    display: flex; flex-direction: column;
    align-items: center; gap: 4px;
    padding: 10px 8px;
    background: var(--c-bg-subtle);
    border-radius: 6px;
    border: 1px solid var(--c-border-soft);
  }
  .best-cat { font-size: 11px; font-weight: 600; color: var(--c-text-3); text-align: center; }
  .best-pct { font-size: 22px; font-weight: 900; font-family: 'Courier New', monospace; }
  .best-detail { font-size: 11px; color: var(--c-text-4); }

  .excellent { color: #52b788; }
  .good { color: #f59e0b; }
  .practice { color: #ef4444; }

  .attempts-table { display: flex; flex-direction: column; font-size: 13px; }
  .at-header {
    display: grid;
    grid-template-columns: 2fr 1fr 0.7fr 1.5fr;
    gap: 8px;
    padding: 6px 0;
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em;
    color: var(--c-text-4);
    border-bottom: 1px solid var(--c-border);
  }
  .at-row {
    display: grid;
    grid-template-columns: 2fr 1fr 0.7fr 1.5fr;
    gap: 8px;
    padding: 6px 0;
    border-bottom: 1px solid var(--c-border-soft);
    color: var(--c-text-2);
  }
  .at-cat { font-weight: 600; color: var(--c-text); }
  .at-date { color: var(--c-text-4); font-size: 12px; }

  .history-actions {
    display: flex; align-items: center; gap: 8px;
  }
  .clear-btn, .clear-yes, .clear-no {
    padding: 6px 14px;
    border-radius: 5px;
    border: 1px solid var(--c-border);
    background: transparent;
    color: var(--c-text-4);
    font-size: 12px; font-weight: 600;
    cursor: pointer;
  }
  .clear-btn:hover { color: #ef4444; border-color: #ef4444; }
  .clear-yes { background: #3d1a1a; border-color: #ef4444; color: #fca5a5; }
  .clear-no:hover { color: var(--c-text); }
  .confirm-text { font-size: 13px; color: #ef4444; font-weight: 600; }

  /* Category filters */
  .cat-filters { display: flex; gap: 6px; flex-wrap: wrap; }
  .cat-btn {
    padding: 5px 14px;
    border-radius: 20px;
    border: 1px solid var(--c-border);
    background: var(--c-bg-card);
    color: var(--c-text-4);
    font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.15s;
  }
  .cat-btn:hover  { color: var(--c-text); border-color: var(--c-border); background: var(--c-bg-hover); }
  .cat-btn.active { background: var(--c-bg-nav-active); border-color: var(--c-accent-dark); color: var(--c-accent); }

  /* Progress bar */
  .progress-row {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }
  .progress-wrap {
    flex: 1;
    height: 4px;
    background: var(--c-bg-subtle);
    border-radius: 2px;
    overflow: hidden;
    min-width: 120px;
  }
  .progress-bar {
    height: 100%;
    background: var(--c-accent);
    border-radius: 2px;
    transition: width 0.3s ease;
  }
  .progress-label {
    font-size: 13px; color: var(--c-text-4);
    white-space: nowrap;
  }
  .score-chip {
    font-size: 13px; font-weight: 700;
    color: var(--c-accent);
    white-space: nowrap;
  }

  /* Quiz card */
  .quiz-card {
    background: var(--c-bg-card);
    border: 1px solid var(--c-border);
    border-radius: 10px;
    padding: 20px 22px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    max-width: 760px;
    position: relative;
  }

  .difficulty-badge {
    position: absolute;
    top: 14px;
    right: 16px;
    font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.07em;
    padding: 2px 7px; border-radius: 3px;
  }
  .difficulty-badge.easy   { background: #1a3d2e; color: #52b788; }
  .difficulty-badge.medium { background: #3d2a00; color: #f59e0b; }
  .difficulty-badge.hard   { background: #3d1a1a; color: #ef4444; }

  .scenario {
    font-size: 13px; font-style: italic; color: var(--c-text-3);
    margin: 0; line-height: 1.6;
    padding-right: 60px;
  }

  .question {
    font-size: 15px; font-weight: 700; color: var(--c-text-h);
    margin: 0; line-height: 1.5;
  }

  /* Options grid */
  .options-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .option-btn {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 7px;
    border: 1px solid var(--c-border);
    background: var(--c-bg-subtle);
    color: var(--c-text);
    font-size: 14px; font-weight: 500;
    text-align: left;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s, color 0.15s;
    line-height: 1.4;
  }
  .option-btn:hover:not(:disabled):not(.correct):not(.wrong) {
    border-color: var(--c-accent-dark);
    background: var(--c-bg-hover);
  }
  .option-btn:disabled { cursor: default; }

  .option-btn.correct { background: #1a3d2e; border-color: #52b788; color: #b7e4c7; }
  .option-btn.wrong   { background: #3d1a1a; border-color: #ef4444; color: #fca5a5; }
  .option-btn.dimmed  { opacity: 0.45; }

  .opt-letter {
    font-size: 11px; font-weight: 800;
    color: var(--c-text-4);
    background: var(--c-bg-header);
    width: 18px; height: 18px;
    border-radius: 3px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .option-btn.correct .opt-letter { background: #2d6a4f; color: #b7e4c7; }
  .option-btn.wrong   .opt-letter { background: #7f1d1d; color: #fca5a5; }

  .opt-text { flex: 1; }

  /* Explanation */
  .explanation-card {
    display: flex;
    gap: 12px;
    padding: 12px 16px;
    background: var(--c-bg-callout);
    border: 1px solid var(--c-border-accent);
    border-radius: 7px;
    align-items: flex-start;
  }

  .exp-icon {
    font-size: 17px; font-weight: 800;
    color: var(--c-accent);
    line-height: 1.4;
    flex-shrink: 0;
  }

  .exp-text {
    font-size: 13px; color: var(--c-text-3);
    margin: 0; line-height: 1.65;
  }

  .next-wrap { display: flex; justify-content: flex-end; }

  .next-btn {
    padding: 9px 20px;
    border-radius: 6px;
    border: none;
    background: var(--c-accent-dark);
    color: #fff;
    font-size: 14px; font-weight: 700;
    cursor: pointer;
    transition: background 0.15s;
  }
  .next-btn:hover { background: var(--c-accent); }

  /* End screen */
  .end-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 48px 24px;
    background: var(--c-bg-card);
    border: 1px solid var(--c-border);
    border-radius: 10px;
    max-width: 460px;
    text-align: center;
  }

  .end-score {
    font-size: 60px; font-weight: 900;
    color: var(--c-accent);
    line-height: 1;
  }
  .end-total { font-size: 32px; font-weight: 400; color: var(--c-text-4); }

  .end-rating {
    font-size: 22px; font-weight: 800;
    letter-spacing: 0.03em;
  }

  .end-note { font-size: 14px; color: var(--c-text-4); margin: 0; }
  .end-saved { font-size: 12px; color: var(--c-accent); margin: 0; font-weight: 600; }

  .end-actions { display: flex; flex-direction: column; align-items: center; gap: 8px; margin-top: 8px; }

  .restart-btn, .history-btn {
    padding: 10px 28px;
    border-radius: 7px;
    border: none;
    background: var(--c-accent-dark);
    color: #fff;
    font-size: 15px; font-weight: 700;
    cursor: pointer;
    transition: background 0.15s;
  }
  .restart-btn:hover, .history-btn:hover { background: var(--c-accent); }
  .history-btn { background: var(--c-bg-subtle); color: var(--c-text-3); border: 1px solid var(--c-border); font-size: 13px; padding: 8px 20px; }
  .history-btn:hover { background: var(--c-bg-hover); color: var(--c-text); }

  .cat-hint { font-size: 13px; color: var(--c-text-4); margin: 0; }

  @media (max-width: 768px) {
    .options-grid { grid-template-columns: 1fr; }
    .best-grid { grid-template-columns: repeat(2, 1fr); }
    .at-header, .at-row { grid-template-columns: 1.5fr 0.8fr 0.6fr 1.2fr; }
  }
</style>
