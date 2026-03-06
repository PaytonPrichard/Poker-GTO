// ─────────────────────────────────────────────────────────────────────────────
// Bluffing & Player Profiling — GTO reference data
// ─────────────────────────────────────────────────────────────────────────────

// ── When to bluff: conditions that make bluffs profitable ───────────────────
export const bluffConditions = [
  {
    factor:  'You hold blockers to villain\'s value range',
    impact:  'high',
    why:     'Removing strong combos from villain\'s range makes them more likely to fold.',
    example: 'A♠7♦ on K♠9♠4♠2♣3♦ — you block the nut flush, great river bluff spot.',
  },
  {
    factor:  'Board texture completes obvious draws',
    impact:  'high',
    why:     'Completed draws let you credibly represent the nuts; villain must respect it.',
    example: 'J♥T♥4♠2♣8♥ — river flush completes; large bet reps the flush even with air.',
  },
  {
    factor:  'You are in position (IP)',
    impact:  'high',
    why:     'IP bluffs exploit check-as-weakness signals; OOP bluffs need stronger hands.',
    example: 'BTN vs BB — villain checks river after check-calling two streets; capped range = profitable bluff.',
  },
  {
    factor:  'Opponent has a capped range',
    impact:  'high',
    why:     'Prior actions (flatting, checking) cap villain\'s range, forcing higher fold frequency.',
    example: 'Villain cold-called 3-bet, check-called two streets — large river bet pressures their capped range.',
  },
  {
    factor:  'Few opponents (heads-up preferred)',
    impact:  'medium',
    why:     'Each extra player reduces success multiplicatively — 50% HU drops to ~25% 3-way.',
    example: 'HU river = viable bluff; 3-way pot = almost never bluff without strong blockers.',
  },
  {
    factor:  'Credible story / line makes sense',
    impact:  'medium',
    why:     'Your action sequence must represent a plausible hand; inconsistent lines get called.',
    example: '3-bet pre, c-bet Q-high flop, barrel turn, bomb river K — reps AK/KQ perfectly.',
  },
  {
    factor:  'Stack depth allows fold pressure',
    impact:  'medium',
    why:     'Deep stacks enable large bets with fold pressure; shallow stacks leave villain pot-committed.',
    example: '100bb effective = pot-sized river creates fold pressure; 30bb = villain calls off with any pair.',
  },
  {
    factor:  'Your hand has no showdown value',
    impact:  'low',
    why:     'GTO bluffs with zero showdown value; marginal hands are better as bluff-catchers.',
    example: 'Busted flush draw = perfect bluff; third pair = poor bluff since it wins at showdown.',
  },
];

// ── Blocker theory: which cards make good bluffs ────────────────────────────
export const blockerScenarios = [
  {
    scenario:   'Nut flush blocker on a flush-completing river',
    blocker:    'A♠ (when board has 3+ spades)',
    effect:     'Removes A♠x♠ (nut flush) from villain\'s range',
    bluffQuality: 'excellent',
    detail:     'Villain can\'t have the nuts; second-nut flush folds to large bets at high frequency.',
  },
  {
    scenario:   'Straight blocker on a straight-completing board',
    blocker:    'Key connecting cards (e.g. T on 789x board)',
    effect:     'Removes many straight combos from villain\'s range',
    bluffQuality: 'good',
    detail:     'Holding cards villain needs for straights reduces their calling combos significantly.',
  },
  {
    scenario:   'Top pair blocker on a paired board',
    blocker:    'One card matching the board pair (e.g. K on K-K-7 board)',
    effect:     'Removes trips/quads from villain\'s range',
    bluffQuality: 'good',
    detail:     'Holding a paired board card makes villain far less likely to have trips.',
  },
  {
    scenario:   'Set blocker when representing an overpair',
    blocker:    'One card of the top pair (e.g. Q on Q-7-3 board)',
    effect:     'Reduces villain\'s QQ/QJ/QT combos',
    bluffQuality: 'moderate',
    detail:     'Reduces villain\'s top pair combos but less powerful than flush/straight blockers.',
  },
  {
    scenario:   'Unblocker — you DON\'T block villain\'s folding range',
    blocker:    'Low cards unrelated to the board',
    effect:     'Preserves villain\'s weak hands (the ones that fold)',
    bluffQuality: 'important concept',
    detail:     'Don\'t block villain\'s folding range — you want their weak hands to remain in range.',
  },
  {
    scenario:   'Double blocker to two pair / sets',
    blocker:    'Two of the board cards (e.g. J+T on J-T-4 board)',
    effect:     'Massively reduces strong combos',
    bluffQuality: 'excellent',
    detail:     'Two matching board cards dramatically reduce villain\'s set and two-pair combos.',
  },
];

