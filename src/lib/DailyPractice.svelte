<script>
  import { quizQuestions } from './data/quiz.js';

  let { onDailyComplete = null } = $props();

  let activeTab = $state('daily');
  const tabs = ['daily', 'review'];
  const tabLabels = { daily: 'Daily Challenge', review: 'Review' };

  // ── Daily Challenge ──────────────────────────────────────────────────────
  const today = new Date().toISOString().slice(0, 10);
  let dailyData = $state(JSON.parse(localStorage.getItem('dailyChallenge') ?? '{}'));
  const initialDaily = JSON.parse(localStorage.getItem('dailyChallenge') ?? '{}');
  let dailySelected = $state(initialDaily.date === today ? initialDaily.selected ?? null : null);

  // Deterministic question from today's date
  let dailyQ = $derived.by(() => {
    const seed = today.split('-').reduce((acc, n) => acc * 31 + parseInt(n), 0);
    return quizQuestions[Math.abs(seed) % quizQuestions.length];
  });

  let dailyAnswered = $derived(dailyData.date === today && dailyData.answered);

  function dailyChoose(idx) {
    if (dailyAnswered) return;
    dailySelected = idx;
    const isCorrect = idx === dailyQ.correct;
    dailyData = { date: today, answered: true, selected: idx, correct: isCorrect };
    localStorage.setItem('dailyChallenge', JSON.stringify(dailyData));
    updateSR(dailyQ.id, isCorrect);
    onDailyComplete?.();
  }

  // ── Spaced Repetition Review ─────────────────────────────────────────────
  let srData = $state(JSON.parse(localStorage.getItem('srData') ?? '{}'));
  let srIdx = $state(0);
  let srSelected = $state(null);
  let srRevealed = $state(false);
  let srScore = $state(0);
  let srTotal = $state(0);

  function updateSR(qId, isCorrect) {
    const entry = srData[qId] || { correct: 0, wrong: 0, lastSeen: '' };
    if (isCorrect) entry.correct++;
    else entry.wrong++;
    entry.lastSeen = today;
    srData = { ...srData, [qId]: entry };
    localStorage.setItem('srData', JSON.stringify(srData));
  }

  // Sort: most wrong first, then never-seen, then mastered last
  let srQuestions = $derived.by(() => {
    return [...quizQuestions].sort((a, b) => {
      const sa = srData[a.id];
      const sb = srData[b.id];
      const scoreA = sa ? sa.wrong / (sa.correct + sa.wrong + 1) : 0.5;
      const scoreB = sb ? sb.wrong / (sb.correct + sb.wrong + 1) : 0.5;
      if (scoreB !== scoreA) return scoreB - scoreA;
      return (sa?.lastSeen ?? '').localeCompare(sb?.lastSeen ?? '');
    });
  });

  let srQ = $derived(srQuestions[srIdx % srQuestions.length]);

  function srChoose(idx) {
    if (srRevealed) return;
    srSelected = idx;
    srRevealed = true;
    srTotal++;
    const isCorrect = idx === srQ.correct;
    if (isCorrect) srScore++;
    updateSR(srQ.id, isCorrect);
  }

  function srNext() {
    srIdx++;
    srSelected = null;
    srRevealed = false;
  }

  let weakCount = $derived(
    Object.values(srData).filter(e => e.wrong > e.correct).length
  );
  let seenCount = $derived(Object.keys(srData).length);
</script>

