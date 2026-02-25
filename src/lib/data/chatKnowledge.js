// ─────────────────────────────────────────────────────────────────────────────
// Chat Assistant — Knowledge Base & Search Engine
// Built from existing GTO reference data (glossary, equity, postflop, etc.)
// ─────────────────────────────────────────────────────────────────────────────

import { glossary } from './glossary.js';
import { matchups, outsChart, rule24, vsRangeTable } from './equity.js';
import { cbetData, turnGuide, riverGuide, principles } from './postflop.js';
import { sizingPrinciples, sprGuide, potOddsTable, preflopSizingRows, postflopSizingRows, stackDepthNotes } from './betSizing.js';
import { preflopAdjustments, flopCbetMultiway, multiwayPrinciples } from './multiway.js';

// ── Alias map for alternate spellings / abbreviations ─────────────────────────
const aliasMap = {
  'pfr':       'rfi',
  'cbet':      'c-bet',
  'c bet':     'c-bet',
  'continuation bet': 'c-bet',
  '3bet':      '3-bet',
  'three bet': '3-bet',
  'threebet':  '3-bet',
  '4bet':      '4-bet',
  'four bet':  '4-bet',
  'fourbet':   '4-bet',
  '5bet':      '5-bet',
  'five bet':  '5-bet',
  'oesd':      'open-ended straight draw',
  'oesds':     'open-ended straight draw',
  'fd':        'flush draw',
  'spr':       'stack-to-pot ratio',
  'mdf':       'minimum defense frequency',
  'ev':        'expected value',
  'gto':       'game theory optimal',
  'ip':        'in position',
  'oop':       'out of position',
  'utg':       'under the gun',
  'hj':        'hijack',
  'co':        'cutoff',
  'btn':       'button',
  'sb':        'small blind',
  'bb':        'big blind',
  'ep':        'early position',
  'mp':        'middle position',
  'lp':        'late position',
  'tpgk':      'top pair good kicker',
  'vpip':      'voluntarily put in pot',
  'hu':        'heads up',
  'nit':       'tight player',
  'lag':       'loose aggressive',
  'tag':       'tight aggressive',
  'donk':      'donk bet',
  'float':     'floating',
  'barrel':    'double barrel',
  'overbet':   'overbet',
  'probe':     'probe bet',
  'squeeze':   'squeeze play',
  'limp':      'open limp',
  'cold call': 'cold call',
  'runout':    'runout',
  'blocker':   'blocker',
  'blockers':  'blocker',
  'nuts':      'nut advantage',
  'polarize':  'polarized',
  'polarised': 'polarized',
  'merge':     'merged',
  'merged':    'merged',
  'balance':   'balanced',
  'balanced':  'balanced',
};

// ── Build knowledge base ──────────────────────────────────────────────────────

let nextId = 1;
function entry(keywords, category, question, answer, priority = 3) {
  return { id: nextId++, keywords, category, question, answer, priority };
}

// --- Glossary entries (auto-generated) ---
const glossaryEntries = glossary.map(g => {
  const kw = [
    g.term.toLowerCase(),
    g.full.toLowerCase(),
    ...g.full.toLowerCase().split(/\s+/),
    g.category.toLowerCase(),
  ];
  // Add any known aliases that map to this term
  for (const [alias, target] of Object.entries(aliasMap)) {
    if (target === g.term.toLowerCase() || target === g.full.toLowerCase()) {
      kw.push(alias);
    }
  }
  return entry(
    kw,
    'Glossary',
    `What is ${g.full} (${g.term})?`,
    `**${g.full} (${g.term})** — ${g.definition}`,
    g.category === 'Theory' ? 2 : 3,
  );
});

