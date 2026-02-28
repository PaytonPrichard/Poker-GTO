<script>
  import PreflopSection    from './lib/PreflopSection.svelte';
  import PostflopSection   from './lib/PostflopSection.svelte';
  import GlossarySection   from './lib/GlossarySection.svelte';
  import BetSizingSection  from './lib/BetSizingSection.svelte';
  import EquitySection     from './lib/EquitySection.svelte';
  import MultiwaySection   from './lib/MultiwaySection.svelte';
  import BluffingSection   from './lib/BluffingSection.svelte';
  import TournamentSection from './lib/TournamentSection.svelte';
  import HandReadingSection from './lib/HandReadingSection.svelte';
  import PositionSection    from './lib/PositionSection.svelte';
  import BankrollSection    from './lib/BankrollSection.svelte';
  import MistakesSection    from './lib/MistakesSection.svelte';
  import SolverSection      from './lib/SolverSection.svelte';
  import SessionNotes       from './lib/SessionNotes.svelte';
  import QuizSection        from './lib/QuizSection.svelte';
  import ChatAssistant      from './lib/ChatAssistant.svelte';
  import CheatSheet         from './lib/CheatSheet.svelte';
  import RangeBuilder       from './lib/RangeBuilder.svelte';
  import { buildSearchIndex, sectionLabels } from './lib/data/searchIndex.js';

  let activeSection = $state(localStorage.getItem('activeSection') ?? 'preflop');
  $effect(() => { localStorage.setItem('activeSection', activeSection); });

  const sections = [
    { id: 'preflop',     label: 'Preflop Ranges',    icon: '♠',  color: '#52b788', ready: true },
    { id: 'postflop',    label: 'Postflop Play',      icon: '♥',  color: '#ef4444', ready: true },
    { id: 'glossary',    label: 'Glossary',            icon: '≡',  color: '#8b5cf6', ready: true },
    { id: 'sizing',      label: 'Bet Sizing Theory',  icon: '◆',  color: '#f59e0b', ready: true },
    { id: 'equity',      label: 'Hand Equity',         icon: '♦',  color: '#3b82f6', ready: true },
    { id: 'multiway',    label: 'Multiway Pots',       icon: '♣',  color: '#14b8a6', ready: true },
    { id: 'bluffing',    label: 'Bluffing & Reads',   icon: '✦',  color: '#ec4899', ready: true },
    { id: 'tournament',  label: 'Tournament Play',    icon: '★',  color: '#eab308', ready: true },
    { id: 'handreading', label: 'Hand Reading',        icon: '◎',  color: '#06b6d4', ready: true },
    { id: 'position',    label: 'Position Strategy',  icon: '⊞',  color: '#a78bfa', ready: true },
    { id: 'bankroll',    label: 'Bankroll Management', icon: '$',  color: '#22c55e', ready: true, shortcut: 'B' },
    { id: 'mistakes',    label: 'Common Mistakes',     icon: '⚠',  color: '#f97316', ready: true, shortcut: 'M' },
    { id: 'solver',      label: 'Solver Guide',        icon: '⚙',  color: '#60a5fa', ready: true, shortcut: 'S' },
    { id: 'cheatsheet',  label: 'Cheat Sheet',         icon: '▤',  color: '#10b981', ready: true, shortcut: 'C' },
    { id: 'range-builder', label: 'Range Builder',     icon: '▦',  color: '#6366f1', ready: true, shortcut: 'R' },
    { id: 'quiz',        label: 'Quiz Mode',           icon: '✧',  color: '#c084fc', ready: true, shortcut: 'Q' },
    { id: 'notes',       label: 'Session Notes',       icon: '✎',  color: '#a8a29e', ready: true, shortcut: 'N' },
  ];

  // ── Mobile sidebar ─────────────────────────────────────────────────────────
  let sidebarOpen = $state(false);

  function navigateTo(id) {
    activeSection = id;
    sidebarOpen = false;
    searchQuery = '';
  }

  // ── Global search ───────────────────────────────────────────────────────────
  let searchQuery = $state('');
  let searchIndex = $state([]);
  let searchInputEl = $state(null);

  $effect(() => {
    searchIndex = buildSearchIndex();
  });

  let searchResults = $derived.by(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length < 2) return [];
    return searchIndex.filter(item => item.text.includes(q)).slice(0, 8);
  });

  // ── Keyboard shortcuts ──────────────────────────────────────────────────────
  let showHelp = $state(false);

  function handleKeydown(e) {
    const tag = e.target?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    if (e.key === '?') {
      e.preventDefault();
      showHelp = !showHelp;
      return;
    }
    if (e.key === 'Escape') {
      if (showHelp) { showHelp = false; return; }
      if (sidebarOpen) { sidebarOpen = false; return; }
      if (searchQuery) { searchQuery = ''; return; }
      return;
    }
    if (e.key === '/') {
      e.preventDefault();
      searchInputEl?.focus();
      sidebarOpen = true;
      return;
    }
    if (e.key === '[') {
      e.preventDefault();
      const idx = sections.findIndex(s => s.id === activeSection);
      if (idx > 0) activeSection = sections[idx - 1].id;
      return;
    }
    if (e.key === ']') {
      e.preventDefault();
      const idx = sections.findIndex(s => s.id === activeSection);
      if (idx < sections.length - 1) activeSection = sections[idx + 1].id;
      return;
    }
    // Number keys 1-9 → sections 0-8, 0 → section 9
    const num = parseInt(e.key);
    if (!isNaN(num) && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const idx = num === 0 ? 9 : num - 1;
      if (idx < sections.length && sections[idx].ready) {
        e.preventDefault();
        activeSection = sections[idx].id;
      }
      return;
    }
    // Letter shortcuts for sections 11+
    const letter = e.key.toUpperCase();
    const match = sections.find(s => s.shortcut === letter);
    if (match && match.ready && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      activeSection = match.id;
    }
  }

  // ── Global tooltip ────────────────────────────────────────────────────────
  let tip = $state({ visible: false, title: '', text: '', x: 0, y: 0 });

  function onMouseOver(e) {
    const el = e.target.closest('[data-tooltip]');
    if (el) {
      tip = {
        visible: true,
        title:   el.dataset.tooltipTitle ?? '',
        text:    el.dataset.tooltip,
        x: e.clientX,
        y: e.clientY,
      };
    } else {
      tip = { ...tip, visible: false };
    }
  }

  function onMouseMove(e) {
    if (tip.visible) {
      tip = { ...tip, x: e.clientX, y: e.clientY };
    }
  }

  function onMouseOut(e) {
    if (!e.relatedTarget?.closest?.('[data-tooltip]')) {
      tip = { ...tip, visible: false };
    }
  }

  let theme = $state(localStorage.getItem('theme') ?? 'dark');
  $effect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : '');
    localStorage.setItem('theme', theme);
  });
  function toggleTheme() { theme = theme === 'dark' ? 'light' : 'dark'; }

  let a11y = $state(localStorage.getItem('a11y') === 'true');
  $effect(() => {
    document.documentElement.setAttribute('data-a11y', a11y ? 'true' : '');
    localStorage.setItem('a11y', a11y);
  });
  function toggleA11y() { a11y = !a11y; }

  // ── Export / Import ─────────────────────────────────────────────────────────
  const backupKeys = ['sessionNotes', 'savedNotes', 'quizHistory', 'customRanges', 'activeSection', 'theme', 'a11y'];
  let fileInput = $state(null);

  function exportData() {
    const data = {};
    for (const key of backupKeys) {
      const val = localStorage.getItem(key);
      if (val !== null) data[key] = val;
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'felttheory-backup.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function importData(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        for (const [key, val] of Object.entries(data)) {
          if (backupKeys.includes(key)) localStorage.setItem(key, val);
        }
        location.reload();
      } catch {
        alert('Invalid backup file.');
      }
      e.target.value = '';
    };
    reader.readAsText(file);
  }

  // Flip tooltip left if near right edge of viewport
  let tipLeft = $derived.by(() => {
    if (typeof window === 'undefined') return tip.x + 14;
    return tip.x + 260 > window.innerWidth ? tip.x - 260 - 4 : tip.x + 14;
  });

  let tipTop = $derived.by(() => {
    if (typeof window === 'undefined') return tip.y - 8;
    return tip.y + 120 > window.innerHeight ? tip.y - 120 : tip.y - 8;
  });

  const shortcuts = [
    { key: '1 – 9',  desc: 'Jump to section 1–9' },
    { key: '0',      desc: 'Jump to section 10' },
    { key: 'B M S C R Q N', desc: 'Sections 11–17' },
    { key: '[ / ]',  desc: 'Previous / next section' },
    { key: '/',      desc: 'Focus search' },
    { key: '?',      desc: 'Toggle this help' },
    { key: 'Esc',    desc: 'Close overlay / sidebar / search' },
  ];
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<div
  class="app"
  onmouseover={onMouseOver}
  onfocus={onMouseOver}
  onmousemove={onMouseMove}
  onmouseout={onMouseOut}
  onblur={() => (tip = { ...tip, visible: false })}
  onkeydown={handleKeydown}
