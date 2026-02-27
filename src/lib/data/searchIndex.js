// ─────────────────────────────────────────────────────────────────────────────
// Search Index — flat searchable array built from all data sources
// ─────────────────────────────────────────────────────────────────────────────

import { glossary } from './glossary.js';
import { cbetData, turnGuide, riverGuide, principles } from './postflop.js';
import { sizingPrinciples, preflopSizingRows, postflopSizingRows, potOddsTable, sprGuide, stackDepthNotes } from './betSizing.js';
import { matchups, outsChart, vsRangeTable } from './equity.js';
import { preflopAdjustments, flopCbetMultiway, turnRiverGuide, multiwayPrinciples } from './multiway.js';
import { bluffConditions, blockerScenarios, playerProfiles, bluffSpots, bluffPrinciples } from './bluffing.js';
import { tournamentBasics, stageStrategy, icmConcepts, pushFoldRanges } from './tournament.js';
import { rangeNarrowing, boardTextureReading, sizingTells, streetByStreet } from './handReading.js';
import { positionBasics, evBySeat, positionalPlays, exploitingPosition } from './position.js';
import { cashBrm, tournamentBrm, varianceInfo, movingStakes } from './bankroll.js';
import { preflopLeaks, postflopLeaks, mentalGame, sizingMistakes } from './mistakes.js';
import { readingOutput, frequencyConcepts, whenToDeviate, practicalTips } from './solver.js';
import { quizQuestions } from './quiz.js';

// ── Section label map (matches App.svelte sidebar IDs) ──────────────────────
export const sectionLabels = {
  preflop:     'Preflop Ranges',
  postflop:    'Postflop Play',
  glossary:    'Glossary',
  sizing:      'Bet Sizing Theory',
  equity:      'Hand Equity',
  multiway:    'Multiway Pots',
  bluffing:    'Bluffing & Reads',
  tournament:  'Tournament Play',
  handreading: 'Hand Reading',
  position:    'Position Strategy',
  bankroll:    'Bankroll Mgmt',
  mistakes:    'Common Mistakes',
  solver:      'Solver Guide',
  cheatsheet:  'Cheat Sheet',
  'range-builder': 'Range Builder',
  quiz:        'Quiz Mode',
  notes:       'Session Notes',
};

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Truncate a label to at most maxLen characters */
function truncLabel(str, maxLen = 58) {
  return str.length <= maxLen ? str : str.substring(0, maxLen - 1) + '…';
}

/** Create a single search entry */
function entry(text, section, label) {
  return { text: text.toLowerCase(), section, label: truncLabel(label) };
}

// ── Build function ──────────────────────────────────────────────────────────

