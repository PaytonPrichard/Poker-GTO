// ─────────────────────────────────────────────────────────────────────────────
// Tournament Play — GTO reference data
// ─────────────────────────────────────────────────────────────────────────────

// ── Tab 1: Fundamentals ─────────────────────────────────────────────────────
export const tournamentBasics = [
  {
    title: 'Blind Levels & Structure',
    body:  'Blinds increase on a timer, shrinking effective stacks. Antes add dead money, incentivizing wider opens.',
  },
  {
    title: 'Stack Sizes Are Relative',
    body:  'Measure stacks in BB, not chips. 5,000 chips = 100 BB at 25/50 but only 5 BB at 500/1,000.',
  },
  {
    title: 'Chip Value Is Non-Linear (ICM)',
    body:  'ICM: first chip won is worth less than last chip lost. Doubling your stack does NOT double tournament equity.',
  },
  {
    title: 'No Rebuying (Freezeouts)',
    body:  'No reloads — marginal +chipEV spots can be -$EV when tournament life is at stake near pay jumps.',
  },
  {
    title: 'Antes Change Preflop Math',
    body:  'Antes add ~30-50% more to the preflop pot, making wider steals profitable.',
  },
  {
    title: 'Position Value Increases as Stacks Get Shallow',
    body:  'Shallow stacks concentrate positional edge into fewer, higher-impact decisions. LP stealing = primary chip source.',
  },
];

// ── Tab 2: Stage Strategy ───────────────────────────────────────────────────
export const stageStrategy = [
  {
    stage:    'Early Stage',
    bbRange:  '100+ BB',
    badge:    'Speculate',
    overview: 'Play like a deep-stacked cash game; see cheap flops with speculative hands.',
    tips: [
      'Open standard cash-game ranges — no major adjustments needed',
      'Set-mine and play suited connectors for implied odds',
      'Avoid marginal all-ins — not worth a coin flip this early',
      'Small ball: small raises, small c-bets',
      'Don\'t overvalue top pair — deep stacks allow coolers',
    ],
    keyPrinciple: 'Focus on controlled pot-building; avoid unnecessary variance while stacks are deep.',
  },
  {
    stage:    'Middle Stage',
    bbRange:  '40–80 BB',
    badge:    'Accumulate',
    overview: 'Blinds/antes matter; tighten EP opens but increase 3-bets and re-steals.',
    tips: [
      'Tight EP opens, wide CO/BTN steals',
      '3-bet light as a key weapon vs loose openers',
      'Pressure players trying to survive to the money',
      'Use fold equity now before stacks get too shallow',
      'Attack tight players; avoid big stacks unnecessarily',
    ],
    keyPrinciple: 'Chips won without showdown are most valuable. Use fold equity aggressively pre-bubble.',
  },
  {
    stage:    'Late Stage / Bubble',
    bbRange:  '20–40 BB',
    badge:    'ICM Pressure',
    overview: 'ICM pressure peaks at bubble. Big stacks attack; medium stacks tighten; short stacks shove.',
    tips: [
      'Big stacks: open wide, max pressure — opponents can\'t call light',
      'Medium stacks: tighten hard, avoid big-stack confrontations',
      'Short stacks: push/fold — waiting too long means blinding out',
      'Hand-for-hand: survival paramount for short stacks',
      'Don\'t call all-ins with marginal hands — risk premium is highest here',
    ],
    keyPrinciple: 'Bust threat outweighs double-up value on the bubble. Tighten calling ranges dramatically.',
  },
  {
    stage:    'Final Table',
    bbRange:  'Varies',
    badge:    'Pay Jumps',
    overview: 'Pay jumps are significant; strategy depends on stack sizes and pay structure.',
    tips: [
      'Each elimination increases everyone\'s guaranteed payout',
      'Short stacks: be aggressive — 9th vs 8th difference is small',
      'Big stacks: exploit ICM pressure on medium stacks laddering up',
      'HU at final table needs much wider ranges',
      'ICM chops lock up equity when stacks are close — consider deals',
    ],
    keyPrinciple: 'Weigh pay jumps vs chip accumulation. Folding +chipEV spots is often correct due to ICM.',
  },
];

