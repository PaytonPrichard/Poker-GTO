// ─────────────────────────────────────────────────────────────────────────────
// Bluffing & Player Profiling — GTO reference data
// ─────────────────────────────────────────────────────────────────────────────

// ── When to bluff: conditions that make bluffs profitable ───────────────────
export const bluffConditions = [
  {
    factor:  'You hold blockers to villain\'s value range',
    impact:  'high',
    why:     'Holding a card that removes strong combos from villain\'s range (e.g. A♠ on a three-spade board) means they are less likely to have the nuts and more likely to fold.',
    example: 'You hold A♠ 7♦ on K♠ 9♠ 4♠ 2♣ 3♦. You block the nut flush — villain can\'t have A♠x♠. Great river bluff candidate.',
  },
  {
    factor:  'Board texture completes obvious draws',
    impact:  'high',
    why:     'When the river completes a flush or straight, you can credibly represent it. Villain must respect that you could have the made hand.',
    example: 'Board: J♥ T♥ 4♠ 2♣ 8♥. The river flush completes. Betting large credibly reps a flush, even if you only have a busted straight draw.',
  },
  {
    factor:  'You are in position (IP)',
    impact:  'high',
    why:     'IP bluffs are more credible because you can react to checks (weakness signals). OOP bluffs require stronger hand selection since you act first.',
    example: 'BTN vs BB: villain checks the river after check-calling flop and turn. Their capped range makes your IP bluff highly profitable.',
  },
  {
    factor:  'Opponent has a capped range',
    impact:  'high',
    why:     'When villain\'s prior actions limit the strength of their range (e.g. they flatted preflop, checked flop), they are unlikely to have the nuts and must fold at a higher frequency.',
    example: 'Villain cold-called a 3-bet preflop and check-called two streets. They likely have a medium-strength hand — a large river bet applies maximum pressure.',
  },
  {
    factor:  'Few opponents (heads-up preferred)',
    impact:  'medium',
    why:     'Each additional player reduces bluff success rate multiplicatively. A 50% HU bluff drops to ~25% vs two players. Avoid bluffing into multiple opponents.',
    example: 'HU pot on the river: one player to get through. Bluffing is viable. 3-way pot: almost never bluff unless you have strong blockers.',
  },
  {
    factor:  'Credible story / line makes sense',
    impact:  'medium',
    why:     'Your line (preflop, flop, turn, river actions) must tell a consistent story. If your bluff doesn\'t represent a plausible hand, strong players won\'t fold.',
    example: 'You 3-bet preflop, c-bet a Q-high flop, barrel the turn, then bomb the river when a K hits. This reps AK/KQ perfectly.',
  },
  {
    factor:  'Stack depth allows fold pressure',
    impact:  'medium',
    why:     'Deeper stacks allow larger river bets that create more fold pressure. With shallow stacks, villain is often pot-committed and won\'t fold.',
    example: 'With 100bb effective, a pot-sized river bet forces villain to risk their remaining stack. With 30bb effective, they may call off with any pair.',
  },
  {
    factor:  'Your hand has no showdown value',
    impact:  'low',
    why:     'GTO prefers bluffing with hands that have zero showdown value (can\'t win by checking). Hands with marginal showdown value are better used as bluff-catchers.',
    example: 'Busted flush draw (missed) = perfect bluff candidate. Third pair = poor bluff candidate because it can win at showdown by checking.',
  },
];

