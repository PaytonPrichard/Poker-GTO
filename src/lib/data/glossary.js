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
    definition: 'The dealer position. Acts last on every postflop street — the most profitable seat at the table. Opens the widest preflop range of any position.',
  },
  {
    term: 'SB',
    full: 'Small Blind',
    category: 'Positions',
    definition: 'Posts half a big blind before the deal. Acts first postflop (before BB), making it the worst position at the table. Ranges must account for being out of position on every postflop street.',
  },
  {
    term: 'BB',
    full: 'Big Blind',
    category: 'Positions',
    definition: 'Posts a full big blind before the deal. Acts last preflop (best preflop position), but second-to-last postflop. Gets a discount to call opens — defends the widest range of any position facing a raise.',
  },
  {
    term: 'UTG',
    full: 'Under the Gun',
    category: 'Positions',
    definition: 'First player to act preflop. Has the most players left to act behind, so must open the tightest range. In a 6-max game, UTG opens roughly 14–16% of hands.',
  },
  {
    term: 'HJ',
    full: 'Hijack',
    category: 'Positions',
    definition: 'Two seats to the right of the Button (6-max). Named for its ability to "hijack" the late-position seats. Opens a medium-tight range (~20%).',
  },
  {
    term: 'CO',
    full: 'Cutoff',
    category: 'Positions',
    definition: 'One seat to the right of the Button. The second-best position to open from. Opens a wide range (~28%) since only BTN and the blinds remain behind.',
  },
  {
    term: 'EP',
    full: 'Early Position',
    category: 'Positions',
    definition: 'Collective term for the first one or two seats to act preflop (UTG, UTG+1). Opens the tightest ranges due to the number of players left to act.',
  },
  {
    term: 'MP',
    full: 'Middle Position',
    category: 'Positions',
    definition: 'Collective term for the middle seats (HJ in 6-max). Opens a medium-wide range.',
  },
  {
    term: 'LP',
    full: 'Late Position',
    category: 'Positions',
    definition: 'Collective term for CO and BTN. These seats have positional advantage and open the widest ranges.',
  },
  {
    term: 'IP',
    full: 'In Position',
    category: 'Positions',
    definition: 'Acting after your opponent on postflop streets. IP players see the opponent\'s action before deciding, which allows them to realize more equity and defend/bluff more efficiently.',
  },
  {
    term: 'OOP',
    full: 'Out of Position',
    category: 'Positions',
    definition: 'Acting before your opponent on postflop streets. OOP players must act with less information. GTO play OOP often involves checking more and using larger bet sizes when betting.',
  },

  // ── Preflop ───────────────────────────────────────────────────────────────
  {
    term: 'RFI',
    full: 'Raise First In',
    category: 'Preflop',
    definition: 'An open raise when all players before you have folded. The standard preflop aggression. Size varies by position: 3x from EP, 2.5x from LP.',
  },
  {
    term: '3-Bet',
    full: 'Three-Bet',
    category: 'Preflop',
    definition: 'A re-raise over an open raise. The blinds are the first "bet," the open is the second, so the re-raise is the third. GTO 3-bets are polarized: strong value hands plus bluffs (often suited aces).',
  },
  {
    term: '4-Bet',
    full: 'Four-Bet',
    category: 'Preflop',
    definition: 'A re-raise over a 3-bet. Typically a very strong or polarized range. At stack depths below ~40 BB effective, a 4-bet is usually a shove.',
  },
  {
    term: '5-Bet',
    full: 'Five-Bet / Shove',
    category: 'Preflop',
    definition: 'A re-raise over a 4-bet. Almost always all-in at normal stack depths. Range narrows to near-nutted hands (AA, KK, AKs) unless short-stacked.',
  },
  {
    term: 'Cold Call',
    full: 'Cold Call',
    category: 'Preflop',
    definition: 'Calling a raise without previously having invested chips in the pot. Distinct from a BB defense (which had a forced investment). Cold calling is less common in GTO play — most strong hands 3-bet instead.',
  },
  {
    term: 'Squeeze',
    full: 'Squeeze Play',
    category: 'Preflop',
    definition: 'A 3-bet made after a raise AND one or more callers. The callers are "squeezed" — they face a 3-bet and cannot call without also being the cold-caller behind. Squeeze sizing is larger (4x+ the open).',
  },
  {
    term: 'Open Limp',
    full: 'Open Limp',
    category: 'Preflop',
    definition: 'Entering the pot by just calling the big blind instead of raising. Generally a mistake in GTO play — almost all playable hands prefer a raise to build the pot and gain initiative.',
  },
  {
    term: 'Effective Stack',
    full: 'Effective Stack',
    category: 'Preflop',
    definition: 'The smaller of the two stacks in a hand. The player with the shorter stack can only win up to the effective stack amount, so pot-commitment decisions are based on the effective stack, not stack size.',
  },
  {
    term: 'BB (unit)',
    full: 'Big Blind (as a unit)',
    category: 'Preflop',
    definition: 'Used as a measurement of stack depth or bet sizing. E.g., "opening to 2.5 BB" or "100 BB effective stacks." Normalizes bet sizes across different stake levels.',
  },

  // ── Postflop ──────────────────────────────────────────────────────────────
  {
    term: 'C-Bet',
    full: 'Continuation Bet',
    category: 'Postflop',
    definition: 'Betting the flop after being the preflop aggressor. Continues the story of having a strong hand. GTO c-bet frequency depends on board texture — high on dry boards, low on wet or low-card boards.',
  },
  {
    term: 'Donk Bet',
    full: 'Donk Bet',
    category: 'Postflop',
    definition: 'Betting into the preflop aggressor (out of position) before they have a chance to c-bet. Generally discouraged in GTO play as it caps your range and gives away information. Reserved for specific, well-defined situations.',
  },
  {
    term: 'Check-Raise',
    full: 'Check-Raise',
    category: 'Postflop',
    definition: 'Checking to your opponent, then raising after they bet. A powerful play that represents a very strong hand. Having check-raises in your range (both value and bluffs) prevents opponents from betting freely.',
  },
  {
    term: 'Float',
    full: 'Float',
    category: 'Postflop',
    definition: 'Calling a c-bet with a weak hand or draw with the intention of bluffing on a later street if the opponent shows weakness (checks). More effective in position.',
  },
  {
    term: 'Double Barrel',
    full: 'Double Barrel',
    category: 'Postflop',
    definition: 'Betting both the flop and the turn as the aggressor. Continues narrative of strength. GTO double-barrel frequency depends on the turn card — bet more on good runouts, check more on bad ones.',
  },
  {
    term: 'Triple Barrel',
    full: 'Triple Barrel',
    category: 'Postflop',
    definition: 'Betting flop, turn, and river. Represents maximum strength. River bets should be polarized — either strong value or bluffs. Thin value hands typically check the river.',
  },
  {
    term: 'Overbet',
    full: 'Overbet',
    category: 'Postflop',
    definition: 'A bet larger than the current pot size. Used when you have a significant nut advantage — more of the strongest hands than your opponent. Forces villain to defend with weaker holdings at an unfavorable price.',
  },
  {
    term: 'Probe Bet',
    full: 'Probe Bet',
    category: 'Postflop',
    definition: 'A bet on a later street by the player who called on the previous street (i.e., betting into the preflop aggressor who checked back). Exploits the checked range which tends to be capped.',
  },
  {
    term: 'SPR',
    full: 'Stack-to-Pot Ratio',
    category: 'Postflop',
    definition: 'Effective stack divided by the current pot size. Low SPR (1–4): strong hands should be willing to go all-in. Medium SPR (4–10): play carefully with one-pair hands. High SPR (10+): two-pair+ needed for commitment.',
  },

  // ── Theory ────────────────────────────────────────────────────────────────
  {
    term: 'GTO',
    full: 'Game Theory Optimal',
    category: 'Theory',
    definition: 'A strategy that cannot be exploited — it achieves maximum EV regardless of how opponents play. Technically, the Nash Equilibrium of poker. In practice, GTO provides a strong default baseline against unknown opponents.',
  },
  {
    term: 'EV',
    full: 'Expected Value',
    category: 'Theory',
    definition: 'The average amount won or lost by a given play over many repetitions. GTO aims to maximize EV. Positive EV (+EV) means the action makes money on average; negative EV (−EV) means it loses.',
  },
  {
    term: 'Equity',
    full: 'Equity',
    category: 'Theory',
    definition: 'Your share of the pot if the hand were run out to showdown multiple times. E.g., a flush draw on the flop has ~35% equity against one made hand. Raw equity ≠ EV because of position and future betting.',
  },
  {
    term: 'Equity Realization',
    full: 'Equity Realization',
    category: 'Theory',
    definition: 'How much of your raw equity you actually convert to won chips, accounting for position, playability, and future betting. IP hands realize more equity than OOP hands. Suited connectors realize more than offsuit junky hands.',
  },
  {
    term: 'Range',
    full: 'Hand Range',
    category: 'Theory',
    definition: 'The set of all hands a player could hold in a given situation, weighted by their frequency. GTO thinking involves reasoning about ranges (not specific hands). Ranges are represented as a matrix of 169 hand combos.',
  },
  {
    term: 'Combo',
    full: 'Hand Combination',
    category: 'Theory',
    definition: 'A specific holding accounting for suits. E.g., AKs has 4 combos (A♠K♠, A♥K♥, A♦K♦, A♣K♣). AKo has 12 combos. Pairs like AA have 6 combos (C(4,2)). Total unique combos in a deck: 1,326.',
  },
  {
    term: 'MDF',
    full: 'Minimum Defense Frequency',
    category: 'Theory',
    definition: 'The minimum % of your range you must continue with (call or raise) to prevent an opponent from profitably bluffing any two cards. Formula: MDF = Pot / (Pot + Bet). E.g., vs a pot-size bet, MDF = 50%.',
  },
  {
    term: 'Pot Odds',
    full: 'Pot Odds',
    category: 'Theory',
    definition: 'The ratio of the pot size to the call amount. E.g., pot is $100 and you face a $50 bet — you need to call $50 to win $150, so pot odds are 3:1 (33% equity needed to break even). If your equity exceeds this, the call is +EV.',
  },
  {
    term: 'Implied Odds',
    full: 'Implied Odds',
    category: 'Theory',
    definition: 'The additional chips you expect to win on future streets if you hit your draw. E.g., calling a flop bet with a flush draw may be +EV even if pot odds alone don\'t justify it, because you\'ll win more chips when you hit.',
  },
  {
    term: 'Blocker',
    full: 'Blocker',
    category: 'Theory',
    definition: 'Holding a card that reduces the number of combos your opponent can have. E.g., holding A♠ blocks AA combos by 50%. On river bluffs, having a card that blocks villain\'s calling range makes the bluff more profitable.',
  },
  {
    term: 'Polarized',
    full: 'Polarized Range',
    category: 'Theory',
    definition: 'A betting range composed of strong value hands and bluffs, with little middle ground. Polarized bets tend to use large sizings (66%–pot+). The river is naturally polarized — you either have it or you don\'t.',
  },
  {
    term: 'Merged',
    full: 'Merged Range',
    category: 'Theory',
    definition: 'A betting range that includes mostly strong but not necessarily nutted hands — a "value-heavy" range without many bluffs. Merged bets use smaller sizings (25–50%) to get thin value from medium-strength hands.',
  },
  {
    term: 'Range Advantage',
    full: 'Range Advantage',
    category: 'Theory',
    definition: 'When your overall range has higher equity on a given board than your opponent\'s. The player with range advantage should c-bet more frequently. E.g., the preflop raiser has range advantage on A-high boards.',
  },
  {
    term: 'Nut Advantage',
    full: 'Nut Advantage',
    category: 'Theory',
    definition: 'Having more of the strongest (nutted) hands on a board than your opponent, even if overall range equity is close. Nut advantage justifies using larger bet sizes and overbets.',
  },
  {
    term: 'Semi-Bluff',
    full: 'Semi-Bluff',
    category: 'Theory',
    definition: 'A bet or raise with a hand that is currently behind but has outs to improve (a draw). Semi-bluffs are preferred over pure bluffs because they have two ways to win: opponent folds, or you hit your draw.',
  },
  {
    term: 'Fold Equity',
    full: 'Fold Equity',
    category: 'Theory',
    definition: 'The portion of a bet\'s EV that comes from making the opponent fold. A bet with high fold equity means villain folds often enough that even a weak hand profits. Fold equity diminishes on later streets with short stacks.',
  },
  {
    term: 'Board Texture',
    full: 'Board Texture',
    category: 'Theory',
    definition: 'The character of community cards: dry (unconnected, rainbow), wet (connected, suited), paired, monotone, etc. Texture determines c-bet frequency, sizing, and which player\'s range connects more favorably.',
  },
  {
    term: 'Nash Equilibrium',
    full: 'Nash Equilibrium',
    category: 'Theory',
    definition: 'A strategy pair where neither player can improve by unilaterally changing their approach. GTO poker aims to play the Nash Equilibrium — the unexploitable strategy. In practice, deviating from it to exploit leaks can be more +EV vs weak players.',
  },
  {
    term: 'Runout',
    full: 'Runout',
    category: 'Theory',
    definition: 'The remaining community cards to be dealt (turn and/or river). A "good runout" improves your range relative to villain\'s. Turn and river strategy is heavily dependent on which card comes off the deck.',
  },
  {
    term: 'Balance',
    full: 'Balance / Balanced Play',
    category: 'Theory',
    definition: 'Playing value bets and bluffs at the correct ratio so opponents cannot exploit your ranges. A balanced player is indifferent-making — opponent cannot profitably always call or always fold against a balanced range.',
  },
  {
    term: 'Value Bet',
    full: 'Value Bet',
    category: 'Theory',
    definition: 'A bet made with a strong hand hoping to be called by worse hands. The goal is to extract chips from opponents who have second-best hands. Sizing matters — bet larger when you want folds from drawing hands, smaller for thin value.',
  },
  {
    term: 'Mixed Strategy',
    full: 'Mixed Strategy',
    category: 'Theory',
    definition: 'Playing a hand with multiple actions at certain frequencies (e.g., raise 60%, call 40%). Solvers often recommend mixed strategies to balance ranges and prevent exploitation. In practice, leaning one direction is usually fine.',
  },
];

// Quick lookup by term string for the tooltip system
export const glossaryByTerm = Object.fromEntries(
  glossary.map(g => [g.term, g])
);

export const categories = ['All', ...new Set(glossary.map(g => g.category))];
