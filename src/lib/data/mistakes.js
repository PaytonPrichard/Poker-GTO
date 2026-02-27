// ─────────────────────────────────────────────────────────────────────────────
// Common Mistakes & Leaks — GTO reference data
// ─────────────────────────────────────────────────────────────────────────────

// ── Preflop Leaks ─────────────────────────────────────────────────────────────
export const preflopLeaks = [
  {
    title:       'Playing Too Many Hands from Early Position',
    severity:    'high',
    description: 'Opening too wide from UTG/UTG+1 is one of the most costly preflop leaks. You are out of position against most of the table and face multiple players left to act who can wake up with premium hands. Playing hands like KTo or Q9s from EP leads to difficult, dominated postflop situations.',
    fix:         'Stick to a tight EP opening range of roughly 12-15% of hands. If you would not feel comfortable facing a 3-bet with the hand, do not open it from early position.',
  },
  {
    title:       'Cold-Calling Too Wide vs 3-Bets',
    severity:    'high',
    description: 'Calling a 3-bet with marginal hands like KJo, QTs, or small pocket pairs out of position is a major chip drain. You are building a big pot with a capped range and positional disadvantage. Most players vastly overestimate their implied odds in 3-bet pots.',
    fix:         'Against a 3-bet, your continuing range should be tight — premium pairs, AK/AQs, and strong suited broadways. Fold everything else unless you are in position with a deep effective stack.',
  },
  {
    title:       'Not 3-Betting Enough for Value',
    severity:    'medium',
    description: 'Many players only 3-bet with AA/KK/QQ and occasionally AK, turning their 3-bet range into a transparent value-only range. This makes them easy to play against because opponents can fold everything except their strongest hands and never pay off the premiums.',
    fix:         'Build a balanced 3-bet range that includes value hands (QQ+, AK, AQs) and bluffs (suited aces like A5s-A2s, suited connectors from position). Aim for a 3-bet frequency of 7-10%.',
  },
  {
    title:       'Limping Instead of Raising',
    severity:    'high',
    description: 'Open-limping in an unopened pot is almost always a mistake in modern poker. It sacrifices initiative, invites multiway pots where equities run closer together, and signals weakness to observant opponents. You cannot win the blinds preflop by limping.',
    fix:         'Adopt a raise-or-fold preflop strategy. If a hand is good enough to play, it is good enough to raise. The only exception is completing the SB in a limped pot at very deep stacks.',
  },
  {
    title:       'Over-Folding in the Blinds',
    severity:    'medium',
    description: 'Folding too much from the blinds, especially the big blind, gives late-position players a license to steal with impunity. The BB already has money invested and is getting a discount to see the flop. Folding more than 60-65% of hands in the BB vs a BTN open is usually too tight.',
    fix:         'Defend your big blind wider against late-position opens — call with suited connectors, suited gappers, broadways, and pairs. Use 3-bets as bluffs from the SB/BB to reclaim fold equity.',
  },
  {
    title:       'Ignoring Stack Depth Adjustments',
    severity:    'medium',
    description: 'Playing the same preflop ranges at 30 BB and 150 BB is a significant leak. Implied odds, set-mining profitability, and suited connector value all depend heavily on effective stack depth. Speculative hands lose value as stacks get shallower because there is not enough behind to win when you hit.',
    fix:         'Tighten speculative hands (small pairs, suited connectors) when stacks are shallow. Widen premium hands and high-card holdings. Below 25 BB, shift toward a push/fold framework.',
  },
  {
    title:       'Playing the Same Ranges Regardless of Table Dynamics',
    severity:    'low',
    description: 'Pure GTO ranges assume competent, balanced opponents. In practice, table composition matters — a table with three tight nits and a maniac requires different adjustments than a table of solid regulars. Ignoring these dynamics leaves significant EV on the table.',
    fix:         'Observe player tendencies and adjust. Open wider when the blinds are tight, tighten up when aggressive players are behind you, and isolate weak players with wider value ranges.',
  },
  {
    title:       'Sizing Opens Inconsistently (Tells)',
    severity:    'medium',
    description: 'Raising 4x with premium hands and 2.5x with speculative hands is a classic sizing tell. Observant opponents will quickly exploit this by folding to large opens and 3-betting small opens. Inconsistent sizing leaks information about your hand strength before the flop is even dealt.',
    fix:         'Use a consistent open-raise size from each position regardless of your hand. A standard 2.2-2.5x open from all positions keeps your range balanced and denies opponents free information.',
  },
];

