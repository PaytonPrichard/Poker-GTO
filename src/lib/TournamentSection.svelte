<script>
  import {
    tournamentBasics,
    stageStrategy,
    icmConcepts,
    pushFoldRanges,
  } from './data/tournament.js';
  import {
    bbBreakpoints,
    positions,
    stageInfo,
    getNearestBreakpoint,
    getTournamentRange,
  } from './data/tournamentRanges.js';
  import HandMatrix from './HandMatrix.svelte';

  let activeTab = $state('fundamentals');
  let sectionEl;
  let allOpen = $state(false);
  function toggleAll() { allOpen = !allOpen; sectionEl?.querySelectorAll('details').forEach(d => d.open = allOpen); }

  const tabs = ['fundamentals', 'stages', 'stageranges', 'icm', 'pushfold'];
  const tabLabels = { fundamentals: 'Fundamentals', stages: 'Stage Strategy', stageranges: 'Stage Ranges', icm: 'ICM & Bubble', pushfold: 'Push/Fold' };

  // Stage Ranges state
  let srBB = $state(40);
  let srPosition = $state('BTN');
  let srNearestBP = $derived(getNearestBreakpoint(srBB));
  let srStage = $derived(stageInfo[srNearestBP]);
  let srRange = $derived(getTournamentRange(srBB, srPosition));

  // Push/Fold Trainer
  let pfMode = $state(false);
  let pfIdx = $state(0);
  let pfAnswer = $state('');
  let pfRevealed = $state(false);
  let pfScore = $state(0);
  let pfTotal = $state(0);

  const pfScenarios = [
    { hand: 'A\u2660 K\u2665', pos: 'UTG', bb: 10, answer: 'push', why: 'AKo is a clear shove from any position at 10 BB.' },
    { hand: '3\u2660 3\u2665', pos: 'UTG', bb: 10, answer: 'push', why: 'All pairs (22+) are in UTG push range at 10 BB.' },
    { hand: 'A\u2660 9\u2660', pos: 'UTG', bb: 10, answer: 'fold', why: 'A9s is below UTG range \u2014 need ATs+ at 10 BB.' },
    { hand: 'K\u2660 Q\u2665', pos: 'UTG', bb: 10, answer: 'fold', why: 'KQo is not in UTG range \u2014 only KQs qualifies at 10 BB.' },
    { hand: 'A\u2660 2\u2660', pos: 'CO', bb: 10, answer: 'push', why: 'All suited aces (A2s+) are in CO push range at 10 BB.' },
    { hand: 'A\u2660 7\u2665', pos: 'CO', bb: 10, answer: 'fold', why: 'A7o is below CO range \u2014 need A8o+ at 10 BB.' },
    { hand: 'Q\u2660 J\u2660', pos: 'CO', bb: 10, answer: 'push', why: 'QJs is specifically in the CO push range at 10 BB.' },
    { hand: 'Q\u2660 9\u2665', pos: 'BTN', bb: 10, answer: 'push', why: 'Q9o is in BTN push range at 10 BB (~40%).' },
    { hand: 'K\u2660 7\u2665', pos: 'BTN', bb: 10, answer: 'fold', why: 'K7o misses BTN range \u2014 need K8o+ at 10 BB.' },
    { hand: 'T\u2660 8\u2665', pos: 'SB', bb: 10, answer: 'push', why: 'T8o is in SB push range at 10 BB (~55%).' },
    { hand: '7\u2660 6\u2660', pos: 'SB', bb: 10, answer: 'push', why: '76s is in SB push range at 10 BB.' },
    { hand: '7\u2660 5\u2660', pos: 'SB', bb: 10, answer: 'fold', why: '75s is below SB range \u2014 need 76s at 10 BB.' },
    { hand: '4\u2660 4\u2665', pos: 'UTG', bb: 15, answer: 'fold', why: '44 is below UTG range \u2014 need 55+ at 15 BB.' },
    { hand: 'A\u2660 T\u2665', pos: 'UTG', bb: 15, answer: 'fold', why: 'ATo misses UTG range \u2014 need AJo+ at 15 BB.' },
    { hand: 'K\u2660 Q\u2660', pos: 'UTG', bb: 15, answer: 'push', why: 'KQs is in UTG push range at 15 BB.' },
    { hand: 'A\u2660 5\u2660', pos: 'CO', bb: 15, answer: 'push', why: 'A5s is in CO push range at 15 BB.' },
    { hand: 'A\u2660 4\u2660', pos: 'CO', bb: 15, answer: 'fold', why: 'A4s is below CO range \u2014 need A5s+ at 15 BB.' },
    { hand: 'K\u2660 T\u2665', pos: 'BTN', bb: 15, answer: 'push', why: 'KTo is in BTN push range at 15 BB (~28%).' },
    { hand: 'A\u2660 4\u2665', pos: 'BTN', bb: 15, answer: 'fold', why: 'A4o is below BTN range \u2014 need A5o+ at 15 BB.' },
    { hand: 'J\u2660 8\u2660', pos: 'SB', bb: 15, answer: 'push', why: 'J8s is in SB push range at 15 BB (~38%).' },
    { hand: 'A\u2660 7\u2665', pos: 'BTN', bb: 20, answer: 'push', why: 'A7o is in BTN push range at 20 BB (~22%).' },
    { hand: 'A\u2660 6\u2665', pos: 'BTN', bb: 20, answer: 'fold', why: 'A6o is below BTN range \u2014 need A7o+ at 20 BB.' },
    { hand: 'K\u2660 T\u2665', pos: 'BTN', bb: 20, answer: 'fold', why: 'KTo misses BTN range \u2014 need KJo+ at 20 BB.' },
    { hand: 'J\u2660 8\u2660', pos: 'SB', bb: 20, answer: 'fold', why: 'J8s is below SB range \u2014 need J9s+ at 20 BB.' },
    { hand: '7\u2660 2\u2665', pos: 'BTN', bb: 5, answer: 'push', why: 'At 5 BB, shove any two from BTN \u2014 72o has fold equity.' },
    { hand: '9\u2660 3\u2665', pos: 'SB', bb: 5, answer: 'push', why: 'At 5 BB or less, shove any two from SB \u2014 blinds cost ~30%/orbit.' },
  ];

  let pfOrder = $state(pfScenarios.map((_, i) => i).sort(() => Math.random() - 0.5));
  let pfRow = $derived(pfScenarios[pfOrder[pfIdx % pfOrder.length]]);

  // Persistent scores
  let pfStats = $state(JSON.parse(localStorage.getItem('practiceScores_pushfold') ?? '{"totalCorrect":0,"totalAttempts":0,"bestStreak":0}'));
  let pfStreak = $state(0);
  function savePfStats() { localStorage.setItem('practiceScores_pushfold', JSON.stringify(pfStats)); }

  function pfPick(choice) {
    pfAnswer = choice;
    pfRevealed = true;
    pfTotal++;
    if (choice === pfRow.answer) pfScore++;
    pfStats.totalAttempts++;
    if (choice === pfRow.answer) {
      pfStats.totalCorrect++;
      pfStreak++;
      if (pfStreak > pfStats.bestStreak) pfStats.bestStreak = pfStreak;
    } else {
      pfStreak = 0;
    }
    savePfStats();
  }

  function pfNext() {
    pfIdx++;
    pfAnswer = '';
    pfRevealed = false;
    if (pfIdx % pfOrder.length === 0) {
      pfOrder = pfScenarios.map((_, i) => i).sort(() => Math.random() - 0.5);
    }
  }