// --- Equity entries ---
const equityEntries = [
  entry(
    ['matchup', 'matchups', 'hand vs hand', 'aa vs kk', 'kk vs qq', 'pair vs overcards', 'coin flip', 'race', 'all-in equity', 'preflop equity'],
    'Equity',
    'What are the key preflop hand matchup equities?',
    `**Key Preflop Matchups:**\n\n` +
    matchups.slice(0, 8).map(m =>
      `- **${m.hero} vs ${m.villain}**: ${m.equity}% equity for ${m.hero}. ${m.notes}`
    ).join('\n') +
    `\n\n**Categories:** Overpair vs overpair (~82%), pair vs overcards (~55% "coin flip"), pair vs dominated (~83-93%).`,
    1,
  ),
  entry(
    ['aa vs kk', 'aces vs kings', 'aa', 'kk'],
    'Equity',
    'What is AA vs KK equity?',
    `**AA vs KK** — AA has approximately **82% equity** preflop. KK needs to hit a king on the board without the board pairing for aces. This is the most common "cooler" in poker — when you have KK, getting it all-in preflop against AA is inevitable and not a mistake.`,
    1,
  ),
  entry(
    ['outs', 'draw', 'draws', 'flush draw', 'straight draw', 'oesd', 'gutshot', 'combo draw', 'how many outs'],
    'Equity',
    'How many outs do common draws have?',
    `**Outs & Draw Equity:**\n\n` +
    outsChart.map(o =>
      `- **${o.draw}**: ${o.outs} outs — ${o.twoCards}% with 2 cards to come, ${o.turn}% with 1 card. ${o.notes}`
    ).join('\n'),
    1,
  ),
  entry(
    ['rule of 2 and 4', 'rule of 4', 'rule of 2', 'quick equity', 'mental math', 'estimate equity', 'calculate equity'],
    'Equity',
    'What is the Rule of 2 and 4?',
    `**Rule of 2 & 4** — ${rule24.description}\n\n**Examples:**\n` +
    rule24.examples.map(e =>
      `- **${e.label}** (${e.outs} outs): Flop estimate ${e.flop}% (actual ${e.actual_flop}%), Turn estimate ${e.turn}% (actual ${e.actual_turn}%)`
    ).join('\n') +
    `\n\n**Caveats:**\n` + rule24.caveats.map(c => `- ${c}`).join('\n'),
    1,
  ),
  entry(
    ['vs range', 'range equity', 'aa vs range', 'kk vs range', 'hand vs range', 'top 5', 'top 10', 'top 20'],
    'Equity',
    'How does hand equity change vs different range widths?',
    `**Hand Equity vs Range Width:**\n\n` +
    vsRangeTable.map(r =>
      `- **${r.hand}**: ${r.top5}% vs top 5%, ${r.top10}% vs top 10%, ${r.top20}% vs top 20%, ${r.top50}% vs top 50%. ${r.notes}`
    ).join('\n'),
    2,
  ),
  entry(
    ['set vs draw', 'set vs flush', 'combo draw', 'set equity', 'made hand vs draw'],
    'Equity',
    'What is a set\'s equity vs draws?',
    `**Set vs Draw Equity:**\n\n` +
    matchups.filter(m => m.category === 'Set vs Draw' || m.category === 'Straight vs Flush Draw').map(m =>
      `- **${m.hero} vs ${m.villain}**: ${m.equity}% — ${m.notes}`
    ).join('\n'),
    2,
  ),
];

