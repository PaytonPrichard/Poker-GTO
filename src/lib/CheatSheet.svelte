<script>
  import { rfiSizes, cbetFrequencies, potOdds, pushFoldChart, commonEquity, bankrollReqs, keyNumbers } from './data/cheatsheet.js';
</script>

<div class="cheatsheet">
  <h2>Cheat Sheet</h2>
  <p class="intro">Quick reference of key poker numbers. Optimized for printing — hit <kbd>Ctrl+P</kbd> or the Print button.</p>

  <div class="cs-grid">
    <!-- RFI Sizes -->
    <div class="cs-card">
      <h3>RFI Open Sizes (6-Max)</h3>
      <table>
        <thead><tr><th>Position</th><th>Size</th><th>Range %</th></tr></thead>
        <tbody>
          {#each rfiSizes as row}
            <tr><td>{row.position}</td><td>{row.size}</td><td>{row.notes}</td></tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- C-bet Frequencies -->
    <div class="cs-card">
      <h3>C-Bet Frequencies</h3>
      <table>
        <thead><tr><th>Texture</th><th>IP</th><th>OOP</th><th>Size</th></tr></thead>
        <tbody>
          {#each cbetFrequencies as row}
            <tr><td>{row.texture}</td><td>{row.ipFreq}</td><td>{row.oopFreq}</td><td>{row.size}</td></tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Pot Odds -->
    <div class="cs-card">
      <h3>Pot Odds Quick Reference</h3>
      <table>
        <thead><tr><th>Bet Size</th><th>Equity Needed</th><th>MDF</th></tr></thead>
        <tbody>
          {#each potOdds as row}
            <tr><td>{row.betSize}</td><td>{row.potOdds}</td><td>{row.mdf}</td></tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Common Equity -->
    <div class="cs-card">
      <h3>Key Equity Matchups</h3>
      <table>
        <thead><tr><th>Matchup</th><th>Equity</th></tr></thead>
        <tbody>
          {#each commonEquity as row}
            <tr><td>{row.matchup}</td><td>{row.equity}</td></tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Push/Fold -->
    <div class="cs-card">
      <h3>Push/Fold Thresholds</h3>
      <table>
        <thead><tr><th>Stack</th><th>Position</th><th>Hands</th></tr></thead>
        <tbody>
          {#each pushFoldChart as row}
            <tr><td>{row.bbCount}</td><td>{row.positions}</td><td>{row.hands}</td></tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Bankroll Requirements -->
    <div class="cs-card">
      <h3>Bankroll Requirements</h3>
      <table>
        <thead><tr><th>Game Type</th><th>Buy-ins</th><th>Notes</th></tr></thead>
        <tbody>
          {#each bankrollReqs as row}
            <tr><td>{row.gameType}</td><td>{row.buyins}</td><td>{row.notes}</td></tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Key Numbers -->
    <div class="cs-card cs-card-wide">
      <h3>Key Numbers to Memorize</h3>
      <div class="key-numbers-grid">
        {#each keyNumbers as row}
          <div class="kn-item">
            <span class="kn-value">{row.value}</span>
            <span class="kn-label">{row.label}</span>
            <span class="kn-context">{row.context}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .cheatsheet { display: flex; flex-direction: column; gap: 20px; }

  h2 { font-size: 22px; font-weight: 700; color: var(--c-text-h); margin: 0; }
  h3 { font-size: 14px; font-weight: 700; color: var(--c-accent); margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.05em; }
  .intro { font-size: 14px; color: var(--c-text-3); margin: 0; line-height: 1.6; }
  .intro kbd {
    padding: 2px 6px;
    border-radius: 3px;
    border: 1px solid var(--c-border);
    background: var(--c-bg-subtle);
    font-size: 12px;
    font-family: 'Courier New', monospace;
  }

  .cs-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .cs-card {
    background: var(--c-bg-card);
    border: 1px solid var(--c-border);
    border-radius: 8px;
    padding: 14px 16px;
    overflow-x: auto;
  }
  .cs-card-wide { grid-column: 1 / -1; }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
  }
  thead th {
    text-align: left;
    padding: 4px 8px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--c-text-4);
    border-bottom: 1px solid var(--c-border);
  }
  tbody td {
    padding: 5px 8px;
    color: var(--c-text-2);
    border-bottom: 1px solid var(--c-border-soft);
    line-height: 1.4;
  }
  tbody tr:last-child td { border-bottom: none; }

  .key-numbers-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }
  .kn-item {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 8px 10px;
    background: var(--c-bg-subtle);
    border-radius: 6px;
    border: 1px solid var(--c-border-soft);
  }
  .kn-value {
    font-size: 16px;
    font-weight: 800;
    color: var(--c-accent);
    font-family: 'Courier New', monospace;
  }
  .kn-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--c-text);
  }
  .kn-context {
    font-size: 11px;
    color: var(--c-text-4);
    line-height: 1.4;
  }

  /* Print optimization */
  @media print {
    .cheatsheet { gap: 8px; }
    .cs-grid { gap: 8px; }
    .cs-card { padding: 8px 10px; break-inside: avoid; }
    h2 { font-size: 18px; }
    h3 { font-size: 12px; margin-bottom: 6px; }
    .intro { display: none; }
    .key-numbers-grid { grid-template-columns: repeat(4, 1fr); gap: 6px; }
  }

  @media (max-width: 768px) {
    .cs-grid { grid-template-columns: 1fr; }
    .key-numbers-grid { grid-template-columns: repeat(2, 1fr); }
  }
</style>
