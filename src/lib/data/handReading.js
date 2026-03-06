// ─────────────────────────────────────────────────────────────────────────────
// Hand Reading — GTO reference data
// ─────────────────────────────────────────────────────────────────────────────

// ── Range Narrowing ─────────────────────────────────────────────────────────
export const rangeNarrowing = [
  {
    title: 'Think in Ranges, Not Specific Hands',
    body:  'Assign opponents a range based on position, action, and tendencies — then eliminate hands inconsistent with each action.',
  },
  {
    title: 'Preflop Actions Define the Starting Range',
    body:  'EP open = top 12-15%; 3-bet = premiums or bluffs; cold-call = medium strength; limp = widest, weakest range.',
  },
  {
    title: 'Position-Based Range Construction',
    body:  'UTG ~15% (big pairs, broadways). CO ~25% (add suited connectors). BTN 40-50% (small pairs, suited gappers, offsuit broadways).',
  },
  {
    title: 'Board Texture Interaction with Ranges',
    body:  'K-Q-J favors PFR (more KK, QQ, AK combos). 7-6-5 favors caller (more 89s, 76s). Identify which range connects better.',
  },
  {
    title: 'Bet Sizing as Information',
    body:  'Small bet (25-33% pot) = wide merged range. Large bet (75-100%+ pot) = polarized (nuts or bluffs). Sizing shifts signal range changes.',
  },
  {
    title: 'Timing Tells and Action Speed',
    body:  'Instant call = draw or medium hand. Long pause then raise = genuine strength. Use timing as a tiebreaker, not primary read.',
  },
  {
    title: 'Combining All Streets to Narrow the Range',
    body:  'Start with preflop range, remove inconsistent hands each street. By the river, a narrow range remains. Contradictory lines suggest opponent error — call more.',
  },
];

// ── Board Texture Reading ───────────────────────────────────────────────────
export const boardTextureReading = [
  {
    texture:      'Dry Rainbow High (e.g., A-7-2 rainbow)',
    description:  'Extremely dry — very few draws, stable equities. Board rarely changes on later streets.',
    favoredRange: 'PFR',
    keyPoints:    'PFR has far more Ax combos and overpairs. Caller lacks strong aces (would have 3-bet). High c-bet frequency, small sizing.',
  },
  {
    texture:      'Dry Rainbow Low (e.g., 8-4-2 rainbow)',
    description:  'Low disconnected, no flush draw. PFR has overpair advantage but caller has more sets (44, 22).',
    favoredRange: 'Neutral',
    keyPoints:    'PFR has overpairs (99-AA); caller has more small sets. Lower c-bet frequency than ace-high dry boards. More check-raises from caller.',
  },
  {
    texture:      'Wet Connected (e.g., J-T-8 two-tone)',
    description:  'Highly dynamic — many straight draws, flush draws, and combo draws. Equities shift dramatically on the turn.',
    favoredRange: 'Caller',
    keyPoints:    'Caller connects heavily (QJ, T9, 97, flush draws). PFR c-bets less often with larger sizing. Frequent check-raises from caller.',
  },
  {
    texture:      'Monotone (e.g., 9-7-3 all spades)',
    description:  'Completed flush possible; single-suit draws abundant. Non-flush overpairs are significantly devalued.',
    favoredRange: 'Caller',
    keyPoints:    'Caller has more flush combos (flatted suited hands). Very low PFR c-bet frequency. Bets are large and polarized — flush or blocker bluff.',
  },
  {
    texture:      'Paired Board (e.g., K-K-7)',
    description:  'Fewer combos in play; trips/full house possible. Very static — minimal draws, equities rarely change.',
    favoredRange: 'PFR',
    keyPoints:    'PFR has more Kx broadways (AK, KQ) and full house combos. High c-bet frequency, small sizing. Trips and boats are disguised.',
  },
  {
    texture:      'Broadway Heavy (e.g., K-Q-J)',
    description:  'Many straights, pair-plus-draw combos, and OESDs. High-action texture; top pair alone is often insufficient.',
    favoredRange: 'PFR',
    keyPoints:    'PFR has slight edge with premium broadways (AK, AQ, KQ). Caller connects via suited broadways and sets. ATs/T9s = nut straight. Large sizings common.',
  },
  {
    texture:      'Low Connected (e.g., 5-4-3 two-tone)',
    description:  'PFR rarely connects. Overpairs are vulnerable; hands like A2, 67, 76 have strong equity. Equities run close.',
    favoredRange: 'Caller',
    keyPoints:    'Caller has more suited connectors (67s, 65s, 54s) and small sets (55, 44, 33). Low PFR c-bet frequency. Caller check-raises are very credible.',
  },
  {
    texture:      'Ace-High Two-Tone (e.g., A-8-5 two-tone)',
    description:  'Common texture. Ace favors PFR but flush draw gives caller equity. Medium-dynamic with balanced strategic options.',
    favoredRange: 'PFR',
    keyPoints:    'PFR has range advantage with Ax holdings. Caller has flush draws, sets of 88/55, occasional two pair. C-bet frequently at 50-66% pot.',
  },
];