<div class="daily">
  <h2>Daily Practice</h2>
  <p class="intro">
    Tackle today's challenge or review your weak spots with spaced repetition.
  </p>

  <!-- Tabs -->
  <div class="tabs" role="tablist">
    {#each tabs as tab}
      <button
        class="tab-btn"
        class:active={activeTab === tab}
        onclick={() => activeTab = tab}
        role="tab"
        aria-selected={activeTab === tab}
      >
        {tabLabels[tab]}
        {#if tab === 'review' && weakCount > 0}
          <span class="tab-badge">{weakCount}</span>
        {/if}
        {#if tab === 'daily' && !dailyAnswered}
          <span class="tab-dot"></span>
        {/if}
      </button>
    {/each}
  </div>

  <!-- ── DAILY CHALLENGE ── -->
  {#if activeTab === 'daily'}
    <div role="tabpanel" class="daily-panel">
      <div class="challenge-card">
        <div class="challenge-header">
          <span class="challenge-date">{today}</span>
          <span class="challenge-cat">{dailyQ.category}</span>
        </div>

        <p class="challenge-scenario">{dailyQ.scenario}</p>
        <p class="challenge-question">{dailyQ.question}</p>

        <div class="challenge-options">
          {#each dailyQ.options as opt, idx}
            <button
              class="challenge-opt"
              class:correct={dailyAnswered && idx === dailyQ.correct}
              class:wrong={dailyAnswered && idx === dailySelected && idx !== dailyQ.correct}
              class:dimmed={dailyAnswered && idx !== dailySelected && idx !== dailyQ.correct}
              onclick={() => dailyChoose(idx)}
              disabled={dailyAnswered}
            >
              <span class="opt-letter">{String.fromCharCode(65 + idx)}</span>
              <span>{opt}</span>
            </button>
          {/each}
        </div>

        {#if dailyAnswered}
          <div class="challenge-explain">
            <span class="explain-icon">{dailyData.correct ? '\u2713' : '\u2717'}</span>
            <p>{dailyQ.explanation}</p>
          </div>
          <p class="challenge-done">Come back tomorrow for a new challenge!</p>
        {/if}
      </div>
    </div>

  <!-- ── REVIEW (SPACED REPETITION) ── -->
  {:else if activeTab === 'review'}
    <div role="tabpanel" class="review-panel">
      {#if seenCount === 0}
        <div class="review-empty">
          <p>No review data yet. Answer questions in <strong>Daily Challenge</strong> or <strong>Quiz Mode</strong> to build your review queue.</p>
        </div>
      {:else}
        <div class="review-stats">
          <span class="rs-item">{seenCount} questions seen</span>
          <span class="rs-item rs-weak">{weakCount} weak spots</span>
          <span class="rs-item">Session: {srScore}/{srTotal}</span>
        </div>

        <div class="review-card">
          <div class="review-meta">
            <span class="review-cat">{srQ.category}</span>
            {#if srData[srQ.id]}
              <span class="review-history">
                History: {srData[srQ.id].correct}{'\u2713'} {srData[srQ.id].wrong}{'\u2717'}
              </span>
            {:else}
              <span class="review-history">New question</span>
            {/if}
          </div>

          <p class="review-scenario">{srQ.scenario}</p>
          <p class="review-question">{srQ.question}</p>

          <div class="review-options">
            {#each srQ.options as opt, idx}
              <button
                class="review-opt"
                class:correct={srRevealed && idx === srQ.correct}
                class:wrong={srRevealed && idx === srSelected && idx !== srQ.correct}
                class:dimmed={srRevealed && idx !== srSelected && idx !== srQ.correct}
                onclick={() => srChoose(idx)}
                disabled={srRevealed}
              >
                <span class="opt-letter">{String.fromCharCode(65 + idx)}</span>
                <span>{opt}</span>
              </button>
            {/each}
          </div>

          {#if srRevealed}
            <div class="review-explain">
              <span class="explain-icon">{srSelected === srQ.correct ? '\u2713' : '\u2717'}</span>
              <p>{srQ.explanation}</p>
            </div>
            <div class="review-next-wrap">
              <button class="review-next" onclick={srNext}>Next Question</button>
            </div>
          {/if}
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .daily { display: flex; flex-direction: column; gap: 20px; }

  h2 { font-size: 22px; font-weight: 700; color: var(--c-text-h); margin: 0; }
  h3 { font-size: 16px; font-weight: 700; color: var(--c-text); margin: 0; }
  .intro { color: var(--c-text-2); font-size: 14px; margin: 0; line-height: 1.6; }

  /* Tabs */
  .tabs { display: flex; gap: 6px; flex-wrap: wrap; }
  .tab-btn {
    padding: 7px 20px; border-radius: 5px;
    border: 1px solid var(--c-border);
    background: var(--c-bg-card); color: var(--c-text-3);
    font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all 0.15s;
    display: flex; align-items: center; gap: 6px;
  }
  .tab-btn:hover { border-color: var(--c-accent-dark); color: var(--c-text); }
  .tab-btn.active { background: var(--c-accent-dark); border-color: var(--c-accent-dark); color: #fff; }
  .tab-badge {
    font-size: 10px; font-weight: 800;
    background: #7f1d1d; color: #fca5a5;
    padding: 1px 6px; border-radius: 10px;
  }
  .tab-btn.active .tab-badge { background: rgba(255,255,255,0.2); color: #fff; }
  .tab-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--c-accent); flex-shrink: 0;
  }
  .tab-btn.active .tab-dot { background: #fff; }

  /* ── Daily Challenge ── */
  .daily-panel { display: flex; justify-content: center; }
  .challenge-card {
    background: var(--c-bg-card); border: 1px solid var(--c-border);
    border-radius: 10px; padding: 20px 22px;
    display: flex; flex-direction: column; gap: 14px;
    max-width: 640px; width: 100%;
  }
  .challenge-header { display: flex; justify-content: space-between; align-items: center; }
  .challenge-date { font-size: 12px; color: var(--c-text-4); font-weight: 600; font-family: 'Courier New', monospace; }
  .challenge-cat {
    font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.06em; padding: 2px 8px; border-radius: 3px;
    background: var(--c-bg-subtle); color: var(--c-accent);
  }
  .challenge-scenario { font-size: 13px; font-style: italic; color: var(--c-text-3); margin: 0; line-height: 1.6; }
  .challenge-question { font-size: 15px; font-weight: 700; color: var(--c-text-h); margin: 0; line-height: 1.5; }
  .challenge-options { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .challenge-opt, .review-opt {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 10px 14px; border-radius: 7px;
    border: 1px solid var(--c-border); background: var(--c-bg-subtle);
    color: var(--c-text); font-size: 14px; font-weight: 500;
    text-align: left; cursor: pointer;
    transition: border-color 0.15s, background 0.15s; line-height: 1.4;
  }
  .challenge-opt:hover:not(:disabled):not(.correct):not(.wrong),
  .review-opt:hover:not(:disabled):not(.correct):not(.wrong) {
    border-color: var(--c-accent-dark); background: var(--c-bg-hover);
  }
  .challenge-opt:disabled, .review-opt:disabled { cursor: default; }
  .challenge-opt.correct, .review-opt.correct { background: #1a3d2e; border-color: #52b788; color: #b7e4c7; }
  .challenge-opt.wrong, .review-opt.wrong { background: #3d1a1a; border-color: #ef4444; color: #fca5a5; }
  .challenge-opt.dimmed, .review-opt.dimmed { opacity: 0.45; }
  .opt-letter {
    font-size: 11px; font-weight: 800; color: var(--c-text-4);
    background: var(--c-bg-header); width: 18px; height: 18px;
    border-radius: 3px; display: flex; align-items: center;
    justify-content: center; flex-shrink: 0; margin-top: 1px;
  }
  .challenge-opt.correct .opt-letter, .review-opt.correct .opt-letter { background: #2d6a4f; color: #b7e4c7; }
  .challenge-opt.wrong .opt-letter, .review-opt.wrong .opt-letter { background: #7f1d1d; color: #fca5a5; }

  .challenge-explain, .review-explain {
    display: flex; gap: 12px; padding: 12px 16px;
    background: var(--c-bg-callout); border: 1px solid var(--c-border-accent);
    border-radius: 7px; align-items: flex-start;
  }
  .explain-icon { font-size: 17px; font-weight: 800; color: var(--c-accent); line-height: 1.4; flex-shrink: 0; }
  .challenge-explain p, .review-explain p { font-size: 13px; color: var(--c-text-3); margin: 0; line-height: 1.65; }
  .challenge-done { font-size: 13px; color: var(--c-text-4); text-align: center; margin: 0; font-weight: 600; }

  /* ── Review ── */
  .review-panel { display: flex; flex-direction: column; gap: 16px; max-width: 640px; }
  .review-empty {
    padding: 40px 20px; text-align: center;
    background: var(--c-bg-card); border: 1px solid var(--c-border);
    border-radius: 10px;
  }
  .review-empty p { font-size: 14px; color: var(--c-text-3); margin: 0; line-height: 1.6; }
  .review-stats { display: flex; gap: 16px; flex-wrap: wrap; }
  .rs-item {
    font-size: 13px; font-weight: 600; color: var(--c-text-4);
    padding: 4px 12px; border-radius: 5px;
    background: var(--c-bg-card); border: 1px solid var(--c-border);
  }
  .rs-weak { color: #ef4444; }
  .review-card {
    background: var(--c-bg-card); border: 1px solid var(--c-border);
    border-radius: 10px; padding: 20px 22px;
    display: flex; flex-direction: column; gap: 14px;
  }
  .review-meta { display: flex; justify-content: space-between; align-items: center; }
  .review-cat {
    font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.06em; padding: 2px 8px; border-radius: 3px;
    background: var(--c-bg-subtle); color: var(--c-accent);
  }
  .review-history { font-size: 12px; color: var(--c-text-4); font-weight: 600; }
  .review-scenario { font-size: 13px; font-style: italic; color: var(--c-text-3); margin: 0; line-height: 1.6; }
  .review-question { font-size: 15px; font-weight: 700; color: var(--c-text-h); margin: 0; line-height: 1.5; }
  .review-options { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .review-next-wrap { display: flex; justify-content: flex-end; }
  .review-next {
    padding: 8px 20px; border-radius: 6px; border: none;
    background: var(--c-accent-dark); color: #fff;
    font-size: 14px; font-weight: 700;
    cursor: pointer; transition: background 0.15s;
  }
  .review-next:hover { background: var(--c-accent); }

  @media (max-width: 768px) {
    .challenge-options, .review-options { grid-template-columns: 1fr; }
  }
</style>
