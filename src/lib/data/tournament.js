// ─────────────────────────────────────────────────────────────────────────────
// Tournament Play — GTO reference data
// ─────────────────────────────────────────────────────────────────────────────

// ── Tab 1: Fundamentals ─────────────────────────────────────────────────────
export const tournamentBasics = [
  {
    title: 'Blind Levels & Structure',
    body:  'Unlike cash games where blinds stay fixed, tournament blinds increase on a timer. As blinds rise, the effective stack depth shrinks relative to the pot, forcing action. Antes kick in at mid-levels, adding dead money to every pot and incentivizing wider opens.',
  },
  {
    title: 'Stack Sizes Are Relative',
    body:  'In tournaments, stack sizes are measured in big blinds (BB), not dollar amounts. A 5,000-chip stack means very different things at 25/50 blinds (100 BB) vs 500/1,000 blinds (5 BB). Always think in terms of BB when making decisions.',
  },
  {
    title: 'Chip Value Is Non-Linear (ICM)',
    body:  'In cash games, every chip is worth the same. In tournaments, the first chip you win is worth less than the last chip you lose — this is the Independent Chip Model (ICM). Doubling your stack does NOT double your tournament equity. This makes survival more important than accumulation in many spots.',
  },
  {
    title: 'No Rebuying (Freezeouts)',
    body:  'In freezeout tournaments, once you bust you are out. This fundamentally changes risk assessment — you cannot reload like in a cash game. Marginal spots that are +chipEV can be -$EV when tournament life is at stake, especially near pay jumps.',
  },
  {
    title: 'Antes Change Preflop Math',
    body:  'When antes are in play, there is significantly more dead money in every pot. This increases the reward for stealing blinds and makes wider opening ranges profitable. A standard ante structure adds ~30-50% more to the preflop pot compared to blinds-only.',
  },
  {
    title: 'Position Value Increases as Stacks Get Shallow',
    body:  'With deep stacks, positional advantage builds over multiple streets. With shallow stacks, positional advantage is concentrated into fewer decisions but each decision is more impactful. Late position stealing becomes the primary source of chips in mid-to-late stages.',
  },
];

// ── Tab 2: Stage Strategy ───────────────────────────────────────────────────
export const stageStrategy = [
  {
    stage:    'Early Stage',
    bbRange:  '100+ BB',
    badge:    'Speculate',
    overview: 'Play similarly to a deep-stacked cash game. Focus on seeing cheap flops with speculative hands and building a stack without risking elimination.',
    tips: [
      'Open with a standard cash-game raising range — no need to adjust much',
      'Set-mine and play suited connectors for implied odds',
      'Avoid marginal all-in situations — tournament life is not worth a coin flip this early',
      'Small ball poker works well — small raises, small c-bets',
      'Do not overvalue top pair — deep stacks allow for set-over-set and cooler situations',
    ],
    keyPrinciple: 'Survival is easy when stacks are deep. Focus on controlled pot-building and avoid unnecessary variance.',
  },
  {
    stage:    'Middle Stage',
    bbRange:  '40–80 BB',
    badge:    'Accumulate',
    overview: 'Blinds and antes are meaningful now. Tighten your opening range slightly but become more aggressive with re-steals and 3-bets. This is the stage where chip accumulation separates contenders from short stacks.',
    tips: [
      'Open tighter from early position but maintain a wide stealing range from CO/BTN',
      'Re-stealing (3-bet light) becomes a key weapon against loose openers',
      'Start applying pressure to players trying to "survive" to the money',
      'Fold equity is high — use it before stacks get too shallow',
      'Adjust to table dynamics: attack tight players, avoid tangling with big stacks unnecessarily',
    ],
    keyPrinciple: 'Chips won without showdown are the most valuable. Use fold equity aggressively before the bubble when stacks allow it.',
  },
  {
    stage:    'Late Stage / Bubble',
    bbRange:  '20–40 BB',
    badge:    'ICM Pressure',
    overview: 'ICM pressure is at its highest near the money bubble. Medium stacks face the most pressure — they have too much to risk but not enough to bully. Big stacks should attack relentlessly; short stacks should look for spots to shove.',
    tips: [
      'Big stacks: open wide and apply maximum pressure — opponents cannot call light',
      'Medium stacks: tighten significantly — avoid confrontations with big stacks',
      'Short stacks: look for push/fold spots — waiting too long means blinding out',
      'Hand-for-hand play changes dynamics — survival becomes paramount for short stacks',
      'Avoid calling all-ins with marginal hands — the risk premium is highest here',
    ],
    keyPrinciple: 'On the bubble, the threat of busting for nothing is worth more than the chance of doubling up. Adjust calling ranges dramatically tighter.',
  },
  {
    stage:    'Final Table',
    bbRange:  'Varies',
    badge:    'Pay Jumps',
    overview: 'Pay jumps between positions are significant. Every elimination means a pay bump for all remaining players. Strategy depends heavily on stack sizes, pay structure, and remaining players.',
    tips: [
      'Pay jump awareness: each elimination increases your guaranteed payout',
      'Short stacks should be aggressive — the difference between 9th and 8th is often small',
      'Big stacks can exploit ICM pressure on medium stacks trying to ladder up',
      'Heads-up play at the final table requires a completely different strategy (much wider ranges)',
      'Deal-making (ICM chops) can lock up equity — consider offering/accepting when stack sizes are close',
    ],
    keyPrinciple: 'Final table decisions should weigh pay jumps against chip accumulation. Sometimes folding a +chipEV spot is correct due to ICM.',
  },
];

