// ─────────────────────────────────────────────────────────────────────────────
// Tournament opening ranges by stack depth (BB) and position
// Ranges shift as stacks shrink: tighter EP, wider LP, eventually push/fold
// ─────────────────────────────────────────────────────────────────────────────

const RANKS = ['A','K','Q','J','T','9','8','7','6','5','4','3','2'];

// Parse compact poker range notation into an array of hand strings
// Supports: "66+" (pairs up), "ATs+" (suited up), "A5s-A4s" (dash range), "AKs" (single)
function parseRange(str) {
  const hands = [];
  const parts = str.split(',').map(s => s.trim()).filter(Boolean);

  for (const part of parts) {
    if (part.includes('-') && !part.endsWith('+')) {
      // Dash range: "A5s-A4s" or "K9s-K5s"
      const [start, end] = part.split('-');
      const hi = start[0];
      const suit = start[start.length - 1];
      const sIdx = RANKS.indexOf(start[1]);
      const eIdx = RANKS.indexOf(end[1]);
      const lo = Math.min(sIdx, eIdx);
      const hiR = Math.max(sIdx, eIdx);
      for (let i = lo; i <= hiR; i++) {
        hands.push(hi + RANKS[i] + suit);
      }
    } else if (part.endsWith('+')) {
      const base = part.slice(0, -1);
      if (base.length === 2 && base[0] === base[1]) {
        // Pair+: "66+" → 66, 77, ..., AA
        const idx = RANKS.indexOf(base[0]);
        for (let i = idx; i >= 0; i--) {
          hands.push(RANKS[i] + RANKS[i]);
        }
      } else {
        // Suited/offsuit+: "ATs+" → ATs, AJs, AQs, AKs
        const hi = base[0];
        const lo = base[1];
        const suit = base[2];
        const hiIdx = RANKS.indexOf(hi);
        const loIdx = RANKS.indexOf(lo);
        for (let i = hiIdx + 1; i <= loIdx; i++) {
          hands.push(hi + RANKS[i] + suit);
        }
      }
    } else {
      // Single hand: "AKs", "TT", "QJo"
      hands.push(part);
    }
  }

  return hands;
}

// ── Range definitions by stack depth ─────────────────────────────────────────
const rangeStrings = {
  100: {
    UTG: '66+, ATs+, A5s, A4s, KTs+, QTs+, JTs, T9s, AJo+, KQo',
    HJ:  '44+, A8s+, A5s, A4s, K9s+, Q9s+, J9s+, T9s, 98s, ATo+, KJo+, QJo',
    CO:  '22+, A2s+, K9s+, Q9s+, J9s+, T8s+, 98s, 87s, 76s, A8o+, KTo+, QTo+, JTo',
    BTN: '22+, A2s+, K5s+, Q7s+, J7s+, T7s+, 97s+, 86s+, 76s, 65s, 54s, A2o+, K9o+, Q9o+, J9o+, T9o, 98o',
    SB:  '22+, A2s+, K7s+, Q8s+, J8s+, T8s+, 98s, 87s, A5o+, KTo+, QTo+, JTo',
  },
  60: {
    UTG: '77+, ATs+, KQs, QJs, JTs, AJo+, KQo',
    HJ:  '55+, A9s+, KTs+, QTs+, JTs, T9s, ATo+, KJo+, QJo',
    CO:  '22+, A4s+, K9s+, QTs+, J9s+, T9s, 98s, A9o+, KTo+, QJo, JTo',
    BTN: '22+, A2s+, K7s+, Q8s+, J8s+, T7s+, 97s+, 87s, 76s, 65s, A3o+, KTo+, QTo+, JTo, T9o',
    SB:  '22+, A2s+, K9s+, Q9s+, J9s+, T8s+, 98s, 87s, A7o+, KTo+, QJo, JTo',
  },
  40: {
    UTG: '88+, AJs+, KQs, AQo+',
    HJ:  '66+, ATs+, KJs+, QJs, JTs, AJo+, KQo',
    CO:  '33+, A5s+, KTs+, QTs+, JTs, T9s, ATo+, KJo+, QJo',
    BTN: '22+, A2s+, K9s+, Q9s+, J9s+, T8s+, 98s, 87s, 76s, A5o+, KTo+, QTo+, JTo',
    SB:  '22+, A2s+, K9s+, Q9s+, J9s+, T9s, 98s, A7o+, KTo+, QJo, JTo',
  },
  25: {
    UTG: 'TT+, AJs+, KQs, AQo+',
    HJ:  '77+, ATs+, KQs, KJs, QJs, AJo+, KQo',
    CO:  '44+, A5s+, ATo+, KTs+, KQo, QJs, JTs',
    BTN: '22+, A2s+, A5o+, K8s+, KTo+, Q9s+, QJo, J9s+, T9s',
    SB:  '22+, A2s+, A3o+, K7s+, KTo+, Q9s+, QTo+, J8s+, JTo, T8s+, 98s',
  },
  15: {
    UTG: '55+, ATs+, KQs, AJo+',
    HJ:  '44+, A8s+, KTs+, QJs, JTs, ATo+, KQo',
    CO:  '22+, A5s+, ATo+, KTs+, KQo, QJs',
    BTN: '22+, A2s+, A5o+, K8s+, KTo+, Q9s+, QJo, JTs, T9s',
    SB:  '22+, A2s+, A2o+, K4s+, K9o+, Q7s+, QTo+, J8s+, JTo, T8s+, 98s',
  },
  10: {
    UTG: '22+, ATs+, KQs, AJo+, KQo',
    HJ:  '22+, A7s+, KTs+, QJs, JTs, ATo+, KJo+',
    CO:  '22+, A2s+, A8o+, KTs+, KJo+, QJs, JTs',
    BTN: '22+, A2s+, A2o+, K2s+, K8o+, Q5s+, Q9o+, J7s+, JTo, T7s+, 97s+',
    SB:  '22+, A2s+, A2o+, K2s+, K5o+, Q2s+, Q7o+, J4s+, J8o+, T6s+, T8o+, 96s+, 86s+, 76s',
  },
  5: {
    UTG: '22+, A2s+, K9s+, QTs+, JTs, A2o+, KTo+, QJo',
    HJ:  '22+, A2s+, K5s+, Q8s+, J8s+, T8s+, 98s, A2o+, K8o+, QTo+, JTo',
    CO:  '22+, A2s+, K2s+, Q4s+, J7s+, T7s+, 97s+, 87s, 76s, A2o+, K5o+, Q8o+, J9o+, T9o',
    BTN: '22+, A2s+, K2s+, Q2s+, J3s+, T4s+, 95s+, 85s+, 74s+, 64s+, 53s+, 43s, A2o+, K2o+, Q3o+, J6o+, T6o+, 97o, 87o, 86o, 76o',
    SB:  '22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 83s+, 73s+, 63s+, 52s+, 42s+, 32s, A2o+, K2o+, Q2o+, J3o+, T5o+, 95o+, 85o+, 75o, 65o, 54o',
  },
};

