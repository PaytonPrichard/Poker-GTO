<script>
  import { quizQuestions } from './data/quiz.js';

  let { onNavigate = null, completedSections = [] } = $props();

  // Map section IDs to quiz category strings
  const sectionToCategory = {
    position: 'Position',
    preflop: 'Preflop',
    equity: 'Equity',
    sizing: 'Sizing',
    postflop: 'Postflop',
    handreading: 'Hand Reading',
    bluffing: 'Bluffing',
    mistakes: 'Common Mistakes',
    multiway: 'Multiway',
    tournament: 'Tournament Play',
    bankroll: 'Bankroll Management',
    solver: 'Solver Concepts',
  };

  const steps = [
    {
      num: 1,
      section: 'position',
      title: 'Position Strategy',
      why: 'Position is the single most important concept in poker. Everything else builds on understanding why acting last gives you an edge.',
      learns: ['Why position matters', 'Early vs late position', 'Positional advantage in action'],
    },
    {
      num: 2,
      section: 'preflop',
      title: 'Preflop Ranges',
      why: 'Now that you understand position, learn exactly which hands to open from each seat. This is the foundation of a solid strategy.',
      learns: ['Open-raise ranges by position', 'How table size changes ranges', 'Hand categories and combos'],
    },
    {
      num: 3,
      section: 'equity',
      title: 'Hand Equity',
      why: 'Before making postflop decisions, you need to understand how likely your hand is to win. Equity drives every bet, call, and fold.',
      learns: ['Hand vs hand equity', 'Equity realization', 'How equity shifts across streets'],
    },
    {
      num: 4,
      section: 'sizing',
      title: 'Bet Sizing',
      why: 'Knowing your equity is one thing — translating it into correct bet sizes is how you extract value and apply pressure.',
      learns: ['Pot-geometry basics', 'Sizing by street', 'Overbets and small bets'],
    },
    {
      num: 5,
      section: 'postflop',
      title: 'Postflop Play',
      why: 'With position, ranges, equity, and sizing covered, you are ready to navigate flop, turn, and river decisions.',
      learns: ['C-betting strategy', 'Board texture analysis', 'Turn and river play'],
    },
    {
      num: 6,
      section: 'handreading',
      title: 'Hand Reading',
      why: 'Move beyond your own cards. Narrowing your opponent\'s range on each street is what separates good players from great ones.',
      learns: ['Range narrowing process', 'Blocker effects', 'Combining reads with board texture'],
    },
    {
      num: 7,
      section: 'bluffing',
      title: 'Bluffing & Reads',
      why: 'Hand reading unlocks bluffing. Learn when to bluff, how to pick spots, and how to read your opponents\' tendencies.',
      learns: ['Bluff frequency and balance', 'Semi-bluffs vs pure bluffs', 'Exploitative reads'],
    },
    {
      num: 8,
      section: 'mistakes',
      title: 'Common Mistakes',
      why: 'Before adding complexity, patch the leaks. The biggest win-rate gains come from eliminating common errors.',
      learns: ['Top strategic leaks', 'Tilt and emotional control', 'Bet-sizing mistakes'],
    },
    {
      num: 9,
      section: 'multiway',
      title: 'Multiway Pots',
      why: 'Multiway dynamics change everything — ranges tighten, bluffing decreases, and equity runs differently.',
      learns: ['Multiway vs heads-up strategy', 'Range adjustments', 'Position in multiway pots'],
    },
    {
      num: 10,
      section: 'tournament',
      title: 'Tournament Strategy & ICM',
      why: 'Tournament poker adds survival pressure. ICM changes optimal play significantly compared to cash games.',
      learns: ['ICM fundamentals', 'Push/fold strategy', 'Bubble and final table play'],
    },
    {
      num: 11,
      section: 'bankroll',
      title: 'Bankroll Management',
      why: 'Even perfect strategy fails without bankroll discipline. Learn to survive variance and move up stakes safely.',
      learns: ['Bankroll requirements', 'Risk of ruin', 'Moving up and down'],
    },
    {
      num: 12,
      section: 'solver',
      title: 'Solver Guide',
      why: 'With a strong foundation, solvers become a powerful study tool rather than a confusing one. Learn to use them effectively.',
      learns: ['How solvers work', 'Interpreting solver output', 'Building study spots'],
    },
  ];

  // Pre-build quiz pools per section
  const quizBySection = {};
  for (const step of steps) {
    const cat = sectionToCategory[step.section];
    quizBySection[step.section] = quizQuestions.filter(q => q.category === cat);
  }

  let currentStep = $derived.by(() => {
    for (const step of steps) {
      if (!completedSections.includes(step.section)) return step.num;
    }
    return steps.length + 1;
  });

  let completedCount = $derived(
    steps.filter(s => completedSections.includes(s.section)).length
  );

  let pct = $derived(Math.round((completedCount / steps.length) * 100));
  let allDone = $derived(completedCount === steps.length);

  // ── Per-step quiz state ─────────────────────────────────────────────────
  let quizOpen = $state(null);        // section ID of the open quiz, or null
  let quizIdx = $state(0);            // index into the section's quiz pool
  let quizSelected = $state(null);    // selected answer index
  let quizRevealed = $state(false);
  let quizScore = $state(0);
  let quizTotal = $state(0);

  function openQuiz(sectionId) {
    if (quizOpen === sectionId) {
      quizOpen = null;
      return;
    }
    quizOpen = sectionId;
    quizIdx = 0;
    quizSelected = null;
    quizRevealed = false;
    quizScore = 0;
    quizTotal = 0;
  }

  let quizPool = $derived(quizOpen ? quizBySection[quizOpen] ?? [] : []);
  let quizQ = $derived(quizPool.length > 0 ? quizPool[quizIdx % quizPool.length] : null);

  function quizChoose(idx) {
    if (quizRevealed) return;
    quizSelected = idx;
    quizRevealed = true;
    quizTotal++;
    if (idx === quizQ.correct) quizScore++;
  }

  function quizNext() {
    quizIdx++;
    quizSelected = null;
    quizRevealed = false;
  }
