<script>
  import {
    positionBasics,
    evBySeat,
    positionalPlays,
    exploitingPosition,
  } from './data/position.js';

  let activeTab = $state('basics');
  let sectionEl;
  let allOpen = $state(false);
  function toggleAll() { allOpen = !allOpen; sectionEl?.querySelectorAll('details').forEach(d => d.open = allOpen); }

  const tabs = ['basics', 'ev', 'plays', 'exploiting'];
  const tabLabels = { basics: 'Why Position Matters', ev: 'EV by Seat', plays: 'Positional Plays', exploiting: 'Exploiting Position' };

  function evColor(val) {
    if (val.includes('+')) return '#52b788';
    if (val.includes('-')) return '#ef4444';
    return 'var(--c-text-2)';
  }
</script>

<div class="position" bind:this={sectionEl}>
  <h2>Position Strategy</h2>
  <p class="intro">
    Position is the single most important factor in poker profitability. Acting last gives you
    an information advantage that compounds across every street. Understanding and leveraging
    position is what separates winning players from losing ones.
  </p>

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

  <!-- ── BASICS ── -->
  {#if activeTab === 'basics'}
    <div class="section-header">
      <h3>The Power of Position</h3>
      <p class="section-note">
        Position in poker means acting after your opponents. This advantage is so powerful that
        it should influence every decision from preflop hand selection to river bluffs.
      </p>
    </div>
    <div class="concepts-grid">
      {#each positionBasics as item}
        <details class="concept-card">
          <summary class="concept-title">{item.title}</summary>
          <p class="concept-body">{item.body}</p>
        </details>
      {/each}
    </div>

  <!-- ── EV BY SEAT ── -->
  {:else if activeTab === 'ev'}
    <div class="section-header">
      <h3>Expected Value by Position (6-Max)</h3>
      <p class="section-note">
        These approximate win rates show how much each position contributes to (or costs) your overall results.
        The button is the most profitable seat; the blinds lose money even for winning players.
      </p>
    </div>
    <div class="data-table">
      <div class="table-header" style="grid-template-columns: 0.8fr 0.8fr 0.7fr 0.7fr 2fr;">
        <span>Position</span>
        <span class="center">BB/100</span>
        <span class="center">VPIP</span>
        <span class="center">PFR</span>
        <span>Notes</span>
      </div>
      {#each evBySeat as row}
        <div class="table-row" style="grid-template-columns: 0.8fr 0.8fr 0.7fr 0.7fr 2fr;">
          <span class="pos-name">{row.position}</span>
          <span class="center">
            <span class="ev-val" style="color:{evColor(row.bbPer100)}">{row.bbPer100}</span>
          </span>
          <span class="center stat">{row.vpip}</span>
          <span class="center stat">{row.pfr}</span>
          <span class="desc-text">{row.description}</span>
        </div>
      {/each}
    </div>

    <div class="callout" style="margin-top:4px;">
      <span class="callout-icon">♣</span>
      <div>
        <strong>Key takeaway</strong>
        <p class="callout-body">
          The BTN wins ~3-5x more than any other position. If you could only improve one aspect of your game,
          play more hands on the button and fewer from early position and the blinds.
        </p>
      </div>
    </div>

  <!-- ── POSITIONAL PLAYS ── -->
  {:else if activeTab === 'plays'}
    <div class="section-header">
      <h3>Plays That Leverage Position</h3>
      <p class="section-note">
        These are specific tactical plays that are only possible (or much more profitable) when you have position on your opponent.
      </p>
    </div>
    <div class="concepts-grid">
      {#each positionalPlays as item}
        <details class="concept-card">
          <summary class="concept-title">{item.title}</summary>
          <p class="concept-body">{item.body}</p>
        </details>
      {/each}
    </div>

  <!-- ── EXPLOITING POSITION ── -->
  {:else if activeTab === 'exploiting'}
    <div class="section-header">
      <h3>IP vs OOP: How Strategy Changes</h3>
      <p class="section-note">
        The same hand plays very differently in position vs out of position. These comparisons show
        how to adjust your strategy based on where you're sitting.
      </p>
    </div>
    <div class="comparison-cards">
      {#each exploitingPosition as item}
        <details class="comparison-card">
          <summary class="comp-header">{item.situation}</summary>
          <div class="comp-body">
            <div class="comp-col">
              <span class="comp-label ip">In Position</span>
              <p class="comp-text">{item.inPosition}</p>
            </div>
            <div class="comp-col">
              <span class="comp-label oop">Out of Position</span>
              <p class="comp-text">{item.outOfPosition}</p>
            </div>
            {#if item.notes}
              <div class="comp-notes">{item.notes}</div>
            {/if}
          </div>
        </details>
      {/each}
    </div>
  {/if}
</div>

<style>
  .position { display: flex; flex-direction: column; gap: 20px; }

  h2 { font-size: 22px; font-weight: 700; color: var(--c-text-h); margin: 0; }
  h3 { font-size: 17px; font-weight: 600; color: var(--c-text); margin: 0; }

  .intro { color: var(--c-text-2); font-size: 14px; margin: 0; line-height: 1.6; }

  .tabs-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .toggle-all-btn { padding: 5px 14px; border-radius: 5px; border: 1px solid var(--c-border); background: transparent; color: var(--c-text-4); font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.15s; white-space: nowrap; flex-shrink: 0; }
  .toggle-all-btn:hover { background: var(--c-bg-card); color: var(--c-text); }

  .tabs { display: flex; gap: 6px; flex-wrap: wrap; }
  .tab-btn {
    padding: 7px 20px; border-radius: 5px;
    border: 1px solid var(--c-border); background: var(--c-bg-card);
    color: var(--c-text-3); font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all 0.15s;
  }
  .tab-btn:hover  { border-color: var(--c-accent-dark); color: var(--c-text); }
  .tab-btn.active { background: var(--c-accent-dark); border-color: var(--c-accent-dark); color: #fff; }

  .section-header { display: flex; flex-direction: column; gap: 8px; }
  .section-note   { font-size: 13px; color: var(--c-text-3); margin: 0; line-height: 1.5; }

  .concepts-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .concept-card {
    background: var(--c-bg-card); border: 1px solid var(--c-border);
    border-radius: 8px; padding: 14px 16px;
  }
  .concept-title { font-size: 14px; font-weight: 700; color: var(--c-accent); margin-bottom: 8px; display: flex; align-items: center; }
  .concept-body  { font-size: 13px; color: var(--c-text-2); line-height: 1.6; margin: 0; }

  /* Data table */
  .data-table {
    display: flex; flex-direction: column;
    border: 1px solid var(--c-border); border-radius: 8px;
    overflow: hidden; font-size: 13px;
  }
  .table-header {
    display: grid; gap: 8px; padding: 8px 14px;
    background: var(--c-bg-header); color: var(--c-text-4);
    font-size: 12px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em;
    border-bottom: 1px solid var(--c-border);
  }
  .table-row {
    display: grid; gap: 8px; padding: 10px 14px;
    background: var(--c-bg-card); align-items: center;
    border-bottom: 1px solid var(--c-border-soft);
  }
  .center { text-align: center; }
  .pos-name { color: var(--c-text); font-weight: 700; font-size: 14px; }
  .ev-val   { font-weight: 700; font-size: 14px; }
  .stat     { color: var(--c-text-3); font-size: 13px; }
  .desc-text { color: var(--c-text-2); font-size: 12px; line-height: 1.5; }

  /* Callout */
  .callout {
    display: flex; gap: 14px; padding: 14px 16px;
    background: var(--c-bg-callout); border: 1px solid var(--c-border-accent);
    border-radius: 8px; align-items: flex-start;
  }
  .callout-icon { font-size: 22px; color: var(--c-accent); line-height: 1.4; flex-shrink: 0; }
  .callout strong { display: block; color: var(--c-text); font-size: 14px; margin-bottom: 6px; }
  .callout-body { font-size: 13px; color: var(--c-text-3); margin: 0; line-height: 1.6; }

  /* Comparison cards */
  .comparison-cards { display: flex; flex-direction: column; gap: 12px; }
  .comparison-card {
    background: var(--c-bg-card); border: 1px solid var(--c-border);
    border-radius: 8px; overflow: hidden;
  }
  .comp-header {
    padding: 10px 14px; background: var(--c-bg-header);
    border-bottom: 1px solid var(--c-border);
    font-size: 14px; font-weight: 700; color: var(--c-text);
  }
  .comp-body { padding: 12px 14px; display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .comp-col { display: flex; flex-direction: column; gap: 4px; }
  .comp-label {
    font-size: 11px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.07em;
  }
  .comp-label.ip  { color: #1d4ed8; }
  .comp-label.oop { color: #f59e0b; }
  .comp-text { font-size: 13px; color: var(--c-text-2); line-height: 1.5; margin: 0; }
  .comp-notes {
    grid-column: 1 / -1;
    font-size: 12px; color: var(--c-text-4); line-height: 1.5;
    padding-top: 8px; border-top: 1px solid var(--c-border-soft);
  }

  summary { cursor: pointer; list-style: none; user-select: none; }
  summary::-webkit-details-marker { display: none; }
  .concept-title::after, .comp-header::after { content: '›'; font-size: 18px; font-weight: 400; color: var(--c-text-4); transition: transform 0.2s; flex-shrink: 0; margin-left: auto; padding-left: 8px; }
  details[open] > summary::after { transform: rotate(90deg); }
  details.concept-card:not([open]) > .concept-title { margin-bottom: 0; }
  details:hover:not([open]) { border-color: var(--c-accent-dark); }
  details.comparison-card:not([open]) > .comp-header { border-bottom: none; }
</style>
