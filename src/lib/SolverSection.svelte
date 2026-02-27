<script>
  import {
    readingOutput,
    frequencyConcepts,
    whenToDeviate,
    practicalTips,
  } from './data/solver.js';

  let activeTab = $state('reading');
  let sectionEl;
  let allOpen = $state(false);
  function toggleAll() { allOpen = !allOpen; sectionEl?.querySelectorAll('details').forEach(d => d.open = allOpen); }

  const tabs = ['reading', 'frequencies', 'deviate', 'practical'];
  const tabLabels = { reading: 'Reading Output', frequencies: 'Frequencies', deviate: 'When to Deviate', practical: 'Practical Tips' };
</script>

<div class="solver" bind:this={sectionEl}>
  <h2>Solver Interpretation</h2>
  <p class="intro">
    Solvers compute game-theory optimal strategies, but understanding their output is a skill in itself.
    Learn to read solver results, understand mixed strategies, and know when to deviate from solver play.
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
    <button class="toggle-all-btn" onclick={toggleAll}>
      {allOpen ? 'Close All' : 'Open All'}
    </button>
  </div>

  <!-- ── READING OUTPUT ── -->
  {#if activeTab === 'reading'}
    <div role="tabpanel">
      <div class="section-header">
        <h3>How to Read Solver Results</h3>
        <p class="section-note">
          Understanding what a solver is telling you is the first step to using it effectively.
          These concepts will help you interpret any solver's output.
        </p>
      </div>
      <div class="concepts-grid">
        {#each readingOutput as item}
          <details class="concept-card">
            <summary class="concept-title">{item.title}</summary>
            <p class="concept-body">{item.body}</p>
          </details>
        {/each}
      </div>
    </div>

  <!-- ── FREQUENCIES ── -->
  {:else if activeTab === 'frequencies'}
    <div role="tabpanel">
      <div class="section-header">
        <h3>Understanding Mixed Strategies & Frequencies</h3>
        <p class="section-note">
          Solvers often recommend mixing actions with specific frequencies. Understanding why they mix
          and how to implement this in practice is crucial for applying solver work at the table.
        </p>
      </div>
      <div class="concepts-grid">
        {#each frequencyConcepts as item}
          <details class="concept-card">
            <summary class="concept-title">{item.title}</summary>
            <p class="concept-body">{item.body}</p>
          </details>
        {/each}
      </div>

      <div class="callout" style="margin-top:4px;">
        <span class="callout-icon">♣</span>
        <div>
          <strong>Practical frequency tip</strong>
          <p class="callout-body">
            Don't try to randomize at the table. Instead, convert solver frequencies into simple rules:
            "If the solver says bet 70% and check 30%, I'll bet everything except my weakest hands in the
            betting range." This captures most of the EV without the mental overhead.
          </p>
        </div>
      </div>
    </div>

  <!-- ── WHEN TO DEVIATE ── -->
  {:else if activeTab === 'deviate'}
    <div role="tabpanel">
      <div class="section-header">
        <h3>When to Deviate from Solver Play</h3>
        <p class="section-note">
          GTO is the baseline, but real-world poker has exploitable opponents, ICM, and imperfect information.
          Knowing when to deviate is what makes solver study truly profitable.
        </p>
      </div>
      <div class="concepts-grid">
        {#each whenToDeviate as item}
          <details class="concept-card">
            <summary class="concept-title">{item.title}</summary>
            <p class="concept-body">{item.body}</p>
          </details>
        {/each}
      </div>
    </div>

  <!-- ── PRACTICAL TIPS ── -->
  {:else if activeTab === 'practical'}
    <div role="tabpanel">
      <div class="section-header">
        <h3>Practical Application</h3>
        <p class="section-note">
          Solver study is only valuable if you can apply it at the table. These tips will help you
          translate solver output into actionable strategies you can use in real games.
        </p>
      </div>
      <div class="concepts-grid">
        {#each practicalTips as item}
          <details class="concept-card">
            <summary class="concept-title">{item.title}</summary>
            <p class="concept-body">{item.body}</p>
          </details>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .solver { display: flex; flex-direction: column; gap: 20px; }

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
