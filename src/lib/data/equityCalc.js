// ─────────────────────────────────────────────────────────────────────────────
// Comprehensive preflop all-in equity estimator for any two starting hands.
// Covers all 169 unique hands × 168 opponents = 14,196 matchups.
// Uses established poker math for each matchup archetype.
// ─────────────────────────────────────────────────────────────────────────────

const RANKS = '23456789TJQKA';
const rankVal = Object.fromEntries([...RANKS].map((r, i) => [r, i]));

// Parse hand string like "AKs", "TT", "72o" → { r1, r2, suited, pair }
function parse(hand) {
  const r1 = rankVal[hand[0]];
  const r2 = rankVal[hand[1]];
  const hi = Math.max(r1, r2);
  const lo = Math.min(r1, r2);
  const pair = hand.length === 2 || r1 === r2;
  const suited = hand.endsWith('s');
  return { hi, lo, pair, suited };
}

// Suited bonus: suited hands gain ~3-4% equity from flush draw potential
const SUIT_BONUS = 3;

/**
 * Estimate preflop all-in equity for hand1 vs hand2.
 * Returns { eq1, eq2 } where eq1 + eq2 = 100.
 */
export function estimateEquity(h1str, h2str) {
  if (h1str === h2str) return null;

  const h1 = parse(h1str);
  const h2 = parse(h2str);

  let eq1;

  if (h1.pair && h2.pair) {
    eq1 = pairVsPair(h1, h2);
  } else if (h1.pair && !h2.pair) {
    eq1 = pairVsUnpaired(h1, h2);
  } else if (!h1.pair && h2.pair) {
    eq1 = 100 - pairVsUnpaired(h2, h1);
  } else {
    eq1 = unpairedVsUnpaired(h1, h2);
  }

  eq1 = Math.round(Math.max(5, Math.min(95, eq1)));
  return { eq1, eq2: 100 - eq1 };
}

// ── Pair vs Pair ────────────────────────────────────────────────────────────
function pairVsPair(higher, lower) {
  if (higher.hi < lower.hi) return 100 - pairVsPair(lower, higher);
  if (higher.hi === lower.hi) return 50; // same pair

  // Higher pair wins ~80-82%. Gap size has minimal effect.
  // Smaller pairs have slightly more straight outs against certain overpairs.
  const gap = higher.hi - lower.hi;
  if (gap === 1) return 81;  // adjacent pairs
  if (gap <= 3) return 82;
  return 82;
}

// ── Pair vs Unpaired Hand ───────────────────────────────────────────────────
function pairVsUnpaired(pair, other) {
  const pairRank = pair.hi;
  const otherHi = other.hi;
  const otherLo = other.lo;
  const suitBonus = other.suited ? SUIT_BONUS : 0;

  // Case 1: Dominated — pair matches one of the unpaired cards
  if (pairRank === otherHi || pairRank === otherLo) {
    // e.g., AA vs AKo (~93%), AA vs AKs (~87%)
    // The pair dominates hard; unpaired hand needs runner-runner or trips
    return 91 - suitBonus;
  }

  // Case 2: Both overcards to the pair (race / coin flip)
  if (otherHi > pairRank && otherLo > pairRank) {
    // e.g., JJ vs AKo (~57%), JJ vs AKs (~53%)
    // Higher pair rank → slightly better (fewer overcards on board help villain)
    const pairStrength = pairRank >= 8 ? 1 : 0; // TT+ slightly better in races
    return 55 + pairStrength - suitBonus;
  }

  // Case 3: One overcard, one undercard
  if (otherHi > pairRank && otherLo < pairRank) {
    // e.g., QQ vs AJo (~70%), QQ vs AJs (~67%)
    // Gap between cards matters slightly
    const gapAbove = otherHi - pairRank;
    const penalty = gapAbove <= 2 ? 1 : 0; // Closer overcard = slightly worse for pair
    return 69 - penalty - suitBonus;
  }

  // Case 4: Both undercards to the pair
  // e.g., AA vs 72o (~88%), KK vs 87s (~78%)
  // Connected undercards do slightly better
  const connected = (otherHi - otherLo) <= 2 ? 2 : 0;
  return 83 - connected - suitBonus;
}

