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
    { id: 'bankroll',    label: 'Bankroll Mgmt',       icon: '$',  color: '#22c55e', ready: true },
    { id: 'mistakes',    label: 'Common Mistakes',     icon: '⚠',  color: '#f97316', ready: true },
    { id: 'solver',      label: 'Solver Guide',        icon: '⚙',  color: '#60a5fa', ready: true },
    { id: 'quiz',        label: 'Quiz Mode',           icon: '✧',  color: '#c084fc', ready: true },
    { id: 'notes',       label: 'Session Notes',       icon: '✎',  color: '#a8a29e', ready: true },
  ];

  // ── Global tooltip ────────────────────────────────────────────────────────
  // Any element in the app can show a tooltip by setting data-tooltip="text"
  // (and optionally data-tooltip-title="Title") on itself or an ancestor.

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

  // Flip tooltip left if near right edge of viewport
  let tipLeft = $derived(() => {
    if (typeof window === 'undefined') return tip.x + 14;
    return tip.x + 260 > window.innerWidth ? tip.x - 260 - 4 : tip.x + 14;
  });

  let tipTop = $derived(() => {
    if (typeof window === 'undefined') return tip.y - 8;
    return tip.y + 120 > window.innerHeight ? tip.y - 120 : tip.y - 8;
  });
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
>
  <aside class="sidebar">
    <div class="brand">
      <span class="brand-icon">♠</span>
      <span class="brand-text">FeltTheory</span>
    </div>
    <nav>
      {#each sections as sec}
        <button
          class="nav-item"
          class:active={activeSection === sec.id}
          class:disabled={!sec.ready}
          onclick={() => sec.ready && (activeSection = sec.id)}
        >
          <span class="nav-icon" style="color:{sec.color}">{sec.icon}</span>
          <span class="nav-label">{sec.label}</span>
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
    </div>
  </aside>

  <main class="content" style:zoom={a11y ? 1.15 : 1} style:line-height={a11y ? '1.75' : null} style:letter-spacing={a11y ? '0.01em' : null}>
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

  <!-- Global floating tooltip -->
  {#if tip.visible && tip.text}
    <div
      class="g-tooltip"
      style="left: {tipLeft()}px; top: {tipTop()}px"
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
  }

  .brand {
    display: flex; align-items: center; gap: 12px;
    padding: 26px 22px 22px;
    border-bottom: 1px solid var(--c-border-nav);
  }
  .brand-icon { font-size: 28px; color: var(--c-accent); line-height: 1; }
  .brand-text { font-size: 17px; font-weight: 700; color: var(--c-text-h); letter-spacing: 0.03em; }

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
</style>
