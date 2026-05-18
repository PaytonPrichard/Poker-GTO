<script>
  import {
    statDefinitions,
    playerArchetypes,
    interpretArchetype,
    interpreterExamples,
  } from './data/hudStats.js';

  let activeTab = $state('glossary');
  const tabs = ['glossary', 'types', 'interpreter'];
  const tabLabels = {
    glossary: 'Stat Glossary',
    types: 'Player Types',
    interpreter: 'Quick Interpreter',
  };

  // ── Interpreter state ────────────────────────────────────────────────────
  let vpipInput = $state(22);
  let pfrInput = $state(19);
  let threeBetInput = $state(7);

  let interpretation = $derived.by(() => {
    const v = Number(vpipInput);
    const p = Number(pfrInput);
    const t = Number(threeBetInput);
    if ([v, p, t].some(n => Number.isNaN(n))) return null;
    const result = interpretArchetype(v, p, t);
    if (!result.id) return { archetype: null, confidence: 'low' };
    const archetype = playerArchetypes.find(a => a.id === result.id);
    return { archetype, confidence: result.confidence };
  });

  function loadExample(ex) {
    vpipInput = ex.vpip;
    pfrInput = ex.pfr;
    threeBetInput = ex.threeBet;
  }

  let gapValue = $derived(Number(vpipInput) - Number(pfrInput));
</script>

