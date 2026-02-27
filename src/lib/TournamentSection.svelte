<script>
  import {
    tournamentBasics,
    stageStrategy,
    icmConcepts,
    pushFoldRanges,
  } from './data/tournament.js';

  let activeTab = $state('fundamentals');
  let sectionEl;
  let allOpen = $state(false);
  function toggleAll() { allOpen = !allOpen; sectionEl?.querySelectorAll('details').forEach(d => d.open = allOpen); }

  const tabs = ['fundamentals', 'stages', 'icm', 'pushfold'];
  const tabLabels = { fundamentals: 'Fundamentals', stages: 'Stage Strategy', icm: 'ICM & Bubble', pushfold: 'Push/Fold' };
</script>

<div class="tournament" bind:this={sectionEl}>
  <h2>Tournament Play</h2>
  <p class="intro">
    Tournament poker differs fundamentally from cash games. Blind levels increase, chip values are non-linear,
    and survival pressure shapes every decision. This section covers the key concepts for adjusting your GTO strategy
    to tournament play.
  </p>

  <!-- Tabs -->
  <div class="tabs-row">
    <div class="tabs">
      {#each tabs as tab}
        <button
          class="tab-btn"
          class:active={activeTab === tab}
          onclick={() => activeTab = tab}
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
    <div class="section-header">
      <h3>How Tournaments Differ from Cash Games</h3>
      <p class="section-note">
        These core differences drive every strategic adjustment in tournament play. Understanding them is essential before diving into stage-specific strategy.
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

  <!-- ── STAGE STRATEGY ── -->
  {:else if activeTab === 'stages'}
    <div class="section-header">
      <h3>Strategy by Tournament Stage</h3>
      <p class="section-note">
        Your strategy must evolve as blinds increase and stacks get shallower. Each stage demands different adjustments to hand selection, aggression, and risk tolerance.
      </p>
    </div>
    <div class="stage-cards">
      {#each stageStrategy as stage}
        <details class="stage-card">
          <summary class="stage-header">
            <div class="stage-title-row">
              <span class="stage-name">{stage.stage}</span>
              <span class="stage-badge">{stage.badge}</span>
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

  <!-- ── ICM & BUBBLE ── -->
  {:else if activeTab === 'icm'}
    <div class="section-header">
      <h3>ICM & Bubble Play</h3>
      <p class="section-note">
        The Independent Chip Model is what makes tournament strategy fundamentally different from cash game strategy.
        Understanding ICM is critical for making correct decisions near the bubble and at final tables.
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
          If you would call a shove in a cash game but you are near the money bubble, ask yourself:
          "Is my edge large enough to justify risking my tournament life?" If the answer is not a clear yes,
          folding is often correct — even with hands as strong as AQo or TT.
        </p>
      </div>
    </div>

  <!-- ── PUSH/FOLD ── -->
  {:else if activeTab === 'pushfold'}
    <div class="section-header">
      <h3>Push/Fold Strategy</h3>
      <p class="section-note">
        When stacks get short (~15 BB and below), standard raise-and-play poker breaks down.
        Your decisions simplify to all-in or fold. These ranges assume no ICM pressure — tighten near the bubble.
      </p>
    </div>
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

  /* Collapsible cards */
  summary { cursor: pointer; list-style: none; user-select: none; }
  summary::-webkit-details-marker { display: none; }
  .concept-title::after, .stage-header::after { content: '›'; font-size: 18px; font-weight: 400; color: var(--c-text-4); transition: transform 0.2s; flex-shrink: 0; margin-left: auto; padding-left: 8px; }
  details[open] > summary::after { transform: rotate(90deg); }
  details.concept-card:not([open]) > .concept-title { margin-bottom: 0; }
  details:hover:not([open]) { border-color: var(--c-accent-dark); }
  details.stage-card:not([open]) > .stage-header { border-bottom: none; }
</style>
