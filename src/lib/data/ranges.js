// ─────────────────────────────────────────────────────────────────────────────
// Preflop RFI (Raise First In) ranges — approximate GTO for cash game 6-max.
// Each position array lists the hands that should be opened (raise).
// Hands absent from the list = fold.
// Ranges are additive: each position opens all the hands from the tighter
// positions plus its own additions, so CO_6 is a superset of HJ_6, etc.
// ─────────────────────────────────────────────────────────────────────────────

// ── 6-MAX ────────────────────────────────────────────────────────────────────

const UTG_6 = [
  // Pairs 77+
  'AA','KK','QQ','JJ','TT','99','88','77',
  // Suited aces
  'AKs','AQs','AJs','ATs','A9s','A8s','A5s','A4s','A3s',
  // Suited broadways
  'KQs','KJs','KTs','K9s',
  'QJs','QTs',
  'JTs','J9s',
  // Suited connectors / one-gappers
  'T9s','T8s','98s','87s','76s','65s','54s',
  // Offsuit broadway
  'AKo','AQo','AJo','ATo',
  'KQo','KJo',
];

const HJ_6 = [
  ...UTG_6,
  // Pairs 55-66
  '66','55',
  // Suited additions
  'A7s','A6s',
  'K8s','K7s',
  'Q9s','Q8s',
  'J8s',
  'T7s',
  '97s','86s','75s','64s','53s',
  // Offsuit additions
  'KTo','QJo',
];

const CO_6 = [
  ...HJ_6,
  // Pairs 22-44
  '44','33','22',
  // Suited additions
  'A2s',
  'K6s','K5s',
  'Q7s',
  'J7s',
  'T6s',
  '96s','85s','74s','63s','43s',
  // Offsuit additions
  'A9o','A8o',
  'K9o','K8o',
  'QTo','JTo','T9o',
];

const BTN_6 = [
  ...CO_6,
  // Suited additions
  'K4s','K3s','K2s',
  'Q6s','Q5s','Q4s','Q3s','Q2s',
  'J6s','J5s','J4s',
  'T5s','T4s',
  '95s','84s','73s','62s','52s','42s','32s',
  // Offsuit additions
  'A7o','A6o','A5o','A4o','A3o','A2o',
  'K7o','K6o','K5o',
  'Q9o','Q8o',
  'J9o','J8o',
  'T8o','T7o',
  '98o','97o','87o','76o','65o',
];

// SB opens vs BB only — can play wide but must still be +EV OOP
const SB_6 = [
  // All pairs
  'AA','KK','QQ','JJ','TT','99','88','77','66','55','44','33','22',
  // All suited aces
  'AKs','AQs','AJs','ATs','A9s','A8s','A7s','A6s','A5s','A4s','A3s','A2s',
  // Suited kings
  'KQs','KJs','KTs','K9s','K8s','K7s','K6s',
  // Suited queens
  'QJs','QTs','Q9s','Q8s','Q7s',
  // Suited jacks
  'JTs','J9s','J8s','J7s',
  // Suited tens
  'T9s','T8s','T7s','T6s',
  // Lower suited
  '98s','97s','96s','87s','86s','85s','76s','75s','65s','64s','54s','53s','43s',
  // Offsuit aces
  'AKo','AQo','AJo','ATo','A9o','A8o','A7o','A6o','A5o','A4o',
  // Offsuit kings
  'KQo','KJo','KTo','K9o',
  // Offsuit broadways
  'QJo','QTo','Q9o',
  'JTo','J9o',
  'T9o','T8o',
  '98o','87o','76o',
];

// ── 7-MAX ────────────────────────────────────────────────────────────────────

// UTG plays tightest of all — tighter than UTG 6-max
const UTG_7 = [
  'AA','KK','QQ','JJ','TT','99','88',
  'AKs','AQs','AJs','ATs','A9s','A5s','A4s','A3s',
  'KQs','KJs','KTs',
  'QJs','QTs',
  'JTs',
  'T9s',
  '98s','87s','76s','65s',
  'AKo','AQo','AJo','ATo',
  'KQo',
];

// UTG+1 in 7-max ≈ UTG in 6-max
const UTG1_7 = [...UTG_6];

// HJ/CO/BTN/SB in 7-max ≈ same as 6-max (table is 1 player deeper but positions align)
const HJ_7  = [...HJ_6];
const CO_7  = [...CO_6];
const BTN_7 = [...BTN_6];
const SB_7  = [...SB_6];

