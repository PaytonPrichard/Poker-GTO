<script>
  import {
    rangeNarrowing,
    boardTextureReading,
    sizingTells,
    streetByStreet,
  } from './data/handReading.js';

  let activeTab = $state('narrowing');
  let sectionEl;
  let allOpen = $state(false);
  function toggleAll() { allOpen = !allOpen; sectionEl?.querySelectorAll('details').forEach(d => d.open = allOpen); }

  const tabs = ['narrowing', 'boards', 'sizing', 'examples'];
  const tabLabels = { narrowing: 'Range Narrowing', boards: 'Board Texture', sizing: 'Sizing Tells', examples: 'Street-by-Street' };

  function rangeColor(fav) {
    if (fav === 'PFR') return '#1d4ed8';
    if (fav === 'Caller') return '#f59e0b';
    return 'var(--c-text-3)';
  }
</script>

<div class="handreading" bind:this={sectionEl}>
  <h2>Hand Reading</h2>
  <p class="intro">
    Hand reading is the skill of narrowing your opponent's range of possible holdings based on their actions,
    position, bet sizing, and board texture. It's the foundation of all poker decision-making.
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

  <!-- ── RANGE NARROWING ── -->
  {#if activeTab === 'narrowing'}
    <div role="tabpanel">
    <div class="section-header">
      <h3>Narrowing Opponent Ranges</h3>
      <p class="section-note">
        Every action your opponent takes reveals information. By combining preflop actions, position,
        and postflop decisions, you can narrow their range from 1,326 combos down to a handful.
      </p>
    </div>
    <div class="concepts-grid">
      {#each rangeNarrowing as item}
        <details class="concept-card">
          <summary class="concept-title">{item.title}</summary>
          <p class="concept-body">{item.body}</p>
        </details>
      {/each}
    </div>
    </div>

  <!-- ── BOARD TEXTURE ── -->
  {:else if activeTab === 'boards'}
    <div role="tabpanel">
    <div class="section-header">
      <h3>Board Texture & Range Interaction</h3>
      <p class="section-note">
        Different board textures favor different ranges. Understanding who has the range advantage on each
        board type is key to reading hands and choosing the right strategy.
      </p>
    </div>
    <div class="data-table">
      <div class="table-header" style="grid-template-columns: 1.5fr 1fr 2.5fr;">
        <span>Board Texture</span>
        <span class="center">Favors</span>
        <span>Key Points</span>
      </div>
      {#each boardTextureReading as row}
        <div class="table-row" style="grid-template-columns: 1.5fr 1fr 2.5fr;">
          <div>
            <span class="texture-name">{row.texture}</span>
            <div class="texture-desc">{row.description}</div>
          </div>
          <span class="center">
            <span class="range-badge" style="color:{rangeColor(row.favoredRange)}">{row.favoredRange}</span>
          </span>
          <span class="key-points">{row.keyPoints}</span>
        </div>
      {/each}
    </div>
    </div>

  <!-- ── SIZING TELLS ── -->
  {:else if activeTab === 'sizing'}
    <div role="tabpanel">
    <div class="section-header">
      <h3>What Bet Sizes Reveal</h3>
      <p class="section-note">
        Bet sizing is one of the most reliable sources of information in poker. Different sizes correlate
        with different hand strengths and intentions — learn to decode them.
      </p>
    </div>
    <div class="concepts-grid">
      {#each sizingTells as item}
        <details class="concept-card">
          <summary class="concept-title">{item.title}</summary>
          <p class="concept-body">{item.body}</p>
        </details>
      {/each}
    </div>
    </div>

  <!-- ── STREET-BY-STREET ── -->
  {:else if activeTab === 'examples'}
    <div role="tabpanel">
    <div class="section-header">
      <h3>Street-by-Street Range Narrowing</h3>
      <p class="section-note">
        Follow these hand examples to see how an opponent's range narrows on each street.
        By the river, you should have a clear picture of their likely holdings.
      </p>
    </div>
    <div class="example-cards">
      {#each streetByStreet as hand}
        <details class="example-card">
          <summary class="example-title">{hand.title}</summary>
          <div class="streets">
            <div class="street">
              <span class="street-label">Preflop</span>
              <span class="street-text">{hand.preflop}</span>
            </div>
            <div class="street">
              <span class="street-label">Flop</span>
              <span class="street-text">{hand.flop}</span>
            </div>
            <div class="street">
              <span class="street-label">Turn</span>
              <span class="street-text">{hand.turn}</span>
            </div>
            <div class="street">
              <span class="street-label">River</span>
              <span class="street-text">{hand.river}</span>
            </div>
            <div class="lesson-row">
              <span class="street-label lesson">Lesson</span>
              <span class="street-text lesson-text">{hand.lesson}</span>
            </div>
          </div>
        </details>
      {/each}
    </div>
    </div>
  {/if}
</div>

<style>
  .handreading { display: flex; flex-direction: column; gap: 20px; }

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

  /* Concepts grid */
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
  .texture-name { color: var(--c-text); font-weight: 600; font-size: 13px; }
  .texture-desc { color: var(--c-text-4); font-size: 12px; margin-top: 2px; }
  .range-badge  { font-weight: 700; font-size: 13px; }
  .key-points   { color: var(--c-text-2); font-size: 12px; line-height: 1.5; }

  /* Street-by-street examples */
  .example-cards { display: flex; flex-direction: column; gap: 14px; }
  .example-card {
    background: var(--c-bg-card); border: 1px solid var(--c-border);
    border-radius: 8px; overflow: hidden;
  }
  .example-title {
    padding: 10px 14px; background: var(--c-bg-header);
    border-bottom: 1px solid var(--c-border);
    font-size: 14px; font-weight: 700; color: var(--c-text);
  }
  .streets { padding: 12px 14px; display: flex; flex-direction: column; gap: 8px; }
  .street { display: flex; gap: 10px; align-items: baseline; }
  .street-label {
    font-size: 11px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.07em; color: var(--c-text-4);
    min-width: 60px; flex-shrink: 0;
  }
  .street-text { font-size: 13px; color: var(--c-text); line-height: 1.5; }
  .lesson-row {
    display: flex; gap: 10px; align-items: baseline;
    padding-top: 8px; border-top: 1px solid var(--c-border-soft); margin-top: 4px;
  }
  .street-label.lesson { color: var(--c-accent); }
  .lesson-text { color: var(--c-accent); font-weight: 500; }

  summary { cursor: pointer; list-style: none; user-select: none; }
  summary::-webkit-details-marker { display: none; }
  .concept-title::after, .example-title::after { content: '›'; font-size: 18px; font-weight: 400; color: var(--c-text-4); transition: transform 0.2s; flex-shrink: 0; margin-left: auto; padding-left: 8px; }
  details[open] > summary::after { transform: rotate(90deg); }
  details.concept-card:not([open]) > .concept-title { margin-bottom: 0; }
  details:hover:not([open]) { border-color: var(--c-accent-dark); }
  details.example-card:not([open]) > .example-title { border-bottom: none; }
</style>
