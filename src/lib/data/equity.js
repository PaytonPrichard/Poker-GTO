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
  { hero: 'AA', villain: 'KK',  equity: 82, category: 'Overpair vs Overpair', notes: 'Dominated. KK needs a K on the board without pairing the board for A or rivering a set.' },
  { hero: 'KK', villain: 'QQ',  equity: 82, category: 'Overpair vs Overpair', notes: 'Same dynamic as AA vs KK — lower pair has ~18% equity.' },
  { hero: 'AA', villain: 'QQ',  equity: 83, category: 'Overpair vs Overpair', notes: 'Two steps down — very similar equity to AA vs KK.' },

  // Pair vs Overcards (classic coin flip)
  { hero: 'QQ', villain: 'AKo', equity: 55, category: 'Pair vs Overcards', notes: 'Classic "race" — pocket pair is a slight favorite. QQ wins if no A or K flops.' },
  { hero: 'JJ', villain: 'AKo', equity: 54, category: 'Pair vs Overcards', notes: 'Near coin flip. AKo has two overcards and backdoor equity. JJ is a slight favorite.' },
  { hero: 'TT', villain: 'AKo', equity: 54, category: 'Pair vs Overcards', notes: 'TT is ~54% — very similar to JJ. Any overcard flop puts TT in trouble.' },
  { hero: 'TT', villain: 'AKs', equity: 52, category: 'Pair vs Overcards', notes: 'AKs has extra equity from the flush draw — TT is only a slight 52% favorite.' },

  // Pair vs Dominated
  { hero: 'AA', villain: 'AKo', equity: 93, category: 'Pair vs Dominated', notes: 'AA dominates AK — AK needs two pair, a straight, or runner-runner to win.' },
  { hero: 'KK', villain: 'KQo', equity: 83, category: 'Pair vs Dominated', notes: 'KK heavily dominates KQ. KQ needs quads or a board pairing Qs without a K.' },
  { hero: 'QQ', villain: 'QJo', equity: 82, category: 'Pair vs Dominated', notes: 'Pair over dominated kicker — QJ is drawing to Js and straights.' },

  // Pair vs Drawing Hand
  { hero: 'AA', villain: 'JTs', equity: 77, category: 'Pair vs Drawing Hand', notes: 'AA is strong but JTs has flush draw + straight draw possibilities. Still a big edge.' },
  { hero: 'QQ', villain: 'JTs', equity: 70, category: 'Pair vs Drawing Hand', notes: 'QQ is a 70/30 favorite — JTs has more straight possibilities that hit above QQ.' },
  { hero: 'TT', villain: '87s', equity: 70, category: 'Pair vs Drawing Hand', notes: 'Pair vs suited connector — 70/30 in favor of the pair. Suited connectors need a board.' },
  { hero: 'AA', villain: '72o', equity: 88, category: 'Pair vs Drawing Hand', notes: 'Worst starting hand. AA crushes 72o — 72o wins ~12% via miracle runouts.' },

  // Set vs Draw
  { hero: 'Set',           villain: 'Flush draw',         equity: 67, category: 'Set vs Draw', notes: 'Set is ~67% favorite on the flop vs flush draw. Flush draw has 9 outs × 2 streets.' },
  { hero: 'Set',           villain: 'Open-ended straight', equity: 70, category: 'Set vs Draw', notes: 'Set vs OESD: ~70/30. OESD has 8 outs but set can also boat up against straights.' },
  { hero: 'Set',           villain: 'Combo draw (FD+OESD)', equity: 40, category: 'Set vs Draw', notes: 'Combo draw has 15 outs and can be a slight favorite over a set on the flop.' },

  // Straight vs Flush Draw
  { hero: 'Straight (flopped)', villain: 'Flush draw',    equity: 78, category: 'Straight vs Flush Draw', notes: 'Flopped straight vs flush draw — flush has 9 outs (1 already used) on the turn.' },
  { hero: 'Top pair',           villain: 'Flush draw',    equity: 55, category: 'Straight vs Flush Draw', notes: 'Top pair vs flush draw: very close to 50/50 with 2 streets remaining.' },
  { hero: 'Two pair',           villain: 'Flush draw',    equity: 66, category: 'Straight vs Flush Draw', notes: 'Two pair vs flush draw: ~66/34. Two pair can boat up on flush completing cards.' },
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
    notes:     '9 remaining cards of the suit. Most common draw — fold equity + nut draw combos make this powerful.',
  },
  {
    draw:      'Open-ended straight draw (OESD)',
    outs:      8,
    turn:      17,
    river:     17,
    twoCards:  32,
    notes:     '8 cards (4 on each end) complete the straight. One of the strongest draws when not facing a flush board.',
  },
  {
    draw:      'Combo draw (FD + OESD)',
    outs:      15,
    turn:      32,
    river:     33,
    twoCards:  54,
    notes:     'Combining flush and straight outs — monster draw that is often a favorite over made hands on the flop.',
  },
  {
    draw:      'Flush draw + pair (any)',
    outs:      12,
    turn:      26,
    river:     26,
    twoCards:  45,
    notes:     '9 flush outs + ~3 additional outs for two pair or trips. Pair adds significant equity.',
  },
  {
    draw:      'Gutshot straight draw',
    outs:      4,
    turn:      9,
    river:     9,
    twoCards:  17,
    notes:     '4 cards fill the gap. Low equity but often played cheaply. Good as bluff-catcher add-on.',
  },
  {
    draw:      'Pair to two pair (holding one pair)',
    outs:      5,
    turn:      11,
    river:     11,
    twoCards:  20,
    notes:     '5 outs (2 cards to trip up, 3 cards for the kicker pairing). Often underestimated equity.',
  },
  {
    draw:      'Overcards (2 overcards)',
    outs:      6,
    turn:      13,
    river:     13,
    twoCards:  24,
    notes:     '6 outs for top pair. AK on a 9-8-2 board has ~24% equity with two cards to come.',
  },
  {
    draw:      'Set to full house (flopped set)',
    outs:      7,
    turn:      15,
    river:     15,
    twoCards:  28,
    notes:     '7 outs to boat up (board pairing). Relevant when set is behind a flopped straight.',
  },
  {
    draw:      'Two pair to full house',
    outs:      4,
    turn:      9,
    river:     9,
    twoCards:  17,
    notes:     '4 outs to fill up. Relevant when two pair is behind a flopped flush or straight.',
  },
  {
    draw:      'Inside wrap (double-gutshot)',
    outs:      8,
    turn:      17,
    river:     17,
    twoCards:  32,
    notes:     'Two gutshots simultaneously (e.g., holding T8 on J-9-2 — 7s and Qs both complete a straight). Equivalent to OESD.',
  },
];