// ── Sizing Tells ────────────────────────────────────────────────────────────
export const sizingTells = [
  {
    title: 'Min-Bets and Tiny Bets (< 25% Pot)',
    body:  'Almost always a blocking bet or weakness. Respond by raising polarized — strong value hands and best bluffs.',
  },
  {
    title: 'Small Bets: 25-33% Pot',
    body:  'Range bet sizing — wide range on boards with significant range advantage. Defend 70-75% of your range against it.',
  },
  {
    title: 'Medium Bets: 50-66% Pot',
    body:  'Standard balanced sizing for value, protection, and bluffs on medium-dynamic boards. Defend ~55-60% of your range. Hardest to read.',
  },
  {
    title: 'Large Bets: 75-100% Pot',
    body:  'Polarized range — very strong or bluffing, few medium hands. Pot-sized bluffs need only 50% folds. Continue with strongest holdings only.',
  },
  {
    title: 'Overbets: 100%+ Pot',
    body:  'Most polarized action — nuts or high-conviction bluff. Correct when only one player\'s range contains the nuts. Forces very tight calls.',
  },
  {
    title: 'Check-Raises: Very Strong or Semi-Bluff',
    body:  'Naturally polarized — strong made hands (sets, two pair) or strong semi-bluffs (flush draws, OESDs). Discount middle-range hands heavily.',
  },
  {
    title: 'The Information in Bet Timing',
    body:  'Quick small bet = rehearsed blocking bet. Delayed large bet = genuine strength. Quick large bet = auto-pilot polarized action. Deviations from usual timing are most reliable.',
  },
];

