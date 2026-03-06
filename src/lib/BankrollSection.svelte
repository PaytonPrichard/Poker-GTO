<script>
  import {
    cashBrm,
    tournamentBrm,
    varianceInfo,
    movingStakes,
  } from './data/bankroll.js';

  let activeTab = $state('cash');
  let sectionEl;
  let allOpen = $state(false);
  function toggleAll() { allOpen = !allOpen; sectionEl?.querySelectorAll('details').forEach(d => d.open = allOpen); }

  const tabs = ['cash', 'tournament', 'variance', 'moving'];
  const tabLabels = { cash: 'Cash Game', tournament: 'Tournament', variance: 'Variance', moving: 'Moving Stakes' };
</script>

<div class="bankroll" bind:this={sectionEl}>
  <h2>Bankroll Management</h2>
  <p class="intro">
    Buy-in rules, variance management, and when to move up or down in stakes.
  </p>

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

  <!-- ── CASH GAME BRM ── -->
  {#if activeTab === 'cash'}
    <div class="section-header">
      <h3>Cash Game Bankroll Rules</h3>
      <p class="section-note">
        Lower variance than tournaments, but proper bankroll rules still apply.
      </p>
    </div>
    <div class="concepts-grid">
      {#each cashBrm as item}
        <details class="concept-card">
          <summary class="concept-title">{item.title}</summary>
          <p class="concept-body">{item.body}</p>
        </details>
      {/each}
    </div>

  <!-- ── TOURNAMENT BRM ── -->
  {:else if activeTab === 'tournament'}
    <div class="section-header">
      <h3>Tournament Bankroll Rules</h3>
      <p class="section-note">
        Higher variance than cash — a larger bankroll is essential.
      </p>
    </div>
    <div class="concepts-grid">
      {#each tournamentBrm as item}
        <details class="concept-card">
          <summary class="concept-title">{item.title}</summary>
          <p class="concept-body">{item.body}</p>
        </details>
      {/each}
    </div>

  <!-- ── VARIANCE ── -->
  {:else if activeTab === 'variance'}
    <div class="section-header">
      <h3>Understanding Variance</h3>
      <p class="section-note">
        Short-term results deviate wildly from true win rate.
      </p>
    </div>
    <div class="concepts-grid">
      {#each varianceInfo as item}
        <details class="concept-card">
          <summary class="concept-title">{item.title}</summary>
          <p class="concept-body">{item.body}</p>
        </details>
      {/each}
    </div>

    <div class="callout" style="margin-top:4px;">
      <span class="callout-icon">♣</span>
      <div>
        <strong>Variance reality check</strong>
        <p class="callout-body">
          A 5 bb/100 winner has a ~40% chance of losing over any 10k hand stretch. You need 50k+ hands for results to reflect true win rate.
        </p>
      </div>
    </div>

  <!-- ── MOVING STAKES ── -->
  {:else if activeTab === 'moving'}
    <div class="section-header">
      <h3>Moving Up & Down in Stakes</h3>
      <p class="section-note">
        When to take shots at higher stakes and when to move back down.
      </p>
    </div>
    <div class="concepts-grid">
      {#each movingStakes as item}
        <details class="concept-card">
          <summary class="concept-title">{item.title}</summary>
          <p class="concept-body">{item.body}</p>
        </details>
      {/each}
    </div>
  {/if}
</div>

<style>
  .bankroll { display: flex; flex-direction: column; gap: 20px; }

  h2 { font-size: 22px; font-weight: 700; color: var(--c-text-h); margin: 0; }
  h3 { font-size: 17px; font-weight: 600; color: var(--c-text); margin: 0; }

  .intro { color: var(--c-text-2); font-size: 14px; margin: 0; line-height: 1.6; }

  .tabs-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .toggle-all-btn { padding: 5px 14px; border-radius: 5px; border: 1px solid var(--c-border); background: transparent; color: var(--c-text-4); font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.15s; white-space: nowrap; flex-shrink: 0; }
  .toggle-all-btn:hover { background: var(--c-bg-card); color: var(--c-text); }
  .tabs { display: flex; gap: 6px; flex-wrap: wrap; }
  .tab-btn {
    padding: 7px 20px; border-radius: 5px;
    border: 1px solid var(--c-border); background: var(--c-bg-card);
    color: var(--c-text-3); font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all 0.15s;
  }
  .tab-btn:hover  { border-color: var(--c-accent-dark); color: var(--c-text); }
  .tab-btn.active { background: var(--c-accent-dark); border-color: var(--c-accent-dark); color: #fff; }

  .section-header { display: flex; flex-direction: column; gap: 8px; }
  .section-note   { font-size: 13px; color: var(--c-text-3); margin: 0; line-height: 1.5; }

  .concepts-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .concept-card {
    background: var(--c-bg-card); border: 1px solid var(--c-border);
    border-radius: 8px; padding: 14px 16px;
  }
  .concept-title { font-size: 14px; font-weight: 700; color: var(--c-accent); margin-bottom: 8px; display: flex; align-items: center; }
  .concept-body  { font-size: 13px; color: var(--c-text-2); line-height: 1.6; margin: 0; }

  .callout {
    display: flex; gap: 14px; padding: 14px 16px;
    background: var(--c-bg-callout); border: 1px solid var(--c-border-accent);
    border-radius: 8px; align-items: flex-start;
  }
  .callout-icon { font-size: 22px; color: var(--c-accent); line-height: 1.4; flex-shrink: 0; }
  .callout strong { display: block; color: var(--c-text); font-size: 14px; margin-bottom: 6px; }
  .callout-body { font-size: 13px; color: var(--c-text-3); margin: 0; line-height: 1.6; }

  /* Collapsible cards */
  summary { cursor: pointer; list-style: none; user-select: none; }
  summary::-webkit-details-marker { display: none; }
  .concept-title::after { content: '›'; font-size: 18px; font-weight: 400; color: var(--c-text-4); transition: transform 0.2s; flex-shrink: 0; margin-left: auto; padding-left: 8px; }
  details[open] > summary::after { transform: rotate(90deg); }
  details.concept-card:not([open]) > .concept-title { margin-bottom: 0; }
  details:hover:not([open]) { border-color: var(--c-accent-dark); }
</style>