// Pre-parse all ranges into Sets
export const tournamentRanges = {};
for (const [bb, positions] of Object.entries(rangeStrings)) {
  tournamentRanges[bb] = {};
  for (const [pos, str] of Object.entries(positions)) {
    tournamentRanges[bb][pos] = new Set(parseRange(str));
  }
}

export const bbBreakpoints = [5, 10, 15, 25, 40, 60, 100];

export function getNearestBreakpoint(bb) {
  return bbBreakpoints.reduce((prev, curr) =>
    Math.abs(curr - bb) < Math.abs(prev - bb) ? curr : prev
  );
}

export function getTournamentRange(bb, position) {
  const bp = getNearestBreakpoint(bb);
  return tournamentRanges[bp]?.[position] ?? new Set();
}

export const positions = ['UTG', 'HJ', 'CO', 'BTN', 'SB'];

// ── Hand strength scoring (for ICM range adjustments) ────────────────────────
function handScore(hand) {
  const v = c => 14 - RANKS.indexOf(c);

  if (hand.length === 2) {
    // Pairs: AA=308, KK=286, ..., TT=220, ..., 22=44
    return v(hand[0]) * 22;
  }

  const hi = v(hand[0]);
  const lo = v(hand[1]);
  const suited = hand[2] === 's';
  const gap = hi - lo;

  let s = hi * 10 + lo * 5;
  if (suited) s += 16;
  if (gap <= 2) s += 4;
  if (gap <= 1) s += 3;
  return s;
}

// All 169 unique hands
const allHands = [];
for (let i = 0; i < 13; i++) {
  allHands.push(RANKS[i] + RANKS[i]);
  for (let j = i + 1; j < 13; j++) {
    allHands.push(RANKS[i] + RANKS[j] + 's');
    allHands.push(RANKS[i] + RANKS[j] + 'o');
  }
}

// ── ICM phases ───────────────────────────────────────────────────────────────
export const icmPhases = [
  {
    id: 'normal',
    name: 'No ICM Pressure',
    modifier: 0,
    description: 'Far from the money — play standard ranges based on stack depth.',
  },
  {
    id: 'approaching',
    name: 'Approaching Bubble',
    modifier: -20,
    description: 'Tighten marginal opens. Medium stacks should avoid risking elimination.',
  },
  {
    id: 'bubble',
    name: 'On the Bubble',
    modifier: -35,
    description: 'Maximum ICM pressure. Survival > chips for medium and short stacks.',
  },
  {
    id: 'bubble-big',
    name: 'Bubble — Big Stack',
    modifier: 15,
    description: 'Exploit ICM pressure — opponents can\'t call light, so steal wider.',
  },
  {
    id: 'itm',
    name: 'In the Money',
    modifier: -10,
    description: 'ICM pressure eases but pay jumps still matter. Slight tightening.',
  },
  {
    id: 'final-table',
    name: 'Final Table',
    modifier: -25,
    description: 'Significant pay jumps — tighten ranges, especially with medium stacks.',
  },
];