export function buildSearchIndex() {
  const idx = [];

  // ── Glossary ────────────────────────────────────────────────────────────
  for (const g of glossary) {
    idx.push(entry(
      [g.term, g.full, g.definition, g.category].join(' '),
      'glossary',
      g.term + (g.full !== g.term ? ' — ' + g.full : '')
    ));
  }

  // ── Postflop: C-bet data ────────────────────────────────────────────────
  for (const c of cbetData) {
    idx.push(entry(
      [c.texture, c.example, c.notes, c.rangeAdv].join(' '),
      'postflop',
      'C-bet: ' + c.texture
    ));
  }

  // ── Postflop: Turn guide ────────────────────────────────────────────────
  for (const t of turnGuide) {
    idx.push(entry(
      [t.situation, t.action, t.hands, t.notes].join(' '),
      'postflop',
      'Turn: ' + t.action + ' — ' + t.situation
    ));
  }

  // ── Postflop: River guide ───────────────────────────────────────────────
  for (const r of riverGuide) {
    idx.push(entry(
      [r.situation, r.action, r.hands, r.notes].join(' '),
      'postflop',
      'River: ' + r.action + ' — ' + r.situation
    ));
  }

  // ── Postflop: Principles ────────────────────────────────────────────────
  for (const p of principles) {
    idx.push(entry(
      [p.title, p.body].join(' '),
      'postflop',
      p.title
    ));
  }

  // ── Bet Sizing: Principles ─────────────────────────────────────────────
  for (const s of sizingPrinciples) {
    idx.push(entry(
      [s.title, s.body].join(' '),
      'sizing',
      s.title
    ));
  }

  // ── Bet Sizing: Preflop sizing rows ─────────────────────────────────────
  for (const r of preflopSizingRows) {
    idx.push(entry(
      [r.label, r.notes, Object.values(r.sizes).join(' ')].join(' '),
      'sizing',
      'Preflop size: ' + r.label
    ));
  }

  // ── Bet Sizing: Postflop sizing rows ────────────────────────────────────
  for (const r of postflopSizingRows) {
    idx.push(entry(
      [r.street, r.situation, r.size, r.notes].join(' '),
      'sizing',
      r.street + ' sizing: ' + r.situation
    ));
  }

  // ── Bet Sizing: Pot odds / MDF ──────────────────────────────────────────
  for (const p of potOddsTable) {
    idx.push(entry(
      ['bet', p.betPct + '% pot', 'equity needed', p.equityNeeded + '%', 'mdf', p.mdf + '%'].join(' '),
      'sizing',
      'Pot odds: ' + p.betPct + '% bet → ' + p.equityNeeded + '% equity'
    ));
  }

  // ── Bet Sizing: SPR guide ──────────────────────────────────────────────
  for (const s of sprGuide) {
    idx.push(entry(
      [s.label, s.range, s.strategy, s.hands].join(' '),
      'sizing',
      'SPR ' + s.range + ': ' + s.label
    ));
  }

  // ── Bet Sizing: Stack depth notes ──────────────────────────────────────
  for (const s of stackDepthNotes) {
    idx.push(entry(
      [s.depth, s.adjustments].join(' '),
      'sizing',
      'Stack depth: ' + s.depth
    ));
  }

  // ── Equity: Matchups ────────────────────────────────────────────────────
  for (const m of matchups) {
    idx.push(entry(
      [m.hero, m.villain, m.category, m.notes, m.equity + '% equity'].join(' '),
      'equity',
      m.hero + ' vs ' + m.villain + ' (' + m.equity + '%)'
    ));
  }

  // ── Equity: Outs chart ──────────────────────────────────────────────────
  for (const o of outsChart) {
    idx.push(entry(
      [o.draw, o.outs + ' outs', o.notes, o.twoCards + '% two cards'].join(' '),
      'equity',
      o.draw + ' (' + o.outs + ' outs)'
    ));
  }

  // ── Equity: vs Range table ─────────────────────────────────────────────
  for (const v of vsRangeTable) {
    idx.push(entry(
      [v.hand, v.notes, 'top5 ' + v.top5, 'top10 ' + v.top10, 'top20 ' + v.top20, 'top50 ' + v.top50].join(' '),
      'equity',
      v.hand + ' vs ranges'
    ));
  }

  // ── Multiway: Preflop adjustments ──────────────────────────────────────
  for (const a of preflopAdjustments) {
    idx.push(entry(
      [a.aspect, a.hu, a.threeWay, a.fourWay, a.note].join(' '),
      'multiway',
      'Multiway preflop: ' + a.aspect
    ));
  }

  // ── Multiway: Flop c-bet multiway ─────────────────────────────────────
  for (const c of flopCbetMultiway) {
    idx.push(entry(
      [c.texture, c.hands, c.notes, c.size].join(' '),
      'multiway',
      'Multiway c-bet: ' + c.texture
    ));
  }

  // ── Multiway: Turn/river guide ─────────────────────────────────────────
  for (const t of turnRiverGuide) {
    idx.push(entry(
      [t.situation, t.action, t.hands, t.notes].join(' '),
      'multiway',
      'Multiway: ' + t.action
    ));
  }

  // ── Multiway: Principles ───────────────────────────────────────────────
  for (const p of multiwayPrinciples) {
    idx.push(entry(
      [p.title, p.body].join(' '),
      'multiway',
      p.title
    ));
  }

  // ── Bluffing: Conditions ───────────────────────────────────────────────
  for (const b of bluffConditions) {
    idx.push(entry(
      [b.factor, b.why, b.example, b.impact].join(' '),
      'bluffing',
      'Bluff factor: ' + b.factor
    ));
  }

  // ── Bluffing: Blocker scenarios ────────────────────────────────────────
  for (const b of blockerScenarios) {
    idx.push(entry(
      [b.scenario, b.blocker, b.effect, b.detail, b.bluffQuality].join(' '),
      'bluffing',
      'Blocker: ' + b.scenario
    ));
  }

  // ── Bluffing: Player profiles ──────────────────────────────────────────
  for (const p of playerProfiles) {
    idx.push(entry(
      [p.type, p.traits, p.bluffAdj, p.detail, p.keyStat, p.tells].join(' '),
      'bluffing',
      'Profile: ' + p.type
    ));
  }

  // ── Bluffing: Common spots ─────────────────────────────────────────────
  for (const s of bluffSpots) {
    idx.push(entry(
      [s.spot, s.street, s.setup, s.action, s.blockers, s.avoid, s.profiling].join(' '),
      'bluffing',
      'Bluff spot: ' + s.spot
    ));
  }

  // ── Bluffing: Principles ──────────────────────────────────────────────
  for (const p of bluffPrinciples) {
    idx.push(entry(
      [p.title, p.body].join(' '),
      'bluffing',
      p.title
    ));
  }

  // ── Tournament: Basics ─────────────────────────────────────────────────
  for (const t of tournamentBasics) {
    idx.push(entry(
      [t.title, t.body].join(' '),
      'tournament',
      t.title
    ));
  }

  // ── Tournament: Stage strategy ─────────────────────────────────────────
  for (const s of stageStrategy) {
    idx.push(entry(
      [s.stage, s.overview, s.keyPrinciple, s.tips.join(' ')].join(' '),
      'tournament',
      'Stage: ' + s.stage + ' (' + s.bbRange + ')'
    ));
  }

  // ── Tournament: ICM concepts ───────────────────────────────────────────
  for (const c of icmConcepts) {
    idx.push(entry(
      [c.title, c.body].join(' '),
      'tournament',
      c.title
    ));
  }

  // ── Tournament: Push/fold ranges ───────────────────────────────────────
  for (const p of pushFoldRanges) {
    idx.push(entry(
      [p.title, p.body].join(' '),
      'tournament',
      p.title
    ));
  }

  // ── Hand Reading: Range narrowing ──────────────────────────────────────
  for (const r of rangeNarrowing) {
    idx.push(entry(
      [r.title, r.body].join(' '),
      'handreading',
      r.title
    ));
  }

  // ── Hand Reading: Board texture reading ────────────────────────────────
  for (const b of boardTextureReading) {
    idx.push(entry(
      [b.texture, b.description, b.keyPoints, b.favoredRange].join(' '),
      'handreading',
      'Board: ' + b.texture
    ));
  }

  // ── Hand Reading: Sizing tells ─────────────────────────────────────────
  for (const s of sizingTells) {
    idx.push(entry(
      [s.title, s.body].join(' '),
      'handreading',
      'Sizing tell: ' + s.title
    ));
  }

  // ── Hand Reading: Street-by-street examples ────────────────────────────
  for (const s of streetByStreet) {
    idx.push(entry(
      [s.title, s.preflop, s.flop, s.turn, s.river, s.lesson].join(' '),
      'handreading',
      'Example: ' + s.title
    ));
  }

  // ── Position: Basics ───────────────────────────────────────────────────
  for (const p of positionBasics) {
    idx.push(entry(
      [p.title, p.body].join(' '),
      'position',
      p.title
    ));
  }

  // ── Position: EV by seat ───────────────────────────────────────────────
  for (const e of evBySeat) {
    idx.push(entry(
      [e.position, e.description, e.bbPer100 + ' bb/100', 'vpip ' + e.vpip, 'pfr ' + e.pfr].join(' '),
      'position',
      'EV: ' + e.position + ' (' + e.bbPer100 + ' bb/100)'
    ));
  }

  // ── Position: Positional plays ─────────────────────────────────────────
  for (const p of positionalPlays) {
    idx.push(entry(
      [p.title, p.body].join(' '),
      'position',
      p.title
    ));
  }

  // ── Position: Exploiting position (IP vs OOP) ─────────────────────────
  for (const e of exploitingPosition) {
    idx.push(entry(
      [e.situation, e.inPosition, e.outOfPosition, e.notes].join(' '),
      'position',
      'IP vs OOP: ' + e.situation
    ));
  }

  // ── Bankroll: Cash game BRM ────────────────────────────────────────────
  for (const b of cashBrm) {
    idx.push(entry(
      [b.title, b.body].join(' '),
      'bankroll',
      b.title
    ));
  }

  // ── Bankroll: Tournament BRM ───────────────────────────────────────────
  for (const b of tournamentBrm) {
    idx.push(entry(
      [b.title, b.body].join(' '),
      'bankroll',
      'Tournament: ' + b.title
    ));
  }

  // ── Bankroll: Variance info ────────────────────────────────────────────
  for (const v of varianceInfo) {
    idx.push(entry(
      [v.title, v.body].join(' '),
      'bankroll',
      'Variance: ' + v.title
    ));
  }

  // ── Bankroll: Moving stakes ────────────────────────────────────────────
  for (const m of movingStakes) {
    idx.push(entry(
      [m.title, m.body].join(' '),
      'bankroll',
      m.title
    ));
  }

  // ── Mistakes: Preflop leaks ────────────────────────────────────────────
  for (const l of preflopLeaks) {
    idx.push(entry(
      [l.title, l.description, l.fix, l.severity].join(' '),
      'mistakes',
      'Leak: ' + l.title
    ));
  }

  // ── Mistakes: Postflop leaks ───────────────────────────────────────────
  for (const l of postflopLeaks) {
    idx.push(entry(
      [l.title, l.description, l.fix, l.severity].join(' '),
      'mistakes',
      'Leak: ' + l.title
    ));
  }

  // ── Mistakes: Mental game ──────────────────────────────────────────────
  for (const m of mentalGame) {
    idx.push(entry(
      [m.title, m.body].join(' '),
      'mistakes',
      'Mental: ' + m.title
    ));
  }

  // ── Mistakes: Sizing mistakes ──────────────────────────────────────────
  for (const s of sizingMistakes) {
    idx.push(entry(
      [s.title, s.body].join(' '),
      'mistakes',
      'Sizing error: ' + s.title
    ));
  }

  // ── Solver: Reading output ─────────────────────────────────────────────
  for (const r of readingOutput) {
    idx.push(entry(
      [r.title, r.body].join(' '),
      'solver',
      r.title
    ));
  }

  // ── Solver: Frequency concepts ─────────────────────────────────────────
  for (const f of frequencyConcepts) {
    idx.push(entry(
      [f.title, f.body].join(' '),
      'solver',
      f.title
    ));
  }

  // ── Solver: When to deviate ────────────────────────────────────────────
  for (const w of whenToDeviate) {
    idx.push(entry(
      [w.title, w.body].join(' '),
      'solver',
      'Deviate: ' + w.title
    ));
  }

  // ── Solver: Practical tips ─────────────────────────────────────────────
  for (const t of practicalTips) {
    idx.push(entry(
      [t.title, t.body].join(' '),
      'solver',
      'Tip: ' + t.title
    ));
  }

  // ── Quiz: Questions ────────────────────────────────────────────────────
  for (const q of quizQuestions) {
    idx.push(entry(
      [q.question, q.scenario, q.explanation, q.category].join(' '),
      'quiz',
      'Quiz: ' + q.question.substring(0, 50)
    ));
  }

  return idx;
}
