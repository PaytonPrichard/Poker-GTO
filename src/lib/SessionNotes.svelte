<script>
  let notes = $state(localStorage.getItem('sessionNotes') ?? '');
  let savedEntries = $state(JSON.parse(localStorage.getItem('savedNotes') ?? '[]'));

  $effect(() => { localStorage.setItem('sessionNotes', notes); });
  $effect(() => { localStorage.setItem('savedNotes', JSON.stringify(savedEntries)); });

  function saveEntry() {
    if (!notes.trim()) return;
    const entry = {
      id: Date.now(),
      text: notes.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    };
    savedEntries = [entry, ...savedEntries];
    notes = '';
  }

  function deleteEntry(id) {
    savedEntries = savedEntries.filter(e => e.id !== id);
  }

  function clearNotes() {
    notes = '';
  }
</script>

<div class="session-notes">
  <h2>Session Notes</h2>
  <p class="intro">
    Use this notepad to log hands, record takeaways, or jot down observations during your study sessions.
    Notes are saved locally in your browser and persist between visits.
  </p>

  <div class="editor-area">
    <div class="editor-header">
      <h3>Current Notes</h3>
      <div class="editor-actions">
        <span class="char-count">{notes.length} chars</span>
        <button class="action-btn save-btn" onclick={saveEntry} disabled={!notes.trim()}>Save Entry</button>
        <button class="action-btn clear-btn" onclick={clearNotes} disabled={!notes}>Clear</button>
      </div>
    </div>
    <textarea
      class="notepad"
      bind:value={notes}
      placeholder="Type your session notes here...&#10;&#10;Examples:&#10;- Hand analysis: KQs from CO vs BTN 3-bet, should have folded pre&#10;- Leak spotted: calling too wide vs river overbets&#10;- Concept to study: check-raise frequencies on wet boards"
      rows="10"
    ></textarea>
  </div>

  {#if savedEntries.length > 0}
    <div class="saved-section">
      <div class="saved-header">
        <h3>Saved Entries ({savedEntries.length})</h3>
      </div>
      <div class="saved-list">
        {#each savedEntries as entry (entry.id)}
          <div class="saved-entry">
            <div class="entry-header">
              <span class="entry-date">{entry.date}</span>
              <button class="delete-btn" onclick={() => deleteEntry(entry.id)}>✕</button>
            </div>
            <pre class="entry-text">{entry.text}</pre>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .session-notes { display: flex; flex-direction: column; gap: 20px; }

  h2 { font-size: 22px; font-weight: 700; color: var(--c-text-h); margin: 0; }
  h3 { font-size: 17px; font-weight: 600; color: var(--c-text); margin: 0; }

  .intro { color: var(--c-text-3); font-size: 14px; margin: 0; line-height: 1.6; }

  .editor-area {
    background: var(--c-bg-card);
    border: 1px solid var(--c-border);
    border-radius: 8px;
    overflow: hidden;
  }

  .editor-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 14px;
    background: var(--c-bg-header);
    border-bottom: 1px solid var(--c-border);
    gap: 12px; flex-wrap: wrap;
  }

  .editor-actions { display: flex; align-items: center; gap: 10px; }

  .char-count {
    font-size: 12px; color: var(--c-text-4); font-weight: 500;
  }

  .action-btn {
    padding: 5px 14px; border-radius: 5px;
    border: 1px solid var(--c-border);
    background: transparent;
    font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.15s;
  }
  .action-btn:disabled {
    opacity: 0.4; cursor: default;
  }
  .save-btn {
    color: #52b788; border-color: #2d6a4f;
  }
  .save-btn:hover:not(:disabled) {
    background: #2d6a4f; color: #b7e4c7;
  }
  .clear-btn {
    color: var(--c-text-4);
  }
  .clear-btn:hover:not(:disabled) {
    background: var(--c-bg-subtle); color: var(--c-text-3);
  }

  .notepad {
    width: 100%; box-sizing: border-box;
    padding: 14px;
    background: var(--c-bg-card);
    color: var(--c-text);
    border: none; outline: none;
    font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
    font-size: 14px; line-height: 1.7;
    resize: vertical; min-height: 180px;
  }
  .notepad::placeholder { color: var(--c-text-4); opacity: 0.6; }

  .saved-section {
    display: flex; flex-direction: column; gap: 12px;
  }

  .saved-header {
    display: flex; align-items: center; justify-content: space-between;
  }

  .saved-list { display: flex; flex-direction: column; gap: 10px; }

  .saved-entry {
    background: var(--c-bg-card);
    border: 1px solid var(--c-border);
    border-radius: 8px;
    overflow: hidden;
  }

  .entry-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 8px 14px;
    background: var(--c-bg-header);
    border-bottom: 1px solid var(--c-border);
  }

  .entry-date {
    font-size: 12px; font-weight: 600; color: var(--c-text-4);
    text-transform: uppercase; letter-spacing: 0.04em;
  }

  .delete-btn {
    background: transparent; border: none;
    color: var(--c-text-4); font-size: 14px;
    cursor: pointer; padding: 2px 6px; border-radius: 4px;
    transition: all 0.15s;
  }
  .delete-btn:hover { color: #ef4444; background: rgba(239,68,68,0.1); }

  .entry-text {
    padding: 12px 14px; margin: 0;
    font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
    font-size: 13px; color: var(--c-text-3);
    line-height: 1.6; white-space: pre-wrap; word-wrap: break-word;
  }
</style>
