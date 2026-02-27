// Preflop all-in equity lookup for ~80 common hand-vs-hand matchups.
// Keys are alphabetically sorted hand pairs (e.g., "AA-KK" not "KK-AA").
// Values are { hand1, hand2 } equity percentages that always sum to 100.
// hand1 corresponds to the first (alphabetically earlier) hand in the key,
// hand2 to the second.

export const equityLookup = new Map([
  // ===================================================================
  // PAIR vs PAIR  (26 matchups)
  // ===================================================================
  // Overpair vs underpair is roughly 80/20. Adjacent pairs ~81/19.
  ["22-AA",   { hand1: 18, hand2: 82 }],
  ["22-KK",   { hand1: 18, hand2: 82 }],
  ["22-JJ",   { hand1: 18, hand2: 82 }],
  ["22-TT",   { hand1: 18, hand2: 82 }],
  ["22-99",   { hand1: 18, hand2: 82 }],
  ["33-44",   { hand1: 19, hand2: 81 }],
  ["44-55",   { hand1: 19, hand2: 81 }],
  ["55-66",   { hand1: 19, hand2: 81 }],
  ["66-77",   { hand1: 19, hand2: 81 }],
  ["77-88",   { hand1: 19, hand2: 81 }],
  ["88-99",   { hand1: 19, hand2: 81 }],
  ["88-KK",   { hand1: 20, hand2: 80 }],
  ["99-AA",   { hand1: 19, hand2: 81 }],
  ["99-KK",   { hand1: 19, hand2: 81 }],
  ["99-QQ",   { hand1: 19, hand2: 81 }],
  ["99-TT",   { hand1: 19, hand2: 81 }],
  ["AA-JJ",   { hand1: 81, hand2: 19 }],
  ["AA-KK",   { hand1: 81, hand2: 19 }],
  ["AA-QQ",   { hand1: 82, hand2: 18 }],
  ["AA-TT",   { hand1: 80, hand2: 20 }],
  ["JJ-KK",   { hand1: 19, hand2: 81 }],
  ["JJ-QQ",   { hand1: 19, hand2: 81 }],
  ["JJ-TT",   { hand1: 81, hand2: 19 }],
  ["KK-QQ",   { hand1: 81, hand2: 19 }],
  ["KK-TT",   { hand1: 80, hand2: 20 }],
  ["QQ-TT",   { hand1: 80, hand2: 20 }],

  // ===================================================================
  // PAIR vs OVERCARDS — coin flips / racing  (16 matchups)
  // ===================================================================
  // Pair vs two overcards is roughly 52-57% for the pair.
  // Suited overcards gain ~3% extra equity from flush draws.
  ["AKs-JJ",  { hand1: 47, hand2: 53 }],
  ["AKs-QQ",  { hand1: 46, hand2: 54 }],
  ["AKs-TT",  { hand1: 47, hand2: 53 }],
  ["AKo-JJ",  { hand1: 43, hand2: 57 }],
  ["AKo-QQ",  { hand1: 43, hand2: 57 }],
  ["AKo-TT",  { hand1: 43, hand2: 57 }],
  ["99-AKs",  { hand1: 53, hand2: 47 }],
  ["99-AKo",  { hand1: 57, hand2: 43 }],
  ["88-AKs",  { hand1: 53, hand2: 47 }],
  ["55-AKs",  { hand1: 53, hand2: 47 }],
  ["22-AKs",  { hand1: 52, hand2: 48 }],
  ["AQs-JJ",  { hand1: 46, hand2: 54 }],
  ["AQo-JJ",  { hand1: 43, hand2: 57 }],
  ["AQs-TT",  { hand1: 46, hand2: 54 }],
  ["JJ-KQs",  { hand1: 54, hand2: 46 }],
  ["KQs-TT",  { hand1: 46, hand2: 54 }],

  // ===================================================================
  // PAIR vs ONE OVERCARD / UNDERCARDS  (10 matchups)
  // ===================================================================
  // Pair vs same card + kicker (e.g., AA vs AK): ~87-93%.
  // Pair vs one over + one under: ~66-70%.
  // Pair vs two undercards: ~78-82%.
  ["AA-AKs",  { hand1: 87, hand2: 13 }],
  ["AA-AKo",  { hand1: 93, hand2:  7 }],
  ["AA-KQs",  { hand1: 78, hand2: 22 }],
  ["AA-KQo",  { hand1: 82, hand2: 18 }],
  ["AQs-KK",  { hand1: 34, hand2: 66 }],
  ["AQo-KK",  { hand1: 31, hand2: 69 }],
  ["AJs-KK",  { hand1: 34, hand2: 66 }],
  ["JTs-QQ",  { hand1: 21, hand2: 79 }],
  ["KK-QJs",  { hand1: 79, hand2: 21 }],
  ["KK-QJo",  { hand1: 82, hand2: 18 }],

  // ===================================================================
  // DOMINATED HANDS — shared card, kicker difference  (16 matchups)
  // ===================================================================
  // Domination matchups are roughly 70-75% for the dominator.
  ["AKs-AQs", { hand1: 70, hand2: 30 }],
  ["AKo-AQo", { hand1: 74, hand2: 26 }],
  ["AJs-AKs", { hand1: 30, hand2: 70 }],
  ["AJo-AKo", { hand1: 26, hand2: 74 }],
  ["AKs-ATs", { hand1: 70, hand2: 30 }],
  ["AKo-KQo", { hand1: 74, hand2: 26 }],
  ["AJs-AQs", { hand1: 31, hand2: 69 }],
  ["AJo-AQo", { hand1: 27, hand2: 73 }],
  ["AQs-ATs", { hand1: 69, hand2: 31 }],
  ["AJs-ATs", { hand1: 69, hand2: 31 }],
  ["KJs-KQs", { hand1: 31, hand2: 69 }],
  ["KJo-KQo", { hand1: 27, hand2: 73 }],
  ["KQs-QJs", { hand1: 70, hand2: 30 }],
  ["KJs-KTs", { hand1: 69, hand2: 31 }],
  ["QJs-QTs", { hand1: 68, hand2: 32 }],
  ["J9s-JTs", { hand1: 32, hand2: 68 }],

  // ===================================================================
  // SUITED CONNECTORS vs PAIRS  (14 matchups)
  // ===================================================================
  // Suited connectors vs big pairs: ~22% equity for the connectors.
  ["54s-AA",  { hand1: 22, hand2: 78 }],
  ["65s-AA",  { hand1: 22, hand2: 78 }],
  ["65s-TT",  { hand1: 22, hand2: 78 }],
  ["76s-AA",  { hand1: 22, hand2: 78 }],
  ["76s-99",  { hand1: 22, hand2: 78 }],
  ["87s-AA",  { hand1: 22, hand2: 78 }],
  ["87s-KK",  { hand1: 22, hand2: 78 }],
  ["87s-QQ",  { hand1: 22, hand2: 78 }],
  ["87s-TT",  { hand1: 21, hand2: 79 }],
  ["98s-AA",  { hand1: 22, hand2: 78 }],
  ["98s-QQ",  { hand1: 23, hand2: 77 }],
  ["AA-JTs",  { hand1: 78, hand2: 22 }],
  ["AA-T9s",  { hand1: 78, hand2: 22 }],
  ["JTs-KK",  { hand1: 22, hand2: 78 }],
]);

// All unique hands that appear in the lookup, for use as dropdown options.
export const commonHands = [
  // Pairs (high to low)
  "AA", "KK", "QQ", "JJ", "TT", "99", "88", "77", "66", "55", "44", "33", "22",
  // Suited broadway / ace-x
  "AKs", "AQs", "AJs", "ATs",
  // Offsuit broadway / ace-x
  "AKo", "AQo", "AJo",
  // Suited king-x
  "KQs", "KJs", "KTs",
  // Offsuit king-x / queen-x
  "KQo", "KJo", "QJo",
  // Suited queen-x / jack-x
  "QJs", "QTs",
  "JTs", "J9s",
  // Suited connectors
  "T9s", "98s", "87s", "76s", "65s", "54s",
];