// ── Postflop Leaks ────────────────────────────────────────────────────────────
export const postflopLeaks = [
  {
    title:       'C-Betting Too Frequently on Bad Board Textures',
    severity:    'high',
    description: 'Many players automatically c-bet the flop without considering how the board connects with each player\'s range. Betting 80%+ of the time on boards like 8-7-6 suited or J-T-9 when your range is primarily high cards is a recipe for losing chips. Wet, connected boards favor the caller\'s range much more often than the preflop raiser.',
    fix:         'Check back more often on boards that favor your opponent\'s range (low connected, monotone). Reserve high c-bet frequencies for dry, ace-high or king-high boards where your range advantage is clear.',
  },
  {
    title:       'Not Value Betting Thin Enough on the River',
    severity:    'high',
    description: 'Many players check back marginal hands on the river that would actually profit from a bet. Hands like top pair with a medium kicker or second pair with a strong kicker often get called by worse. Checking back too often on the river leaves significant value on the table and lets opponents realize equity for free.',
    fix:         'Ask yourself: can a worse hand call? If yes, bet. Use a smaller sizing (25-40% pot) for thin value bets on the river to keep worse hands in and maximize long-run profit.',
  },
  {
    title:       'Calling Too Much vs River Bets',
    severity:    'medium',
    description: 'River calls are where most recreational players bleed chips. When an opponent fires a large river bet, their range is heavily polarized — they either have a strong hand or a bluff. Many players call with medium-strength hands that only beat bluffs and lose to everything else, failing to consider villain\'s actual range composition.',
    fix:         'On the river, think in terms of bluff-to-value ratios. Against a pot-sized bet, you need to be right ~33% of the time. If the opponent is unlikely to be bluffing at that frequency, fold your marginal hands.',
  },
  {
    title:       'Giving Up Too Easily on Turns After C-Betting Flop',
    severity:    'medium',
    description: 'Many players c-bet the flop and then check-fold the turn whenever they miss, effectively turning their entire continuation bet range into a one-and-done bluff. This is extremely exploitable — opponents learn to float the flop and then take the pot away on the turn. One-street aggression without follow-through wastes the chips invested on the flop.',
    fix:         'Plan your action for multiple streets before you bet. Fire a second barrel on turns that improve your range, give you equity (backdoor draws turning into draws), or are scare cards for your opponent\'s calling range.',
  },
  {
    title:       'Overplaying One-Pair Hands in Big Pots',
    severity:    'high',
    description: 'Top pair is a good hand, but it is rarely a hand that should play for stacks. When the pot balloons through multiple raises or large multi-street bets, one-pair hands are usually behind. Committing 100+ BB with top pair top kicker against heavy aggression is one of the most expensive leaks in the game.',
    fix:         'Be willing to fold strong one-pair hands when facing significant aggression, especially raises on the turn or river. Reserve stack-off ranges for two-pair or better unless you have strong reads.',
  },
  {
    title:       'Not Adjusting Bet Sizing to Board Texture',
    severity:    'medium',
    description: 'Using the same bet size on every board ignores the strategic information conveyed by board texture. A 66% pot c-bet on both A-K-2 rainbow and 9-8-7 two-tone is suboptimal. Different board textures call for different sizing strategies based on range advantage and equity distribution.',
    fix:         'Use smaller sizes (25-33% pot) on dry, high-card boards where you have a range advantage. Use larger sizes (66-75% pot) on wet, connected boards where you want to charge draws and deny equity.',
  },
  {
    title:       'Missing Check-Raise Opportunities',
    severity:    'low',
    description: 'Many players default to calling out of position when they flop strong hands, missing the chance to check-raise and build a larger pot. A passive approach with strong hands caps your range and lets aggressive opponents control the pot size. Check-raises also balance your checking range, making you harder to exploit.',
    fix:         'Include check-raises with both strong value hands and draws in your OOP defense. Aim to check-raise the flop roughly 8-12% of the time to keep opponents honest.',
  },
  {
    title:       'Failing to Account for Blockers When Bluffing',
    severity:    'medium',
    description: 'Choosing bluff candidates randomly instead of considering card removal effects is a subtle but meaningful leak. The best bluffs hold blockers to hands your opponent would continue with, and unblock hands they would fold. For example, bluffing with a hand that blocks the nut flush makes it less likely your opponent has the nuts.',
    fix:         'When selecting bluff combinations, prefer hands that block your opponent\'s strong holdings (top pair, sets, flushes) and unblock their folding range. Suited aces that block the nut flush draw are classic bluff candidates.',
  },
];

