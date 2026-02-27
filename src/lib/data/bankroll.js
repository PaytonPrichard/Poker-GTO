// ─────────────────────────────────────────────────────────────────────────────
// Bankroll Management — GTO reference data
// ─────────────────────────────────────────────────────────────────────────────

// ── Cash Game Bankroll Management ─────────────────────────────────────────────
export const cashBrm = [
  {
    title: 'The 20-30 Buy-In Rule',
    body:  'The foundational rule of cash game bankroll management is to have at least 20-30 buy-ins for the stake level you play. A buy-in is typically 100 big blinds. For example, if you play $1/$2 NL with a $200 max buy-in, you need $4,000-$6,000 dedicated to poker. This cushion ensures that normal variance does not force you to drop stakes or go broke. More conservative players and professionals often keep 30+ buy-ins; recreational players who can easily reload may get by with 20.',
  },
  {
    title: 'Why Bankroll Management Matters',
    body:  'Even strong winning players experience significant downswings due to variance. A player with a solid 5 bb/100 win rate can still lose 10-20 buy-ins over tens of thousands of hands. Without a proper bankroll, a normal downswing can wipe you out entirely, even if you are playing well. Bankroll management is not about skill — it is about math. It ensures you stay in the game long enough for your edge to manifest in your results.',
  },
  {
    title: 'Bankroll by Stake Level',
    body:  'Micro stakes (NL2-NL25): 20 buy-ins minimum. The games are softer and you can reload easily. Small stakes (NL50-NL100): 25 buy-ins recommended. Competition improves and swings are larger in dollar terms. Mid stakes (NL200-NL500): 30 buy-ins minimum. Regulars are competent, edges are thinner, and downswings hit harder. High stakes (NL1000+): 40 or more buy-ins. The player pool is tough, variance is high, and the financial swings are substantial enough to affect your mental game if underbankrolled.',
  },
  {
    title: 'Professional vs Recreational Guidelines',
    body:  'Professionals should maintain stricter bankroll requirements than recreational players because poker is their income source. A professional who goes broke cannot simply wait for next month\'s paycheck. Recommended minimums: professionals should keep 30-50 buy-ins and never risk more than 5% of their total bankroll in a single session. Recreational players who have outside income can be more aggressive with 15-20 buy-ins, since they can replenish from their salary. Regardless of your category, never play with money you cannot afford to lose.',
  },
  {
    title: 'Separate Poker Bankroll from Life Funds',
    body:  'One of the most critical bankroll rules is to keep your poker money completely separate from your living expenses. This means a dedicated account or tracking system for poker funds only. Never use rent money, savings, or emergency funds to play poker. When you win, resist the temptation to immediately withdraw profits — let your bankroll grow so you can move up in stakes. Conversely, if you are running bad, never dip into personal funds to chase losses. This separation protects both your finances and your decision-making at the table.',
  },
  {
    title: 'Online vs Live Bankroll Differences',
    body:  'Online poker requires a larger bankroll in terms of buy-ins because you play far more hands per hour (especially if multi-tabling), which means you experience variance faster. An online grinder playing 4 tables sees roughly 300 hands/hour vs 25-30 live. However, live games are typically softer, so your win rate in bb/100 is often higher. A practical guideline: online cash requires 25-30 buy-ins minimum, while live cash can function with 15-20 buy-ins. Also factor in that live poker has travel and session costs (food, tips, parking) that online does not.',
  },
];