// ── Tab 3: ICM & Bubble ─────────────────────────────────────────────────────
export const icmConcepts = [
  {
    title: 'What Is ICM?',
    body:  'Converts chip stacks into real-money equity based on prize pool distribution and finish probabilities.',
  },
  {
    title: 'Chip EV vs $ EV',
    body:  'A call can be +chipEV but -$EV — busting costs more in prize equity than chips gained. Gap peaks at bubble/FT.',
  },
  {
    title: 'Bubble Factor',
    body:  'Ratio of chip-loss cost to chip-gain value. BF of 2.0 = losing costs 2x winning. Near bubble, BF reaches 3-5x for medium stacks.',
  },
  {
    title: 'Risk Premium',
    body:  'ICM requires stronger hands to call all-ins; calling range is much tighter than shoving range near the bubble.',
  },
  {
    title: 'Big Stack vs Short Stack Dynamics',
    body:  'Big stacks pressure medium stacks; short stacks are freer to gamble. Medium stacks are most constrained near bubble.',
  },
  {
    title: 'Pay Jump Pressure at Final Tables',
    body:  'Bigger pay jumps reward more conservative play. Tighten approaching large jumps; open up after passing one.',
  },
];

// ── Tab 4: Push/Fold ────────────────────────────────────────────────────────
export const pushFoldRanges = [
  {
    title: 'When to Switch to Push/Fold',
    body:  'At ~15 BB or less, open-raising bleeds chips to 3-bets. Simplify to all-in or fold to maximize fold equity.',
  },
  {
    title: 'Push Ranges by Position (10 BB)',
    body:  'UTG: 22+, ATs+, AJo+, KQs (~12%). CO: 22+, A2s+, A8o+, KTs+, KJo+, QJs, JTs (~22%). BTN: 22+, A2s+, A2o+, K2s+, K8o+, Q5s+, Q9o+, J7s+, JTo, T7s+, 97s+ (~40%). SB: 22+, A2+, K2s+, K5o+, Q2s+, Q7o+, J4s+, J8o+, T6s+, T8o+, 96s+, 86s+, 76s (~55%).',
  },
  {
    title: 'Push Ranges by Position (15 BB)',
    body:  'UTG: 55+, ATs+, AJo+, KQs (~10%). CO: 22+, A5s+, ATo+, KTs+, KQo, QJs (~16%). BTN: 22+, A2s+, A5o+, K8s+, KTo+, Q9s+, QJo, JTs, T9s (~28%). SB: 22+, A2s+, A2o+, K4s+, K9o+, Q7s+, QTo+, J8s+, JTo, T8s+, 98s (~38%).',
  },
  {
    title: 'Push Ranges by Position (20 BB)',
    body:  'Edge of push/fold; min-raise from EP, shove from LP. BTN: 22+, A2s+, A7o+, K9s+, KJo+, QTs+, JTs (~22%). SB: 22+, A2s+, A3o+, K7s+, KTo+, Q9s+, QJo, J9s+, T9s (~30%).',
  },
  {
    title: 'Calling Ranges vs Shoves',
    body:  'No fold equity when calling. vs 10 BB shove: 55+, ATs+, AJo+, KQs (~12%). vs 15 BB: 77+, AJs+, AQo+, KQs (~9%). Tighten further near bubble.',
  },
  {
    title: 'The "Any Two Cards" Threshold',
    body:  'At 5 BB or less, shove any two from LP. Blinds cost ~30%/orbit; even 72o has ~35% equity + fold equity.',
  },
  {
    title: 'Min-Raising vs Shoving',
    body:  '18-25 BB: min-raise from EP/MP (fold to 3-bet loses only ~2.2 BB); shove from CO/BTN/SB for max pressure.',
  },
  {
    title: 'ICM Adjustments to Push/Fold',
    body:  'Near bubble: tighten push ranges ~20-30%, calling ranges even more. Big stacks push wide; medium/short stacks play much tighter.',
  },
];
