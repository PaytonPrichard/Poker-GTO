// ─────────────────────────────────────────────────────────────────────────────
// Position Strategy — GTO reference data
// ─────────────────────────────────────────────────────────────────────────────

// ── Tab 1: Core Concepts ─────────────────────────────────────────────────────
export const positionBasics = [
  {
    title: 'Information Advantage',
    body:  'Acting last lets you see every opponent action before deciding, narrowing ranges more precisely. This edge compounds across streets.',
  },
  {
    title: 'Pot Control',
    body:  'IP has final say on pot size each street — check back with medium hands for cheap showdown, bet strong hands for value. OOP lacks this control.',
  },
  {
    title: 'Realizing Equity',
    body:  'IP realizes 10-20% more equity than OOP. KTs with 48% raw equity realizes ~54% IP but only ~42% OOP — position changes profitability dramatically.',
  },
  {
    title: 'Wider Profitable Ranges',
    body:  'BTN opens 40-48% in 6-max vs UTG 15-18%. Marginal hands (suited connectors, gappers, broadways) profit IP but lose money from EP.',
  },
  {
    title: 'Bluffing Efficiency',
    body:  'OOP checks reveal weakness, making IP bluffs more effective. IP can represent wider strong ranges and abandon bluffs when facing resistance.',
  },
  {
    title: 'The Fundamental Asymmetry',
    body:  'Solvers confirm IP wins more and loses less with identical hands. IP can bet thinner for value and bluff more. BTN winrate far exceeds any other seat.',
  },
];

// ── Tab 2: EV by Seat ────────────────────────────────────────────────────────
export const evBySeat = [
  {
    position:    'UTG',
    bbPer100:    '-5 to -2',
    vpip:        '18%',
    pfr:         '15%',
    description: 'Tightest position — act first preflop, OOP postflop vs most callers. Open only premiums and strong broadways. Small net loser even with perfect play.',
  },
  {
    position:    'MP (HJ)',
    bbPer100:    '-2 to 0',
    vpip:        '21%',
    pfr:         '18%',
    description: 'Slightly wider than UTG — add suited broadways and smaller pairs. Typically breaks even or loses marginally. Often OOP postflop.',
  },
  {
    position:    'CO',
    bbPer100:    '+2 to +5',
    vpip:        '27%',
    pfr:         '23%',
    description: 'First clearly profitable seat — only BTN and blinds behind. Great for 3-bet bluffing and blind stealing when BTN is tight.',
  },
  {
    position:    'BTN',
    bbPer100:    '+8 to +15',
    vpip:        '40%',
    pfr:         '32%',
    description: 'Most profitable seat — guaranteed last action postflop. Open very wide (suited connectors, gappers, all broadways, nearly all pairs). Majority of lifetime winnings come from BTN.',
  },
  {
    position:    'SB',
    bbPer100:    '-15 to -10',
    vpip:        '28%',
    pfr:         '22%',
    description: 'Worst position — OOP against everyone postflop. Raise (3x) or fold vs unopened pots; limping is suboptimal. Facing raises: 3-bet or fold.',
  },
  {
    position:    'BB',
    bbPer100:    '-25 to -18',
    vpip:        '35%',
    pfr:         '12%',
    description: 'Loses most per hand but gets calling discount (1 BB invested). Defend 35%+ vs BTN opens. Focus on minimizing losses, not winning from this seat.',
  },
];