>
  <!-- Skip-to-content link for screen readers -->
  <a class="skip-link" href="#main-content">Skip to content</a>

  <!-- Mobile hamburger -->
  <button class="hamburger" onclick={() => sidebarOpen = !sidebarOpen} aria-label="Toggle navigation">
    {sidebarOpen ? '✕' : '☰'}
  </button>

  <!-- Mobile backdrop -->
  {#if sidebarOpen}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="sidebar-backdrop" onclick={() => sidebarOpen = false}></div>
  {/if}

  <aside class="sidebar" class:open={sidebarOpen}>
    <div class="brand">
      <span class="brand-icon">♠</span>
      <span class="brand-text">FeltTheory</span>
    </div>

    <!-- Global search -->
    <div class="search-wrap">
      <input
        bind:this={searchInputEl}
        bind:value={searchQuery}
        class="search-input"
        type="text"
        placeholder="Search... ( / )"
        aria-label="Search all sections"
      />
      {#if searchResults.length > 0}
        <div class="search-results">
          {#each searchResults as result}
            <button class="search-result-item" onclick={() => { navigateTo(result.section); }}>
              <span class="sr-section">{sectionLabels[result.section] ?? result.section}</span>
              <span class="sr-label">{result.label}</span>
            </button>
          {/each}
        </div>
      {/if}
    </div>

    <nav>
      {#each sections as sec, i}
        <button
          class="nav-item"
          class:active={activeSection === sec.id}
          class:disabled={!sec.ready}
          onclick={() => sec.ready && navigateTo(sec.id)}
        >
          <span class="nav-icon" style="color:{sec.color}">{sec.icon}</span>
          <span class="nav-label">{sec.label}</span>
          {#if i < 10}
            <span class="nav-shortcut">{i === 9 ? '0' : i + 1}</span>
          {:else if sec.shortcut}
            <span class="nav-shortcut">{sec.shortcut}</span>
          {/if}
          {#if !sec.ready}
            <span class="soon">soon</span>
          {/if}
        </button>
      {/each}
    </nav>
    <div class="sidebar-footer">
      <button class="theme-toggle" onclick={toggleTheme}>
        {theme === 'dark' ? '☀ Light mode' : '☾ Dark mode'}
      </button>
      <button class="theme-toggle a11y-toggle" onclick={toggleA11y}>
        {a11y ? '⊘ Standard view' : '⊕ Accessibility mode'}
      </button>
      <button class="theme-toggle" onclick={() => showHelp = !showHelp}>
        ? Keyboard shortcuts
      </button>
      <div class="data-buttons">
        <button class="theme-toggle" onclick={exportData}>
          ↓ Export data
        </button>
        <button class="theme-toggle" onclick={() => fileInput?.click()}>
          ↑ Import data
        </button>
        <input
          bind:this={fileInput}
          type="file"
          accept=".json"
          onchange={importData}
          style="display:none"
        />
      </div>
    </div>
  </aside>

  <main id="main-content" class="content" style:zoom={a11y ? 1.15 : 1} style:line-height={a11y ? '1.75' : null} style:letter-spacing={a11y ? '0.01em' : null}>
    <button class="print-btn" onclick={() => window.print()}>⎙ Print</button>
    {#if activeSection === 'preflop'}
      <PreflopSection />
    {:else if activeSection === 'postflop'}
      <PostflopSection />
    {:else if activeSection === 'glossary'}
      <GlossarySection />
    {:else if activeSection === 'sizing'}
      <BetSizingSection />
    {:else if activeSection === 'equity'}
      <EquitySection />
    {:else if activeSection === 'multiway'}
      <MultiwaySection />
    {:else if activeSection === 'bluffing'}
      <BluffingSection />
    {:else if activeSection === 'tournament'}
      <TournamentSection />
    {:else if activeSection === 'handreading'}
      <HandReadingSection />
    {:else if activeSection === 'position'}
      <PositionSection />
    {:else if activeSection === 'bankroll'}
      <BankrollSection />
    {:else if activeSection === 'mistakes'}
      <MistakesSection />
    {:else if activeSection === 'solver'}
      <SolverSection />
    {:else if activeSection === 'cheatsheet'}
      <CheatSheet />
    {:else if activeSection === 'range-builder'}
      <RangeBuilder />
    {:else if activeSection === 'quiz'}
      <QuizSection />
    {:else if activeSection === 'notes'}
      <SessionNotes />
    {:else}
      <div class="coming-soon">
        <div class="cs-icon">🃏</div>
        <h2>Coming Soon</h2>
        <p>This section is under construction.</p>
      </div>
    {/if}
  </main>

  <ChatAssistant />

  <!-- Keyboard shortcuts help overlay -->
  {#if showHelp}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="help-backdrop" onclick={() => showHelp = false}>
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <div class="help-modal" onclick={e => e.stopPropagation()}>
        <h3>Keyboard Shortcuts</h3>
        <div class="shortcut-list">
          {#each shortcuts as s}
            <div class="shortcut-row">
              <kbd>{s.key}</kbd>
              <span>{s.desc}</span>
            </div>
          {/each}
        </div>
        <button class="help-close" onclick={() => showHelp = false}>Close</button>
      </div>
    </div>
  {/if}

  <!-- Global floating tooltip -->
  {#if tip.visible && tip.text}
    <div
      class="g-tooltip"
      style="left: {tipLeft}px; top: {tipTop}px"
      role="tooltip"
      aria-hidden="true"
    >
      {#if tip.title}
        <div class="g-tip-title">{tip.title}</div>
      {/if}
      <div class="g-tip-body">{tip.text}</div>
    </div>
  {/if}
</div>

<style>
  .app {
    display: flex;
    min-height: 100vh;
    background: var(--c-bg);
    color: var(--c-text);
    font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
  }

  /* ── Skip-to-content link ── */
  .skip-link {
    position: absolute;
    left: -9999px;
    top: auto;
    z-index: 10000;
    padding: 8px 16px;
    background: var(--c-accent);
    color: #fff;
    font-weight: 700;
    font-size: 14px;
    border-radius: 4px;
    text-decoration: none;
  }
  .skip-link:focus {
    left: 10px;
    top: 10px;
  }

  /* ── Hamburger (mobile only) ── */
  .hamburger {
    display: none;
    position: fixed;
    top: 12px;
    left: 12px;
    z-index: 1100;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    border: 1px solid var(--c-border);
    background: var(--c-bg-sidebar);
    color: var(--c-text);
    font-size: 20px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
  }

  /* ── Mobile backdrop ── */
  .sidebar-backdrop {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 999;
  }

  /* ── Sidebar ── */
  .sidebar {
    width: 290px;
    min-width: 290px;
    background: var(--c-bg-sidebar);
    border-right: 1px solid var(--c-border-nav);
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
  }

  .brand {
    display: flex; align-items: center; gap: 12px;
    padding: 26px 22px 22px;
    border-bottom: 1px solid var(--c-border-nav);
  }
  .brand-icon { font-size: 28px; color: var(--c-accent); line-height: 1; }
  .brand-text { font-size: 17px; font-weight: 700; color: var(--c-text-h); letter-spacing: 0.03em; }

  /* ── Search ── */
  .search-wrap {
    padding: 10px 10px 0;
    position: relative;
  }
  .search-input {
    width: 100%;
    padding: 8px 12px;
    border-radius: 6px;
    border: 1px solid var(--c-border);
    background: var(--c-bg-subtle);
    color: var(--c-text);
    font-size: 13px;
    font-family: inherit;
    outline: none;
    transition: border-color 0.15s;
  }
  .search-input::placeholder { color: var(--c-text-4); }
  .search-input:focus { border-color: var(--c-accent); }

  .search-results {
    position: absolute;
    top: 100%;
    left: 10px;
    right: 10px;
    background: var(--c-bg-card);
    border: 1px solid var(--c-border);
    border-radius: 6px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.4);
    z-index: 100;
    max-height: 320px;
    overflow-y: auto;
  }
  .search-result-item {
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 100%;
    padding: 8px 12px;
    border: none;
    background: transparent;
    color: var(--c-text);
    font-size: 13px;
    text-align: left;
    cursor: pointer;
    border-bottom: 1px solid var(--c-border-soft);
    transition: background 0.1s;
  }
  .search-result-item:last-child { border-bottom: none; }
  .search-result-item:hover { background: var(--c-bg-hover); }
  .sr-section {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--c-accent);
  }
  .sr-label {
    font-size: 13px;
    color: var(--c-text-2);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  nav { display: flex; flex-direction: column; padding: 14px 10px; gap: 4px; }

  .nav-item {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 14px; border-radius: 8px;
    border: none; background: transparent;
    color: var(--c-text-4); font-size: 15px; font-weight: 700;
    cursor: pointer; text-align: left;
    transition: background 0.15s, color 0.15s;
    width: 100%;
  }
  .nav-item:hover:not(.disabled) { background: var(--c-bg-card); color: var(--c-text); }
  .nav-item.active  { background: var(--c-bg-nav-active); color: var(--c-accent); font-weight: 600; }
  .nav-item.disabled { cursor: default; opacity: 0.5; }

  .nav-icon  { font-size: 18px; width: 22px; text-align: center; }
  .nav-label { flex: 1; }

  .nav-shortcut {
    font-size: 10px;
    font-weight: 700;
    color: var(--c-text-4);
    background: var(--c-bg-subtle);
    padding: 1px 5px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    opacity: 0.6;
  }

  .soon {
    font-size: 9px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em;
    background: var(--c-bg-tag); color: var(--c-text-4);
    padding: 1px 5px; border-radius: 3px;
  }

  .sidebar-footer {
    margin-top: auto;
    padding: 12px 10px;
    border-top: 1px solid var(--c-border-nav);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .theme-toggle {
    width: 100%;
    padding: 8px 14px;
    border-radius: 8px;
    border: 1px solid var(--c-border-nav);
    background: transparent;
    color: var(--c-text-4);
    font-size: 13px; font-weight: 600;
    cursor: pointer;
    text-align: left;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
  }
  .theme-toggle:hover {
    background: var(--c-bg-card);
    color: var(--c-text);
    border-color: var(--c-border);
  }

  /* ── Content ── */
  .content {
    flex: 1;
    padding: 28px 32px;
    overflow-y: auto;
    position: relative;
  }

  .print-btn {
    position: absolute;
    top: 28px;
    right: 32px;
    padding: 5px 12px;
    border-radius: 5px;
    border: 1px solid var(--c-border);
    background: transparent;
    color: var(--c-text-4);
    font-size: 12px; font-weight: 600;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }
  .print-btn:hover {
    background: var(--c-bg-card);
    color: var(--c-text);
  }

  .coming-soon {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    height: 60vh; gap: 12px; color: var(--c-text-3);
  }
  .cs-icon { font-size: 48px; }
  .coming-soon h2 { font-size: 22px; color: var(--c-text); margin: 0; }
  .coming-soon p  { font-size: 14px; margin: 0; }

  /* ── Help overlay ── */
  .help-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    z-index: 9000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .help-modal {
    background: var(--c-bg-card);
    border: 1px solid var(--c-border);
    border-radius: 12px;
    padding: 24px 28px;
    min-width: 320px;
    max-width: 420px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.5);
  }
  .help-modal h3 {
    margin: 0 0 16px;
    font-size: 18px;
    color: var(--c-text-h);
  }
  .shortcut-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .shortcut-row {
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 14px;
    color: var(--c-text-2);
  }
  .shortcut-row kbd {
    display: inline-block;
    min-width: 50px;
    padding: 3px 8px;
    border-radius: 4px;
    border: 1px solid var(--c-border);
    background: var(--c-bg-subtle);
    color: var(--c-text);
    font-size: 12px;
    font-weight: 700;
    font-family: 'Courier New', monospace;
    text-align: center;
  }
  .help-close {
    margin-top: 16px;
    padding: 7px 20px;
    border-radius: 6px;
    border: 1px solid var(--c-border);
    background: transparent;
    color: var(--c-text-3);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }
  .help-close:hover { background: var(--c-bg-hover); color: var(--c-text); }

  /* ── Global tooltip ── */
  .g-tooltip {
    position: fixed;
    z-index: 9999;
    pointer-events: none;
    background: var(--c-bg-card);
    border: 1px solid #3a4459;
    border-radius: 7px;
    padding: 8px 12px;
    width: 248px;
    box-shadow: 0 6px 24px rgba(0,0,0,0.5);
    animation: tip-in 0.1s ease;
  }

  @keyframes tip-in {
    from { opacity: 0; transform: translateY(4px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .g-tip-title {
    font-size: 12px; font-weight: 700;
    color: var(--c-accent); margin-bottom: 4px;
  }

  .g-tip-body {
    font-size: 12px; color: var(--c-text-2);
    line-height: 1.55;
  }

  /* ── Mobile responsive ── */
  @media (max-width: 768px) {
    .hamburger {
      display: flex;
    }

    .sidebar-backdrop {
      display: block;
    }

    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 1000;
      transform: translateX(-100%);
      transition: transform 0.25s ease;
      width: 290px;
      min-width: 290px;
    }
    .sidebar.open {
      transform: translateX(0);
    }

    .content {
      padding: 60px 16px 16px;
    }

    .print-btn {
      top: 14px;
      right: 16px;
    }

    .nav-shortcut {
      display: none;
    }

    .help-modal {
      margin: 16px;
      min-width: auto;
    }
  }
</style>
