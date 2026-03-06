// ─────────────────────────────────────────────────────────────────────────────
// Hand Equity — GTO reference data
// ─────────────────────────────────────────────────────────────────────────────

// ── Matchup categories ────────────────────────────────────────────────────────
export const matchupCategories = [
  'All',
  'Overpair vs Overpair',
  'Pair vs Overcards',
  'Pair vs Dominated',
  'Pair vs Drawing Hand',
  'Set vs Draw',
  'Straight vs Flush Draw',
];

// ── Key matchups ──────────────────────────────────────────────────────────────
// equity = approximate hero equity at the start (preflop/all-in)
export const matchups = [
  // Overpair vs Overpair
  { hero: 'AA', villain: 'KK',  equity: 82, category: 'Overpair vs Overpair', notes: 'KK needs to hit a K; ~18% equity.' },
  { hero: 'KK', villain: 'QQ',  equity: 82, category: 'Overpair vs Overpair', notes: 'Lower pair has ~18% equity, same as AA vs KK.' },
  { hero: 'AA', villain: 'QQ',  equity: 83, category: 'Overpair vs Overpair', notes: 'Very similar to AA vs KK; ~17% for QQ.' },

  // Pair vs Overcards (classic coin flip)
  { hero: 'QQ', villain: 'AKo', equity: 55, category: 'Pair vs Overcards', notes: 'Classic race; pair is slight favorite if no overcard flops.' },
  { hero: 'JJ', villain: 'AKo', equity: 54, category: 'Pair vs Overcards', notes: 'Near coin flip; JJ slight favorite at 54%.' },
  { hero: 'TT', villain: 'AKo', equity: 54, category: 'Pair vs Overcards', notes: 'Similar to JJ; any overcard flop puts TT behind.' },
  { hero: 'TT', villain: 'AKs', equity: 52, category: 'Pair vs Overcards', notes: 'Flush draw gives AKs extra equity; TT barely favored at 52%.' },

  // Pair vs Dominated
  { hero: 'AA', villain: 'AKo', equity: 93, category: 'Pair vs Dominated', notes: 'AK needs two pair, straight, or runner-runner to win.' },
  { hero: 'KK', villain: 'KQo', equity: 83, category: 'Pair vs Dominated', notes: 'KQ dominated; needs quads or running Qs.' },
  { hero: 'QQ', villain: 'QJo', equity: 82, category: 'Pair vs Dominated', notes: 'QJ drawing only to Js and straights.' },

  // Pair vs Drawing Hand
  { hero: 'AA', villain: 'JTs', equity: 77, category: 'Pair vs Drawing Hand', notes: 'JTs has flush + straight draws but AA holds a big edge.' },
  { hero: 'QQ', villain: 'JTs', equity: 70, category: 'Pair vs Drawing Hand', notes: '70/30 favorite; JTs has straight outs that hit above QQ.' },
  { hero: 'TT', villain: '87s', equity: 70, category: 'Pair vs Drawing Hand', notes: 'Pair vs suited connector; 70/30 for the pair.' },
  { hero: 'AA', villain: '72o', equity: 88, category: 'Pair vs Drawing Hand', notes: 'Worst hand; 72o wins ~12% via miracle runouts.' },

  // Set vs Draw
  { hero: 'Set',           villain: 'Flush draw',         equity: 67, category: 'Set vs Draw', notes: 'Flush draw has 9 outs over 2 streets; set ~67% favorite.' },
  { hero: 'Set',           villain: 'Open-ended straight', equity: 70, category: 'Set vs Draw', notes: 'OESD has 8 outs; set can boat up. ~70/30.' },
  { hero: 'Set',           villain: 'Combo draw (FD+OESD)', equity: 40, category: 'Set vs Draw', notes: '15 outs make combo draw a slight favorite over a set on flop.' },

  // Straight vs Flush Draw
  { hero: 'Straight (flopped)', villain: 'Flush draw',    equity: 78, category: 'Straight vs Flush Draw', notes: 'Flush has ~9 outs on the turn; straight is 78% favorite.' },
  { hero: 'Top pair',           villain: 'Flush draw',    equity: 55, category: 'Straight vs Flush Draw', notes: 'Near 50/50 with 2 streets remaining.' },
  { hero: 'Two pair',           villain: 'Flush draw',    equity: 66, category: 'Straight vs Flush Draw', notes: '~66/34; two pair can boat up if flush completes.' },
];

