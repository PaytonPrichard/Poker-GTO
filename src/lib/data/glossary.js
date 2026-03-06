// ─────────────────────────────────────────────────────────────────────────────
// Poker GTO Glossary
// category: 'Positions' | 'Preflop' | 'Postflop' | 'Theory'
// ─────────────────────────────────────────────────────────────────────────────

export const glossary = [

  // ── Positions ─────────────────────────────────────────────────────────────
  {
    term: 'BTN',
    full: 'Button',
    category: 'Positions',
    definition: 'Dealer position; acts last postflop, most profitable seat, opens widest preflop range.',
  },
  {
    term: 'SB',
    full: 'Small Blind',
    category: 'Positions',
    definition: 'Posts half a big blind; acts first postflop, worst position at the table.',
  },
  {
    term: 'BB',
    full: 'Big Blind',
    category: 'Positions',
    definition: 'Posts a full big blind; acts last preflop, defends the widest range facing a raise.',
  },
  {
    term: 'UTG',
    full: 'Under the Gun',
    category: 'Positions',
    definition: 'First to act preflop; opens the tightest range (~14–16% in 6-max).',
  },
  {
    term: 'HJ',
    full: 'Hijack',
    category: 'Positions',
    definition: 'Two seats right of BTN in 6-max; opens a medium-tight range (~20%).',
  },
  {
    term: 'CO',
    full: 'Cutoff',
    category: 'Positions',
    definition: 'One seat right of BTN; second-best open position, opens ~28% of hands.',
  },
  {
    term: 'EP',
    full: 'Early Position',
    category: 'Positions',
    definition: 'First seats to act preflop (UTG, UTG+1); opens the tightest ranges.',
  },
  {
    term: 'MP',
    full: 'Middle Position',
    category: 'Positions',
    definition: 'Middle seats (HJ in 6-max); opens a medium-wide range.',
  },
  {
    term: 'LP',
    full: 'Late Position',
    category: 'Positions',
    definition: 'CO and BTN; positional advantage, widest opening ranges.',
  },
  {
    term: 'IP',
    full: 'In Position',
    category: 'Positions',
    definition: 'Acting after your opponent postflop; see their action first, realize more equity.',
  },
  {
    term: 'OOP',
    full: 'Out of Position',
    category: 'Positions',
    definition: 'Acting before your opponent postflop; less information, check more, use larger bet sizes.',
  },

  // ── Preflop ───────────────────────────────────────────────────────────────
  {
    term: 'RFI',
    full: 'Raise First In',
    category: 'Preflop',
    definition: 'Open raise when all before you folded; 3x from EP, 2.5x from LP.',
  },
  {
    term: 'PFR',
    full: 'Preflop Raiser',
    category: 'Preflop',
    definition: 'Player who made the last preflop raise; typically has range advantage on high-card boards.',
  },
  {
    term: '3-Bet',
    full: 'Three-Bet',
    category: 'Preflop',
    definition: 'Re-raise over an open raise; GTO 3-bets are polarized with value hands plus bluffs.',
  },
  {
    term: '4-Bet',
    full: 'Four-Bet',
    category: 'Preflop',
    definition: 'Re-raise over a 3-bet; very strong or polarized range. Below ~40 BB, usually a shove.',
  },
  {
    term: '5-Bet',
    full: 'Five-Bet / Shove',
    category: 'Preflop',
    definition: 'Re-raise over a 4-bet; almost always all-in. Range: AA, KK, AKs.',
  },
  {
    term: 'Cold Call',
    full: 'Cold Call',
    category: 'Preflop',
    definition: 'Calling a raise without prior investment in the pot; less common in GTO, most strong hands 3-bet.',
  },
  {
    term: 'Squeeze',
    full: 'Squeeze Play',
    category: 'Preflop',
    definition: '3-bet after a raise and one or more callers; sizing is larger (4x+ the open).',
  },
  {
    term: 'Open Limp',
    full: 'Open Limp',
    category: 'Preflop',
    definition: 'Calling the big blind instead of raising; generally a GTO mistake, prefer raising.',
  },
  {
    term: 'Effective Stack',
    full: 'Effective Stack',
    category: 'Preflop',
    definition: 'The smaller of the two stacks in a hand; pot-commitment decisions are based on this.',
  },
  {
    term: 'BB (unit)',
    full: 'Big Blind (as a unit)',
    category: 'Preflop',
    definition: 'Unit measuring stack depth or bet sizing (e.g., "100 BB effective"); normalizes across stakes.',
  },
  {
    term: 'Steal',
    full: 'Blind Steal',
    category: 'Preflop',
    definition: 'Late position open raise aiming to win the blinds; core GTO strategy, even weak hands profit.',
  },
  {
    term: 'HU',
    full: 'Heads-Up',
    category: 'Preflop',
    definition: 'Only two active players; wider ranges, more aggression and bluffing than multiway.',
  },
  {
    term: 'Suited Connector',
    full: 'Suited Connector',
    category: 'Preflop',
    definition: 'Consecutive same-suit cards (e.g., 9♥8♥); high equity realization, best IP with deep stacks.',
  },
  {
    term: 'Broadway',
    full: 'Broadway',
    category: 'Preflop',
    definition: 'Cards T through A; broadway boards (K-Q-J) heavily favor the preflop raiser\'s range.',
  },
  {
    term: 'Wheel',
    full: 'Wheel',
    category: 'Preflop',
    definition: 'Lowest straight: A-2-3-4-5; A5s/A4s are valuable bluff candidates for wheel potential.',
  },
  {
    term: 'Overcard',
    full: 'Overcard',
    category: 'Preflop',
    definition: 'Hole card higher than any board card (e.g., AK on 9-7-2); ~6 outs to top pair.',
  },
  {
    term: 'Kicker',
    full: 'Kicker',
    category: 'Preflop',
    definition: 'Side card that breaks ties; AK beats AJ on A-high board via king kicker.',
  },
  {
    term: 'Dominated',
    full: 'Dominated Hand',
    category: 'Preflop',
    definition: 'Hand sharing a card with opponent but worse kicker (e.g., KT vs KQ); wins only ~25-30%.',
  },

  // ── Postflop ──────────────────────────────────────────────────────────────
  {
    term: 'C-Bet',
    full: 'Continuation Bet',
    category: 'Postflop',
    definition: 'Flop bet by the preflop aggressor; frequency depends on board texture (high dry, low wet).',
  },
  {
    term: 'Donk Bet',
    full: 'Donk Bet',
    category: 'Postflop',
    definition: 'Betting into the PFR before they c-bet; generally discouraged in GTO, caps your range.',
  },
  {
    term: 'Check-Raise',
    full: 'Check-Raise',
    category: 'Postflop',
    definition: 'Check then raise after opponent bets; prevents opponents from betting freely when balanced.',
  },
  {
    term: 'Float',
    full: 'Float',
    category: 'Postflop',
    definition: 'Calling a c-bet with a weak hand, planning to bluff later if opponent shows weakness; best IP.',
  },
  {
    term: 'Double Barrel',
    full: 'Double Barrel',
    category: 'Postflop',
    definition: 'Betting flop and turn as aggressor; frequency depends on the turn card runout.',
  },
  {
    term: 'Triple Barrel',
    full: 'Triple Barrel',
    category: 'Postflop',
    definition: 'Betting flop, turn, and river; represents maximum strength with a polarized range.',
  },
  {
    term: 'Overbet',
    full: 'Overbet',
    category: 'Postflop',
    definition: 'Bet larger than the pot; used with significant nut advantage to pressure villain.',
  },
  {
    term: 'Probe Bet',
    full: 'Probe Bet',
    category: 'Postflop',
    definition: 'Bet into the aggressor after they checked back; exploits their capped range.',
  },
  {
    term: 'SPR',
    full: 'Stack-to-Pot Ratio',
    category: 'Postflop',
    definition: 'Stack / pot. Low (1-4): commit with strong hands. Medium (4-10): careful with one pair. High (10+): need two pair+.',
  },
  {
    term: 'Thin Value',
    full: 'Thin Value Bet',
    category: 'Postflop',
    definition: 'Value bet that narrowly beats villain\'s calling range (e.g., second pair on river).',
  },
  {
    term: 'Trap',
    full: 'Trap / Slow-Play',
    category: 'Postflop',
    definition: 'Checking/calling with a strong hand to disguise strength; risky on wet boards.',
  },
  {
    term: 'Bluff-Catcher',
    full: 'Bluff-Catcher',
    category: 'Postflop',
    definition: 'Hand that beats only bluffs but loses to all value bets; calling depends on villain\'s bluff frequency.',
  },
  {
    term: 'Hero Call',
    full: 'Hero Call',
    category: 'Postflop',
    definition: 'Calling a large river bet with a bluff-catcher based on a read that villain is bluffing.',
  },
  {
    term: 'Dry Board',
    full: 'Dry Board',
    category: 'Postflop',
    definition: 'Unconnected, rainbow flop (e.g., A♠7♣2♦); favors PFR, supports small frequent c-bets.',
  },
  {
    term: 'Wet Board',
    full: 'Wet Board',
    category: 'Postflop',
    definition: 'Connected/suited flop (e.g., J♥T♥8♠); many draws possible, favors callers, requires larger sizing.',
  },
  {
    term: 'Monotone',
    full: 'Monotone Board',
    category: 'Postflop',
    definition: 'All three flop cards same suit (e.g., 9♥7♥3♥); c-bet frequency drops, bet only nut hands.',
  },
  {
    term: 'Two-Tone',
    full: 'Two-Tone Board',
    category: 'Postflop',
    definition: 'Two flop cards same suit (e.g., A♦8♥5♥); flush draws possible, size up slightly vs rainbow.',
  },
  {
    term: 'Rainbow',
    full: 'Rainbow Board',
    category: 'Postflop',
    definition: 'All three flop cards different suits (e.g., K♠7♦2♣); no flush draws, highest c-bet frequencies.',
  },
  {
    term: 'Connected Board',
    full: 'Connected Board',
    category: 'Postflop',
    definition: 'Cards close in rank (e.g., J-T-8); many straight possibilities, favors callers, c-bet less and larger.',
  },
  {
    term: 'Paired Board',
    full: 'Paired Board',
    category: 'Postflop',
    definition: 'Two cards same rank (e.g., K-K-7); PFR has more trips on high paired boards, bet small.',
  },
  {
    term: 'Brick',
    full: 'Brick / Blank',
    category: 'Postflop',
    definition: 'Turn/river card that changes nothing (e.g., 2♣ on K♠9♦4♥); good for continuing aggression.',
  },
  {
    term: 'Scare Card',
    full: 'Scare Card',
    category: 'Postflop',
    definition: 'Turn/river card that completes draws or shifts hand strengths; creates bluffing opportunities.',
  },

  // ── Theory ────────────────────────────────────────────────────────────────
  {
    term: 'GTO',
    full: 'Game Theory Optimal',
    category: 'Theory',
    definition: 'Unexploitable Nash Equilibrium strategy; strong default baseline against unknown opponents.',
  },
  {
    term: 'EV',
    full: 'Expected Value',
    category: 'Theory',
    definition: 'Average amount won or lost over many repetitions; +EV = profitable, -EV = unprofitable.',
  },
  {
    term: 'Equity',
    full: 'Equity',
    category: 'Theory',
    definition: 'Your pot share if run to showdown (e.g., flush draw = ~35%); raw equity does not equal EV.',
  },
  {
    term: 'Equity Realization',
    full: 'Equity Realization',
    category: 'Theory',
    definition: 'How much raw equity you convert to profit; IP hands realize more than OOP hands.',
  },
  {
    term: 'Range',
    full: 'Hand Range',
    category: 'Theory',
    definition: 'All hands a player could hold in a situation; represented as a 169-combo matrix.',
  },
  {
    term: 'Combo',
    full: 'Hand Combination',
    category: 'Theory',
    definition: 'Specific holding by suit: AKs = 4 combos, AKo = 12, AA = 6. Total in deck: 1,326.',
  },
  {
    term: 'MDF',
    full: 'Minimum Defense Frequency',
    category: 'Theory',
    definition: 'Minimum % you must continue to prevent profitable bluffs. MDF = Pot / (Pot + Bet); pot-size bet = 50%.',
  },
  {
    term: 'Pot Odds',
    full: 'Pot Odds',
    category: 'Theory',
    definition: 'Ratio of pot to call amount; $50 into $150 = 3:1 (need 33% equity to break even).',
  },
  {
    term: 'Implied Odds',
    full: 'Implied Odds',
    category: 'Theory',
    definition: 'Extra chips expected on future streets when you hit your draw; can justify calls beyond pot odds.',
  },
  {
    term: 'Blocker',
    full: 'Blocker',
    category: 'Theory',
    definition: 'Card that reduces opponent\'s combos (e.g., A♠ blocks 50% of AA); aids bluff selection.',
  },
  {
    term: 'Polarized',
    full: 'Polarized Range',
    category: 'Theory',
    definition: 'Range of strong value hands and bluffs with no middle ground; uses large sizings (66%+).',
  },
  {
    term: 'Merged',
    full: 'Merged Range',
    category: 'Theory',
    definition: 'Value-heavy range without many bluffs; uses smaller sizings (25-50%) for thin value.',
  },
  {
    term: 'Range Advantage',
    full: 'Range Advantage',
    category: 'Theory',
    definition: 'Your range has higher equity on the board; c-bet more frequently (e.g., PFR on A-high boards).',
  },
  {
    term: 'Nut Advantage',
    full: 'Nut Advantage',
    category: 'Theory',
    definition: 'Having more nutted hands than your opponent on a board; justifies larger bets and overbets.',
  },
  {
    term: 'Semi-Bluff',
    full: 'Semi-Bluff',
    category: 'Theory',
    definition: 'Betting/raising with a draw; two ways to win: opponent folds or you hit.',
  },
  {
    term: 'Fold Equity',
    full: 'Fold Equity',
    category: 'Theory',
    definition: 'EV gained from making opponent fold; diminishes on later streets and with shorter stacks.',
  },
  {
    term: 'Board Texture',
    full: 'Board Texture',
    category: 'Theory',
    definition: 'Character of community cards (dry, wet, paired, monotone); determines c-bet frequency and sizing.',
  },
  {
    term: 'Nash Equilibrium',
    full: 'Nash Equilibrium',
    category: 'Theory',
    definition: 'Strategy where neither player gains by changing unilaterally; the unexploitable baseline.',
  },
  {
    term: 'Runout',
    full: 'Runout',
    category: 'Theory',
    definition: 'Remaining community cards to come; a "good runout" improves your range relative to villain\'s.',
  },
  {
    term: 'Balance',
    full: 'Balance / Balanced Play',
    category: 'Theory',
    definition: 'Value bets and bluffs at the correct ratio so opponents cannot exploit your ranges.',
  },
  {
    term: 'Value Bet',
    full: 'Value Bet',
    category: 'Theory',
    definition: 'Bet with a strong hand hoping worse hands call; sizing depends on range and board.',
  },
  {
    term: 'Mixed Strategy',
    full: 'Mixed Strategy',
    category: 'Theory',
    definition: 'Playing a hand with multiple actions at set frequencies (e.g., raise 60%, call 40%) for balance.',
  },
  {
    term: 'VPIP',
    full: 'Voluntarily Put In Pot',
    category: 'Theory',
    definition: 'HUD stat: % of hands played voluntarily. <18% = tight, 20-28% = solid, >35% = loose.',
  },
  {
    term: 'WTSD',
    full: 'Went To Showdown',
    category: 'Theory',
    definition: 'HUD stat: how often a player reaches showdown. >35% = calling station, <25% = good bluff target.',
  },
  {
    term: 'AF',
    full: 'Aggression Factor',
    category: 'Theory',
    definition: 'HUD stat: (bets + raises) / calls. >3 = very aggressive, 1-2 = balanced, <1 = passive.',
  },
  {
    term: 'Outs',
    full: 'Outs',
    category: 'Theory',
    definition: 'Cards that improve your hand; flush draw = 9 outs, OESD = 8. Rule of 2 & 4 converts to equity.',
  },
  {
    term: 'Backdoor Draw',
    full: 'Backdoor Draw',
    category: 'Theory',
    definition: 'Draw needing both turn and river to complete (runner-runner); worth ~1-2 extra outs.',
  },
  {
    term: 'Combo Draw',
    full: 'Combo Draw',
    category: 'Theory',
    definition: 'Multiple draws at once (e.g., flush + OESD = 15 outs, ~54% equity); often equity favorites.',
  },
  {
    term: 'Gutshot',
    full: 'Gutshot Straight Draw',
    category: 'Theory',
    definition: 'Straight draw needing one specific rank (4 outs); half the outs of an OESD.',
  },
  {
    term: 'Air',
    full: 'Air / No Showdown Value',
    category: 'Theory',
    definition: 'Hand with zero showdown value; ideal for bluffing since you lose nothing by betting.',
  },
  {
    term: 'Showdown Value',
    full: 'Showdown Value',
    category: 'Theory',
    definition: 'How likely a hand wins at showdown; hands with SDV should check-call, not bet.',
  },
  {
    term: 'Capped Range',
    full: 'Capped Range',
    category: 'Theory',
    definition: 'Range limited in strength by prior actions (e.g., just calling = no AA/KK); vulnerable to large bets.',
  },
  {
    term: 'Uncapped Range',
    full: 'Uncapped Range',
    category: 'Theory',
    definition: 'Range containing nuts to air; PFR typically has this, enabling overbets and polarized bets.',
  },
  {
    term: 'Pot-Committed',
    full: 'Pot-Committed',
    category: 'Theory',
    definition: 'Stack too small relative to pot to fold; occurs at SPR < 2, must get chips in.',
  },
  {
    term: 'Frequency',
    full: 'Betting Frequency',
    category: 'Theory',
    definition: 'How often to take an action with your range; high frequency = small sizing, low = large (inversely related).',
  },
  {
    term: 'Line',
    full: 'Betting Line',
    category: 'Theory',
    definition: 'Sequence of actions across streets; must tell a consistent story for bluffs to work.',
  },
  {
    term: 'Protection',
    full: 'Protection / Range Protection',
    category: 'Theory',
    definition: 'Betting wider to deny free cards; also keeping strong hands in your checking range.',
  },
  {
    term: 'Reverse Implied Odds',
    full: 'Reverse Implied Odds',
    category: 'Theory',
    definition: 'Chips lost when you hit your draw but it\'s second-best (e.g., non-nut flush vs nut flush).',
  },
  {
    term: 'Buy-in',
    full: 'Buy-in',
    category: 'Theory',
    definition: 'Money to enter a game; standard cash buy-in is 100 BB (e.g., $1/$2 = $200). Bankroll measured in buy-ins.',
  },
  {
    term: 'Stakes',
    full: 'Stake Level',
    category: 'Theory',
    definition: 'Blind level (e.g., $1/$2); NL200 = $200 buy-in. Moving up requires larger bankroll and stronger skills.',
  },
];

// Quick lookup by term string for the tooltip system
export const glossaryByTerm = Object.fromEntries(
  glossary.map(g => [g.term, g])
);

export const categories = ['All', ...new Set(glossary.map(g => g.category))];
