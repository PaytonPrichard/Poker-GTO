// ─────────────────────────────────────────────────────────────────────────────
// Bet Sizing Theory — GTO reference data
// ─────────────────────────────────────────────────────────────────────────────

// ── Core sizing principles ────────────────────────────────────────────────────
export const sizingPrinciples = [
  {
    title: 'Polarize on scary boards',
    body:  'When your range is polarized (nuts or bluffs, few medium hands), use large sizes — 66–100%+ pot. Medium hands rarely bet large; they prefer to check or bet small. Scary boards (flushed, paired, coordinated) are where polarization is highest.',
  },
  {
    title: 'Bet small with range advantage',
    body:  'When you have a range advantage across many hands (e.g., PFR on ace-high dry flop), bet small and frequently with your entire range. The small bet puts pressure on all of villain\'s holdings and doesn\'t require a polar hand distribution.',
  },
  {
    title: 'Match sizing to nut advantage',
    body:  'Nut advantage — having more of the strongest possible hands — allows you to use large and overbet sizes with credibility. Without nut advantage, large bets become exploitable because villain knows you can\'t have the nuts as often.',
  },
  {
    title: 'Stack-to-pot ratio (SPR) drives commitment',
    body:  'The SPR tells you how many pot-size bets remain. Low SPR (<4) means marginal hands like top pair can go all-in. High SPR (>10) means only strong draws and overpairs should commit. Always calculate SPR before planning your line.',
  },
  {
    title: 'Consistent sizing for bet/bluff balance',
    body:  'Your value bets and bluffs must use the same sizing to stay unexploitable. If you size up with value and down with bluffs (or vice versa), observant opponents will pick up the tell and exploit you. Use one primary size per spot.',
  },
  {
    title: 'Overbets as a weapon',
    body:  'Overbets (>100% pot) are a powerful tool when you have an uncapped range and your opponent\'s range is capped. They allow you to bluff more frequently (more bluffs per value bet) and generate maximum value when called.',
  },
];

// ── Preflop sizing by position and player count ───────────────────────────────
// sizes keyed by player count (4, 5, 6, 7)
export const preflopSizingRows = [
  {
    label: 'UTG open (RFI)',
    sizes: { 4: '3x', 5: '3x', 6: '2.5x', 7: '2.5x' },
    notes: 'UTG is tightest position — size up slightly to charge callers who will have position postflop. In deeper-stacked games, prefer 3x.',
  },
  {
    label: 'HJ / MP open',
    sizes: { 4: '2.5x', 5: '2.5x', 6: '2.5x', 7: '2.5x' },
    notes: 'Middle position opens at a consistent 2.5x. Some solvers allow 2x from HJ in 6-max with good positional equity.',
  },
  {
    label: 'CO open',
    sizes: { 4: '2.5x', 5: '2.5x', 6: '2.5x', 7: '2.5x' },
    notes: 'CO should always open with position advantage over SB/BB. Standard 2.5x is preferred; 2x is also solver-approved in many spots.',
  },
  {
    label: 'BTN open',
    sizes: { 4: '2.2x', 5: '2.2x', 6: '2.2x', 7: '2.2x' },
    notes: 'BTN opens wide with positional dominance. Smaller size (2x–2.5x) to maximize steal frequency and minimize risk with marginal hands.',
  },
  {
    label: 'SB open (vs BB)',
    sizes: { 4: '3x', 5: '3x', 6: '3x', 7: '3x' },
    notes: 'SB is OOP postflop — size up to compensate. 3x is standard; some solvers use 2.5x in 6-max. Avoid limping SB in GTO play.',
  },
  {
    label: '3-bet IP (vs BTN/CO)',
    sizes: { 4: '3x', 5: '3x', 6: '3x', 7: '3x' },
    notes: '3-bet to ~3x the open raise when in position. E.g., open is 2.5x → 3-bet to 7–8 BB. Larger 3-bets reduce the field and build pot IP.',
  },
  {
    label: '3-bet OOP (vs BTN)',
    sizes: { 4: '4x', 5: '4x', 6: '4x', 7: '4x' },
    notes: 'Increase 3-bet size when OOP to deny IP player a profitable call. Targeting 4x the open — e.g., open 2.5x → 3-bet to 10–11 BB.',
  },
  {
    label: '4-bet (all positions)',
    sizes: { 4: '2.2x', 5: '2.2x', 6: '2.2x', 7: '2.2x' },
    notes: '4-bet to ~2.2–2.5x the 3-bet. Range is polar: value (KK+, AKs) and bluffs with blockers (AQs, KQs, A5s). Rarely 4-bet/fold.',
  },
];

