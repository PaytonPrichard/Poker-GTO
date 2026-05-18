// ─────────────────────────────────────────────────────────
//  HUD Stats — definitions, player archetypes, interpreter
//  Online 6-max NL Hold'em is the reference frame.
//  Live and full-ring ranges drift; see notes on each card.
// ─────────────────────────────────────────────────────────

/**
 * Core HUD stats every player should be able to read.
 * Ranges are rough but practical for opponent typing.
 */
export const statDefinitions = [
  {
    abbr: 'VPIP',
    name: 'Voluntarily Put $ In Pot',
    definition:
      'Percent of hands where the player puts chips in preflop, excluding the forced blind. Calls, raises, and 3-bets count; folded blinds and limps-folded do not.',
    ranges: [
      { label: 'NIT',           value: '12-18%' },
      { label: 'TAG (solid)',   value: '20-26%' },
      { label: 'LAG',           value: '28-34%' },
      { label: 'Loose-passive', value: '35-45%' },
      { label: 'Maniac / whale', value: '45%+' },
    ],
    insight:
      'The single most useful stat. A VPIP under 18 means the player only enters with strong hands — overfold against their raises and fold to their value bets. A VPIP over 40 means they show up with junk — value-bet wider and bluff less.',
    sampleSize: 'Reliable after ~50 hands.',
  },
  {
    abbr: 'PFR',
    name: 'Preflop Raise',
    definition:
      'Percent of hands the player raises preflop (open-raise, isolate, or 3-bet). VPIP minus PFR is the "limp/call gap" — a key passivity indicator.',
    ranges: [
      { label: 'NIT',         value: '10-16%' },
      { label: 'TAG',         value: '18-23%' },
      { label: 'LAG',         value: '24-30%' },
      { label: 'Passive fish', value: '5-12%' },
      { label: 'Maniac',      value: '35%+' },
    ],
    insight:
      'Compare PFR to VPIP. A 22/20 player is aggressive and balanced. A 30/12 player is calling everything — that gap of 18 is the green light to value-bet thinly and stop bluffing them. A small gap (≤4) with high PFR means a competent reg.',
    sampleSize: 'Reliable after ~75 hands.',
  },
  {
    abbr: '3B',
    name: '3-Bet Percentage',
    definition:
      'Percent of opportunities the player re-raises a preflop open. Measured per spot or aggregated; the aggregated number is what HUDs usually display.',
    ranges: [
      { label: 'NIT',     value: '2-4%' },
      { label: 'TAG',     value: '6-9%' },
      { label: 'LAG',     value: '10-13%' },
      { label: 'Maniac',  value: '14%+' },
    ],
    insight:
      'Under 4% means almost only QQ+/AK — fold all but premium hands when they 3-bet. Over 10% means they have bluffs — defend wider and consider 4-bet bluffs. A regular with 7-9% is on a balanced solver range.',
    sampleSize: 'Needs ~150 hands to stabilize.',
  },
  {
    abbr: 'F3B',
    name: 'Fold to 3-Bet',
    definition:
      'When the player opens and faces a 3-bet, the percent of the time they fold. The single best exploit-finder against opening ranges.',
    ranges: [
      { label: 'Over-folder',  value: '70%+' },
      { label: 'Standard',     value: '55-65%' },
      { label: 'Defender',     value: '45-54%' },
      { label: 'Calling station', value: '<40%' },
    ],
    insight:
      'Anyone folding above 65% should get 3-bet bluffed relentlessly with hands like A5s, KQo, suited connectors — your bluff prints money before the flop even comes. Below 45% means they call wide; size up your value 3-bets and stop bluffing them.',
    sampleSize: 'Needs ~50 facing-3-bet spots; this often takes 500+ hands.',
  },
  {
    abbr: 'CB Flop',
    name: 'C-Bet Flop',
    definition:
      'When the player is the preflop aggressor heads-up and sees a flop, the percent they continuation-bet.',
    ranges: [
      { label: 'NIT',        value: '50-65%' },
      { label: 'TAG',        value: '60-75%' },
      { label: 'LAG / auto-cbet', value: '80%+' },
      { label: 'Honest fish', value: '40-55%' },
    ],
    insight:
      'A player who c-bets above 80% is hitting "auto-bet" — check-raise them wider, especially on textures bad for the preflop raiser (low connected boards). Below 50% means their c-bet has hands — fold marginal stuff and don\'t hero-call.',
    sampleSize: 'Reliable after ~30 c-bet spots.',
  },
  {
    abbr: 'F-CB',
    name: 'Fold to C-Bet',
    definition:
      'When the player called preflop and faces a continuation bet, percent they fold.',
    ranges: [
      { label: 'Over-folder',  value: '65%+' },
      { label: 'Standard',     value: '50-60%' },
      { label: 'Sticky',       value: '40-49%' },
      { label: 'Station',      value: '<40%' },
    ],
    insight:
      'Above 65% is the goldmine — c-bet 100% on any flop where you have a backdoor, regardless of equity. Below 45% means they\'re calling with weak pairs and gutshots — c-bet only with real hands or strong draws, and barrel turns when scary cards land.',
    sampleSize: 'Reliable after ~40 spots.',
  },
  {
    abbr: 'WTSD',
    name: 'Went to Showdown',
    definition:
      'Of hands the player saw a flop, percent that reached showdown. Measures how often they don\'t fold by the river.',
    ranges: [
      { label: 'Reg',           value: '24-28%' },
      { label: 'Tight / folds rivers', value: '20-23%' },
      { label: 'Station',       value: '30-35%' },
      { label: 'Spew',          value: '35%+' },
    ],
    insight:
      'High WTSD plus low W$SD = pays off bluffs (calling station). Low WTSD plus high W$SD = folds rivers under pressure (overfold target — bluff them on scary runouts).',
    sampleSize: 'Needs ~100 flops seen.',
  },
  {
    abbr: 'W$SD',
    name: 'Won $ at Showdown',
    definition:
      'Of hands that went to showdown, percent the player won. A measure of showdown hand strength.',
    ranges: [
      { label: 'Strong showdown range', value: '52-56%' },
      { label: 'Average',               value: '48-52%' },
      { label: 'Calling station',       value: '<48%' },
      { label: 'Nit who only shows up with the nuts', value: '58%+' },
    ],
    insight:
      'Read W$SD alongside WTSD. A reg sits near 50/50 on both. A station has high WTSD and low W$SD — bluff less, value-bet thinner. A "river-folder" type has low WTSD and high W$SD — they only get there with hands, so call lighter when they bet.',
    sampleSize: 'Noisy until 100+ showdowns.',
  },
  {
    abbr: 'AGG',
    name: 'Aggression Factor',
    definition:
      'Postflop: (bets + raises) / calls. A pure-aggression measure that ignores folds. AGG of 3 means the player bets or raises three times for every call.',
    ranges: [
      { label: 'Passive',  value: '1.0-1.5' },
      { label: 'TAG',      value: '2.5-3.5' },
      { label: 'LAG',      value: '3.5-5' },
      { label: 'Maniac',   value: '5+' },
    ],
    insight:
      'AGG is most useful per street. A player with low flop AGG but high turn AGG is delayed-c-betting and trapping. Watch their river AGG specifically — that\'s where money comes in. AGG above 5 means call down lighter.',
    sampleSize: 'Stabilizes around 200 postflop spots.',
  },
];