// ── Mental Game ───────────────────────────────────────────────────────────────
export const mentalGame = [
  {
    title: 'Tilt Recognition and Management',
    body:  'Tilt costs more money than any strategic leak because it degrades every decision you make simultaneously. Recognizing your personal tilt triggers — bad beats, slow play, condescending opponents — is the first step. The second step is having a predefined response plan: take a break, drop down in stakes, or quit the session entirely. There is no shame in leaving a game when you are not playing your best.',
  },
  {
    title: 'Results-Oriented Thinking (The Biggest Leak)',
    body:  'Judging the quality of a decision by its outcome is the most pervasive mental game leak. A correct fold that would have rivered a flush is still a correct fold. A bad call that gets lucky is still a bad call. Focus on process over results — evaluate whether you made the best decision with the information available, not whether the card that came helped you.',
  },
  {
    title: 'Handling Bad Beats and Coolers',
    body:  'Bad beats and coolers are mathematically guaranteed to happen. Getting all-in with AA vs KK and losing is not unlucky — it happens 18% of the time. Accepting variance as a core feature of poker, not a personal attack, is essential for longevity. If you cannot handle losing with the best hand, you cannot play enough hands for your edge to manifest.',
  },
  {
    title: 'Session Length and Fatigue Management',
    body:  'Decision quality degrades with fatigue, and poker is a game of marginal decisions. Playing a 12-hour session when your A-game lasted for the first 3 hours is actively destructive to your bankroll. Set session time limits, take regular breaks, and be honest with yourself about when your focus is slipping. The game will be there tomorrow.',
  },
  {
    title: 'Confidence vs Overconfidence',
    body:  'Confidence in your game plan and preparation is essential for executing a strategy without second-guessing every hand. Overconfidence — believing you are too good to lose, that you can outplay anyone postflop, or that you do not need to study — leads to complacency and stagnation. The best players maintain confidence in their process while remaining humble about their results.',
  },
  {
    title: 'The Importance of Study Away from the Table',
    body:  'Playing poker is not the same as studying poker. Table time develops intuition and reads, but deliberate off-table study with solvers, training videos, and hand review is what drives actual strategic improvement. Dedicate at least 1 hour of study for every 3-4 hours of play. Review your biggest pots, analyze spots where you felt uncertain, and compare your lines to solver outputs.',
  },
];

// ── Sizing Mistakes ───────────────────────────────────────────────────────────
export const sizingMistakes = [
  {
    title: 'Betting the Same Size with Entire Range (Exploitable)',
    body:  'Using one bet size for all hands on a given street makes your strategy transparent and exploitable. If you always bet 66% pot, opponents can construct a single defense strategy that works against your entire range. GTO solvers use multiple bet sizes — small bets with merged ranges and large bets with polarized ranges — to maximize EV and create harder decisions for opponents.',
  },
  {
    title: 'Min-Betting the River with Strong Hands',
    body:  'Betting the minimum on the river with a strong hand is one of the most common value-leaving mistakes. Players do this hoping to "get a call," but they sacrifice enormous value in the process. If an opponent is calling a min-bet with second pair, they are likely calling a half-pot bet too. Size your river value bets based on what your opponent\'s calling range can tolerate, not on fear of being folded on.',
  },
  {
    title: 'Overbetting Without Range Advantage',
    body:  'Overbets are powerful tools when you have a range advantage — meaning your range contains more nutted hands than your opponent\'s. However, overbetting on boards where your opponent\'s range is stronger or more condensed is lighting money on fire. For example, overbetting a 7-6-5 flop as the preflop raiser makes little sense because the caller\'s range connects far better with this texture.',
  },
  {
    title: 'Not Sizing Up with Draws on the Flop for Protection',
    body:  'When you hold a vulnerable made hand on a draw-heavy flop, betting small allows opponents to see turn cards cheaply. On boards with flush draws and straight draws, your value hands need to charge a meaningful price for opponents to continue. A 33% pot bet on a wet flop gives flush draws roughly the correct price to call, while a 66-75% pot bet forces them to pay a premium.',
  },
  {
    title: 'Using the Same 3-Bet Size IP and OOP',
    body:  'Position should influence your 3-bet sizing. When out of position, you want to build a bigger pot to compensate for the disadvantage of acting first on every postflop street. A standard approach is 3x the open raise when in position and 3.5-4x when out of position. Using the same size from both positions either under-sizes your OOP 3-bets or over-sizes your IP 3-bets.',
  },
  {
    title: 'Pot-Sized Bets on Dry Boards (Inefficient)',
    body:  'Dry, disconnected boards like K-7-2 rainbow heavily favor the preflop raiser\'s range. Because you have such a large range advantage, you can bet small (25-33% pot) with a high frequency and achieve the same result as a large bet. Pot-sized bets on dry boards risk more chips than necessary and allow opponents to play perfectly by folding all their air and continuing only with hands that have you beat.',
  },
  {
    title: 'Not Adjusting Sizing to Opponent Tendencies',
    body:  'Against a calling station, you should size up your value bets and reduce your bluff frequency — they are paying you off, so get maximum value. Against a tight, fold-happy player, use smaller bluff sizes to risk less while achieving the same fold equity. GTO sizing is a baseline, but exploitative adjustments to opponent tendencies are where the real profit lies in most player pools.',
  },
];
