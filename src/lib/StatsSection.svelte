<script>
  import { quizQuestions } from './data/quiz.js';

  // ── LocalStorage data sources ──────────────────────────────────────────────
  let quizHistory = $state(JSON.parse(localStorage.getItem('quizHistory') ?? '[]'));
  let eqStats = $state(JSON.parse(localStorage.getItem('practiceScores_equity') ?? '{"totalCorrect":0,"totalAttempts":0,"bestStreak":0}'));
  let cbetStats = $state(JSON.parse(localStorage.getItem('practiceScores_cbet') ?? '{"totalCorrect":0,"totalAttempts":0,"bestStreak":0}'));
  let pfStats = $state(JSON.parse(localStorage.getItem('practiceScores_pushfold') ?? '{"totalCorrect":0,"totalAttempts":0,"bestStreak":0}'));
  let srData = $state(JSON.parse(localStorage.getItem('srData') ?? '{}'));
  let dailyChallenge = $state(JSON.parse(localStorage.getItem('dailyChallenge') ?? '{}'));
  let completedSections = $state(JSON.parse(localStorage.getItem('completedSections') ?? '[]'));

  // ── Streak calculation ─────────────────────────────────────────────────────
  let streakData = $state(JSON.parse(localStorage.getItem('streakData') ?? '{"count":0,"lastDate":""}'));

  let streakCount = $derived.by(() => {
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

    // If today's challenge is answered and streak was already updated, use it
    if (dailyChallenge.date === today && dailyChallenge.answered) {
      if (streakData.lastDate === today) return streakData.count;
      if (streakData.lastDate === yesterday) return streakData.count + 1;
      return 1;
    }
    // If yesterday was the last streak date, it still holds
    if (streakData.lastDate === yesterday) return streakData.count;
    if (streakData.lastDate === today) return streakData.count;
    return 0;
  });

  // ── Overview stats ─────────────────────────────────────────────────────────
  let quizAttempts = $derived(
    quizHistory.reduce((sum, h) => sum + h.total, 0)
  );

  let trainerAttempts = $derived(
    eqStats.totalAttempts + cbetStats.totalAttempts + pfStats.totalAttempts
  );

  let totalAnswered = $derived(quizAttempts + trainerAttempts);

  let overallAccuracy = $derived.by(() => {
    const quizCorrect = quizHistory.reduce((sum, h) => sum + h.score, 0);
    const trainerCorrect = eqStats.totalCorrect + cbetStats.totalCorrect + pfStats.totalCorrect;
    const totalCorrect = quizCorrect + trainerCorrect;
    const totalAll = quizAttempts + trainerAttempts;
    if (totalAll === 0) return 0;
    return Math.round((totalCorrect / totalAll) * 100);
  });

  const TOTAL_SECTIONS = 18;

  // ── Trainer breakdown ──────────────────────────────────────────────────────
  function trainerPct(stats) {
    if (stats.totalAttempts === 0) return 0;
    return Math.round((stats.totalCorrect / stats.totalAttempts) * 100);
  }

  let trainers = $derived([
    { name: 'Equity Guess', key: 'equity', stats: eqStats, icon: '\u2660', color: '#60a5fa' },
    { name: 'C-bet Drill', key: 'cbet', stats: cbetStats, icon: '\u2665', color: '#ef4444' },
    { name: 'Push/Fold', key: 'pushfold', stats: pfStats, icon: '\u2605', color: '#f59e0b' },
  ]);

  // ── Weakest categories ─────────────────────────────────────────────────────
  // Build question ID → category map
  const questionCategoryMap = {};
  for (const q of quizQuestions) {
    questionCategoryMap[q.id] = q.category;
  }

  let weakCategories = $derived.by(() => {
    // Aggregate srData by category
    const catStats = {};
    for (const [qId, data] of Object.entries(srData)) {
      const cat = questionCategoryMap[qId];
      if (!cat) continue;
      if (!catStats[cat]) catStats[cat] = { correct: 0, wrong: 0 };
      catStats[cat].correct += data.correct;
      catStats[cat].wrong += data.wrong;
    }
    // Filter categories where wrong > correct, sort by most wrong
    return Object.entries(catStats)
      .filter(([, s]) => s.wrong > s.correct)
      .sort((a, b) => (b[1].wrong - b[1].correct) - (a[1].wrong - a[1].correct))
      .slice(0, 5)
      .map(([cat, s]) => ({
        category: cat,
        correct: s.correct,
        wrong: s.wrong,
        total: s.correct + s.wrong,
        pct: Math.round((s.correct / (s.correct + s.wrong)) * 100),
      }));
  });

  // ── Achievements ───────────────────────────────────────────────────────────
  let achievements = $derived.by(() => {
    const quizCorrect = quizHistory.reduce((sum, h) => sum + h.score, 0);
    const trainerCorrect = eqStats.totalCorrect + cbetStats.totalCorrect + pfStats.totalCorrect;
    const total = quizAttempts + trainerAttempts;

    // Check if any quiz category scored 80%+
    const has80 = quizHistory.some(h => h.pct >= 80);

    // Check if any trainer has 90%+ accuracy
    const has90trainer = [eqStats, cbetStats, pfStats].some(
      s => s.totalAttempts >= 5 && (s.totalCorrect / s.totalAttempts) >= 0.9
    );

    // Check for perfect round (100% on quiz with 5+ questions)
    const perfectRound = quizHistory.some(h => h.pct === 100 && h.total >= 5);

    return [
      {
        id: 'first-steps',
        icon: '\u{1F4A1}',
        title: 'First Steps',
        desc: 'Answer your first question',
        earned: total > 0,
      },
      {
        id: 'quiz-whiz',
        icon: '\u{1F3AF}',
        title: 'Quiz Whiz',
        desc: 'Score 80%+ on any quiz category',
        earned: has80,
      },
      {
        id: 'on-fire',
        icon: '\u{1F525}',
        title: 'On Fire',
        desc: '3-day daily challenge streak',
        earned: streakCount >= 3,
      },
      {
        id: 'week-warrior',
        icon: '\u26A1',
        title: 'Week Warrior',
        desc: '7-day daily challenge streak',
        earned: streakCount >= 7,
      },
      {
        id: 'sharp-shooter',
        icon: '\u{1F3B2}',
        title: 'Sharp Shooter',
        desc: '90%+ accuracy in any trainer (min 5 attempts)',
        earned: has90trainer,
      },
      {
        id: 'completionist',
        icon: '\u{1F4DA}',
        title: 'Completionist',
        desc: 'Complete all 12 guided learning sections',
        earned: completedSections.length >= 12,
      },
      {
        id: 'century',
        icon: '\u{1F4AF}',
        title: 'Century',
        desc: 'Answer 100 total questions',
        earned: total >= 100,
      },
      {
        id: 'perfect-round',
        icon: '\u2728',
        title: 'Perfect Round',
        desc: 'Score 100% on a quiz with 5+ questions',
        earned: perfectRound,
      },
      {
        id: 'explorer',
        icon: '\u{1F30D}',
        title: 'Explorer',
        desc: 'Visit all 18 sections',
        earned: completedSections.length >= TOTAL_SECTIONS,
      },
    ];
  });

  let earnedCount = $derived(achievements.filter(a => a.earned).length);
