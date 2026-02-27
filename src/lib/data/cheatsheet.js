// ─────────────────────────────────────────────────────────
//  Poker Cheat Sheet — Quick Reference Data
//  Curated key facts for at-a-glance recall (6-max NL Hold'em)
// ─────────────────────────────────────────────────────────

/** RFI open-raise sizes by position (6-max, 100bb deep) */
export const rfiSizes = [
  { position: "UTG (LJ)", size: "2.5bb", notes: "Tightest range (~18%). Premium hands + suited broadways." },
  { position: "HJ", size: "2.5bb", notes: "Slightly wider (~22%). Add suited connectors like 76s, 87s." },
  { position: "CO", size: "2.5bb", notes: "Open wide (~28%). Most suited Ax, suited connectors, broadways." },
  { position: "BTN", size: "2.5bb", notes: "Widest open (~48%). Nearly all pairs, suited hands, offsuit broadways." },
  { position: "SB", size: "3bb", notes: "Raise or fold (~40%). Larger size because BB has position + closing action." },
  { position: "BB", size: "N/A", notes: "Defend ~55% vs BTN 2.5x. Tighten vs EP opens (~30-35%)." },
];

/** Common c-bet frequencies by board texture */
export const cbetFrequencies = [
  { texture: "Dry / rainbow (e.g. K72r)", ipFreq: "65-75%", oopFreq: "50-60%", size: "25-33% pot" },
  { texture: "Monotone (e.g. Ts7s3s)", ipFreq: "25-35%", oopFreq: "20-30%", size: "33% pot or check" },
  { texture: "Paired board (e.g. 883r)", ipFreq: "55-65%", oopFreq: "45-55%", size: "25-33% pot" },
  { texture: "Connected / wet (e.g. JT8)", ipFreq: "40-50%", oopFreq: "30-40%", size: "50-66% pot" },
  { texture: "Ace-high dry (e.g. A72r)", ipFreq: "80-90%", oopFreq: "70-80%", size: "25-33% pot" },
  { texture: "Low dynamic (e.g. 654)", ipFreq: "35-45%", oopFreq: "25-35%", size: "50-75% pot" },
  { texture: "Broadway heavy (e.g. KQJ)", ipFreq: "45-55%", oopFreq: "35-45%", size: "50-66% pot" },
];

/** Pot odds quick reference: bet as fraction of pot -> equity needed to call -> MDF */
export const potOdds = [
  { betSize: "25% pot",  potOdds: "17%", mdf: "80%" },
  { betSize: "33% pot",  potOdds: "20%", mdf: "75%" },
  { betSize: "50% pot",  potOdds: "25%", mdf: "67%" },
  { betSize: "66% pot",  potOdds: "28%", mdf: "60%" },
  { betSize: "75% pot",  potOdds: "30%", mdf: "57%" },
  { betSize: "100% pot", potOdds: "33%", mdf: "50%" },
  { betSize: "150% pot", potOdds: "38%", mdf: "40%" },
  { betSize: "200% pot", potOdds: "40%", mdf: "33%" },
];

/** Short-stack push/fold thresholds (approximate Nash equilibrium, no ante) */
export const pushFoldChart = [
  { bbCount: "3bb",  positions: "Any",        hands: "Any two cards from any position" },
  { bbCount: "5bb",  positions: "BTN/SB",     hands: "Any Ax, any pair, K2s+, K8o+, Q5s+, Q9o+, J7s+, JTo, suited connectors" },
  { bbCount: "5bb",  positions: "CO",         hands: "Any pair, A2s+, A5o+, K8s+, KTo+, Q9s+, QJo, J9s+, T9s" },
  { bbCount: "5bb",  positions: "UTG/HJ",     hands: "22+, A2s+, A8o+, KTs+, KQo, QJs, JTs" },
  { bbCount: "8bb",  positions: "BTN",        hands: "22+, A2s+, A3o+, K4s+, K9o+, Q7s+, QTo+, J8s+, JTo, T8s+, 97s+" },
  { bbCount: "8bb",  positions: "CO",         hands: "22+, A2s+, A7o+, K9s+, KJo+, QTs+, QJo, JTs" },
  { bbCount: "8bb",  positions: "UTG/HJ",     hands: "33+, A4s+, ATo+, KTs+, KQo, QJs" },
  { bbCount: "12bb", positions: "BTN",        hands: "22+, A2s+, A5o+, K8s+, KTo+, Q9s+, QJo, J9s+, T9s, 98s" },
];

