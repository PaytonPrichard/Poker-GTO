// ─────────────────────────────────────────────────────────────────────────────
// Postflop GTO reference data
// ─────────────────────────────────────────────────────────────────────────────

// ── C-bet frequencies by flop texture ────────────────────────────────────────
// Columns: texture label, example board, IP freq, IP size, OOP freq, OOP size, notes
export const cbetData = [
  {
    texture:  'Ace-high dry',
    example:  'A♠ 7♣ 2♦',
    ipFreq:   80,
    ipSize:   '25–33%',
    oopFreq:  65,
    oopSize:  '25–33%',
    rangeAdv: 'Strong PFR',
    notes:    'PFR hits this board hard (AK, AQ, AJ, AT in range). Bet small and frequent — value + protection, hard for caller to continue.',
  },
  {
    texture:  'King-high dry',
    example:  'K♠ 7♣ 2♦',
    ipFreq:   70,
    ipSize:   '25–33%',
    oopFreq:  55,
    oopSize:  '33%',
    rangeAdv: 'PFR',
    notes:    'Similar to ace-high. PFR range connects well. Small-size bet is optimal — caller can\'t have many Kx combos unless they called with KQo/KJs.',
  },
  {
    texture:  'Mid-card dry',
    example:  '8♣ 5♦ 2♥',
    ipFreq:   35,
    ipSize:   '33–50%',
    oopFreq:  22,
    oopSize:  '50%',
    rangeAdv: 'Caller',
    notes:    'Low boards favor the caller\'s range (more 8x, 5x, pocket pairs). PFR should check more and bet larger when they do bet.',
  },
  {
    texture:  'Connected 2-tone',
    example:  'J♥ T♦ 8♥',
    ipFreq:   38,
    ipSize:   '50–66%',
    oopFreq:  28,
    oopSize:  '66%',
    rangeAdv: 'Caller',
    notes:    'Wet boards with draws favor caller. Fewer pure bluffs — bet for protection on made hands. Size up to charge draws.',
  },
  {
    texture:  'Connected rainbow',
    example:  '9♠ 8♦ 7♣',
    ipFreq:   45,
    ipSize:   '40–50%',
    oopFreq:  35,
    oopSize:  '50%',
    rangeAdv: 'Neutral',
    notes:    'Both players can have straights and two-pairs. More balanced betting. Check sets and straights occasionally to balance range.',
  },
  {
    texture:  'Paired board',
    example:  'K♠ K♦ 5♣',
    ipFreq:   65,
    ipSize:   '25–33%',
    oopFreq:  50,
    oopSize:  '25–33%',
    rangeAdv: 'PFR',
    notes:    'PFR range has more KK/AK/KQ combos. Bet small and very frequently — most hands have decent equity on paired boards. Rarely bluff-catch vs small bets.',
  },
  {
    texture:  'Low paired',
    example:  '5♠ 5♦ 3♣',
    ipFreq:   50,
    ipSize:   '33%',
    oopFreq:  35,
    oopSize:  '50%',
    rangeAdv: 'Slight caller',
    notes:    'Caller may have more 5x. PFR can still bet with overcards for equity. Medium frequency, don\'t over-c-bet.',
  },
  {
    texture:  'Monotone',
    example:  '9♥ 7♥ 3♥',
    ipFreq:   28,
    ipSize:   '25–33%',
    oopFreq:  18,
    oopSize:  '33%',
    rangeAdv: 'Slight caller',
    notes:    'Monotone boards are tricky — many bluffs have draws, caller can have flushes. Check the vast majority. When betting, size small.',
  },
  {
    texture:  'Ace-high 2-tone',
    example:  'A♦ 8♥ 5♥',
    ipFreq:   60,
    ipSize:   '33–50%',
    oopFreq:  45,
    oopSize:  '50%',
    rangeAdv: 'PFR',
    notes:    'PFR has range advantage from Ax, but flush draws add complexity. Size up slightly vs the two-tone. Strong nut advantage.',
  },
];

