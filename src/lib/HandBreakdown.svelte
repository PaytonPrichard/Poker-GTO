<script>
  import { positionsByCount } from './data/hands.js';
  import { rfiRanges } from './data/ranges.js';

  let { hand, onClose = null } = $props();

  const counts = [4, 5, 6, 7];

  // Flat list of every (playerCount, position) entry with its raise status
  let entries = $derived(
    counts.flatMap(c =>
      positionsByCount[c].map(pos => ({
        count: c,
        pos,
        raised: rfiRanges[c]?.[pos]?.has(hand) ?? false,
      }))
    )
  );

  let totalRaised = $derived(entries.filter(e => e.raised).length);
  let totalSlots  = $derived(entries.length);
  let raisePct    = $derived(Math.round((totalRaised / totalSlots) * 100));

  // Earliest position this hand is raised from (tightest position it appears in)
  const positionRank = { 'UTG': 0, 'UTG+1': 1, 'HJ': 2, 'CO': 3, 'BTN': 4, 'SB': 5 };
  let earliestPos = $derived.by(() => {
    const raised = entries.filter(e => e.raised);
    if (raised.length === 0) return null;
    return raised.reduce((best, e) =>
      (positionRank[e.pos] ?? 99) < (positionRank[best.pos] ?? 99) ? e : best
    ).pos;
  });

  // Combo count for the hand
  function combos(h) {
    if (!h.endsWith('s') && !h.endsWith('o')) return 6;
    if (h.endsWith('s')) return 4;
    return 12;
  }
</script>

<div class="breakdown">
  <div class="bd-header">
    <div class="bd-title">
      <span class="hand-badge">{hand}</span>
      <span class="combo-count">{combos(hand)} combos</span>
    </div>
    <button class="close-btn" onclick={onClose} aria-label="Close">✕</button>
  </div>

  <div class="bd-summary">
    <div class="summary-stat">
      <span class="stat-val">{raisePct}%</span>
      <span class="stat-label">of positions open-raise</span>
    </div>
    <div class="summary-stat">
      <span class="stat-val">{totalRaised}<span class="stat-denom">/{totalSlots}</span></span>
      <span class="stat-label">position slots</span>
    </div>
    {#if earliestPos}
      <div class="summary-stat">
        <span class="stat-val pos-val">{earliestPos}</span>
        <span class="stat-label">earliest open</span>
      </div>
    {:else}
      <div class="summary-stat">
        <span class="stat-val fold-val">Never</span>
        <span class="stat-label">opened</span>
      </div>
    {/if}
  </div>

  <!-- Raise % bar -->
  <div class="pct-bar-wrap">
    <div class="pct-bar">
      <div class="pct-fill" style="width: {raisePct}%"></div>
    </div>
    <span class="pct-bar-label">Raise</span>
    <span class="pct-bar-label fold">{100 - raisePct}% Fold</span>
  </div>

  <!-- Per-player-count grid -->
  <div class="count-rows">
    {#each counts as c}
      {@const positions = positionsByCount[c]}
      {@const raisedInCount = positions.filter(p => rfiRanges[c]?.[p]?.has(hand)).length}
      <div class="count-row">
        <span class="count-label">{c}-handed</span>
        <div class="pos-badges">
          {#each positions as pos}
            {@const raised = rfiRanges[c]?.[pos]?.has(hand) ?? false}
            <div class="pos-badge" class:raised class:fold={!raised} title={raised ? 'Raise' : 'Fold'}>
              {pos}
            </div>
          {/each}
        </div>
        <span class="count-stat">{raisedInCount}/{positions.length}</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .breakdown {
    background: var(--c-bg-header);
    border: 1px solid var(--c-border);
    border-radius: 8px;
    overflow: hidden;
    max-width: 580px;
  }

  .bd-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    background: var(--c-bg-card);
    border-bottom: 1px solid var(--c-border);
  }

  .bd-title {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .hand-badge {
    font-size: 16px;
    font-weight: 800;
    color: var(--c-text-h);
    font-family: 'Courier New', monospace;
  }

  .combo-count {
    font-size: 11px;
    color: var(--c-text-4);
    background: var(--c-bg-subtle);
    padding: 2px 7px;
    border-radius: 10px;
  }

  .close-btn {
    background: none;
    border: none;
    color: var(--c-text-4);
    font-size: 14px;
    cursor: pointer;
    padding: 2px 6px;
    border-radius: 4px;
    line-height: 1;
    transition: color 0.15s, background 0.15s;
  }
  .close-btn:hover { color: var(--c-text); background: var(--c-border); }

  /* ── Summary stats ── */
  .bd-summary {
    display: flex;
    gap: 0;
    border-bottom: 1px solid var(--c-border);
  }

  .summary-stat {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 8px;
    border-right: 1px solid var(--c-bg-subtle);
  }
  .summary-stat:last-child { border-right: none; }

  .stat-val {
    font-size: 20px;
    font-weight: 800;
    color: #52b788;
    line-height: 1.2;
  }
  .stat-denom { font-size: 13px; font-weight: 400; color: var(--c-text-4); }
  .stat-label { font-size: 10px; color: var(--c-text-4); text-align: center; margin-top: 2px; }
  .pos-val    { color: #60a5fa; }
  .fold-val   { color: #ef4444; }

  /* ── Percentage bar ── */
  .pct-bar-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    border-bottom: 1px solid var(--c-bg-subtle);
  }

  .pct-bar {
    flex: 1;
    height: 6px;
    background: var(--c-bg-subtle);
    border-radius: 3px;
    overflow: hidden;
  }

  .pct-fill {
    height: 100%;
    background: #2d6a4f;
    border-radius: 3px;
    transition: width 0.3s ease;
  }

  .pct-bar-label {
    font-size: 10px;
    font-weight: 700;
    color: #52b788;
    white-space: nowrap;
  }
  .pct-bar-label.fold { color: #4a5568; }

  /* ── Per-count rows ── */
  .count-rows {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .count-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 14px;
    border-bottom: 1px solid #1a2030;
  }
  .count-row:last-child { border-bottom: none; }

  .count-label {
    font-size: 11px;
    font-weight: 700;
    color: var(--c-text-4);
    min-width: 60px;
    white-space: nowrap;
  }

  .pos-badges {
    display: flex;
    gap: 4px;
    flex: 1;
    flex-wrap: wrap;
  }

  .pos-badge {
    font-size: 10px;
    font-weight: 700;
    padding: 3px 7px;
    border-radius: 4px;
    white-space: nowrap;
    letter-spacing: 0.02em;
  }
  .pos-badge.raised { background: #2d6a4f; color: #b7e4c7; }
  .pos-badge.fold   { background: var(--c-bg-subtle); color: #3a4459; border: 1px solid #252f42; }

  .count-stat {
    font-size: 11px;
    font-weight: 700;
    color: var(--c-text-3);
    min-width: 28px;
    text-align: right;
  }
</style>
