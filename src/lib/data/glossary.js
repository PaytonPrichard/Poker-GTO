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
    definition: 'An open raise when all players before you have folded. The standard preflop aggression. Size varies by position: 3x from EP, 2.5x from LP. Not to be confused with PFR — RFI specifically means opening the pot, while PFR refers to whoever made the last raise preflop.',
  },
  {
    term: 'PFR',
    full: 'Preflop Raiser',
    category: 'Preflop',
    definition: 'The player who made the last raise before the flop — the preflop aggressor. If UTG opens and BTN 3-bets, the BTN is the PFR. The PFR typically has range advantage on high-card boards (A-high, K-high) and is expected to c-bet. Postflop strategy references (c-bet frequencies, range advantage) are usually from the PFR\'s perspective.',
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
  {
    term: 'Steal',
    full: 'Blind Steal',
    category: 'Preflop',
    definition: 'An open raise from late position (CO or BTN) with a wide range, aiming to win the blinds without a fight. Steal attempts are a core part of GTO strategy — the blinds fold often enough that even weak hands profit.',
  },
  {
    term: 'HU',
    full: 'Heads-Up',
    category: 'Preflop',
    definition: 'A pot or game with only two active players. Heads-up play involves much wider ranges, more aggression, and more bluffing than multiway play. Many pots become HU by the flop after preflop action.',
  },
  {
    term: 'Suited Connector',
    full: 'Suited Connector',
    category: 'Preflop',
    definition: 'Two consecutive cards of the same suit, like 9♥8♥ or 6♦5♦. Suited connectors have high equity realization due to straight and flush potential. Best played in position with deep stacks and good implied odds.',
  },
  {
    term: 'Broadway',
    full: 'Broadway',
    category: 'Preflop',
    definition: 'Cards Ten and above (T, J, Q, K, A). A "broadway hand" contains two broadway cards (e.g., KQo, AJo). Broadway boards (like K-Q-J) heavily favor the preflop raiser\'s range.',
  },
  {
    term: 'Wheel',
    full: 'Wheel',
    category: 'Preflop',
    definition: 'The lowest possible straight: A-2-3-4-5, where the ace plays as a one. "Wheel cards" refers to low cards (A through 5). Hands like A5s and A4s are valuable bluff candidates because they can make the wheel.',
  },
  {
    term: 'Overcard',
    full: 'Overcard',
    category: 'Preflop',
    definition: 'A hole card ranked higher than any community card (e.g., holding AK on a 9-7-2 board — both cards are overcards). Overcards have ~6 outs to improve to top pair but often face equity disadvantage vs made hands.',
  },
  {
    term: 'Kicker',
    full: 'Kicker',
    category: 'Preflop',
    definition: 'The side card that breaks ties between hands of the same rank. E.g., AK vs AJ on an A-high board — both have top pair, but AK wins with the king kicker. Kicker quality is a major factor in hand strength.',
  },
  {
    term: 'Dominated',
    full: 'Dominated Hand',
    category: 'Preflop',
    definition: 'A hand that shares a card with the opponent but has a worse kicker — e.g., KT is dominated by KQ (both have a king, but Q outkicks T). Dominated hands win only ~25-30% of the time, making them dangerous to play.',
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
  {
    term: 'Thin Value',
    full: 'Thin Value Bet',
    category: 'Postflop',
    definition: 'A value bet with a hand that only narrowly beats the opponent\'s calling range — e.g., betting second pair on the river hoping worse pairs call. High-skill play that requires accurate reads on villain\'s range.',
  },
  {
    term: 'Trap',
    full: 'Trap / Slow-Play',
    category: 'Postflop',
    definition: 'Checking or calling with a very strong hand instead of raising, to disguise strength and induce bets or bluffs from opponents. Most effective against aggressive players. Risky on wet boards where draws can complete.',
  },
  {
    term: 'Bluff-Catcher',
    full: 'Bluff-Catcher',
    category: 'Postflop',
    definition: 'A hand that beats only bluffs but loses to all value bets — typically a medium-strength hand like second pair or weak top pair on the river. Whether to call with a bluff-catcher depends on how often villain bluffs at that frequency.',
  },
  {
    term: 'Hero Call',
    full: 'Hero Call',
    category: 'Postflop',
    definition: 'Calling a large bet (usually on the river) with a bluff-catcher based on a read that the opponent is bluffing. Requires strong hand-reading skills and confidence in your player profile assessment. The opposite of a disciplined fold.',
  },
  {
    term: 'Dry Board',
    full: 'Dry Board',
    category: 'Postflop',
    definition: 'A flop with unconnected, unsuited cards — e.g., A♠ 7♣ 2♦. Few draws are possible. Dry boards favor the preflop raiser (more high-card hands) and support small, frequent c-bets.',
  },
  {
    term: 'Wet Board',
    full: 'Wet Board',
    category: 'Postflop',
    definition: 'A flop with connected and/or suited cards — e.g., J♥ T♥ 8♠. Many straights, flushes, and draws are possible. Wet boards favor callers\' ranges and require larger bet sizing to charge draws.',
  },
  {
    term: 'Monotone',
    full: 'Monotone Board',
    category: 'Postflop',
    definition: 'A flop where all three cards share the same suit — e.g., 9♥ 7♥ 3♥. Extremely dangerous: many players have flush draws. C-bet frequency drops significantly. Only bet with the nut flush or strong nut draws.',
  },
  {
    term: 'Two-Tone',
    full: 'Two-Tone Board',
    category: 'Postflop',
    definition: 'A flop where two cards share the same suit — e.g., A♦ 8♥ 5♥. Flush draws are possible for one suit. Adds complexity to c-bet decisions — size up slightly compared to rainbow boards to charge flush draws.',
  },
  {
    term: 'Rainbow',
    full: 'Rainbow Board',
    category: 'Postflop',
    definition: 'A flop where all three cards are different suits — e.g., K♠ 7♦ 2♣. No flush draws are possible on the flop. Rainbow boards are the driest texture and support higher c-bet frequencies.',
  },
  {
    term: 'Connected Board',
    full: 'Connected Board',
    category: 'Postflop',
    definition: 'A flop with cards close in rank — e.g., J-T-8, 7-6-5. Many straight and two-pair possibilities exist. Connected boards favor callers\' wider, suited-connector-heavy ranges. C-bet less, size larger.',
  },
  {
    term: 'Paired Board',
    full: 'Paired Board',
    category: 'Postflop',
    definition: 'A flop where two cards share the same rank — e.g., K-K-7 or 5-5-3. The preflop raiser usually has more trips combos on high paired boards. Bet small and frequently when you hold the trip card.',
  },
  {
    term: 'Brick',
    full: 'Brick / Blank',
    category: 'Postflop',
    definition: 'A turn or river card that changes nothing — doesn\'t complete draws, doesn\'t alter range advantage. E.g., a 2♣ on a K♠ 9♦ 4♥ board. Bricks are good for continuing aggression since the board texture didn\'t shift.',
  },
  {
    term: 'Scare Card',
    full: 'Scare Card',
    category: 'Postflop',
    definition: 'A turn or river card that dramatically changes hand strengths or completes obvious draws — e.g., a third heart completing a flush, or an ace on the turn. Scare cards create bluffing opportunities for the player who can credibly represent the draw.',
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
  {
    term: 'VPIP',
    full: 'Voluntarily Put In Pot',
    category: 'Theory',
    definition: 'A HUD stat showing the percentage of hands a player voluntarily puts money into preflop (calls or raises). Low VPIP (<18%) = tight/nit. Medium (20-28%) = solid TAG. High (>35%) = loose/calling station. Key stat for profiling opponents.',
  },
  {
    term: 'WTSD',
    full: 'Went To Showdown',
    category: 'Theory',
    definition: 'A HUD stat measuring how often a player who sees the flop goes all the way to showdown. High WTSD (>35%) = calling station tendencies, rarely folds. Low WTSD (<25%) = folds to pressure, good bluff target.',
  },
  {
    term: 'AF',
    full: 'Aggression Factor',
    category: 'Theory',
    definition: 'A HUD stat measuring (bets + raises) / calls. AF > 3.0 = very aggressive (LAG tendencies). AF 1-2 = balanced. AF < 1 = passive (calling station). Helps identify whether a player bets for value or calls passively.',
  },
  {
    term: 'Outs',
    full: 'Outs',
    category: 'Theory',
    definition: 'Cards remaining in the deck that improve your hand to the likely winner. E.g., a flush draw has 9 outs, an open-ended straight draw has 8 outs. Use the Rule of 2 & 4 to convert outs to approximate equity.',
  },
  {
    term: 'Backdoor Draw',
    full: 'Backdoor Draw',
    category: 'Theory',
    definition: 'A draw needing both the turn and river to complete — e.g., two hearts in hand with one on the flop (needs runner-runner hearts). Worth roughly 1-2 extra outs. Backdoor equity adds up and makes borderline hands playable.',
  },
  {
    term: 'Combo Draw',
    full: 'Combo Draw',
    category: 'Theory',
    definition: 'A hand with multiple draws simultaneously — e.g., a flush draw plus an open-ended straight draw (15 outs, ~54% equity). Combo draws are the strongest drawing hands, often equity favorites over made hands. Strong semi-bluff candidates.',
  },
  {
    term: 'Gutshot',
    full: 'Gutshot Straight Draw',
    category: 'Theory',
    definition: 'A straight draw where only one rank completes it (4 outs) — e.g., holding 9-7 on a T-8-2 board (only a 6 makes the straight). Half the outs of an open-ended straight draw. Can be a profitable bluff on the right board.',
  },
  {
    term: 'Air',
    full: 'Air / No Showdown Value',
    category: 'Theory',
    definition: 'A hand with zero chance of winning at showdown — no pair, no draw, nothing. Air is the ideal bluffing hand in GTO because you lose nothing by betting (you\'d lose anyway if you checked). Always prefer bluffing with air over bluffing with marginal made hands.',
  },
  {
    term: 'Showdown Value',
    full: 'Showdown Value',
    category: 'Theory',
    definition: 'How likely a hand is to win if both players check to showdown. Hands with showdown value (e.g., second pair) should generally check and call, not bet — betting turns them into a bluff. Hands without showdown value are better bluff candidates.',
  },
  {
    term: 'Capped Range',
    full: 'Capped Range',
    category: 'Theory',
    definition: 'A range limited in strength by prior actions. E.g., if a player just calls preflop and checks the flop, their range is "capped" — they probably don\'t have AA, KK, or sets. Capped ranges are vulnerable to large bets and bluffs.',
  },
  {
    term: 'Uncapped Range',
    full: 'Uncapped Range',
    category: 'Theory',
    definition: 'A range that can contain the full spectrum of hands from nuts to air. The preflop aggressor typically has an uncapped range. Uncapped ranges can make overbets and polarized bets because they credibly represent the strongest hands.',
  },
  {
    term: 'Pot-Committed',
    full: 'Pot-Committed',
    category: 'Theory',
    definition: 'When your remaining stack is so small relative to the pot that folding is mathematically incorrect even with marginal hands. Generally occurs at SPR < 2. Once pot-committed, getting the last chips in is usually correct.',
  },
  {
    term: 'Frequency',
    full: 'Betting Frequency',
    category: 'Theory',
    definition: 'How often you should take a specific action with your range — e.g., "c-bet 70% of range" means betting 70% of the hands you could hold. High frequency = small sizing; low frequency = large sizing. Frequency and sizing are inversely related in GTO.',
  },
  {
    term: 'Line',
    full: 'Betting Line',
    category: 'Theory',
    definition: 'The sequence of actions across all streets — e.g., "raise preflop, c-bet flop, check turn, bet river." Your line tells a story. For bluffs to work, your line must be consistent with the value hands you\'re representing.',
  },
  {
    term: 'Protection',
    full: 'Protection / Range Protection',
    category: 'Theory',
    definition: 'Betting a wider range to prevent opponents from freely seeing cards and improving. Also, having strong hands in your checking range so opponents can\'t profitably bet every time you check. Both meanings are critical to GTO play.',
  },
  {
    term: 'Reverse Implied Odds',
    full: 'Reverse Implied Odds',
    category: 'Theory',
    definition: 'The expected chips you lose on future streets when you make your hand but it\'s second-best. E.g., completing a non-nut flush and facing a large bet — you might pay off the nut flush. Hands with reverse implied odds (like dominated draws) should be played cautiously.',
  },
  {
    term: 'Buy-in',
    full: 'Buy-in',
    category: 'Theory',
    definition: 'The amount of money you bring to a cash game table or pay to enter a tournament. In cash games, the standard buy-in is 100 big blinds (100 BB). Stakes are expressed as small blind/big blind — so at $1/$2, one buy-in is $200 (100 × $2). Common examples: $0.01/$0.02 (NL2) = $2 buy-in, $0.05/$0.10 (NL10) = $10, $0.25/$0.50 (NL50) = $50, $0.50/$1 (NL100) = $100, $1/$2 (NL200) = $200, $2/$5 (NL500) = $500, $5/$10 (NL1000) = $1,000. In tournaments, the buy-in is the fixed entry fee (e.g., a $50 MTT). Bankroll management is measured in buy-ins — e.g., "have 25 buy-ins for your stake."',
  },
  {
    term: 'Stakes',
    full: 'Stake Level',
    category: 'Theory',
    definition: 'The blind level of a cash game, written as small blind/big blind (e.g., $1/$2). The "NL" shorthand refers to the buy-in in dollars: NL200 means $200 max buy-in, which is the $1/$2 game (100 BB × $2). Online stakes are typically labeled by buy-in (NL2, NL10, NL50, NL100, NL200, NL500, NL1000). Live games are labeled by blinds ($1/$2, $2/$5, $5/$10). Moving up in stakes requires a larger bankroll and usually better skills to beat tougher competition.',
  },
];

// Quick lookup by term string for the tooltip system
export const glossaryByTerm = Object.fromEntries(
  glossary.map(g => [g.term, g])
);

export const categories = ['All', ...new Set(glossary.map(g => g.category))];