// ── Tournament Bankroll Management ────────────────────────────────────────────
export const tournamentBrm = [
  {
    title: 'Higher Variance Than Cash Games',
    body:  'Tournament poker has dramatically higher variance than cash games. In a cash game, you can win or lose a few buy-ins per session. In tournaments, you will lose your buy-in the vast majority of the time — even elite players only cash in 15-20% of MTTs. This means you need 50-100+ buy-ins for your average tournament buy-in. A strong MTT player can go 50 or more tournaments without a significant cash. Your bankroll must be able to absorb these extended dry spells without affecting your ability to play.',
  },
  {
    title: 'MTT vs SNG Bankroll Requirements',
    body:  'Multi-table tournaments (MTTs) have higher variance than sit-and-gos (SNGs) because the field sizes are larger and top-heavy payouts magnify swings. For MTTs, maintain 100+ buy-ins for your average entry. For standard SNGs (9-player or 6-player), 50 buy-ins is usually sufficient because the smaller fields reduce variance. Turbo SNGs require slightly more (60+ buy-ins) due to the increased luck factor in faster structures. Heads-up SNGs are the lowest variance tournament format and can be played with 30-40 buy-ins.',
  },
  {
    title: 'ROI Expectations by Field Size',
    body:  'Your expected return on investment (ROI) decreases as field size increases, even if your skill edge stays the same. In small SNGs (9-player), a strong player might achieve 5-10% ROI. In mid-field MTTs (100-500 players), 15-30% ROI is excellent. In large-field MTTs (1,000+ players), even world-class players average 30-60% ROI, and anything above 20% is very strong. For massive-field online events (5,000+ entries), a 10-15% ROI is exceptional. Do not expect to beat large-field tournaments for more than modest returns — the variance is enormous and edges are thin.',
  },
  {
    title: 'Satellite Strategy and Bankroll Efficiency',
    body:  'Satellites are a bankroll-efficient way to play larger buy-in events. If you are skilled at satellite formats, you can turn a $50 entry into a $500 tournament seat, effectively playing above your bankroll. The key is that satellite strategy differs from regular MTTs: you do not need to win, just finish in the top X spots. This means ultra-tight play near the bubble is correct, and survival outweighs accumulation. Use satellites strategically to take shots at bigger events without risking a large portion of your bankroll.',
  },
  {
    title: 'Handling Long Stretches Without Cashes',
    body:  'Extended losing stretches are mathematically inevitable in tournament poker. A player with a 15% cash rate will go on 30+ tournament losing streaks regularly. The key is to trust your process and not panic. Track your results over hundreds of tournaments, not dozens. During dry spells: review your play for leaks (but do not assume you are playing badly just because results are bad), stay within your bankroll limits, and consider dropping down in buy-in level if your bankroll dips below the minimum threshold. The mental fortitude to endure losing stretches is what separates successful tournament players from those who go broke.',
  },
  {
    title: 'Mix of Game Types to Reduce Variance',
    body:  'Diversifying across tournament types can smooth out your overall variance. Instead of playing only large-field MTTs (highest variance), mix in SNGs, smaller-field events, and different formats like PKOs (progressive knockouts). PKOs have built-in variance reduction because you earn bounties throughout — you do not need to reach the final table to profit. A balanced schedule might be 50% MTTs, 30% SNGs, and 20% other formats. This approach keeps your bankroll more stable and reduces the emotional toll of extended dry spells in any single format.',
  },
];

// ── Understanding Variance ────────────────────────────────────────────────────
export const varianceInfo = [
  {
    title: 'What Variance Actually Is',
    body:  'Variance is the statistical measure of how much your short-term results deviate from your expected long-term outcome. In poker, variance means that even if you are a consistent winner, your results over any given session, week, or even month can look wildly different from your true win rate. A player winning at 5 bb/100 might show a loss over 20,000 hands purely due to variance. This is not a flaw in your game — it is a mathematical certainty. Understanding variance is understanding that short-term results are largely noise, and only long-term patterns reveal your true ability.',
  },
  {
    title: 'Standard Deviation in Poker',
    body:  'Standard deviation (SD) measures the typical spread of your results around your average. In cash games, SD is measured in bb/100 hands. A typical SD for a full-ring game is 60-80 bb/100; for 6-max, it is 80-100 bb/100. In tournaments, variance is even higher and is measured through ROI fluctuation. A player with a 5 bb/100 win rate and 80 bb/100 SD will have results ranging from -75 bb/100 to +85 bb/100 about 68% of the time over small samples. This means losing sessions are completely normal — even expected — for winning players.',
  },
  {
    title: 'Expected Downswing Lengths',
    body:  'Even strong winning players will experience significant downswings. A player with a 5 bb/100 win rate can expect to experience a 20 buy-in downswing at some point in their career, and a 10 buy-in downswing is almost guaranteed to happen multiple times. At a 2 bb/100 win rate, 30-50 buy-in downswings are within the realm of normal possibility. These downswings can last tens of thousands of hands. The key takeaway: if you have never experienced a brutal downswing, you probably have not played enough hands yet. Plan for it, and make sure your bankroll can handle it.',
  },
  {
    title: 'Sample Size Requirements',
    body:  'To have reasonable confidence in your poker results, you need a large sample size. For cash games, 50,000-100,000 hands provides a rough picture of your win rate, but even then, the confidence interval is wide. At 100,000 hands, a player with a true win rate of 5 bb/100 might show anywhere from 2 to 8 bb/100. For high confidence (95%), you may need 200,000-500,000 hands. For tournaments, you need 1,000+ events before your ROI stabilizes. Never draw firm conclusions about your ability from a few hundred hands or a dozen tournaments.',
  },
  {
    title: 'Tilt and the Emotional Impact of Variance',
    body:  'Variance does not just affect your bankroll — it attacks your mental game. Downswings trigger frustration, self-doubt, and tilt, which lead to poor decisions that deepen the losing streak. This is the hidden cost of variance: it causes you to play worse, compounding mathematical bad luck with strategic errors. Combat this by studying variance calculators to understand what is normal, keeping detailed records so you can distinguish bad luck from bad play, taking breaks during extended losing stretches, and focusing on decision quality rather than results. The players who handle variance best are those who detach emotionally from outcomes.',
  },
  {
    title: 'Confidence Intervals and What Your Results Mean',
    body:  'A confidence interval tells you the range within which your true win rate likely falls, given your observed results. After 50,000 hands at an observed 6 bb/100 win rate with a standard deviation of 80 bb/100, your 95% confidence interval is roughly -1 to +13 bb/100. This means you might actually be a losing player despite showing a profit. After 200,000 hands, that same observed rate narrows to roughly 2.5 to 9.5 bb/100 — much more meaningful. The lesson: never overestimate your edge based on limited data. Let large samples guide your bankroll decisions and stake selection.',
  },
];

