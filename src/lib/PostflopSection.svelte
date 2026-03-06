<script>
  import { cbetData, turnGuide, riverGuide, principles } from './data/postflop.js';
  import { categorizeHand, categoryLabels, categorySummaries, textureGuide } from './data/handPostflop.js';

  let { handContext = null, onDismissHand = null } = $props();

  let handCat = $derived(handContext ? categorizeHand(handContext.hand) : null);
  let handGuide = $derived(handCat ? textureGuide[handCat] : null);

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

  // ── C-bet Scenario Drill ────────────────────────────────────────────────────
  let drillMode = $state(false);
  let drillIdx = $state(0);
  let drillAnswer = $state(''); // 'bet' or 'check'
  let drillRevealed = $state(false);
  let drillScore = $state(0);
  let drillTotal = $state(0);
  let drillPosition = $state('IP');

  // Persistent scores
  let cbetStats = $state(JSON.parse(localStorage.getItem('practiceScores_cbet') ?? '{"totalCorrect":0,"totalAttempts":0,"bestStreak":0}'));
  let cbetStreak = $state(0);
  function saveCbetStats() { localStorage.setItem('practiceScores_cbet', JSON.stringify(cbetStats)); }

  // Shuffle order
  let drillOrder = $state(cbetData.map((_, i) => i).sort(() => Math.random() - 0.5));
  let drillRow = $derived(cbetData[drillOrder[drillIdx % drillOrder.length]]);

  function submitDrill(answer) {
    if (drillRevealed) return;
    drillAnswer = answer;
    drillRevealed = true;
    drillTotal++;
    const freq = drillPosition === 'IP' ? drillRow.ipFreq : drillRow.oopFreq;
    const shouldBet = freq >= 50;
    if ((answer === 'bet' && shouldBet) || (answer === 'check' && !shouldBet)) drillScore++;
    cbetStats.totalAttempts++;
    if ((answer === 'bet' && shouldBet) || (answer === 'check' && !shouldBet)) {
      cbetStats.totalCorrect++;
      cbetStreak++;
      if (cbetStreak > cbetStats.bestStreak) cbetStats.bestStreak = cbetStreak;
    } else {
      cbetStreak = 0;
    }
    saveCbetStats();
  }

  function nextDrill() {
    drillRevealed = false;
    drillAnswer = '';
    drillIdx++;
    drillPosition = Math.random() > 0.5 ? 'IP' : 'OOP';
  }

  function resetDrill() {
    drillMode = false;
    drillRevealed = false;
    drillAnswer = '';
    drillIdx = 0;
    drillScore = 0;
    drillTotal = 0;
    drillOrder = cbetData.map((_, i) => i).sort(() => Math.random() - 0.5);
  }
</script>

