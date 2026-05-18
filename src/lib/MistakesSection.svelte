<script>
  import {
    preflopLeaks,
    postflopLeaks,
    mentalGame,
    sizingMistakes,
  } from './data/mistakes.js';

  let activeTab = $state('preflop');
  let sectionEl;
  let allOpen = $state(false);
  function toggleAll() { allOpen = !allOpen; sectionEl?.querySelectorAll('details').forEach(d => d.open = allOpen); }

  const tabs = ['preflop', 'postflop', 'mental', 'sizing'];
  const tabLabels = { preflop: 'Preflop Leaks', postflop: 'Postflop Leaks', mental: 'Mental Game', sizing: 'Sizing Errors' };

  function sevColor(sev) {
    if (sev === 'high') return '#ef4444';
    if (sev === 'medium') return '#f59e0b';
    return '#52b788';
  }
  function sevLabel(sev) {
    if (sev === 'high') return 'HIGH';
    if (sev === 'medium') return 'MED';
    return 'LOW';
  }

  // Sort leaks high → medium → low
  const sevRank = { high: 3, medium: 2, low: 1 };
  const sortedPreflopLeaks = [...preflopLeaks].sort((a, b) => (sevRank[b.severity] ?? 0) - (sevRank[a.severity] ?? 0));
  const sortedPostflopLeaks = [...postflopLeaks].sort((a, b) => (sevRank[b.severity] ?? 0) - (sevRank[a.severity] ?? 0));

  // ── Quick Test (inline mini-quiz, all tabs) ─────────────────────────────
  function pickThreeTitles(pool, correctIdx) {
    const correct = pool[correctIdx].title;
    const others = pool
      .filter((_, i) => i !== correctIdx)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map(p => p.title);
    return [correct, ...others].sort(() => Math.random() - 0.5);
  }

  // Preflop/postflop leak tabs: flipped — prompt is the short `fix`, guess the leak title
  let preflopQuizIdx = $state(Math.floor(Math.random() * preflopLeaks.length));
  let preflopQuizPicked = $state(null);
  let preflopQuiz = $derived(preflopLeaks[preflopQuizIdx]);
  let preflopQuizOptions = $derived.by(() => pickThreeTitles(preflopLeaks, preflopQuizIdx));

  let postflopQuizIdx = $state(Math.floor(Math.random() * postflopLeaks.length));
  let postflopQuizPicked = $state(null);
  let postflopQuiz = $derived(postflopLeaks[postflopQuizIdx]);
  let postflopQuizOptions = $derived.by(() => pickThreeTitles(postflopLeaks, postflopQuizIdx));

  // Mental/sizing tabs: standard — prompt is the short `body`, guess the title
  let mentalQuizIdx = $state(Math.floor(Math.random() * mentalGame.length));
  let mentalQuizPicked = $state(null);
  let mentalQuiz = $derived(mentalGame[mentalQuizIdx]);
  let mentalQuizOptions = $derived.by(() => pickThreeTitles(mentalGame, mentalQuizIdx));

  let sizingQuizIdx = $state(Math.floor(Math.random() * sizingMistakes.length));
  let sizingQuizPicked = $state(null);
  let sizingQuiz = $derived(sizingMistakes[sizingQuizIdx]);
  let sizingQuizOptions = $derived.by(() => pickThreeTitles(sizingMistakes, sizingQuizIdx));

  function nextQuiz(which) {
    if (which === 'preflop') {
      let n = Math.floor(Math.random() * preflopLeaks.length);
      if (n === preflopQuizIdx && preflopLeaks.length > 1) n = (n + 1) % preflopLeaks.length;
      preflopQuizIdx = n; preflopQuizPicked = null;
    } else if (which === 'postflop') {
      let n = Math.floor(Math.random() * postflopLeaks.length);
      if (n === postflopQuizIdx && postflopLeaks.length > 1) n = (n + 1) % postflopLeaks.length;
      postflopQuizIdx = n; postflopQuizPicked = null;
    } else if (which === 'mental') {
      let n = Math.floor(Math.random() * mentalGame.length);
      if (n === mentalQuizIdx && mentalGame.length > 1) n = (n + 1) % mentalGame.length;
      mentalQuizIdx = n; mentalQuizPicked = null;
    } else if (which === 'sizing') {
      let n = Math.floor(Math.random() * sizingMistakes.length);
      if (n === sizingQuizIdx && sizingMistakes.length > 1) n = (n + 1) % sizingMistakes.length;
      sizingQuizIdx = n; sizingQuizPicked = null;
    }
  }
</script>

