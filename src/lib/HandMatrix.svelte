<script>
  import { ranks, getHandName } from './data/hands.js';

  // scenario controls the legend labels:
  //   'rfi'     → Raise / Fold
  //   'vs-open' → 3-Bet / Call / Fold
  //   'vs-3bet' → 4-Bet / Call / Fold
  let {
    raiseSet = new Set(),
    callSet = new Set(),
    scenario = 'rfi',
    selectedHand = null,
    onCellClick = null,
  } = $props();

  const labels = {
    'rfi':     { raise: 'Raise', call: 'Call',  fold: 'Fold' },
    'vs-open': { raise: '3-Bet', call: 'Call',  fold: 'Fold' },
    'vs-3bet': { raise: '4-Bet', call: 'Call',  fold: 'Fold' },
  };

  let hoveredHand = $state(null);

  function getAction(row, col) {
    const hand = getHandName(row, col);
    if (raiseSet.has(hand)) return 'raise';
    if (callSet.has(hand))  return 'call';
    return 'fold';
  }

  function countCombos(set) {
    let total = 0;
    for (const hand of set) {
      if (!hand.endsWith('s') && !hand.endsWith('o')) total += 6;
      else if (hand.endsWith('s')) total += 4;
      else total += 12;
    }
    return total;
  }

  const TOTAL_COMBOS = 1326;
  let raisePct = $derived(Math.round((countCombos(raiseSet) / TOTAL_COMBOS) * 100));
  let callPct  = $derived(Math.round((countCombos(callSet)  / TOTAL_COMBOS) * 100));
  let hasCall  = $derived(callSet.size > 0);
  let lbl      = $derived(labels[scenario] ?? labels['rfi']);
</script>

<div class="matrix-wrap">
  <div class="matrix-container">
    <div class="axis-suited">Suited ↗</div>
    <div class="axis-offsuit">↙ Offsuit</div>
    <div class="axis-pairs">Pairs ↘</div>
    <div class="matrix">
      <div class="corner"></div>
      {#each ranks as rank}
        <div class="hdr">{rank}</div>
      {/each}

      {#each ranks as _rowRank, row}
        <div class="hdr">{ranks[row]}</div>
        {#each ranks as _colRank, col}
          {@const hand   = getHandName(row, col)}
          {@const action = getAction(row, col)}
          <!-- svelte-ignore a11y_mouse_events_have_key_events -->
          <div
            class="cell {action}"
            class:selected={hand === selectedHand}
            onmouseenter={() => hoveredHand = hand}
            onmouseleave={() => hoveredHand = null}
            onclick={() => onCellClick?.(hand)}
            onkeydown={e => (e.key === 'Enter' || e.key === ' ') && onCellClick?.(hand)}
            role="gridcell"
            aria-label={hand}
            tabindex={onCellClick ? 0 : -1}
          >
            <span class="label">{hand}</span>
          </div>
        {/each}
      {/each}
    </div>
  </div>

  <div class="matrix-footer">
    <div class="legend">
      <span class="dot raise"></span>{lbl.raise}
      {#if hasCall}
        <span class="dot call"></span>{lbl.call}
      {/if}
      <span class="dot fold"></span>Fold
    </div>
    <div class="stats">
      {#if hasCall}
        <span class="pct-tag raise">{lbl.raise} {raisePct}%</span>
        <span class="pct-tag call">{lbl.call} {callPct}%</span>
      {:else}
        Range: <strong>{raisePct}%</strong> of combos
      {/if}
      {#if hoveredHand}
        {@const haction = raiseSet.has(hoveredHand) ? 'raise' : callSet.has(hoveredHand) ? 'call' : 'fold'}
        &nbsp;·&nbsp; <strong>{hoveredHand}</strong>&nbsp;
        <span class="action-tag {haction}">
          {haction === 'raise' ? lbl.raise : haction === 'call' ? lbl.call : lbl.fold}
        </span>
      {/if}
    </div>
  </div>
</div>

<style>
  .matrix-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .matrix-container {
    position: relative;
    width: 100%;
    max-width: 560px;
  }

  .matrix {
    display: grid;
    grid-template-columns: 24px repeat(13, 1fr);
    gap: 2px;
    width: 100%;
  }

  .corner, .hdr {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
    color: var(--c-text-3);
    height: 24px;
  }

  /* ── Axis labels ── */
  .axis-suited {
    position: absolute;
    top: -20px;
    right: 0;
    font-size: 11px;
    font-weight: 600;
    color: var(--c-text-4);
    letter-spacing: 0.04em;
  }
  .axis-offsuit {
    position: absolute;
    bottom: -20px;
    left: 0;
    font-size: 11px;
    font-weight: 600;
    color: var(--c-text-4);
    letter-spacing: 0.04em;
  }
  .axis-pairs {
    position: absolute;
    top: -20px;
    left: 28px;
    font-size: 11px;
    font-weight: 600;
    color: var(--c-text-4);
    letter-spacing: 0.04em;
  }

  .cell {
    position: relative;
    aspect-ratio: 1;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
    transition: filter 0.1s, transform 0.1s;
  }

  .cell:hover {
    filter: brightness(1.3);
    transform: scale(1.12);
    z-index: 10;
  }

  .cell.raise { background: #2d6a4f; }
  .cell.call  { background: #92660a; }
  .cell.fold  { background: var(--c-bg-subtle); }

  .cell.selected {
    outline: 2px solid #60a5fa;
    outline-offset: -1px;
    z-index: 5;
  }

  .label {
    font-size: 11px;
    font-weight: 700;
    color: rgba(255,255,255,0.85);
    pointer-events: none;
    white-space: nowrap;
    letter-spacing: 0.02em;
  }
  .cell.fold .label { color: rgba(255,255,255,0.28); }

  .matrix-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    color: var(--c-text-3);
    width: 100%;
    max-width: 560px;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 8px;
  }

  .legend {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 2px;
    margin-right: 3px;
    vertical-align: middle;
  }
  .dot.raise { background: #2d6a4f; }
  .dot.call  { background: #92660a; }
  .dot.fold  { background: var(--c-bg-subtle); border: 1px solid #3a4459; }

  .stats {
    color: var(--c-text);
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }

  .pct-tag {
    font-size: 11px;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 3px;
  }
  .pct-tag.raise { background: #1a3d2e; color: #52b788; }
  .pct-tag.call  { background: #3d2a00; color: #ffc947; }

  .action-tag {
    font-size: 11px;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 3px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .action-tag.raise { background: #2d6a4f; color: #b7e4c7; }
  .action-tag.fold  { background: var(--c-bg-subtle); color: var(--c-text-3); border: 1px solid #3a4459; }
  .action-tag.call  { background: #92660a; color: #ffe08a; }
</style>