// ── Blocker theory: which cards make good bluffs ────────────────────────────
export const blockerScenarios = [
  {
    scenario:   'Nut flush blocker on a flush-completing river',
    blocker:    'A♠ (when board has 3+ spades)',
    effect:     'Removes A♠x♠ (nut flush) from villain\'s range',
    bluffQuality: 'excellent',
    detail:     'Holding the ace of the flush suit means villain cannot have the nuts. They hold at best the second-nut flush, which folds at a high frequency to large bets. This is the single most valuable blocker in poker.',
  },
  {
    scenario:   'Straight blocker on a straight-completing board',
    blocker:    'Key connecting cards (e.g. T on 789x board)',
    effect:     'Removes many straight combos from villain\'s range',
    bluffQuality: 'good',
    detail:     'If you hold cards that villain needs for a straight, they are less likely to call. For example, holding JT on a Q-9-8-x-x board blocks JT straights and some QJ combos.',
  },
  {
    scenario:   'Top pair blocker on a paired board',
    blocker:    'One card matching the board pair (e.g. K on K-K-7 board)',
    effect:     'Removes trips/quads from villain\'s range',
    bluffQuality: 'good',
    detail:     'Holding one of the paired board cards means villain is far less likely to have trips. Your bluff on a paired board with this blocker is more credible since villain mostly holds weak hands.',
  },
  {
    scenario:   'Set blocker when representing an overpair',
    blocker:    'One card of the top pair (e.g. Q on Q-7-3 board)',
    effect:     'Reduces villain\'s QQ/QJ/QT combos',
    bluffQuality: 'moderate',
    detail:     'Having a Q when the board is Q-high means villain has fewer top pair combos. However, they still have many other hands, so this blocker alone is not as powerful as flush/straight blockers.',
  },
  {
    scenario:   'Unblocker — you DON\'T block villain\'s folding range',
    blocker:    'Low cards unrelated to the board',
    effect:     'Preserves villain\'s weak hands (the ones that fold)',
    bluffQuality: 'important concept',
    detail:     'Equally important to blocking value hands is NOT blocking villain\'s folding range. If you hold cards that block missed draws (hands villain would fold), your bluff becomes less effective because you are removing the exact hands you want villain to have.',
  },
  {
    scenario:   'Double blocker to two pair / sets',
    blocker:    'Two of the board cards (e.g. J+T on J-T-4 board)',
    effect:     'Massively reduces strong combos',
    bluffQuality: 'excellent',
    detail:     'When you hold two cards that match the board (but didn\'t make a strong hand yourself), villain\'s set and two pair combos are dramatically reduced. This makes your bluff extremely effective — their range is heavily weighted toward draws and weak pairs.',
  },
];

// ── Player profiling: types and how to adjust bluffing ──────────────────────
export const playerProfiles = [
  {
    type:    'Nit / Rock',
    vpip:    '< 15%',
    pfr:    '< 12%',
    traits:  'Plays very few hands. Only enters with premium holdings. Folds to aggression unless holding the nuts.',
    bluffAdj: 'Bluff MORE — they fold too often',
    detail:  'Nits are the most profitable players to bluff. They over-fold on every street. A single barrel on a scary board is often enough. Don\'t triple-barrel bluff — if they call two streets, they have it.',
    keyStat: '3-bet fold: > 70%',
    tells:   'Limp-folds frequently, never check-raises without the nuts, tank-folds on rivers.',
  },
  {
    type:    'TAG (Tight-Aggressive)',
    vpip:    '18–24%',
    pfr:    '15–22%',
    traits:  'Solid preflop ranges. Bets for value, makes disciplined folds. Hard to extract value from unless you have a strong hand.',
    bluffAdj: 'Bluff selectively — they respect your bets but also hero-call',
    detail:  'TAGs respect aggression but also make hero calls with the right hand. Bluff on boards that favor your range and with good blockers. Avoid bluffing rivers without a clear story — they\'ll look you up with middle pair if your line doesn\'t make sense.',
    keyStat: 'Fold to c-bet: 45–55%',
    tells:   'Consistent bet sizing, uses position well, rarely plays out of line.',
  },
  {
    type:    'LAG (Loose-Aggressive)',
    vpip:    '28–35%',
    pfr:    '22–30%',
    traits:  'Wide ranges, lots of 3-bets and aggression. Puts pressure on opponents. Can have anything.',
    bluffAdj: 'Bluff LESS — they call and re-bluff wide',
    detail:  'LAGs have wide calling ranges and re-raise bluff frequently. Don\'t bluff into them without strong blockers. Instead, trap them with strong hands — let them bluff into you. Value-bet thinner and check-raise their aggression.',
    keyStat: 'Aggression factor: > 3.0',
    tells:   'Overbets, 3-bets light, barrels multiple streets, rarely checks back strong hands.',
  },
  {
    type:    'Calling Station',
    vpip:    '35–50%',
    pfr:    '< 15%',
    traits:  'Calls with nearly anything. Rarely raises. Won\'t fold pairs, draws, or even ace-high on the river.',
    bluffAdj: 'NEVER bluff — value-bet relentlessly',
    detail:  'Calling stations are the #1 mistake-target in poker — but NOT for bluffs. They simply don\'t fold. The adjustment is to value-bet much thinner (top pair weak kicker is a strong value bet) and never bluff any street. Every bluff chip is -EV against this player.',
    keyStat: 'Fold to river bet: < 30%',
    tells:   'Calls every street then shows third pair. Never raises without the absolute nuts.',
  },
  {
    type:    'Maniac',
    vpip:    '> 50%',
    pfr:    '> 30%',
    traits:  'Plays nearly every hand. Raises and re-raises with trash. Extremely unpredictable but hemorrhages money long-term.',
    bluffAdj: 'NEVER bluff — let them hang themselves',
    detail:  'Maniacs bluff so much that your job is simply to call them down lighter. Tighten your preflop range slightly (so you have strong hands) then let them bet into you. Check-call with medium strength hands. They\'ll bluff off their stack if you give them rope.',
    keyStat: 'WTSD (went to showdown): > 35%',
    tells:   'Overbets randomly, min-raises, plays every hand from every position.',
  },
  {
    type:    'Weak-Tight (Scared Money)',
    vpip:    '18–25%',
    pfr:    '12–18%',
    traits:  'Plays a reasonable number of hands but folds under pressure. Hates big pots without the nuts. Often found at stakes above their comfort level.',
    bluffAdj: 'Bluff MORE — especially on scary boards and rivers',
    detail:  'Weak-tight players have a fold button that\'s too big. They\'ll fold overpairs on scary rivers, lay down two pair when a flush completes, and never call a 3-bet without QQ+. Exploit by applying consistent pressure with medium-sized bets across all streets.',
    keyStat: 'Fold to 3-bet: > 65%',
    tells:   'Long pauses before folding, checks back decent hands on the river "to be safe," rarely calls large bets.',
  },
];