/** Common equity matchups to memorize */
export const commonEquity = [
  { matchup: "AA vs KK",               equity: "82% vs 18%" },
  { matchup: "AA vs QQ",               equity: "82% vs 18%" },
  { matchup: "AA vs AKs",              equity: "87% vs 13%" },
  { matchup: "KK vs AKo",              equity: "70% vs 30%" },
  { matchup: "AA vs 87s",              equity: "77% vs 23%" },
  { matchup: "QQ vs AKo",              equity: "57% vs 43%" },
  { matchup: "AKo vs JTs",             equity: "58% vs 42%" },
  { matchup: "AKo vs 22",              equity: "48% vs 52%" },
  { matchup: "AKs vs AKo",             equity: "53% vs 47%" },
  { matchup: "Overpair vs flush draw", equity: "65% vs 35%" },
  { matchup: "Set vs flush draw",      equity: "74% vs 26%" },
  { matchup: "Two overcards vs pair",  equity: "45% vs 55%" },
  { matchup: "Open-ended SD vs overpair", equity: "32% vs 68%" },
  { matchup: "Pair + flush draw vs overpair", equity: "54% vs 46%" },
  { matchup: "Random hand vs random hand", equity: "50% vs 50%" },
];

/** Bankroll requirements (conservative guidelines) */
export const bankrollReqs = [
  { gameType: "NL Cash (full ring)", buyins: "20-25 buy-ins",  notes: "Lower variance; tighter play reduces swings" },
  { gameType: "NL Cash (6-max)",     buyins: "25-30 buy-ins",  notes: "Standard for competent regulars" },
  { gameType: "NL Cash (zoom/fast)", buyins: "30-35 buy-ins",  notes: "Less table-selection edge; higher variance" },
  { gameType: "MTT (large field)",   buyins: "75-100 buy-ins", notes: "High variance; deep runs are rare" },
  { gameType: "MTT (small field)",   buyins: "40-60 buy-ins",  notes: "Lower field = lower variance" },
  { gameType: "Sit & Go (regular)",  buyins: "40-50 buy-ins",  notes: "ICM pressure adds variance vs cash" },
  { gameType: "Sit & Go (turbo)",    buyins: "60-80 buy-ins",  notes: "Faster blinds reduce skill edge" },
  { gameType: "PLO Cash (6-max)",    buyins: "35-50 buy-ins",  notes: "Significantly higher variance than NLHE" },
];

/** Key numbers every poker player should know */
export const keyNumbers = [
  { label: "Rule of 2 and 4",         value: "Outs x 4 (flop) / Outs x 2 (turn)", context: "Quick equity estimate: multiply outs by 4 with two cards to come, by 2 with one card to come" },
  { label: "Flush draw equity (flop)", value: "~35%",          context: "9 outs, flop to river. ~19.6% turn only" },
  { label: "Open-ended straight draw", value: "~31.5%",        context: "8 outs, flop to river. ~17.4% turn only" },
  { label: "Gutshot straight draw",    value: "~16.5%",        context: "4 outs, flop to river. ~8.7% turn only" },
  { label: "Set mining odds",          value: "~7.5:1 (11.8%)", context: "Pocket pair flops a set ~1 in 8.5 times" },
  { label: "Flopping two pair+",       value: "~5%",           context: "With an unpaired hand, hitting two pair or better on the flop" },
  { label: "Suited flops flush",       value: "0.8%",          context: "Suited hand flops a flush; but flops a flush draw ~11%" },
  { label: "Overpair probability",     value: "~82%",          context: "AA vs any single lower pair, preflop all-in" },
  { label: "1 combo of a specific pair", value: "6 combos",    context: "Each pocket pair has 6 combos; each unpaired hand has 16 (4 suited, 12 offsuit)" },
  { label: "Break-even bluff %",       value: "Bet / (Bet + Pot)", context: "Minimum fold frequency needed for a bluff to be +EV" },
  { label: "Effective SPR guide",      value: "SPR < 4 = commit with TPTK", context: "SPR 4-8 = need two pair+; SPR > 13 = set mining / speculative hands gain value" },
  { label: "BB/100 winrate (good reg)", value: "3-8 bb/100",   context: "Solid winrate at low-mid stakes online 6-max; 1-3 bb/100 at higher stakes" },
];
