<script>
  import { ranks, getHandName } from './data/hands.js';

  let { tierMap = new Map() } = $props();

  const tierColors = {
    1: '#2d6a4f',
    2: '#1d5940',
    3: '#7a5200',
    4: 'var(--c-bg-tag)',
  };

  function cellColor(row, col) {
    const hand = getHandName(row, col);
    const tier = tierMap.get(hand);
    if (!tier) return 'var(--c-bg-header)';
    return tierColors[tier];
  }
</script>

<div class="visualizer">
  <div class="grid">
    {#each ranks as _r, row}
      {#each ranks as _c, col}
        {@const hand = getHandName(row, col)}
        {@const tier = tierMap.get(hand)}
        <div
          class="cell"
          style="background:{cellColor(row, col)}"
          title={hand}
          aria-label={hand + (tier ? ' — Tier ' + tier : ' — Not in top 50%')}
        >
          <span class="lbl">{hand}</span>
        </div>
      {/each}
    {/each}
  </div>

  <div class="legend">
    <div class="leg-item">
      <span class="leg-swatch" style="background:#2d6a4f"></span>
      <span>Top 5%</span>
    </div>
    <div class="leg-item">
      <span class="leg-swatch" style="background:#1d5940"></span>
      <span>Top 10%</span>
    </div>
    <div class="leg-item">
      <span class="leg-swatch" style="background:#7a5200"></span>
      <span>Top 20%</span>
    </div>
    <div class="leg-item">
      <span class="leg-swatch" style="background:var(--c-bg-tag)"></span>
      <span>Top 50%</span>
    </div>
    <div class="leg-item">
      <span class="leg-swatch empty"></span>
      <span>Outside top 50%</span>
    </div>
  </div>
</div>

<style>
  .visualizer {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 420px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(13, 1fr);
    gap: 2px;
  }

  .cell {
    aspect-ratio: 1;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
    transition: filter 0.1s, transform 0.1s;
  }

  .cell:hover {
    filter: brightness(1.35);
    transform: scale(1.15);
    z-index: 10;
    position: relative;
  }

  .lbl {
    font-size: 7px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.65);
    pointer-events: none;
    white-space: nowrap;
    line-height: 1;
  }

  .legend {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    font-size: 11px;
    color: var(--c-text-3);
  }

  .leg-item {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .leg-swatch {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 2px;
    flex-shrink: 0;
  }

  .leg-swatch.empty {
    background: var(--c-bg-header);
    border: 1px solid var(--c-border);
  }
</style>
