<script>
  import {
    sizingPrinciples,
    preflopSizingRows,
    stackDepthNotes,
    postflopSizingRows,
    potOddsTable,
    sprGuide,
  } from './data/betSizing.js';

  let activeTab = $state('overview');

  const tabs = ['overview', 'preflop', 'postflop', 'potodds'];
  const tabLabels = { overview: 'Overview', preflop: 'Preflop', postflop: 'Postflop', potodds: 'Pot Odds' };

  const playerCounts = [4, 5, 6, 7];

  // Group postflop rows by street for the section header display
  const streets = [...new Set(postflopSizingRows.map(r => r.street))];

  function mdfColor(mdf) {
    if (mdf >= 70) return '#52b788';
    if (mdf >= 55) return '#f59e0b';
    return '#ef4444';
  }

  function eqColor(eq) {
    if (eq <= 25) return '#52b788';
    if (eq <= 33) return '#f59e0b';
    return '#ef4444';
  }
</script>

<div class="sizing">
  <h2>Bet Sizing Theory</h2>
  <p class="intro">
    GTO bet sizing balances polarization, range advantage, and pot odds. Correct sizing extracts maximum value while keeping your range unexploitable.
  </p>

  <!-- Tabs -->
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

  <!-- ── OVERVIEW ── -->
  {#if activeTab === 'overview'}
    <div class="section-header">
      <h3>Core Sizing Principles</h3>
      <p class="section-note">Six foundational rules that govern GTO bet sizing on all streets.</p>
    </div>
    <div class="concepts-grid">
      {#each sizingPrinciples as p}
        <div class="concept-card">
          <div class="concept-title">{p.title}</div>
          <p class="concept-body">{p.body}</p>
        </div>
      {/each}
    </div>

  <!-- ── PREFLOP ── -->
  {:else if activeTab === 'preflop'}
    <div class="section-header">
      <h3>Preflop Open & 3-Bet Sizes</h3>
      <p class="section-note">
        Sizes expressed as multiples of the big blind (BB). Adjust by stack depth — see stack depth guide below.
      </p>
    </div>

    <div class="data-table">
      <div class="table-header" style="grid-template-columns: 2fr 1fr 1fr 1fr 1fr;">
        <span>Situation</span>
        <span class="center">4-max</span>
        <span class="center">5-max</span>
        <span class="center">6-max</span>
        <span class="center">7-max</span>
      </div>
      {#each preflopSizingRows as row}
        <div class="table-row" style="grid-template-columns: 2fr 1fr 1fr 1fr 1fr;">
          <span class="row-label">{row.label}</span>
          {#each playerCounts as pc}
            <span class="center size-chip">{row.sizes[pc]}</span>
          {/each}
        </div>
        <div class="table-notes">{row.notes}</div>
      {/each}
    </div>

    <h3 style="margin-top: 8px;">Stack Depth Adjustments</h3>
    <div class="concepts-grid">
      {#each stackDepthNotes as d}
        <div class="concept-card">
          <div class="concept-title">{d.depth}</div>
          <p class="concept-body">{d.adjustments}</p>
        </div>
      {/each}
    </div>

  <!-- ── POSTFLOP ── -->
  {:else if activeTab === 'postflop'}
    <div class="section-header">
      <h3>Postflop Sizing by Street & Situation</h3>
      <p class="section-note">
        Frequency and sizing guidelines for common postflop spots. Freq = how often to bet; Size = bet as % of pot.
      </p>
    </div>

    <div class="data-table">
      <div class="table-header" style="grid-template-columns: 1fr 2fr 1fr 1fr;">
        <span>Street</span>
        <span>Situation</span>
        <span class="center">Freq</span>
        <span class="center">Size</span>
      </div>
      {#each postflopSizingRows as row}
        <div class="table-row" style="grid-template-columns: 1fr 2fr 1fr 1fr;">
          <span class="street-tag">{row.street}</span>
          <span class="row-label">{row.situation}</span>
          <span class="center freq-text">{row.freq}</span>
          <span class="center size-chip">{row.size}</span>
        </div>
        <div class="table-notes">{row.notes}</div>
      {/each}
    </div>

  <!-- ── POT ODDS ── -->
  {:else if activeTab === 'potodds'}
    <div class="section-header">
      <h3><span data-tooltip-title="Pot Odds" data-tooltip="The ratio of the current pot size to the cost of a call. If pot is $100 and call is $25, pot odds are 4:1 (you need 20% equity to break even).">Pot Odds</span> & Minimum Defense Frequency</h3>
      <p class="section-note">
        <strong>Equity needed</strong> = break-even equity to call a bet.&ensp;
        <strong data-tooltip-title="Minimum Defense Frequency" data-tooltip="The % of your range you must continue (call or raise) to prevent your opponent from profiting with any two cards as a bluff. MDF = pot / (pot + bet).">MDF</strong> = minimum % of your range you must defend to prevent villain bluffing with any two cards.
      </p>
    </div>

    <div class="data-table">
      <div class="table-header" style="grid-template-columns: 1.2fr 1fr 1fr;">
        <span>Bet Size (% pot)</span>
        <span class="center">Equity Needed</span>
        <span class="center">MDF</span>
      </div>
      {#each potOddsTable as row}
        <div class="table-row po-row" style="grid-template-columns: 1.2fr 1fr 1fr;">
          <span class="bet-size-label">{row.betPct}% pot</span>
          <span class="center">
            <span class="pct-chip" style="color:{eqColor(row.equityNeeded)}">{row.equityNeeded}%</span>
          </span>
          <span class="center">
            <span class="pct-chip" style="color:{mdfColor(row.mdf)}">{row.mdf}%</span>
          </span>
        </div>
      {/each}
    </div>

    <div class="callout" style="margin-top:16px;">
      <span class="callout-icon">◈</span>
      <div>
        <strong>How to use MDF</strong>
        <p class="callout-body">
          If villain bets 50% pot, you must defend at least 67% of your range (call + raise). Folding more than 33%
          lets villain profitably bluff any two cards. Use pot odds to evaluate individual hand calls;
          use MDF to evaluate your overall range defense.
        </p>
      </div>
    </div>

    <h3 style="margin-top:20px;"><span data-tooltip-title="SPR — Stack-to-Pot Ratio" data-tooltip="Effective stack divided by pot size at the start of a street. Low SPR (&lt;4): marginal hands can stack off. High SPR (&gt;10): need strong hands to commit.">Stack-to-Pot Ratio (SPR)</span> Guide</h3>
    <p class="section-note" style="margin-bottom:12px;">
      SPR = effective stack ÷ pot size at the start of a street. Dictates commitment thresholds.
    </p>
    <div class="spr-grid">
      {#each sprGuide as tier}
        <div class="spr-card">
          <div class="spr-header">
            <span class="spr-range">{tier.range}</span>
            <span class="spr-label">{tier.label}</span>
          </div>
          <p class="spr-strategy">{tier.strategy}</p>
          <div class="spr-hands">Stack off with: <span>{tier.hands}</span></div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .sizing { display: flex; flex-direction: column; gap: 20px; }

  h2 { font-size: 20px; font-weight: 700; color: var(--c-text-h); margin: 0; }
  h3 { font-size: 16px; font-weight: 600; color: var(--c-text); margin: 0; }

  .intro { color: var(--c-text-3); font-size: 13px; margin: 0; line-height: 1.6; }

  /* Tabs */
  .tabs { display: flex; gap: 6px; flex-wrap: wrap; }
  .tab-btn {
    padding: 7px 20px;
    border-radius: 5px;
    border: 1px solid var(--c-border);
    background: var(--c-bg-card);
    color: var(--c-text-3);
    font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.15s;
  }
  .tab-btn:hover  { border-color: var(--c-accent-dark); color: var(--c-text); }
  .tab-btn.active { background: var(--c-accent-dark); border-color: var(--c-accent-dark); color: #fff; }

  .section-header { display: flex; flex-direction: column; gap: 8px; }
  .section-note   { font-size: 12px; color: var(--c-text-4); margin: 0; line-height: 1.5; }

  /* Generic table */
  .data-table {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--c-border);
    border-radius: 8px;
    overflow: hidden;
    font-size: 12px;
  }
  .table-header {
    display: grid;
    gap: 8px;
    padding: 8px 14px;
    background: var(--c-bg-header);
    color: var(--c-text-4);
    font-size: 11px; font-weight: 700;
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
    font-size: 11px;
    line-height: 1.5;
    border-bottom: 1px solid var(--c-border);
  }
  .center { text-align: center; }

  .row-label { color: var(--c-text); font-weight: 500; }

  .size-chip {
    display: inline-block;
    font-size: 11px; font-weight: 700;
    padding: 2px 8px; border-radius: 4px;
    background: var(--c-bg-tag); color: var(--c-accent);
    font-family: 'Courier New', monospace;
    white-space: nowrap;
  }

  .street-tag {
    font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em;
    color: #f59e0b;
  }

  .freq-text { color: var(--c-text-2); font-size: 11px; }

  /* Pot odds */
  .po-row { border-bottom: 1px solid var(--c-bg-subtle); }
  .bet-size-label { color: var(--c-text); font-weight: 600; font-family: 'Courier New', monospace; font-size: 12px; }
  .pct-chip { font-weight: 700; font-size: 13px; }

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
  .callout-icon { font-size: 20px; color: var(--c-accent); line-height: 1.4; flex-shrink: 0; }
  .callout strong { display: block; color: var(--c-text); font-size: 13px; margin-bottom: 6px; }
  .callout-body { font-size: 12px; color: var(--c-text-3); margin: 0; line-height: 1.6; }

  /* SPR cards */
  .spr-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
  }
  .spr-card {
    background: var(--c-bg-card);
    border: 1px solid var(--c-border);
    border-radius: 8px;
    padding: 14px 16px;
  }
  .spr-header {
    display: flex;
    align-items: baseline;
    gap: 10px;
    margin-bottom: 8px;
  }
  .spr-range {
    font-size: 15px; font-weight: 800;
    color: var(--c-accent);
    font-family: 'Courier New', monospace;
  }
  .spr-label {
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.05em;
    color: var(--c-text-4);
  }
  .spr-strategy { font-size: 12px; color: var(--c-text-3); line-height: 1.6; margin: 0 0 8px; }
  .spr-hands {
    font-size: 11px; color: var(--c-text-4);
  }
  .spr-hands span { color: var(--c-text-2); }

  /* Concepts grid */
  .concepts-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  .concept-card {
    background: var(--c-bg-card);
    border: 1px solid var(--c-border);
    border-radius: 8px;
    padding: 14px 16px;
  }
  .concept-title {
    font-size: 13px; font-weight: 700;
    color: var(--c-accent); margin-bottom: 8px;
  }
  .concept-body { font-size: 12px; color: var(--c-text-3); line-height: 1.6; margin: 0; }
</style>