// ── Common bluffing spots with examples ─────────────────────────────────────
export const bluffSpots = [
  {
    spot:       'Missed flush draw — river bluff',
    street:     'River',
    position:   'IP or OOP',
    setup:      'You called or bet the flop and turn with a flush draw that bricked the river.',
    action:     'Bet 66–100% pot',
    frequency:  'High (with nut flush blocker)',
    blockers:   'A♠ or K♠ of the missed suit removes villain\'s nut flush — they fold second-best made hands at a high rate.',
    avoid:      'Don\'t bluff if you block villain\'s folding range (e.g. holding suited connectors that missed — villain would fold those too).',
    profiling:  'Excellent vs nits/weak-tight. Avoid vs calling stations.',
  },
  {
    spot:       'Straight-completing river overbet',
    street:     'River',
    position:   'IP (preferred)',
    setup:      'Board was draw-heavy and the river completes a straight. You have a busted draw or air.',
    action:     'Overbet 1.2–1.5x pot',
    frequency:  'Medium (when line is credible)',
    blockers:   'Holding key straight cards (e.g. the T when 6-7-8-9 is on board) blocks villain from having the nuts.',
    avoid:      'Don\'t overbet bluff if you have showdown value (e.g. two pair that might be good).',
    profiling:  'Strong vs TAGs who respect overbets. Weak vs calling stations and maniacs.',
  },
  {
    spot:       'Flop check-raise bluff (semi-bluff)',
    street:     'Flop',
    position:   'OOP (usually BB)',
    setup:      'Villain c-bets a flop where you have a draw + backdoor equity. You check-raise.',
    action:     'Check-raise to 3x villain\'s c-bet',
    frequency:  'Medium (balanced with value check-raises)',
    blockers:   'Not critical on flop — draw equity and fold equity are the main drivers.',
    avoid:      'Don\'t check-raise bluff on boards that heavily favor the preflop raiser (A-K-Q, etc.).',
    profiling:  'Best vs players with high c-bet and high fold-to-raise. Terrible vs calling stations.',
  },
  {
    spot:       'Turn probe bet (stab after checked-through flop)',
    street:     'Turn',
    position:   'OOP',
    setup:      'Villain had the opportunity to c-bet the flop but checked back. Turn is a scare card.',
    action:     'Bet 50–66% pot',
    frequency:  'High (villain\'s range is capped by not c-betting)',
    blockers:   'Helpful if you block overcards that hit the turn (e.g. hold a K when K turns).',
    avoid:      'Don\'t probe if villain checks back strong hands frequently (trapping tendencies).',
    profiling:  'Very effective vs straightforward players. Less effective vs LAGs who check-back with traps.',
  },
  {
    spot:       'Triple barrel on a brick runout',
    street:     'River',
    position:   'IP',
    setup:      'You raised preflop, c-bet flop, barreled turn, and the river is a low blank that changes nothing.',
    action:     'Bet 66–75% pot',
    frequency:  'Low (very selective — need blockers + reads)',
    blockers:   'Critical — need Ax or Kx blockers to villain\'s calling range. Without blockers, triple-barrel bluffs are -EV.',
    avoid:      'Don\'t triple-barrel without a clear plan from the flop. Your line must tell a coherent story.',
    profiling:  'Only vs nits and weak-tight. TAGs will hero-call rivers. Stations will snap-call.',
  },
  {
    spot:       'Squeeze bluff preflop',
    street:     'Preflop',
    position:   'CO/BTN/SB (vs open + cold call)',
    setup:      'An early position player opens and a player cold-calls. You 3-bet (squeeze) with air.',
    action:     '3-bet to 3.5–4x the open',
    frequency:  'Medium (balanced with value 3-bets)',
    blockers:   'Ax hands block AA/AK. Kx hands block KK/AK. Best squeeze bluffs: A5s, A4s, KJs type hands.',
    avoid:      'Don\'t squeeze into tight openers or players who never fold to 3-bets. Don\'t squeeze with hands that play well postflop (suited connectors prefer to call).',
    profiling:  'Best vs players with low 3-bet defense. Avoid vs LAGs and maniacs who 4-bet light.',
  },
];