// ── 5-MAX ────────────────────────────────────────────────────────────────────

// UTG in 5-max ≈ HJ in 6-max (one fewer player to act behind)
const UTG_5 = [...HJ_6];
const CO_5  = [
  ...CO_6,
  // Slightly wider than 6-max CO with fewer players behind
  'K7s','Q8s','J8s','T7s','97s','86s',
  'A7o','K9o','QJo',
];
const BTN_5 = [...BTN_6];
const SB_5  = [...SB_6];

// ── 4-MAX ────────────────────────────────────────────────────────────────────

// UTG in 4-max ≈ CO in 6-max (very short-handed)
const UTG_4 = [
  ...CO_6,
  'K7s','Q8s','J8s','T7s','97s','86s','75s',
  'A7o','A6o','A5o',
  'K9o','K8o',
  'QJo','QTo',
  'JTo',
  'T9o',
];
const BTN_4 = [
  ...BTN_6,
  'J3s','J2s','T3s','T2s','94s','93s','83s','72s',
  'K4o','K3o','K2o',
  'Q7o','Q6o',
  'J8o','J7o',
  'T7o','T6o',
  '96o','86o','75o',
];
const SB_4  = [...SB_6];

// ─────────────────────────────────────────────────────────────────────────────
// Mixed / judgment-call hands per position.
// Map<hand, { raise?, call?, fold? }> — values are 0..1 frequencies.
// Hand in this map = solver mixes its action. Empty object {} means "we know
// it's mixed but don't claim a specific frequency." A hand can be in both the
// raise list AND this map; the visual treats it as mixed (striped cell).
// Frequencies below are approximate solver consensus for 100bb cash 6-max,
// rounded to nearest 5%. Refine when authoritative solver data is sourced.
// ─────────────────────────────────────────────────────────────────────────────

const BTN_6_MIXED = {
  // Offsuit connectors / gappers — classic judgment-call territory
  '98o': { raise: 0.70 },
  '97o': { raise: 0.35 },
  '87o': { raise: 0.60 },
  '76o': { raise: 0.75 },
  '65o': { raise: 0.40 },
  // Offsuit kings / aces (bottom of range)
  'K5o': { raise: 0.45 },
  'K6o': {},
  'K7o': {},
  'A2o': {},
  'A3o': {},
  'A4o': {},
  // Offsuit broadway-gap / suited-disconnected
  'J8o': { raise: 0.55 },
  'T7o': { raise: 0.30 },
  'T8o': {},
  // Suited bottom of range — frequencies vary too much to claim specifics
  'K2s': {}, 'K3s': {}, 'K4s': {},
  'Q2s': {}, 'Q3s': {}, 'Q4s': {},
  'J4s': {}, 'J5s': {},
  'T4s': {}, 'T5s': {},
  '95s': {}, '84s': {}, '73s': {}, '62s': {}, '52s': {}, '42s': {}, '32s': {},
};

// UTG (6-max) — tightest range. Almost every hand is a pure raise or pure
// fold. A small handful sit on the edge.
const UTG_6_MIXED = {
  'ATo': { raise: 0.65 },  // edge: solver mixes vs tighter ranges behind
  'KJo': { raise: 0.55 },
  'QJo': { raise: 0.30 },
  '66':  {},               // sometimes folded preflop in early UTG strategies
  '22':  {},               // bottom pairs mix more in tighter spots
};

// HJ (6-max) — opens wider than UTG. More offsuit broadways mix, suited
// connectors are mostly pure raises but bottom suited Ax edges in.
const HJ_6_MIXED = {
  // Offsuit broadways at the edge
  'KTo': { raise: 0.80 },
  'QJo': { raise: 0.70 },
  'QTo': { raise: 0.45 },
  'JTo': { raise: 0.40 },
  // Offsuit aces
  'A8o': { raise: 0.60 },
  'A7o': { raise: 0.30 },
  // Suited bottom of range
  'A2s': {}, 'A3s': {},   // sometimes folded UTG-style by certain solvers
  '54s': { raise: 0.55 },
  '65s': { raise: 0.75 },
  // Small pairs
  '22':  { raise: 0.70 },
  '33':  { raise: 0.85 },
};