export function applyIcmModifier(baseRange, modifier) {
  if (modifier === 0 || baseRange.size === 0) return baseRange;

  const scored = [...baseRange].map(h => ({ hand: h, score: handScore(h) }));
  scored.sort((a, b) => b.score - a.score);

  if (modifier < 0) {
    // Tighten: keep top (100 + modifier)% of hands
    const keepCount = Math.max(1, Math.round(scored.length * (100 + modifier) / 100));
    return new Set(scored.slice(0, keepCount).map(s => s.hand));
  }

  // Widen: add next N strongest hands not in range
  const notInRange = allHands
    .filter(h => !baseRange.has(h))
    .map(h => ({ hand: h, score: handScore(h) }))
    .sort((a, b) => b.score - a.score);

  const addCount = Math.round(scored.length * modifier / 100);
  const toAdd = notInRange.slice(0, addCount).map(s => s.hand);
  return new Set([...baseRange, ...toAdd]);
}

// ── Stage info with insights per stack depth ─────────────────────────────────
export const stageInfo = {
  100: {
    name: 'Early Stage',
    label: 'Deep Stacked',
    color: '#2d6a4f',
    action: 'Open Raise',
    scenario: 'rfi',
    insight: 'Deep stacks — play like a cash game. Implied odds matter, so speculative hands (suited connectors, small pairs) gain value. Avoid big all-in pots without premium holdings.',
    tips: [
      'Open standard cash-game ranges',
      'Set-mine small pairs for implied odds',
      'Play suited connectors in position',
      'Avoid coin flips — no need to gamble early',
    ],
  },
  60: {
    name: 'Middle Stage',
    label: 'Antes Kick In',
    color: '#2d6a4f',
    action: 'Open Raise',
    scenario: 'rfi',
    insight: 'Antes add dead money, making steals more profitable. Tighten EP opens but widen LP steals. 3-bets become a key weapon against loose openers.',
    tips: [
      'Tighter EP opens than cash games',
      '3-bet light vs loose openers',
      'Antes make LP steals more profitable',
      'Use fold equity before stacks shrink further',
    ],
  },
  40: {
    name: 'Late-Middle',
    label: 'Stack Preservation',
    color: '#f59e0b',
    action: 'Open Raise',
    scenario: 'rfi',
    insight: 'Stack preservation matters. Fold equity is your primary weapon — use it from LP before stacks get too shallow. Avoid marginal spots from EP.',
    tips: [
      'Very tight from EP — premium hands only',
      'Widen LP steals while fold equity remains',
      'Avoid calling 3-bets with marginal hands',
      'Target tight players and medium stacks',
    ],
  },
  25: {
    name: 'Transition Zone',
    label: 'Reshove Territory',
    color: '#f59e0b',
    action: 'Raise / Shove',
    scenario: 'rfi',
    insight: 'The critical transition. Min-raise from EP and fold to 3-bets (~2.2 BB loss). From LP, shove all-in to maximize fold equity. Open-raising and calling a 3-bet is the worst option.',
    tips: [
      'EP: min-raise, fold to 3-bets',
      'LP: shove all-in for max fold equity',
      'Never open-raise then call a 3-bet here',
      'Reshove over openers is very powerful',
    ],
  },
  15: {
    name: 'Push/Fold',
    label: 'All-In or Fold',
    color: '#ef4444',
    action: 'Shove',
    scenario: 'pushfold',
    insight: 'All-in or fold from every position. Open-raising bleeds chips to 3-bets. Your fold equity is running out — use it now before your stack becomes too small to generate folds.',
    tips: [
      'All-in or fold only — no min-raises',
      'Wider shove ranges from LP',
      'Fold equity > hand strength',
      'Tighten near the bubble (ICM)',
    ],
  },
  10: {
    name: 'Short Stack',
    label: 'Urgent',
    color: '#ef4444',
    action: 'Shove',
    scenario: 'pushfold',
    insight: 'Your stack is critical. Every orbit costs 15-20% of your chips. Widen your shove range significantly — any edge is worth taking because folding is a guaranteed slow death.',
    tips: [
      'Push wider from all positions',
      'Any pair is a shove from any seat',
      'LP ranges reach 40-55% of hands',
      'Waiting = losing — take any +EV spot',
    ],
  },
  5: {
    name: 'Critical',
    label: 'Desperate',
    color: '#ef4444',
    action: 'Shove',
    scenario: 'pushfold',
    insight: 'Emergency mode — blinds cost ~30% per orbit. Shove almost any two from LP. Even weak hands have enough fold equity plus raw equity to be profitable from the button.',
    tips: [
      'Push extremely wide from LP',
      'EP ranges are still very wide (all pairs + aces)',
      'Any hand with an ace or face card is a shove',
      'One more orbit may cost 30%+ of your stack',
    ],
  },
};
