// ─────────────────────────────────────────────────────────────────────────────
// Solver Interpretation Guide — GTO reference data
// ─────────────────────────────────────────────────────────────────────────────

// ── Array 1: Reading Solver Output ──────────────────────────────────────────
export const readingOutput = [
  {
    title: 'What a Solver Actually Computes',
    body:  'Solvers find Nash equilibrium — an unexploitable strategy pair, not "the best play" vs a specific opponent.',
  },
  {
    title: 'Reading Action Frequencies',
    body:  'Frequencies (e.g., raise 45%, call 30%, fold 25%) keep the hand unexploitable by mixing. Simplify by choosing the highest-frequency action.',
  },
  {
    title: 'EV Display — What the Numbers Represent',
    body:  'EV shows expected chips gained/lost per action at equilibrium. Similar EVs = indifferent; large gaps = clear best play.',
  },
  {
    title: 'Range Viewer — Understanding Heatmaps and Hand Grids',
    body:  '13x13 grid with colors showing action frequencies per hand. Suited above diagonal, offsuit below, pairs on diagonal.',
  },
  {
    title: 'Node Locking — What It Is and Why It Matters',
    body:  'Fix one player\'s strategy (e.g., never folds river) and re-solve for max-EV counter-strategy. Bridges GTO and exploitative play.',
  },
  {
    title: 'Aggregated vs Specific Reports',
    body:  'Aggregated reports show averages across boards; specific reports show one texture. Always drill into specific boards — averages hide variation.',
  },
  {
    title: 'Common Solver Software',
    body:  'PioSolver: powerful, needs hardware. GTO Wizard: browser-based, best entry point. Simple Postflop: cloud-based middle ground.',
  },
];

// ── Array 2: Frequency Concepts (Mixed Strategies) ──────────────────────────
export const frequencyConcepts = [
  {
    title: 'Why Solvers Mix Actions',
    body:  'Mixing maintains indifference — each action yields the same EV, so opponents can\'t exploit a predictable pattern.',
  },
  {
    title: 'Pure vs Mixed Strategies',
    body:  'Pure = one action 100%. Mixed = split at defined frequencies. Top/bottom of range are pure; middle hands mix.',
  },
  {
    title: 'Implementing Frequencies in Practice',
    body:  'Above 70% frequency, treat as pure. Between 40-60%, use suit or card rank as tie-breaker. Perfect mixing matters less than correct strategy.',
  },
  {
    title: 'Range-Based vs Hand-Based Frequency',
    body:  '"Bet 65%" means 65% of hands in range bet, not each hand 65% of the time. Focus on which hands bet vs check.',
  },
  {
    title: 'How Frequencies Change with Bet Sizing',
    body:  'Small bets (33% pot) = high frequency, merged range. Large bets (150% pot) = low frequency, polarized range. Size and frequency are linked.',
  },
  {
    title: 'When Mixing Matters vs When It Doesn\'t',
    body:  'Mixing matters at high stakes where opponents track frequencies. At low/mid stakes, just pick the highest-frequency action.',
  },
];

// ── Array 3: When to Deviate from Solver ────────────────────────────────────
export const whenToDeviate = [
  {
    title: 'Against Recreational Players',
    body:  'Rec players call too much and bluff too little. Abandon balance — stop bluffing them and value bet thinner.',
  },
  {
    title: 'When You Have a Strong Read',
    body:  'Reads give you info the solver lacks. If villain 3-bets only premiums, fold more than GTO suggests.',
  },
  {
    title: 'In Multiway Pots',
    body:  'Solvers solve heads-up only. In multiway pots, play tighter and more straightforward — bluff less, value bet stronger.',
  },
  {
    title: 'At Micro and Low Stakes',
    body:  'Opponents aren\'t tracking your frequencies. Value bet relentlessly, cut thin bluffs, punish overcalling. Solver precision is wasted here.',
  },
  {
    title: 'When the Solver Solution Is Very Mixed',
    body:  'A 52/48 split means near-identical EV. Pick the simpler option and save mental energy for clear spots.',
  },
  {
    title: 'In Tournament ICM Spots',
    body:  'Solvers default to chipEV; tournament chips have non-linear ICM value. Tighten ranges near bubbles and pay jumps. Use ICM-aware solvers.',
  },
  {
    title: 'When Stack-to-Pot Ratio Is Extreme',
    body:  'SPR below 2: shove-or-fold. SPR above 15: speculative hands gain value, game is heavily positional. Simplify at extremes.',
  },
];

// ── Array 4: Practical Tips ─────────────────────────────────────────────────
export const practicalTips = [
  {
    title: 'Study Specific Spots, Not Random Hands',
    body:  'Study one common spot deeply (e.g., BTN vs BB on dry flops) rather than glancing at dozens of random hands.',
  },
  {
    title: 'Focus on the "Why" Not the "What"',
    body:  'Understanding why the solver bets AQ on K72r (blocks Kx, has equity) matters more than memorizing the 75% frequency.',
  },
  {
    title: 'Use the Solver to Check Your Intuition',
    body:  'Run 2-3 interesting hands per session through a solver. Compare your play to equilibrium — this feedback loop calibrates decisions fastest.',
  },
  {
    title: 'Start with Preflop, Then Move to Postflop',
    body:  'Master preflop ranges first — wrong ranges make every postflop decision flawed. Then study c-bet heuristics by flop texture.',
  },
  {
    title: 'Build Decision Trees from Solver Output',
    body:  'Convert solver output into if-then rules: "Dry K-high → c-bet small entire range." Heuristics capture ~90% of solver EV.',
  },
  {
    title: 'Review Sessions with Solver Assistance',
    body:  'Mark uncertain hands during play, review with a solver after. Focus on deviations, big pots, and close decisions to find leaks.',
  },
  {
    title: 'The 80/20 Rule of Solver Study',
    body:  '80% of EV comes from 20% of decisions: preflop ranges, c-bet strategy, and river decisions. Master high-frequency spots first.',
  },
];