/**
 * Player archetypes — recognizable patterns from a few stats.
 * `statLine` is the canonical VPIP/PFR/3B sketch.
 */
export const playerArchetypes = [
  {
    id: 'nit',
    name: 'NIT',
    tagline: 'Tight, plays only premiums, folds too much postflop',
    statLine: '14 / 12 / 3',
    fingerprint: 'VPIP < 18, PFR within 4 of VPIP, 3B < 5',
    description:
      'Plays a tight, value-heavy range. Rarely 3-bets or bluffs. When they raise preflop, they have a hand. When they fold, you can take it without much equity.',
    exploits: [
      'Steal their blinds relentlessly — they fold blinds at 80%+',
      '3-bet bluff often (any suited Ax, suited connectors) — they fold A-T-A-J unsuited frequently',
      'Fold marginal hands to their open from EP — they show up with TT+/AQ+',
      'When they c-bet, give them credit. When they check turn, take the pot away.',
    ],
  },
  {
    id: 'tag',
    name: 'TAG',
    tagline: 'Tight-aggressive solid reg — the GTO baseline',
    statLine: '22 / 19 / 7',
    fingerprint: 'VPIP 19-26, PFR within 4 of VPIP, 3B 6-9, F3B 55-65',
    description:
      'A competent regular playing close to solver baselines. Balanced 3-bet ranges, reasonable c-bet frequencies, doesn\'t leak much. Hard to exploit unless you find a specific tell.',
    exploits: [
      'Play your own GTO baseline — don\'t try to outlevel a balanced opponent',
      'Watch for population-level leaks: most TAGs overfold to small turn probes',
      'In multiway pots, they tighten correctly — don\'t bluff into them with one pair',
      'Note their bet sizes by street — sizing tells leak even from solid players',
    ],
  },
  {
    id: 'lag',
    name: 'LAG',
    tagline: 'Loose-aggressive, wide ranges, lots of bluffs',
    statLine: '30 / 26 / 11',
    fingerprint: 'VPIP 28-35, PFR within 4 of VPIP, 3B 10+',
    description:
      'Plays wide and bets a lot. Has bluffs in every line. Hard to play against because their range is real on every action, but their wide ranges contain plenty of weak hands.',
    exploits: [
      'Trap with strong hands — they\'ll bet into you',
      'Call down lighter on bluff-catcher boards — they triple-barrel with too many missed draws',
      '4-bet for value wider — JJ+, AQs+ are clear vs an 11% 3-bet range',
      'Let them hang themselves on rivers; don\'t turn made hands into bluffs',
    ],
  },
  {
    id: 'station',
    name: 'Calling Station',
    tagline: 'Calls everything, never folds, rarely raises',
    statLine: '38 / 12 / 2',
    fingerprint: 'VPIP-PFR gap of 15+, low aggression, W$SD often <48',
    description:
      'Limps and calls with a huge range, raises only with monsters. The single most profitable opponent type — but only if you adjust correctly.',
    exploits: [
      'STOP BLUFFING. Bluff frequency vs a station = ~0%',
      'Value-bet thinner than feels right — bet top pair weak kicker for three streets',
      'Isolate them in position with a wide value range — A8s, KJ, suited broadways',
      'When they finally raise, fold everything but the top of your range',
    ],
  },
  {
    id: 'maniac',
    name: 'Maniac',
    tagline: 'Hyper-aggressive, bets and raises everything',
    statLine: '48 / 42 / 16',
    fingerprint: 'VPIP > 40, PFR > 35, 3B > 14, AGG > 5',
    description:
      'Plays huge ranges aggressively. Will 3-bet, 4-bet, and triple-barrel with weak hands. Volatile to play against — high variance but high EV if you stay patient.',
    exploits: [
      'Tighten your opening range; widen your calling and 4-bet ranges',
      '4-bet for value with JJ+/AQs — they\'ll 5-bet shove with AJ',
      'Don\'t check-raise as a bluff — they\'ll re-bluff back',
      'Let them bluff into your strong hands; check-call rather than lead',
      'Variance will be brutal. Don\'t adjust away because you lost a buy-in to them.',
    ],
  },
  {
    id: 'loose-passive',
    name: 'Loose-Passive',
    tagline: 'Limps a lot, calls preflop, gives up postflop',
    statLine: '32 / 8 / 1',
    fingerprint: 'VPIP-PFR gap of 20+, very low 3B, often a live-game profile',
    description:
      'The classic "limper" — sees lots of flops cheap, then folds when they miss. Often found at live $1/$2 and online microstakes. Different from a calling station: they fold when they miss.',
    exploits: [
      'Isolate with a wide value range, especially in position',
      'Size up your iso-raises — 4-5x over their limp is standard',
      'C-bet small on any flop they likely missed — they fold the bottom 70% of their range',
      'Don\'t fancy-play. Bet your hand. They are paying you with the bottom of their range, not bluffing you.',
    ],
  },
];

