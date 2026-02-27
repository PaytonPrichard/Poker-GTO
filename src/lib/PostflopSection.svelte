<script>
  import { cbetData, turnGuide, riverGuide, principles } from './data/postflop.js';

  let activeStreet = $state('flop');
  let sectionEl;
  let allOpen = $state(false);
  function toggleAll() { allOpen = !allOpen; sectionEl?.querySelectorAll('details').forEach(d => d.open = allOpen); }
  let flopSearch = $state('');

  let filteredFlops = $derived(
    flopSearch.trim() === ''
      ? cbetData
      : cbetData.filter(row => {
          const q = flopSearch.toLowerCase();
          return row.texture.toLowerCase().includes(q)
            || row.example.toLowerCase().includes(q)
            || row.rangeAdv.toLowerCase().includes(q)
            || row.notes.toLowerCase().includes(q);
        })
  );

  function freqColor(pct) {
    if (pct >= 65) return '#52b788'; // green  — bet frequently
    if (pct >= 40) return '#f59e0b'; // amber  — balanced
    return '#ef4444';                 // red    — check mostly
  }

  function freqLabel(pct) {
    if (pct >= 65) return 'High';
    if (pct >= 40) return 'Medium';
    return 'Low';
  }
</script>

<div class="postflop" bind:this={sectionEl}>
  <h2>Postflop Play</h2>
  <p class="intro">
    GTO postflop strategy depends on board texture, position, and range advantage.
    Use this as a quick reference for c-bet frequencies, turn/river decisions, and core concepts.
  </p>

  <!-- Street tabs -->
  <div class="tabs-row">
    <div class="street-tabs">
      {#each ['flop', 'turn', 'river', 'concepts'] as street}
        <button
          class="street-btn"
          class:active={activeStreet === street}
          onclick={() => activeStreet = street}
        >
          {street.charAt(0).toUpperCase() + street.slice(1)}
        </button>
      {/each}
    </div>
    <button class="toggle-all-btn" onclick={toggleAll}>
      {allOpen ? 'Close All' : 'Open All'}
    </button>
  </div>

  <!-- ── FLOP ── -->
  {#if activeStreet === 'flop'}
    <div class="section-header">
      <h3>Flop
        <span data-tooltip-title="C-Bet — Continuation Bet" data-tooltip="Betting the flop after being the preflop aggressor. GTO c-bet frequency varies heavily by board texture.">C-Bet</span>
        Frequencies by
        <span data-tooltip-title="Board Texture" data-tooltip="The character of the community cards: dry (unconnected, rainbow), wet (connected, suited), paired, monotone, etc. Drives bet frequency and sizing decisions.">Board Texture</span>
      </h3>
      <p class="section-note">
        Frequencies shown are for the preflop raiser (PFR) as the aggressor.
        <span class="badge ip" data-tooltip-title="IP — In Position" data-tooltip="Acting after your opponent on all postflop streets. IP players see villain's action before deciding, allowing better equity realization.">IP</span> = in position (acts last postflop).
        <span class="badge oop" data-tooltip-title="OOP — Out of Position" data-tooltip="Acting before your opponent on postflop streets. Must act with less information — GTO OOP play involves checking more and using larger bet sizes.">OOP</span> = out of position.
      </p>
    </div>

    <div class="search-bar">
      <input
        type="text"
        class="flop-search"
        placeholder="Search flops — texture, board, range advantage, notes…"
        bind:value={flopSearch}
      />
      {#if flopSearch.trim()}
        <span class="result-count">{filteredFlops.length} of {cbetData.length} textures</span>
      {/if}
    </div>

    <div class="cbet-table">
      <div class="cbet-header">
        <span>Texture</span>
        <span>Example</span>
        <span class="center" data-tooltip-title="Range Advantage" data-tooltip="When your overall range has higher equity on this board than your opponent's. The player with range advantage c-bets more frequently.">Range Adv</span>
        <span class="center">IP Freq</span>
        <span class="center">IP Size</span>
        <span class="center">OOP Freq</span>
        <span class="center">OOP Size</span>
      </div>
      {#each filteredFlops as row}
        <div class="cbet-row">
          <span class="texture-name">{row.texture}</span>
          <span class="board-example">{row.example}</span>
          <span class="center">
            <span class="range-tag">{row.rangeAdv}</span>
          </span>
          <span class="center">
            <span class="freq-pill" style="color: {freqColor(row.ipFreq)}">
              {row.ipFreq}% <span class="freq-label">{freqLabel(row.ipFreq)}</span>
            </span>
          </span>
          <span class="center size-text">{row.ipSize}</span>
          <span class="center">
            <span class="freq-pill" style="color: {freqColor(row.oopFreq)}">
              {row.oopFreq}% <span class="freq-label">{freqLabel(row.oopFreq)}</span>
            </span>
          </span>
          <span class="center size-text">{row.oopSize}</span>
        </div>
        <div class="cbet-notes">{row.notes}</div>
      {/each}
    </div>

    <div class="callout">
      <span class="callout-icon">♠</span>
      <div>
        <strong>Understanding these frequencies</strong>
        <p class="callout-sub">
          The percentages above are <em>range-wide</em> frequencies — they describe how often
          you should bet with your <strong>entire range</strong> on that board texture, not a
          single hand. For example, "IP Freq 80%" on an ace-high dry board means you c-bet 80%
          of the hands you could hold there (most Ax, overpairs, gutshots) and check the other 20%.
        </p>
        <p class="callout-sub" style="margin-top: 6px;">
          Individual hands also have mixed frequencies. Strong hands (top pair+) bet close to 100%.
          Marginal hands (weak middle pair, backdoor draws) might bet 30% and check 70%. Pure air
          with no equity checks and gives up. The board texture determines which hands fall into each
          category — on dry boards, more hands can profitably bet; on wet boards, fewer can.
        </p>
        <p class="callout-sub" style="margin-top: 6px;">
          <strong>Preflop vs postflop:</strong> Preflop ranges are usually simplified to pure
          strategies (always raise or always fold). Postflop is where mixed frequencies become
          critical — the same hand might bet on one board texture and check on another, or bet
          the flop but check the turn depending on the runout.
        </p>
      </div>
    </div>

  <!-- ── TURN ── -->
  {:else if activeStreet === 'turn'}
    <div class="section-header">
      <h3>Turn Decisions</h3>
      <p class="section-note">After a flop c-bet is called, how you proceed on the turn is crucial.</p>
    </div>
    <div class="guide-cards">
      {#each turnGuide as item}
        <details class="guide-card">
          <summary class="guide-header">
            <span class="situation">{item.situation}</span>
            <span class="action-badge">{item.action}</span>
          </summary>
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
        </details>
      {/each}
    </div>

  <!-- ── RIVER ── -->
  {:else if activeStreet === 'river'}
    <div class="section-header">
      <h3>River Decisions</h3>
      <p class="section-note">The river is polarization time. Size big with value and balance with bluffs at the right frequency.</p>
    </div>

    <div class="callout">
      <span class="callout-icon">♠</span>
      <div>
        <strong>Bluff:Value ratio by bet size</strong>
        <ul class="ratio-list">
          <li>½ pot bet → bluff <strong>33%</strong> of betting range (2:1 value:bluff)</li>
          <li>Pot-size bet → bluff <strong>50%</strong> of betting range (1:1 value:bluff)</li>
          <li>2x pot overbet → bluff <strong>67%</strong> of betting range (1:2 value:bluff)</li>
        </ul>
      </div>
    </div>

    <div class="guide-cards">
      {#each riverGuide as item}
        <details class="guide-card">
          <summary class="guide-header">
            <span class="situation">{item.situation}</span>
            <span class="action-badge">{item.action}</span>
          </summary>
          <div class="guide-body">
            <div class="guide-row">
              <span class="guide-label">Hands</span>
              <span class="guide-val">{item.hands}</span>
            </div>
            <div class="guide-row">
              <span class="guide-label">Frequency</span>
              <span class="guide-val">{item.frequency}</span>
            </div>
            {#if item.sizing}
              <div class="guide-row">
                <span class="guide-label">Sizing</span>
                <span class="guide-val highlight">{item.sizing}</span>
              </div>
            {/if}
            <div class="guide-notes">{item.notes}</div>
          </div>
        </details>
      {/each}
    </div>

  <!-- ── CONCEPTS ── -->
  {:else if activeStreet === 'concepts'}
    <div class="section-header">
      <h3>Core Postflop Principles</h3>
      <p class="section-note">Foundational GTO concepts that underpin all postflop decisions.</p>
    </div>
    <div class="concepts-grid">
      {#each principles as p}
        <details class="concept-card">
          <summary class="concept-title">{p.title}</summary>
          <p class="concept-body">{p.body}</p>
        </details>
      {/each}
    </div>
  {/if}
</div>

<style>
  .postflop { display: flex; flex-direction: column; gap: 20px; }

  h2 { font-size: 22px; font-weight: 700; color: var(--c-text-h); margin: 0; }
  h3 { font-size: 17px; font-weight: 600; color: var(--c-text); margin: 0; }

  .intro {
    color: var(--c-text-2); font-size: 14px; margin: 0; line-height: 1.6;
  }

  .tabs-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .toggle-all-btn { padding: 5px 14px; border-radius: 5px; border: 1px solid var(--c-border); background: transparent; color: var(--c-text-4); font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.15s; white-space: nowrap; flex-shrink: 0; }
  .toggle-all-btn:hover { background: var(--c-bg-card); color: var(--c-text); }
  .street-tabs {
    display: flex; gap: 6px; flex-wrap: wrap;
  }
  .street-btn {
    padding: 7px 20px;
    border-radius: 5px;
    border: 1px solid var(--c-border);
    background: var(--c-bg-card);
    color: var(--c-text-3);
    font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all 0.15s;
  }
  .street-btn:hover  { border-color: var(--c-accent-dark); color: var(--c-text); }
  .street-btn.active { background: var(--c-accent-dark); border-color: var(--c-accent-dark); color: #fff; }

  .section-header { display: flex; flex-direction: column; gap: 8px; }
  .section-note   { font-size: 13px; color: var(--c-text-3); margin: 0; line-height: 1.5; }

  .badge {
    display: inline-block;
    font-size: 11px; font-weight: 700;
    padding: 1px 5px; border-radius: 3px;
    vertical-align: middle;
  }
  .badge.ip  { background: #1d4ed8; color: #bfdbfe; }
  .badge.oop { background: #92400e; color: #fde68a; }

  /* ── Search bar ── */
  .search-bar {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .flop-search {
    flex: 1;
    padding: 9px 14px;
    border-radius: 6px;
    border: 1px solid var(--c-border);
    background: var(--c-bg-card);
    color: var(--c-text);
    font-size: 14px;
    font-family: inherit;
    outline: none;
    transition: border-color 0.15s;
  }
  .flop-search::placeholder { color: var(--c-text-4); }
  .flop-search:focus { border-color: var(--c-accent); }
  .result-count {
    font-size: 13px;
    color: var(--c-text-4);
    white-space: nowrap;
  }

  /* ── C-bet table ── */
  .cbet-table {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--c-border);
    border-radius: 8px;
    overflow: hidden;
    font-size: 13px;
  }
  .cbet-header {
    display: grid;
    grid-template-columns: 2fr 1.2fr 1fr 1fr 1fr 1fr 1fr;
    gap: 8px;
    padding: 8px 14px;
    background: var(--c-bg-header);
    color: var(--c-text-4);
    font-size: 12px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em;
    border-bottom: 1px solid var(--c-border);
  }
  .cbet-row {
    display: grid;
    grid-template-columns: 2fr 1.2fr 1fr 1fr 1fr 1fr 1fr;
    gap: 8px;
    padding: 10px 14px 4px;
    background: var(--c-bg-card);
    align-items: center;
    border-bottom: 1px solid var(--c-border-soft);
  }
  .cbet-notes {
    padding: 4px 14px 10px;
    background: var(--c-bg-card);
    color: var(--c-text-4);
    font-size: 12px;
    line-height: 1.5;
    border-bottom: 1px solid var(--c-border);
  }

  .texture-name { color: var(--c-text); font-weight: 600; }
  .board-example {
    font-family: 'Courier New', monospace;
    color: var(--c-text-2);
    font-size: 12px;
  }
  .center { text-align: center; }

  .range-tag {
    font-size: 11px; font-weight: 700;
    padding: 2px 6px; border-radius: 3px;
    background: var(--c-bg-subtle); color: var(--c-text-3);
  }

  .freq-pill { font-weight: 700; font-size: 13px; }
  .freq-label {
    font-size: 10px; font-weight: 600;
    text-transform: uppercase;
    opacity: 0.7;
    margin-left: 2px;
  }

  .size-text { color: var(--c-text-2); font-size: 12px; }

  /* ── Guide cards ── */
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
  .situation { font-size: 14px; color: var(--c-text); font-weight: 600; }
  .action-badge {
    font-size: 12px; font-weight: 700;
    padding: 3px 10px; border-radius: 4px;
    background: #2d6a4f; color: #b7e4c7;
    text-transform: uppercase; letter-spacing: 0.05em;
    white-space: nowrap;
  }
  .guide-body { padding: 12px 14px; display: flex; flex-direction: column; gap: 6px; }
  .guide-row  { display: flex; gap: 10px; align-items: baseline; }
  .guide-label {
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.07em;
    color: var(--c-text-4); min-width: 72px;
  }
  .guide-val { font-size: 13px; color: var(--c-text-2); }
  .guide-val.highlight { color: var(--c-accent); font-weight: 700; }
  .guide-notes { font-size: 13px; color: var(--c-text-2); line-height: 1.6; margin-top: 4px; }

  /* ── Callout ── */
  .callout {
    display: flex;
    gap: 14px;
    padding: 14px 16px;
    background: var(--c-bg-callout);
    border: 1px solid var(--c-border-accent);
    border-radius: 8px;
    align-items: flex-start;
  }
  .callout-icon { font-size: 22px; color: var(--c-accent); line-height: 1; }
  .callout strong { display: block; color: var(--c-text); font-size: 14px; margin-bottom: 8px; }
  .callout-sub { font-size: 13px; color: var(--c-text-3); margin: 0; line-height: 1.6; }

  .ratio-list {
    margin: 0; padding-left: 16px;
    display: flex; flex-direction: column; gap: 4px;
  }
  .ratio-list li { font-size: 13px; color: var(--c-text-3); line-height: 1.5; }
  .ratio-list li strong { color: var(--c-accent); }

  /* ── Concepts ── */
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
    font-size: 14px; font-weight: 700;
    color: var(--c-accent); margin-bottom: 8px;
    display: flex; align-items: center;
  }
  .concept-body { font-size: 13px; color: var(--c-text-2); line-height: 1.6; margin: 0; }

  /* Collapsible cards */
  summary { cursor: pointer; list-style: none; user-select: none; }
  summary::-webkit-details-marker { display: none; }
  .concept-title::after, .guide-header::after { content: '›'; font-size: 18px; font-weight: 400; color: var(--c-text-4); transition: transform 0.2s; flex-shrink: 0; margin-left: auto; padding-left: 8px; }
  details[open] > summary::after { transform: rotate(90deg); }
  details.concept-card:not([open]) > .concept-title { margin-bottom: 0; }
  details:hover:not([open]) { border-color: var(--c-accent-dark); }
  details.guide-card:not([open]) > .guide-header { border-bottom: none; }
</style>
