// ─────────────────────────────────────────────────────────────────────────────
// Preflop ranges for when you are NOT the first raiser.
//
// vsOpenRanges[yourPosition][raiserPosition] → { threebet: Set, call: Set }
//   "threebet" = hands you re-raise with
//   "call"     = hands you flat-call with
//   Anything absent = fold
//
// vs3betRanges[yourOpenPosition][threeBettorPosition] → { fourbet: Set, call: Set }
//   "fourbet" = hands you 4-bet with
//   "call"    = hands you call the 3-bet with (THIS is the "call 3-bet" range)
//   Anything absent = fold
//
// All ranges are approximate GTO cash game (6-max base).
// ─────────────────────────────────────────────────────────────────────────────

const s = arr => new Set(arr);

// ── VS OPEN (facing a raise) ──────────────────────────────────────────────────

export const vsOpenRanges = {

  // ── BB defenses (most important — BB acts last, pays half price) ──────────
  BB: {
    UTG: {
      // Tight — UTG has a very strong range, BB 3-bets polarized
      threebet: s(['AA','KK','QQ','JJ','AKs','AKo','A5s','A4s']),
      call: s([
        'TT','99','88','77','66','55','44','33','22',
        'AQs','AJs','ATs','A9s','A8s','A7s','A6s','A3s','A2s',
        'KQs','KJs','KTs',
        'QJs','QTs',
        'JTs','J9s',
        'T9s','T8s',
        '98s','87s','76s',
        'AQo','AJo',
        'KQo','KJo',
      ]),
    },
    HJ: {
      threebet: s(['AA','KK','QQ','JJ','TT','AKs','AKo','AQs','A5s','A4s','A3s','KQs']),
      call: s([
        '99','88','77','66','55','44','33','22',
        'AJs','ATs','A9s','A8s','A7s','A6s','A2s',
        'KJs','KTs','K9s',
        'QJs','QTs','Q9s',
        'JTs','J9s','J8s',
        'T9s','T8s',
        '98s','97s','87s','86s','76s','65s',
        'AJo','ATo',
        'KQo','KJo','KTo',
        'QJo',
      ]),
    },
    CO: {
      threebet: s(['AA','KK','QQ','JJ','TT','AKs','AKo','AQs','A5s','A4s','A3s','A2s','KQs','99']),
      call: s([
        '88','77','66','55','44','33','22',
        'AJs','ATs','A9s','A8s','A7s','A6s',
        'KJs','KTs','K9s','K8s',
        'QJs','QTs','Q9s','Q8s',
        'JTs','J9s','J8s',
        'T9s','T8s','T7s',
        '98s','97s','87s','86s','76s','75s','65s','64s','54s',
        'AJo','ATo','A9o',
        'KQo','KJo','KTo',
        'QJo','QTo',
        'JTo','T9o',
      ]),
    },
    BTN: {
      // BTN opens widest so BB 3-bets wider + calls wider
      threebet: s(['AA','KK','QQ','JJ','TT','AKs','AKo','AQs','AJs','A5s','A4s','A3s','A2s','KQs','K9s','99']),
      call: s([
        '88','77','66','55','44','33','22',
        'ATs','A9s','A8s','A7s','A6s',
        'KJs','KTs','K8s','K7s',
        'QJs','QTs','Q9s','Q8s',
        'JTs','J9s','J8s',
        'T9s','T8s','T7s',
        '98s','97s','96s','87s','86s','85s','76s','75s','65s','64s','54s','53s','43s',
        'AJo','ATo','A9o','A8o',
        'KQo','KJo','KTo','K9o',
        'QJo','QTo',
        'JTo','J9o',
        'T9o','98o',
      ]),
    },
    SB: {
      // BB vs SB open — BB has position postflop (acts second of the two remaining players)
      threebet: s(['AA','KK','QQ','JJ','TT','99','AKs','AKo','AQs','A5s','A4s','KQs']),
      call: s([
        '88','77','66','55','44','33','22',
        'AJs','ATs','A9s','A8s','A7s','A6s','A3s','A2s',
        'KJs','KTs','K9s',
        'QJs','QTs','Q9s',
        'JTs','J9s',
        'T9s','T8s',
        '98s','87s','76s','65s',
        'AJo','ATo',
        'KQo','KJo',
        'QJo',
      ]),
    },
  },

  // ── SB defenses (OOP vs BTN mostly — GTO tilts toward 3-bet or fold) ─────
  SB: {
    BTN: {
      // Mostly 3-bet or fold OOP; call range is narrow
      threebet: s([
        'AA','KK','QQ','JJ','TT','99','88',
        'AKs','AQs','AJs','ATs','A9s','A5s','A4s','A3s','A2s',
        'KQs','KJs','K8s',
        'QJs','Q8s',
        'JTs',
        'AKo','AQo','AJo',
        'KQo',
      ]),
      call: s([
        '77','66',
        'A8s','A7s','A6s',
        'KTs','K9s','K7s',
        'QTs','Q9s',
        'J9s','J8s',
        'T9s','T8s',
        '98s','97s','87s',
      ]),
    },
    CO: {
      threebet: s(['AA','KK','QQ','JJ','TT','AKs','AKo','AQs','A5s','A4s','KQs']),
      call: s([
        '99','88','77',
        'AJs','ATs','A9s',
        'KJs','KTs',
        'QJs',
        'JTs','T9s',
      ]),
    },
    HJ: {
      threebet: s(['AA','KK','QQ','JJ','AKs','AKo','AQs','A5s','A4s','KQs']),
      call: s([
        'TT','99','88',
        'AJs','ATs',
        'KQs','KJs',
        'QJs','JTs',
      ]),
    },
    UTG: {
      threebet: s(['AA','KK','QQ','AKs','AKo','JJ']),
      call: s(['TT','99','AQs','AJs','KQs','QJs','JTs','AQo']),
    },
  },

  // ── BTN cold-calls or 3-bets (IP) ─────────────────────────────────────────
  BTN: {
    CO: {
      threebet: s(['AA','KK','QQ','JJ','TT','AKs','AKo','AQs','A5s','A4s','A3s','KQs','QJs']),
      call: s([
        '99','88','77','66','55','44','33','22',
        'AJs','ATs','A9s','A8s','A7s','A6s',
        'KJs','KTs','K9s','K8s',
        'QTs','Q9s',
        'J9s','J8s',
        'T9s','T8s','T7s',
        '98s','97s','87s','86s','76s','75s','65s',
        'AJo','ATo','A9o',
        'KQo','KJo','KTo',
        'QJo','QTo',
        'JTo','T9o',
      ]),
    },
    HJ: {
      threebet: s(['AA','KK','QQ','JJ','AKs','AKo','AQs','A5s','A4s','KQs','TT']),
      call: s([
        'TT','99','88','77','66','55','44',
        'AJs','ATs','A9s','A8s',
        'KJs','KTs','K9s',
        'QJs','QTs','Q9s',
        'JTs','J9s',
        'T9s','T8s',
        '98s','87s','76s','65s',
        'AJo','ATo',
        'KQo','KJo',
        'QJo',
      ]),
    },
    UTG: {
      // Very tight — UTG range is strong
      threebet: s(['AA','KK','QQ','AKs','AKo','AQs','JJ']),
      call: s([
        'JJ','TT','99','88','77',
        'AJs','ATs',
        'KQs','KJs',
        'QJs','JTs','T9s',
        'AQo','AJo',
        'KQo',
      ]),
    },
  },

  // ── CO cold-calls or 3-bets ────────────────────────────────────────────────
  CO: {
    HJ: {
      threebet: s(['AA','KK','QQ','JJ','TT','AKs','AKo','AQs','A5s','A4s','KQs']),
      call: s([
        '99','88','77','66',
        'AJs','ATs','A9s',
        'KJs','KTs',
        'QJs','QTs',
        'JTs','J9s',
        'T9s','T8s',
        '98s','87s',
        'AJo','ATo',
        'KQo','KJo',
        'QJo',
      ]),
    },
    UTG: {
      threebet: s(['AA','KK','QQ','JJ','AKs','AKo','AQs']),
      call: s([
        'TT','99','88','77',
        'AJs','ATs',
        'KQs','KJs',
        'QJs','JTs',
        'AQo','AJo',
        'KQo',
      ]),
    },
  },

  // ── HJ cold-calls or 3-bets ────────────────────────────────────────────────
  HJ: {
    UTG: {
      threebet: s(['AA','KK','QQ','AKs','AKo','JJ']),
      call: s([
        'JJ','TT','99','88',
        'AQs','AJs',
        'KQs',
        'QJs','JTs',
        'AQo',
      ]),
    },
  },
};