// CO (6-max) — significantly wider; lots of mixed bottom-of-range hands.
const CO_6_MIXED = {
  // Offsuit aces
  'A7o': { raise: 0.75 },
  'A6o': { raise: 0.45 },
  'A5o': { raise: 0.50 },
  'A4o': { raise: 0.30 },
  // Offsuit kings
  'K9o': { raise: 0.70 },
  'K8o': { raise: 0.35 },
  // Offsuit broadways
  'QTo': { raise: 0.85 },
  'JTo': { raise: 0.75 },
  'T9o': { raise: 0.40 },
  // Offsuit gappers / suited-connector cousins
  'J9o': { raise: 0.45 },
  '98o': { raise: 0.30 },
  '87o': {},
  // Suited bottom — suited gappers and small Kx/Qx that often mix
  'K5s': { raise: 0.85 },
  'K4s': { raise: 0.60 },
  'K3s': { raise: 0.45 },
  'K2s': { raise: 0.35 },
  'Q5s': { raise: 0.60 },
  'Q4s': { raise: 0.35 },
  'J6s': { raise: 0.50 },
  'T6s': { raise: 0.35 },
  '53s': { raise: 0.45 },
  '43s': { raise: 0.30 },
};

// UTG (7-max) — even tighter than 6-max UTG (one more player behind).
// Only a handful of edge hands mix at all.
const UTG_7_MIXED = {
  'ATo': { raise: 0.40 },
  'KJo': { raise: 0.35 },
  'KQo': { raise: 0.85 },
  '22':  { raise: 0.65 },
};

// UTG (4-max) — extends 6-max CO range. New edge hands beyond CO_6_MIXED
// that mix at the bottom of the wider 4-max UTG range. Specific 4-max solver
// data is sparse; using {} for hands where mixing is plausible but frequency
// can't be confidently claimed.
const UTG_4_EXTRA_MIXED = {
  // New offsuit aces at the edge
  'A5o': { raise: 0.55 },
  'A6o': { raise: 0.40 },
  // New offsuit kings
  'K8o': { raise: 0.45 },
  'K9o': { raise: 0.80 },
  // Offsuit broadways
  'QTo': { raise: 0.70 },
  'JTo': { raise: 0.65 },
  'T9o': { raise: 0.50 },
  // Suited gappers / connectors at the edge
  'K7s': {}, 'Q8s': {}, 'J8s': {}, 'T7s': {}, '97s': {}, '86s': {}, '75s': {},
};

// BTN (4-max) — extends 6-max BTN with very wide bottom-of-range hands.
// All of these are deep edge hands; using {} since we can't honestly claim
// 4-max BTN specific frequencies for hands like J3s or 72s.
const BTN_4_EXTRA_MIXED = {
  // Wider suited at the bottom
  'J3s': {}, 'J2s': {}, 'T3s': {}, 'T2s': {}, '94s': {}, '93s': {}, '83s': {}, '72s': {},
  // Wider offsuit kings/queens/jacks
  'K4o': {}, 'K3o': {}, 'K2o': {}, 'Q7o': {}, 'Q6o': {},
  'J7o': {}, 'T6o': {}, '96o': {}, '86o': {}, '75o': {},
};

// SB (6-max) — RFI is the most complex preflop spot. Solver mixes between
// open-raise, limp, and fold across many hands. The `raise` value here is the
// open-raise frequency only; the residual is either limp or fold depending on
// the hand. For full SB strategy, see Preflop Ranges → SB tab notes.
const SB_6_MIXED = {
  // Offsuit aces — frequently mixed between raise/limp/fold
  'A2o': { raise: 0.60 },
  'A3o': { raise: 0.65 },
  'A4o': { raise: 0.70 },
  'A5o': { raise: 0.80 },
  'A7o': { raise: 0.75 },
  // Offsuit kings — bottom mix heavily
  'K8o': { raise: 0.55 },
  'K7o': { raise: 0.40 },
  'K6o': { raise: 0.30 },
  // Offsuit queens / broadway gaps
  'Q9o': { raise: 0.55 },
  'Q8o': { raise: 0.30 },
  'J9o': { raise: 0.60 },
  'T9o': { raise: 0.65 },
  // Offsuit connectors
  '98o': { raise: 0.40 },
  '87o': { raise: 0.30 },
  // Suited bottom — Kx/Qx/Jx and small suited gappers
  'K3s': { raise: 0.65 },
  'K2s': { raise: 0.55 },
  'Q5s': { raise: 0.75 },
  'Q4s': { raise: 0.55 },
  'Q3s': { raise: 0.40 },
  'J5s': { raise: 0.65 },
  'J4s': { raise: 0.45 },
  'T5s': { raise: 0.40 },
  '53s': { raise: 0.55 },
  '43s': { raise: 0.40 },
  '32s': { raise: 0.30 },
};