<div class="mistakes" bind:this={sectionEl}>
  <h2>Common Mistakes & Leaks</h2>
  <p class="intro">
    Identify and fix the most common leaks that cost you win rate.
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

  <!-- ── PREFLOP LEAKS ── -->
  {#if activeTab === 'preflop'}
    <div role="tabpanel">
      <div class="section-header">
        <h3>Preflop Mistakes</h3>
        <p class="section-note">
          Preflop leaks compound across every hand — fix these first.
        </p>
      </div>

      <!-- Quick Test — show fix, guess the leak -->
      <div class="quick-test">
        <div class="qt-header">
          <span class="qt-label">Fix For Which Leak?</span>
          <span class="qt-situation">{preflopQuiz.fix}</span>
        </div>
        {#if preflopQuizPicked === null}
          <div class="qt-options">
            {#each preflopQuizOptions as opt}
              <button class="qt-option" onclick={() => preflopQuizPicked = opt}>{opt}</button>
            {/each}
          </div>
        {:else}
          {@const correct = preflopQuizPicked === preflopQuiz.title}
          <div class="qt-result" class:correct class:wrong={!correct}>
            <span class="qt-mark">{correct ? '✓' : '✗'}</span>
            <span>Leak: <strong>{preflopQuiz.title}</strong></span>
            <button class="qt-next" onclick={() => nextQuiz('preflop')}>Next →</button>
          </div>
        {/if}
      </div>

      <div class="leak-cards">
        {#each sortedPreflopLeaks as leak}
          <details class="leak-card">
            <summary class="leak-header">
              <span class="leak-title">{leak.title}</span>
              <span class="sev-badge" style="color:{sevColor(leak.severity)};border-color:{sevColor(leak.severity)}"
                data-tooltip-title="{sevLabel(leak.severity)} Severity" data-tooltip="{leak.severity === 'high' ? 'Major leak — fixing this has a large impact on your win rate. Prioritize this.' : leak.severity === 'medium' ? 'Moderate leak — costs you meaningful EV over time. Address after fixing high-severity leaks.' : 'Minor leak — small impact but still worth fixing for long-term improvement.'}">
                {sevLabel(leak.severity)}
              </span>
            </summary>
            <div class="leak-body">
              <p class="leak-desc">{leak.description}</p>
              <div class="fix-row">
                <span class="fix-label">Fix</span>
                <span class="fix-text">{leak.fix}</span>
              </div>
            </div>
          </details>
        {/each}
      </div>
    </div>

  <!-- ── POSTFLOP LEAKS ── -->
  {:else if activeTab === 'postflop'}
    <div role="tabpanel">
      <div class="section-header">
        <h3>Postflop Mistakes</h3>
        <p class="section-note">
          Costly postflop errors that are harder to spot than preflop leaks.
        </p>
      </div>

      <!-- Quick Test — show fix, guess the leak -->
      <div class="quick-test">
        <div class="qt-header">
          <span class="qt-label">Fix For Which Leak?</span>
          <span class="qt-situation">{postflopQuiz.fix}</span>
        </div>
        {#if postflopQuizPicked === null}
          <div class="qt-options">
            {#each postflopQuizOptions as opt}
              <button class="qt-option" onclick={() => postflopQuizPicked = opt}>{opt}</button>
            {/each}
          </div>
        {:else}
          {@const correct = postflopQuizPicked === postflopQuiz.title}
          <div class="qt-result" class:correct class:wrong={!correct}>
            <span class="qt-mark">{correct ? '✓' : '✗'}</span>
            <span>Leak: <strong>{postflopQuiz.title}</strong></span>
            <button class="qt-next" onclick={() => nextQuiz('postflop')}>Next →</button>
          </div>
        {/if}
      </div>

      <div class="leak-cards">
        {#each sortedPostflopLeaks as leak}
          <details class="leak-card">
            <summary class="leak-header">
              <span class="leak-title">{leak.title}</span>
              <span class="sev-badge" style="color:{sevColor(leak.severity)};border-color:{sevColor(leak.severity)}"
                data-tooltip-title="{sevLabel(leak.severity)} Severity" data-tooltip="{leak.severity === 'high' ? 'Major leak — fixing this has a large impact on your win rate. Prioritize this.' : leak.severity === 'medium' ? 'Moderate leak — costs you meaningful EV over time. Address after fixing high-severity leaks.' : 'Minor leak — small impact but still worth fixing for long-term improvement.'}">
                {sevLabel(leak.severity)}
              </span>
            </summary>
            <div class="leak-body">
              <p class="leak-desc">{leak.description}</p>
              <div class="fix-row">
                <span class="fix-label">Fix</span>
                <span class="fix-text">{leak.fix}</span>
              </div>
            </div>
          </details>
        {/each}
      </div>
    </div>

  <!-- ── MENTAL GAME ── -->
  {:else if activeTab === 'mental'}
    <div role="tabpanel">
      <div class="section-header">
        <h3>Mental Game</h3>
      <p class="section-note">
          Strategy falls apart when emotions take over.
        </p>
      </div>

      <!-- Quick Test -->
      <div class="quick-test">
        <div class="qt-header">
          <span class="qt-label">Quick Test</span>
          <span class="qt-situation">{mentalQuiz.body}</span>
        </div>
        {#if mentalQuizPicked === null}
          <div class="qt-options">
            {#each mentalQuizOptions as opt}
              <button class="qt-option" onclick={() => mentalQuizPicked = opt}>{opt}</button>
            {/each}
          </div>
        {:else}
          {@const correct = mentalQuizPicked === mentalQuiz.title}
          <div class="qt-result" class:correct class:wrong={!correct}>
            <span class="qt-mark">{correct ? '✓' : '✗'}</span>
            <span>Concept: <strong>{mentalQuiz.title}</strong></span>
            <button class="qt-next" onclick={() => nextQuiz('mental')}>Next →</button>
          </div>
        {/if}
      </div>

      <div class="concepts-grid">
        {#each mentalGame as item}
          <details class="concept-card">
            <summary class="concept-title">{item.title}</summary>
            <p class="concept-body">{item.body}</p>
          </details>
        {/each}
      </div>
    </div>

  <!-- ── SIZING ERRORS ── -->
  {:else if activeTab === 'sizing'}
    <div role="tabpanel">
      <div class="section-header">
        <h3>Sizing Mistakes</h3>
        <p class="section-note">
          Sizing errors that leave money on the table or give opponents easy decisions.
        </p>
      </div>

      <!-- Quick Test -->
      <div class="quick-test">
        <div class="qt-header">
          <span class="qt-label">Quick Test</span>
          <span class="qt-situation">{sizingQuiz.body}</span>
        </div>
        {#if sizingQuizPicked === null}
          <div class="qt-options">
            {#each sizingQuizOptions as opt}
              <button class="qt-option" onclick={() => sizingQuizPicked = opt}>{opt}</button>
            {/each}
          </div>
        {:else}
          {@const correct = sizingQuizPicked === sizingQuiz.title}
          <div class="qt-result" class:correct class:wrong={!correct}>
            <span class="qt-mark">{correct ? '✓' : '✗'}</span>
            <span>Mistake: <strong>{sizingQuiz.title}</strong></span>
            <button class="qt-next" onclick={() => nextQuiz('sizing')}>Next →</button>
          </div>
        {/if}
      </div>

      <div class="concepts-grid">
        {#each sizingMistakes as item}
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
  .mistakes { display: flex; flex-direction: column; gap: 20px; }

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

  /* Leak cards */
  .leak-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
    gap: 10px;
    align-items: start;
  }
  .leak-card {
    background: var(--c-bg-card); border: 1px solid var(--c-border);
    border-radius: 8px; overflow: hidden;
  }
  .leak-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 14px; background: var(--c-bg-header);
    border-bottom: 1px solid var(--c-border); gap: 12px; flex-wrap: wrap;
  }
  .leak-title { font-size: 14px; color: var(--c-text); font-weight: 600; }
  .sev-badge {
    font-size: 11px; font-weight: 700;
    padding: 2px 8px; border-radius: 4px;
    border: 1px solid;
    text-transform: uppercase; letter-spacing: 0.05em;
    white-space: nowrap;
  }
  .leak-body { padding: 12px 14px; display: flex; flex-direction: column; gap: 10px; }
  .leak-desc { font-size: 13px; color: var(--c-text-2); line-height: 1.6; margin: 0; }
  .fix-row {
    display: flex; gap: 10px; align-items: baseline;
    padding: 8px 10px; background: var(--c-bg-subtle); border-radius: 6px;
  }
  .fix-label {
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.07em;
    color: #52b788; min-width: 30px; flex-shrink: 0;
  }
  .fix-text { font-size: 13px; color: var(--c-text-2); line-height: 1.5; }

  /* Concepts grid */
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

  /* Collapsible cards */
  summary { cursor: pointer; list-style: none; user-select: none; }
  summary::-webkit-details-marker { display: none; }
  .concept-title::after, .leak-header::after { content: '›'; font-size: 18px; font-weight: 400; color: var(--c-text-4); transition: transform 0.2s; flex-shrink: 0; margin-left: auto; padding-left: 8px; }
  details[open] > summary::after { transform: rotate(90deg); }
  details.concept-card:not([open]) > .concept-title { margin-bottom: 0; }
  details:hover:not([open]) { border-color: var(--c-accent-dark); }
  details.leak-card:not([open]) > .leak-header { border-bottom: none; }
</style>