<div class="hud">
  <h2>Reading HUD Stats</h2>
  <p class="intro">
    Decode VPIP, PFR, 3-bet and the other key HUD numbers. Type opponents
    in seconds and turn baselines into exploits.
  </p>

  <div class="tabs-row">
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
  </div>

  <!-- ── STAT GLOSSARY ──────────────────────────────────────────────────── -->
  {#if activeTab === 'glossary'}
    <div role="tabpanel">
      <p class="tab-intro">
        Each card shows what the stat measures, what ranges to expect,
        and what extreme values tell you. Click to expand.
      </p>
      <div class="stat-grid">
        {#each statDefinitions as stat}
          <details class="stat-card" name="hud-stat">
            <summary>
              <span class="stat-abbr">{stat.abbr}</span>
              <span class="stat-name">{stat.name}</span>
            </summary>
            <div class="stat-body">
              <p class="stat-def">{stat.definition}</p>

              <div class="ranges">
                <div class="ranges-label">Typical ranges</div>
                <div class="range-rows">
                  {#each stat.ranges as r}
                    <div class="range-row">
                      <span class="range-label">{r.label}</span>
                      <span class="range-value">{r.value}</span>
                    </div>
                  {/each}
                </div>
              </div>

              <div class="insight">
                <span class="insight-tag">Read</span>
                <p>{stat.insight}</p>
              </div>
              <div class="sample">Sample size: {stat.sampleSize}</div>
            </div>
          </details>
        {/each}
      </div>
    </div>

  <!-- ── PLAYER TYPES ───────────────────────────────────────────────────── -->
  {:else if activeTab === 'types'}
    <div role="tabpanel">
      <p class="tab-intro">
        Six archetypes that cover the vast majority of opponents.
        The stat line is <strong>VPIP / PFR / 3B</strong>.
      </p>
      <div class="archetype-grid">
        {#each playerArchetypes as a}
          <article class="archetype-card">
            <header>
              <h3>{a.name}</h3>
              <span class="statline">{a.statLine}</span>
            </header>
            <p class="tagline">{a.tagline}</p>
            <p class="fingerprint"><strong>Fingerprint:</strong> {a.fingerprint}</p>
            <p class="description">{a.description}</p>
            <div class="exploits">
              <div class="exploits-label">How to exploit</div>
              <ul>
                {#each a.exploits as ex}
                  <li>{ex}</li>
                {/each}
              </ul>
            </div>
          </article>
        {/each}
      </div>
    </div>

  <!-- ── QUICK INTERPRETER ──────────────────────────────────────────────── -->
  {:else if activeTab === 'interpreter'}
    <div role="tabpanel">
      <p class="tab-intro">
        Enter the three core stats from your HUD. The interpreter matches
        the closest archetype and surfaces the top exploits.
      </p>

      <div class="interpreter">
        <div class="inputs">
          <label>
            <span>VPIP</span>
            <input type="number" min="0" max="100" step="1" bind:value={vpipInput} />
            <span class="suffix">%</span>
          </label>
          <label>
            <span>PFR</span>
            <input type="number" min="0" max="100" step="1" bind:value={pfrInput} />
            <span class="suffix">%</span>
          </label>
          <label>
            <span>3-Bet</span>
            <input type="number" min="0" max="100" step="1" bind:value={threeBetInput} />
            <span class="suffix">%</span>
          </label>
        </div>

        <div class="examples">
          <span class="examples-label">Load example:</span>
          {#each interpreterExamples as ex}
            <button class="example-btn" onclick={() => loadExample(ex)}>
              {ex.label}
            </button>
          {/each}
        </div>

        <div class="gap-strip">
          <span class="gap-label">VPIP − PFR gap</span>
          <span class="gap-value" class:warn={gapValue >= 10}>{gapValue}</span>
          <span class="gap-hint">
            {#if gapValue >= 15}High passivity — they limp and call a lot
            {:else if gapValue >= 8}Some passivity — calls more than they raise
            {:else if gapValue >= 0}Tight gap — competent aggressive player
            {:else}Negative gap means a data error — PFR cannot exceed VPIP
            {/if}
          </span>
        </div>

        {#if interpretation && interpretation.archetype}
          <div class="result">
            <div class="result-header">
              <span class="result-label">Closest match</span>
              <span class="confidence confidence-{interpretation.confidence}">
                {interpretation.confidence} confidence
              </span>
            </div>
            <h3 class="result-name">{interpretation.archetype.name}</h3>
            <p class="result-tagline">{interpretation.archetype.tagline}</p>
            <p class="result-desc">{interpretation.archetype.description}</p>
            <div class="result-exploits">
              <div class="exploits-label">Top exploits</div>
              <ul>
                {#each interpretation.archetype.exploits as ex}
                  <li>{ex}</li>
                {/each}
              </ul>
            </div>
          </div>
        {:else if interpretation}
          <div class="result no-match">
            <h3>No clear match</h3>
            <p>
              These stats don't fit a standard archetype cleanly. Either the
              sample is small (under ~100 hands) or the player is in transition
              between styles. Watch them play another orbit and re-check.
            </p>
          </div>
        {/if}

        <p class="caveat">
          Heuristic only. The interpreter looks at three stats; HUD reads
          should also weigh fold-to-3-bet, c-bet frequency, and showdown
          stats from the Glossary tab.
        </p>
      </div>
    </div>
  {/if}
</div>

<style>
  .hud { display: flex; flex-direction: column; gap: 16px; }
  h2 { font-size: 22px; font-weight: 700; color: var(--c-text-h); margin: 0; }
  h3 { font-size: 15px; font-weight: 600; color: var(--c-text); margin: 0; }
  .intro { color: var(--c-text-3); font-size: 14px; margin: 0; line-height: 1.55; max-width: 720px; }

  .tabs-row {
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 8px;
  }
  .tabs { display: flex; gap: 4px; flex-wrap: wrap; }
  .tab-btn {
    padding: 6px 14px; border-radius: 5px;
    border: 1px solid var(--c-border);
    background: var(--c-bg-card); color: var(--c-text-3);
    font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.15s;
  }
  .tab-btn:hover  { border-color: var(--c-accent-dark); color: var(--c-text); }
  .tab-btn.active { background: var(--c-accent-dark); border-color: var(--c-accent-dark); color: #fff; }
  .tab-intro { color: var(--c-text-3); font-size: 13px; margin: 0 0 12px; line-height: 1.5; max-width: 720px; }

  /* ── Stat Glossary ── */
  .stat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 10px;
    align-items: start;
  }
  .stat-card {
    background: var(--c-bg-card);
    border: 1px solid var(--c-border);
    border-radius: 8px;
    overflow: hidden;
  }
  .stat-card summary {
    cursor: pointer;
    list-style: none;
    padding: 12px 14px;
    display: flex; align-items: baseline; gap: 12px;
    font-weight: 600;
  }
  .stat-card summary::-webkit-details-marker { display: none; }
  .stat-card summary::before {
    content: '▸'; color: var(--c-text-4); font-size: 11px; transition: transform 0.15s;
    margin-right: 4px;
  }
  .stat-card[open] summary::before { transform: rotate(90deg); }
  .stat-abbr {
    color: var(--c-accent); font-size: 14px; font-weight: 800;
    letter-spacing: 0.04em; min-width: 56px;
  }
  .stat-name { color: var(--c-text); font-size: 14px; font-weight: 600; }

  .stat-body { padding: 0 14px 14px; display: flex; flex-direction: column; gap: 12px; }
  .stat-def { color: var(--c-text-3); font-size: 13px; line-height: 1.55; margin: 0; }

  .ranges {
    background: var(--c-bg-header);
    border-radius: 6px; padding: 10px 12px;
  }
  .ranges-label {
    font-size: 11px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.08em; color: var(--c-text-4); margin-bottom: 6px;
  }
  .range-rows { display: flex; flex-direction: column; gap: 3px; }
  .range-row {
    display: flex; justify-content: space-between;
    font-size: 13px;
  }
  .range-label { color: var(--c-text-3); }
  .range-value { color: var(--c-text); font-weight: 600; font-variant-numeric: tabular-nums; }

  .insight {
    border-left: 3px solid var(--c-accent);
    padding: 8px 12px;
    background: var(--c-bg-callout, var(--c-bg-header));
    border-radius: 4px;
    display: flex; gap: 10px; align-items: flex-start;
  }
  .insight p { margin: 0; color: var(--c-text); font-size: 13px; line-height: 1.55; }
  .insight-tag {
    font-size: 10px; font-weight: 800; text-transform: uppercase;
    letter-spacing: 0.1em; color: var(--c-accent);
    padding-top: 1px;
  }
  .sample { font-size: 11px; color: var(--c-text-4); font-style: italic; }

  /* ── Player Types ── */
  .archetype-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 12px;
  }
  .archetype-card {
    background: var(--c-bg-card);
    border: 1px solid var(--c-border);
    border-radius: 8px;
    padding: 16px;
    display: flex; flex-direction: column; gap: 10px;
  }
  .archetype-card header {
    display: flex; align-items: baseline; justify-content: space-between; gap: 8px;
  }
  .statline {
    font-family: ui-monospace, SFMono-Regular, monospace;
    font-size: 13px; color: var(--c-accent); font-weight: 700;
  }
  .tagline { color: var(--c-text); font-size: 13px; margin: 0; font-style: italic; }
  .fingerprint { color: var(--c-text-3); font-size: 12px; margin: 0; }
  .fingerprint strong { color: var(--c-text); }
  .description { color: var(--c-text-3); font-size: 13px; line-height: 1.55; margin: 0; }
  .exploits {
    margin-top: 4px;
    padding-top: 10px;
    border-top: 1px solid var(--c-border);
  }
  .exploits-label {
    font-size: 11px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.08em; color: var(--c-accent); margin-bottom: 6px;
  }
  .exploits ul, .result-exploits ul {
    margin: 0; padding-left: 18px;
    display: flex; flex-direction: column; gap: 4px;
  }
  .exploits li, .result-exploits li {
    font-size: 13px; color: var(--c-text); line-height: 1.5;
  }

  /* ── Interpreter ── */
  .interpreter {
    display: flex; flex-direction: column; gap: 16px;
  }
  .inputs { display: flex; gap: 10px; flex-wrap: wrap; }
  .inputs label {
    display: flex; align-items: center; gap: 6px;
    background: var(--c-bg-card);
    border: 1px solid var(--c-border);
    border-radius: 7px; padding: 8px 12px;
    min-width: 130px;
  }
  .inputs label span:first-child {
    font-size: 12px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.06em; color: var(--c-text-3); margin-right: 2px;
  }
  .inputs input {
    width: 50px; background: transparent; border: none;
    color: var(--c-text); font-size: 16px; font-weight: 600;
    font-variant-numeric: tabular-nums; text-align: right;
    outline: none;
  }
  .inputs input:focus { outline: 1px solid var(--c-accent); border-radius: 3px; }
  .suffix { color: var(--c-text-4); font-size: 13px; }

  .examples {
    display: flex; flex-wrap: wrap; align-items: center; gap: 6px;
  }
  .examples-label {
    font-size: 11px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.08em; color: var(--c-text-4); margin-right: 4px;
  }
  .example-btn {
    padding: 4px 10px; border-radius: 4px;
    border: 1px solid var(--c-border); background: var(--c-bg-card);
    color: var(--c-text-3); font-size: 12px; font-weight: 600; cursor: pointer;
    transition: all 0.15s;
  }
  .example-btn:hover { border-color: var(--c-accent-dark); color: var(--c-text); }

  .gap-strip {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 12px;
    background: var(--c-bg-header);
    border-radius: 6px;
    font-size: 13px; flex-wrap: wrap;
  }
  .gap-label {
    font-size: 11px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.08em; color: var(--c-text-3);
  }
  .gap-value {
    font-size: 18px; font-weight: 800; color: var(--c-text);
    font-variant-numeric: tabular-nums;
  }
  .gap-value.warn { color: var(--c-accent); }
  .gap-hint { color: var(--c-text-3); font-size: 13px; }

  .result {
    background: var(--c-bg-card);
    border: 1px solid var(--c-border-accent, var(--c-accent));
    border-radius: 8px;
    padding: 16px;
    display: flex; flex-direction: column; gap: 10px;
  }
  .result-header {
    display: flex; justify-content: space-between; align-items: center;
  }
  .result-label {
    font-size: 11px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.08em; color: var(--c-text-3);
  }
  .confidence {
    font-size: 11px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.06em; padding: 2px 8px; border-radius: 999px;
  }
  .confidence-high   { background: #14532d; color: #d1fae5; }
  .confidence-medium { background: #713f12; color: #fef3c7; }
  .confidence-low    { background: #4b5563; color: #e5e7eb; }
  .result-name { color: var(--c-text-h); font-size: 18px; font-weight: 700; }
  .result-tagline { color: var(--c-text); font-style: italic; font-size: 13px; margin: 0; }
  .result-desc { color: var(--c-text-3); font-size: 13px; line-height: 1.55; margin: 0; }
  .result-exploits { padding-top: 8px; border-top: 1px solid var(--c-border); }
  .no-match h3 { color: var(--c-text-h); margin-bottom: 6px; }
  .no-match p { color: var(--c-text-3); font-size: 13px; line-height: 1.55; margin: 0; }

  .caveat {
    font-size: 11px; color: var(--c-text-4); font-style: italic;
    margin: 0; line-height: 1.5;
  }
</style>
