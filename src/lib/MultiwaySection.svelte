<script>
  import {
    preflopAdjustments,
    flopCbetMultiway,
    turnRiverGuide,
    multiwayPrinciples,
  } from './data/multiway.js';

  let activeTab = $state('preflop');

  const tabs = ['preflop', 'flop', 'turnriver', 'concepts'];
  const tabLabels = { preflop: 'Preflop', flop: 'Flop', turnriver: 'Turn / River', concepts: 'Concepts' };

  function freqColor(pct) {
    if (pct >= 25) return '#52b788';
    if (pct >= 15) return '#f59e0b';
    return '#ef4444';
  }
</script>

<div class="multiway">
  <h2>Multiway Pots</h2>
  <p class="intro">
    When three or more players see a flop, GTO strategy adjusts significantly. Bluffing becomes unprofitable,
    nut advantage matters more, and hand selection tightens preflop.
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

  <!-- ── PREFLOP ── -->
  {#if activeTab === 'preflop'}
    <div class="section-header">
      <h3>Preflop Adjustments: HU vs 3-Way vs 4-Way</h3>
      <p class="section-note">
        Multiway pots require tighter hand selection and adjusted ranges. The more players, the stronger your hand needs to be for commitment.
      </p>
    </div>

    <div class="data-table">
      <div class="table-header" style="grid-template-columns: 1.5fr 1fr 1fr 1fr;">
        <span>Aspect</span>
        <span class="center">Heads-Up</span>
        <span class="center">3-Way</span>
        <span class="center">4-Way</span>
      </div>
      {#each preflopAdjustments as row}
        <div class="table-row" style="grid-template-columns: 1.5fr 1fr 1fr 1fr;">
          <span class="aspect-label">{row.aspect}</span>
          <span class="adj-cell neutral">{row.hu}</span>
          <span class="adj-cell caution">{row.threeWay}</span>
          <span class="adj-cell tight">{row.fourWay}</span>
        </div>
        <div class="table-notes">{row.note}</div>
      {/each}
    </div>

    <div class="callout" style="margin-top:4px;">
      <span class="callout-icon">♣</span>
      <div>
        <strong>Key preflop insight</strong>
        <p class="callout-body">
          Multiway pots primarily change <em>hand selection</em>, not postflop tactics. Play tighter preflop
          and you will be in better shape postflop. Speculative hands (small pairs, suited connectors) gain
          implied odds multiway but need to make very strong hands to win.
        </p>
      </div>
    </div>

  <!-- ── FLOP ── -->
  {:else if activeTab === 'flop'}
    <div class="section-header">
      <h3>Multiway <span data-tooltip-title="C-Bet — Continuation Bet" data-tooltip="Betting the flop (or turn/river) after being the preflop aggressor. In multiway pots, c-bet frequency drops sharply — only bet with strong hands or nut advantage.">C-Bet</span> Frequencies by Board Texture</h3>
      <p class="section-note">
        C-bet frequencies drop sharply multiway. The more players in the pot, the stronger your hand needs to be to bet.
        <strong>3-way</strong> = 3 players postflop; <strong>4-way</strong> = 4+ players.
      </p>
    </div>

    <div class="data-table">
      <div class="table-header" style="grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;">
        <span>Board Texture</span>
        <span class="center">3-Way Freq</span>
        <span class="center">4-Way Freq</span>
        <span class="center">Size</span>
        <span>C-Bet With</span>
      </div>
      {#each flopCbetMultiway as row}
        <div class="table-row" style="grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;">
          <span class="texture-name">{row.texture}</span>
          <span class="center">
            <span class="freq-pill" style="color:{freqColor(row.freq3way)}">{row.freq3way}%</span>
          </span>
          <span class="center">
            <span class="freq-pill" style="color:{freqColor(row.freq4way)}">{row.freq4way}%</span>
          </span>
          <span class="center size-text">{row.size}</span>
          <span class="hands-text">{row.hands}</span>
        </div>
        <div class="table-notes">{row.notes}</div>
      {/each}
    </div>

    <div class="callout" style="margin-top:4px;">
      <span class="callout-icon">♣</span>
      <div>
        <strong>Multiway flop checklist</strong>
        <ul class="check-list">
          <li>✓ C-bet with <span data-tooltip-title="Nut Advantage" data-tooltip="Having a disproportionately larger share of the strongest possible hands (nuts) on a given board compared to your opponent's range. Allows credible large and overbet sizings.">nut advantage</span> hands only (top set, top two pair, nut flush draw)</li>
          <li>✓ Check entire range on boards where callers have range advantage</li>
          <li>✓ Size small (33%) when betting — inflating pot with marginal holdings is -EV</li>
          <li>✗ Never bluff-bet without blockers or draw equity vs multiple opponents</li>
          <li>✗ Avoid c-betting second pair or weak top pair into 3+ players</li>
        </ul>
      </div>
    </div>

  <!-- ── TURN / RIVER ── -->
  {:else if activeTab === 'turnriver'}
    <div class="section-header">
      <h3>Turn & River Decisions in Multiway Pots</h3>
      <p class="section-note">
        By the turn, most multiway pots reduce to two players. Adjust strategy based on how many players remain and the street.
      </p>
    </div>
    <div class="guide-cards">
      {#each turnRiverGuide as item}
        <div class="guide-card">
          <div class="guide-header">
            <span class="situation">{item.situation}</span>
            <span class="action-badge">{item.action}</span>
          </div>
          <div class="guide-body">
            <div class="guide-row">
              <span class="guide-label">Hands</span>
              <span class="guide-val">{item.hands}</span>
            </div>
            <div class="guide-row">
              <span class="guide-label">Frequency</span>
              <span class="guide-val">{item.frequency}</span>
            </div>
            {#if item.sizing !== '—'}
              <div class="guide-row">
                <span class="guide-label">Sizing</span>
                <span class="guide-val highlight">{item.sizing}</span>
              </div>
            {/if}
            <div class="guide-notes">{item.notes}</div>
          </div>
        </div>
      {/each}
    </div>

  <!-- ── CONCEPTS ── -->
  {:else if activeTab === 'concepts'}
    <div class="section-header">
      <h3>Core Multiway Principles</h3>
      <p class="section-note">Foundational concepts that drive GTO play in pots with three or more players.</p>
    </div>
    <div class="concepts-grid">
      {#each multiwayPrinciples as p}
        <div class="concept-card">
          <div class="concept-title">{p.title}</div>
          <p class="concept-body">{p.body}</p>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .multiway { display: flex; flex-direction: column; gap: 20px; }

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

  /* Data table */
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

  /* Preflop adjustment cells */
  .aspect-label { color: var(--c-text); font-weight: 500; }
  .adj-cell { font-size: 11px; line-height: 1.4; text-align: center; }
  .adj-cell.neutral { color: var(--c-text-2); }
  .adj-cell.caution { color: #f59e0b; }
  .adj-cell.tight   { color: #ef4444; }

  /* Flop table */
  .texture-name { color: var(--c-text); font-weight: 600; }
  .freq-pill    { font-weight: 700; font-size: 12px; }
  .size-text    { color: var(--c-text-2); font-size: 11px; text-align: center; }
  .hands-text   { color: var(--c-text-3); font-size: 11px; }

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

  .check-list {
    margin: 0; padding-left: 0; list-style: none;
    display: flex; flex-direction: column; gap: 4px;
  }
  .check-list li { font-size: 12px; color: var(--c-text-3); line-height: 1.5; }

  /* Guide cards (Turn/River) */
  .guide-cards { display: flex; flex-direction: column; gap: 12px; }
  .guide-card {
    background: var(--c-bg-card);
    border: 1px solid var(--c-border);
    border-radius: 8px;
    overflow: hidden;
  }
  .guide-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    background: var(--c-bg-header);
    border-bottom: 1px solid var(--c-border);
    gap: 12px;
    flex-wrap: wrap;
  }
  .situation { font-size: 13px; color: var(--c-text); font-weight: 600; }
  .action-badge {
    font-size: 11px; font-weight: 700;
    padding: 3px 10px; border-radius: 4px;
    background: #2d6a4f; color: #b7e4c7;
    text-transform: uppercase; letter-spacing: 0.05em;
    white-space: nowrap;
  }
  .guide-body { padding: 12px 14px; display: flex; flex-direction: column; gap: 6px; }
  .guide-row  { display: flex; gap: 10px; align-items: baseline; }
  .guide-label {
    font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.07em;
    color: var(--c-text-4); min-width: 72px;
  }
  .guide-val { font-size: 12px; color: var(--c-text-2); }
  .guide-val.highlight { color: var(--c-accent); font-weight: 700; }
  .guide-notes { font-size: 12px; color: var(--c-text-4); line-height: 1.6; margin-top: 4px; }

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