// ─────────────────────────────────────────────────────────────────────────────
// Exported lookup: rfiRanges[playerCount][position] → Set of hand strings
// ─────────────────────────────────────────────────────────────────────────────

const s = arr => new Set(arr);
const m = (obj = {}) => new Map(Object.entries(obj));

export const rfiRanges = {
  4: { UTG: s(UTG_4), BTN: s(BTN_4), SB: s(SB_4) },
  5: { UTG: s(UTG_5), CO: s(CO_5), BTN: s(BTN_5), SB: s(SB_5) },
  6: { UTG: s(UTG_6), HJ: s(HJ_6), CO: s(CO_6), BTN: s(BTN_6), SB: s(SB_6) },
  7: { UTG: s(UTG_7), 'UTG+1': s(UTG1_7), HJ: s(HJ_7), CO: s(CO_7), BTN: s(BTN_7), SB: s(SB_7) },
};

// Mixed-frequency overlay. Most non-6-max positions alias the 6-max equivalent
// since the underlying RFI ranges are also aliased (e.g. UTG_5 = [...HJ_6]).
const EMPTY = m();
const UTG_6_MIXED_MAP = m(UTG_6_MIXED);
const HJ_6_MIXED_MAP  = m(HJ_6_MIXED);
const CO_6_MIXED_MAP  = m(CO_6_MIXED);
const BTN_MIXED_MAP   = m(BTN_6_MIXED);
const SB_6_MIXED_MAP  = m(SB_6_MIXED);

// 4-max: combine 6-max base + extra edge hands for the wider 4-max ranges
const UTG_4_MIXED_MAP = m({ ...CO_6_MIXED, ...UTG_4_EXTRA_MIXED });
const BTN_4_MIXED_MAP = m({ ...BTN_6_MIXED, ...BTN_4_EXTRA_MIXED });

// 7-max UTG has its own tight map
const UTG_7_MIXED_MAP = m(UTG_7_MIXED);

export const mixedRanges = {
  // 4-max: UTG_4 = CO_6 + wider, BTN_4 = BTN_6 + wider, SB_4 = SB_6
  4: { UTG: UTG_4_MIXED_MAP, BTN: BTN_4_MIXED_MAP, SB: SB_6_MIXED_MAP },
  // 5-max: UTG_5 = HJ_6, CO_5 ≈ CO_6, BTN_5 = BTN_6, SB_5 = SB_6
  5: { UTG: HJ_6_MIXED_MAP, CO: CO_6_MIXED_MAP, BTN: BTN_MIXED_MAP, SB: SB_6_MIXED_MAP },
  6: { UTG: UTG_6_MIXED_MAP, HJ: HJ_6_MIXED_MAP, CO: CO_6_MIXED_MAP, BTN: BTN_MIXED_MAP, SB: SB_6_MIXED_MAP },
  // 7-max: UTG_7 own map (tighter), UTG+1 = UTG_6, HJ/CO/BTN/SB alias 6-max
  7: { UTG: UTG_7_MIXED_MAP, 'UTG+1': UTG_6_MIXED_MAP, HJ: HJ_6_MIXED_MAP, CO: CO_6_MIXED_MAP, BTN: BTN_MIXED_MAP, SB: SB_6_MIXED_MAP },
};

// Standard open sizes (in BBs) per position
export const openSizes = {
  4: { UTG: '2.5x',  BTN: '2.5x',  SB: '3x'   },
  5: { UTG: '2.5x',  CO: '2.5x',   BTN: '2.5x', SB: '3x'   },
  6: { UTG: '3x',    HJ: '2.5x',   CO: '2.5x',  BTN: '2.5x', SB: '3x' },
  7: { UTG: '3x',    'UTG+1': '3x', HJ: '2.5x', CO: '2.5x',  BTN: '2.5x', SB: '3x' },
};

// 3-bet sizing guidelines
export const threeBetSizes = {
  IP:  '3x the open (e.g. vs 2.5x open → 3-bet to 7.5x)',
  OOP: '4x the open (e.g. vs 2.5x open → 3-bet to 10x)',
};