// ── Key bluffing principles ─────────────────────────────────────────────────
export const bluffPrinciples = [
  {
    title: 'GTO bluffing ratio: ~2 value bets to 1 bluff',
    body:  'In a balanced strategy, your river betting range should contain roughly 2 value combos for every 1 bluff combo (when using a pot-sized bet). This ratio ensures you are unexploitable — villain cannot profit by always calling or always folding against you.',
  },
  {
    title: 'Blockers > hand strength for bluff selection',
    body:  'When choosing which hands to bluff with, the cards you hold matter more than your hand\'s absolute strength. A hand with zero showdown value but excellent blockers (e.g. A♠5♠ on a three-spade board that missed) is a better bluff than a weak pair that blocks nothing.',
  },
  {
    title: 'Player profiling overrides GTO bluff frequencies',
    body:  'Against a calling station, your GTO bluffing frequency of ~33% becomes 0%. Against a nit, it can jump to 50%+. Always adjust your bluff frequency based on the specific opponent. GTO is the baseline — exploitative adjustments maximize your edge.',
  },
  {
    title: 'Bluff credibility comes from your whole line',
    body:  'A bluff is only as good as the story it tells. If you check the flop, check the turn, and then bomb the river, your line is inconsistent with a strong hand. Plan your bluffs from the start — decide on the flop whether you\'ll barrel turn and river.',
  },
  {
    title: 'The earlier the street, the wider you can bluff',
    body:  'Flop bluffs (semi-bluffs with draws) are far more common and profitable than river bluffs, because you still have equity to improve. By the river, your bluff has zero equity if called — it must rely entirely on fold equity.',
  },
  {
    title: 'Fold equity is not constant — it\'s opponent-dependent',
    body:  'Fold equity doesn\'t exist in a vacuum. The same river bluff might have 80% fold equity vs a nit and 10% vs a calling station. Before bluffing, ask: "Will THIS specific player fold THIS specific hand on THIS board?" Not just "Is this a good spot to bluff?"',
  },
];
