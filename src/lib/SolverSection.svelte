<script>
  import {
    readingOutput,
    frequencyConcepts,
    whenToDeviate,
    practicalTips,
  } from './data/solver.js';

  let activeTab = $state('practical');
  let sectionEl;
  let allOpen = $state(false);
  function toggleAll() { allOpen = !allOpen; sectionEl?.querySelectorAll('details').forEach(d => d.open = allOpen); }

  const tabs = ['practical', 'frequencies', 'reading', 'deviate'];
  const tabLabels = { practical: 'Practical Tips', frequencies: 'Frequencies', reading: 'Reading Output', deviate: 'When to Deviate' };

  // ── Quick Test (inline mini-quiz) ────────────────────────────────────────
  function pickThreeTitles(pool, correctIdx) {
    const correct = pool[correctIdx].title;
    const others = pool
      .filter((_, i) => i !== correctIdx)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map(p => p.title);
    return [correct, ...others].sort(() => Math.random() - 0.5);
  }

  // One quiz state per tab
  let readQuizIdx = $state(Math.floor(Math.random() * readingOutput.length));
  let readQuizPicked = $state(null);
  let readQuiz = $derived(readingOutput[readQuizIdx]);
  let readQuizOptions = $derived.by(() => pickThreeTitles(readingOutput, readQuizIdx));

  let freqQuizIdx = $state(Math.floor(Math.random() * frequencyConcepts.length));
  let freqQuizPicked = $state(null);
  let freqQuiz = $derived(frequencyConcepts[freqQuizIdx]);
  let freqQuizOptions = $derived.by(() => pickThreeTitles(frequencyConcepts, freqQuizIdx));

  let devQuizIdx = $state(Math.floor(Math.random() * whenToDeviate.length));
  let devQuizPicked = $state(null);
  let devQuiz = $derived(whenToDeviate[devQuizIdx]);
  let devQuizOptions = $derived.by(() => pickThreeTitles(whenToDeviate, devQuizIdx));

  let pracQuizIdx = $state(Math.floor(Math.random() * practicalTips.length));
  let pracQuizPicked = $state(null);
  let pracQuiz = $derived(practicalTips[pracQuizIdx]);
  let pracQuizOptions = $derived.by(() => pickThreeTitles(practicalTips, pracQuizIdx));

  function nextQuiz(which) {
    if (which === 'read') {
      let n = Math.floor(Math.random() * readingOutput.length);
      if (n === readQuizIdx && readingOutput.length > 1) n = (n + 1) % readingOutput.length;
      readQuizIdx = n; readQuizPicked = null;
    } else if (which === 'freq') {
      let n = Math.floor(Math.random() * frequencyConcepts.length);
      if (n === freqQuizIdx && frequencyConcepts.length > 1) n = (n + 1) % frequencyConcepts.length;
      freqQuizIdx = n; freqQuizPicked = null;
    } else if (which === 'dev') {
      let n = Math.floor(Math.random() * whenToDeviate.length);
      if (n === devQuizIdx && whenToDeviate.length > 1) n = (n + 1) % whenToDeviate.length;
      devQuizIdx = n; devQuizPicked = null;
    } else if (which === 'prac') {
      let n = Math.floor(Math.random() * practicalTips.length);
      if (n === pracQuizIdx && practicalTips.length > 1) n = (n + 1) % practicalTips.length;
      pracQuizIdx = n; pracQuizPicked = null;
    }
  }
</script>