// ── Tab 3: Positional Plays ──────────────────────────────────────────────────
export const positionalPlays = [
  {
    title: 'Floating the Flop',
    body:  'Call a flop bet IP planning to take the pot on the turn when villain checks. Best with backdoor equity. Target players who c-bet 60%+.',
  },
  {
    title: 'Delayed C-Bet',
    body:  'Check back flop IP, bet the turn. Disguises strength, controls pot, lets you see the turn card first. Great with medium hands or underrepresented strong hands.',
  },
  {
    title: 'Stealing Blinds',
    body:  'Raise late position (CO/BTN/SB) to win blinds uncontested. BTN can open 40-50% vs tight blinds. Adjust: steal more vs passive, less vs aggressive 3-bettors.',
  },
  {
    title: '3-Bet Bluffing from CO/BTN',
    body:  'EP openers fold often to 3-bets; when called you have position + initiative. Best hands: A2s-A5s (block aces, nut flush potential) and 76s-T9s. Size ~3x the open IP.',
  },
  {
    title: 'Squeezing',
    body:  '3-bet after an open + caller(s) — both have capped/medium ranges with dead money. Size 4x open +1x per caller. More bluffs from BTN; tighter from blinds.',
  },
  {
    title: 'Check-Back for Pot Control',
    body:  'Check back with second pair, weak top pair, or ace-high to reach cheap showdown. Mix in some strong hands so your check-back range is not capped.',
  },
  {
    title: 'Positional Isolation Raises',
    body:  'Raise over a weak limper to play heads-up IP. Size 3-4x BB +1x per limper. Isolating range is wider than standard opens — KTo, Q9s, J8s become profitable vs fish.',
  },
];

// ── Tab 4: IP vs OOP Strategy ────────────────────────────────────────────────
export const exploitingPosition = [
  {
    situation:     'Facing a C-Bet',
    inPosition:    'Call wide with draws and medium hands; float knowing you act last on the turn. Raise selectively with strong hands and semi-bluffs.',
    outOfPosition: 'Check-raise polarized (strong value + combo draws) to deny positional advantage. Check-call medium hands with decent equity.',
    notes:         'IP defends ~55-60% vs c-bets; OOP defends ~45-50%. Position compensates for marginal hand strength.',
  },
  {
    situation:     'Holding a Draw',
    inPosition:    'See opponent action first — take free cards or semi-bluff when checked to. Control the price you pay. Raise strong draws for value; call weaker draws.',
    outOfPosition: 'Harder OOP — leading reveals your hand, check-calling loses free card option. With 12+ outs, check-raise to deny free cards and build the pot.',
    notes:         'Draws realize 85-95% equity IP but only 70-80% OOP. Suited connectors are far more profitable from BTN than UTG.',
  },
  {
    situation:     'Medium-Strength Hand',
    inPosition:    'Check back for pot control — keep pot small, avoid check-raises. Bet thinly on the river when checked to for showdown value.',
    outOfPosition: 'Hardest hands OOP. Check-calling is default but caps your range. Avoid donk-betting — accept medium hands lose more value OOP.',
    notes:         'Equity realization gap is largest for medium hands. Premiums win either way; medium hands suffer most from positional disadvantage.',
  },
  {
    situation:     'Strong Hand (Slow-Play Considerations)',
    inPosition:    'Can slow-play more IP since you close the action and control free cards. Standard on dry boards with sets/overpairs; fast-play on wet boards.',
    outOfPosition: 'Risky OOP — opponent may check behind, costing value and giving free cards. Check-raise flop or lead turn. Always fast-play on wet boards OOP.',
    notes:         'Solvers slow-play ~15-25% of strong hands IP but only ~5-10% OOP due to lost value and free card risk.',
  },
  {
    situation:     'River Bluff-Catcher',
    inPosition:    'See opponent action first — check back to showdown or call with full line info. Can turn bluff-catchers into bluffs when checked to at balanced frequency.',
    outOfPosition: 'Fundamentally harder — must decide without seeing their check. Donk-betting loses bluff-catching ability. Check-call based on pot odds and villain\'s bet frequency.',
    notes:         'IP bluff-catchers avoid paying off by checking back. OOP must pay off at mathematically correct frequency to prevent exploitation.',
  },
  {
    situation:     'Multi-Street Barreling',
    inPosition:    'See opponent reaction each street before continuing. Abandon bluffs when facing resistance. Choose bluff candidates that pick up equity on later streets.',
    outOfPosition: 'Donk-leading multiple streets is discouraged — commits chips without info. OOP barreling works best as check-raise flop, then lead turn/river.',
    notes:         'IP barrels profitably 30-40% more often than OOP. Ability to abandon bluffs makes IP barreling far more capital-efficient.',
  },
];
