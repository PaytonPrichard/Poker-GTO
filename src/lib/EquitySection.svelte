<script>
  import { matchups, matchupCategories, outsChart, rule24, vsRangeTable, rangeTiers } from './data/equity.js';
  import { equityLookup, commonHands } from './data/equityLookup.js';
  import RangeVisualizer from './RangeVisualizer.svelte';

  let activeTab = $state('matchups');
  let activeCategory = $state('All');

  const tabs = ['matchups', 'outs', 'vsrange', 'calculator'];
  const tabLabels = { matchups: 'Matchups', outs: 'Outs & Draws', vsrange: 'vs Range', calculator: 'Calculator' };

  // ── Equity Calculator ───────────────────────────────────────────────────────
  let calcHand1 = $state('AA');
  let calcHand2 = $state('KK');

  let calcResult = $derived.by(() => {
    if (calcHand1 === calcHand2) return null;
    const key = [calcHand1, calcHand2].sort().join('-');
    const entry = equityLookup.get(key);
    if (!entry) return null;
    // Determine which hand maps to hand1 in the key
    const sorted = [calcHand1, calcHand2].sort();
    const h1eq = entry.hand1;
    const h2eq = entry.hand2;
    // If calcHand1 is the first sorted hand, its equity is hand1
    if (calcHand1 === sorted[0]) {
      return { eq1: h1eq, eq2: h2eq };
    } else {
      return { eq1: h2eq, eq2: h1eq };
    }
  });

  let filteredMatchups = $derived(
    activeCategory === 'All'
      ? matchups
      : matchups.filter(m => m.category === activeCategory)
  );

  function equityBarColor(eq) {
    if (eq >= 75) return '#52b788';
    if (eq >= 55) return '#f59e0b';
    if (eq >= 45) return '#f59e0b';
    return '#ef4444';
  }

  function vsColor(pct) {
    if (pct >= 70) return '#52b788';
    if (pct >= 55) return '#f59e0b';
    return '#ef4444';
  }
</script>