</script>

<div class="tournament" bind:this={sectionEl}>
  <h2>Tournament Play</h2>
  <p class="intro">
    Key adjustments for rising blinds, non-linear chip values, and ICM pressure.
  </p>

  <!-- Tabs -->
  <div class="tabs-row">
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
        </button>
      {/each}
    </div>
    <button class="toggle-all-btn" onclick={toggleAll}>
      {allOpen ? 'Close All' : 'Open All'}
    </button>
  </div>

  <!-- ── FUNDAMENTALS ── -->
  {#if activeTab === 'fundamentals'}
    <div role="tabpanel">
    <div class="section-header">
      <h3>How Tournaments Differ from Cash Games</h3>
      <p class="section-note">
        Core differences that drive all tournament adjustments.
      </p>
    </div>
    <div class="concepts-grid">
      {#each tournamentBasics as item}
        <details class="concept-card">
          <summary class="concept-title">{item.title}</summary>
          <p class="concept-body">{item.body}</p>
        </details>
      {/each}
    </div>
    </div>

  <!-- ── STAGE STRATEGY ── -->
  {:else if activeTab === 'stages'}
    <div role="tabpanel">
    <div class="section-header">
      <h3>Strategy by Tournament Stage</h3>
      <p class="section-note">
        Adjust hand selection and aggression as blinds rise and stacks shrink.
      </p>
    </div>
    <div class="stage-cards">
      {#each stageStrategy as stage}
        <details class="stage-card">
          <summary class="stage-header">
            <div class="stage-title-row">
              <span class="stage-name">{stage.stage}</span>
              <span class="stage-badge"
                data-tooltip-title="{stage.stage}" data-tooltip="{stage.overview}">{stage.badge}</span>
            </div>
            <span class="bb-range">{stage.bbRange}</span>
          </summary>
          <div class="stage-body">
            <p class="stage-overview">{stage.overview}</p>
            <ul class="stage-tips">
              {#each stage.tips as tip}
                <li>{tip}</li>
              {/each}
            </ul>
            <div class="key-principle">
              <span class="kp-label">Key Principle</span>
              <span class="kp-text">{stage.keyPrinciple}</span>
            </div>
          </div>
        </details>
      {/each}
    </div>
    </div>

  <!-- ── STAGE RANGES ── -->
  {:else if activeTab === 'stageranges'}
    <div role="tabpanel">
    <div class="section-header">
      <h3>Tournament Opening Ranges</h3>
      <p class="section-note">
        Adjust your stack size and position to see how opening ranges shift throughout a tournament.
      </p>
    </div>

    <div class="sr-controls">
      <div class="sr-bb-section">
        <div class="sr-bb-display">
          <span class="sr-bb-value">{srBB} BB</span>
          <select
            class="sr-stage-select"
            style="border-color:{srStage.color}; color:{srStage.color}"
            value={srNearestBP}
            onchange={e => srBB = Number(e.target.value)}
          >
            {#each bbBreakpoints.slice().reverse() as bp}
              <option value={bp}>{stageInfo[bp].name} ({bp} BB)</option>
            {/each}
          </select>
          <span class="sr-action-label">{srStage.action}</span>
        </div>
        <input
          type="range"
          min="5"
          max="100"
          bind:value={srBB}
          class="sr-slider"
        />
        <div class="sr-ticks">
          {#each bbBreakpoints as bp}
            <button
              class="sr-tick"
              class:active={srNearestBP === bp}
              onclick={() => srBB = bp}
              style="left: {(bp - 5) / 95 * 100}%"
            >
              {bp}
            </button>
          {/each}
        </div>
      </div>

      <div class="sr-position-row">
        {#each positions as pos}
          <button
            class="sr-pos-btn"
            class:active={srPosition === pos}
            onclick={() => srPosition = pos}
          >
            {pos}
          </button>
        {/each}
      </div>
    </div>

    {#if srNearestBP !== srBB}
      <p class="sr-snap-note">Showing ranges for {srNearestBP} BB (nearest reference depth)</p>
    {/if}

    <HandMatrix raiseSet={srRange} scenario={srStage.scenario} />

    <div class="callout" style="margin-top:4px;">
      <span class="callout-icon">♠</span>
      <div>
        <strong>{srStage.name} — {srNearestBP} BB</strong>
        <p class="callout-body">{srStage.insight}</p>
        <ul class="sr-tips">
          {#each srStage.tips as tip}
            <li>{tip}</li>
          {/each}
        </ul>
      </div>
    </div>
    </div>

  <!-- ── ICM & BUBBLE ── -->
  {:else if activeTab === 'icm'}
    <div role="tabpanel">
    <div class="section-header">
      <h3>ICM & Bubble Play</h3>
      <p class="section-note">
        ICM makes chips non-linear in value near the bubble and final table.
      </p>
    </div>
    <div class="concepts-grid">
      {#each icmConcepts as item}
        <details class="concept-card">
          <summary class="concept-title">{item.title}</summary>
          <p class="concept-body">{item.body}</p>
        </details>
      {/each}
    </div>

    <div class="callout" style="margin-top:4px;">
      <span class="callout-icon">♣</span>
      <div>
        <strong>ICM rule of thumb</strong>
        <p class="callout-body">
          Near the bubble, ask: "Is my edge worth risking my tournament life?" If not a clear yes, folding is often correct — even with AQo or TT.
        </p>
      </div>
    </div>
    </div>

  <!-- ── PUSH/FOLD ── -->
  {:else if activeTab === 'pushfold'}
    <div role="tabpanel">
    <div class="section-header">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <h3>Push/Fold Strategy</h3>
        <button class="mode-toggle" onclick={() => pfMode = !pfMode}>
          {pfMode ? 'Reference' : 'Practice'}
        </button>
      </div>
      <p class="section-note">
        At ~15 BB or less, simplify to all-in or fold. Tighten near the bubble.
      </p>
    </div>

    {#if pfMode}
      <div class="pf-game">
        <div class="pf-card">
          <div class="pf-scenario">
            <span class="pf-hand">{pfRow.hand}</span>
            <div class="pf-info">
              <span class="pf-pos">{pfRow.pos}</span>
              <span class="pf-bb">{pfRow.bb} BB</span>
            </div>
          </div>

          {#if !pfRevealed}
            <div class="pf-buttons">
              <button class="pf-btn push" onclick={() => pfPick('push')}>Push</button>
              <button class="pf-btn fold" onclick={() => pfPick('fold')}>Fold</button>
            </div>
          {:else}
            <div class="pf-feedback" class:correct={pfAnswer === pfRow.answer} class:wrong={pfAnswer !== pfRow.answer}>
              <span class="pf-result">{pfAnswer === pfRow.answer ? 'Correct!' : 'Wrong'}</span>
              <span class="pf-correct-answer">Answer: {pfRow.answer.toUpperCase()}</span>
              <p class="pf-why">{pfRow.why}</p>
              <button class="pf-next" onclick={pfNext}>Next</button>
            </div>
          {/if}

          <div class="pf-score">
            {pfScore}/{pfTotal} correct
          </div>
            <div class="pf-alltime">All-time: {pfStats.totalCorrect}/{pfStats.totalAttempts} | Best streak: {pfStats.bestStreak}</div>
        </div>
      </div>
    {:else}
      <div class="concepts-grid">
        {#each pushFoldRanges as item}
          <details class="concept-card">
            <summary class="concept-title">{item.title}</summary>
            <p class="concept-body">{item.body}</p>
          </details>
        {/each}
      </div>

      <div class="callout" style="margin-top:4px;">
        <span class="callout-icon">♣</span>
        <div>
          <strong>Push/fold checklist</strong>
          <ul class="check-list">
            <li>✓ At 15 BB or less, default to push/fold from most positions</li>
            <li>✓ Shove wider from late position (BTN/SB) where fold equity is highest</li>
            <li>✓ Call tighter than you shove — you have no fold equity when calling</li>
            <li>✗ Never open-limp with a short stack — it bleeds chips with no fold equity</li>
            <li>✗ Do not min-raise from SB/BTN at 10 BB — shove or fold</li>
          </ul>
        </div>
      </div>
    {/if}
    </div>
  {/if}
</div>

<style>
  .tournament { display: flex; flex-direction: column; gap: 20px; }

  h2 { font-size: 22px; font-weight: 700; color: var(--c-text-h); margin: 0; }
  h3 { font-size: 17px; font-weight: 600; color: var(--c-text); margin: 0; }

  .intro { color: var(--c-text-2); font-size: 14px; margin: 0; line-height: 1.6; }

  /* Tabs */
  .tabs-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .tabs { display: flex; gap: 6px; flex-wrap: wrap; }
  .toggle-all-btn { padding: 5px 14px; border-radius: 5px; border: 1px solid var(--c-border); background: transparent; color: var(--c-text-4); font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.15s; white-space: nowrap; flex-shrink: 0; }
  .toggle-all-btn:hover { background: var(--c-bg-card); color: var(--c-text); }
  .tab-btn {
    padding: 7px 20px;
    border-radius: 5px;
    border: 1px solid var(--c-border);
    background: var(--c-bg-card);
    color: var(--c-text-3);
    font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all 0.15s;
  }
  .tab-btn:hover  { border-color: var(--c-accent-dark); color: var(--c-text); }
  .tab-btn.active { background: var(--c-accent-dark); border-color: var(--c-accent-dark); color: #fff; }

  .section-header { display: flex; flex-direction: column; gap: 8px; }
  .section-note   { font-size: 13px; color: var(--c-text-3); margin: 0; line-height: 1.5; }

  /* Concepts grid */
  .concepts-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .concept-card {
    background: var(--c-bg-card);
    border: 1px solid var(--c-border);
    border-radius: 8px;
    padding: 14px 16px;
  }
  .concept-title {
    font-size: 14px; font-weight: 700; color: var(--c-accent); margin-bottom: 8px;
    display: flex; align-items: center;
  }
  .concept-body { font-size: 13px; color: var(--c-text-2); line-height: 1.6; margin: 0; }

  /* Stage cards */
  .stage-cards { display: flex; flex-direction: column; gap: 14px; }
  .stage-card {
    background: var(--c-bg-card);
    border: 1px solid var(--c-border);
    border-radius: 8px;
    overflow: hidden;
  }
  .stage-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    background: var(--c-bg-header);
    border-bottom: 1px solid var(--c-border);
    gap: 12px;
    flex-wrap: wrap;
  }
  .stage-title-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .stage-name { font-size: 15px; color: var(--c-text); font-weight: 700; }
  .stage-badge {
    font-size: 11px; font-weight: 700;
    padding: 3px 10px; border-radius: 4px;
    background: #2d6a4f; color: #b7e4c7;
    text-transform: uppercase; letter-spacing: 0.05em;
    white-space: nowrap;
  }
  .bb-range {
    font-size: 13px; font-weight: 600;
    color: var(--c-accent); white-space: nowrap;
  }
  .stage-body { padding: 12px 14px; display: flex; flex-direction: column; gap: 10px; }
  .stage-overview { font-size: 13px; color: var(--c-text); line-height: 1.6; margin: 0; }
  .stage-tips {
    margin: 0; padding-left: 18px;
    display: flex; flex-direction: column; gap: 4px;
  }
  .stage-tips li { font-size: 13px; color: var(--c-text-2); line-height: 1.5; }
  .key-principle {
    display: flex; gap: 10px; align-items: baseline;
    padding: 8px 10px;
    background: var(--c-bg-subtle);
    border-radius: 6px;
    margin-top: 2px;
  }
  .kp-label {
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.07em;
    color: var(--c-accent); min-width: 90px; flex-shrink: 0;
  }
  .kp-text { font-size: 13px; color: var(--c-text-2); line-height: 1.5; }

  /* Callout */
  .callout {
    display: flex;
    gap: 14px;
    padding: 14px 16px;
    background: var(--c-bg-callout);
    border: 1px solid var(--c-border-accent);
    border-radius: 8px;
    align-items: flex-start;
  }
  .callout-icon { font-size: 22px; color: var(--c-accent); line-height: 1.4; flex-shrink: 0; }
  .callout strong { display: block; color: var(--c-text); font-size: 14px; margin-bottom: 6px; }
  .callout-body { font-size: 13px; color: var(--c-text-3); margin: 0; line-height: 1.6; }

  .check-list {
    margin: 0; padding-left: 0; list-style: none;
    display: flex; flex-direction: column; gap: 4px;
  }
  .check-list li { font-size: 13px; color: var(--c-text-3); line-height: 1.5; }

  /* Mode toggle */
  .mode-toggle {
    padding: 5px 14px; border-radius: 5px;
    border: 1px solid var(--c-accent-dark); background: transparent;
    color: var(--c-accent); font-size: 12px; font-weight: 600;
    cursor: pointer; transition: all 0.15s; white-space: nowrap;
  }
  .mode-toggle:hover { background: var(--c-accent-dark); color: #fff; }

  /* Push/Fold Trainer */
  .pf-game { display: flex; justify-content: center; }
  .pf-card {
    background: var(--c-bg-card); border: 1px solid var(--c-border);
    border-radius: 10px; padding: 24px 28px;
    display: flex; flex-direction: column; align-items: center; gap: 18px;
    min-width: 320px; max-width: 400px;
  }
  .pf-scenario {
    display: flex; flex-direction: column; align-items: center; gap: 12px;
  }
  .pf-hand {
    font-size: 32px; font-weight: 700; color: var(--c-text);
    letter-spacing: 4px;
  }
  .pf-info { display: flex; gap: 10px; align-items: center; }
  .pf-pos {
    font-size: 13px; font-weight: 700; padding: 3px 12px;
    border-radius: 4px; background: #1d4ed8; color: #bfdbfe;
    text-transform: uppercase; letter-spacing: 0.05em;
  }
  .pf-bb {
    font-size: 13px; font-weight: 700; padding: 3px 12px;
    border-radius: 4px; background: #2d6a4f; color: #b7e4c7;
  }
  .pf-buttons { display: flex; gap: 12px; }
  .pf-btn {
    padding: 10px 32px; border-radius: 6px; border: none;
    font-size: 15px; font-weight: 700; cursor: pointer;
    transition: all 0.15s; text-transform: uppercase; letter-spacing: 0.05em;
  }
  .pf-btn.push { background: #2d6a4f; color: #b7e4c7; }
  .pf-btn.push:hover { background: #40916c; }
  .pf-btn.fold { background: #7f1d1d; color: #fca5a5; }
  .pf-btn.fold:hover { background: #991b1b; }
  .pf-feedback {
    display: flex; flex-direction: column; align-items: center; gap: 6px;
    padding: 12px 16px; border-radius: 8px; width: 100%;
  }
  .pf-feedback.correct { background: rgba(45,106,79,0.15); }
  .pf-feedback.wrong { background: rgba(239,68,68,0.12); }
  .pf-result { font-size: 16px; font-weight: 700; }
  .pf-feedback.correct .pf-result { color: #52b788; }
  .pf-feedback.wrong .pf-result { color: #ef4444; }
  .pf-correct-answer { font-size: 13px; font-weight: 600; color: var(--c-text-3); }
  .pf-why { font-size: 13px; color: var(--c-text-2); line-height: 1.5; margin: 4px 0 0; text-align: center; }
  .pf-next {
    margin-top: 6px; padding: 6px 20px; border-radius: 5px;
    border: 1px solid var(--c-border); background: var(--c-bg-card);
    color: var(--c-text); font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.15s;
  }
  .pf-next:hover { border-color: var(--c-accent-dark); color: var(--c-accent); }
  .pf-score { font-size: 13px; color: var(--c-text-4); font-weight: 600; }
  .pf-alltime { font-size: 11px; color: var(--c-text-4); font-weight: 600; text-align: center; }

  /* ── Stage Ranges ── */
  .sr-controls {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .sr-bb-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .sr-bb-display {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
  .sr-bb-value {
    font-size: 22px;
    font-weight: 700;
    color: var(--c-text-h);
    min-width: 70px;
  }
  .sr-stage-select {
    font-size: 13px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 5px;
    background: var(--c-bg-card);
    border: 2px solid;
    cursor: pointer;
    transition: all 0.15s;
    appearance: auto;
  }
  .sr-stage-select:hover {
    filter: brightness(1.2);
  }
  .sr-stage-select option {
    background: var(--c-bg-card);
    color: var(--c-text);
    font-weight: 600;
  }
  .sr-action-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--c-text-3);
    padding: 3px 10px;
    border-radius: 4px;
    border: 1px solid var(--c-border);
    white-space: nowrap;
  }

  .sr-slider {
    width: 100%;
    height: 6px;
    -webkit-appearance: none;
    appearance: none;
    background: var(--c-bg-subtle);
    border-radius: 3px;
    outline: none;
    cursor: pointer;
  }
  .sr-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--c-accent, #60a5fa);
    border: 2px solid var(--c-bg);
    box-shadow: 0 1px 4px rgba(0,0,0,0.3);
    cursor: pointer;
    transition: transform 0.1s;
  }
  .sr-slider::-webkit-slider-thumb:hover {
    transform: scale(1.15);
  }
  .sr-slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--c-accent, #60a5fa);
    border: 2px solid var(--c-bg);
    box-shadow: 0 1px 4px rgba(0,0,0,0.3);
    cursor: pointer;
  }

  .sr-ticks {
    position: relative;
    height: 22px;
  }
  .sr-tick {
    position: absolute;
    transform: translateX(-50%);
    font-size: 11px;
    font-weight: 600;
    color: var(--c-text-4);
    background: none;
    border: none;
    cursor: pointer;
    padding: 2px 6px;
    border-radius: 3px;
    transition: all 0.15s;
  }
  .sr-tick:hover {
    color: var(--c-text);
    background: var(--c-bg-card);
  }
  .sr-tick.active {
    color: var(--c-accent);
    font-weight: 700;
  }

  .sr-position-row {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }
  .sr-pos-btn {
    padding: 7px 18px;
    border-radius: 5px;
    border: 1px solid var(--c-border);
    background: var(--c-bg-card);
    color: var(--c-text-3);
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s;
    letter-spacing: 0.03em;
  }
  .sr-pos-btn:hover {
    border-color: var(--c-accent-dark);
    color: var(--c-text);
  }
  .sr-pos-btn.active {
    background: #1d4ed8;
    border-color: #1d4ed8;
    color: #bfdbfe;
  }

  .sr-snap-note {
    font-size: 12px;
    color: var(--c-text-4);
    margin: 0;
    font-style: italic;
  }

  .sr-tips {
    margin: 6px 0 0;
    padding-left: 18px;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .sr-tips li {
    font-size: 13px;
    color: var(--c-text-3);
    line-height: 1.5;
  }

  /* Collapsible cards */
  summary { cursor: pointer; list-style: none; user-select: none; }
  summary::-webkit-details-marker { display: none; }
  .concept-title::after, .stage-header::after { content: '›'; font-size: 18px; font-weight: 400; color: var(--c-text-4); transition: transform 0.2s; flex-shrink: 0; margin-left: auto; padding-left: 8px; }
  details[open] > summary::after { transform: rotate(90deg); }
  details.concept-card:not([open]) > .concept-title { margin-bottom: 0; }
  details:hover:not([open]) { border-color: var(--c-accent-dark); }
  details.stage-card:not([open]) > .stage-header { border-bottom: none; }
</style>