// ── Stack depth adjustments ────────────────────────────────────────────────────
export const stackDepthNotes = [
  {
    depth: '20–40 BB (Short stack)',
    adjustments: 'Open 2x or min-raise to minimize risk. 3-bets commit too much — shove instead of 3-bet/fold. SPR will be low; top pair often plays for stacks.',
  },
  {
    depth: '50–80 BB (Mid stack)',
    adjustments: 'Standard sizing applies. 3-bets should be strong — shallow enough that 3-bet/fold is bad EV. Some hands become mandatory 3-bet/calls.',
  },
  {
    depth: '100 BB (Standard)',
    adjustments: 'Full GTO sizing applies. Rich 3-bet bluff ranges, 4-bets are polar. SPR on flop ~10+ gives room for all three postflop streets.',
  },
  {
    depth: '150+ BB (Deep stack)',
    adjustments: 'Open smaller (2x) to control pot sizes. Suited connectors and small pairs gain value from implied odds. Avoid speculative 4-bets without very strong hands.',
  },
];

// ── Postflop sizing by street/situation ───────────────────────────────────────
export const postflopSizingRows = [
  {
    street:    'Flop',
    situation: 'Dry board, strong range advantage',
    freq:      '65–75%',
    size:      '25–33%',
    notes:     'Bet entire range at small size. Most of your hands benefit from betting — protection + value. Hard for caller to continue profitably against high frequency.',
  },
  {
    street:    'Flop',
    situation: 'Wet board, range advantage',
    freq:      '40–55%',
    size:      '50–66%',
    notes:     'Mixed strategy — check good hands for protection of checking range. Bet draws and strong made hands larger to charge draws.',
  },
  {
    street:    'Flop',
    situation: 'Monotone or very connected board',
    freq:      '20–35%',
    size:      '33–50%',
    notes:     'Low c-bet frequency. Check-call and check-raise with strong hands. Reserve bets for nut advantages (top set on monotone, strong pair + nut draw).',
  },
  {
    street:    'Turn',
    situation: 'Double barrel for value',
    freq:      '40–55%',
    size:      '55–75%',
    notes:     'Turn barrels should be sizing up from flop. Value hands want protection and to build the pot for river shoves. Bluffs need fold equity — size accordingly.',
  },
  {
    street:    'Turn',
    situation: 'Turn overbet (uncapped range)',
    freq:      '10–20%',
    size:      '100–150%',
    notes:     'Overbet the turn when you have nut advantage and villain\'s range is capped (checked back flop). Polarized: nutted hands and high-equity bluffs only.',
  },
  {
    street:    'River',
    situation: 'Value bet (thin)',
    freq:      '50–65%',
    size:      '40–60%',
    notes:     'Thin value bets medium sizing. You want calls from worse hands — large sizing folds out the hands you beat. Size determines which hands in villain\'s range call.',
  },
  {
    street:    'River',
    situation: 'Value bet (strong/nut)',
    freq:      '70–85%',
    size:      '75–100%',
    notes:     'Large value bet when you hold the nuts or near-nuts. Select appropriate bluffs at the same frequency to remain balanced. 1:1 value:bluff at pot-size.',
  },
  {
    street:    'River',
    situation: 'Bluff (missed draw)',
    freq:      'Governed by MDF',
    size:      'Match value bet size',
    notes:     'Always size bluffs identically to value bets. Best bluffs have blockers to villain\'s strong calling range. Missed flush draws often make good bluffs.',
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
    strategy: 'Stack off with top pair. Commitment threshold is low — any decent made hand can go all-in. 3-bet pots often arrive here.',
    hands:    'Top pair+, any two pair, strong draws',
  },
  {
    range:    '3–6',
    label:    'Low SPR',
    strategy: 'Top pair good kicker plays for stacks. Medium pairs are borderline — consider equity and nut potential. Strong draws can stack off profitably.',
    hands:    'TPGK+, overpairs, combo draws',
  },
  {
    range:    '6–13',
    label:    'Medium SPR',
    strategy: 'Standard play. Two pair and better are clear stack-off candidates. Top pair requires more caution. Draws have implied odds but need equity to commit.',
    hands:    'Two pair+, sets, nut flush draws',
  },
  {
    range:    '13+',
    label:    'High SPR',
    strategy: 'Only strong draws and premium made hands want to play for stacks. Implied odds are massive for drawing hands. Overpairs can be dangerous without the board locking up.',
    hands:    'Sets, straights, flushes, strong combo draws',
  },
];