// --- Postflop entries ---
const postflopEntries = [
  // C-bet by texture
  ...cbetData.map(c => entry(
    ['c-bet', 'cbet', 'continuation bet', 'flop bet', c.texture.toLowerCase(), c.rangeAdv.toLowerCase(), 'flop strategy'],
    'Postflop',
    `How should I c-bet on ${c.texture} boards?`,
    `**C-Bet on ${c.texture} (e.g. ${c.example}):**\n\n- **IP frequency**: ${c.ipFreq}% at ${c.ipSize} pot\n- **OOP frequency**: ${c.oopFreq}% at ${c.oopSize} pot\n- **Range advantage**: ${c.rangeAdv}\n- ${c.notes}`,
    3,
  )),
  // Turn strategy
  entry(
    ['turn', 'double barrel', 'turn strategy', 'turn bet', 'second barrel', 'turn check'],
    'Postflop',
    'When should I bet the turn (double barrel)?',
    `**Turn Strategy:**\n\n` +
    turnGuide.map(t =>
      `**${t.situation} → ${t.action}:**\n- Hands: ${t.hands}\n- Frequency: ${t.frequency}, Size: ${t.sizing}\n- ${t.notes}`
    ).join('\n\n'),
    2,
  ),
  // River strategy
  entry(
    ['river', 'triple barrel', 'river bet', 'river bluff', 'river strategy', 'river value'],
    'Postflop',
    'How should I play the river?',
    `**River Strategy:**\n\n` +
    riverGuide.map(r =>
      `**${r.situation} → ${r.action}:**\n- Hands: ${r.hands}\n- Frequency: ${r.frequency}, Size: ${r.sizing}\n- ${r.notes}`
    ).join('\n\n'),
    2,
  ),
  // Core principles
  ...principles.map(p => entry(
    [p.title.toLowerCase(), ...p.title.toLowerCase().split(/\s+/), 'postflop', 'principle', 'concept'],
    'Postflop',
    p.title,
    `**${p.title}** — ${p.body}`,
    3,
  )),
];

// --- Bet Sizing entries ---
const betSizingEntries = [
  entry(
    ['spr', 'stack to pot ratio', 'stack-to-pot', 'commitment', 'stack off', 'spr guide'],
    'Bet Sizing',
    'How does SPR affect my strategy?',
    `**Stack-to-Pot Ratio (SPR) Guide:**\n\n` +
    sprGuide.map(s =>
      `- **SPR ${s.range} (${s.label})**: ${s.strategy} Hands: ${s.hands}.`
    ).join('\n'),
    1,
  ),
  entry(
    ['pot odds', 'mdf', 'minimum defense', 'calling', 'break even', 'equity needed', 'defense frequency'],
    'Bet Sizing',
    'What are the pot odds and MDF for common bet sizes?',
    `**Pot Odds & MDF Table:**\n\n` +
    potOddsTable.map(p =>
      `- **${p.betPct}% pot bet**: Need ${p.equityNeeded}% equity to call. MDF = ${p.mdf}%.`
    ).join('\n') +
    `\n\n**MDF formula**: Pot / (Pot + Bet). **Pot odds**: You need equity ≥ Bet / (Pot + Bet) to call profitably.`,
    1,
  ),
  entry(
    ['preflop sizing', 'open size', 'raise size', '3-bet size', '4-bet size', 'how much to raise', 'opening size'],
    'Bet Sizing',
    'What are the standard preflop bet sizes?',
    `**Preflop Sizing Guide:**\n\n` +
    preflopSizingRows.map(r =>
      `- **${r.label}**: ${r.sizes[6]} (6-max). ${r.notes}`
    ).join('\n'),
    2,
  ),
  entry(
    ['postflop sizing', 'bet size', 'how much to bet', 'flop bet size', 'turn bet size', 'river bet size'],
    'Bet Sizing',
    'What are the standard postflop bet sizes?',
    `**Postflop Sizing Guide:**\n\n` +
    postflopSizingRows.map(r =>
      `- **${r.street} — ${r.situation}**: Size ${r.size} at ${r.freq} frequency. ${r.notes}`
    ).join('\n'),
    2,
  ),
  entry(
    ['stack depth', 'short stack', 'deep stack', 'stack size', '20bb', '100bb', '150bb'],
    'Bet Sizing',
    'How do I adjust sizing for different stack depths?',
    `**Stack Depth Adjustments:**\n\n` +
    stackDepthNotes.map(s =>
      `- **${s.depth}**: ${s.adjustments}`
    ).join('\n'),
    3,
  ),
  // Sizing principles
  ...sizingPrinciples.map(p => entry(
    [p.title.toLowerCase(), ...p.title.toLowerCase().split(/\s+/), 'sizing', 'bet sizing', 'principle'],
    'Bet Sizing',
    p.title,
    `**${p.title}** — ${p.body}`,
    3,
  )),
];

