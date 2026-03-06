// ─────────────────────────────────────────────────────────────────────────────
// Hand → Postflop Guidance — maps hand types to board texture strengths
// ─────────────────────────────────────────────────────────────────────────────

const RANKS = 'AKQJT98765432';
const rv = c => 14 - RANKS.indexOf(c);

export function categorizeHand(hand) {
  if (!hand || hand.length < 2) return null;
  const r1 = hand[0], r2 = hand[1];
  const suited = hand.endsWith('s');
  const isPair = r1 === r2;
  const high = Math.max(rv(r1), rv(r2));
  const low = Math.min(rv(r1), rv(r2));
  const gap = high - low;

  if (isPair && high >= 12) return 'premium-pair';
  if (isPair && high >= 8)  return 'medium-pair';
  if (isPair)               return 'small-pair';
  if (high === 14 && low >= 11) return 'big-ace';
  if (high === 14 && suited)    return 'suited-ace';
  if (suited && gap <= 2 && high <= 12) return 'suited-connector';
  if (high >= 10 && low >= 10)  return 'broadway';
  return 'marginal';
}

export const categoryLabels = {
  'premium-pair':    'Premium Pair',
  'medium-pair':     'Medium Pair',
  'small-pair':      'Small Pair',
  'big-ace':         'Big Ace',
  'suited-ace':      'Suited Ace',
  'suited-connector':'Suited Connector',
  'broadway':        'Broadway',
  'marginal':        'Marginal Hand',
};

export const categorySummaries = {
  'premium-pair':    'Overpair on most boards. Bet for value and protection.',
  'medium-pair':     'Overpair on low boards, underpair on high boards. Very board-dependent.',
  'small-pair':      'Set-mining hand. Without a set, usually check/fold to aggression.',
  'big-ace':         'Top pair on ace-high boards. Overcards elsewhere — c-bet as a bluff IP.',
  'suited-ace':      'Nut flush draw potential + backdoor equity. Great semi-bluff hand.',
  'suited-connector':'Draws and made hands on connected boards. Plays poorly on dry A/K-highs.',
  'broadway':        'Top pair on face-card boards. Vulnerable to aces and overcards.',
  'marginal':        'Positional hand. Check most flops unless you connect well.',
};

