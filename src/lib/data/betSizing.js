// ─────────────────────────────────────────────────────────────────────────────
// Bet Sizing Theory — GTO reference data
// ─────────────────────────────────────────────────────────────────────────────

// ── Core sizing principles ────────────────────────────────────────────────────
export const sizingPrinciples = [
  {
    title: 'Polarize on scary boards',
    body:  'Polarized range (nuts or bluffs) uses 66-100%+ pot. Scary boards (flushed, paired, coordinated) are most polarized.',
  },
  {
    title: 'Bet small with range advantage',
    body:  'With range advantage (e.g., PFR on A-high dry flop), bet small and frequently with entire range.',
  },
  {
    title: 'Match sizing to nut advantage',
    body:  'More nutted hands in your range = credible large/overbet sizing. Without nut advantage, big bets are exploitable.',
  },
  {
    title: 'Stack-to-pot ratio (SPR) drives commitment',
    body:  'Low SPR (<4): top pair commits. High SPR (>10): only strong draws and overpairs should. Always calculate SPR pre-action.',
  },
  {
    title: 'Consistent sizing for bet/bluff balance',
    body:  'Value bets and bluffs must use the same sizing to stay unexploitable. One primary size per spot.',
  },
  {
    title: 'Overbets as a weapon',
    body:  'Overbets (>100% pot) work when your range is uncapped and villain\'s is capped. Allows more bluffs per value bet.',
  },
];

// ── Preflop sizing by position and player count ───────────────────────────────
// sizes keyed by player count (4, 5, 6, 7)
export const preflopSizingRows = [
  {
    label: 'UTG open (RFI)',
    sizes: { 4: '3x', 5: '3x', 6: '2.5x', 7: '2.5x' },
    notes: 'Tightest position — size up to charge callers with position. Prefer 3x when deep.',
  },
  {
    label: 'HJ / MP open',
    sizes: { 4: '2.5x', 5: '2.5x', 6: '2.5x', 7: '2.5x' },
    notes: 'Consistent 2.5x. Some solvers allow 2x from HJ in 6-max.',
  },
  {
    label: 'CO open',
    sizes: { 4: '2.5x', 5: '2.5x', 6: '2.5x', 7: '2.5x' },
    notes: 'Standard 2.5x preferred; 2x also solver-approved. Position advantage over SB/BB.',
  },
  {
    label: 'BTN open',
    sizes: { 4: '2.2x', 5: '2.2x', 6: '2.2x', 7: '2.2x' },
    notes: 'Opens wide with positional dominance. Smaller size (2x-2.5x) maximizes steal frequency.',
  },
  {
    label: 'SB open (vs BB)',
    sizes: { 4: '3x', 5: '3x', 6: '3x', 7: '3x' },
    notes: 'OOP postflop — size up to compensate. 3x standard. Never limp SB in GTO play.',
  },
  {
    label: '3-bet IP (vs BTN/CO)',
    sizes: { 4: '3x', 5: '3x', 6: '3x', 7: '3x' },
    notes: '~3x the open IP. E.g., 2.5x open → 3-bet to 7-8 BB. Builds pot with position.',
  },
  {
    label: '3-bet OOP (vs BTN)',
    sizes: { 4: '4x', 5: '4x', 6: '4x', 7: '4x' },
    notes: '4x the open OOP to deny profitable calls. E.g., 2.5x open → 3-bet to 10-11 BB.',
  },
  {
    label: '4-bet (all positions)',
    sizes: { 4: '2.2x', 5: '2.2x', 6: '2.2x', 7: '2.2x' },
    notes: '~2.2-2.5x the 3-bet. Polar range: value (KK+, AKs) and blocker bluffs (A5s, AQs). Rarely 4-bet/fold.',
  },
];

// ── Stack depth adjustments ────────────────────────────────────────────────────
export const stackDepthNotes = [
  {
    depth: '20–40 BB (Short stack)',
    adjustments: 'Open 2x or min-raise. Shove instead of 3-bet/fold. Low SPR — top pair plays for stacks.',
  },
  {
    depth: '50–80 BB (Mid stack)',
    adjustments: 'Standard sizing. 3-bet/fold is bad EV — some hands become mandatory 3-bet/calls.',
  },
  {
    depth: '100 BB (Standard)',
    adjustments: 'Full GTO sizing. Rich 3-bet bluff ranges, polar 4-bets. Flop SPR ~10+ allows three streets.',
  },
  {
    depth: '150+ BB (Deep stack)',
    adjustments: 'Open 2x to control pots. Suited connectors and small pairs gain implied odds value. Avoid speculative 4-bets.',
  },
];