// ── Turn strategy by situation ────────────────────────────────────────────────
export const turnGuide = [
  {
    situation: 'You c-bet flop, got called',
    action:    'Double barrel',
    hands:     'Strong value (top pair+), combo draws, nut flush draws',
    frequency: '40–55% of range',
    sizing:    '55–75% pot',
    notes:     'Continue on good runouts. Shut down on bad runouts (draws complete for caller, board pairs unfavorably). Give up thin value on wet turns.',
  },
  {
    situation: 'You c-bet flop, got called',
    action:    'Check turn',
    hands:     'Marginal made hands (2nd pair, weak top pair), missed bluffs',
    frequency: '45–60% of range',
    sizing:    '—',
    notes:     'Protect range integrity. Check-call with marginal hands. Check-raise opportunities arise on blanks when you have nut advantage.',
  },
  {
    situation: 'You checked flop, villain bet, you called',
    action:    'Donk-bet turn',
    hands:     'Very rarely — mostly avoid donk bets in GTO',
    frequency: '<10%',
    sizing:    '50–70% pot',
    notes:     'Donk betting is generally a leak. Prefer check-raising or calling. Reserve donk bets for when you have uncapped range advantage on specific turn cards.',
  },
  {
    situation: 'You checked flop, villain checked back',
    action:    'Lead turn',
    hands:     'Strong value, top pair, draws',
    frequency: '50–65%',
    sizing:    '50–66% pot',
    notes:     'Villain capped their range by checking. Now your range has advantage — bet frequently and use a variety of sizings.',
  },
];

// ── River strategy ────────────────────────────────────────────────────────────
export const riverGuide = [
  {
    situation: 'You bet flop + turn, villain called both',
    action:    'Triple barrel',
    hands:     'Nut hands, polarized (nuts or air)',
    frequency: '35–50% of range',
    sizing:    '66–100% pot (large or overbet)',
    notes:     'River is polarization time. Thin value rarely bets. Use full pot or overbets with nuts and pure bluffs. Balance bluff frequency to value (1:1 at pot-size bet).',
  },
  {
    situation: 'You bet flop + turn, villain called both',
    action:    'Check river',
    hands:     'Thin value, bluff-catchers, missed draws',
    frequency: '50–65% of range',
    sizing:    '—',
    notes:     'Check and induce bluffs with thin value. Many missed draws should check-fold.',
  },
  {
    situation: 'You check river after two streets of action',
    action:    'Bet as bluff',
    hands:     'Missed draws with no showdown value',
    frequency: 'Depends on sizing / pot odds you give',
    sizing:    '50–100% pot',
    notes:     'Good bluff candidates have blockers to villain\'s calling range (e.g., having an ace blocks AA/AK/AT calling combos). Size bluffs consistently with your value bets.',
  },
];

// ── Core postflop principles ──────────────────────────────────────────────────
export const principles = [
  {
    title: 'Position is everything',
    body:  'IP player sees villain\'s action before deciding. This allows IP to realize more equity on every street — hence why IP calls more hands preflop and bets wider postflop.',
  },
  {
    title: 'Range advantage vs nut advantage',
    body:  'Range advantage = your overall range has higher equity on this board. Nut advantage = you have more of the strongest hands (nutted hands). Both matter. Range advantage drives frequency; nut advantage drives sizing.',
  },
  {
    title: 'Bet sizing is a signal',
    body:  'Small bets (25–33%) work best when betting polarization is low (all hands benefit). Large bets (66–100%+) work when your range is polarized. Calibrate by how much of your range wants to bet at that size.',
  },
  {
    title: 'Equity realization',
    body:  'Not all hands realize their raw equity. Position, playability, and opponent ranges affect this. Suited connectors and pairs realize more equity IP than OOP. Account for this when evaluating thin preflop calls.',
  },
  {
    title: 'Balancing check-raises',
    body:  'When you check, villain may bet. Having check-raises in your range (both value and bluffs) prevents exploitation. Without check-raises, villain can bet freely knowing you\'ll only call or fold.',
  },
  {
    title: 'Blockers on the river',
    body:  'Holding a card reduces the number of combos your opponent can have containing that rank. On a flush-completing river, holding a flush card is a good bluff — you block villain\'s strong flush hands that might call your bluff.',
  },
];
