// ─────────────────────────────────────────────────────────────────────────────
// Bankroll Management — GTO reference data
// ─────────────────────────────────────────────────────────────────────────────

// ── Cash Game Bankroll Management ─────────────────────────────────────────────
export const cashBrm = [
  {
    title: 'The 20-30 Buy-In Rule',
    body:  'Keep 20-30 buy-ins (100 BB each) for your stake. At $1/$2 NL that is $4,000-$6,000. Pros keep 30+; recreational players can use 20.',
  },
  {
    title: 'Why Bankroll Management Matters',
    body:  'A 5 bb/100 winner can still lose 10-20 buy-ins over tens of thousands of hands. Bankroll management ensures you survive variance long enough for your edge to show.',
  },
  {
    title: 'Bankroll by Stake Level',
    body:  'Micros (NL2-NL25): 20 buy-ins. Small stakes (NL50-NL100): 25 buy-ins. Mid stakes (NL200-NL500): 30 buy-ins. High stakes (NL1000+): 40+ buy-ins.',
  },
  {
    title: 'Professional vs Recreational Guidelines',
    body:  'Pros: 30-50 buy-ins, never risk >5% per session (poker is their income). Recreational: 15-20 buy-ins with outside income to replenish. Never play scared money.',
  },
  {
    title: 'Separate Poker Bankroll from Life Funds',
    body:  'Keep poker funds in a dedicated account, separate from living expenses. Never chase losses with personal funds; let profits grow to move up stakes.',
  },
  {
    title: 'Buy-ins and Big Blinds: A Quick Reference',
    body:  '1 buy-in = 100 BB. NL2=$2, NL5=$5, NL10=$10, NL25=$25, NL50=$50, NL100=$100, NL200=$200, NL500=$500, NL1000=$1,000. Think in BB, not dollars — strategy is portable across stakes.',
  },
  {
    title: 'Online vs Live Bankroll Differences',
    body:  'Online: 25-30 buy-ins (4 tables = ~300 hands/hr, variance hits faster). Live: 15-20 buy-ins (softer games, higher bb/100, but extra costs like tips/travel).',
  },
];

// ── Tournament Bankroll Management ────────────────────────────────────────────
export const tournamentBrm = [
  {
    title: 'Higher Variance Than Cash Games',
    body:  'Even elite players cash only 15-20% of MTTs. Need 50-100+ buy-ins. Expect 50+ tournament dry spells — bankroll must absorb them.',
  },
  {
    title: 'MTT vs SNG Bankroll Requirements',
    body:  'MTTs: 100+ buy-ins (large fields, top-heavy payouts). SNGs: 50 buy-ins. Turbo SNGs: 60+. HU SNGs: 30-40 (lowest variance format).',
  },
  {
    title: 'ROI Expectations by Field Size',
    body:  'ROI decreases with field size. SNGs (9-player): 5-10%. Mid-field MTTs (100-500): 15-30%. Large MTTs (1,000+): 20-60%. Massive fields (5,000+): 10-15% is exceptional.',
  },
  {
    title: 'Satellite Strategy and Bankroll Efficiency',
    body:  'Turn $50 entries into $500 seats. Strategy differs from MTTs — just finish in top X spots. Ultra-tight near bubble; survival over accumulation.',
  },
  {
    title: 'Handling Long Stretches Without Cashes',
    body:  'A 15% cash rate means 30+ tournament losing streaks are normal. Track over hundreds of events. Review for leaks, stay within limits, drop down if bankroll dips below threshold.',
  },
  {
    title: 'Mix of Game Types to Reduce Variance',
    body:  'Mix MTTs, SNGs, and PKOs (bounties reduce variance). Balanced schedule: ~50% MTTs, 30% SNGs, 20% other formats to smooth overall swings.',
  },
];

// ── Understanding Variance ────────────────────────────────────────────────────
export const varianceInfo = [
  {
    title: 'What Variance Actually Is',
    body:  'Short-term results deviate wildly from true win rate. A 5 bb/100 winner can show a loss over 20,000 hands. Short-term results are noise; only long-term patterns matter.',
  },
  {
    title: 'Standard Deviation in Poker',
    body:  'Typical SD: full-ring 60-80 bb/100, 6-max 80-100 bb/100. With 5 bb/100 winrate and 80 SD, results range from -75 to +85 bb/100 (68% of the time).',
  },
  {
    title: 'Expected Downswing Lengths',
    body:  'At 5 bb/100, expect 20 buy-in downswings at some point; 10 buy-in swings happen multiple times. At 2 bb/100, 30-50 buy-in swings are possible.',
  },
  {
    title: 'Sample Size Requirements',
    body:  'Cash: 50k-100k hands for rough picture; 200k-500k for 95% confidence. Tournaments: 1,000+ events. At 100k hands, true 5 bb/100 shows 2-8 bb/100.',
  },
  {
    title: 'Tilt and the Emotional Impact of Variance',
    body:  'Downswings trigger tilt, compounding bad luck with strategic errors. Combat with variance calculators, detailed records, breaks during losing stretches, and focus on decisions over results.',
  },
  {
    title: 'Confidence Intervals and What Your Results Mean',
    body:  'At 50k hands showing 6 bb/100 (SD 80), 95% CI is -1 to +13. At 200k hands, narrows to 2.5-9.5. Let large samples guide bankroll and stake decisions.',
  },
];

// ── Moving Up and Down in Stakes ──────────────────────────────────────────────
export const movingStakes = [
  {
    title: 'Move-Up Criteria',
    body:  'Three conditions: 30+ buy-ins for new stake, proven winrate over 50k+ hands (or 500+ MTTs), and mental comfort at current level. Never move up tilted or on a heater.',
  },
  {
    title: 'Move-Down Triggers',
    body:  'Predetermined rules: drop down after losing 5-10 buy-ins at new stake, or if bankroll dips below 25 buy-ins. Moving down is smart, not failure.',
  },
  {
    title: 'Shot-Taking Rules',
    body:  'Allocate 10-15% of bankroll (3-5 buy-ins) for a shot. Set strict stop-loss — drop back immediately if lost. Play soft games when mentally sharp.',
  },
  {
    title: 'Game Selection at New Stakes',
    body:  'At higher stakes, game selection matters more. Target tables with recreational players; check lobby stats (higher VPIP = softer). Play peak hours (evenings, weekends).',
  },
  {
    title: 'Adjusting to Tougher Competition',
    body:  'Tighten opens (more 3-bets and squeezes at higher stakes). Expect more aggression every street. Study population tendencies and fix exploitable leaks before they cost buy-ins.',
  },
  {
    title: 'The Mental Game of Moving Stakes',
    body:  'Bigger dollars create "scared money" — playing tight/passive due to stakes. Think in BB, not dollars. If money changes your decisions, you are not ready yet.',
  },
];