<div class="equity">
  <h2>Hand Equity</h2>
  <p class="intro">
    Understand how hands perform against each other, how to count outs, and how <span data-tooltip-title="Equity" data-tooltip="Your share of the pot if the hand was played to showdown many times. A 60% equity hand wins 60% of the pot on average. Equity is distinct from EV — position and playability affect realized equity.">equity</span> shifts vs different villain ranges.
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
      </button>
    {/each}
  </div>

  <!-- ── MATCHUPS ── -->
  {#if activeTab === 'matchups'}
    <div role="tabpanel">
      <div class="section-header">
        <h3>Key Hand Matchups</h3>
        <p class="section-note">All-in equity at preflop — approximate values. Filter by matchup type.</p>
      </div>

      <!-- Category filter pills -->
      <div class="cat-filters">
        {#each matchupCategories as cat}
          <button
            class="cat-btn"
            class:active={activeCategory === cat}
            onclick={() => activeCategory = cat}
          >{cat}</button>
        {/each}
      </div>

      <div class="data-table">
        <div class="table-header" style="grid-template-columns: 1fr 1fr 2.5fr 1fr;">
          <span>Hero</span>
          <span>Villain</span>
          <span>Equity</span>
          <span class="center">Hero %</span>
        </div>
        {#each filteredMatchups as row}
          <div class="table-row mu-row" style="grid-template-columns: 1fr 1fr 2.5fr 1fr;">
            <span class="hand-chip hero">{row.hero}</span>
            <span class="hand-chip villain">{row.villain}</span>
            <span class="eq-bar-wrap">
              <span
                class="eq-bar"
                style="width:{row.equity}%; background:{equityBarColor(row.equity)}"
              ></span>
            </span>
            <span class="center eq-pct" style="color:{equityBarColor(row.equity)}">{row.equity}%</span>
          </div>
          <div class="table-notes mu-note">{row.notes}</div>
        {/each}
      </div>
    </div>

  <!-- ── OUTS & DRAWS ── -->
  {:else if activeTab === 'outs'}
    <div role="tabpanel">
      <div class="section-header">
        <h3>Outs & Draw Equity</h3>
      </div>

      <!-- Rule of 2 & 4 callout -->
      <div class="callout">
        <span class="callout-icon">♦</span>
        <div>
          <strong data-tooltip-title="Rule of 2 & 4" data-tooltip="Multiply outs × 4 with 2 cards to come, × 2 with 1 card to come. Quick mental estimate of draw equity.">Rule of 2 & 4</strong>
          <p class="callout-body">{rule24.description}</p>
          <div class="r24-examples">
            {#each rule24.examples as ex}
              <div class="r24-row">
                <span class="r24-label">{ex.label} ({ex.outs} outs)</span>
                <span class="r24-val">Flop: {ex.flop}% estimate / {ex.actual_flop}% actual</span>
                <span class="r24-val">Turn: {ex.turn}% estimate / {ex.actual_turn}% actual</span>
              </div>
            {/each}
          </div>
          <ul class="caveat-list">
            {#each rule24.caveats as c}
              <li>{c}</li>
            {/each}
          </ul>
        </div>
      </div>

      <div class="data-table">
        <div class="table-header" style="grid-template-columns: 2.5fr 0.6fr 0.8fr 0.8fr 0.8fr;">
          <span>Draw Type</span>
          <span class="center" data-tooltip-title="Outs" data-tooltip="Cards remaining in the deck that will complete your drawing hand and likely give you the best hand.">Outs</span>
          <span class="center">Turn %</span>
          <span class="center">River %</span>
          <span class="center">Combined</span>
        </div>
        {#each outsChart as row}
          <div class="table-row" style="grid-template-columns: 2.5fr 0.6fr 0.8fr 0.8fr 0.8fr;">
            <span class="draw-name">{row.draw}</span>
            <span class="center outs-chip">{row.outs}</span>
            <span class="center eq-num">{row.turn}%</span>
            <span class="center eq-num">{row.river}%</span>
            <span class="center eq-num combined">{row.twoCards}%</span>
          </div>
          <div class="table-notes">{row.notes}</div>
        {/each}
      </div>
    </div>

  <!-- ── VS RANGE ── -->
  {:else if activeTab === 'vsrange'}
    <div role="tabpanel">
      <div class="section-header">
        <h3>Hand Equity vs Villain Range</h3>
        <p class="section-note">
          Approximate preflop all-in equity vs different villain range widths (top X% of hands).
          Ranges: top 5% ≈ QQ+/AKs; top 10% ≈ TT+/AQs+; top 20% ≈ 77+/AJs+; top 50% ≈ wide opening range.
        </p>
      </div>

      <h3>Range Tier Visualizer</h3>
      <p class="section-note">Which hands fall in each range width? Hover a cell to see the hand name.</p>
      <RangeVisualizer tierMap={rangeTiers} />

      <div class="data-table">
        <div class="table-header" style="grid-template-columns: 1fr 1fr 1fr 1fr 1fr 2fr;">
          <span>Hand</span>
          <span class="center">vs Top 5%</span>
          <span class="center">vs Top 10%</span>
          <span class="center">vs Top 20%</span>
          <span class="center">vs Top 50%</span>
          <span>Notes</span>
        </div>
        {#each vsRangeTable as row}
          <div class="table-row" style="grid-template-columns: 1fr 1fr 1fr 1fr 1fr 2fr;">
            <span class="hand-chip hero">{row.hand}</span>
            <span class="center"><span class="eq-cell" style="color:{vsColor(row.top5)}">{row.top5}%</span></span>
            <span class="center"><span class="eq-cell" style="color:{vsColor(row.top10)}">{row.top10}%</span></span>
            <span class="center"><span class="eq-cell" style="color:{vsColor(row.top20)}">{row.top20}%</span></span>
            <span class="center"><span class="eq-cell" style="color:{vsColor(row.top50)}">{row.top50}%</span></span>
            <span class="vsr-notes">{row.notes}</span>
          </div>
        {/each}
      </div>

      <div class="callout" style="margin-top:8px;">
        <span class="callout-icon">♦</span>
        <div>
          <strong>Range equity concepts</strong>
          <ul class="concept-list">
            <li>Equity vs a range is an average — your hand may dominate some combos and lose to others.</li>
            <li>Suited hands gain ~3–4% equity vs broad ranges thanks to flush draw equity.</li>
            <li>Dominated hands (AQ vs AK) perform poorly vs tight ranges but improve significantly vs loose ones.</li>
            <li>Always consider which part of villain's range calls vs folds — your realized equity depends on the calling range, not the full range.</li>
          </ul>
        </div>
      </div>
    </div>

  <!-- ── CALCULATOR ── -->
  {:else if activeTab === 'calculator'}
    <div role="tabpanel">
      <div class="section-header">
        <h3>Equity Calculator</h3>
        <p class="section-note">Select two hands to see their preflop all-in equity. Covers ~80 common matchups.</p>
      </div>

      <div class="calc-wrap">
        <div class="calc-hand">
          <label class="calc-label" for="calc-hand1">Hand 1</label>
          <select id="calc-hand1" class="calc-select" bind:value={calcHand1}>
            {#each commonHands as hand}
              <option value={hand}>{hand}</option>
            {/each}
          </select>
        </div>

        <span class="calc-vs">vs</span>

        <div class="calc-hand">
          <label class="calc-label" for="calc-hand2">Hand 2</label>
          <select id="calc-hand2" class="calc-select" bind:value={calcHand2}>
            {#each commonHands as hand}
              <option value={hand}>{hand}</option>
            {/each}
          </select>
        </div>
      </div>

      {#if calcHand1 === calcHand2}
        <div class="calc-message">Select two different hands.</div>
      {:else if calcResult}
        <div class="calc-result">
          <div class="calc-bar-row">
            <span class="calc-hand-label hero-label">{calcHand1}</span>
            <div class="calc-bar-wrap">
              <div class="calc-bar hero-bar" style="width: {calcResult.eq1}%"></div>
              <div class="calc-bar villain-bar" style="width: {calcResult.eq2}%"></div>
            </div>
            <span class="calc-hand-label villain-label">{calcHand2}</span>
          </div>
          <div class="calc-pcts">
            <span class="calc-pct hero-pct">{calcResult.eq1}%</span>
            <span class="calc-pct villain-pct">{calcResult.eq2}%</span>
          </div>
          <div class="calc-verdict">
            {#if calcResult.eq1 > calcResult.eq2}
              <strong>{calcHand1}</strong> is favored ({calcResult.eq1}% equity)
            {:else if calcResult.eq2 > calcResult.eq1}
              <strong>{calcHand2}</strong> is favored ({calcResult.eq2}% equity)
            {:else}
              Coin flip — 50/50
            {/if}
          </div>
        </div>
      {:else}
        <div class="calc-message">Matchup not available. Try a different combination.</div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .equity { display: flex; flex-direction: column; gap: 20px; }

  h2 { font-size: 22px; font-weight: 700; color: var(--c-text-h); margin: 0; }
  h3 { font-size: 17px; font-weight: 600; color: var(--c-text); margin: 0; }

  .intro { color: var(--c-text-3); font-size: 14px; margin: 0; line-height: 1.6; }

  /* Tabs */
  .tabs { display: flex; gap: 6px; flex-wrap: wrap; }
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
  .section-note   { font-size: 13px; color: var(--c-text-4); margin: 0; line-height: 1.5; }

  /* Category filters */
  .cat-filters { display: flex; gap: 6px; flex-wrap: wrap; }
  .cat-btn {
    padding: 5px 12px;
    border-radius: 20px;
    border: 1px solid var(--c-border);
    background: var(--c-bg-card);
    color: var(--c-text-4);
    font-size: 12px; font-weight: 600;
    cursor: pointer; transition: all 0.15s;
  }
  .cat-btn:hover  { color: var(--c-text); border-color: #3a4459; }
  .cat-btn.active { background: var(--c-bg-nav-active); border-color: var(--c-accent-dark); color: var(--c-accent); }

  /* Generic data table */
  .data-table {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--c-border);
    border-radius: 8px;
    overflow: hidden;
    font-size: 13px;
  }
  .table-header {
    display: grid;
    gap: 8px;
    padding: 8px 14px;
    background: var(--c-bg-header);
    color: var(--c-text-4);
    font-size: 12px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em;
    border-bottom: 1px solid var(--c-border);
  }
  .table-row {
    display: grid;
    gap: 8px;
    padding: 10px 14px 4px;
    background: var(--c-bg-card);
    align-items: center;
    border-bottom: 1px solid var(--c-border-soft);
  }
  .table-notes {
    padding: 4px 14px 10px;
    background: var(--c-bg-card);
    color: var(--c-text-4);
    font-size: 12px;
    line-height: 1.5;
    border-bottom: 1px solid var(--c-border);
  }
  .center { text-align: center; }

  /* Hand chips */
  .hand-chip {
    display: inline-block;
    font-size: 13px; font-weight: 800;
    padding: 2px 8px; border-radius: 4px;
    font-family: 'Courier New', monospace;
    white-space: nowrap;
  }
  .hand-chip.hero    { background: #1d4ed822; color: #93c5fd; border: 1px solid #1d4ed8; }
  .hand-chip.villain { background: #92400e22; color: #fcd34d; border: 1px solid #92400e; }

  /* Equity bar */
  .mu-row { align-items: center; }
  .eq-bar-wrap {
    height: 10px;
    background: var(--c-bg-header);
    border-radius: 5px;
    overflow: hidden;
    align-self: center;
  }
  .eq-bar {
    display: block;
    height: 100%;
    border-radius: 5px;
    transition: width 0.3s ease;
  }
  .eq-pct { font-weight: 700; font-size: 14px; }

  .mu-note { font-size: 12px; }

  /* Outs table */
  .draw-name { color: var(--c-text); font-weight: 500; }
  .outs-chip {
    display: inline-block;
    font-size: 13px; font-weight: 800;
    color: var(--c-accent);
    font-family: 'Courier New', monospace;
  }
  .eq-num   { color: var(--c-text-2); }
  .combined { color: #f59e0b; font-weight: 700; }

  /* vs Range */
  .eq-cell { font-weight: 700; font-size: 13px; }
  .vsr-notes { font-size: 12px; color: var(--c-text-4); line-height: 1.5; }

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
  .callout-body { font-size: 13px; color: var(--c-text-3); margin: 0 0 10px; line-height: 1.6; }

  /* Rule of 2&4 examples */
  .r24-examples { display: flex; flex-direction: column; gap: 4px; margin-bottom: 10px; }
  .r24-row {
    display: flex; gap: 16px; flex-wrap: wrap;
    font-size: 12px;
  }
  .r24-label { color: var(--c-text); font-weight: 600; min-width: 160px; }
  .r24-val   { color: var(--c-text-3); }

  .caveat-list {
    margin: 0; padding-left: 16px;
    display: flex; flex-direction: column; gap: 3px;
  }
  .caveat-list li { font-size: 12px; color: var(--c-text-4); line-height: 1.5; }

  .concept-list {
    margin: 0; padding-left: 16px;
    display: flex; flex-direction: column; gap: 4px;
  }
  .concept-list li { font-size: 13px; color: var(--c-text-3); line-height: 1.55; }

  /* Calculator */
  .calc-wrap {
    display: flex;
    align-items: flex-end;
    gap: 16px;
    flex-wrap: wrap;
  }
  .calc-hand { display: flex; flex-direction: column; gap: 4px; }
  .calc-label { font-size: 12px; font-weight: 700; color: var(--c-text-4); text-transform: uppercase; letter-spacing: 0.05em; }
  .calc-select {
    padding: 8px 14px;
    border-radius: 6px;
    border: 1px solid var(--c-border);
    background: var(--c-bg-card);
    color: var(--c-text);
    font-size: 16px;
    font-weight: 800;
    font-family: 'Courier New', monospace;
    cursor: pointer;
    min-width: 100px;
  }
  .calc-select:focus { border-color: var(--c-accent); outline: none; }
  .calc-vs { font-size: 16px; font-weight: 700; color: var(--c-text-4); padding-bottom: 8px; }

  .calc-result {
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .calc-bar-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .calc-hand-label {
    font-size: 14px;
    font-weight: 800;
    font-family: 'Courier New', monospace;
    min-width: 40px;
    text-align: center;
  }
  .hero-label { color: #93c5fd; }
  .villain-label { color: #fcd34d; }

  .calc-bar-wrap {
    flex: 1;
    height: 28px;
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    background: var(--c-bg-header);
  }
  .calc-bar { height: 100%; transition: width 0.3s ease; }
  .hero-bar { background: #1d4ed8; }
  .villain-bar { background: #92400e; }

  .calc-pcts {
    display: flex;
    justify-content: space-between;
    padding: 0 50px;
  }
  .calc-pct { font-size: 18px; font-weight: 900; font-family: 'Courier New', monospace; }
  .hero-pct { color: #93c5fd; }
  .villain-pct { color: #fcd34d; }

  .calc-verdict {
    font-size: 14px;
    color: var(--c-text-2);
    text-align: center;
    padding: 8px 14px;
    background: var(--c-bg-callout);
    border: 1px solid var(--c-border-accent);
    border-radius: 6px;
  }
  .calc-verdict strong { color: var(--c-text); }

  .calc-message {
    font-size: 14px;
    color: var(--c-text-4);
    padding: 20px;
    text-align: center;
    background: var(--c-bg-card);
    border: 1px solid var(--c-border);
    border-radius: 8px;
    max-width: 400px;
  }
</style>
