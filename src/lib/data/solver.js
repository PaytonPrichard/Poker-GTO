// ─────────────────────────────────────────────────────────────────────────────
// Solver Interpretation Guide — GTO reference data
// ─────────────────────────────────────────────────────────────────────────────

// ── Array 1: Reading Solver Output ──────────────────────────────────────────
export const readingOutput = [
  {
    title: 'What a Solver Actually Computes',
    body:  'A solver iterates toward a Nash equilibrium — a pair of strategies where neither player can improve their expected value by unilaterally changing their play. It does not compute "the best play" in isolation; it finds the strategy that is unexploitable assuming the opponent also plays optimally. The output represents a theoretical equilibrium, not necessarily the most profitable strategy against a specific opponent.',
  },
  {
    title: 'Reading Action Frequencies',
    body:  'When a solver displays "raise 45%, call 30%, fold 25%" for a hand, it means that in equilibrium, this hand should take each action at those rates to remain unexploitable. The frequencies are not random — they exist because the hand is close to indifferent between actions, and mixing prevents the opponent from exploiting a predictable pattern. In practice, you can simplify by choosing the highest-frequency action unless the mix is very close.',
  },
  {
    title: 'EV Display — What the Numbers Represent',
    body:  'The EV (expected value) shown for each action represents how many chips or big blinds you expect to gain or lose on average by taking that action, assuming both players play the equilibrium strategy for the rest of the hand. When two actions show very similar EVs, the solver is nearly indifferent — it does not matter much which you choose. Large EV differences between actions indicate a clear best play.',
  },
  {
    title: 'Range Viewer — Understanding Heatmaps and Hand Grids',
    body:  'Solver range viewers display a 13x13 grid where each cell represents a hand combination. Colors or shading indicate action frequencies — for example, green for bet and blue for check. A cell that is half green and half blue means the solver bets that hand roughly 50% of the time. Suited hands appear above the diagonal, offsuit hands below, and pairs along the diagonal.',
  },
  {
    title: 'Node Locking — What It Is and Why It Matters',
    body:  'Node locking allows you to fix one player\'s strategy at a particular decision point and then re-solve for the other player\'s best response. This is the bridge between GTO and exploitative play — you lock in your opponent\'s known tendencies (e.g., they never fold to river bets) and the solver tells you the maximum-EV counter-strategy. It is one of the most practical solver features for real-game application.',
  },
  {
    title: 'Aggregated vs Specific Reports',
    body:  'Aggregated reports show overall statistics across all boards or runouts (e.g., "c-bet flop 67% on average"), while specific reports show strategy on one exact board texture. Aggregated reports are useful for building general heuristics, but they can be misleading because strategy varies dramatically by board. Always drill into specific board textures when studying a spot — the average hides critical variation.',
  },
  {
    title: 'Common Solver Software',
    body:  'PioSolver is the industry standard for postflop analysis — powerful but requires manual tree building and significant hardware. GTO Wizard provides a browser-based interface with pre-solved solutions, trainers, and an intuitive UI, making it the best entry point for most players. Simple Postflop offers a middle ground with cloud computing and a cleaner interface than Pio. Each tool has trade-offs between flexibility, ease of use, and cost.',
  },
];

// ── Array 2: Frequency Concepts (Mixed Strategies) ──────────────────────────
export const frequencyConcepts = [
  {
    title: 'Why Solvers Mix Actions',
    body:  'Solvers mix between actions to maintain indifference — if you always bet a certain hand, your opponent can adjust their calling or folding frequency to exploit that pattern. By mixing, you make the opponent unable to gain EV by changing their response. The indifference principle is the core mechanic: each action in the mix yields the same expected value, so the opponent cannot benefit from knowing which you will choose.',
  },
  {
    title: 'Pure vs Mixed Strategies',
    body:  'A pure strategy means the solver takes one action 100% of the time with a specific hand — there is no mixing. A mixed strategy means the hand splits between multiple actions at defined frequencies (e.g., bet 60%, check 40%). Hands at the top and bottom of your range are usually pure (always bet or always fold), while hands in the middle of your range are most likely to be mixed.',
  },
  {
    title: 'Implementing Frequencies in Practice',
    body:  'You cannot realistically randomize at the table with precise percentages. Instead, simplify: if the solver says bet 70% and check 30%, just always bet — you are giving up very little EV. Use thresholds to guide decisions: above 70% frequency, treat it as pure; between 40-60%, use a simple tie-breaker like suit or card rank to approximate randomization. Perfect mixing is far less important than choosing the right overall strategy.',
  },
  {
    title: 'Range-Based vs Hand-Based Frequency',
    body:  'When a solver says "bet this spot 65% of the time," it means 65% of the hands in your range bet — not that every hand bets 65% of the time. Many individual hands are pure (always bet or always check), and the overall 65% frequency emerges from the composition of the range. Focus on understanding which hands bet and which check, rather than trying to randomize each hand independently.',
  },
  {
    title: 'How Frequencies Change with Bet Sizing',
    body:  'Different bet sizes produce different betting frequencies and ranges. A small bet (e.g., 33% pot) is used at a high frequency with a wide, merged range. A large bet (e.g., 150% pot) is used less often but with a polarized range of strong value hands and bluffs. When you change the available bet size in a solver, the entire strategy shifts — the frequency and the hands selected are tightly linked to the sizing.',
  },
  {
    title: 'When Mixing Matters vs When It Doesn\'t',
    body:  'Mixing matters most at high stakes where opponents track your frequencies, identify imbalances, and adjust their strategy accordingly. At low and mid stakes, most opponents are not paying close enough attention to exploit small frequency errors. In these games, simplifying to the highest-frequency action is almost always sufficient. Focus your energy on making correct strategic decisions rather than agonizing over precise mixing ratios.',
  },
];

