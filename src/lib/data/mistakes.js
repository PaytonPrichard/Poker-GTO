// ─────────────────────────────────────────────────────────────────────────────
// Common Mistakes & Leaks — GTO reference data
// ─────────────────────────────────────────────────────────────────────────────

// ── Preflop Leaks ─────────────────────────────────────────────────────────────
export const preflopLeaks = [
  {
    title:       'Playing Too Many Hands from Early Position',
    severity:    'high',
    description: 'Opening too wide from UTG/UTG+1 puts you OOP with dominated hands against the whole table.',
    fix:         'Open only ~12-15% from EP. If you can\'t comfortably face a 3-bet, fold it.',
  },
  {
    title:       'Cold-Calling Too Wide vs 3-Bets',
    severity:    'high',
    description: 'Calling 3-bets OOP with KJo/QTs/small pairs builds big pots with a capped, dominated range.',
    fix:         'Continue vs 3-bets with premium pairs, AK/AQs, suited broadways. Fold the rest unless deep and IP.',
  },
  {
    title:       'Not 3-Betting Enough for Value',
    severity:    'medium',
    description: 'Only 3-betting AA/KK/QQ/AK makes your range transparent — opponents fold everything but the nuts.',
    fix:         'Balance with value (QQ+, AK, AQs) and bluffs (A5s-A2s, suited connectors IP). Target 7-10% 3-bet frequency.',
  },
  {
    title:       'Limping Instead of Raising',
    severity:    'high',
    description: 'Open-limping sacrifices initiative, invites multiway pots, and signals weakness. You can\'t win blinds by limping.',
    fix:         'Raise or fold. If a hand is worth playing, it\'s worth raising. Only exception: completing SB in limped pots deep.',
  },
  {
    title:       'Over-Folding in the Blinds',
    severity:    'medium',
    description: 'Folding BB more than 60-65% vs BTN opens gives late position free steals.',
    fix:         'Defend BB wider with suited connectors, gappers, broadways, pairs. Use 3-bet bluffs from SB/BB.',
  },
  {
    title:       'Ignoring Stack Depth Adjustments',
    severity:    'medium',
    description: 'Same ranges at 30 BB and 150 BB ignores that speculative hands need deep stacks for implied odds.',
    fix:         'Tighten speculative hands when shallow. Below 25 BB, use push/fold. Widen premiums and high cards.',
  },
  {
    title:       'Playing the Same Ranges Regardless of Table Dynamics',
    severity:    'low',
    description: 'GTO assumes balanced opponents; ignoring table composition (nits, maniacs, regs) leaves EV on the table.',
    fix:         'Open wider vs tight blinds, tighten with aggro players behind, isolate weak players with wider value ranges.',
  },
  {
    title:       'Sizing Opens Inconsistently (Tells)',
    severity:    'medium',
    description: 'Raising 4x with premiums and 2.5x with speculative hands is a classic exploitable sizing tell.',
    fix:         'Use a consistent 2.2-2.5x open from each position regardless of hand to keep your range balanced.',
  },
];

