<script>
  import {
    bluffConditions,
    blockerScenarios,
    playerProfiles,
    bluffSpots,
    bluffPrinciples,
  } from './data/bluffing.js';

  let activeTab = $state('when');
  let sectionEl;
  let allOpen = $state(false);
  function toggleAll() { allOpen = !allOpen; sectionEl?.querySelectorAll('details').forEach(d => d.open = allOpen); }

  const tabs = ['when', 'blockers', 'profiles', 'spots'];
  const tabLabels = { when: 'When to Bluff', blockers: 'Blocker Theory', profiles: 'Player Profiles', spots: 'Common Spots' };

  function impactColor(level) {
    if (level === 'high') return '#52b788';
    if (level === 'medium') return '#f59e0b';
    return '#a1a1aa';
  }

  function qualityColor(q) {
    if (q === 'excellent') return '#52b788';
    if (q === 'good') return '#3b82f6';
    if (q === 'moderate') return '#f59e0b';
    return '#a1a1aa';
  }

  function profileColor(type) {
    if (type.includes('Nit') || type.includes('Weak')) return '#52b788';
    if (type.includes('TAG')) return '#f59e0b';
    if (type.includes('LAG')) return '#ef4444';
    if (type.includes('Calling')) return '#ef4444';
    if (type.includes('Maniac')) return '#ef4444';
    return '#a1a1aa';
  }

  function bluffAdjColor(adj) {
    if (adj.startsWith('Bluff MORE')) return '#52b788';
    if (adj.startsWith('Bluff LESS') || adj.startsWith('NEVER')) return '#ef4444';
    return '#f59e0b';
  }
</script>