// --- Multiway entries ---
const multiwayEntries = [
  entry(
    ['multiway', 'multi-way', '3-way', '4-way', 'three way', 'four way', 'multiway preflop', 'multiway adjustments'],
    'Multiway',
    'How should I adjust preflop for multiway pots?',
    `**Multiway Preflop Adjustments:**\n\n` +
    preflopAdjustments.map(a =>
      `- **${a.aspect}**: HU: ${a.hu} → 3-way: ${a.threeWay} → 4-way: ${a.fourWay}. ${a.note}`
    ).join('\n'),
    2,
  ),
  entry(
    ['multiway c-bet', 'multiway flop', 'c-bet multiway', 'cbet multi', 'multiway flop bet'],
    'Multiway',
    'How does c-bet frequency change in multiway pots?',
    `**Multiway C-Bet Frequencies (dramatically lower than HU):**\n\n` +
    flopCbetMultiway.slice(0, 5).map(c =>
      `- **${c.texture}**: ${c.freq3way}% 3-way, ${c.freq4way}% 4-way (size: ${c.size}). ${c.notes}`
    ).join('\n') +
    `\n\n**Key takeaway**: C-bet frequency drops dramatically multiway. Only bet strong value and nut draws.`,
    2,
  ),
  entry(
    ['multiway bluff', 'bluffing multiway', 'bluff frequency multiway'],
    'Multiway',
    'Should I bluff in multiway pots?',
    `**Bluffing Multiway** — Each additional player reduces bluff success multiplicatively. A bluff that works 50% heads-up needs to work ~25% vs two players and ~12% vs three.\n\n**Bottom line**: Bluffing multiway is almost always unprofitable. Focus on value betting strong hands. Semi-bluffs with nut draws are the exception — they have equity when called.`,
    2,
  ),
  // Multiway principles
  ...multiwayPrinciples.map(p => entry(
    [p.title.toLowerCase(), ...p.title.toLowerCase().split(/\s+/), 'multiway', 'multi-way', 'principle'],
    'Multiway',
    p.title,
    `**${p.title}** — ${p.body}`,
    3,
  )),
];

