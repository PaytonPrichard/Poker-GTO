<script>
  import { glossary, categories } from './data/glossary.js';

  let search      = $state('');
  let activecat   = $state('All');
  let expandedTerm = $state(null);

  let filtered = $derived(
    glossary.filter(g => {
      const matchesCat    = activecat === 'All' || g.category === activecat;
      const q             = search.toLowerCase();
      const matchesSearch = !q
        || g.term.toLowerCase().includes(q)
        || g.full.toLowerCase().includes(q)
        || g.definition.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    })
  );

  const categoryColors = {
    Positions: '#1d4ed8',
    Preflop:   '#166534',
    Postflop:  '#92400e',
    Theory:    '#581c87',
  };
</script>

<div class="glossary">
  <h2>Glossary</h2>
  <p class="intro">
    Poker and GTO terminology explained. Hover over highlighted terms anywhere in the app for a quick definition.
  </p>

  <!-- Search + filter bar -->
  <div class="controls">
    <div class="search-wrap">
      <span class="search-icon">⌕</span>
      <input
        class="search"
        type="text"
        placeholder="Search terms…"
        bind:value={search}
      />
      {#if search}
        <button class="clear-btn" onclick={() => search = ''}>✕</button>
      {/if}
    </div>
    <div class="cat-filters">
      {#each categories as cat}
        <button
          class="cat-btn"
          class:active={activecat === cat}
          style={activecat === cat && cat !== 'All' ? `background: ${categoryColors[cat]}22; border-color: ${categoryColors[cat]}; color: var(--c-text-h);` : ''}
          onclick={() => activecat = cat}
        >{cat}</button>
      {/each}
    </div>
  </div>

  <!-- Results count -->
  <div class="result-count">
    {filtered.length} term{filtered.length !== 1 ? 's' : ''}
    {#if search || activecat !== 'All'} matching current filters{/if}
  </div>

  <!-- Term cards -->
  {#if filtered.length === 0}
    <div class="empty">No terms match your search.</div>
  {:else}
    <div class="term-grid">
      {#each filtered as g (g.term)}
        <div
          class="term-card"
          class:expanded={expandedTerm === g.term}
          onclick={() => expandedTerm = expandedTerm === g.term ? null : g.term}
          onkeydown={e => (e.key === 'Enter' || e.key === ' ') && (expandedTerm = expandedTerm === g.term ? null : g.term)}
          role="button"
          tabindex="0"
          aria-expanded={expandedTerm === g.term}
        >
          <div class="term-header">
            <div class="term-left">
              <span
                class="cat-dot"
                style="background: {categoryColors[g.category] ?? '#4a5568'}"
              ></span>
              <span class="term-abbr">{g.term}</span>
              {#if g.full !== g.term}
                <span class="term-full">{g.full}</span>
              {/if}
            </div>
            <div class="term-right">
              <span
                class="cat-label"
                style="color: {categoryColors[g.category] ?? '#4a5568'}"
              >{g.category}</span>
              <span class="expand-icon">{expandedTerm === g.term ? '−' : '+'}</span>
            </div>
          </div>

          <!-- Preview (first sentence) always visible -->
          <p class="term-preview">
            {g.definition.split('.')[0]}.
          </p>

          <!-- Full definition on expand -->
          {#if expandedTerm === g.term && g.definition.includes('.')}
            <p class="term-full-def">
              {g.definition}
            </p>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .glossary { display: flex; flex-direction: column; gap: 18px; }

  h2 { font-size: 20px; font-weight: 700; color: var(--c-text-h); margin: 0; }

  .intro { font-size: 13px; color: var(--c-text-3); margin: 0; line-height: 1.5; }

  /* ── Controls ── */
  .controls { display: flex; flex-direction: column; gap: 10px; }

  .search-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }
  .search-icon {
    position: absolute;
    left: 10px;
    color: var(--c-text-4);
    font-size: 16px;
    pointer-events: none;
  }
  .search {
    width: 100%;
    max-width: 360px;
    padding: 8px 12px 8px 32px;
    background: var(--c-bg-card);
    border: 1px solid var(--c-border);
    border-radius: 6px;
    color: var(--c-text);
    font-size: 13px;
    font-family: inherit;
    outline: none;
    transition: border-color 0.15s;
  }
  .search:focus { border-color: var(--c-accent); }
  .search::placeholder { color: #4a5568; }

  .clear-btn {
    position: absolute;
    right: calc(100% - 360px + 10px);
    background: none;
    border: none;
    color: var(--c-text-4);
    font-size: 12px;
    cursor: pointer;
    padding: 2px 4px;
  }
  .clear-btn:hover { color: var(--c-text); }

  .cat-filters { display: flex; gap: 6px; flex-wrap: wrap; }

  .cat-btn {
    padding: 5px 14px;
    border-radius: 20px;
    border: 1px solid var(--c-border);
    background: var(--c-bg-card);
    color: var(--c-text-4);
    font-size: 12px; font-weight: 600;
    cursor: pointer; transition: all 0.15s;
  }
  .cat-btn:hover  { color: var(--c-text); border-color: #3a4459; }
  .cat-btn.active { background: var(--c-bg-nav-active); border-color: var(--c-accent-dark); color: var(--c-accent); }

  .result-count {
    font-size: 11px; color: #4a5568;
  }

  /* ── Term cards ── */
  .term-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 10px;
  }

  .term-card {
    background: var(--c-bg-card);
    border: 1px solid var(--c-border);
    border-radius: 8px;
    padding: 12px 14px;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
    user-select: none;
  }
  .term-card:hover   { border-color: #3a4459; background: var(--c-bg-hover); }
  .term-card.expanded { border-color: var(--c-accent); background: var(--c-bg-callout); }

  .term-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 6px;
  }

  .term-left  { display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0; }
  .term-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

  .cat-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .term-abbr {
    font-size: 14px; font-weight: 800;
    color: var(--c-text-h);
    white-space: nowrap;
  }

  .term-full {
    font-size: 11px; color: var(--c-text-4);
    white-space: nowrap; overflow: hidden;
    text-overflow: ellipsis;
  }

  .cat-label {
    font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em;
  }

  .expand-icon {
    font-size: 16px; color: var(--c-text-4);
    width: 16px; text-align: center;
    line-height: 1;
  }

  .term-preview {
    font-size: 12px; color: var(--c-text-3);
    margin: 0; line-height: 1.5;
  }

  .term-full-def {
    font-size: 12px; color: #a0aec0;
    margin: 8px 0 0; line-height: 1.6;
    border-top: 1px solid var(--c-border);
    padding-top: 8px;
  }

  .empty {
    color: #4a5568; font-size: 14px;
    padding: 40px; text-align: center;
  }
</style>