<div class="bluffing" bind:this={sectionEl}>
  <h2>Bluffing & Player Profiling</h2>
  <p class="intro">
    Profitable bluffing combines blocker theory, board texture reads, and opponent profiling.
    GTO provides the baseline frequencies — exploitative reads tell you when to deviate.
  </p>

  <!-- Tabs -->
  <div class="tabs-row">
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
    <button class="toggle-all-btn" onclick={toggleAll}>
      {allOpen ? 'Close All' : 'Open All'}
    </button>
  </div>

  <!-- ── WHEN TO BLUFF ── -->
  {#if activeTab === 'when'}
    <div class="section-header">
      <h3>Conditions That Make Bluffs Profitable</h3>
      <p class="section-note">
        Not all bluffs are created equal. These factors determine whether a bluff is +EV or burning money.
        The more conditions you satisfy, the better your bluff.
      </p>
    </div>

    <div class="condition-cards">
      {#each bluffConditions as cond}
        <div class="condition-card">
          <div class="cond-header">
            <span class="cond-factor">{cond.factor}</span>
            <span class="impact-badge" style="color:{impactColor(cond.impact)}">
              {cond.impact} impact
            </span>
          </div>
          <p class="cond-why">{cond.why}</p>
          <div class="cond-example">
            <span class="example-label">Example</span>
            <span class="example-text">{cond.example}</span>
          </div>
        </div>
      {/each}
    </div>

    <div class="callout" style="margin-top:4px;">
      <span class="callout-icon">♠</span>
      <div>
        <strong>The bluffing checklist</strong>
        <ul class="check-list">
          <li>✓ Do I have blockers to villain's value range?</li>
          <li>✓ Does my line tell a credible story?</li>
          <li>✓ Is villain's range capped (likely to fold)?</li>
          <li>✓ Does my hand have zero showdown value?</li>
          <li>✗ Am I bluffing into multiple opponents?</li>
          <li>✗ Is my opponent a calling station?</li>
        </ul>
      </div>
    </div>

  <!-- ── BLOCKER THEORY ── -->
  {:else if activeTab === 'blockers'}
    <div class="section-header">
      <h3>Blocker Theory: Why the Cards You Hold Matter</h3>
      <p class="section-note">
        Blockers remove combos from your opponent's range. The best bluffs hold cards that block villain's
        strongest hands while <em>not</em> blocking hands they'd fold.
      </p>
    </div>

    <div class="blocker-cards">
      {#each blockerScenarios as b}
        <div class="blocker-card">
          <div class="blocker-header">
            <div class="blocker-scenario">{b.scenario}</div>
            <span class="quality-badge" style="color:{qualityColor(b.bluffQuality)}">
              {b.bluffQuality}
            </span>
          </div>
          <div class="blocker-body">
            <div class="blocker-row">
              <span class="b-label">Blocker</span>
              <span class="b-val highlight">{b.blocker}</span>
            </div>
            <div class="blocker-row">
              <span class="b-label">Effect</span>
              <span class="b-val">{b.effect}</span>
            </div>
            <p class="blocker-detail">{b.detail}</p>
          </div>
        </div>
      {/each}
    </div>

    <div class="callout" style="margin-top:4px;">
      <span class="callout-icon">♠</span>
      <div>
        <strong>The unblocker principle</strong>
        <p class="callout-body">
          Just as important as blocking villain's value hands is <em>not blocking</em> their folding range.
          If you hold cards that villain would fold (busted draws, weak pairs), your bluff is less effective
          because you've removed the exact hands you <em>want</em> them to have. The ideal bluff blocks value
          and unblocks folds.
        </p>
      </div>
    </div>

  <!-- ── PLAYER PROFILES ── -->
  {:else if activeTab === 'profiles'}
    <div class="section-header">
      <h3>Player Profiling: Adjust Your Bluffs to the Opponent</h3>
      <p class="section-note">
        GTO frequencies assume a perfect opponent. Real players have tendencies you can exploit.
        Identify the player type, then adjust your bluffing frequency up or down accordingly.
      </p>
    </div>

    <div class="profile-cards">
      {#each playerProfiles as p}
        <div class="profile-card">
          <div class="profile-header">
            <div class="profile-type-row">
              <span class="profile-type" style="color:{profileColor(p.type)}">{p.type}</span>
              <span class="stat-pills">
                <span class="stat-pill">VPIP {p.vpip}</span>
                <span class="stat-pill">PFR {p.pfr}</span>
              </span>
            </div>
            <span class="bluff-adj" style="color:{bluffAdjColor(p.bluffAdj)}">
              {p.bluffAdj}
            </span>
          </div>
          <div class="profile-body">
            <p class="profile-traits">{p.traits}</p>
            <p class="profile-detail">{p.detail}</p>
            <div class="profile-footer">
              <div class="profile-stat">
                <span class="pf-label">Key stat</span>
                <span class="pf-val">{p.keyStat}</span>
              </div>
              <div class="profile-stat">
                <span class="pf-label">Tells</span>
                <span class="pf-val">{p.tells}</span>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>

  <!-- ── COMMON SPOTS ── -->
  {:else if activeTab === 'spots'}
    <div class="section-header">
      <h3>Common Bluffing Spots</h3>
      <p class="section-note">
        These are the highest-frequency bluffing opportunities you'll encounter. Each includes the setup,
        ideal blockers, and which player types to target (or avoid).
      </p>
    </div>

    <div class="spot-cards">
      {#each bluffSpots as s}
        <div class="spot-card">
          <div class="spot-header">
            <span class="spot-name">{s.spot}</span>
            <div class="spot-tags">
              <span class="street-tag">{s.street}</span>
              <span class="pos-tag">{s.position}</span>
            </div>
          </div>
          <div class="spot-body">
            <div class="spot-row">
              <span class="s-label">Setup</span>
              <span class="s-val">{s.setup}</span>
            </div>
            <div class="spot-row">
              <span class="s-label">Action</span>
              <span class="s-val highlight">{s.action}</span>
            </div>
            <div class="spot-row">
              <span class="s-label">Frequency</span>
              <span class="s-val">{s.frequency}</span>
            </div>
            <div class="spot-row">
              <span class="s-label">Blockers</span>
              <span class="s-val">{s.blockers}</span>
            </div>
            <div class="spot-detail-grid">
              <div class="spot-avoid">
                <span class="sd-label">Avoid when</span>
                <span class="sd-val">{s.avoid}</span>
              </div>
              <div class="spot-profile">
                <span class="sd-label">Player reads</span>
                <span class="sd-val">{s.profiling}</span>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Principles callout -->
    <div class="section-header" style="margin-top:12px;">
      <h3>Core Bluffing Principles</h3>
    </div>
    <div class="concepts-grid">
      {#each bluffPrinciples as p}
        <details class="concept-card">
          <summary class="concept-title">{p.title}</summary>
          <p class="concept-body">{p.body}</p>
        </details>
      {/each}
    </div>
  {/if}
</div>

<style>
  .bluffing { display: flex; flex-direction: column; gap: 20px; }

  h2 { font-size: 22px; font-weight: 700; color: var(--c-text-h); margin: 0; }
  h3 { font-size: 17px; font-weight: 600; color: var(--c-text); margin: 0; }

  .intro { color: var(--c-text-2); font-size: 14px; margin: 0; line-height: 1.6; }

  /* Tabs */
  .tabs-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .toggle-all-btn { padding: 5px 14px; border-radius: 5px; border: 1px solid var(--c-border); background: transparent; color: var(--c-text-4); font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.15s; white-space: nowrap; flex-shrink: 0; }
  .toggle-all-btn:hover { background: var(--c-bg-card); color: var(--c-text); }

  .tabs { display: flex; gap: 6px; flex-wrap: wrap; }
  .tab-btn {
    padding: 7px 20px;
    border-radius: 5px;
    border: 1px solid var(--c-border);
    background: var(--c-bg-card);
    color: var(--c-text-3);
    font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all 0.15s;
  }
  .tab-btn:hover  { border-color: var(--c-accent-dark); color: var(--c-text); }
  .tab-btn.active { background: var(--c-accent-dark); border-color: var(--c-accent-dark); color: #fff; }

  .section-header { display: flex; flex-direction: column; gap: 8px; }
  .section-note   { font-size: 13px; color: var(--c-text-3); margin: 0; line-height: 1.5; }

  /* ── When to Bluff — condition cards ── */
  .condition-cards { display: flex; flex-direction: column; gap: 10px; }
  .condition-card {
    background: var(--c-bg-card);
    border: 1px solid var(--c-border);
    border-radius: 8px;
    padding: 14px 16px;
  }
  .cond-header {
    display: flex; align-items: center; justify-content: space-between;
    gap: 12px; margin-bottom: 8px; flex-wrap: wrap;
  }
  .cond-factor { font-size: 14px; font-weight: 700; color: var(--c-text); }
  .impact-badge {
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em;
  }
  .cond-why { font-size: 13px; color: var(--c-text-3); line-height: 1.6; margin: 0 0 8px; }
  .cond-example {
    display: flex; gap: 8px; align-items: baseline;
    padding: 8px 10px; border-radius: 6px;
    background: var(--c-bg-subtle);
  }
  .example-label {
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em;
    color: var(--c-accent); flex-shrink: 0;
  }
  .example-text { font-size: 12px; color: var(--c-text-2); line-height: 1.5; }

  /* ── Blocker Theory ── */
  .blocker-cards { display: flex; flex-direction: column; gap: 12px; }
  .blocker-card {
    background: var(--c-bg-card);
    border: 1px solid var(--c-border);
    border-radius: 8px;
    overflow: hidden;
  }
  .blocker-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 14px;
    background: var(--c-bg-header);
    border-bottom: 1px solid var(--c-border);
    gap: 12px; flex-wrap: wrap;
  }
  .blocker-scenario { font-size: 14px; color: var(--c-text); font-weight: 600; }
  .quality-badge {
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.05em;
  }
  .blocker-body { padding: 12px 14px; display: flex; flex-direction: column; gap: 6px; }
  .blocker-row  { display: flex; gap: 10px; align-items: baseline; }
  .b-label {
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.07em;
    color: var(--c-text-4); min-width: 60px;
  }
  .b-val { font-size: 13px; color: var(--c-text-2); }
  .b-val.highlight { color: var(--c-accent); font-weight: 700; }
  .blocker-detail { font-size: 13px; color: var(--c-text-3); line-height: 1.6; margin: 4px 0 0; }

  /* ── Player Profiles ── */
  .profile-cards { display: flex; flex-direction: column; gap: 14px; }
  .profile-card {
    background: var(--c-bg-card);
    border: 1px solid var(--c-border);
    border-radius: 8px;
    overflow: hidden;
  }
  .profile-header {
    padding: 12px 14px;
    background: var(--c-bg-header);
    border-bottom: 1px solid var(--c-border);
    display: flex; flex-direction: column; gap: 6px;
  }
  .profile-type-row {
    display: flex; align-items: center; justify-content: space-between;
    gap: 12px; flex-wrap: wrap;
  }
  .profile-type { font-size: 15px; font-weight: 700; }
  .stat-pills { display: flex; gap: 6px; }
  .stat-pill {
    font-size: 11px; font-weight: 700;
    padding: 2px 8px; border-radius: 4px;
    background: var(--c-bg-subtle); color: var(--c-text-3);
    letter-spacing: 0.04em;
  }
  .bluff-adj {
    font-size: 13px; font-weight: 700;
    letter-spacing: 0.02em;
  }
  .profile-body { padding: 12px 14px; display: flex; flex-direction: column; gap: 8px; }
  .profile-traits { font-size: 13px; color: var(--c-text-2); margin: 0; line-height: 1.5; font-style: italic; }
  .profile-detail { font-size: 13px; color: var(--c-text-3); margin: 0; line-height: 1.6; }
  .profile-footer {
    display: flex; flex-direction: column; gap: 6px;
    padding: 10px 12px; border-radius: 6px;
    background: var(--c-bg-subtle); margin-top: 4px;
  }
  .profile-stat { display: flex; gap: 10px; align-items: baseline; }
  .pf-label {
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.07em;
    color: var(--c-text-4); min-width: 60px;
  }
  .pf-val { font-size: 12px; color: var(--c-text-2); line-height: 1.5; }

  /* ── Common Spots ── */
  .spot-cards { display: flex; flex-direction: column; gap: 12px; }
  .spot-card {
    background: var(--c-bg-card);
    border: 1px solid var(--c-border);
    border-radius: 8px;
    overflow: hidden;
  }
  .spot-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 14px;
    background: var(--c-bg-header);
    border-bottom: 1px solid var(--c-border);
    gap: 12px; flex-wrap: wrap;
  }
  .spot-name { font-size: 14px; color: var(--c-text); font-weight: 600; }
  .spot-tags { display: flex; gap: 6px; }
  .street-tag, .pos-tag {
    font-size: 11px; font-weight: 700;
    padding: 2px 8px; border-radius: 4px;
    text-transform: uppercase; letter-spacing: 0.05em;
  }
  .street-tag { background: #2d6a4f; color: #b7e4c7; }
  .pos-tag    { background: var(--c-bg-subtle); color: var(--c-text-3); }
  .spot-body { padding: 12px 14px; display: flex; flex-direction: column; gap: 6px; }
  .spot-row  { display: flex; gap: 10px; align-items: baseline; }
  .s-label {
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.07em;
    color: var(--c-text-4); min-width: 72px;
  }
  .s-val { font-size: 13px; color: var(--c-text-2); line-height: 1.5; }
  .s-val.highlight { color: var(--c-accent); font-weight: 700; }
  .spot-detail-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 8px; margin-top: 6px;
  }
  .spot-avoid, .spot-profile {
    padding: 8px 10px; border-radius: 6px;
    background: var(--c-bg-subtle);
  }
  .sd-label {
    display: block;
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em;
    color: var(--c-text-4); margin-bottom: 4px;
  }
  .sd-val { font-size: 12px; color: var(--c-text-3); line-height: 1.5; }

  /* ── Callout ── */
  .callout {
    display: flex; gap: 14px;
    padding: 14px 16px;
    background: var(--c-bg-callout);
    border: 1px solid var(--c-border-accent);
    border-radius: 8px;
    align-items: flex-start;
  }
  .callout-icon { font-size: 22px; color: var(--c-accent); line-height: 1.4; flex-shrink: 0; }
  .callout strong { display: block; color: var(--c-text); font-size: 14px; margin-bottom: 6px; }
  .callout-body { font-size: 13px; color: var(--c-text-3); margin: 0; line-height: 1.6; }

  .check-list {
    margin: 0; padding-left: 0; list-style: none;
    display: flex; flex-direction: column; gap: 4px;
  }
  .check-list li { font-size: 13px; color: var(--c-text-3); line-height: 1.5; }

  /* ── Concepts grid (principles) ── */
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
  .concept-title::after { content: '›'; font-size: 18px; font-weight: 400; color: var(--c-text-4); transition: transform 0.2s; flex-shrink: 0; margin-left: auto; padding-left: 8px; }
  details[open] > summary::after { transform: rotate(90deg); }
  details.concept-card:not([open]) > .concept-title { margin-bottom: 0; }
  details:hover:not([open]) { border-color: var(--c-accent-dark); }
</style>
