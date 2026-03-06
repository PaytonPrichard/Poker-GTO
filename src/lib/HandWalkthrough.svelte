<script>
  import { handScenarios } from './data/handScenarios.js';

  let activeScenario = $state(null);  // scenario object or null (selection screen)
  let streetIdx = $state(0);
  let selected = $state(null);        // selected option index
  let revealed = $state(false);
  let score = $state(0);
  let totalStreets = $state(0);
  let finished = $state(false);

  let street = $derived(activeScenario ? activeScenario.streets[streetIdx] : null);

  function startScenario(s) {
    activeScenario = s;
    streetIdx = 0;
    selected = null;
    revealed = false;
    score = 0;
    totalStreets = 0;
    finished = false;
  }

  function choose(idx) {
    if (revealed) return;
    selected = idx;
    revealed = true;
    totalStreets++;
    if (street.options[idx].correct) score++;
  }

  function nextStreet() {
    if (streetIdx + 1 >= activeScenario.streets.length) {
      finished = true;
    } else {
      streetIdx++;
      selected = null;
      revealed = false;
    }
  }

  function backToList() {
    activeScenario = null;
    finished = false;
  }

  const diffColors = { easy: '#52b788', medium: '#f59e0b', hard: '#ef4444' };
  const streetLabels = { preflop: 'Preflop', flop: 'Flop', turn: 'Turn', river: 'River' };
</script>