// ── Player profiling: types and how to adjust bluffing ──────────────────────
export const playerProfiles = [
  {
    type:    'Nit / Rock',
    vpip:    '< 15%',
    pfr:    '< 12%',
    traits:  'Only plays premiums; folds to aggression without the nuts.',
    bluffAdj: 'Bluff MORE — they fold too often',
    detail:  'Over-fold every street; one barrel on scary boards usually enough. If they call twice, stop.',
    keyStat: '3-bet fold: > 70%',
    tells:   'Limp-folds often, never check-raises without nuts, tank-folds rivers.',
  },
  {
    type:    'TAG (Tight-Aggressive)',
    vpip:    '18–24%',
    pfr:    '15–22%',
    traits:  'Solid ranges, bets for value, makes disciplined folds.',
    bluffAdj: 'Bluff selectively — they respect your bets but also hero-call',
    detail:  'Bluff on range-favorable boards with blockers; they hero-call if your line is inconsistent.',
    keyStat: 'Fold to c-bet: 45–55%',
    tells:   'Consistent sizing, uses position well, rarely plays out of line.',
  },
  {
    type:    'LAG (Loose-Aggressive)',
    vpip:    '28–35%',
    pfr:    '22–30%',
    traits:  'Wide ranges, heavy 3-betting and aggression; can have anything.',
    bluffAdj: 'Bluff LESS — they call and re-bluff wide',
    detail:  'Trap with strong hands; value-bet thin and check-raise their aggression instead of bluffing.',
    keyStat: 'Aggression factor: > 3.0',
    tells:   'Overbets, 3-bets light, barrels multiple streets, rarely checks back strong hands.',
  },
  {
    type:    'Calling Station',
    vpip:    '35–50%',
    pfr:    '< 15%',
    traits:  'Calls with nearly anything; rarely raises; won\'t fold pairs or ace-high.',
    bluffAdj: 'NEVER bluff — value-bet relentlessly',
    detail:  'They never fold; value-bet thin (top pair weak kicker is strong). Every bluff is -EV.',
    keyStat: 'Fold to river bet: < 30%',
    tells:   'Calls every street showing third pair; never raises without the nuts.',
  },
  {
    type:    'Maniac',
    vpip:    '> 50%',
    pfr:    '> 30%',
    traits:  'Plays nearly every hand; raises with trash; extremely unpredictable.',
    bluffAdj: 'NEVER bluff — let them hang themselves',
    detail:  'Call them down lighter; tighten preflop, then let them bluff off their stack.',
    keyStat: 'WTSD (went to showdown): > 35%',
    tells:   'Overbets randomly, min-raises, plays every hand from every position.',
  },
  {
    type:    'Weak-Tight (Scared Money)',
    vpip:    '18–25%',
    pfr:    '12–18%',
    traits:  'Reasonable hand count but folds under pressure; hates big pots without the nuts.',
    bluffAdj: 'Bluff MORE — especially on scary boards and rivers',
    detail:  'Over-fold to pressure; fold overpairs on scary rivers, never call 3-bets without QQ+.',
    keyStat: 'Fold to 3-bet: > 65%',
    tells:   'Long pauses before folding, checks back decent hands "to be safe," avoids large bets.',
  },
];