// ── Postflop Leaks ────────────────────────────────────────────────────────────
export const postflopLeaks = [
  {
    title:       'C-Betting Too Frequently on Bad Board Textures',
    severity:    'high',
    description: 'Auto c-betting 80%+ on wet boards like 876ss or JT9 ignores that these favor the caller\'s range.',
    fix:         'Check more on low connected/monotone boards. Save high c-bet frequency for dry A-high/K-high boards.',
  },
  {
    title:       'Not Value Betting Thin Enough on the River',
    severity:    'high',
    description: 'Checking back river with top pair medium kicker or strong second pair leaves value on the table.',
    fix:         'If a worse hand can call, bet. Use 25-40% pot for thin river value to keep worse hands in.',
  },
  {
    title:       'Calling Too Much vs River Bets',
    severity:    'medium',
    description: 'Calling large river bets with medium hands that only beat bluffs ignores villain\'s polarized range.',
    fix:         'Think in bluff-to-value ratios. Vs pot-sized bet, need 33% bluff frequency to call. Fold if unlikely.',
  },
  {
    title:       'Giving Up Too Easily on Turns After C-Betting Flop',
    severity:    'medium',
    description: 'C-betting flop then check-folding every turn is a one-and-done bluff opponents easily float and exploit.',
    fix:         'Plan multi-street. Double barrel turns that improve your range, add equity, or scare villain\'s calling range.',
  },
  {
    title:       'Overplaying One-Pair Hands in Big Pots',
    severity:    'high',
    description: 'Committing 100+ BB with TPTK vs heavy aggression is costly — one pair rarely wins stacked pots.',
    fix:         'Fold strong one-pair hands vs turn/river raises. Stack off with two pair+ unless you have reads.',
  },
  {
    title:       'Not Adjusting Bet Sizing to Board Texture',
    severity:    'medium',
    description: 'Same 66% pot bet on AK2r and 987tt is suboptimal — sizing should match board texture.',
    fix:         'Use 25-33% pot on dry high-card boards. Use 66-75% pot on wet connected boards to charge draws.',
  },
  {
    title:       'Missing Check-Raise Opportunities',
    severity:    'low',
    description: 'Only calling OOP with strong hands caps your range and lets aggro opponents control pot size.',
    fix:         'Check-raise with value hands and draws OOP. Aim for ~8-12% flop check-raise frequency.',
  },
  {
    title:       'Failing to Account for Blockers When Bluffing',
    severity:    'medium',
    description: 'Bluffing without considering blockers misses key card removal effects on villain\'s continuing range.',
    fix:         'Bluff with hands that block villain\'s value (top pair, sets, flushes) and unblock folds. Suited aces are ideal.',
  },
];

// ── Mental Game ───────────────────────────────────────────────────────────────
export const mentalGame = [
  {
    title: 'Tilt Recognition and Management',
    body:  'Tilt degrades every decision at once. Know your triggers, have a plan: take a break, drop stakes, or quit.',
  },
  {
    title: 'Results-Oriented Thinking (The Biggest Leak)',
    body:  'Judge decisions by process, not outcome. A correct fold that would have rivered a flush is still correct.',
  },
  {
    title: 'Handling Bad Beats and Coolers',
    body:  'AA loses to KK 18% of the time — variance is guaranteed. Accept it as a core feature, not a personal attack.',
  },
  {
    title: 'Session Length and Fatigue Management',
    body:  'Decision quality degrades with fatigue. Set time limits, take breaks, and quit when focus slips.',
  },
  {
    title: 'Confidence vs Overconfidence',
    body:  'Confidence in process is essential; overconfidence (thinking you don\'t need to study) breeds complacency.',
  },
  {
    title: 'The Importance of Study Away from the Table',
    body:  'Table time builds intuition; off-table study with solvers and hand review drives real improvement. Aim for 1hr study per 3-4hrs play.',
  },
];

// ── Sizing Mistakes ───────────────────────────────────────────────────────────
export const sizingMistakes = [
  {
    title: 'Betting the Same Size with Entire Range (Exploitable)',
    body:  'One size for all hands lets opponents build a single defense. Use small bets merged, large bets polarized.',
  },
  {
    title: 'Min-Betting the River with Strong Hands',
    body:  'If villain calls a min-bet with second pair, they\'ll likely call half-pot too. Size river value for maximum extraction.',
  },
  {
    title: 'Overbetting Without Range Advantage',
    body:  'Overbets require nut advantage. Overbetting 765 flop as PFR is wrong — caller\'s range connects better.',
  },
  {
    title: 'Not Sizing Up with Draws on the Flop for Protection',
    body:  '33% pot on wet flops gives draws the right price. Use 66-75% pot to charge flush and straight draws properly.',
  },
  {
    title: 'Using the Same 3-Bet Size IP and OOP',
    body:  '3-bet 3x IP and 3.5-4x OOP. Bigger OOP sizing compensates for positional disadvantage postflop.',
  },
  {
    title: 'Pot-Sized Bets on Dry Boards (Inefficient)',
    body:  'On K72r you have huge range advantage — bet 25-33% pot at high frequency instead of risking a pot-sized bet.',
  },
  {
    title: 'Not Adjusting Sizing to Opponent Tendencies',
    body:  'Size up value vs calling stations, use small bluffs vs nits. Exploit tendencies — GTO is just the baseline.',
  },
];