</script>

<div class="guided">
  <h2>Guided Learning</h2>
  <p class="intro">
    A curated 12-step path through all the material, ordered so each topic builds on the last.
    Open every concept card in a section to mark it complete, then test yourself with the quiz.
  </p>

  <!-- Overall progress -->
  <div class="gl-progress">
    <div class="gl-progress-bar">
      <div class="gl-progress-fill" style="width:{pct}%"></div>
    </div>
    <span class="gl-progress-label">{completedCount}/{steps.length} sections complete — {pct}%</span>
  </div>

  {#if allDone}
    <div class="gl-done">
      <span class="gl-done-icon">&#9733;</span>
      <p>You've completed the entire guided path. Revisit any section or keep practicing with Daily Practice and Quiz Mode.</p>
    </div>
  {/if}

  <div class="steps">
    {#each steps as step}
      {@const done = completedSections.includes(step.section)}
      {@const isCurrent = step.num === currentStep}
      {@const isLocked = step.num > currentStep && !done}
      {@const qCount = quizBySection[step.section]?.length ?? 0}
      {@const isQuizOpen = quizOpen === step.section}
      <div class="step" class:done class:current={isCurrent} class:locked={isLocked}>
        <div class="step-marker">
          {#if done}
            <span class="marker-done">&#10003;</span>
          {:else}
            <span class="marker-num">{step.num}</span>
          {/if}
          {#if step.num < steps.length}
            <div class="step-line" class:done></div>
          {/if}
        </div>

        <div class="step-content">
          <div class="step-header">
            <h3>{step.title}</h3>
            {#if done}
              <span class="step-badge badge-done">Complete</span>
            {:else if isCurrent}
              <span class="step-badge badge-current">Up Next</span>
            {/if}
          </div>

          <p class="step-why">{step.why}</p>

          <ul class="step-learns">
            {#each step.learns as item}
              <li>{item}</li>
            {/each}
          </ul>

          <div class="step-actions">
            <button
              class="step-go"
              class:primary={isCurrent}
              onclick={() => onNavigate?.(step.section)}
            >
              {done ? 'Review' : isCurrent ? 'Start This Lesson' : 'Jump Ahead'}
            </button>

            {#if qCount > 0}
              <button
                class="step-quiz-btn"
                class:active={isQuizOpen}
                onclick={() => openQuiz(step.section)}
              >
                {isQuizOpen ? 'Hide Quiz' : `Test Yourself (${qCount})`}
              </button>
            {/if}
          </div>

          <!-- Inline quiz -->
          {#if isQuizOpen && quizQ}
            <div class="sq">
              <div class="sq-header">
                <span class="sq-cat">{quizQ.category}</span>
                <span class="sq-count">
                  {quizIdx % quizPool.length + 1}/{quizPool.length}
                  {#if quizTotal > 0}
                    &middot; {quizScore}/{quizTotal} correct
                  {/if}
                </span>
              </div>

              <p class="sq-scenario">{quizQ.scenario}</p>
              <p class="sq-question">{quizQ.question}</p>

              <div class="sq-options">
                {#each quizQ.options as opt, idx}
                  <button
                    class="sq-opt"
                    class:correct={quizRevealed && idx === quizQ.correct}
                    class:wrong={quizRevealed && idx === quizSelected && idx !== quizQ.correct}
                    class:dimmed={quizRevealed && idx !== quizSelected && idx !== quizQ.correct}
                    onclick={() => quizChoose(idx)}
                    disabled={quizRevealed}
                  >
                    <span class="sq-letter">{String.fromCharCode(65 + idx)}</span>
                    <span>{opt}</span>
                  </button>
                {/each}
              </div>

              {#if quizRevealed}
                <div class="sq-explain">
                  <span class="sq-explain-icon">{quizSelected === quizQ.correct ? '\u2713' : '\u2717'}</span>
                  <p>{quizQ.explanation}</p>
                </div>
                <div class="sq-nav">
                  {#if quizIdx + 1 < quizPool.length}
                    <button class="sq-next" onclick={quizNext}>Next Question</button>
                  {:else}
                    <span class="sq-finished">All {quizPool.length} questions answered — {quizScore}/{quizTotal} correct</span>
                  {/if}
                </div>
              {/if}
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .guided { display: flex; flex-direction: column; gap: 20px; max-width: 680px; }

  h2 { font-size: 22px; font-weight: 700; color: var(--c-text-h); margin: 0; }
  .intro { color: var(--c-text-2); font-size: 14px; margin: 0; line-height: 1.6; }

  /* Progress */
  .gl-progress { display: flex; flex-direction: column; gap: 6px; }
  .gl-progress-bar {
    height: 6px; border-radius: 3px;
    background: var(--c-bg-subtle); overflow: hidden;
  }
  .gl-progress-fill {
    height: 100%; border-radius: 3px;
    background: #52b788;
    transition: width 0.4s ease;
  }
  .gl-progress-label {
    font-size: 13px; font-weight: 600;
    color: var(--c-text-3);
  }

  .gl-done {
    display: flex; align-items: center; gap: 14px;
    padding: 14px 18px; border-radius: 8px;
    background: rgba(45,106,79,0.12);
    border: 1px solid #2d6a4f;
  }
  .gl-done-icon { font-size: 28px; color: #52b788; flex-shrink: 0; }
  .gl-done p { font-size: 14px; color: var(--c-text-2); margin: 0; line-height: 1.5; }

  /* Steps */
  .steps { display: flex; flex-direction: column; gap: 0; }

  .step {
    display: flex; gap: 16px;
    padding: 0 0 4px;
  }

  /* Marker column */
  .step-marker {
    display: flex; flex-direction: column; align-items: center;
    width: 36px; flex-shrink: 0; padding-top: 2px;
  }

  .marker-num {
    width: 32px; height: 32px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 50%; font-size: 13px; font-weight: 800;
    background: var(--c-bg-subtle); color: var(--c-text-4);
    border: 2px solid var(--c-border);
  }
  .step.current .marker-num {
    background: #2d6a4f; color: #b7e4c7;
    border-color: #52b788;
  }

  .marker-done {
    width: 32px; height: 32px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 50%; font-size: 15px; font-weight: 800;
    background: #2d6a4f; color: #b7e4c7;
    border: 2px solid #52b788;
  }

  .step-line {
    width: 2px; flex: 1; min-height: 16px;
    background: var(--c-border);
    margin: 4px 0;
  }
  .step-line.done { background: #52b788; }

  /* Content */
  .step-content {
    flex: 1;
    background: var(--c-bg-card); border: 1px solid var(--c-border);
    border-radius: 8px; padding: 14px 18px;
    margin-bottom: 8px;
    display: flex; flex-direction: column; gap: 8px;
  }
  .step.done .step-content { opacity: 0.75; }
  .step.current .step-content {
    border-color: #2d6a4f;
    box-shadow: 0 0 0 1px rgba(82,183,136,0.15);
  }

  .step-header { display: flex; align-items: center; gap: 10px; }
  .step-header h3 { font-size: 15px; font-weight: 700; color: var(--c-text-h); margin: 0; flex: 1; }

  .step-badge {
    font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.06em; padding: 2px 8px; border-radius: 3px;
    flex-shrink: 0;
  }
  .badge-done { background: rgba(45,106,79,0.2); color: #52b788; }
  .badge-current { background: rgba(96,165,250,0.15); color: #60a5fa; }

  .step-why {
    font-size: 13px; color: var(--c-text-3); margin: 0;
    line-height: 1.55; font-style: italic;
  }

  .step-learns {
    margin: 0; padding: 0 0 0 18px;
    font-size: 13px; color: var(--c-text-2);
    line-height: 1.5; list-style: disc;
  }
  .step-learns li { margin: 2px 0; }

  .step-actions {
    display: flex; align-items: center; gap: 8px;
    flex-wrap: wrap; margin-top: 2px;
  }

  .step-go {
    padding: 6px 16px; border-radius: 5px;
    border: 1px solid var(--c-border);
    background: transparent; color: var(--c-text-3);
    font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.15s;
  }
  .step-go:hover { border-color: var(--c-accent-dark); color: var(--c-text); }
  .step-go.primary {
    background: var(--c-accent-dark); border-color: var(--c-accent-dark);
    color: #fff;
  }
  .step-go.primary:hover { background: var(--c-accent); }

  .step-quiz-btn {
    padding: 6px 14px; border-radius: 5px;
    border: 1px solid var(--c-border);
    background: transparent; color: var(--c-text-4);
    font-size: 12px; font-weight: 600;
    cursor: pointer; transition: all 0.15s;
  }
  .step-quiz-btn:hover { border-color: #60a5fa; color: #60a5fa; }
  .step-quiz-btn.active { border-color: #60a5fa; color: #60a5fa; background: rgba(96,165,250,0.08); }

  .step.locked .step-content { opacity: 0.5; }

  /* ── Section quiz ── */
  .sq {
    display: flex; flex-direction: column; gap: 10px;
    padding: 14px 16px; margin-top: 4px;
    background: var(--c-bg-header); border: 1px solid var(--c-border);
    border-radius: 7px;
  }

  .sq-header { display: flex; justify-content: space-between; align-items: center; }
  .sq-cat {
    font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.06em; padding: 2px 8px; border-radius: 3px;
    background: var(--c-bg-subtle); color: var(--c-accent);
  }
  .sq-count { font-size: 12px; font-weight: 600; color: var(--c-text-4); }

  .sq-scenario { font-size: 13px; font-style: italic; color: var(--c-text-3); margin: 0; line-height: 1.6; }
  .sq-question { font-size: 14px; font-weight: 700; color: var(--c-text-h); margin: 0; line-height: 1.5; }

  .sq-options { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }

  .sq-opt {
    display: flex; align-items: flex-start; gap: 8px;
    padding: 8px 12px; border-radius: 6px;
    border: 1px solid var(--c-border); background: var(--c-bg-subtle);
    color: var(--c-text); font-size: 13px; font-weight: 500;
    text-align: left; cursor: pointer;
    transition: border-color 0.15s, background 0.15s; line-height: 1.4;
  }
  .sq-opt:hover:not(:disabled):not(.correct):not(.wrong) {
    border-color: var(--c-accent-dark); background: var(--c-bg-hover);
  }
  .sq-opt:disabled { cursor: default; }
  .sq-opt.correct { background: #1a3d2e; border-color: #52b788; color: #b7e4c7; }
  .sq-opt.wrong { background: #3d1a1a; border-color: #ef4444; color: #fca5a5; }
  .sq-opt.dimmed { opacity: 0.45; }

  .sq-letter {
    font-size: 10px; font-weight: 800; color: var(--c-text-4);
    background: var(--c-bg-header); width: 16px; height: 16px;
    border-radius: 3px; display: flex; align-items: center;
    justify-content: center; flex-shrink: 0; margin-top: 1px;
  }
  .sq-opt.correct .sq-letter { background: #2d6a4f; color: #b7e4c7; }
  .sq-opt.wrong .sq-letter { background: #7f1d1d; color: #fca5a5; }

  .sq-explain {
    display: flex; gap: 10px; padding: 10px 14px;
    background: var(--c-bg-callout); border: 1px solid var(--c-border-accent);
    border-radius: 6px; align-items: flex-start;
  }
  .sq-explain-icon { font-size: 16px; font-weight: 800; color: var(--c-accent); line-height: 1.4; flex-shrink: 0; }
  .sq-explain p { font-size: 12px; color: var(--c-text-3); margin: 0; line-height: 1.6; }

  .sq-nav { display: flex; align-items: center; gap: 10px; }
  .sq-next {
    padding: 6px 16px; border-radius: 5px; border: none;
    background: var(--c-accent-dark); color: #fff;
    font-size: 13px; font-weight: 700;
    cursor: pointer; transition: background 0.15s;
  }
  .sq-next:hover { background: var(--c-accent); }

  .sq-finished {
    font-size: 13px; font-weight: 600; color: #52b788;
  }

  @media (max-width: 768px) {
    .step-marker { width: 28px; }
    .marker-num, .marker-done { width: 26px; height: 26px; font-size: 11px; }
    .step-content { padding: 12px 14px; }
    .sq-options { grid-template-columns: 1fr; }
  }
</style>