<div class="hw">
  <h2>Hand Walkthrough</h2>

  {#if !activeScenario}
    <!-- Scenario selection -->
    <p class="intro">Play through full poker hands street by street. Make the GTO-correct decision at each point.</p>
    <div class="scenario-grid">
      {#each handScenarios as s}
        <button class="scenario-card" onclick={() => startScenario(s)}>
          <div class="sc-header">
            <span class="sc-title">{s.title}</span>
            <span class="sc-diff" style="color:{diffColors[s.difficulty]}">{s.difficulty}</span>
          </div>
          <p class="sc-setup">{s.setup}</p>
          <span class="sc-streets">{s.streets.length} streets</span>
        </button>
      {/each}
    </div>

  {:else if finished}
    <!-- Results -->
    <div class="hw-results">
      <button class="hw-back" onclick={backToList}>&larr; All Scenarios</button>
      <div class="hw-result-card">
        <h3>{activeScenario.title}</h3>
        <div class="hw-score">{score}<span class="hw-score-denom">/{totalStreets}</span></div>
        <p class="hw-rating">
          {#if score === totalStreets}
            Perfect play
          {:else if score / totalStreets >= 0.75}
            Strong decisions
          {:else if score / totalStreets >= 0.5}
            Room to improve
          {:else}
            Review the concepts
          {/if}
        </p>
        <div class="hw-result-actions">
          <button class="hw-replay" onclick={() => startScenario(activeScenario)}>Replay</button>
          <button class="hw-back-btn" onclick={backToList}>Choose Another</button>
        </div>
      </div>
    </div>

  {:else if street}
    <!-- Street play -->
    <div class="hw-play">
      <button class="hw-back" onclick={backToList}>&larr; All Scenarios</button>

      <div class="hw-info">
        <span class="hw-title">{activeScenario.title}</span>
        <span class="hw-street-progress">
          {streetIdx + 1}/{activeScenario.streets.length} &middot; {score}/{totalStreets} correct
        </span>
      </div>

      <!-- Street progress dots -->
      <div class="street-dots">
        {#each activeScenario.streets as s, i}
          <div
            class="street-dot"
            class:active={i === streetIdx}
            class:past={i < streetIdx}
          >
            {streetLabels[s.street]}
          </div>
          {#if i < activeScenario.streets.length - 1}
            <div class="street-connector" class:past={i < streetIdx}></div>
          {/if}
        {/each}
      </div>

      <div class="hw-card">
        <div class="hw-card-header">
          <span class="hw-street-label">{streetLabels[street.street]}</span>
          <span class="hw-pot">Pot: {street.pot}</span>
        </div>

        {#if street.board}
          <div class="hw-board">
            <span class="hw-board-label">Board:</span>
            <span class="hw-board-cards">{street.board}</span>
          </div>
        {/if}

        <p class="hw-narrative">{street.narrative}</p>

        <div class="hw-options">
          {#each street.options as opt, idx}
            <button
              class="hw-opt"
              class:correct={revealed && opt.correct}
              class:wrong={revealed && idx === selected && !opt.correct}
              class:dimmed={revealed && idx !== selected && !opt.correct}
              onclick={() => choose(idx)}
              disabled={revealed}
            >
              {opt.label}
            </button>
          {/each}
        </div>

        {#if revealed}
          <div class="hw-feedback" class:correct-fb={street.options[selected]?.correct} class:wrong-fb={!street.options[selected]?.correct}>
            <span class="hw-fb-icon">{street.options[selected]?.correct ? '\u2713' : '\u2717'}</span>
            <p>{street.options[selected]?.feedback}</p>
          </div>
          <div class="hw-next-wrap">
            <button class="hw-next" onclick={nextStreet}>
              {streetIdx + 1 >= activeScenario.streets.length ? 'See Results' : 'Next Street \u2192'}
            </button>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .hw { display: flex; flex-direction: column; gap: 20px; max-width: 680px; }
  h2 { font-size: 22px; font-weight: 700; color: var(--c-text-h); margin: 0; }
  .intro { color: var(--c-text-2); font-size: 14px; margin: 0; line-height: 1.6; }

  /* Scenario grid */
  .scenario-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
  }
  .scenario-card {
    display: flex; flex-direction: column; gap: 6px;
    padding: 14px 16px; border-radius: 8px;
    border: 1px solid var(--c-border);
    background: var(--c-bg-card); color: var(--c-text);
    text-align: left; cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
  }
  .scenario-card:hover { border-color: var(--c-accent-dark); background: var(--c-bg-hover); }
  .sc-header { display: flex; justify-content: space-between; align-items: center; }
  .sc-title { font-size: 14px; font-weight: 700; color: var(--c-text-h); }
  .sc-diff { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; }
  .sc-setup { font-size: 12px; color: var(--c-text-3); margin: 0; line-height: 1.5; }
  .sc-streets { font-size: 11px; color: var(--c-text-4); font-weight: 600; }

  /* Back button */
  .hw-back {
    align-self: flex-start;
    padding: 4px 10px; border-radius: 4px;
    border: 1px solid var(--c-border);
    background: transparent; color: var(--c-text-4);
    font-size: 12px; font-weight: 600; cursor: pointer;
    transition: all 0.15s;
  }
  .hw-back:hover { color: var(--c-text); border-color: var(--c-accent-dark); }

  /* Play area */
  .hw-play { display: flex; flex-direction: column; gap: 14px; }
  .hw-info { display: flex; justify-content: space-between; align-items: center; }
  .hw-title { font-size: 15px; font-weight: 700; color: var(--c-text-h); }
  .hw-street-progress { font-size: 12px; font-weight: 600; color: var(--c-text-4); }

  /* Street dots */
  .street-dots { display: flex; align-items: center; gap: 0; }
  .street-dot {
    font-size: 11px; font-weight: 700; color: var(--c-text-4);
    padding: 4px 10px; border-radius: 4px;
    background: var(--c-bg-subtle); border: 1px solid var(--c-border);
    transition: all 0.15s;
  }
  .street-dot.active { background: #2d6a4f; border-color: #52b788; color: #b7e4c7; }
  .street-dot.past { background: var(--c-bg-subtle); color: var(--c-text-3); border-color: #52b788; }
  .street-connector { width: 16px; height: 2px; background: var(--c-border); flex-shrink: 0; }
  .street-connector.past { background: #52b788; }

  /* Hand card */
  .hw-card {
    background: var(--c-bg-card); border: 1px solid var(--c-border);
    border-radius: 10px; padding: 18px 20px;
    display: flex; flex-direction: column; gap: 12px;
  }
  .hw-card-header { display: flex; justify-content: space-between; align-items: center; }
  .hw-street-label {
    font-size: 12px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.06em; padding: 3px 10px; border-radius: 4px;
    background: var(--c-bg-subtle); color: var(--c-accent);
  }
  .hw-pot { font-size: 13px; font-weight: 700; color: var(--c-text-3); }

  .hw-board { display: flex; align-items: center; gap: 8px; }
  .hw-board-label { font-size: 12px; color: var(--c-text-4); font-weight: 600; }
  .hw-board-cards {
    font-size: 16px; font-weight: 800; color: var(--c-text-h);
    font-family: 'Courier New', monospace; letter-spacing: 0.05em;
  }

  .hw-narrative { font-size: 14px; color: var(--c-text-2); margin: 0; line-height: 1.6; }

  .hw-options { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .hw-opt {
    padding: 10px 14px; border-radius: 7px;
    border: 1px solid var(--c-border); background: var(--c-bg-subtle);
    color: var(--c-text); font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all 0.15s; text-align: center;
  }
  .hw-opt:hover:not(:disabled):not(.correct):not(.wrong) {
    border-color: var(--c-accent-dark); background: var(--c-bg-hover);
  }
  .hw-opt:disabled { cursor: default; }
  .hw-opt.correct { background: #1a3d2e; border-color: #52b788; color: #b7e4c7; }
  .hw-opt.wrong { background: #3d1a1a; border-color: #ef4444; color: #fca5a5; }
  .hw-opt.dimmed { opacity: 0.45; }

  .hw-feedback {
    display: flex; gap: 10px; padding: 12px 16px;
    border-radius: 7px; align-items: flex-start;
  }
  .hw-feedback.correct-fb { background: rgba(45,106,79,0.12); border: 1px solid #2d6a4f; }
  .hw-feedback.wrong-fb { background: rgba(127,29,29,0.12); border: 1px solid #7f1d1d; }
  .hw-fb-icon { font-size: 16px; font-weight: 800; flex-shrink: 0; line-height: 1.4; }
  .hw-feedback.correct-fb .hw-fb-icon { color: #52b788; }
  .hw-feedback.wrong-fb .hw-fb-icon { color: #ef4444; }
  .hw-feedback p { font-size: 13px; color: var(--c-text-3); margin: 0; line-height: 1.6; }

  .hw-next-wrap { display: flex; justify-content: flex-end; }
  .hw-next {
    padding: 8px 20px; border-radius: 6px; border: none;
    background: var(--c-accent-dark); color: #fff;
    font-size: 14px; font-weight: 700; cursor: pointer;
    transition: background 0.15s;
  }
  .hw-next:hover { background: var(--c-accent); }

  /* Results */
  .hw-results { display: flex; flex-direction: column; gap: 14px; }
  .hw-result-card {
    background: var(--c-bg-card); border: 1px solid var(--c-border);
    border-radius: 10px; padding: 32px 24px;
    display: flex; flex-direction: column; align-items: center; gap: 12px;
    max-width: 400px;
  }
  .hw-result-card h3 { font-size: 16px; font-weight: 700; color: var(--c-text-h); margin: 0; }
  .hw-score { font-size: 48px; font-weight: 900; color: #52b788; line-height: 1; }
  .hw-score-denom { font-size: 24px; font-weight: 400; color: var(--c-text-4); }
  .hw-rating { font-size: 16px; font-weight: 700; color: var(--c-text-2); margin: 0; }
  .hw-result-actions { display: flex; gap: 10px; margin-top: 8px; }
  .hw-replay {
    padding: 8px 20px; border-radius: 6px; border: none;
    background: var(--c-accent-dark); color: #fff;
    font-size: 14px; font-weight: 700; cursor: pointer;
  }
  .hw-replay:hover { background: var(--c-accent); }
  .hw-back-btn {
    padding: 8px 20px; border-radius: 6px;
    border: 1px solid var(--c-border); background: transparent;
    color: var(--c-text-3); font-size: 14px; font-weight: 600; cursor: pointer;
  }
  .hw-back-btn:hover { color: var(--c-text); border-color: var(--c-accent-dark); }

  @media (max-width: 768px) {
    .scenario-grid { grid-template-columns: 1fr; }
    .hw-options { grid-template-columns: 1fr; }
  }
</style>
