// ─────────────────────────────────────────────────────────────────────────────
// Position Strategy — GTO reference data
// ─────────────────────────────────────────────────────────────────────────────

// ── Tab 1: Core Concepts ─────────────────────────────────────────────────────
export const positionBasics = [
  {
    title: 'Information Advantage',
    body:  'Acting last is the single most valuable structural advantage in poker. When you are in position, you see every opponent\'s action — check, bet, raise — before you decide. This information lets you narrow their range more precisely on every street. Out of position, you must act first with less data, leading to more frequent and costlier mistakes. The information gap compounds across multiple streets, making IP edges grow as hands progress to the turn and river.',
  },
  {
    title: 'Pot Control',
    body:  'In position, you have the final say on whether the pot grows or stays small on each street. If you hold a medium-strength hand, you can check back the flop or turn to keep the pot manageable and reach a cheap showdown. Out of position, you are forced to check and hope your opponent checks behind, or bet and risk facing a raise. This asymmetry means IP players lose less with marginal hands and can more efficiently build pots with strong ones.',
  },
  {
    title: 'Realizing Equity',
    body:  'Equity realization is the percentage of your raw equity you actually capture as profit. In position, you realize significantly more of your equity — often 10-20% more than the same hand OOP. A hand like KTs might have 48% raw equity against a villain\'s range, but IP it realizes ~54% (over-realizing) while OOP it realizes only ~42% (under-realizing). This is why hands that look close in equity calculators play very differently based on position.',
  },
  {
    title: 'Wider Profitable Ranges',
    body:  'Because of the information, pot control, and equity realization advantages, you can profitably enter pots with a much wider range of hands in position. The button opens roughly 40-48% of hands in 6-max cash games, while UTG opens only 15-18%. This is not just about stealing blinds — even when called, IP hands show a profit with marginal holdings that would lose money from early position. Suited connectors, suited gappers, and broadway hands gain enormous value in position.',
  },
  {
    title: 'Bluffing Efficiency',
    body:  'Bluffs succeed more often in position because you have better information about your opponent\'s range and can choose optimal bluffing spots. When an OOP player checks to you, that check reveals weakness — making your bluff more effective. You can also credibly represent a wider range of strong hands because you could have raised or called preflop with many holdings. Out of position, your bluffs face the risk of being called or raised, and you must commit to multi-street bluffs without seeing your opponent\'s reactions first.',
  },
  {
    title: 'The Fundamental Asymmetry',
    body:  'GTO solvers consistently show that with identical hand strengths, the in-position player wins more and loses less than the out-of-position player. This fundamental asymmetry means IP players can play more aggressively (betting thinner for value, bluffing more frequently) while also losing less when behind. Over a large sample, a competent player will show a significantly higher winrate from the button than from any other position, purely due to this structural edge. The gap between IP and OOP winrates is one of the largest factors in long-term profitability.',
  },
];

// ── Tab 2: EV by Seat ────────────────────────────────────────────────────────
export const evBySeat = [
  {
    position:    'UTG',
    bbPer100:    '-5 to -2',
    vpip:        '18%',
    pfr:         '15%',
    description: 'Under the gun is the tightest position at the table. You act first preflop and will be out of position against most callers postflop. Only open premium hands and strong broadways — your range needs to be robust because you face 5 players behind who can 3-bet. Expect this seat to be a small net loser even with perfect play, since you pay blinds and rarely steal them.',
  },
  {
    position:    'MP (HJ)',
    bbPer100:    '-2 to 0',
    vpip:        '21%',
    pfr:         '18%',
    description: 'The hijack is slightly looser than UTG but still an early-ish position. You have one fewer player behind to worry about, so you can add suited broadways and smaller pairs. This seat typically breaks even or loses marginally. Your positional advantage is limited since the CO, BTN, and blinds all act after you preflop, and you will often be OOP postflop.',
  },
  {
    position:    'CO',
    bbPer100:    '+2 to +5',
    vpip:        '27%',
    pfr:         '23%',
    description: 'The cutoff is the first clearly profitable position. Only two players remain behind you preflop, and when the button folds, you gain position for the rest of the hand against the blinds. Open a solid range of suited hands, broadways, and pairs. The CO is an excellent seat for 3-bet bluffing against late-position opens and for stealing blinds when the button is tight.',
  },
  {
    position:    'BTN',
    bbPer100:    '+8 to +15',
    vpip:        '40%',
    pfr:         '32%',
    description: 'The button is the most profitable seat in poker. You are guaranteed to act last on every postflop street when the blinds call. Open very wide — suited connectors, suited gappers, any broadway, and nearly all pairs are profitable here. The majority of your lifetime winnings will come from the button. Aggressive stealing and well-timed c-bets exploit your permanent positional advantage.',
  },
  {
    position:    'SB',
    bbPer100:    '-15 to -10',
    vpip:        '28%',
    pfr:         '22%',
    description: 'The small blind is the worst position at the table. You pay half a blind to enter and are out of position against everyone postflop, including the big blind. GTO strategy from the SB against an unopened pot is to either raise (typically 3x) or fold — limping is generally suboptimal since you are OOP with a partial investment. When facing a raise, 3-bet or fold is standard; calling creates a capped, OOP range.',
  },
  {
    position:    'BB',
    bbPer100:    '-25 to -18',
    vpip:        '35%',
    pfr:         '12%',
    description: 'The big blind loses the most per hand in absolute terms because you post a full blind every orbit. However, you get a discount on calls (you already have 1 BB invested), so your defending range is very wide — often 35%+ of hands against a BTN open. Your PFR is low because you mostly defend by calling rather than 3-betting. Focus on minimizing losses by defending correctly and playing solid OOP postflop poker rather than trying to "win" from this seat.',
  },
];

