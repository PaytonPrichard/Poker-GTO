// ─────────────────────────────────────────────────────────────────────────────
// Multiway Pots — GTO reference data
// ─────────────────────────────────────────────────────────────────────────────

// ── Preflop adjustments: HU vs 3-way vs 4-way ────────────────────────────────
export const preflopAdjustments = [
  {
    aspect:    'Opening range',
    hu:        'Full GTO range',
    threeWay:  'Tighten ~5–10%',
    fourWay:   'Tighten ~10–15%',
    note:      'More players means more likely someone has a strong hand; marginal hands lose EV fast.',
  },
  {
    aspect:    '3-bet / squeeze range',
    hu:        'Balanced polar range',
    threeWay:  'Tighten bluffs, value-heavy',
    fourWay:   'Near value-only squeezes',
    note:      'Squeezing multiple callers requires more equity; bluff-squeezes have low fold equity.',
  },
  {
    aspect:    'Calling raises with speculative hands',
    hu:        'Wide — implied odds OK',
    threeWay:  'Good — more callers = more dead money',
    fourWay:   'Excellent for sets, SCs with caution',
    note:      'Speculative hands gain implied odds multiway but must make strong hands to profit.',
  },
  {
    aspect:    'Blind defense frequency',
    hu:        '~50–55% vs BTN steal',
    threeWay:  'Tighten to ~35–40%',
    fourWay:   'Tighten to ~25–30%',
    note:      'More players in the pot reduces your expected equity on marginal hands.',
  },
  {
    aspect:    'Limping / over-limping',
    hu:        'Solver: mostly fold or raise',
    threeWay:  'Over-limping OK with implied odds',
    fourWay:   'Over-limping profitable with SCs/pairs',
    note:      'Over-limping suited connectors and pairs is profitable behind multiple callers.',
  },
  {
    aspect:    'Flat-calling 3-bets',
    hu:        'Wide calling range IP',
    threeWay:  'Tighten significantly',
    fourWay:   'Near value-only calls',
    note:      'Cold calling 3-bets multiway is extremely tight; you\'re OOP vs multiple opponents postflop.',
  },
];

// ── Flop c-bet frequencies multiway ──────────────────────────────────────────
export const flopCbetMultiway = [
  {
    texture:   'Dry A-high (A-7-2 rainbow)',
    freq3way:  28,
    freq4way:  15,
    size:      '33%',
    hands:     'Top pair+, strong Ax',
    notes:     'PFR has nut advantage with Ax combos; bet small and infrequently.',
  },
  {
    texture:   'Dry K-high (K-8-3 rainbow)',
    freq3way:  25,
    freq4way:  12,
    size:      '33%',
    hands:     'Kx, sets, overpairs',
    notes:     'PFR c-bets strong Kx; check hands that don\'t need protection.',
  },
  {
    texture:   'Mid-card dry (8-5-2 rainbow)',
    freq3way:  15,
    freq4way:  8,
    size:      '33–50%',
    hands:     'Sets, overpairs only',
    notes:     'Board favors callers; PFR checks almost always, only betting strong made hands.',
  },
  {
    texture:   'Connected 2-tone (J-T-8 two-tone)',
    freq3way:  12,
    freq4way:  6,
    size:      '50–66%',
    hands:     'Nut straights, top two pair, sets',
    notes:     'Wet connected boards are dangerous multiway; check-call is the primary line.',
  },
  {
    texture:   'Paired board (K-K-7)',
    freq3way:  35,
    freq4way:  20,
    size:      '25–33%',
    hands:     'Kx, overpairs, 77',
    notes:     'PFR has nut advantage from Kx combos; bet small, check most non-Kx hands.',
  },
  {
    texture:   'Monotone (9-7-3 same suit)',
    freq3way:  10,
    freq4way:  5,
    size:      '33%',
    hands:     'Nut flush, top set + flush draw',
    notes:     'Extremely low frequency multiway; check almost everything, bet only nut hands.',
  },
  {
    texture:   'Ace-high 2-tone (A-8-5 two-tone)',
    freq3way:  30,
    freq4way:  18,
    size:      '33–50%',
    hands:     'Nut flush draw + Ax, strong Ax made hands',
    notes:     'PFR c-bets top nut hands and nut draws; check bottom of range.',
  },
  {
    texture:   'Low connected (5-4-3 two-tone)',
    freq3way:  10,
    freq4way:  5,
    size:      '50%',
    hands:     'Sets, nut straights (67, 62)',
    notes:     'Low connected boards heavily favor callers; c-bet only strongest holdings.',
  },
];

// ── Turn/river strategy for multiway ─────────────────────────────────────────
export const turnRiverGuide = [
  {
    situation: 'You c-bet flop multiway, one caller remains',
    action:    'Double barrel (turn)',
    hands:     'Strong made hands (two pair+), nut flush draws',
    frequency: '30–45% (tighter than heads-up)',
    sizing:    '60–75% pot',
    notes:     'Now effectively HU; continue with strong hands, shut down bluffs.',
  },
  {
    situation: 'You checked flop multiway, villain bet, you called',
    action:    'Lead turn (donk)',
    hands:     'Very rarely — strong two pair, sets hitting a draw completing card',
    frequency: '<8%',
    sizing:    '50–70% pot',
    notes:     'Donk-betting multiway is almost never GTO; prefer check-raising or calling.',
  },
  {
    situation: 'Multiple players see the turn, it\'s checked around',
    action:    'Lead on the river',
    hands:     'Strong value hands (two pair+), some bluffs with blockers',
    frequency: '40–55%',
    sizing:    '50–75% pot',
    notes:     'When turn checks through multiway, the river is a leadership opportunity for value and select bluffs.',
  },
  {
    situation: 'You hold a draw in a multiway pot',
    action:    'Call (not raise)',
    hands:     'Flush draws, OESDs with good pot odds',
    frequency: 'When pot odds are correct (see equity table)',
    sizing:    '—',
    notes:     'Draws play passively multiway; raising has less fold equity vs multiple opponents.',
  },
  {
    situation: 'River bet into you in a 3-way pot',
    action:    'Call or fold (rarely raise)',
    hands:     'Call with two pair+; fold marginal pairs and bluff-catchers',
    frequency: 'Tight calling range',
    sizing:    '—',
    notes:     'Villain\'s river bet into multiple players is very strong; bluffs are rare, fold more.',
  },
];

// ── Core multiway principles ──────────────────────────────────────────────────
export const multiwayPrinciples = [
  {
    title: 'Nut advantage matters more',
    body:  'Only nut and near-nut hands are worth value betting; medium-strength hands have very low equity realization multiway.',
  },
  {
    title: 'Bluffing frequency drops dramatically',
    body:  'Each additional player reduces bluff success multiplicatively: 50% HU, 25% vs two, ~12% vs three.',
  },
  {
    title: 'Slow-playing gains value',
    body:  'Strong hands often play better as check-calls or check-raises; let others build the pot with weaker holdings.',
  },
  {
    title: 'Position advantage amplifies',
    body:  'Acting last lets you see all players\' actions first; IP players exploit weakness, OOP players use larger sizings.',
  },
  {
    title: 'Draw equity is diluted',
    body:  'A flush draw is ~35% vs one opponent but ~20% vs two; implied odds compensate but you must hit strong.',
  },
  {
    title: 'Tighten preflop, not postflop tactics',
    body:  'The main multiway adjustment is tighter preflop selection; postflop tactics remain similar with strong hands.',
  },
];