// ── Tab 3: ICM & Bubble ─────────────────────────────────────────────────────
export const icmConcepts = [
  {
    title: 'What Is ICM?',
    body:  'The Independent Chip Model converts tournament chip stacks into real-money equity based on the prize pool distribution. It assumes all players are equally skilled and calculates the probability of each player finishing in each position. ICM is the foundation for all tournament-specific adjustments.',
  },
  {
    title: 'Chip EV vs $ EV',
    body:  'In cash games, chip EV = $ EV. In tournaments, they diverge. A call might be +chipEV (you win more chips than you lose on average) but -$EV (the risk of busting costs more in prize equity than the chips gained). This gap is largest near the bubble and at final tables.',
  },
  {
    title: 'Bubble Factor',
    body:  'Bubble factor measures how much more it costs to lose chips vs how much you gain by winning them. A bubble factor of 2.0 means losing a chip costs twice as much as winning one gains. Near the money bubble, bubble factors can reach 3-5x for medium stacks, meaning you need a massive edge to justify calling an all-in.',
  },
  {
    title: 'Risk Premium',
    body:  'Because of ICM, you need a stronger hand to call an all-in in a tournament than in a cash game. This "risk premium" means your calling range should be significantly tighter than your shoving range. Near the bubble, you might fold hands that would be snap-calls in a cash game.',
  },
  {
    title: 'Big Stack vs Short Stack Dynamics',
    body:  'Big stacks can pressure medium stacks who are trying to survive. Short stacks are paradoxically freer to gamble — they have less to lose in prize equity. The most constrained players are medium stacks near the bubble: too much to risk, not enough to bully. Big stacks should attack medium stacks; medium stacks should avoid big stacks.',
  },
  {
    title: 'Pay Jump Pressure at Final Tables',
    body:  'At the final table, each elimination creates a pay jump for all survivors. The bigger the jump between positions, the more conservative play is rewarded. When approaching a large pay jump (e.g., 4th to 3rd is $50K more), tighten up. When you just passed a big jump, you can open up.',
  },
];

// ── Tab 4: Push/Fold ────────────────────────────────────────────────────────
export const pushFoldRanges = [
  {
    title: 'When to Switch to Push/Fold',
    body:  'At roughly 15 BB and below, your stack is too shallow for standard raise-and-play-postflop poker. Open-raising to 2.2x commits ~15% of your stack, and folding to a 3-bet bleeds chips fast. Instead, your options simplify to all-in or fold. This maximizes fold equity while keeping your range strong.',
  },
  {
    title: 'Push Ranges by Position (10 BB)',
    body:  'UTG: 22+, ATs+, AJo+, KQs (~12%). CO: 22+, A2s+, A8o+, KTs+, KJo+, QJs, JTs (~22%). BTN: 22+, A2s+, A2o+, K2s+, K8o+, Q5s+, Q9o+, J7s+, JTo, T7s+, 97s+ (~40%). SB: 22+, A2+, K2s+, K5o+, Q2s+, Q7o+, J4s+, J8o+, T6s+, T8o+, 96s+, 86s+, 76s (~55%).',
  },
  {
    title: 'Push Ranges by Position (15 BB)',
    body:  'UTG: 55+, ATs+, AJo+, KQs (~10%). CO: 22+, A5s+, ATo+, KTs+, KQo, QJs (~16%). BTN: 22+, A2s+, A5o+, K8s+, KTo+, Q9s+, QJo, JTs, T9s (~28%). SB: 22+, A2s+, A2o+, K4s+, K9o+, Q7s+, QTo+, J8s+, JTo, T8s+, 98s (~38%).',
  },
  {
    title: 'Push Ranges by Position (20 BB)',
    body:  'At 20 BB, you are on the edge of push/fold territory. Min-raising is often better from EP, but shoving is still viable from late position. BTN shove range: 22+, A2s+, A7o+, K9s+, KJo+, QTs+, JTs (~22%). SB shove range: 22+, A2s+, A3o+, K7s+, KTo+, Q9s+, QJo, J9s+, T9s (~30%).',
  },
  {
    title: 'Calling Ranges vs Shoves',
    body:  'Calling an all-in requires a stronger hand than shoving because you have no fold equity. Against a 10 BB shove, BB calling range is roughly: 55+, ATs+, AJo+, KQs (~12%). Against a 15 BB shove, tighten to: 77+, AJs+, AQo+, KQs (~9%). Near the bubble, tighten these ranges further — sometimes dramatically.',
  },
  {
    title: 'The "Any Two Cards" Threshold',
    body:  'At 5 BB or less, virtually any two cards can be shoved from late position. The math: posting the blinds costs ~30% of your stack per orbit at this depth. You must find a spot to shove before blinding out. Even 72o has ~35% equity vs a random hand, and fold equity makes shoving profitable.',
  },
  {
    title: 'Min-Raising vs Shoving',
    body:  'With 18-25 BB, min-raising preserves fold equity while risking less. If you min-raise and face a 3-bet, you can still fold (losing only ~2.2 BB). Shoving risks your entire stack but puts maximum pressure on opponents. Use min-raise from EP/MP, shove from CO/BTN/SB when short.',
  },
  {
    title: 'ICM Adjustments to Push/Fold',
    body:  'Near the bubble, tighten your push ranges by ~20-30% and your calling ranges even more. A shove that is +chipEV may be -$EV if busting costs significant prize equity. Big stacks can still push wide; medium and short stacks near the bubble should be significantly tighter than standard push/fold charts suggest.',
  },
];