// ── Array 3: When to Deviate from Solver ────────────────────────────────────
export const whenToDeviate = [
  {
    title: 'Against Recreational Players',
    body:  'Solvers assume both players play optimally, but recreational players have significant, persistent leaks — they call too much, bluff too little, or overvalue weak hands. Against these opponents, you should abandon balance and exploit their tendencies directly. For example, if a player never folds to river bets, stop bluffing them entirely and value bet thinner. Maximizing EV against weak opponents means deviating heavily from equilibrium.',
  },
  {
    title: 'When You Have a Strong Read',
    body:  'The solver assumes you know nothing specific about your opponent\'s tendencies. When you have a reliable read — through observation, HUD stats, or history — you should deviate to exploit that information. If you know a player 3-bets only premium hands, fold more against their 3-bets than the solver suggests. Reads effectively give you "extra information" that the solver does not have access to.',
  },
  {
    title: 'In Multiway Pots',
    body:  'Most solvers are designed to solve heads-up scenarios between two players. Multiway pots involve three or more players and are exponentially more complex to solve. The general adjustment is to play tighter and more straightforward — bluff less, value bet stronger holdings, and respect that someone in a multiway pot is more likely to have a strong hand. Solver outputs for heads-up spots should not be directly applied to multiway situations.',
  },
  {
    title: 'At Micro and Low Stakes',
    body:  'At micro and low stakes, your opponents are not tracking your frequencies or looking for imbalances to exploit. Playing a simplified, slightly exploitative strategy will generate far more profit than perfectly balanced GTO play. Focus on value betting relentlessly, cutting out thin bluffs, and punishing the population tendency to call too much. Solver precision is wasted when your opponents are making large fundamental errors.',
  },
  {
    title: 'When the Solver Solution Is Very Mixed',
    body:  'If the solver splits an action 52%/48%, both choices yield nearly identical EV. Agonizing over which action to take in these spots is a waste of mental energy. Pick the simpler option or the one that leads to easier future decisions and move on. Reserve your focus for spots where the solver strongly favors one action — that is where real EV is gained or lost.',
  },
  {
    title: 'In Tournament ICM Spots',
    body:  'Most solver outputs default to chip EV (chipEV), which assumes every chip is worth the same. In tournaments, chip values are non-linear due to ICM — losing your last chip is catastrophic while gaining chips has diminishing returns. Standard solver ranges must be tightened near bubbles and pay jumps. Use dedicated ICM calculators or ICM-aware solvers to get accurate tournament strategy, especially at final tables.',
  },
  {
    title: 'When Stack-to-Pot Ratio Is Extreme',
    body:  'Solver strategies shift dramatically with stack depth, and extreme stack-to-pot ratios (SPR) warrant significant simplification. At very low SPR (below 2), strategy collapses to shove-or-fold in many spots — there is not enough behind to maneuver. At very high SPR (above 15), speculative hands gain value and the game becomes heavily positional. In both extremes, simplified heuristics outperform attempts to replicate complex solver output.',
  },
];

// ── Array 4: Practical Tips ─────────────────────────────────────────────────
export const practicalTips = [
  {
    title: 'Study Specific Spots, Not Random Hands',
    body:  'Pick a common situation you encounter frequently — such as BTN vs BB single-raised pots on dry flops — and study it thoroughly in the solver. Understanding one spot deeply is far more valuable than glancing at dozens of random hands. Build a library of studied spots over time and you will see the same patterns repeat across different board textures and positions.',
  },
  {
    title: 'Focus on the "Why" Not the "What"',
    body:  'Memorizing that the solver bets AQ on K72r 75% of the time is far less useful than understanding why — it has good equity, blocks Kx calling hands, and benefits from fold equity against overcards. When you understand the underlying principle, you can apply it to novel situations the solver has not shown you. Always ask yourself what property of the hand or board drives the solver\'s choice.',
  },
  {
    title: 'Use the Solver to Check Your Intuition',
    body:  'After each session, pick 2-3 interesting hands you played and run them through a solver. Compare your in-game decision to the equilibrium action. You will often find that your instincts are right on the action but wrong on the sizing, or correct on one street but off on another. This feedback loop is the fastest way to calibrate your decision-making over time.',
  },
  {
    title: 'Start with Preflop, Then Move to Postflop',
    body:  'Preflop ranges are the foundation of all solver strategy — if your preflop ranges are wrong, every postflop decision is built on a flawed foundation. Master your opening ranges, 3-betting ranges, and calling ranges before diving into postflop solver work. Once preflop is solid, study common flop textures (dry, wet, paired) and learn the c-betting heuristics for each.',
  },
  {
    title: 'Build Decision Trees from Solver Output',
    body:  'Translate solver output into simple if-then rules you can use at the table. For example: "On dry K-high boards as the preflop raiser, c-bet small with entire range" or "On wet boards, check back medium-strength hands and bet polarized." These heuristics capture 90% of the solver\'s EV while being simple enough to execute under time pressure.',
  },
  {
    title: 'Review Sessions with Solver Assistance',
    body:  'Systematic session review is where solver study pays off most. Mark hands during play that felt uncertain, then review them afterward with a solver. Focus on spots where you deviated from your strategy, lost a big pot, or made a close decision. Over time, this process reveals your personal leaks and shows you exactly where to improve.',
  },
  {
    title: 'The 80/20 Rule of Solver Study',
    body:  'Roughly 80% of your expected value comes from about 20% of the decisions — mainly preflop range construction, c-bet strategy on common board textures, and river bet/call/fold decisions. Mastering these high-frequency spots generates far more profit than studying exotic lines or rare board runouts. Prioritize the situations you face most often and accept that some low-frequency spots will remain imperfect.',
  },
];
