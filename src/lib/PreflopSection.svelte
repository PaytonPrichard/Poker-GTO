<script>
  import HandMatrix     from './HandMatrix.svelte';
  import HandBreakdown  from './HandBreakdown.svelte';
  import { positionsByCount } from './data/hands.js';
  import { rfiRanges, openSizes, threeBetSizes } from './data/ranges.js';
  import { vsOpenRanges, vs3betRanges, positionOrder } from './data/vsRanges.js';

  // ── State ──────────────────────────────────────────────────────────────────
  let playerCount  = $state(6);
  let scenario     = $state('rfi');      // 'rfi' | 'vs-open' | 'vs-3bet'
  let yourPos      = $state('BTN');
  let raiserPos    = $state('CO');       // used by vs-open
  let threePos     = $state('BB');       // used by vs-3bet (who 3-bet you)
  let selectedHand = $state(null);      // cell clicked for breakdown panel

  function handleCellClick(hand) {
    selectedHand = selectedHand === hand ? null : hand;
  }

  // ── Position helpers ───────────────────────────────────────────────────────
  // All seats including BB (for scenarios where BB can act)
  let allPositions = $derived(positionOrder[playerCount]);

  // Positions that can open (no BB for RFI, BB can't raise first)
  let rfiPositions = $derived(positionsByCount[playerCount]);

  // When scenario changes or player count changes, reset to sane defaults
  function setScenario(s) {
    scenario = s;
    const rfi = positionsByCount[playerCount];
    if (s === 'rfi') {
      yourPos = 'BTN';
    } else if (s === 'vs-open') {
      raiserPos = rfi[0];         // default raiser = UTG
      // your position = first slot to raiser's left
      const order = positionOrder[playerCount];
      const ri = order.indexOf(rfi[0]);
      yourPos = order[ri + 1] ?? 'BB';
    } else if (s === 'vs-3bet') {
      yourPos   = 'BTN';          // you opened
      threePos  = 'BB';           // who 3-bet you
    }
  }

  function setPlayerCount(n) {
    playerCount = n;
    const rfi = positionsByCount[n];
    const order = positionOrder[n];

    if (scenario === 'rfi') {
      // Keep yourPos if it still exists, otherwise pick closest valid
      if (!rfi.includes(yourPos)) yourPos = rfi[rfi.length - 1];
    } else if (scenario === 'vs-open') {
      // Keep raiserPos if valid, otherwise pick first opener
      if (!rfi.includes(raiserPos)) raiserPos = rfi[0];
      // Recalc valid defenders from raiser's position
      const ri = order.indexOf(raiserPos);
      const defenders = order.slice(ri + 1);
      if (!defenders.includes(yourPos)) yourPos = defenders[defenders.length - 1] ?? 'BB';
    } else if (scenario === 'vs-3bet') {
      // Keep yourPos (opener) if valid
      if (!rfi.includes(yourPos)) yourPos = rfi[rfi.length - 1];
      // Recalc valid 3-bettors from your position
      const oi = order.indexOf(yourPos);
      const possible = order.slice(oi + 1);
      if (!possible.includes(threePos)) threePos = possible[possible.length - 1] ?? 'BB';
    }
  }

  // Valid "your position" slots when facing a raise
  let defenderPositions = $derived(() => {
    const order = positionOrder[playerCount];
    const ri = order.indexOf(raiserPos);
    return ri >= 0 ? order.slice(ri + 1) : [];
  });

  // Valid 3-bettor positions (positions to your left after you opened)
  let threeBettorPositions = $derived(() => {
    const order = positionOrder[playerCount];
    const oi = order.indexOf(yourPos);
    return oi >= 0 ? order.slice(oi + 1) : [];
  });

  // When raiserPos changes in vs-open, reset defender to a valid slot
  function setRaiserPos(p) {
    raiserPos = p;
    const order = positionOrder[playerCount];
    const ri = order.indexOf(p);
    const defenders = order.slice(ri + 1);
    if (!defenders.includes(yourPos)) yourPos = defenders[defenders.length - 1] ?? 'BB';
  }

  // When yourPos changes in vs-3bet, reset threePos to a valid slot
  function setYourPos3bet(p) {
    yourPos = p;
    const order = positionOrder[playerCount];
    const oi = order.indexOf(p);
    const possible3bettors = order.slice(oi + 1);
    if (!possible3bettors.includes(threePos)) threePos = possible3bettors[possible3bettors.length - 1] ?? 'BB';
  }

  // ── Range lookup ───────────────────────────────────────────────────────────
  let raiseSet = $derived(
    scenario === 'rfi'
      ? (rfiRanges[playerCount]?.[yourPos] ?? new Set())
      : scenario === 'vs-open'
        ? (vsOpenRanges[yourPos]?.[raiserPos]?.threebet ?? new Set())
        : (vs3betRanges[yourPos]?.[threePos]?.fourbet ?? new Set())
  );

  let callSet = $derived(
    scenario === 'vs-open'
      ? (vsOpenRanges[yourPos]?.[raiserPos]?.call ?? new Set())
      : scenario === 'vs-3bet'
        ? (vs3betRanges[yourPos]?.[threePos]?.call ?? new Set())
        : new Set()
  );

  let hasData = $derived(raiseSet.size > 0 || callSet.size > 0);

  // ── Info bar content ───────────────────────────────────────────────────────
  const posDesc = {
    'UTG':   'Under the Gun — first to act, tightest range',
    'UTG+1': 'UTG +1 — second to act, slightly wider',
    'HJ':    'Hijack — two left of BTN, medium-early',
    'CO':    'Cutoff — one right of BTN, wide open range',
    'BTN':   'Button — last to act postflop, widest range',
    'SB':    'Small Blind — OOP vs BB, only one opponent',
    'BB':    'Big Blind — last preflop, already invested 1 BB',
  };

  let openSize = $derived(openSizes[playerCount]?.[yourPos] ?? '—');
