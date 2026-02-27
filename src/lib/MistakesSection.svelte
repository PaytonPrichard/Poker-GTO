<script>
  import {
    preflopLeaks,
    postflopLeaks,
    mentalGame,
    sizingMistakes,
  } from './data/mistakes.js';

  let activeTab = $state('preflop');
  let sectionEl;
  let allOpen = $state(false);
  function toggleAll() { allOpen = !allOpen; sectionEl?.querySelectorAll('details').forEach(d => d.open = allOpen); }

  const tabs = ['preflop', 'postflop', 'mental', 'sizing'];
  const tabLabels = { preflop: 'Preflop Leaks', postflop: 'Postflop Leaks', mental: 'Mental Game', sizing: 'Sizing Errors' };

  function sevColor(sev) {
    if (sev === 'high') return '#ef4444';
    if (sev === 'medium') return '#f59e0b';
    return '#52b788';
  }
  function sevLabel(sev) {
    if (sev === 'high') return 'HIGH';
    if (sev === 'medium') return 'MED';
    return 'LOW';
  }
</script>

<div class="mistakes" bind:this={sectionEl}>
  <h2>Common Mistakes & Leaks</h2>
  <p class="intro">
    Even solid players have leaks in their game. Identifying and fixing these common mistakes
    is one of the fastest ways to improve your win rate. Be honest with yourself about which ones apply to you.
  </p>

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

  <!-- ── PREFLOP LEAKS ── -->
  {#if activeTab === 'preflop'}
    <div role="tabpanel">
      <div class="section-header">
        <h3>Preflop Mistakes</h3>
        <p class="section-note">
          Preflop mistakes compound across every hand you play. Fixing these leaks gives you
          the biggest bang for your buck because they affect your range construction in every pot.
        </p>
      </div>
      <div class="leak-cards">
        {#each preflopLeaks as leak}
          <details class="leak-card">
            <summary class="leak-header">
              <span class="leak-title">{leak.title}</span>
              <span class="sev-badge" style="color:{sevColor(leak.severity)};border-color:{sevColor(leak.severity)}">
                {sevLabel(leak.severity)}
              </span>
            </summary>
            <div class="leak-body">
              <p class="leak-desc">{leak.description}</p>
              <div class="fix-row">
                <span class="fix-label">Fix</span>
                <span class="fix-text">{leak.fix}</span>
              </div>
            </div>
          </details>
        {/each}
      </div>
    </div>

  <!-- ── POSTFLOP LEAKS ── -->
  {:else if activeTab === 'postflop'}
    <div role="tabpanel">
      <div class="section-header">
        <h3>Postflop Mistakes</h3>
        <p class="section-note">
          Postflop is where the most money is won and lost. These common errors cost you significant
          EV over time and are often harder to spot than preflop leaks.
        </p>
      </div>
      <div class="leak-cards">
        {#each postflopLeaks as leak}
          <details class="leak-card">
            <summary class="leak-header">
              <span class="leak-title">{leak.title}</span>
              <span class="sev-badge" style="color:{sevColor(leak.severity)};border-color:{sevColor(leak.severity)}">
                {sevLabel(leak.severity)}
              </span>
            </summary>
            <div class="leak-body">
              <p class="leak-desc">{leak.description}</p>
              <div class="fix-row">
                <span class="fix-label">Fix</span>
                <span class="fix-text">{leak.fix}</span>
              </div>
            </div>
          </details>
        {/each}
      </div>
    </div>

  <!-- ── MENTAL GAME ── -->
  {:else if activeTab === 'mental'}
    <div role="tabpanel">
      <div class="section-header">
        <h3>Mental Game</h3>
        <p class="section-note">
          Your mental game determines how consistently you can apply your technical knowledge.
          Even the best strategy falls apart when emotions take over.
        </p>
      </div>
      <div class="concepts-grid">
        {#each mentalGame as item}
          <details class="concept-card">
            <summary class="concept-title">{item.title}</summary>
            <p class="concept-body">{item.body}</p>
          </details>
        {/each}
      </div>
    </div>

  <!-- ── SIZING ERRORS ── -->
  {:else if activeTab === 'sizing'}
    <div role="tabpanel">
      <div class="section-header">
        <h3>Sizing Mistakes</h3>
        <p class="section-note">
          Bet sizing is both an art and a science. These common sizing errors either leave money on the table
          or give opponents easy decisions they shouldn't have.
        </p>
      </div>
      <div class="concepts-grid">
        {#each sizingMistakes as item}
          <details class="concept-card">
            <summary class="concept-title">{item.title}</summary>
            <p class="concept-body">{item.body}</p>
          </details>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .mistakes { display: flex; flex-direction: column; gap: 20px; }

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

  /* Leak cards */
  .leak-cards { display: flex; flex-direction: column; gap: 12px; }
  .leak-card {
    background: var(--c-bg-card); border: 1px solid var(--c-border);
    border-radius: 8px; overflow: hidden;
  }
  .leak-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 14px; background: var(--c-bg-header);
    border-bottom: 1px solid var(--c-border); gap: 12px; flex-wrap: wrap;
  }
  .leak-title { font-size: 14px; color: var(--c-text); font-weight: 600; }
  .sev-badge {
    font-size: 11px; font-weight: 700;
    padding: 2px 8px; border-radius: 4px;
    border: 1px solid;
    text-transform: uppercase; letter-spacing: 0.05em;
    white-space: nowrap;
  }
  .leak-body { padding: 12px 14px; display: flex; flex-direction: column; gap: 10px; }
  .leak-desc { font-size: 13px; color: var(--c-text-2); line-height: 1.6; margin: 0; }
  .fix-row {
    display: flex; gap: 10px; align-items: baseline;
    padding: 8px 10px; background: var(--c-bg-subtle); border-radius: 6px;
  }
  .fix-label {
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.07em;
    color: #52b788; min-width: 30px; flex-shrink: 0;
  }
  .fix-text { font-size: 13px; color: var(--c-text-2); line-height: 1.5; }

  /* Concepts grid */
  .concepts-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .concept-card {
    background: var(--c-bg-card); border: 1px solid var(--c-border);
    border-radius: 8px; padding: 14px 16px;
  }
  .concept-title { font-size: 14px; font-weight: 700; color: var(--c-accent); margin-bottom: 8px; display: flex; align-items: center; }
  .concept-body  { font-size: 13px; color: var(--c-text-2); line-height: 1.6; margin: 0; }

  /* Collapsible cards */
  summary { cursor: pointer; list-style: none; user-select: none; }
  summary::-webkit-details-marker { display: none; }
  .concept-title::after, .leak-header::after { content: '›'; font-size: 18px; font-weight: 400; color: var(--c-text-4); transition: transform 0.2s; flex-shrink: 0; margin-left: auto; padding-left: 8px; }
  details[open] > summary::after { transform: rotate(90deg); }
  details.concept-card:not([open]) > .concept-title { margin-bottom: 0; }
  details:hover:not([open]) { border-color: var(--c-accent-dark); }
  details.leak-card:not([open]) > .leak-header { border-bottom: none; }
</style>