// ── Street-by-Street Examples ───────────────────────────────────────────────
export const streetByStreet = [
  {
    title:   'UTG vs BTN: Ace-High Dry Board',
    preflop: 'UTG opens 2.5 BB (~15% range). BTN calls with suited connectors, mid-pairs, broadways. Heads-up, IP.',
    flop:    'A♠ 7♦ 2♣. UTG c-bets 33% pot — textbook range bet on ace-high dry board. Range still very wide, ~70-80% of opening range betting.',
    turn:    '9♥. UTG bets 66% pot — larger, polarized. Range narrows to AK/AQ/AJ, overpairs (KK, QQ), bluffs with gutshots. Medium aces check.',
    river:   '3♦. UTG bets 80% pot — triple barrel on brick, heavily polarized. Value: AK/AQ, overpairs. Bluffs: busted backdoors like KQs.',
    lesson:  'On dry boards, PFR c-bets frequently small. Each subsequent barrel narrows and polarizes the range, removing medium-strength hands.',
  },
  {
    title:   'CO vs BB: Wet Connected Flop',
    preflop: 'CO opens 2.5 BB (~25% range). BB defends wide with suited hands, connectors, broadways. OOP.',
    flop:    'J♠ T♥ 8♠. CO c-bets 55% pot — selective on wet board. Betting: JJ, TT, QJ, KJ, draws (AQ, KQ, Q9, spades). Checking: weak overcards, small pairs.',
    turn:    '4♦. CO bets 70% pot. Brick; continued aggression narrows range to strong top pairs (KJ, QJ+draw), two pair, sets, combo draws. Bare overcards fold.',
    river:   '2♣. CO bets 90% pot. Draws bricked — heavily polarized: sets/two-pair for value, missed straights (AQ, KQ, Q9) as bluffs. One-pair never bets this size.',
    lesson:  'On wet boards, large multi-street bets polarize to strong value and bluffs. When draws brick, call with best bluff-catchers, fold weak pairs.',
  },
  {
    title:   'BTN 3-Bet vs BB: Low Paired Board',
    preflop: 'BTN opens, BB 3-bets (polarized: AA-QQ, AK, AQs for value; A5s-A2s, suited connectors as bluffs). BTN calls with JJ-66, KQs-JTs.',
    flop:    '6♠ 6♦ 3♥. BB bets 33% pot — paired dry board, 3-bettor has overpair advantage. Small bet, high frequency. Trips (having a 6) rare for either player.',
    turn:    'K♣. BB bets 70% pot. King improves AK, keeps KK strong. Range narrows to overpairs (AA, KK, QQ), AK, semi-bluffs (A5s-A4s). Weak aces check.',
    river:   'T♠. BB checks — caps their range. AA/KK/AK would bet for value. Likely QQ-JJ or abandoned bluffs. Our medium pairs (99, 88) are strong bluff-catchers.',
    lesson:  'A check after two barrels caps the range — strongest value hands would keep betting. Exploit by value betting thin or calling lighter.',
  },
  {
    title:   'MP vs CO: Monotone Flop',
    preflop: 'MP opens 2.5 BB (~18% range). CO calls with pairs, suited connectors, suited broadways, suited aces.',
    flop:    'Q♥ 8♥ 4♥. MP checks — common on monotone boards (caller has more flushes). Checking range: overpairs without ♥, AQ no ♥, one-heart hands wanting to check-raise.',
    turn:    'J♣. MP leads 50% pot — unusual after flop check. Non-heart turn gives confidence. Range: QQ set, QJ two pair, JJ turned set, A♥x semi-bluffs.',
    river:   '2♠. MP bets 75% pot. No flush arrived. Two barrels after flop check = heavily weighted toward trapping hands (sets, two pair, overpairs). Bluffs are rare in this line.',
    lesson:  'Flop check then later-street aggression often reveals a trap. On monotone boards without additional flush cards, this line is very strong and rarely a bluff.',
  },
  {
    title:   'SB vs BB: Multi-Street Barrel Line',
    preflop: 'SB limps, BB checks. Both ranges extremely wide and undefined — neither showed preflop strength.',
    flop:    'K♦ 9♠ 5♦. BB bets 50% pot — takes initiative in limped pot. Betting range wide: any K/9/5, diamond draws, bluffs. One bet barely narrows this range.',
    turn:    '2♣. BB bets 66% pot. Second barrel narrows range — weak 9x/5x check now. Weighted toward Kx, strong 9x, diamond draws, persistent bluffs.',
    river:   '7♥. BB bets 80% pot. Diamonds missed. Value: strong kings (K9, K5 two pair, KT+), sets, rare 86 straight. Bluffs: busted diamond draws. Triple barrels in limped pots deserve extra respect.',
    lesson:  'In limped pots, preflop ranges are undefined so postflop actions matter more. Multi-street aggression for a small pot is credible — respect triple barrels.',
  },
];
