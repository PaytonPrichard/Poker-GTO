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
  import DailyPractice      from './lib/DailyPractice.svelte';
  import GuidedLearning     from './lib/GuidedLearning.svelte';
  import StatsSection       from './lib/StatsSection.svelte';
  import HandWalkthrough    from './lib/HandWalkthrough.svelte';
  import { buildSearchIndex, sectionLabels } from './lib/data/searchIndex.js';

  let activeSection = $state(localStorage.getItem('activeSection') ?? 'preflop');
  $effect(() => { localStorage.setItem('activeSection', activeSection); });

  // ── Preflop → Postflop hand context ───────────────────────────────────────
  let postflopHand = $state(null); // { hand: 'AKs', position: 'BTN' }

  function takePostflop(hand, position) {
    postflopHand = { hand, position };
    activeSection = 'postflop';
  }

  const groups = [
    {
      id: 'preflop-group', label: 'Preflop', icon: '♠', color: '#52b788',
      items: [
        { id: 'preflop',  label: 'Ranges' },
        { id: 'position', label: 'Position Strategy' },
      ],
    },
    {
      id: 'postflop-group', label: 'Postflop', icon: '♥', color: '#ef4444',
      items: [
        { id: 'postflop',    label: 'Flop / Turn / River' },
        { id: 'handreading', label: 'Hand Reading' },
        { id: 'bluffing',    label: 'Bluffing & Reads' },
        { id: 'multiway',    label: 'Multiway Pots' },
      ],
    },
    {
      id: 'theory-group', label: 'Theory', icon: '◆', color: '#f59e0b',
      items: [
        { id: 'equity',   label: 'Hand Equity' },
        { id: 'sizing',   label: 'Bet Sizing' },
        { id: 'mistakes', label: 'Common Mistakes' },
        { id: 'solver',   label: 'Solver Guide' },
      ],
    },
    {
      id: 'tournament-group', label: 'Tournament', icon: '★', color: '#eab308',
      items: [
        { id: 'tournament', label: 'Strategy & ICM' },
        { id: 'bankroll',   label: 'Bankroll Management' },
      ],
    },
    {
      id: 'tools-group', label: 'Tools & Practice', icon: '✧', color: '#a78bfa',
      items: [
        { id: 'walkthrough',   label: 'Hand Walkthrough' },
        { id: 'daily',         label: 'Daily Practice' },
        { id: 'quiz',          label: 'Quiz Mode' },
        { id: 'range-builder', label: 'Range Builder' },
        { id: 'cheatsheet',    label: 'Cheat Sheet' },
        { id: 'glossary',      label: 'Glossary' },
        { id: 'notes',         label: 'Session Notes' },
      ],
    },
  ];

  // Flat list of all section IDs for keyboard nav
  const allSectionIds = groups.flatMap(g => g.items.map(i => i.id));

  // Derive which group is active based on activeSection
  let activeGroup = $derived(groups.find(g => g.items.some(i => i.id === activeSection)) ?? groups[0]);

  // Track which groups the user has manually collapsed (active group auto-expands unless collapsed)
  let collapsedGroupId = $state(null);

  // ── Progress tracking ─────────────────────────────────────────────────────
  let completedSections = $state(
    JSON.parse(localStorage.getItem('completedSections') ?? '[]')
  );
  $effect(() => {
    localStorage.setItem('completedSections', JSON.stringify(completedSections));
  });

  let progressCount = $derived(completedSections.filter(id => allSectionIds.includes(id)).length);
  let progressPct = $derived(allSectionIds.length === 0 ? 0 : Math.round((progressCount / allSectionIds.length) * 100));

  // ── Daily streak ─────────────────────────────────────────────────────────
  function initStreak() {
    const saved = JSON.parse(localStorage.getItem('streakData') ?? '{"count":0,"lastDate":""}');
    const dc = JSON.parse(localStorage.getItem('dailyChallenge') ?? '{}');
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

    if (dc.date === today && dc.answered) {
      if (saved.lastDate === today) return saved; // already counted today
      if (saved.lastDate === yesterday) return { count: saved.count + 1, lastDate: today };
      return { count: 1, lastDate: today };
    }
    // No answer today — streak holds if lastDate was today or yesterday
    if (saved.lastDate === today || saved.lastDate === yesterday) return saved;
    return { count: 0, lastDate: saved.lastDate };
  }

  let streakData = $state(initStreak());
  $effect(() => { localStorage.setItem('streakData', JSON.stringify(streakData)); });

  // ── Guided Learning progress ────────────────────────────────────────────
  const guidedStepSections = [
    'position', 'preflop', 'equity', 'sizing', 'postflop', 'handreading',
    'bluffing', 'mistakes', 'multiway', 'tournament', 'bankroll', 'solver',
  ];
  let guidedCompleted = $derived(
    guidedStepSections.filter(id => completedSections.includes(id)).length
  );
  let guidedTotal = guidedStepSections.length;

  // ── Reading progress (auto-track details opens) ───────────────────────
  const contentSections = new Set([
    'preflop', 'position', 'postflop', 'handreading', 'bluffing', 'multiway',
    'equity', 'sizing', 'mistakes', 'solver', 'tournament', 'bankroll',
  ]);

  let readItems = $state(JSON.parse(localStorage.getItem('readItems') ?? '{}'));
  $effect(() => { localStorage.setItem('readItems', JSON.stringify(readItems)); });

  let readProgress = $state({ read: 0, total: 0 });

  function updateReadProgress() {
    requestAnimationFrame(() => {
      const mainEl = document.getElementById('main-content');
      if (!mainEl) return;
      const allDetails = mainEl.querySelectorAll('details');
      const total = allDetails.length;
      const sectionReads = readItems[activeSection] || [];
      let newReads = [...sectionReads];
      let read = 0;

      allDetails.forEach(d => {
        const label = d.querySelector('summary')?.textContent.trim().slice(0, 80);
        if (!label) return;
        if (d.open && !newReads.includes(label)) newReads.push(label);
        if (newReads.includes(label)) read++;
      });

      if (newReads.length > sectionReads.length) {
        readItems = { ...readItems, [activeSection]: newReads };
      }

      readProgress = { read, total };

      if (total > 0 && read >= total && !completedSections.includes(activeSection)) {
        completedSections = [...completedSections, activeSection];
      }
    });
  }

  $effect(() => {
    activeSection;
    updateReadProgress();
  });

  function onContentClick(e) {
    const summary = e.target.closest('summary');
    if (summary) {
      const details = summary.closest('details');
      if (details && !details.open) {
        const label = summary.textContent.trim().slice(0, 80);
        const items = readItems[activeSection] || [];
        if (!items.includes(label)) {
          readItems = { ...readItems, [activeSection]: [...items, label] };
        }
      }
    }
    updateReadProgress();
  }

  // ── Mobile sidebar ─────────────────────────────────────────────────────────
  let sidebarOpen = $state(false);

  function navigateTo(id) {
    activeSection = id;
    collapsedGroupId = null;
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
      const idx = allSectionIds.indexOf(activeSection);
      if (idx > 0) activeSection = allSectionIds[idx - 1];
      return;
    }
    if (e.key === ']') {
      e.preventDefault();
      const idx = allSectionIds.indexOf(activeSection);
      if (idx < allSectionIds.length - 1) activeSection = allSectionIds[idx + 1];
      return;
    }
    // 1-5 → jump to group (selects first item in group)
    const num = parseInt(e.key);
    if (!isNaN(num) && num >= 1 && num <= 5 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      activeSection = groups[num - 1].items[0].id;
      return;
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
  const backupKeys = ['sessionNotes', 'savedNotes', 'quizHistory', 'customRanges', 'activeSection', 'theme', 'a11y', 'completedSections', 'readItems', 'practiceScores_equity', 'practiceScores_cbet', 'practiceScores_pushfold', 'dailyChallenge', 'srData', 'streakData', 'speedHighScore'];
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
    { key: '1 – 5',  desc: 'Jump to group (Preflop, Postflop, Theory, Tournament, Tools)' },
    { key: '[ / ]',  desc: 'Previous / next topic' },
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

    <!-- Progress bar -->
    <div class="progress-section">
      <div class="progress-info">
        <span class="progress-text">{progressCount}/{allSectionIds.length} reviewed</span>
        <span class="progress-pct-label">{progressPct}%</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" style="width: {progressPct}%"></div>
      </div>
    </div>

    <!-- Guided Learning CTA + Streak -->
    <div class="sidebar-ctas">
      <button
        class="guided-cta"
        class:active={activeSection === 'guided'}
        onclick={() => navigateTo('guided')}
      >
        <span class="guided-cta-icon">&#9656;</span>
        <div class="guided-cta-text">
          <span class="guided-cta-label">Guided Learning</span>
          <span class="guided-cta-progress">{guidedCompleted}/{guidedTotal} complete</span>
        </div>
        {#if guidedCompleted < guidedTotal}
          <div class="guided-cta-bar">
            <div class="guided-cta-fill" style="width:{Math.round(guidedCompleted / guidedTotal * 100)}%"></div>
          </div>
        {:else}
          <span class="guided-cta-done">&#10003;</span>
        {/if}
      </button>
      <div class="sidebar-row">
        <button
          class="sidebar-mini-btn"
          class:active={activeSection === 'stats'}
          onclick={() => navigateTo('stats')}
        >
          My Stats
        </button>
        {#if streakData.count > 0}
          <span class="streak-badge" title="{streakData.count}-day streak">
            <span class="streak-flame">&#128293;</span>{streakData.count}
          </span>
        {/if}
      </div>
    </div>

    <nav>
      {#each groups as group, gi}
        {@const isActiveGroup = activeGroup?.id === group.id}
        {@const isExpanded = isActiveGroup && collapsedGroupId !== group.id}
        <button
          class="nav-group"
          class:active={isActiveGroup}
          onclick={() => {
            if (isActiveGroup) {
              // Toggle collapse of current group
              collapsedGroupId = collapsedGroupId === group.id ? null : group.id;
            } else {
              // Jump to first item in this group
              navigateTo(group.items[0].id);
            }
          }}
        >
          <span class="nav-icon" style="color:{group.color}">{group.icon}</span>
          <span class="nav-label">{group.label}</span>
          <span class="nav-shortcut">{gi + 1}</span>
          <span class="nav-chevron" class:open={isExpanded}>›</span>
        </button>
        {#if isExpanded}
          <div class="nav-sub-items">
            {#each group.items as item}
              <button
                class="nav-sub-item"
                class:active={activeSection === item.id}
                class:completed={completedSections.includes(item.id)}
                onclick={() => navigateTo(item.id)}
              >
                {item.label}
                {#if completedSections.includes(item.id)}
                  <span class="nav-check">✓</span>
                {/if}
              </button>
            {/each}
          </div>
        {/if}
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

  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <main id="main-content" class="content" style:zoom={a11y ? 1.15 : 1} style:line-height={a11y ? '1.75' : null} style:letter-spacing={a11y ? '0.01em' : null} onclick={onContentClick}>
    <button class="print-btn" onclick={() => window.print()}>⎙ Print</button>
    {#if activeSection === 'preflop'}
      <PreflopSection onTakePostflop={takePostflop} />
    {:else if activeSection === 'postflop'}
      <PostflopSection handContext={postflopHand} onDismissHand={() => postflopHand = null} />
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
    {:else if activeSection === 'guided'}
      <GuidedLearning onNavigate={(id) => activeSection = id} {completedSections} />
    {:else if activeSection === 'stats'}
      <StatsSection />
    {:else if activeSection === 'walkthrough'}
      <HandWalkthrough />
    {:else if activeSection === 'daily'}
      <DailyPractice onNavigate={(id) => activeSection = id} onDailyComplete={() => streakData = initStreak()} />
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

    <!-- Reading progress (content sections only) -->
    {#if contentSections.has(activeSection) && readProgress.total > 0}
      <div class="read-bar">
        <div class="read-bar-track">
          <div class="read-bar-fill" style="width:{Math.round(readProgress.read / readProgress.total * 100)}%"></div>
        </div>
        <span class="read-bar-label">
          {readProgress.read}/{readProgress.total} concepts explored{#if completedSections.includes(activeSection)} — Complete{/if}
        </span>
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

  /* ── Progress bar ── */
  .progress-section {
    padding: 10px 14px 0;
    display: flex; flex-direction: column; gap: 5px;
  }
  .progress-info {
    display: flex; justify-content: space-between; align-items: center;
  }
  .progress-text {
    font-size: 11px; font-weight: 600;
    color: var(--c-text-4); letter-spacing: 0.02em;
  }
  .progress-pct-label {
    font-size: 11px; font-weight: 700;
    color: var(--c-accent); font-family: 'Courier New', monospace;
  }
  .progress-track {
    height: 3px; border-radius: 2px;
    background: var(--c-bg-subtle); overflow: hidden;
  }
  .progress-fill {
    height: 100%; border-radius: 2px;
    background: var(--c-accent);
    transition: width 0.4s ease;
  }

  /* ── Guided Learning CTA ── */
  .guided-cta {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 14px;
    border-radius: 8px;
    border: 1px solid #2d6a4f;
    background: rgba(45,106,79,0.1);
    color: var(--c-text);
    cursor: pointer;
    transition: all 0.15s;
    text-align: left;
    width: 100%;
  }
  .guided-cta:hover {
    background: rgba(45,106,79,0.2);
    border-color: #52b788;
  }
  .guided-cta.active {
    background: rgba(45,106,79,0.25);
    border-color: #52b788;
    box-shadow: 0 0 0 1px rgba(82,183,136,0.15);
  }
  .guided-cta-icon {
    font-size: 18px; color: #52b788;
    width: 24px; height: 24px;
    display: flex; align-items: center; justify-content: center;
    background: rgba(45,106,79,0.25);
    border-radius: 50%; flex-shrink: 0;
  }
  .guided-cta-text {
    display: flex; flex-direction: column; flex: 1; min-width: 0;
  }
  .guided-cta-label {
    font-size: 13px; font-weight: 700; color: var(--c-text-h);
  }
  .guided-cta-progress {
    font-size: 11px; font-weight: 600; color: var(--c-text-4);
  }
  .guided-cta-bar {
    width: 40px; height: 4px; border-radius: 2px;
    background: var(--c-bg-subtle); overflow: hidden;
    flex-shrink: 0;
  }
  .guided-cta-fill {
    height: 100%; border-radius: 2px;
    background: #52b788;
    transition: width 0.4s ease;
  }
  .guided-cta-done {
    font-size: 14px; font-weight: 800; color: #52b788;
    flex-shrink: 0;
  }

  /* ── Sidebar CTAs row ── */
  .sidebar-ctas {
    display: flex; flex-direction: column; gap: 6px;
    padding: 0 10px;
    margin-top: 10px;
  }
  .sidebar-row {
    display: flex; align-items: center; gap: 6px;
  }
  .sidebar-mini-btn {
    flex: 1; padding: 6px 12px; border-radius: 6px;
    border: 1px solid var(--c-border);
    background: transparent; color: var(--c-text-4);
    font-size: 12px; font-weight: 600;
    cursor: pointer; transition: all 0.15s;
    text-align: left;
  }
  .sidebar-mini-btn:hover { color: var(--c-text); border-color: var(--c-accent-dark); }
  .sidebar-mini-btn.active { color: var(--c-accent); border-color: var(--c-accent-dark); background: var(--c-bg-nav-active); }
  .streak-badge {
    display: flex; align-items: center; gap: 3px;
    padding: 4px 8px; border-radius: 6px;
    background: rgba(245,158,11,0.12);
    border: 1px solid rgba(245,158,11,0.25);
    font-size: 13px; font-weight: 800; color: #f59e0b;
    flex-shrink: 0;
  }
  .streak-flame { font-size: 12px; }

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

  nav { display: flex; flex-direction: column; padding: 14px 10px; gap: 2px; }

  .nav-group {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 14px; border-radius: 8px;
    border: none; background: transparent;
    color: var(--c-text-4); font-size: 15px; font-weight: 700;
    cursor: pointer; text-align: left;
    transition: background 0.15s, color 0.15s;
    width: 100%;
  }
  .nav-group:hover { background: var(--c-bg-card); color: var(--c-text); }
  .nav-group.active { color: var(--c-accent); }

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

  .nav-chevron {
    font-size: 16px;
    color: var(--c-text-4);
    transition: transform 0.2s;
    flex-shrink: 0;
  }
  .nav-chevron.open { transform: rotate(90deg); }

  .nav-sub-items {
    display: flex;
    flex-direction: column;
    gap: 1px;
    padding: 2px 0 6px 34px;
  }

  .nav-sub-item {
    display: block;
    width: 100%;
    padding: 8px 14px;
    border-radius: 6px;
    border: none;
    background: transparent;
    color: var(--c-text-4);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    text-align: left;
    transition: background 0.15s, color 0.15s;
  }
  .nav-sub-item:hover { background: var(--c-bg-card); color: var(--c-text); }
  .nav-sub-item.active {
    background: var(--c-bg-nav-active);
    color: var(--c-accent);
  }

  .nav-check {
    font-size: 11px; font-weight: 700;
    color: #52b788; margin-left: auto; flex-shrink: 0;
  }
  .nav-sub-item.completed:not(.active) { color: var(--c-text-3); }

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

  /* ── Reading progress bar ── */
  .read-bar {
    display: flex; flex-direction: column; align-items: center; gap: 6px;
    padding: 24px 0 12px;
    border-top: 1px solid var(--c-border-soft);
    margin-top: 28px;
    max-width: 360px;
    margin-left: auto; margin-right: auto;
  }
  .read-bar-track {
    width: 100%; height: 3px; border-radius: 2px;
    background: var(--c-bg-subtle); overflow: hidden;
  }
  .read-bar-fill {
    height: 100%; border-radius: 2px;
    background: var(--c-accent);
    transition: width 0.4s ease;
  }
  .read-bar-label {
    font-size: 12px; font-weight: 600;
    color: var(--c-text-4);
  }

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