// ── Outs and draw equity ──────────────────────────────────────────────────────
// turn = % after flop (1 card to come), river = % on turn (1 card to come)
// twoCards = approximate combined equity with 2 cards to come (rule of 4)
export const outsChart = [
  {
    draw:      'Flush draw',
    outs:      9,
    turn:      19,
    river:     19,
    twoCards:  35,
    notes:     '9 suited cards remain. Strong with fold equity and nut potential.',
  },
  {
    draw:      'Open-ended straight draw (OESD)',
    outs:      8,
    turn:      17,
    river:     17,
    twoCards:  32,
    notes:     '4 cards on each end complete it. Strong draw on non-flush boards.',
  },
  {
    draw:      'Combo draw (FD + OESD)',
    outs:      15,
    turn:      32,
    river:     33,
    twoCards:  54,
    notes:     'Monster draw; often a favorite over made hands on the flop.',
  },
  {
    draw:      'Flush draw + pair (any)',
    outs:      12,
    turn:      26,
    river:     26,
    twoCards:  45,
    notes:     '9 flush outs + ~3 outs for trips/two pair.',
  },
  {
    draw:      'Gutshot straight draw',
    outs:      4,
    turn:      9,
    river:     9,
    twoCards:  17,
    notes:     '4 cards fill the gap. Low equity; good as add-on to other draws.',
  },
  {
    draw:      'Pair to two pair (holding one pair)',
    outs:      5,
    turn:      11,
    river:     11,
    twoCards:  20,
    notes:     '2 outs to trip up + 3 kicker-pairing outs.',
  },
  {
    draw:      'Overcards (2 overcards)',
    outs:      6,
    turn:      13,
    river:     13,
    twoCards:  24,
    notes:     '6 outs for top pair. E.g., AK on 9-8-2 has ~24% with 2 cards to come.',
  },
  {
    draw:      'Set to full house (flopped set)',
    outs:      7,
    turn:      15,
    river:     15,
    twoCards:  28,
    notes:     '7 board-pairing outs to boat up. Key when behind a straight.',
  },
  {
    draw:      'Two pair to full house',
    outs:      4,
    turn:      9,
    river:     9,
    twoCards:  17,
    notes:     '4 outs to fill up when behind a flush or straight.',
  },
  {
    draw:      'Inside wrap (double-gutshot)',
    outs:      8,
    turn:      17,
    river:     17,
    twoCards:  32,
    notes:     'Two gutshots at once (e.g., T8 on J-9-2). Equivalent to OESD.',
  },
];

// ── Rule of 2 & 4 ─────────────────────────────────────────────────────────────
export const rule24 = {
  description: 'Multiply outs by 4 on flop (2 cards to come) or by 2 on turn (1 card to come) for approximate equity %.',
  examples: [
    { outs: 9,  label: 'Flush draw',  flop: 36, turn: 18, actual_flop: 35, actual_turn: 19 },
    { outs: 8,  label: 'OESD',        flop: 32, turn: 16, actual_flop: 32, actual_turn: 17 },
    { outs: 4,  label: 'Gutshot',     flop: 16, turn: 8,  actual_flop: 17, actual_turn: 9  },
    { outs: 15, label: 'Combo draw',  flop: 60, turn: 30, actual_flop: 54, actual_turn: 33 },
  ],
  caveats: [
    'Overestimates with 15+ outs (caps around 60%).',
    'Does not account for runner-runner / backdoor draws.',
    'Discount outs that improve villain more than you.',
  ],
};

// ── Hand equity vs common range types ─────────────────────────────────────────
// equity shown as approximate % vs that villain range type
export const vsRangeTable = [
  { hand: 'AA',  top5:  67, top10: 73, top20: 79, top50: 87, notes: 'Shrinks to ~67% vs top 5% due to set-over-set and two-pair variance.' },
  { hand: 'KK',  top5:  52, top10: 63, top20: 71, top50: 83, notes: 'Coin flip vs top 5% (AA in range). Dominant vs wider ranges.' },
  { hand: 'QQ',  top5:  43, top10: 55, top20: 64, top50: 79, notes: 'Flips vs top 5% (AA/KK). Strong edge vs top 10–20%.' },
  { hand: 'AKs', top5:  40, top10: 50, top20: 60, top50: 75, notes: 'Dominated by AA/KK/QQ but strong vs broad ranges with nut-draw potential.' },
  { hand: 'AKo', top5:  38, top10: 48, top20: 58, top50: 73, notes: 'Often dominated vs top 5%. Much better vs wider ranges.' },
  { hand: 'JJ',  top5:  36, top10: 49, top20: 59, top50: 78, notes: 'Behind higher pairs; solid favorite vs top 20–50% ranges.' },
  { hand: 'TT',  top5:  32, top10: 44, top20: 56, top50: 76, notes: 'Struggles vs tight ranges; >50% equity vs top 20%. Good blind defense.' },
  { hand: 'AQs', top5:  36, top10: 46, top20: 57, top50: 72, notes: 'Combo draw potential vs loose ranges. Dominated by AK in tight ranges.' },
];

// ── Range tier visualizer data ────────────────────────────────────────────────
// Maps hand names to tiers: 1 = top ~5%, 2 = top ~10%, 3 = top ~20%, 4 = top ~50%
export const rangeTiers = new Map([
  // Tier 1 — top ~5% (~67 combos)
  ...['AA','KK','QQ','JJ','TT','AKs','AKo','AQs'].map(h => [h, 1]),
  // Tier 2 — top ~10% (~133 combos)
  ...['99','88','AQo','AJs','KQs','KJs'].map(h => [h, 2]),
  // Tier 3 — top ~20% (~266 combos)
  ...['77','66','AJo','ATs','A9s','KQo','KTs','QJs','JTs'].map(h => [h, 3]),
  // Tier 4 — top ~50%
  ...['55','44','33','22','A8s','A7s','A6s','A5s','A4s','A3s','A2s',
      'A8o','A7o','A6o','A5o','KJo','K9s','K8s','K7s','Q9s','Q8s',
      'J9s','J8s','T9s','T8s','98s','97s','87s','86s','76s','75s',
      '65s','64s','54s','53s'].map(h => [h, 4]),
]);