// ── Tab 3: Positional Plays ──────────────────────────────────────────────────
export const positionalPlays = [
  {
    title: 'Floating the Flop',
    body:  'Floating means calling a flop bet in position with the intention of taking the pot away on the turn, regardless of your hand strength. When a preflop raiser c-bets the flop and checks the turn (as they often do with air or marginal hands), you bet and take down the pot. Ideal floating hands have some backdoor equity — backdoor flush draws, overcards, or gutshots — so you have fallback value if called. Float against players who c-bet too frequently (60%+) and on boards that are unlikely to improve their range (e.g., low, disconnected boards against a late-position opener).',
  },
  {
    title: 'Delayed C-Bet',
    body:  'Instead of c-betting the flop as the preflop raiser, check back in position on the flop and bet the turn. This line accomplishes several things: it disguises your hand strength (opponents expect the flop c-bet with strong hands), it controls pot size on the flop, and it allows you to see the turn card before committing chips. Delayed c-bets are particularly effective on boards that favor your range but not necessarily your specific hand, or when the turn card is a scare card for your opponent. Use this play with medium-strength hands that benefit from pot control and strong hands you want to underrepresent.',
  },
  {
    title: 'Stealing Blinds',
    body:  'Blind stealing is the act of raising from late position (CO, BTN, or SB) with the primary goal of winning the blinds and antes uncontested. At a standard 6-max table, the blinds post 1.5 BB every orbit — stealing them even a few times per orbit significantly boosts your winrate. From the BTN, you can profitably open 40-50% of hands against tight blinds. The key is adjusting steal frequency to your opponents: steal relentlessly against tight or passive blinds, and tighten up against aggressive 3-bettors. Even when called, you have position for the rest of the hand.',
  },
  {
    title: '3-Bet Bluffing from CO/BTN',
    body:  'Three-bet bluffing from the cutoff or button is one of the most effective positional plays. When an early-position player opens, they often open-fold a significant portion of their range to a 3-bet. When called, you have position and the initiative. Ideal 3-bet bluff hands are suited aces (A2s-A5s) because they block strong aces, have nut flush potential, and can make straights. Suited connectors like 76s-T9s also work well as they flop well but are not strong enough to flat call. Size your 3-bets to roughly 3x the open from IP.',
  },
  {
    title: 'Squeezing',
    body:  'A squeeze play is a preflop 3-bet made when there is an open-raise and one or more callers. The original raiser has a capped range (they did not 4-bet), and the caller(s) have weak-to-medium ranges (they did not 3-bet). This dead money plus the two weak-ish ranges makes squeezing very profitable. Squeeze to roughly 4x the open plus 1x per caller. From the BTN, you squeeze with position advantage and can include more bluffs. From the blinds, your squeezing range should be tighter and more value-heavy since you will be OOP postflop.',
  },
  {
    title: 'Check-Back for Pot Control',
    body:  'When you hold a medium-strength hand in position — such as second pair, weak top pair, or ace-high — checking back on the flop or turn keeps the pot small and lets you reach a cheap showdown. This play is critical because betting turns medium hands into a bluff-catcher if raised, while checking preserves your ability to win at showdown without inflating the pot. Common spots: checking back top pair weak kicker on a wet board, checking back middle pair on the flop, or checking the turn after c-betting the flop with a marginal hand. The key is to mix in some strong hands too, so your check-back range is not entirely capped.',
  },
  {
    title: 'Positional Isolation Raises',
    body:  'When a weak player limps into the pot, raising from a later position to isolate them heads-up is a powerful positional play. You raise to thin the field, build a pot with a positional advantage, and target the weakest player at the table. Size your isolation raise to 3-4x the big blind plus 1x per limper. Your isolating range should be wider than your standard opening range from that position because you are specifically targeting a weak opponent. Hands like KTo, Q9s, and J8s — too weak to open from EP — become profitable isolation raises from the CO or BTN against a fish who limped.',
  },
];

