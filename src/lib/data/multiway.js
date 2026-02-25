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
    note:      'More players = more chances someone woke up with a strong hand. Marginal hands lose EV fast multiway.',
  },
  {
    aspect:    '3-bet / squeeze range',
    hu:        'Balanced polar range',
    threeWay:  'Tighten bluffs, value-heavy',
    fourWay:   'Near value-only squeezes',
    note:      'Squeezing multiple callers requires more equity. Bluff-squeezes have low fold equity multiway.',
  },
  {
    aspect:    'Calling raises with speculative hands',
    hu:        'Wide — implied odds OK',
    threeWay:  'Good — more callers = more dead money',
    fourWay:   'Excellent for sets, SCs with caution',
    note:      'Speculative hands (small pairs, suited connectors) gain implied odds multiway but need to make strong hands.',
  },
  {
    aspect:    'Blind defense frequency',
    hu:        '~50–55% vs BTN steal',
    threeWay:  'Tighten to ~35–40%',
    fourWay:   'Tighten to ~25–30%',
    note:      'Two players already in the pot reduces your expected equity on marginal defended hands.',
  },
  {
    aspect:    'Limping / over-limping',
    hu:        'Solver: mostly fold or raise',
    threeWay:  'Over-limping OK with implied odds',
    fourWay:   'Over-limping profitable with SCs/pairs',
    note:      'Multiway pots legitimize over-limping behind multiple callers with suited connectors and pairs.',
  },
  {
    aspect:    'Flat-calling 3-bets',
    hu:        'Wide calling range IP',
    threeWay:  'Tighten significantly',
    fourWay:   'Near value-only calls',
    note:      'Calling 3-bets cold multiway is extremely tight. You\'re OOP vs the 3-bettor and facing two or more players postflop.',
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
    notes:     'PFR has nut advantage with Ax combos. Bet small and infrequently — avoid bloating the pot with marginal hands.',
  },
  {
    texture:   'Dry K-high (K-8-3 rainbow)',
    freq3way:  25,
    freq4way:  12,
    size:      '33%',
    hands:     'Kx, sets, overpairs',
    notes:     'Similar to A-high. PFR c-bets strong Kx hands. Check hands that don\'t benefit from protection.',
  },
  {
    texture:   'Mid-card dry (8-5-2 rainbow)',
    freq3way:  15,
    freq4way:  8,
    size:      '33–50%',
    hands:     'Sets, overpairs only',
    notes:     'Board heavily favors callers. PFR should check almost always — only c-bet with strong made hands.',
  },
  {
    texture:   'Connected 2-tone (J-T-8 two-tone)',
    freq3way:  12,
    freq4way:  6,
    size:      '50–66%',
    hands:     'Nut straights, top two pair, sets',
    notes:     'Wet connected boards are dangerous multiway — many callers can have draws and disguised made hands. Check-call becomes the primary line.',
  },
  {
    texture:   'Paired board (K-K-7)',
    freq3way:  35,
    freq4way:  20,
    size:      '25–33%',
    hands:     'Kx, overpairs, 77',
    notes:     'PFR has nut advantage from Kx combos. Bet small to extract value. Multiway, still check most non-Kx hands.',
  },
  {
    texture:   'Monotone (9-7-3 same suit)',
    freq3way:  10,
    freq4way:  5,
    size:      '33%',
    hands:     'Nut flush, top set + flush draw',
    notes:     'Extremely low frequency multiway. Many players have pieces of a flush. Check almost everything, bet only nut-advantage hands.',
  },
  {
    texture:   'Ace-high 2-tone (A-8-5 two-tone)',
    freq3way:  30,
    freq4way:  18,
    size:      '33–50%',
    hands:     'Nut flush draw + Ax, strong Ax made hands',
    notes:     'Nut flush draw adds complexity. PFR c-bets top nut hands and nut draws. Check the bottom of range entirely.',
  },
  {
    texture:   'Low connected (5-4-3 two-tone)',
    freq3way:  10,
    freq4way:  5,
    size:      '50%',
    hands:     'Sets, nut straights (67, 62)',
    notes:     'Low connected boards favor callers\' ranges significantly. Rare c-bet with only strongest holdings.',
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
    notes:     'Now effectively HU on the turn, but stacks are committed. Continue with strong hands. Shut down bluffs — the flop caller often has showdown value.',
  },
  {
    situation: 'You checked flop multiway, villain bet, you called',
    action:    'Lead turn (donk)',
    hands:     'Very rarely — strong two pair, sets hitting a draw completing card',
    frequency: '<8%',
    sizing:    '50–70% pot',
    notes:     'Donk-betting multiway is almost never correct in GTO. Prefer check-raising or calling. Only lead when you strongly disconnect from the draw completing.',
  },
  {
    situation: 'Multiple players see the turn, it\'s checked around',
    action:    'Lead on the river',
    hands:     'Strong value hands (two pair+), some bluffs with blockers',
    frequency: '40–55%',
    sizing:    '50–75% pot',
    notes:     'When no one bets the turn multiway, the river is often a leadership opportunity. Bet value and well-chosen bluffs. Marginal hands still check.',
  },
  {
    situation: 'You hold a draw in a multiway pot',
    action:    'Call (not raise)',
    hands:     'Flush draws, OESDs with good pot odds',
    frequency: 'When pot odds are correct (see equity table)',
    sizing:    '—',
    notes:     'Draws play much more passively multiway. Raising draws has less fold equity vs multiple opponents. Just call with correct pot odds and hope to hit.',
  },
  {
    situation: 'River bet into you in a 3-way pot',
    action:    'Call or fold (rarely raise)',
    hands:     'Call with two pair+; fold marginal pairs and bluff-catchers',
    frequency: 'Tight calling range',
    sizing:    '—',
    notes:     'When villain bets into multiple players on the river, their value range is incredibly strong. Bluffs are rare. Widen your fold frequency significantly vs multiway river bets.',
  },
];

// ── Core multiway principles ──────────────────────────────────────────────────
export const multiwayPrinciples = [
  {
    title: 'Nut advantage matters more',
    body:  'In multiway pots, medium-strength hands have very low equity realization. Only nut and near-nut hands are worth betting for value — the probability that one of multiple opponents has you beat is much higher than heads-up.',
  },
  {
    title: 'Bluffing frequency drops dramatically',
    body:  'Each additional player in the pot reduces the success probability of a bluff multiplicatively. A bluff that works 50% HU needs to work 25% vs two players and ~12% vs three. Bluffing multiway is almost always unprofitable.',
  },
  {
    title: 'Slow-playing gains value',
    body:  'Strong hands (sets, two pair) often play better as check-calls or check-raises multiway. Betting strong hands immediately may win a small pot; checking can allow other players to build the pot with weaker hands or draws that then pay off your check-raise.',
  },
  {
    title: 'Position advantage amplifies',
    body:  'Being last to act in a multiway pot is an enormous advantage — you see all players\' actions before deciding. IP players should be more aggressive when others show weakness; OOP players should be more cautious and use larger sizings.',
  },
  {
    title: 'Draw equity is diluted',
    body:  'A flush draw that is ~35% vs one opponent is ~20% vs two opponents who might also have strong hands. Implied odds can compensate, but you must hit strong enough hands to win a pot from multiple sources.',
  },
  {
    title: 'Tighten preflop, not postflop tactics',
    body:  'The main adjustment in multiway pots is preflop hand selection — play tighter. Once you are in a multiway pot with a strong hand, your postflop tactics are largely the same: bet for value, protect your strong hands, and avoid fancy plays.',
  },
];