/**
 * Heuristic interpreter — given VPIP, PFR, and 3-bet,
 * returns the closest archetype + a confidence note.
 *
 * Order matters; checks the most distinctive patterns first.
 */
export function interpretArchetype(vpip, pfr, threeBet) {
  const gap = vpip - pfr;

  if (vpip >= 35 && gap >= 15) return { id: 'station', confidence: 'high' };
  if (vpip >= 40 && pfr >= 35 && threeBet >= 14) return { id: 'maniac', confidence: 'high' };
  if (vpip >= 28 && gap >= 18) return { id: 'loose-passive', confidence: 'high' };
  if (vpip >= 28 && pfr >= 24 && threeBet >= 10) return { id: 'lag', confidence: 'high' };
  if (vpip <= 18 && gap <= 4 && threeBet <= 5) return { id: 'nit', confidence: 'high' };
  if (vpip >= 19 && vpip <= 27 && gap <= 4 && threeBet >= 5 && threeBet <= 10)
    return { id: 'tag', confidence: 'high' };

  // Softer matches — same archetype but lower confidence
  if (vpip <= 19) return { id: 'nit', confidence: 'medium' };
  if (vpip >= 30 && pfr >= 22) return { id: 'lag', confidence: 'medium' };
  if (gap >= 12) return { id: 'loose-passive', confidence: 'medium' };
  if (vpip >= 19 && vpip <= 28) return { id: 'tag', confidence: 'medium' };

  return { id: null, confidence: 'low' };
}

/**
 * Default examples for the interpreter's "load example" dropdown.
 */
export const interpreterExamples = [
  { label: 'Tight reg (NIT)',          vpip: 14, pfr: 12, threeBet: 3 },
  { label: 'Solid TAG',                vpip: 22, pfr: 19, threeBet: 7 },
  { label: 'LAG',                      vpip: 30, pfr: 26, threeBet: 11 },
  { label: 'Calling station',          vpip: 38, pfr: 12, threeBet: 2 },
  { label: 'Maniac',                   vpip: 48, pfr: 42, threeBet: 16 },
  { label: 'Live-game limper',         vpip: 32, pfr: 8, threeBet: 1 },
];