// ── Moving Up and Down in Stakes ──────────────────────────────────────────────
export const movingStakes = [
  {
    title: 'Move-Up Criteria',
    body:  'Before moving up in stakes, three conditions should be met. First, your bankroll should comfortably support the new level (e.g., 30+ buy-ins for the higher stake). Second, you should have a demonstrated win rate at your current level over a meaningful sample — at least 50,000 hands of winning play for cash games or 500+ tournaments with positive ROI. Third, you should feel mentally comfortable and confident at your current level. Moving up while tilted, on a heater, or just because you are bored is a recipe for disaster. Patience here protects your long-term growth.',
  },
  {
    title: 'Move-Down Triggers',
    body:  'Have predetermined rules for when to drop back down — never make this decision in the moment. Common triggers: if you lose 5-10 buy-ins at the new stake, move back down immediately. If your total bankroll drops below 25 buy-ins for the stake you are playing, drop down. If you notice that the competition is significantly tougher and you are making frequent mistakes, drop down and study before trying again. Moving down is not failure — it is smart bankroll management. The best professionals in the world move down when conditions require it.',
  },
  {
    title: 'Shot-Taking Rules',
    body:  'Shot-taking means temporarily playing a higher stake with a small portion of your bankroll. The rules: allocate no more than 10-15% of your total bankroll for a shot (e.g., 3-5 buy-ins for the higher level). Set a strict stop-loss before you start — if you lose those buy-ins, you drop back immediately with no exceptions. Choose your best conditions for the shot: play during soft game times, at tables with weak players, and when you are mentally sharp. If the shot succeeds and you build a proper bankroll for the new level, stay. If not, go back without regret and try again later.',
  },
  {
    title: 'Game Selection at New Stakes',
    body:  'When you first move up, game selection becomes even more important than usual. At higher stakes, the average opponent is better, but the range of skill levels is still wide. Look for tables with recreational players, avoid tables full of known regulars, and pay attention to lobby statistics like average pot size and players per flop (higher numbers indicate looser, softer games). Play during peak recreational hours (evenings, weekends) rather than off-peak times when the games are reg-heavy. Your table selection discipline can be the difference between a successful move-up and a costly failure.',
  },
  {
    title: 'Adjusting to Tougher Competition',
    body:  'Higher stakes bring tougher opponents who exploit mistakes more efficiently. Common adjustments needed: tighten your opening ranges slightly, as players 3-bet and squeeze more at higher levels. Improve your postflop play — opponents will not let you get away with straightforward lines as often. Expect more aggression on every street. Study the population tendencies at the new stake by reviewing hand histories and using tracking software. Identify the specific leaks that higher-stakes players will target (e.g., folding too much to 3-bets, over-folding rivers) and fix them before they cost you buy-ins.',
  },
  {
    title: 'The Mental Game of Moving Stakes',
    body:  'Moving up creates psychological pressure that many players underestimate. The dollar amounts feel bigger, losses sting more, and you may subconsciously play scared or overly tight. This is known as "scared money" and it directly undermines your strategy. To combat this: continue thinking in big blinds rather than dollar amounts. Remind yourself that the poker decisions are exactly the same regardless of the stakes. Build confidence by reviewing your winning track record at your current level. If you find yourself making different decisions purely because of the money, you are not yet ready for the stake — and that is okay. Move back down, build your comfort level, and try again.',
  },
];