// ── Rule of 2 & 4 ─────────────────────────────────────────────────────────────
export const rule24 = {
  description: 'A quick mental math shortcut for estimating equity on the fly. With 2 cards to come (on the flop), multiply your outs by 4. With 1 card to come (on the turn), multiply by 2. This gives an approximate equity percentage that is close enough for real-time decisions.',
  examples: [
    { outs: 9,  label: 'Flush draw',  flop: 36, turn: 18, actual_flop: 35, actual_turn: 19 },
    { outs: 8,  label: 'OESD',        flop: 32, turn: 16, actual_flop: 32, actual_turn: 17 },
    { outs: 4,  label: 'Gutshot',     flop: 16, turn: 8,  actual_flop: 17, actual_turn: 9  },
    { outs: 15, label: 'Combo draw',  flop: 60, turn: 30, actual_flop: 54, actual_turn: 33 },
  ],
  caveats: [
    'Slightly overestimates equity with many outs (the rule caps out around 60%, which is inaccurate for 15+ outs).',
    'Does not account for runner-runner equity (backdoor draws).',
    'Outs to a worse hand do not count — always discount outs that improve villain more.',
  ],
};

// ── Hand equity vs common range types ─────────────────────────────────────────
// equity shown as approximate % vs that villain range type
export const vsRangeTable = [
  { hand: 'AA',  top5:  67, top10: 73, top20: 79, top50: 87, notes: 'AA dominates almost any range but shrinks to ~67% vs top 5% due to set-over-set and two-pair variance.' },
  { hand: 'KK',  top5:  52, top10: 63, top20: 71, top50: 83, notes: 'KK is just a coin flip vs the top 5% (AA is in that range). Huge equity advantage vs wider ranges.' },
  { hand: 'QQ',  top5:  43, top10: 55, top20: 64, top50: 79, notes: 'QQ flips vs top 5% (AA/KK included). Good equity edge vs top 10–20% ranges.' },
  { hand: 'AKs', top5:  40, top10: 50, top20: 60, top50: 75, notes: 'AKs is dominated vs AA/KK/QQ but has strong equity vs broad ranges thanks to nut-draw potential.' },
  { hand: 'AKo', top5:  38, top10: 48, top20: 58, top50: 73, notes: 'AKo vs top 5% — often dominated or in a coin flip. Much better vs wider villain ranges.' },
  { hand: 'JJ',  top5:  36, top10: 49, top20: 59, top50: 78, notes: 'JJ is behind pairs above it. Becomes a solid favorite vs top 20–50% villain ranges.' },
  { hand: 'TT',  top5:  32, top10: 44, top20: 56, top50: 76, notes: 'TT struggles vs tight ranges, but has >50% equity vs top 20% — a good blind defense hand.' },
  { hand: 'AQs', top5:  36, top10: 46, top20: 57, top50: 72, notes: 'AQs has combo draw potential — solid vs loose ranges. Dominated by AK in tight ranges.' },
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