</script>

<div class="stats">
  <h2>My Stats</h2>
  <p class="intro">
    Your practice data across all trainers, quizzes, and daily challenges in one place.
  </p>

  <!-- ── Overview cards ── -->
  <div class="overview-row">
    <div class="ov-card">
      <span class="ov-value">{totalAnswered}</span>
      <span class="ov-label">Questions Answered</span>
    </div>
    <div class="ov-card">
      <span class="ov-value">{overallAccuracy}<span class="ov-unit">%</span></span>
      <span class="ov-label">Overall Accuracy</span>
    </div>
    <div class="ov-card">
      <span class="ov-value">
        <span class="ov-flame">{'\u{1F525}'}</span>{streakCount}
      </span>
      <span class="ov-label">Daily Streak</span>
    </div>
    <div class="ov-card">
      <span class="ov-value">{completedSections.length}<span class="ov-unit">/{TOTAL_SECTIONS}</span></span>
      <span class="ov-label">Sections Completed</span>
    </div>
  </div>

  <!-- ── Trainer breakdown ── -->
  <div class="section-block">
    <h3>Trainer Breakdown</h3>
    <div class="trainer-row">
      {#each trainers as t}
        <div class="trainer-card">
          <div class="trainer-header">
            <span class="trainer-icon" style="color:{t.color}">{t.icon}</span>
            <span class="trainer-name">{t.name}</span>
          </div>
          {#if t.stats.totalAttempts > 0}
            <div class="trainer-accuracy">
              <span class="trainer-pct">{trainerPct(t.stats)}%</span>
              <span class="trainer-detail">{t.stats.totalCorrect}/{t.stats.totalAttempts} correct</span>
            </div>
            <div class="trainer-bar-track">
              <div class="trainer-bar-fill" style="width:{trainerPct(t.stats)}%; background:{t.color}"></div>
            </div>
            <span class="trainer-streak">Best streak: {t.stats.bestStreak}</span>
          {:else}
            <span class="trainer-empty">No attempts yet</span>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <!-- ── Weakest categories ── -->
  <div class="section-block">
    <h3>Weakest Categories</h3>
    {#if weakCategories.length === 0}
      <div class="empty-state">
        <p>No weak spots detected yet. Keep practicing to identify areas for improvement.</p>
      </div>
    {:else}
      <div class="weak-list">
        {#each weakCategories as w}
          <div class="weak-item">
            <div class="weak-header">
              <span class="weak-cat">{w.category}</span>
              <span class="weak-pct" class:bad={w.pct < 40} class:meh={w.pct >= 40 && w.pct < 60}>{w.pct}%</span>
            </div>
            <div class="weak-bar-track">
              <div class="weak-bar-fill" style="width:{w.pct}%"></div>
            </div>
            <span class="weak-detail">{w.correct} correct, {w.wrong} wrong out of {w.total}</span>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <!-- ── Achievements ── -->
  <div class="section-block">
    <h3>Achievements <span class="badge-count">{earnedCount}/{achievements.length}</span></h3>
    <div class="achievements-grid">
      {#each achievements as a}
        <div class="ach-card" class:earned={a.earned} class:locked={!a.earned}>
          <span class="ach-icon">{a.icon}</span>
          <span class="ach-title">{a.title}</span>
          <span class="ach-desc">{a.desc}</span>
          {#if a.earned}
            <span class="ach-check">{'\u2713'}</span>
          {:else}
            <span class="ach-lock">{'\u{1F512}'}</span>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .stats { display: flex; flex-direction: column; gap: 24px; max-width: 720px; }

  h2 { font-size: 22px; font-weight: 700; color: var(--c-text-h); margin: 0; }
  h3 { font-size: 16px; font-weight: 700; color: var(--c-text); margin: 0; }
  .intro { color: var(--c-text-2); font-size: 14px; margin: 0; line-height: 1.6; }

  /* ── Overview cards ── */
  .overview-row {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;
  }
  .ov-card {
    background: var(--c-bg-card); border: 1px solid var(--c-border);
    border-radius: 10px; padding: 16px 14px;
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    text-align: center;
  }
  .ov-value {
    font-size: 28px; font-weight: 800; color: var(--c-text-h);
    display: flex; align-items: baseline; gap: 2px;
  }
  .ov-unit { font-size: 16px; font-weight: 600; color: var(--c-text-3); }
  .ov-label { font-size: 11px; font-weight: 600; color: var(--c-text-4); text-transform: uppercase; letter-spacing: 0.04em; }
  .ov-flame { font-size: 22px; margin-right: 2px; }

  /* ── Section blocks ── */
  .section-block { display: flex; flex-direction: column; gap: 12px; }

  /* ── Trainer breakdown ── */
  .trainer-row {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
  }
  .trainer-card {
    background: var(--c-bg-card); border: 1px solid var(--c-border);
    border-radius: 10px; padding: 14px 16px;
    display: flex; flex-direction: column; gap: 8px;
  }
  .trainer-header { display: flex; align-items: center; gap: 8px; }
  .trainer-icon { font-size: 18px; }
  .trainer-name { font-size: 13px; font-weight: 700; color: var(--c-text-h); }
  .trainer-accuracy { display: flex; align-items: baseline; gap: 8px; }
  .trainer-pct { font-size: 24px; font-weight: 800; color: var(--c-text-h); }
  .trainer-detail { font-size: 11px; color: var(--c-text-4); font-weight: 600; }
  .trainer-bar-track {
    height: 4px; border-radius: 2px; background: var(--c-bg-subtle); overflow: hidden;
  }
  .trainer-bar-fill {
    height: 100%; border-radius: 2px; transition: width 0.4s ease;
  }
  .trainer-streak { font-size: 11px; color: var(--c-text-4); font-weight: 600; }
  .trainer-empty { font-size: 12px; color: var(--c-text-4); font-style: italic; }

  /* ── Weakest categories ── */
  .empty-state {
    padding: 24px 16px; text-align: center;
    background: var(--c-bg-card); border: 1px solid var(--c-border);
    border-radius: 10px;
  }
  .empty-state p { font-size: 13px; color: var(--c-text-3); margin: 0; line-height: 1.6; }

  .weak-list { display: flex; flex-direction: column; gap: 8px; }
  .weak-item {
    background: var(--c-bg-card); border: 1px solid var(--c-border);
    border-radius: 8px; padding: 12px 16px;
    display: flex; flex-direction: column; gap: 6px;
  }
  .weak-header { display: flex; justify-content: space-between; align-items: center; }
  .weak-cat { font-size: 14px; font-weight: 700; color: var(--c-text-h); }
  .weak-pct { font-size: 14px; font-weight: 800; color: #f59e0b; }
  .weak-pct.bad { color: #ef4444; }
  .weak-pct.meh { color: #f59e0b; }
  .weak-bar-track {
    height: 4px; border-radius: 2px; background: var(--c-bg-subtle); overflow: hidden;
  }
  .weak-bar-fill {
    height: 100%; border-radius: 2px; background: #ef4444;
    transition: width 0.4s ease;
  }
  .weak-detail { font-size: 11px; color: var(--c-text-4); font-weight: 600; }

  /* ── Achievements ── */
  .badge-count {
    font-size: 13px; font-weight: 600; color: var(--c-text-4);
    margin-left: 6px;
  }
  .achievements-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
  }
  .ach-card {
    position: relative;
    background: var(--c-bg-card); border: 1px solid var(--c-border);
    border-radius: 10px; padding: 16px 14px;
    display: flex; flex-direction: column; align-items: center;
    gap: 4px; text-align: center;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .ach-card.earned {
    border-color: #2d6a4f;
    box-shadow: 0 0 0 1px rgba(82, 183, 136, 0.15);
  }
  .ach-card.locked { opacity: 0.45; }
  .ach-icon { font-size: 28px; margin-bottom: 2px; }
  .ach-card.locked .ach-icon { filter: grayscale(1); }
  .ach-title { font-size: 13px; font-weight: 700; color: var(--c-text-h); }
  .ach-desc { font-size: 11px; color: var(--c-text-3); line-height: 1.4; }
  .ach-check {
    position: absolute; top: 8px; right: 10px;
    font-size: 13px; font-weight: 800; color: #52b788;
  }
  .ach-lock {
    position: absolute; top: 8px; right: 10px;
    font-size: 12px;
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .overview-row { grid-template-columns: repeat(2, 1fr); }
    .trainer-row { grid-template-columns: 1fr; }
    .achievements-grid { grid-template-columns: repeat(2, 1fr); }
    .ov-value { font-size: 24px; }
  }
</style>