<div class="solver" bind:this={sectionEl}>
  <h2>Solver Interpretation</h2>
  <p class="intro">
    Read solver output, understand mixed strategies, and know when to deviate.
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
          Key concepts for interpreting any solver's output.
        </p>
      </div>

      <!-- Quick Test -->
      <div class="quick-test">
        <div class="qt-header">
          <span class="qt-label">Quick Test</span>
          <span class="qt-situation">{readQuiz.body}</span>
        </div>
        {#if readQuizPicked === null}
          <div class="qt-options">
            {#each readQuizOptions as opt}
              <button class="qt-option" onclick={() => readQuizPicked = opt}>{opt}</button>
            {/each}
          </div>
        {:else}
          {@const correct = readQuizPicked === readQuiz.title}
          <div class="qt-result" class:correct class:wrong={!correct}>
            <span class="qt-mark">{correct ? '✓' : '✗'}</span>
            <span>Concept: <strong>{readQuiz.title}</strong></span>
            <button class="qt-next" onclick={() => nextQuiz('read')}>Next →</button>
          </div>
        {/if}
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
          Why solvers mix actions and how to implement frequencies in practice.
        </p>
      </div>

      <!-- Quick Test -->
      <div class="quick-test">
        <div class="qt-header">
          <span class="qt-label">Quick Test</span>
          <span class="qt-situation">{freqQuiz.body}</span>
        </div>
        {#if freqQuizPicked === null}
          <div class="qt-options">
            {#each freqQuizOptions as opt}
              <button class="qt-option" onclick={() => freqQuizPicked = opt}>{opt}</button>
            {/each}
          </div>
        {:else}
          {@const correct = freqQuizPicked === freqQuiz.title}
          <div class="qt-result" class:correct class:wrong={!correct}>
            <span class="qt-mark">{correct ? '✓' : '✗'}</span>
            <span>Concept: <strong>{freqQuiz.title}</strong></span>
            <button class="qt-next" onclick={() => nextQuiz('freq')}>Next →</button>
          </div>
        {/if}
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
            Convert frequencies into simple rules: "Bet 70% → bet everything except the weakest hands in range." Captures most EV without mental overhead.
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
          GTO is the baseline — deviate when opponents are exploitable.
        </p>
      </div>

      <!-- Quick Test -->
      <div class="quick-test">
        <div class="qt-header">
          <span class="qt-label">Quick Test</span>
          <span class="qt-situation">{devQuiz.body}</span>
        </div>
        {#if devQuizPicked === null}
          <div class="qt-options">
            {#each devQuizOptions as opt}
              <button class="qt-option" onclick={() => devQuizPicked = opt}>{opt}</button>
            {/each}
          </div>
        {:else}
          {@const correct = devQuizPicked === devQuiz.title}
          <div class="qt-result" class:correct class:wrong={!correct}>
            <span class="qt-mark">{correct ? '✓' : '✗'}</span>
            <span>Concept: <strong>{devQuiz.title}</strong></span>
            <button class="qt-next" onclick={() => nextQuiz('dev')}>Next →</button>
          </div>
        {/if}
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
          Translate solver output into actionable table strategy.
        </p>
      </div>

      <!-- Quick Test -->
      <div class="quick-test">
        <div class="qt-header">
          <span class="qt-label">Quick Test</span>
          <span class="qt-situation">{pracQuiz.body}</span>
        </div>
        {#if pracQuizPicked === null}
          <div class="qt-options">
            {#each pracQuizOptions as opt}
              <button class="qt-option" onclick={() => pracQuizPicked = opt}>{opt}</button>
            {/each}
          </div>
        {:else}
          {@const correct = pracQuizPicked === pracQuiz.title}
          <div class="qt-result" class:correct class:wrong={!correct}>
            <span class="qt-mark">{correct ? '✓' : '✗'}</span>
            <span>Tip: <strong>{pracQuiz.title}</strong></span>
            <button class="qt-next" onclick={() => nextQuiz('prac')}>Next →</button>
          </div>
        {/if}
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

  /* ── Quick Test (inline mini-quiz) ── */
  .quick-test {
    background: var(--c-bg-card);
    border: 1px solid var(--c-border-accent, var(--c-accent));
    border-left: 3px solid var(--c-accent);
    border-radius: 7px;
    padding: 12px 14px;
    margin: 4px 0 8px;
    display: flex; flex-direction: column; gap: 10px;
  }
  .qt-header { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
  .qt-label {
    font-size: 10px; font-weight: 800; text-transform: uppercase;
    letter-spacing: 0.1em; color: var(--c-accent);
  }
  .qt-situation { font-size: 14px; color: var(--c-text); font-weight: 500; line-height: 1.5; }
  .qt-options { display: flex; gap: 6px; flex-wrap: wrap; }
  .qt-option {
    padding: 6px 14px; border-radius: 5px;
    border: 1px solid var(--c-border); background: var(--c-bg-header);
    color: var(--c-text); font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.15s;
  }
  .qt-option:hover { border-color: var(--c-accent); }
  .qt-result {
    display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
    font-size: 13px; color: var(--c-text); line-height: 1.5;
  }
  .qt-mark {
    font-size: 16px; font-weight: 800;
    width: 22px; height: 22px; display: inline-flex;
    align-items: center; justify-content: center;
    border-radius: 50%;
  }
  .qt-result.correct .qt-mark { background: #14532d; color: #d1fae5; }
  .qt-result.wrong .qt-mark   { background: #7f1d1d; color: #fecaca; }
  .qt-result strong { color: var(--c-text); }
  .qt-next {
    margin-left: auto;
    padding: 4px 12px; border-radius: 5px;
    border: 1px solid var(--c-border); background: var(--c-bg-header);
    color: var(--c-text-3); font-size: 12px; font-weight: 600; cursor: pointer;
    transition: all 0.15s;
  }
  .qt-next:hover { color: var(--c-text); border-color: var(--c-accent); }

  .concepts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 10px;
    align-items: start;
  }
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