// ── Postflop sizing by street/situation ───────────────────────────────────────
export const postflopSizingRows = [
  {
    street:    'Flop',
    situation: 'Dry board, strong range advantage',
    freq:      '65–75%',
    size:      '25–33%',
    notes:     'Bet entire range small for protection + value. High frequency is hard for caller to defend against.',
  },
  {
    street:    'Flop',
    situation: 'Wet board, range advantage',
    freq:      '40–55%',
    size:      '50–66%',
    notes:     'Mixed strategy — check some strong hands to protect checking range. Bet draws and value larger to charge.',
  },
  {
    street:    'Flop',
    situation: 'Monotone or very connected board',
    freq:      '20–35%',
    size:      '33–50%',
    notes:     'Low c-bet frequency. Check-raise strong hands. Only bet with nut advantages (top set, pair + nut draw).',
  },
  {
    street:    'Turn',
    situation: 'Double barrel for value',
    freq:      '40–55%',
    size:      '55–75%',
    notes:     'Size up from flop. Value hands build pot for river shoves. Bluffs need fold equity.',
  },
  {
    street:    'Turn',
    situation: 'Turn overbet (uncapped range)',
    freq:      '10–20%',
    size:      '100–150%',
    notes:     'Overbet when you have nut advantage and villain\'s range is capped. Nutted hands and high-equity bluffs only.',
  },
  {
    street:    'River',
    situation: 'Value bet (thin)',
    freq:      '50–65%',
    size:      '40–60%',
    notes:     'Medium sizing to get calls from worse hands. Too large folds out hands you beat.',
  },
  {
    street:    'River',
    situation: 'Value bet (strong/nut)',
    freq:      '70–85%',
    size:      '75–100%',
    notes:     'Large sizing with nuts/near-nuts. Balance with bluffs at same size. ~1:1 value:bluff at pot-size.',
  },
  {
    street:    'River',
    situation: 'Bluff (missed draw)',
    freq:      'Governed by MDF',
    size:      'Match value bet size',
    notes:     'Size bluffs identical to value bets. Best bluffs block villain\'s calling range (e.g., missed flush draws).',
  },
];

// ── Pot odds / MDF table ───────────────────────────────────────────────────────
// betPct = bet as % of pot, equityNeeded = break-even equity %, mdf = minimum defense frequency %
export const potOddsTable = [
  { betPct: 25,  equityNeeded: 17, mdf: 80 },
  { betPct: 33,  equityNeeded: 20, mdf: 75 },
  { betPct: 50,  equityNeeded: 25, mdf: 67 },
  { betPct: 67,  equityNeeded: 29, mdf: 60 },
  { betPct: 75,  equityNeeded: 30, mdf: 57 },
  { betPct: 100, equityNeeded: 33, mdf: 50 },
  { betPct: 125, equityNeeded: 36, mdf: 44 },
  { betPct: 150, equityNeeded: 38, mdf: 40 },
  { betPct: 200, equityNeeded: 40, mdf: 33 },
];

// ── SPR guide ─────────────────────────────────────────────────────────────────
export const sprGuide = [
  {
    range:    '< 3',
    label:    'Very Low SPR',
    strategy: 'Stack off with top pair+. Any decent made hand commits. Common in 3-bet pots.',
    hands:    'Top pair+, any two pair, strong draws',
  },
  {
    range:    '3–6',
    label:    'Low SPR',
    strategy: 'TPGK plays for stacks. Medium pairs borderline. Strong draws can stack off profitably.',
    hands:    'TPGK+, overpairs, combo draws',
  },
  {
    range:    '6–13',
    label:    'Medium SPR',
    strategy: 'Standard play. Two pair+ stacks off. Top pair needs caution. Draws need equity to commit.',
    hands:    'Two pair+, sets, nut flush draws',
  },
  {
    range:    '13+',
    label:    'High SPR',
    strategy: 'Only premium hands and strong draws stack off. Massive implied odds for draws. Overpairs can be dangerous.',
    hands:    'Sets, straights, flushes, strong combo draws',
  },
];