// --- Range entries ---
const rangeEntries = [
  entry(
    ['opening range', 'rfi range', 'open range', 'preflop range', 'what hands to open', 'raise first in'],
    'Ranges',
    'What are the opening ranges by position?',
    `**Opening Ranges (6-max RFI):**\n\n- **UTG**: ~15% — Tight range. Pairs 77+, suited broadways, AKo-ATo, KQo-KJo. Open 3x.\n- **HJ**: ~20% — Add 55-66, more suited connectors, K8s-K7s. Open 2.5x.\n- **CO**: ~28% — Add 22-44, most suited aces, wider offsuit broadways. Open 2.5x.\n- **BTN**: ~42% — Very wide. Add most suited hands, many offsuit broadways. Open 2.2x.\n- **SB**: ~38% — Wide but OOP. All pairs, all suited aces, many suited connectors. Open 3x.\n\nUse the **Preflop Ranges** section to see the exact hand matrix for each position.`,
    1,
  ),
  entry(
    ['3-bet range', '3bet range', 'three bet range', 'when to 3-bet', 're-raise range', 'facing a raise'],
    'Ranges',
    'What is a 3-bet range?',
    `**3-Bet Ranges** are polarized: strong value hands plus bluffs.\n\n- **Value**: AA, KK, QQ, AKs, AKo (always 3-bet)\n- **Bluffs**: Suited aces (A5s, A4s, A3s), suited connectors near the bottom of your calling range\n- **IP size**: 3x the open (e.g., vs 2.5x → 7.5 BB)\n- **OOP size**: 4x the open (e.g., vs 2.5x → 10 BB)\n\n3-betting builds pots with strong hands and applies pressure with blocker-rich bluffs.`,
    2,
  ),
  entry(
    ['4-bet', '4bet', 'four bet', '5-bet', 'shove', 'all-in preflop'],
    'Ranges',
    'When should I 4-bet or 5-bet?',
    `**4-Bet Range** — Typically polar: value (KK+, AKs) and bluffs with blockers (AQs, KQs, A5s). Size to ~2.2x the 3-bet.\n\n**5-Bet** — Almost always all-in at 100BB. Range narrows to near-nutted hands (AA, KK, AKs) unless short-stacked.\n\nAt stack depths below ~40BB, a 4-bet is often a shove rather than a non-all-in raise.`,
    2,
  ),
  entry(
    ['blind defense', 'defend bb', 'defend big blind', 'bb defense', 'calling from bb'],
    'Ranges',
    'How wide should I defend my big blind?',
    `**Big Blind Defense:**\n\n- BB gets a discount (already posted 1BB), so defends the widest range of any position facing a raise.\n- **vs BTN open**: Defend ~50-55% of hands (call + 3-bet)\n- **vs CO open**: Defend ~40-45%\n- **vs EP open**: Defend ~25-30%\n\nKey principle: You're always OOP postflop from BB, so equity realization is lower. Suited hands and pairs realize equity better than offsuit junk.`,
    2,
  ),
  entry(
    ['position', 'positions', 'which position', 'seat', 'best position', 'worst position'],
    'Ranges',
    'How does position affect range selection?',
    `**Position & Ranges:**\n\n- **BTN** is the most profitable seat — acts last postflop, opens widest (~42%)\n- **CO** is second-best — wide opening (~28%) with only BTN and blinds behind\n- **HJ** is middle position — medium range (~20%)\n- **UTG** is tightest — most players behind (~15%)\n- **SB** is the worst position — OOP postflop, but opens wide vs BB alone (~38%)\n- **BB** defends widest facing raises (gets a discount)\n\n**In position (IP)** players realize more equity and can play more hands profitably.`,
    1,
  ),
];

// --- General entries ---
const generalEntries = [
  entry(
    ['gto', 'game theory optimal', 'what is gto', 'nash equilibrium', 'unexploitable', 'solver'],
    'General',
    'What is GTO poker?',
    `**Game Theory Optimal (GTO)** is a strategy that cannot be exploited — it achieves maximum EV regardless of how opponents play. Technically, it's the Nash Equilibrium of poker.\n\n**In practice**, GTO provides a strong default baseline against unknown opponents. Key GTO concepts:\n- Balance value bets and bluffs at correct ratios\n- Defend at minimum defense frequency (MDF) to prevent profitable bluffs\n- Use position and range advantages to drive betting strategy\n\nDeviating from GTO to exploit leaks can be more +EV vs weak players, but GTO is the foundation.`,
    1,
  ),
  entry(
    ['equity', 'what is equity', 'equity realization', 'realize equity', 'pot share'],
    'General',
    'What is equity and equity realization?',
    `**Equity** is your share of the pot if the hand were run to showdown multiple times. E.g., a flush draw on the flop has ~35% equity.\n\n**Equity Realization** is how much of your raw equity you actually convert to won chips. Factors:\n- **Position**: IP hands realize more equity than OOP\n- **Playability**: Suited connectors and pairs realize more than offsuit junk\n- **Stack depth**: Deeper stacks allow more implied odds\n\nRaw equity ≠ EV because of position and future betting decisions.`,
    1,
  ),
  entry(
    ['range advantage', 'nut advantage', 'board texture', 'who has advantage', 'range vs nut'],
    'General',
    'What is range advantage vs nut advantage?',
    `**Range Advantage** — When your overall range has higher equity on a given board. E.g., the PFR has range advantage on A-high boards (more Ax combos). The player with range advantage should c-bet more frequently, often at small sizes.\n\n**Nut Advantage** — Having more of the strongest (nutted) hands on a board, even if overall equity is close. Nut advantage justifies larger bet sizes and overbets.\n\nRange advantage drives **frequency**; nut advantage drives **sizing**.`,
    1,
  ),
  entry(
    ['value bet', 'bluff', 'semi bluff', 'semi-bluff', 'when to bluff', 'value vs bluff', 'bluff ratio'],
    'General',
    'When should I value bet vs bluff?',
    `**Value Bet** — Bet with a strong hand hoping worse hands call. Size larger when you want folds from draws, smaller for thin value.\n\n**Bluff** — Bet with a weak hand hoping better hands fold. Best bluffs have blockers to villain's calling range.\n\n**Semi-Bluff** — Bet with a draw (currently behind but has outs). Two ways to win: fold equity + hitting the draw.\n\n**Balance**: At a pot-size bet, aim for ~1:1 value-to-bluff ratio. At smaller sizes, use fewer bluffs. At larger sizes, you can bluff more frequently.`,
    1,
  ),
  entry(
    ['fold equity', 'when to fold', 'calling', 'should i call', 'should i fold'],
    'General',
    'What is fold equity and when should I fold?',
    `**Fold Equity** — The portion of a bet's EV from making opponents fold. High fold equity = villain folds often enough that even weak hands profit from betting.\n\n**When to fold:** Compare your equity to the pot odds being offered. If you need 25% equity to call and you estimate you have 20%, fold.\n\n**Key insight**: Fold equity diminishes on later streets with short stacks. On the river, you can only win by showing down the best hand or bluffing — choose wisely.`,
    2,
  ),
];