// ── VS 3-BET (you opened, now facing a 3-bet) ─────────────────────────────────
// "fourbet" = hands to 4-bet with
// "call"    = hands to call the 3-bet with
// Anything absent = fold

export const vs3betRanges = {

  // ── BTN opened, facing 3-bet (BTN is IP vs SB/BB 3-bets) ────────────────
  BTN: {
    SB: {
      // IP: call range is wider
      fourbet: s(['AA','KK','AKs','AKo','A5s','A4s','A3s']),
      call: s([
        'QQ','JJ','TT','99','88',
        'AQs','AJs','ATs',
        'KQs','KJs','K9s',
        'QJs','JTs','T9s',
        'AQo',
        'KQo',
      ]),
    },
    BB: {
      // IP: similar to vs SB, slightly narrower 4-bet bluffs
      fourbet: s(['AA','KK','AKs','AKo','A5s','A4s']),
      call: s([
        'QQ','JJ','TT','99','88',
        'AQs','AJs','ATs',
        'KQs','KJs',
        'QJs','JTs','T9s',
        'AQo',
        'KQo',
      ]),
    },
  },

  // ── CO opened, facing 3-bet (OOP — tighter call range) ──────────────────
  CO: {
    BTN: {
      // OOP: tighten call range significantly
      fourbet: s(['AA','KK','AKs','AKo','QQ','A5s','A4s']),
      call: s([
        'JJ','TT','99',
        'AQs','AJs',
        'KQs','KJs',
        'QJs','JTs',
        'AQo',
      ]),
    },
    SB: {
      fourbet: s(['AA','KK','AKs','AKo','QQ','A5s','A4s']),
      call: s([
        'JJ','TT','99',
        'AQs','AJs',
        'KQs',
        'QJs','JTs',
        'AQo',
      ]),
    },
    BB: {
      fourbet: s(['AA','KK','AKs','AKo','A5s','A4s']),
      call: s([
        'QQ','JJ','TT','99',
        'AQs','AJs',
        'KQs',
        'JTs',
        'AQo',
      ]),
    },
  },

  // ── HJ opened, facing 3-bet (deepest OOP position) ──────────────────────
  HJ: {
    CO: {
      fourbet: s(['AA','KK','AKs','AKo','A5s','A4s']),
      call: s(['QQ','JJ','TT','AQs','KQs','AQo']),
    },
    BTN: {
      fourbet: s(['AA','KK','AKs','AKo','A5s']),
      call: s(['QQ','JJ','TT','AQs','KQs','AQo']),
    },
    SB: {
      fourbet: s(['AA','KK','AKs','AKo','A5s']),
      call: s(['QQ','JJ','TT','AQs','KQs']),
    },
    BB: {
      fourbet: s(['AA','KK','AKs','AKo','A5s']),
      call: s(['QQ','JJ','TT','AQs','KQs']),
    },
  },

  // ── UTG opened, facing 3-bet (most OOP, tightest range) ─────────────────
  // Generic — UTG vs any 3-bet; position of 3-bettor matters less when this OOP
  UTG: {
    HJ:  { fourbet: s(['AA','KK','AKs','AKo']), call: s(['QQ','JJ','TT','AQs','KQs','AQo']) },
    CO:  { fourbet: s(['AA','KK','AKs','AKo']), call: s(['QQ','JJ','TT','AQs','KQs']) },
    BTN: { fourbet: s(['AA','KK','AKs','AKo']), call: s(['QQ','JJ','TT','AQs','KQs']) },
    SB:  { fourbet: s(['AA','KK','AKs','AKo']), call: s(['QQ','JJ','TT','AQs']) },
    BB:  { fourbet: s(['AA','KK','AKs','AKo']), call: s(['QQ','JJ','TT','AQs']) },
  },

  // ── SB opened, facing BB 3-bet (OOP, only one possible 3-bettor) ────────
  SB: {
    BB: {
      fourbet: s(['AA','KK','QQ','AKs','AKo','A5s','A4s']),
      call: s([
        'JJ','TT','99',
        'AQs','AJs',
        'KQs','KJs',
        'QJs','JTs',
        'AQo',
      ]),
    },
  },
};

// ── Position ordering for validation (6-max as base) ─────────────────────────
// Used to determine which positions appear to the left of a given seat
export const positionOrder = {
  4: ['UTG', 'BTN', 'SB', 'BB'],
  5: ['UTG', 'CO',  'BTN', 'SB', 'BB'],
  6: ['UTG', 'HJ',  'CO',  'BTN', 'SB', 'BB'],
  7: ['UTG', 'UTG+1', 'HJ', 'CO', 'BTN', 'SB', 'BB'],
};