</script>

<div class="preflop">
  <h2>Preflop Ranges</h2>

  <!-- Player count -->
  <div class="selector-group">
    <div class="group-label">Players at table</div>
    <div class="btn-group">
      {#each [4, 5, 6, 7] as n}
        <button class="tab-btn" class:active={playerCount === n} onclick={() => setPlayerCount(n)}>
          {n}-handed
        </button>
      {/each}
    </div>
  </div>

  <!-- Scenario selector -->
  <div class="selector-group">
    <div class="group-label">Situation</div>
    <div class="btn-group">
      <button class="tab-btn scenario" class:active={scenario === 'rfi'}     onclick={() => setScenario('rfi')}
        data-tooltip-title="RFI — Raise First In"
        data-tooltip="Opening the pot with a raise when all players before you have folded. Size: 3x from EP, 2.5x from LP.">
        Opening (RFI)
      </button>
      <button class="tab-btn scenario" class:active={scenario === 'vs-open'} onclick={() => setScenario('vs-open')}
        data-tooltip-title="Facing a Raise"
        data-tooltip="Action folds to an opener and then to you. Your options: 3-bet (re-raise), cold call, or fold.">
        Facing a Raise
      </button>
      <button class="tab-btn scenario" class:active={scenario === 'vs-3bet'} onclick={() => setScenario('vs-3bet')}
        data-tooltip-title="Facing a 3-Bet"
        data-tooltip="You opened and an opponent re-raised (3-bet). Your options: 4-bet, call the 3-bet, or fold.">
        Facing a 3-Bet
      </button>
    </div>
  </div>

  <!-- ── RFI position selector ── -->
  {#if scenario === 'rfi'}
    <div class="selector-group">
      <div class="group-label">Your position</div>
      <div class="btn-group">
        {#each rfiPositions as pos}
          <button class="tab-btn pos" class:active={yourPos === pos} onclick={() => yourPos = pos}
            data-tooltip={posDesc[pos] ?? pos}>
            {pos}
          </button>
        {/each}
      </div>
    </div>

    <div class="info-bar">
      <div class="info-item">
        <span class="info-label">Position</span>
        <span class="info-value">{posDesc[yourPos] ?? yourPos}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Standard open size</span>
        <span class="info-value highlight">{openSize} BB</span>
      </div>
    </div>

  <!-- ── vs Open position selectors ── -->
  {:else if scenario === 'vs-open'}
    <div class="dual-selectors">
      <div class="selector-group">
        <div class="group-label">Raiser's position</div>
        <div class="btn-group">
          {#each rfiPositions as pos}
            <button class="tab-btn pos raiser" class:active={raiserPos === pos} onclick={() => setRaiserPos(pos)}>
              {pos}
            </button>
          {/each}
        </div>
      </div>
      <div class="selector-group">
        <div class="group-label">Your position</div>
        <div class="btn-group">
          {#each defenderPositions() as pos}
            <button class="tab-btn pos" class:active={yourPos === pos} onclick={() => yourPos = pos}>
              {pos}
            </button>
          {/each}
        </div>
      </div>
    </div>

    <div class="info-bar">
      <div class="info-item">
        <span class="info-label">Situation</span>
        <span class="info-value">{raiserPos} opens → {yourPos} responds</span>
      </div>
      <div class="info-item">
        <span class="info-label">3-Bet sizing (IP)</span>
        <span class="info-value">{threeBetSizes.IP}</span>
      </div>
      <div class="info-item">
        <span class="info-label">3-Bet sizing (OOP)</span>
        <span class="info-value">{threeBetSizes.OOP}</span>
      </div>
    </div>

  <!-- ── vs 3-Bet position selectors ── -->
  {:else if scenario === 'vs-3bet'}
    <div class="dual-selectors">
      <div class="selector-group">
        <div class="group-label">You opened from</div>
        <div class="btn-group">
          {#each rfiPositions as pos}
            <button class="tab-btn pos" class:active={yourPos === pos} onclick={() => setYourPos3bet(pos)}>
              {pos}
            </button>
          {/each}
        </div>
      </div>
      <div class="selector-group">
        <div class="group-label">3-Bettor's position</div>
        <div class="btn-group">
          {#each threeBettorPositions() as pos}
            <button class="tab-btn pos raiser" class:active={threePos === pos} onclick={() => threePos = pos}>
              {pos}
            </button>
          {/each}
        </div>
      </div>
    </div>

    <div class="info-bar">
      <div class="info-item">
        <span class="info-label">Situation</span>
        <span class="info-value">{yourPos} opens → {threePos} 3-bets → {yourPos} responds</span>
      </div>
      <div class="info-item">
        <span class="info-label">Key concept</span>
        <span class="info-value">4-bet polarized (value + bluffs). Call with medium-strong hands that realize equity.</span>
      </div>
    </div>
  {/if}

  <!-- Matrix or no-data state -->
  {#if hasData}
    <HandMatrix
      {raiseSet} {callSet} {scenario}
      {selectedHand}
      onCellClick={handleCellClick}
    />
  {:else}
    <div class="no-data">
      <span>No data for this matchup yet.</span>
      <span class="no-data-sub">This specific position vs position combo hasn't been added to the database.</span>
    </div>
  {/if}

  <!-- Hand breakdown panel — appears when a cell is clicked -->
  {#if selectedHand}
    <HandBreakdown hand={selectedHand} onClose={() => selectedHand = null} />
  {/if}

  <!-- Mixed strategy note -->
  <div class="callout">
    <span class="callout-icon">♠</span>
    <div>
      <strong>Pure vs mixed strategies</strong>
      <p class="callout-body">
        The chart above shows <em>pure strategies</em> — each hand is always raise, call, or fold.
        In reality, GTO solvers use <em>mixed strategies</em> for borderline hands. For example, a
        solver might say "raise KTo from the CO 65% of the time, fold 35%" — this is a
        <strong>mixed frequency</strong>, where the same hand splits between two actions. Hands in
        the core of a range (like AA) are always 100% one action, but hands at the edges mix.
      </p>
      <p class="callout-body" style="margin-top: 6px;">
        <strong>In practice:</strong> Pure strategies are easier to execute and lose very little EV
        vs perfect mixed strategies. If a hand is close to the border, pick one action and stick with
        it — the EV difference between raising and folding a marginal hand is tiny. Focus on never
        making large mistakes (folding premiums, opening trash) rather than nailing exact frequencies.
      </p>
    </div>
  </div>

  <!-- Pot sizing reference -->
  <div class="sizing-notes">
    <h3>Pot Sizing Reference</h3>
    <div class="sizing-grid">
      <div class="sizing-card">
        <div class="sizing-title">Open Raise (RFI)</div>
        <ul>
          <li><strong>EP (UTG, UTG+1):</strong> 3x BB</li>
          <li><strong>MP (HJ):</strong> 2.5x BB</li>
          <li><strong>LP (CO, BTN):</strong> 2.5x BB</li>
          <li><strong>SB vs BB:</strong> 3x BB</li>
          <li><em>With antes: reduce to 2–2.5x</em></li>
        </ul>
      </div>
      <div class="sizing-card">
        <div class="sizing-title">3-Bet Sizing</div>
        <ul>
          <li><strong>IP:</strong> {threeBetSizes.IP}</li>
          <li><strong>OOP:</strong> {threeBetSizes.OOP}</li>
          <li><em>Size up vs limp: 4–5x</em></li>
        </ul>
      </div>
      <div class="sizing-card">
        <div class="sizing-title">4-Bet Sizing</div>
        <ul>
          <li><strong>IP:</strong> 2.2–2.5x the 3-bet</li>
          <li><strong>OOP:</strong> 2.5–3x the 3-bet</li>
          <li><em>Stack ≤40 BB: shove instead</em></li>
        </ul>
      </div>
    </div>
  </div>
</div>

<style>
  .preflop { display: flex; flex-direction: column; gap: 20px; }

  h2 { font-size: 22px; font-weight: 700; color: var(--c-text-h); margin: 0; }
  h3 { font-size: 15px; font-weight: 600; color: var(--c-text); margin: 0 0 12px; }

  .selector-group { display: flex; flex-direction: column; gap: 8px; }

  .group-label {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--c-text-3);
  }

  .btn-group { display: flex; gap: 6px; flex-wrap: wrap; }

  .tab-btn {
    padding: 6px 14px;
    border-radius: 5px;
    border: 1px solid var(--c-border);
    background: var(--c-bg-card);
    color: var(--c-text-3);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;
  }
  .tab-btn:hover         { border-color: var(--c-accent-dark); color: var(--c-text); }
  .tab-btn.active        { background: var(--c-accent-dark); border-color: var(--c-accent-dark); color: #fff; }

  /* Scenario tabs — slightly wider */
  .tab-btn.scenario      { padding: 6px 18px; }

  /* Position buttons — your position (blue) */
  .tab-btn.pos.active    { background: #1d4ed8; border-color: #3b82f6; }
  .tab-btn.pos:hover     { border-color: #3b82f6; color: var(--c-text); }

  /* Raiser position (orange) */
  .tab-btn.pos.raiser.active { background: #92400e; border-color: #f59e0b; }
  .tab-btn.pos.raiser:hover  { border-color: #f59e0b; color: var(--c-text); }

  .dual-selectors {
    display: flex;
    gap: 28px;
    flex-wrap: wrap;
  }

  .info-bar {
    display: flex;
    gap: 24px;
    padding: 12px 16px;
    background: var(--c-bg-card);
    border: 1px solid var(--c-border);
    border-radius: 7px;
    flex-wrap: wrap;
  }
  .info-item   { display: flex; flex-direction: column; gap: 2px; }
  .info-label  {
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.08em; color: var(--c-text-3);
  }
  .info-value  { font-size: 14px; color: var(--c-text); }
  .info-value.highlight { color: var(--c-accent); font-weight: 700; font-size: 17px; }

  .no-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 48px 24px;
    background: var(--c-bg-header);
    border: 1px dashed var(--c-border);
    border-radius: 8px;
    color: var(--c-text-3);
    font-size: 15px;
    max-width: 560px;
  }
  .no-data-sub { font-size: 13px; color: #4a5568; text-align: center; }

  .sizing-notes {
    padding: 16px;
    background: var(--c-bg-header);
    border: 1px solid var(--c-border);
    border-radius: 8px;
  }
  .sizing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 14px;
  }
  .sizing-card {
    background: var(--c-bg-card);
    border: 1px solid var(--c-border);
    border-radius: 6px;
    padding: 12px 14px;
  }
  .sizing-title {
    font-size: 13px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.07em;
    color: var(--c-accent); margin-bottom: 8px;
  }
  ul { margin: 0; padding-left: 16px; display: flex; flex-direction: column; gap: 4px; }
  li { font-size: 13px; color: var(--c-text-3); line-height: 1.5; }
  li strong { color: var(--c-text); }
  li em { color: var(--c-text-4); }

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
  .callout-icon { font-size: 20px; color: var(--c-accent); line-height: 1.4; flex-shrink: 0; }
  .callout > div > strong { display: block; color: var(--c-text); font-size: 14px; margin-bottom: 6px; }
  .callout-body { font-size: 13px; color: var(--c-text-3); margin: 0; line-height: 1.6; }
  .callout-body strong { color: var(--c-text); font-size: inherit; }
</style>