// Maps hand category → board texture → strength/action
// strength: 'strong' | 'moderate' | 'weak' | 'draw'
export const textureGuide = {
  'premium-pair': {
    'Ace-high dry':       { s: 'strong',   a: 'Bet 50-66%',    n: 'AA = top set. KK/QQ = overpair.' },
    'King-high dry':      { s: 'strong',   a: 'Bet 50-66%',    n: 'Overpair or top set. Bet for value.' },
    'Queen-high dry':     { s: 'strong',   a: 'Bet 50-66%',    n: 'Overpair. Standard value bet.' },
    'Jack-high dry':      { s: 'strong',   a: 'Bet 33-50%',    n: 'Clear overpair. Smaller sizing works.' },
    'Ten-high dry':       { s: 'strong',   a: 'Bet 33-50%',    n: 'Overpair on a safe board.' },
    'Mid-card dry':       { s: 'strong',   a: 'Bet 33-50%',    n: 'Big overpair. Small bet to keep worse in.' },
    'Connected 2-tone':   { s: 'moderate', a: 'Bet 66-75%',    n: 'Overpair but many draws. Bet to charge.' },
    'Connected rainbow':  { s: 'strong',   a: 'Bet 50-66%',    n: 'Overpair with fewer draws to worry about.' },
    'Paired board':       { s: 'strong',   a: 'Bet 25-33%',    n: 'Overpair is strong. Small sizing.' },
    'Low paired':         { s: 'strong',   a: 'Bet 25-33%',    n: 'Overpair. Opponent rarely has trips.' },
    'Monotone':           { s: 'moderate', a: 'Check or small', n: 'Vulnerable to flushes. Caution without the draw.' },
    'Ace-high 2-tone':    { s: 'strong',   a: 'Bet 50%',       n: 'Overpair with flush draw possible. Standard bet.' },
    'Broadway heavy':     { s: 'moderate', a: 'Bet 50%',       n: 'Overpair but straight draws lurk. Bet medium.' },
    'Low 2-tone':         { s: 'strong',   a: 'Bet 50-66%',    n: 'Overpair on a wet but low board.' },
    'Three-to-straight':  { s: 'moderate', a: 'Bet 50%',       n: 'Overpair but straight completed is possible.' },
    'Ace-high paired':    { s: 'strong',   a: 'Bet 33%',       n: 'Overpair or top set. Small sizing on paired A-high.' },
    'Mid 2-tone':         { s: 'strong',   a: 'Bet 50-66%',    n: 'Overpair. Standard continuation bet.' },
    'Wheel cards rainbow':{ s: 'strong',   a: 'Bet 33-50%',    n: 'Big overpair on a low board.' },
  },
  'medium-pair': {
    'Ace-high dry':       { s: 'weak',     a: 'Check',         n: 'Underpair to the ace. Check and evaluate.' },
    'King-high dry':      { s: 'weak',     a: 'Check',         n: 'Underpair. Not strong enough to bet for value.' },
    'Queen-high dry':     { s: 'moderate', a: 'Bet small or check', n: 'JJ overpair; TT/99/88 underpair. Mixed.' },
    'Jack-high dry':      { s: 'moderate', a: 'Bet 33-50%',    n: 'TT+ is overpair. 99/88 underpair.' },
    'Ten-high dry':       { s: 'strong',   a: 'Bet 33-50%',    n: 'JJ/TT are overpair/top set. Strong spot.' },
    'Mid-card dry':       { s: 'strong',   a: 'Bet 33-50%',    n: 'Overpair on a safe board.' },
    'Connected 2-tone':   { s: 'moderate', a: 'Bet 50% or check', n: 'Overpair but vulnerable. Board-dependent.' },
    'Connected rainbow':  { s: 'moderate', a: 'Bet 50%',       n: 'Overpair if above. Check if below.' },
    'Paired board':       { s: 'moderate', a: 'Check or bet small', n: 'Overpair is OK. Caution if board is high.' },
    'Low paired':         { s: 'strong',   a: 'Bet 33%',       n: 'Overpair is strong here.' },
    'Monotone':           { s: 'weak',     a: 'Check',         n: 'One pair on a flush board. Too vulnerable.' },
    'Ace-high 2-tone':    { s: 'weak',     a: 'Check',         n: 'Underpair to the ace + flush draws out there.' },
    'Broadway heavy':     { s: 'weak',     a: 'Check',         n: 'Often underpair. High boards hit caller\'s range.' },
    'Low 2-tone':         { s: 'strong',   a: 'Bet 50%',       n: 'Overpair on a low board. Bet to deny equity.' },
    'Three-to-straight':  { s: 'moderate', a: 'Check or bet',  n: 'Overpair if above, but straight possible.' },
    'Ace-high paired':    { s: 'weak',     a: 'Check',         n: 'Underpair to ace. Not betting for value.' },
    'Mid 2-tone':         { s: 'moderate', a: 'Bet 50% or check', n: 'Depends if you\'re above or below the board.' },
    'Wheel cards rainbow':{ s: 'strong',   a: 'Bet 33-50%',    n: 'Clear overpair on a low board.' },
  },
  'small-pair': {
    'Ace-high dry':       { s: 'weak',     a: 'Check/fold',    n: 'Underpair. No draws. Check and give up.' },
    'King-high dry':      { s: 'weak',     a: 'Check/fold',    n: 'Underpair. Only continue if you hit a set.' },
    'Queen-high dry':     { s: 'weak',     a: 'Check',         n: 'Underpair. Playing for set value only.' },
    'Jack-high dry':      { s: 'weak',     a: 'Check',         n: 'Underpair to most board cards.' },
    'Ten-high dry':       { s: 'weak',     a: 'Check',         n: '77 is overpair; rest are underpair. Mixed.' },
    'Mid-card dry':       { s: 'moderate', a: 'Check or small bet', n: 'Small overpair possible (77 on 652). Fragile.' },
    'Connected 2-tone':   { s: 'weak',     a: 'Check/fold',    n: 'Underpair + draws everywhere. Give up.' },
    'Connected rainbow':  { s: 'weak',     a: 'Check',         n: 'Underpair. Only strong if you flopped a set.' },
    'Paired board':       { s: 'weak',     a: 'Check',         n: 'Underpair. Only continue with a full house.' },
    'Low paired':         { s: 'moderate', a: 'Check or small', n: 'May have overpair. Fragile but playable.' },
    'Monotone':           { s: 'weak',     a: 'Check/fold',    n: 'Underpair + flush board. Fold to aggression.' },
    'Ace-high 2-tone':    { s: 'weak',     a: 'Check/fold',    n: 'Underpair. No reason to continue.' },
    'Broadway heavy':     { s: 'weak',     a: 'Check/fold',    n: 'Underpair to every card. Done without a set.' },
    'Low 2-tone':         { s: 'moderate', a: 'Check',         n: 'May have overpair. Draws make it risky.' },
    'Three-to-straight':  { s: 'weak',     a: 'Check/fold',    n: 'Underpair + made straights possible.' },
    'Ace-high paired':    { s: 'weak',     a: 'Check/fold',    n: 'Underpair + paired ace. Done.' },
    'Mid 2-tone':         { s: 'weak',     a: 'Check',         n: 'Underpair usually. Check and evaluate.' },
    'Wheel cards rainbow':{ s: 'moderate', a: 'Check or small', n: 'Overpair if 66+. Very fragile.' },
  },
  'big-ace': {
    'Ace-high dry':       { s: 'strong',   a: 'Bet 50-66%',    n: 'Top pair, strong kicker. Bet for value.' },
    'King-high dry':      { s: 'moderate', a: 'Bet 33% or check', n: 'AK has top pair. AQ/AJ overcards — can c-bet.' },
    'Queen-high dry':     { s: 'moderate', a: 'Bet 33%',       n: 'AQ has top pair. AK/AJ overcards. c-bet IP.' },
    'Jack-high dry':      { s: 'moderate', a: 'Bet 33%',       n: 'AJ has top pair. AK/AQ overcards. c-bet.' },
    'Ten-high dry':       { s: 'moderate', a: 'Bet 33%',       n: 'Two overcards. c-bet as a bluff.' },
    'Mid-card dry':       { s: 'moderate', a: 'Bet 33%',       n: 'Overcards + backdoors. c-bet IP.' },
    'Connected 2-tone':   { s: 'moderate', a: 'Check or bet',  n: 'Overcards but many draws out there.' },
    'Connected rainbow':  { s: 'moderate', a: 'Bet 33%',       n: 'Overcards on a connected board. Small c-bet.' },
    'Paired board':       { s: 'moderate', a: 'Bet 33%',       n: 'High cards unimproved. Can c-bet IP.' },
    'Low paired':         { s: 'moderate', a: 'Bet 33%',       n: 'Overcards. c-bet on a board that missed villain.' },
    'Monotone':           { s: 'draw',     a: 'Check or bet',  n: 'Nut flush draw if suited. Otherwise careful.' },
    'Ace-high 2-tone':    { s: 'strong',   a: 'Bet 50%',       n: 'Top pair + possible flush draw.' },
    'Broadway heavy':     { s: 'strong',   a: 'Bet 50%',       n: 'Top pair or strong draw on broadway boards.' },
    'Low 2-tone':         { s: 'moderate', a: 'Bet 33%',       n: 'Overcards. Can c-bet, be ready to give up.' },
    'Three-to-straight':  { s: 'moderate', a: 'Check or bet',  n: 'Overcards but scary board. Be cautious.' },
    'Ace-high paired':    { s: 'strong',   a: 'Bet 33-50%',    n: 'Top pair on an ace-high paired board.' },
    'Mid 2-tone':         { s: 'moderate', a: 'Bet 33%',       n: 'Overcards. Small c-bet, fold to resistance.' },
    'Wheel cards rainbow':{ s: 'moderate', a: 'Bet 33%',       n: 'Two overcards + gutshot possible. c-bet.' },
  },
  'suited-ace': {
    'Ace-high dry':       { s: 'moderate', a: 'Bet 33%',       n: 'Top pair, weak kicker. Bet small for thin value.' },
    'King-high dry':      { s: 'moderate', a: 'Bet 33%',       n: 'Overcards + backdoor flush. c-bet.' },
    'Queen-high dry':     { s: 'moderate', a: 'Bet 33%',       n: 'Ace overcard + backdoor flush. Can c-bet.' },
    'Jack-high dry':      { s: 'moderate', a: 'Bet 33%',       n: 'Overcard + backdoor nut flush. c-bet IP.' },
    'Ten-high dry':       { s: 'moderate', a: 'Bet 33%',       n: 'Overcard. c-bet as semi-bluff.' },
    'Mid-card dry':       { s: 'moderate', a: 'Check or small', n: 'Overcard only. Can c-bet with backdoors.' },
    'Connected 2-tone':   { s: 'draw',     a: 'Bet or check-raise', n: 'Nut flush draw if matching suit. Great semi-bluff.' },
    'Connected rainbow':  { s: 'moderate', a: 'Check or bet small', n: 'Overcard + wheel draw if low kicker.' },
    'Paired board':       { s: 'moderate', a: 'Bet 33%',       n: 'Overcard. Can bluff on paired boards.' },
    'Low paired':         { s: 'moderate', a: 'Bet 33%',       n: 'Overcard + possible pair with kicker.' },
    'Monotone':           { s: 'draw',     a: 'Bet or raise',  n: 'Nut flush draw! Strong semi-bluff.' },
    'Ace-high 2-tone':    { s: 'moderate', a: 'Bet 33-50%',    n: 'Top pair + possible flush draw.' },
    'Broadway heavy':     { s: 'moderate', a: 'Check or small', n: 'Overcard but behind broadway ranges.' },
    'Low 2-tone':         { s: 'draw',     a: 'Bet or raise',  n: 'Flush draw + overcard. Great semi-bluff spot.' },
    'Three-to-straight':  { s: 'moderate', a: 'Check',         n: 'Overcard but dangerous board. Be careful.' },
    'Ace-high paired':    { s: 'moderate', a: 'Bet 33%',       n: 'Top pair, weak kicker on paired board.' },
    'Mid 2-tone':         { s: 'draw',     a: 'Bet or raise',  n: 'Nut flush draw if matching. Semi-bluff.' },
    'Wheel cards rainbow':{ s: 'moderate', a: 'Check or bet',  n: 'Overcard + possible wheel draw (A2-A5).' },
  },
  'suited-connector': {
    'Ace-high dry':       { s: 'weak',     a: 'Check/fold',    n: 'Missed completely. No draws on a dry board.' },
    'King-high dry':      { s: 'weak',     a: 'Check',         n: 'Usually missed. Only continue with a pair+draw.' },
    'Queen-high dry':     { s: 'weak',     a: 'Check',         n: 'Missed. No draws. Give up.' },
    'Jack-high dry':      { s: 'weak',     a: 'Check',         n: 'May have bottom pair. Generally fold to bets.' },
    'Ten-high dry':       { s: 'moderate', a: 'Check or bet',  n: 'Pair possible for JTs/T9s. Draws with 98s/87s.' },
    'Mid-card dry':       { s: 'moderate', a: 'Check or small', n: 'Pair or overcards possible. Board-dependent.' },
    'Connected 2-tone':   { s: 'strong',   a: 'Bet or raise',  n: 'Straight draws, flush draws, or made hands. Best board type.' },
    'Connected rainbow':  { s: 'strong',   a: 'Bet 50-66%',    n: 'Open-ended straight draw or pair+draw.' },
    'Paired board':       { s: 'weak',     a: 'Check',         n: 'Missed. Paired boards are bad for draws.' },
    'Low paired':         { s: 'moderate', a: 'Check or small', n: 'May have a pair. Draws are limited.' },
    'Monotone':           { s: 'draw',     a: 'Bet or raise',  n: 'Flush draw is strong. Semi-bluff aggressively.' },
    'Ace-high 2-tone':    { s: 'weak',     a: 'Check',         n: 'Usually missed. Only continue with a flush draw.' },
    'Broadway heavy':     { s: 'moderate', a: 'Check or bet',  n: 'JTs/T9s may have a pair or straight draw.' },
    'Low 2-tone':         { s: 'strong',   a: 'Bet or raise',  n: 'Pair + flush draw or straight + flush draw. Go!' },
    'Three-to-straight':  { s: 'strong',   a: 'Bet 50-66%',    n: 'May have the straight or a strong draw.' },
    'Ace-high paired':    { s: 'weak',     a: 'Check/fold',    n: 'Missed on a high paired board.' },
    'Mid 2-tone':         { s: 'strong',   a: 'Bet or raise',  n: 'Straight draws + flush draws. Great board.' },
    'Wheel cards rainbow':{ s: 'moderate', a: 'Check or bet',  n: '65s/54s may have pair. Others missed.' },
  },
  'broadway': {
    'Ace-high dry':       { s: 'weak',     a: 'Check',         n: 'Ace is an overcard to you. Check and evaluate.' },
    'King-high dry':      { s: 'moderate', a: 'Bet 33-50%',    n: 'KQ/KJ has top pair. QJ overcards. c-bet.' },
    'Queen-high dry':     { s: 'moderate', a: 'Bet 33-50%',    n: 'QJ/QT top pair. KJ/KT overcards. c-bet.' },
    'Jack-high dry':      { s: 'moderate', a: 'Bet 33%',       n: 'JT top pair. Others overcards. Can c-bet.' },
    'Ten-high dry':       { s: 'moderate', a: 'Bet 33%',       n: 'QT/KT/JT top pair. Others overcards.' },
    'Mid-card dry':       { s: 'moderate', a: 'Bet 33%',       n: 'Two overcards. c-bet as a bluff.' },
    'Connected 2-tone':   { s: 'moderate', a: 'Check or bet',  n: 'May have draws or pair. Board-dependent.' },
    'Connected rainbow':  { s: 'moderate', a: 'Bet 33%',       n: 'Overcards or top pair. Small c-bet.' },
    'Paired board':       { s: 'moderate', a: 'Bet 33%',       n: 'Can c-bet as a bluff. High cards unimproved.' },
    'Low paired':         { s: 'moderate', a: 'Bet 33%',       n: 'Overcards on a low paired board. c-bet.' },
    'Monotone':           { s: 'draw',     a: 'Check or bet',  n: 'Flush draw if suited. Otherwise fold to pressure.' },
    'Ace-high 2-tone':    { s: 'weak',     a: 'Check',         n: 'Ace is bad for non-ace broadways.' },
    'Broadway heavy':     { s: 'strong',   a: 'Bet 50%',       n: 'Top pair or strong draw. This is your board.' },
    'Low 2-tone':         { s: 'moderate', a: 'Bet 33%',       n: 'Overcards. Small c-bet, be ready to give up.' },
    'Three-to-straight':  { s: 'moderate', a: 'Check or bet',  n: 'May have a straight or overcards. Be cautious.' },
    'Ace-high paired':    { s: 'weak',     a: 'Check',         n: 'Ace-high board is bad for non-ace hands.' },
    'Mid 2-tone':         { s: 'moderate', a: 'Bet 33%',       n: 'Overcards. Small c-bet.' },
    'Wheel cards rainbow':{ s: 'moderate', a: 'Bet 33%',       n: 'Two overcards on a low board. c-bet.' },
  },
  'marginal': {
    'Ace-high dry':       { s: 'weak',     a: 'Check/fold',    n: 'Usually missed. Check and give up.' },
    'King-high dry':      { s: 'weak',     a: 'Check',         n: 'Rarely connected. Only continue with a pair.' },
    'Queen-high dry':     { s: 'weak',     a: 'Check',         n: 'Missed most of the time.' },
    'Jack-high dry':      { s: 'weak',     a: 'Check',         n: 'May have a pair sometimes. Marginal.' },
    'Ten-high dry':       { s: 'weak',     a: 'Check',         n: 'Weak holding. Check and evaluate.' },
    'Mid-card dry':       { s: 'moderate', a: 'Check or small', n: 'May have middle pair. Play cautiously.' },
    'Connected 2-tone':   { s: 'moderate', a: 'Check or bet',  n: 'May have a draw. Otherwise fold.' },
    'Connected rainbow':  { s: 'moderate', a: 'Check',         n: 'Pair or draw possible but fragile.' },
    'Paired board':       { s: 'weak',     a: 'Check',         n: 'Missed. Don\'t bluff paired boards with nothing.' },
    'Low paired':         { s: 'weak',     a: 'Check',         n: 'Usually no connection. Give up.' },
    'Monotone':           { s: 'weak',     a: 'Check/fold',    n: 'No flush draw usually. Fold to bets.' },
    'Ace-high 2-tone':    { s: 'weak',     a: 'Check/fold',    n: 'Bad board for marginal hands.' },
    'Broadway heavy':     { s: 'weak',     a: 'Check',         n: 'Missed. Broadway boards hit strong ranges.' },
    'Low 2-tone':         { s: 'moderate', a: 'Check or bet',  n: 'May have a pair + draw. Otherwise fold.' },
    'Three-to-straight':  { s: 'weak',     a: 'Check/fold',    n: 'Scary board for weak hands.' },
    'Ace-high paired':    { s: 'weak',     a: 'Check/fold',    n: 'Nothing here. Give up.' },
    'Mid 2-tone':         { s: 'moderate', a: 'Check',         n: 'May have middle pair. Evaluate carefully.' },
    'Wheel cards rainbow':{ s: 'moderate', a: 'Check or small', n: 'May connect. Play with caution.' },
  },
};