// ── Common bluffing spots with examples ─────────────────────────────────────
export const bluffSpots = [
  {
    spot:       'Missed flush draw — river bluff',
    street:     'River',
    position:   'IP or OOP',
    setup:      'Flush draw bricked the river after betting flop and turn.',
    action:     'Bet 66–100% pot',
    frequency:  'High (with nut flush blocker)',
    blockers:   'A♠/K♠ of missed suit removes villain\'s nut flush; they fold made hands at high rate.',
    avoid:      'Don\'t bluff if you block villain\'s folding range (missed suited connectors).',
    profiling:  'Excellent vs nits/weak-tight. Avoid vs calling stations.',
  },
  {
    spot:       'Straight-completing river overbet',
    street:     'River',
    position:   'IP (preferred)',
    setup:      'River completes a straight on a draw-heavy board; you have air.',
    action:     'Overbet 1.2–1.5x pot',
    frequency:  'Medium (when line is credible)',
    blockers:   'Key straight cards (e.g. T on 6-7-8-9 board) block villain\'s nuts.',
    avoid:      'Don\'t overbet bluff with showdown value (two pair that might be good).',
    profiling:  'Strong vs TAGs who respect overbets. Weak vs stations and maniacs.',
  },
  {
    spot:       'Flop check-raise bluff (semi-bluff)',
    street:     'Flop',
    position:   'OOP (usually BB)',
    setup:      'You have a draw + backdoor equity vs villain\'s flop c-bet.',
    action:     'Check-raise to 3x villain\'s c-bet',
    frequency:  'Medium (balanced with value check-raises)',
    blockers:   'Not critical on flop — draw equity and fold equity are the main drivers.',
    avoid:      'Don\'t check-raise bluff on PFR-favorable boards (A-K-Q textures).',
    profiling:  'Best vs high c-bet + high fold-to-raise. Terrible vs calling stations.',
  },
  {
    spot:       'Turn probe bet (stab after checked-through flop)',
    street:     'Turn',
    position:   'OOP',
    setup:      'Villain checked back flop; turn is a scare card.',
    action:     'Bet 50–66% pot',
    frequency:  'High (villain\'s range is capped by not c-betting)',
    blockers:   'Block overcards that hit the turn (e.g. hold K when K turns).',
    avoid:      'Don\'t probe vs villains who check-back strong hands (trappers).',
    profiling:  'Very effective vs straightforward players. Less effective vs LAGs with traps.',
  },
  {
    spot:       'Triple barrel on a brick runout',
    street:     'River',
    position:   'IP',
    setup:      'PFR + c-bet + turn barrel; river is a low blank changing nothing.',
    action:     'Bet 66–75% pot',
    frequency:  'Low (very selective — need blockers + reads)',
    blockers:   'Critical — need Ax/Kx blockers; without blockers triple-barrels are -EV.',
    avoid:      'Don\'t triple-barrel without a coherent story planned from the flop.',
    profiling:  'Only vs nits and weak-tight. TAGs hero-call; stations snap-call.',
  },
  {
    spot:       'Squeeze bluff preflop',
    street:     'Preflop',
    position:   'CO/BTN/SB (vs open + cold call)',
    setup:      'EP opens, someone cold-calls; you 3-bet squeeze with air.',
    action:     '3-bet to 3.5–4x the open',
    frequency:  'Medium (balanced with value 3-bets)',
    blockers:   'Ax blocks AA/AK, Kx blocks KK/AK. Best: A5s, A4s, KJs type hands.',
    avoid:      'Don\'t squeeze into tight openers or hands that play well postflop (suited connectors).',
    profiling:  'Best vs low 3-bet defense. Avoid vs LAGs/maniacs who 4-bet light.',
  },
];

// ── Key bluffing principles ─────────────────────────────────────────────────
export const bluffPrinciples = [
  {
    title: 'GTO bluffing ratio: ~2 value bets to 1 bluff',
    body:  'River range: ~2 value combos per 1 bluff combo (pot-sized bet) makes you unexploitable.',
  },
  {
    title: 'Blockers > hand strength for bluff selection',
    body:  'Cards you hold matter more than hand strength — zero showdown value + great blockers = ideal bluff.',
  },
  {
    title: 'Player profiling overrides GTO bluff frequencies',
    body:  'GTO ~33% bluff frequency becomes 0% vs stations, 50%+ vs nits. Always adjust to opponent.',
  },
  {
    title: 'Bluff credibility comes from your whole line',
    body:  'Plan bluffs from the flop — check-check-bomb river is an inconsistent, easily exploited line.',
  },
  {
    title: 'The earlier the street, the wider you can bluff',
    body:  'Flop semi-bluffs have equity to improve; river bluffs rely entirely on fold equity.',
  },
  {
    title: 'Fold equity is not constant — it\'s opponent-dependent',
    body:  'Same bluff has 80% fold equity vs a nit and 10% vs a station — always evaluate the specific opponent.',
  },
];
