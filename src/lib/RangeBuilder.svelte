<script>
  import { ranks, getHandName } from './data/hands.js';
  import { rfiRanges } from './data/ranges.js';

  let selectedHands = $state(new Set());
  let savedRanges = $state(JSON.parse(localStorage.getItem('customRanges') ?? '{}'));
  let currentName = $state('');
  let loadedName = $state('');

  function toggleHand(hand) {
    const next = new Set(selectedHands);
    if (next.has(hand)) next.delete(hand);
    else next.add(hand);
    selectedHands = next;
  }

  function getAction(row, col) {
    const hand = getHandName(row, col);
    return selectedHands.has(hand) ? 'raise' : 'fold';
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
  let combos = $derived(countCombos(selectedHands));
  let pct = $derived(Math.round((combos / TOTAL_COMBOS) * 100));

  function saveRange() {
    const name = currentName.trim();
    if (!name) return;
    savedRanges = { ...savedRanges, [name]: [...selectedHands] };
    localStorage.setItem('customRanges', JSON.stringify(savedRanges));
    loadedName = name;
  }

  function loadRange(name) {
    const hands = savedRanges[name];
    if (hands) {
      selectedHands = new Set(hands);
      loadedName = name;
      currentName = name;
    }
  }

  function deleteRange(name) {
    const next = { ...savedRanges };
    delete next[name];
    savedRanges = next;
    localStorage.setItem('customRanges', JSON.stringify(next));
    if (loadedName === name) loadedName = '';
  }

  function clearAll() {
    selectedHands = new Set();
    loadedName = '';
    currentName = '';
  }

  function loadPreset(position) {
    const ranges = rfiRanges[6];
    if (ranges && ranges[position]) {
      selectedHands = new Set(ranges[position]);
      loadedName = '';
      currentName = position + ' RFI';
    }
  }

  const presetPositions = ['UTG', 'HJ', 'CO', 'BTN', 'SB'];
  let savedNames = $derived(Object.keys(savedRanges));
</script>

<div class="rb">
  <h2>Range Builder</h2>
  <p class="intro">Click hands to build a custom range. Save and load your ranges for study.</p>

  <div class="rb-layout">
    <!-- Controls panel -->
    <div class="rb-controls">
      <!-- Presets -->
      <div class="rb-section">
        <h3>Load Preset (6-Max RFI)</h3>
        <div class="preset-btns">
          {#each presetPositions as pos}
            <button class="preset-btn" onclick={() => loadPreset(pos)}>{pos}</button>
          {/each}
        </div>
      </div>

      <!-- Save / Load -->
      <div class="rb-section">
        <h3>Save Range</h3>
        <div class="save-row">
          <input
            bind:value={currentName}
            class="save-input"
            type="text"
            placeholder="Range name..."
          />
          <button class="save-btn" onclick={saveRange} disabled={!currentName.trim()}>Save</button>
        </div>
      </div>

      {#if savedNames.length > 0}
        <div class="rb-section">
          <h3>Saved Ranges</h3>
          <div class="saved-list">
            {#each savedNames as name}
              <div class="saved-item" class:active={loadedName === name}>
                <button class="saved-name" onclick={() => loadRange(name)}>{name}</button>
                <button class="delete-btn" onclick={() => deleteRange(name)} aria-label="Delete {name}">✕</button>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <button class="clear-btn" onclick={clearAll}>Clear All</button>

      <!-- Stats -->
      <div class="rb-stats">
        <div class="stat">
          <span class="stat-val">{selectedHands.size}</span>
          <span class="stat-label">Hands</span>
        </div>
        <div class="stat">
          <span class="stat-val">{combos}</span>
          <span class="stat-label">Combos</span>
        </div>
        <div class="stat">
          <span class="stat-val">{pct}%</span>
          <span class="stat-label">of Range</span>
        </div>
      </div>
    </div>

    <!-- Matrix -->
    <div class="rb-matrix">
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
              {@const hand = getHandName(row, col)}
              {@const action = getAction(row, col)}
              <div
                class="cell {action}"
                onclick={() => toggleHand(hand)}
                onkeydown={e => (e.key === 'Enter' || e.key === ' ') && toggleHand(hand)}
                role="gridcell"
                aria-label="{hand} - {action === 'raise' ? 'selected' : 'not selected'}"
                tabindex="0"
              >
                <span class="label">{hand}</span>
              </div>
            {/each}
          {/each}
        </div>
      </div>

      <div class="matrix-footer">
        <div class="legend">
          <span class="dot selected"></span> Selected
          <span class="dot unselected"></span> Not selected
        </div>
        <div class="stats-inline">
          Range: <strong>{pct}%</strong> ({combos} combos)
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .rb { display: flex; flex-direction: column; gap: 20px; }

  h2 { font-size: 22px; font-weight: 700; color: var(--c-text-h); margin: 0; }
  h3 { font-size: 13px; font-weight: 700; color: var(--c-text-3); margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em; }
  .intro { font-size: 14px; color: var(--c-text-3); margin: 0; line-height: 1.6; }

  .rb-layout {
    display: flex;
    gap: 24px;
    align-items: flex-start;
  }

  /* Controls */
  .rb-controls {
    width: 220px;
    min-width: 220px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .rb-section {
    background: var(--c-bg-card);
    border: 1px solid var(--c-border);
    border-radius: 8px;
    padding: 12px 14px;
  }

  .preset-btns {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
  }
  .preset-btn {
    padding: 4px 10px;
    border-radius: 4px;
    border: 1px solid var(--c-border);
    background: var(--c-bg-subtle);
    color: var(--c-text-3);
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s;
  }
  .preset-btn:hover { background: var(--c-bg-hover); color: var(--c-text); border-color: var(--c-accent-dark); }

  .save-row { display: flex; gap: 6px; }
  .save-input {
    flex: 1;
    padding: 6px 10px;
    border-radius: 5px;
    border: 1px solid var(--c-border);
    background: var(--c-bg-subtle);
    color: var(--c-text);
    font-size: 13px;
    font-family: inherit;
    outline: none;
  }
  .save-input:focus { border-color: var(--c-accent); }
  .save-btn {
    padding: 6px 12px;
    border-radius: 5px;
    border: none;
    background: var(--c-accent-dark);
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  }
  .save-btn:disabled { opacity: 0.4; cursor: default; }
  .save-btn:hover:not(:disabled) { background: var(--c-accent); }

  .saved-list { display: flex; flex-direction: column; gap: 4px; }
  .saved-item {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border-radius: 4px;
    background: var(--c-bg-subtle);
  }
  .saved-item.active { background: var(--c-bg-nav-active); }
  .saved-name {
    flex: 1;
    border: none;
    background: transparent;
    color: var(--c-text-2);
    font-size: 13px;
    text-align: left;
    cursor: pointer;
    padding: 2px 0;
  }
  .saved-name:hover { color: var(--c-text); }
  .saved-item.active .saved-name { color: var(--c-accent); font-weight: 600; }
  .delete-btn {
    border: none;
    background: transparent;
    color: var(--c-text-4);
    font-size: 12px;
    cursor: pointer;
    padding: 2px 4px;
  }
  .delete-btn:hover { color: #ef4444; }

  .clear-btn {
    padding: 7px 14px;
    border-radius: 6px;
    border: 1px solid var(--c-border);
    background: transparent;
    color: var(--c-text-4);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;
  }
  .clear-btn:hover { background: var(--c-bg-card); color: var(--c-text); }

  .rb-stats {
    display: flex;
    gap: 12px;
    justify-content: center;
  }
  .stat { display: flex; flex-direction: column; align-items: center; gap: 2px; }
  .stat-val { font-size: 20px; font-weight: 800; color: var(--c-accent); font-family: 'Courier New', monospace; }
  .stat-label { font-size: 11px; color: var(--c-text-4); text-transform: uppercase; letter-spacing: 0.05em; }

  /* Matrix */
  .rb-matrix { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 10px; }

  .matrix-container { position: relative; width: 100%; max-width: 560px; }

  .matrix {
    display: grid;
    grid-template-columns: 24px repeat(13, 1fr);
    gap: 2px;
    width: 100%;
  }

  .corner, .hdr {
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700; color: var(--c-text-3); height: 24px;
  }

  .axis-suited { position: absolute; top: -20px; right: 0; font-size: 11px; font-weight: 600; color: var(--c-text-4); }
  .axis-offsuit { position: absolute; bottom: -20px; left: 0; font-size: 11px; font-weight: 600; color: var(--c-text-4); }
  .axis-pairs { position: absolute; top: -20px; left: 28px; font-size: 11px; font-weight: 600; color: var(--c-text-4); }

  .cell {
    aspect-ratio: 1;
    border-radius: 3px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: filter 0.1s, transform 0.1s;
    user-select: none;
  }
  .cell:hover { filter: brightness(1.3); transform: scale(1.12); z-index: 10; }
  .cell.raise { background: #2d6a4f; }
  .cell.fold { background: var(--c-bg-subtle); }

  .label {
    font-size: 11px; font-weight: 700;
    color: rgba(255,255,255,0.85);
    pointer-events: none; white-space: nowrap;
  }
  .cell.fold .label { color: rgba(255,255,255,0.28); }

  .matrix-footer {
    display: flex; align-items: center; justify-content: space-between;
    font-size: 12px; color: var(--c-text-3);
    width: 100%; max-width: 560px; flex-wrap: wrap; gap: 6px; margin-top: 8px;
  }
  .legend { display: flex; align-items: center; gap: 10px; }
  .dot {
    display: inline-block; width: 10px; height: 10px;
    border-radius: 2px; margin-right: 3px;
  }
  .dot.selected { background: #2d6a4f; }
  .dot.unselected { background: var(--c-bg-subtle); border: 1px solid #3a4459; }
  .stats-inline { color: var(--c-text); }

  @media (max-width: 768px) {
    .rb-layout { flex-direction: column; }
    .rb-controls { width: 100%; min-width: 100%; }
    .rb-stats { justify-content: flex-start; }
  }
</style>