// ── Tab 4: IP vs OOP Strategy ────────────────────────────────────────────────
export const exploitingPosition = [
  {
    situation:     'Facing a C-Bet',
    inPosition:    'Call with a wide range of draws, backdoor equity, and medium-strength hands. You can float the flop cheaply knowing you will act last on the turn and can take the pot away if villain checks. Raise selectively with strong hands and some semi-bluffs to build the pot or deny equity.',
    outOfPosition: 'Check-raise with your strongest hands and best semi-bluffs (combo draws, strong flush draws) to deny the positional advantage. Check-call with medium-strength hands that have decent equity but cannot withstand a raise. Your check-raise range needs to be polarized — strong value and strong draws — because calling OOP creates difficult turn and river decisions.',
    notes:         'IP players can defend wider against c-bets (~55-60% of hands) compared to OOP (~45-50%) because position compensates for marginal hand strength.',
  },
  {
    situation:     'Holding a Draw',
    inPosition:    'You have the luxury of seeing your opponent\'s action first. If they check, you can take a free card or semi-bluff. If they bet, you can call and re-evaluate on the turn with full information. Your draws realize more equity because you control the price you pay. Strong draws can raise for value; weaker draws call and rely on implied odds.',
    outOfPosition: 'Draws are significantly harder to play OOP because you must act first. Leading out reveals your hand and invites raises. Check-calling is the standard line with moderate draws, but you lose the ability to take free cards. With very strong draws (12+ outs), check-raising is often correct to deny your opponent a free card and build a pot while you have maximum equity.',
    notes:         'GTO solvers show that draws realize roughly 85-95% of their raw equity in position but only 70-80% out of position. This is why suited connectors are much more profitable from the BTN than from UTG.',
  },
  {
    situation:     'Medium-Strength Hand',
    inPosition:    'Check back for pot control. Medium hands (second pair, weak top pair, ace-high on some boards) want to reach showdown without inflating the pot. By checking back on one or more streets, you keep the pot small and avoid getting blown off your hand by a check-raise. Bet thinly on the river when checked to, but otherwise play passively to realize your showdown value.',
    outOfPosition: 'These hands are the hardest to play OOP. You cannot check back to control the pot — if you check, your opponent may bet and put you in a tough spot. Check-calling is the default line, but it caps your range and leads to multi-street guessing games. Avoid donk-betting medium hands as it bloats the pot unnecessarily. Accept that medium hands will lose more value OOP than IP.',
    notes:         'The equity realization gap is largest for medium-strength hands. Premium hands win big either way, and weak hands fold — but medium hands suffer most from the positional disadvantage.',
  },
  {
    situation:     'Strong Hand (Slow-Play Considerations)',
    inPosition:    'You can afford to slow-play more often in position because you get to close the action. If your opponent checks, you can check back the flop to let them catch up, then bet turn and river for value. There is less risk of giving free cards because you control whether a street gets checked through. Slow-playing IP on dry boards with sets and overpairs is standard; on wet boards, bet for value and protection.',
    outOfPosition: 'Slow-playing OOP is riskier because you cannot guarantee your opponent will bet if you check. If you check a strong hand and they check behind, you lose a street of value and give a free card. OOP, the standard play with strong hands is to check-raise the flop or lead the turn after a flop check-through. On wet boards, always fast-play strong hands OOP to deny equity and build the pot before scare cards arrive.',
    notes:         'Solvers slow-play ~15-25% of very strong hands on the flop IP but only ~5-10% OOP. The risk of lost value and free cards makes OOP slow-plays significantly less attractive.',
  },
  {
    situation:     'River Bluff-Catcher',
    inPosition:    'You see the opponent\'s river action before deciding. If they check, you can check back and go to showdown with your bluff-catcher, avoiding a river bluff into a strong hand. If they bet, you make a calling decision with full information about their line across all streets. You can also turn your bluff-catcher into a bluff on the river if checked to, though this should be done at a balanced frequency.',
    outOfPosition: 'OOP with a bluff-catcher on the river, you face a fundamentally harder decision. If you check, your opponent can bet as a bluff or for value, and you must decide without the benefit of seeing their check. If you lead out (donk-bet), you turn a showdown hand into a bluff and lose the ability to catch bluffs. The GTO-correct play is usually to check-call at a frequency based on the pot odds your opponent is offering and their betting frequency.',
    notes:         'IP bluff-catchers realize significantly more value because they can avoid paying off value bets by checking back. OOP bluff-catchers must pay off at a mathematically correct frequency to prevent exploitation.',
  },
  {
    situation:     'Multi-Street Barreling',
    inPosition:    'Barreling multiple streets IP is powerful because you see your opponent\'s reaction to each bet before deciding to continue. If they call weakly (tank-call, then check the next street), you can fire again with confidence. You can also abandon the bluff on any street if their reaction suggests strength, limiting your losses. Select bluff candidates that pick up equity on the turn (backdoor draws completing, overcards) to give your barrels backup equity.',
    outOfPosition: 'Multi-street barreling OOP (donk-bet leading) is generally discouraged by GTO strategy because it commits chips without positional information. If you lead the flop and turn, your opponent can raise at any point and put you in a difficult spot with your bluffs. OOP barreling works best as check-raise lines: check-raise the flop, then lead the turn and river. This line represents maximum strength and puts your opponent in tough spots, but it requires strong range construction to stay balanced.',
    notes:         'IP players barrel profitably on 2-3 streets roughly 30-40% more often than OOP players. The ability to abandon bluffs when facing resistance makes IP barreling far more capital-efficient.',
  },
];