// ── Unpaired vs Unpaired ────────────────────────────────────────────────────
function unpairedVsUnpaired(h1, h2) {
  const suitAdj1 = h1.suited ? 1.5 : 0;
  const suitAdj2 = h2.suited ? 1.5 : 0;

  // Check for domination (shared top card)
  if (h1.hi === h2.hi) {
    // e.g., AKo vs AQo (~74%), AKs vs AQs (~70%)
    if (h1.lo > h2.lo) {
      return 71 + (h1.suited ? 0 : 2) - suitAdj2;
    } else if (h1.lo < h2.lo) {
      return 29 - (h2.suited ? 0 : 2) + suitAdj1;
    } else {
      // Same hand different suits
      return 50;
    }
  }

  // Check for domination (shared low card)
  if (h1.lo === h2.lo) {
    if (h1.hi > h2.hi) {
      return 70 + (h1.suited ? 0 : 2) - suitAdj2;
    } else {
      return 30 - (h2.suited ? 0 : 2) + suitAdj1;
    }
  }

  // Both live (no shared cards)
  if (h1.hi > h2.hi) {
    // Hand 1 has the highest card
    if (h1.lo > h2.lo) {
      // Hand 1 dominates both ranks: e.g., AK vs QJ
      const rankEdge = (h1.hi - h2.hi) + (h1.lo - h2.lo);
      const base = 58 + Math.min(rankEdge, 8);
      return base + suitAdj1 - suitAdj2;
    } else if (h1.lo > h2.hi) {
      // Impossible given h1.hi > h2.hi already covered
      return 60 + suitAdj1 - suitAdj2;
    } else {
      // Interleaved: e.g., A5 vs KQ (A>K but 5<Q)
      // Higher high card helps but lower kicker hurts
      const hiEdge = h1.hi - h2.hi;
      const loDeficit = h2.lo - h1.lo;
      const base = 50 + hiEdge * 2 - loDeficit;
      return Math.max(42, Math.min(62, base)) + suitAdj1 - suitAdj2;
    }
  } else {
    // h2 has the higher high card
    return 100 - unpairedVsUnpaired(h2, h1);
  }
}

// ── Matchup description (explains the archetype) ────────────────────────────
export function describeMatchup(h1str, h2str) {
  if (h1str === h2str) return null;
  const h1 = parse(h1str);
  const h2 = parse(h2str);

  if (h1.pair && h2.pair) {
    if (h1.hi === h2.hi) return 'Same pair — virtual coin flip, suits decide minor equity edges.';
    return 'Pair over pair — the higher pair is ~80% favorite. One of the biggest edges preflop.';
  }

  if (h1.pair || h2.pair) {
    const pair = h1.pair ? h1 : h2;
    const other = h1.pair ? h2 : h1;
    if (pair.hi === other.hi || pair.hi === other.lo)
      return 'Domination — the pair has the unpaired hand crushed. Needs runner-runner or trips.';
    if (other.hi > pair.hi && other.lo > pair.hi)
      return 'Classic race — pair vs two overcards is close to a coin flip (~55/45).';
    if (other.hi > pair.hi)
      return 'Pair vs one overcard — the pair is a solid ~68% favorite.';
    return 'Pair vs undercards — the pair is a strong ~83% favorite.';
  }

  // Both unpaired
  if (h1.hi === h2.hi) {
    if (h1.lo === h2.lo) return 'Same hand, different suits — virtual coin flip.';
    return 'Kicker battle — shared high card, the better kicker has a ~70% edge.';
  }
  if (h1.lo === h2.lo)
    return 'Shared low card — the higher top card gives a ~70% advantage.';

  const hi1 = h1.hi, lo1 = h1.lo, hi2 = h2.hi, lo2 = h2.lo;
  if ((hi1 > hi2 && lo1 > lo2) || (hi2 > hi1 && lo2 > lo1))
    return 'Both cards higher — the stronger hand is a ~63% favorite.';

  return 'Interleaved ranks — top card advantage offset by a weaker kicker. Closer to a coin flip.';
}

// ── All 169 starting hands ──────────────────────────────────────────────────
export const allHands = [];

// Pairs
for (let i = RANKS.length - 1; i >= 0; i--) {
  allHands.push(RANKS[i] + RANKS[i]);
}

// Suited hands (higher rank first)
for (let i = RANKS.length - 1; i >= 1; i--) {
  for (let j = i - 1; j >= 0; j--) {
    allHands.push(RANKS[i] + RANKS[j] + 's');
  }
}

// Offsuit hands (higher rank first)
for (let i = RANKS.length - 1; i >= 1; i--) {
  for (let j = i - 1; j >= 0; j--) {
    allHands.push(RANKS[i] + RANKS[j] + 'o');
  }
}