// ── Assemble full knowledge base ──────────────────────────────────────────────
export const knowledgeBase = [
  ...glossaryEntries,
  ...equityEntries,
  ...postflopEntries,
  ...betSizingEntries,
  ...multiwayEntries,
  ...rangeEntries,
  ...generalEntries,
];

// ── Suggested starter questions ──────────────────────────────────────────────
export const suggestedQuestions = [
  'What is GTO poker?',
  'How many outs does a flush draw have?',
  'What are the opening ranges by position?',
  'How should I c-bet on dry boards?',
  'What is the Rule of 2 and 4?',
  'How does SPR affect my strategy?',
  'Should I bluff in multiway pots?',
  'What is AA vs KK equity?',
];

// ── Search function ─────────────────────────────────────────────────────────
export function searchKnowledge(query) {
  if (!query || !query.trim()) return [];

  // 1. Normalize
  const normalized = query.toLowerCase().replace(/[^\w\s\-]/g, '').trim();
  const words = normalized.split(/\s+/).filter(Boolean);

  // 2. Expand aliases
  const expandedWords = [...words];
  for (const word of words) {
    if (aliasMap[word]) {
      expandedWords.push(...aliasMap[word].split(/\s+/));
    }
    // Check two-word phrases
    for (let i = 0; i < words.length - 1; i++) {
      const phrase = words[i] + ' ' + words[i + 1];
      if (aliasMap[phrase]) {
        expandedWords.push(...aliasMap[phrase].split(/\s+/));
      }
    }
  }
  const uniqueWords = [...new Set(expandedWords)];

  // 3. Score each entry
  const scored = knowledgeBase.map(entry => {
    let score = 0;
    const kwJoined = entry.keywords.join(' ');
    const answerLower = entry.answer.toLowerCase();
    const questionLower = entry.question.toLowerCase();

    // Exact phrase match in keywords
    if (kwJoined.includes(normalized)) score += 100;

    // Exact phrase match in question
    if (questionLower.includes(normalized)) score += 80;

    for (const word of uniqueWords) {
      // Query word is an exact keyword
      if (entry.keywords.includes(word)) score += 50;

      // Word match in keywords (partial)
      for (const kw of entry.keywords) {
        if (kw.includes(word) || word.includes(kw)) score += 8;
      }

      // Word found in question
      if (questionLower.includes(word)) score += 20;

      // Word found in answer body
      if (answerLower.includes(word)) score += 2;
    }

    // Priority penalty
    score -= (entry.priority - 1) * 3;

    return { entry, score };
  });

  // 4. Filter and sort
  return scored
    .filter(s => s.score > 10)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(s => s.entry);
}
