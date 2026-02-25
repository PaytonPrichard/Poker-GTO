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
  '97o','87o','76o','65o',
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
// Exported lookup: rfiRanges[playerCount][position] → Set of hand strings
// ─────────────────────────────────────────────────────────────────────────────

const s = arr => new Set(arr);

export const rfiRanges = {
  4: { UTG: s(UTG_4), BTN: s(BTN_4), SB: s(SB_4) },
  5: { UTG: s(UTG_5), CO: s(CO_5), BTN: s(BTN_5), SB: s(SB_5) },
  6: { UTG: s(UTG_6), HJ: s(HJ_6), CO: s(CO_6), BTN: s(BTN_6), SB: s(SB_6) },
  7: { UTG: s(UTG_7), 'UTG+1': s(UTG1_7), HJ: s(HJ_7), CO: s(CO_7), BTN: s(BTN_7), SB: s(SB_7) },
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