<div class="postflop" bind:this={sectionEl}>
  <h2>Postflop Play</h2>
  <p class="intro">
    C-bet frequencies, turn/river decisions, and core postflop concepts by board texture.
  </p>

  <!-- ── Hand Spotlight (from preflop) ── -->
  {#if handContext && handCat && handGuide}
    <div class="hand-spotlight">
      <div class="spotlight-header">
        <div class="spotlight-info">
          <span class="spotlight-hand">{handContext.hand}</span>
          <span class="spotlight-pos">from {handContext.position}</span>
          <span class="spotlight-cat">{categoryLabels[handCat]}</span>
        </div>
        <button class="spotlight-close" onclick={onDismissHand}>Dismiss</button>
      </div>
      <p class="spotlight-summary">{categorySummaries[handCat]}</p>
      <div class="spotlight-boards">
        {#each cbetData as row}
          {@const guide = handGuide[row.texture]}
          {#if guide}
            <div class="spotlight-row" class:s-strong={guide.s === 'strong'} class:s-moderate={guide.s === 'moderate'} class:s-weak={guide.s === 'weak'} class:s-draw={guide.s === 'draw'}>
              <span class="sp-dot" class:strong={guide.s === 'strong'} class:moderate={guide.s === 'moderate'} class:weak={guide.s === 'weak'} class:draw={guide.s === 'draw'}></span>
              <span class="sp-texture">{row.texture}</span>
              <span class="sp-action">{guide.a}</span>
              <span class="sp-note">{guide.n}</span>
            </div>
          {/if}
        {/each}
      </div>
    </div>
  {/if}

  <!-- Street tabs -->
  <div class="tabs-row">
    <div class="street-tabs" role="tablist">
      {#each ['flop', 'turn', 'river', 'concepts'] as street}
        <button
          class="street-btn"
          class:active={activeStreet === street}
          onclick={() => activeStreet = street}
          role="tab"
          aria-selected={activeStreet === street}
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
    <div role="tabpanel">
      <div class="section-header">
        <div class="header-row">
          <h3>Flop
            <span data-tooltip-title="C-Bet — Continuation Bet" data-tooltip="Betting the flop after being the preflop aggressor. GTO c-bet frequency varies heavily by board texture.">C-Bet</span>
            Frequencies
          </h3>
          <button class="mode-toggle" class:active={drillMode} onclick={() => drillMode ? resetDrill() : (drillMode = true)}>
            {drillMode ? '✕ Exit Practice' : '♠ Practice Mode'}
          </button>
        </div>
      </div>

      {#if drillMode}
        <!-- C-bet Scenario Drill -->
        <div class="drill-game">
          <div class="drill-score">Score: {drillScore}/{drillTotal} correct</div>
            <div class="drill-alltime">All-time: {cbetStats.totalCorrect}/{cbetStats.totalAttempts} | Best streak: {cbetStats.bestStreak}</div>
          <div class="drill-card">
            <div class="drill-board">{drillRow.example}</div>
            <div class="drill-info">
              <span class="drill-texture">{drillRow.texture}</span>
              <span class="drill-pos badge {drillPosition.toLowerCase()}">{drillPosition}</span>
            </div>
            <div class="drill-prompt">You are the PFR {drillPosition === 'IP' ? 'in position' : 'out of position'}. C-bet or check?</div>

            {#if !drillRevealed}
              <div class="drill-buttons">
                <button class="drill-btn bet" onclick={() => submitDrill('bet')}>Bet</button>
                <button class="drill-btn check" onclick={() => submitDrill('check')}>Check</button>
              </div>
            {:else}
              {@const freq = drillPosition === 'IP' ? drillRow.ipFreq : drillRow.oopFreq}
              {@const size = drillPosition === 'IP' ? drillRow.ipSize : drillRow.oopSize}
              {@const shouldBet = freq >= 50}
              {@const isCorrect = (drillAnswer === 'bet' && shouldBet) || (drillAnswer === 'check' && !shouldBet)}
              <div class="drill-result">
                <div class="drill-feedback" class:correct={isCorrect} class:wrong={!isCorrect}>
                  {isCorrect ? '✓ Correct!' : '✗ Not quite.'}
                  GTO {drillPosition} c-bet frequency: <strong style="color:{freqColor(freq)}">{freq}%</strong>
                  {#if freq >= 50}
                    — bet {size}
                  {:else}
                    — check most of your range
                  {/if}
                </div>
                <div class="drill-explain">Range advantage: {drillRow.rangeAdv}. {drillRow.notes}</div>
                <button class="drill-btn next" onclick={nextDrill}>Next Board →</button>
              </div>
            {/if}
          </div>
        </div>
      {:else}
      <!-- Normal table view -->
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
              <span class="range-tag"
                data-tooltip-title="Range Advantage: {row.rangeAdv}" data-tooltip="On {row.texture} boards ({row.example}), {row.rangeAdv} typically has the stronger range, allowing higher c-bet frequency.">
                {row.rangeAdv}
              </span>
            </span>
            <span class="center">
              <span class="freq-pill" style="color: {freqColor(row.ipFreq)}"
                data-tooltip-title="IP C-Bet: {row.ipFreq}%" data-tooltip="{freqLabel(row.ipFreq)} frequency — when in position on {row.texture} boards, c-bet {row.ipFreq}% of your range using {row.ipSize} sizing.">
                {row.ipFreq}% <span class="freq-label">{freqLabel(row.ipFreq)}</span>
              </span>
            </span>
            <span class="center size-text"
              data-tooltip-title="IP Bet Size" data-tooltip="Recommended c-bet sizing when in position on {row.texture} boards.">{row.ipSize}</span>
            <span class="center">
              <span class="freq-pill" style="color: {freqColor(row.oopFreq)}"
                data-tooltip-title="OOP C-Bet: {row.oopFreq}%" data-tooltip="{freqLabel(row.oopFreq)} frequency — when out of position on {row.texture} boards, c-bet {row.oopFreq}% of your range using {row.oopSize} sizing.">
                {row.oopFreq}% <span class="freq-label">{freqLabel(row.oopFreq)}</span>
              </span>
            </span>
            <span class="center size-text"
              data-tooltip-title="OOP Bet Size" data-tooltip="Recommended c-bet sizing when out of position on {row.texture} boards.">{row.oopSize}</span>
          </div>
          <div class="cbet-notes">{row.notes}</div>
        {/each}
      </div>

      <div class="callout">
        <span class="callout-icon">♠</span>
        <div>
          <strong>Understanding these frequencies</strong>
          <p class="callout-sub">
            These are <em>range-wide</em> frequencies — how often you bet your <strong>entire range</strong>, not a single hand. Strong hands bet ~100%; marginal hands mix; pure air checks and gives up.
          </p>
          <p class="callout-sub" style="margin-top: 6px;">
            Board texture determines which hands fall into each category. Dry boards = more profitable bets; wet boards = fewer.
          </p>
        </div>
      </div>
      {/if}
    </div>

  <!-- ── TURN ── -->
  {:else if activeStreet === 'turn'}
    <div role="tabpanel">
      <div class="section-header">
        <h3>Turn Decisions</h3>
        <p class="section-note">How to proceed after your flop c-bet is called.</p>
      </div>
      <div class="guide-cards">
        {#each turnGuide as item}
          <details class="guide-card">
            <summary class="guide-header">
              <span class="situation">{item.situation}</span>
              <span class="action-badge"
                data-tooltip-title="{item.action}" data-tooltip="Recommended action: {item.action}. Hands: {item.hands}. Frequency: {item.frequency}.">{item.action}</span>
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
    </div>

  <!-- ── RIVER ── -->
  {:else if activeStreet === 'river'}
    <div role="tabpanel">
      <div class="section-header">
        <h3>River Decisions</h3>
        <p class="section-note">Polarize: size big with value, balance with bluffs.</p>
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
              <span class="action-badge"
                data-tooltip-title="{item.action}" data-tooltip="Recommended action: {item.action}. Hands: {item.hands}. Frequency: {item.frequency}.">{item.action}</span>
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
    </div>

  <!-- ── CONCEPTS ── -->
  {:else if activeStreet === 'concepts'}
    <div role="tabpanel">
      <div class="section-header">
        <h3>Core Postflop Principles</h3>
        <p class="section-note">Foundational GTO concepts for postflop play.</p>
      </div>
      <div class="concepts-grid">
        {#each principles as p}
          <details class="concept-card">
            <summary class="concept-title">{p.title}</summary>
            <p class="concept-body">{p.body}</p>
          </details>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .postflop { display: flex; flex-direction: column; gap: 20px; }

  h2 { font-size: 22px; font-weight: 700; color: var(--c-text-h); margin: 0; }
  h3 { font-size: 17px; font-weight: 600; color: var(--c-text); margin: 0; }

  /* ── Hand Spotlight ── */
  .hand-spotlight {
    background: var(--c-bg-card); border: 1px solid var(--c-accent-dark);
    border-radius: 10px; padding: 16px 18px;
    display: flex; flex-direction: column; gap: 10px;
  }
  .spotlight-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
  .spotlight-info { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  .spotlight-hand {
    font-size: 18px; font-weight: 800; color: var(--c-text-h);
    font-family: 'Courier New', monospace;
  }
  .spotlight-pos {
    font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 4px;
    background: #1d4ed8; color: #bfdbfe; text-transform: uppercase;
  }
  .spotlight-cat {
    font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 4px;
    background: var(--c-bg-subtle); color: var(--c-accent);
    text-transform: uppercase; letter-spacing: 0.04em;
  }
  .spotlight-close {
    padding: 4px 12px; border-radius: 5px;
    border: 1px solid var(--c-border); background: transparent;
    color: var(--c-text-4); font-size: 12px; font-weight: 600;
    cursor: pointer; transition: all 0.15s;
  }
  .spotlight-close:hover { color: var(--c-text); border-color: var(--c-text-4); }
  .spotlight-summary { font-size: 13px; color: var(--c-text-2); margin: 0; line-height: 1.5; }
  .spotlight-boards {
    display: flex; flex-direction: column; gap: 3px;
    max-height: 320px; overflow-y: auto;
  }
  .spotlight-row {
    display: grid; grid-template-columns: 8px 140px 100px 1fr;
    gap: 8px; align-items: center;
    padding: 5px 8px; border-radius: 5px; font-size: 12px;
    background: var(--c-bg-subtle);
  }
  .spotlight-row:hover { filter: brightness(1.1); }
  .sp-dot {
    width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
  }
  .sp-dot.strong   { background: #52b788; }
  .sp-dot.moderate  { background: #f59e0b; }
  .sp-dot.weak      { background: #ef4444; }
  .sp-dot.draw      { background: #60a5fa; }
  .sp-texture { font-weight: 700; color: var(--c-text); white-space: nowrap; }
  .sp-action { font-weight: 600; color: var(--c-accent); white-space: nowrap; }
  .sp-note { color: var(--c-text-3); line-height: 1.4; }

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

  /* ── Practice mode ── */
  .header-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
  .mode-toggle {
    padding: 6px 16px; border-radius: 6px;
    border: 1px solid var(--c-border); background: var(--c-bg-card);
    color: var(--c-text-3); font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.15s;
  }
  .mode-toggle:hover { border-color: var(--c-accent-dark); color: var(--c-text); }
  .mode-toggle.active { background: var(--c-accent-dark); border-color: var(--c-accent-dark); color: #fff; }

  /* ── C-bet Drill ── */
  .drill-game { display: flex; flex-direction: column; gap: 16px; max-width: 500px; }
  .drill-score { font-size: 13px; font-weight: 700; color: var(--c-accent); }
  .drill-card {
    background: var(--c-bg-card); border: 1px solid var(--c-border);
    border-radius: 10px; padding: 24px; display: flex; flex-direction: column; gap: 16px;
  }
  .drill-board {
    font-size: 28px; font-weight: 800; text-align: center;
    font-family: 'Courier New', monospace; letter-spacing: 0.05em;
    color: var(--c-text-h);
  }
  .drill-info { display: flex; justify-content: center; gap: 12px; align-items: center; }
  .drill-texture { font-size: 14px; font-weight: 600; color: var(--c-text-2); }
  .drill-prompt { font-size: 14px; color: var(--c-text-3); text-align: center; }
  .drill-buttons { display: flex; gap: 12px; justify-content: center; }
  .drill-btn {
    padding: 10px 28px; border-radius: 8px; font-size: 15px; font-weight: 700;
    cursor: pointer; transition: all 0.15s; border: 2px solid;
  }
  .drill-btn.bet { background: #2d6a4f22; border-color: #2d6a4f; color: #52b788; }
  .drill-btn.bet:hover { background: #2d6a4f44; }
  .drill-btn.check { background: #92400e22; border-color: #92400e; color: #fcd34d; }
  .drill-btn.check:hover { background: #92400e44; }
  .drill-btn.next {
    background: var(--c-bg-subtle); border-color: var(--c-border); color: var(--c-text);
    padding: 8px 20px; font-size: 13px;
  }
  .drill-btn.next:hover { border-color: var(--c-accent-dark); color: var(--c-accent); }
  .drill-result { display: flex; flex-direction: column; gap: 10px; }
  .drill-feedback {
    font-size: 14px; font-weight: 600; text-align: center;
    padding: 10px; border-radius: 6px;
  }
  .drill-feedback.correct { background: #2d6a4f22; color: #52b788; }
  .drill-feedback.wrong { background: #7f1d1d22; color: #ef4444; }
  .drill-explain { font-size: 12px; color: var(--c-text-4); text-align: center; line-height: 1.5; }
  .drill-alltime { font-size: 11px; color: var(--c-text-4); font-weight: 600; text-align: center; }
</style>
