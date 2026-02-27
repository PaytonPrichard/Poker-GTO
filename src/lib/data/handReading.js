// ─────────────────────────────────────────────────────────────────────────────
// Hand Reading — GTO reference data
// ─────────────────────────────────────────────────────────────────────────────

// ── Range Narrowing ─────────────────────────────────────────────────────────
export const rangeNarrowing = [
  {
    title: 'Think in Ranges, Not Specific Hands',
    body:  'A common mistake is trying to guess the exact two cards your opponent holds. Instead, assign them a range of hands based on their position, action, and tendencies. As the hand progresses, you remove hands from that range that are inconsistent with their actions. This process of elimination is far more reliable than trying to "soul read" a specific holding.',
  },
  {
    title: 'Preflop Actions Define the Starting Range',
    body:  'Every preflop action dramatically shapes an opponent\'s range. An open-raise from early position represents a tight, strong range (roughly top 12-15% of hands). A 3-bet typically indicates premium holdings or select bluffs. A cold-call usually means medium-strength hands — strong enough to continue but not strong enough to re-raise. Players who limp preflop have the widest, weakest ranges of all.',
  },
  {
    title: 'Position-Based Range Construction',
    body:  'An UTG open in a 6-max game contains roughly 15% of hands — mostly big pairs, big broadway cards, and strong suited hands. A CO open widens to about 25%, adding more suited connectors and weaker broadways. A BTN open can be as wide as 40-50%, including small pairs, suited gappers, and offsuit broadways. Always factor in position when constructing an opponent\'s starting range before considering postflop action.',
  },
  {
    title: 'Board Texture Interaction with Ranges',
    body:  'Different boards hit different ranges unevenly. A K-Q-J board heavily favors the preflop raiser (who has more KK, QQ, JJ, AK, AQ, AJ combos) over the caller. A 7-6-5 board favors the caller (who has more 89s, 54s, 76s type hands the raiser would not open from EP). Understanding which boards favor which player\'s range is the foundation of good postflop strategy and helps you predict how opponents should act on each texture.',
  },
  {
    title: 'Bet Sizing as Information',
    body:  'Pay close attention to bet sizes — they reveal range composition. A small bet (25-33% pot) typically indicates a wide, merged range that wants to bet frequently with both value hands and weak holdings. A large bet (75-100%+ pot) indicates a polarized range — either very strong hands or bluffs, with few medium-strength holdings. When an opponent suddenly changes their sizing on a later street, it often signals a shift in range composition.',
  },
  {
    title: 'Timing Tells and Action Speed',
    body:  'While less reliable than betting patterns, timing can provide useful information. An instant call on the flop often indicates a draw or medium-strength made hand — a strong hand would consider raising and a weak hand would consider folding. A long pause followed by a raise frequently indicates genuine strength, as most players "Hollywood" with the nuts rather than with bluffs. Use timing tells as a tiebreaker, not a primary read.',
  },
  {
    title: 'Combining All Streets to Narrow the Range',
    body:  'Effective hand reading combines information from every street into a single coherent narrative. Start with the preflop range, then ask: which hands in that range would take this flop action? Which remaining hands would take this turn action? By the river, you should have a narrow, well-defined range that tells you whether you are ahead or behind. If your read leads to contradictory conclusions — for example, the opponent\'s line makes no sense for value or bluff — they are likely making an error, and you should call down more liberally.',
  },
];

// ── Board Texture Reading ───────────────────────────────────────────────────
export const boardTextureReading = [
  {
    texture:      'Dry Rainbow High (e.g., A-7-2 rainbow)',
    description:  'One high card with two disconnected low cards and no flush draw. This is one of the driest textures possible — very few draws exist, and hand equities are stable. The flop changes very little on the turn unless a second broadway card or a connecting card appears.',
    favoredRange: 'PFR',
    keyPoints:    'The preflop raiser has a significant range advantage here because they hold far more Ax combos, pocket pairs above 7, and AK/AQ specifically. The caller rarely has strong aces (they would have 3-bet AK/AQ) and mostly holds underpairs or backdoor draws. Expect high c-bet frequency from the PFR using a small sizing.',
  },
  {
    texture:      'Dry Rainbow Low (e.g., 8-4-2 rainbow)',
    description:  'All low, disconnected cards with no flush draw. Similar to dry high boards but the range advantage is less pronounced because neither player connects strongly. The PFR still has an overpair advantage, but the caller can have more sets (44, 22) in their range.',
    favoredRange: 'Neutral',
    keyPoints:    'Neither player smashes this board, but the PFR has more overpairs (99-AA) while the caller retains more small pocket pairs that hit sets. C-bet frequency should be lower than on ace-high dry boards because the PFR\'s range advantage is smaller. Check-raising by the caller with sets and straight draws is more common.',
  },
  {
    texture:      'Wet Connected (e.g., J-T-8 two-tone)',
    description:  'Highly connected cards with a flush draw available. This is one of the most dynamic textures — numerous straight draws, flush draws, and combo draws exist. Equities shift dramatically on the turn, making hand protection critical for made hands.',
    favoredRange: 'Caller',
    keyPoints:    'The caller\'s range is loaded with suited connectors, one-gappers, and suited broadways that connect heavily with this board (QJ, Q9, T9, 97, J9, flush draws). The PFR should c-bet at a lower frequency and use a larger sizing when they do bet. Check-raising is very common from the caller on this texture with draws and two-pair combinations.',
  },
  {
    texture:      'Monotone (e.g., 9-7-3 all spades)',
    description:  'All three cards share one suit, creating a completed flush possibility and numerous single-suit draws. This texture massively changes preflop equity rankings — a hand like A♠2♠ goes from marginal to very strong. Any non-spade overpair is significantly devalued.',
    favoredRange: 'Caller',
    keyPoints:    'The caller has more flush combos than the PFR because they flat with many suited hands that the PFR would not open (low suited connectors, suited one-gappers). Even strong made hands without the flush are vulnerable. C-bet frequency should be very low from the PFR. Any bet on a monotone board is typically large and polarized — either a flush or a strong bluff with a blocker to the flush suit.',
  },
  {
    texture:      'Paired Board (e.g., K-K-7)',
    description:  'One card is paired, reducing the number of possible combinations and creating trips/full house possibilities. This texture is very static — if you are ahead on the flop, you are almost always ahead on the turn. Draws are minimal unless a flush draw is present.',
    favoredRange: 'PFR',
    keyPoints:    'The PFR benefits from paired boards because they hold more Kx broadways (AK, KQ, KJ) and pocket pairs that make full houses. The caller has fewer strong Kx combos in their range. C-bet frequency is high using a small sizing because the PFR\'s range advantage is clear and the board is unlikely to change. Bluff-catching is difficult on paired boards because trips and boats are disguised.',
  },
  {
    texture:      'Broadway Heavy (e.g., K-Q-J)',
    description:  'Three broadway cards create numerous made straights, pair-plus-draw combos, and open-ended straight draws. This is a high-action texture where both players connect frequently. Big pots are common because top pair alone is often not strong enough.',
    favoredRange: 'PFR',
    keyPoints:    'The PFR has a slight range advantage because they hold all the premium broadways (AK, AQ, AJ, KQ) that make top pairs and straights. However, the caller also connects with suited broadways and pocket pairs that make sets. ATs and T9s make the nut straight. Expect large bet sizes from both players, as hand protection is critical on boards where a single turn card can make or break a hand.',
  },
  {
    texture:      'Low Connected (e.g., 5-4-3 two-tone)',
    description:  'Low connected cards with a flush draw create a board that the preflop raiser rarely hits. Overpairs are vulnerable to straight and flush draws, and hands like A2, 67, and 76 have strong draws or made straights. Equities run close together on this texture.',
    favoredRange: 'Caller',
    keyPoints:    'The caller\'s range is heavily favored on low connected boards because they hold more suited connectors (67s, 76s, 65s, 54s) and small pocket pairs (55, 44, 33) that hit sets. The PFR is often stuck with overcards or overpairs that have limited equity against two-pair-and-better hands. C-bet frequency should be low for the PFR. When the caller check-raises on this texture, it is very credible and hard to continue against without a strong hand.',
  },
  {
    texture:      'Ace-High Two-Tone (e.g., A-8-5 two-tone)',
    description:  'An ace-high board with two cards of the same suit is one of the most common textures in hold\'em. The ace favors the raiser, but the flush draw gives the caller equity and action. This creates a balanced, medium-dynamic texture where both players have strategic options.',
    favoredRange: 'PFR',
    keyPoints:    'The PFR has a clear range advantage with all their Ax holdings, but the caller can have flush draws, sets of 88 and 55, and occasionally A8s or A5s for two pair. The PFR should c-bet frequently with a medium sizing (50-66% pot) to deny equity from flush draws while still getting value from worse Ax hands. The presence of the flush draw means turns that complete the flush create interesting dynamics for both players.',
  },
];

// ── Sizing Tells ────────────────────────────────────────────────────────────
export const sizingTells = [
  {
    title: 'Min-Bets and Tiny Bets (< 25% Pot)',
    body:  'A tiny bet or min-bet is almost always a sign of weakness or a blocking bet designed to see a cheap showdown. The bettor is trying to control the pot size and discourage you from making a large raise. Occasionally, strong players will use min-bets with the nuts to induce raises, but in most games this sizing signals a marginal hand that wants to see the next card cheaply. The correct response is usually to raise with a polarized range — your strong value hands and your best bluffs.',
  },
  {
    title: 'Small Bets: 25-33% Pot',
    body:  'A small bet typically represents a "range bet" — a sizing used with a wide portion of a player\'s range. In GTO play, small bets are used on boards where one player has a significant range advantage and wants to bet frequently with both value and weak hands. This sizing puts consistent pressure on the opponent without risking too much with bluffs. When you face a small bet, your defending range should be very wide — you need to call or raise with roughly 70-75% of your range to prevent the small bet from being automatically profitable.',
  },
  {
    title: 'Medium Bets: 50-66% Pot',
    body:  'The "standard" bet size in most players\' arsenals. A half-pot to two-thirds-pot bet is used for value with strong-but-not-nutted hands, for protection against draws, and as a balanced bluffing size. This sizing works well on medium-dynamic boards where you want to charge draws while building the pot with made hands. Against this sizing you need to defend roughly 55-60% of your range. Medium bets are the hardest to read because they are used in the most balanced way.',
  },
  {
    title: 'Large Bets: 75-100% Pot',
    body:  'Large bets indicate a polarized range — the bettor either has a very strong hand or is bluffing, with very few medium-strength hands. This makes sense theoretically because large bets need to work less often as bluffs (a pot-sized bet only needs to work 50% of the time) while extracting maximum value from strong hands. When facing large bets, you should narrow your continuing range to your strongest holdings and your best bluff-catchers. Medium-strength hands become folds against this sizing.',
  },
  {
    title: 'Overbets: 100%+ Pot',
    body:  'An overbet (more than pot-sized) represents the most polarized action possible. When an opponent overbets, they are almost always representing the nuts or running a high-conviction bluff. In GTO play, overbets are correct when one player can have the nuts and the other cannot — for example, when the river completes a flush that only the bettor\'s range contains. Overbets force opponents into very tight calling ranges and are extremely efficient at extracting value or generating folds.',
  },
  {
    title: 'Check-Raises: Very Strong or Semi-Bluff',
    body:  'A check-raise is the most aggressive action in poker and typically represents either a very strong made hand (sets, two pair, straights) or a strong semi-bluff (flush draw, open-ended straight draw with extra equity). The check-raise range is naturally polarized because medium-strength hands prefer to call or lead out rather than check-raise. When facing a check-raise, discount your opponent\'s middle-of-range hands significantly — they are heavily weighted toward the top and bottom of their range.',
  },
  {
    title: 'The Information in Bet Timing',
    body:  'The combination of sizing and timing reveals the most information. A quick small bet usually indicates a rehearsed blocking bet with a weak hand. A delayed large bet suggests genuine deliberation between value sizing options with a strong hand. A quick large bet is often polarized — the player has already decided they are going all-in or folding and the bet size is automatic. Pay attention to when players deviate from their typical timing patterns, as these deviations are often the most reliable tells.',
  },
];

// ── Street-by-Street Examples ───────────────────────────────────────────────
export const streetByStreet = [
  {
    title:   'UTG vs BTN: Ace-High Dry Board',
    preflop: 'UTG opens to 2.5 BB with a tight ~15% range. We call on the BTN with a range of suited connectors, mid-pairs, and broadway hands. The blinds fold, and we go heads-up to the flop with position.',
    flop:    'Flop: A♠ 7♦ 2♣. UTG c-bets 33% pot. This is a textbook range bet on an ace-high dry board where UTG has a large range advantage. Their range includes all Ax hands, overpairs, and their entire c-bet bluffing range. We can narrow their range to: still very wide, roughly 70-80% of opening range is betting here.',
    turn:    'Turn: 9♥. UTG bets 66% pot — a larger, more polarized sizing. This sizing removes their weak Ax hands and air from the range. Their range narrows to strong top pairs (AK, AQ, AJ), overpairs (KK, QQ), and some bluffs with gutshots or backdoor equity. Medium aces (AT, A8) would likely check to control the pot.',
    river:   'River: 3♦. UTG bets 80% pot. A third barrel on a brick river into a board that has not changed is heavily polarized. Their value range is strong aces (AK, AQ) and overpairs. Their bluffs are likely busted draws like KQs with a backdoor that missed. Medium-strength hands like AJ would check for showdown value.',
    lesson:  'On dry boards, the PFR can c-bet at high frequency with small sizes. As they barrel on later streets with increasing sizes, their range becomes progressively narrower and more polarized. Each street of aggression removes medium-strength hands from the range.',
  },
  {
    title:   'CO vs BB: Wet Connected Flop',
    preflop: 'CO opens to 2.5 BB with a ~25% range. BB defends with a wide range of suited hands, connectors, and broadways. We go to the flop out of position in the BB.',
    flop:    'Flop: J♠ T♥ 8♠. CO c-bets 55% pot — a larger sizing on a wet, connected board. This sizing indicates they are being selective about which hands they bet. Their betting range includes strong made hands (JJ, TT, QJ, KJ, sets) and draws (AQ, KQ, Q9, spade draws). Their checking range includes weak overcards (AK with no spade) and small pairs.',
    turn:    'Turn: 4♦. CO bets 70% pot again. The turn brick does not change the board texture, and the continued large sizing further narrows their range. They are unlikely to double barrel with naked overcards on this wet board. Their range is now weighted toward strong top pairs (KJ, QJ with a draw), two pair, sets, and combo draws. Hands like bare KQ or AK without a spade have likely given up.',
    river:   'River: 2♣. CO bets 90% pot. All draws have missed, and the board is still J-T-8-4-2. A third barrel for a large size when draws bricked means their range is heavily polarized: sets and strong two-pair for value, and missed straight draws (AQ, KQ, Q9 without a spade) for bluffs. Pure one-pair hands do not bet this size on this river.',
    lesson:  'On wet boards, each street of aggression with large sizing removes medium-strength hands and narrows the range to strong value and bluffs. When draws miss on the river, a large bet tells you the opponent is polarized — call with your best bluff-catchers and fold your weak one-pair hands.',
  },
  {
    title:   'BTN 3-Bet vs BB: Low Paired Board',
    preflop: 'We open BTN, BB 3-bets. We call. The BB\'s 3-bet range is polarized: premium hands (AA-QQ, AK, AQs) for value and bluffs (A5s-A2s, suited connectors, some suited gappers). Our calling range includes mid-pairs (JJ-66), suited broadways (KQs, QJs, JTs), and some suited connectors.',
    flop:    'Flop: 6♠ 6♦ 3♥. BB bets 33% pot. On this paired, dry board, the 3-bettor has a range advantage with all their overpairs. A small bet with high frequency is correct here. Their range for this bet is wide — virtually all their overpairs, Ax hands, and bluffs. Having a 6 is rare for either player, so sets are largely discounted.',
    turn:    'Turn: K♣. BB bets 70% pot. The king is significant — it improves AK to top pair and keeps KK as an overpair. The larger sizing removes low-equity bluffs from the range. BB\'s range narrows to overpairs (AA, KK, QQ), AK for top pair, and some continued semi-bluffs with A5s-A4s (gutshots to the wheel). Hands like A9s or A8s are likely checking.',
    river:   'River: T♠. BB checks. The check is extremely informative. By checking after barreling flop and turn, BB is capping their range — they are unlikely to have AA, KK, or AK (which would bet for value). Their checking range is likely QQ-JJ (afraid of the king), or a bluff that gave up. Our medium pairs like 99, 88 become strong bluff-catchers against this capped range.',
    lesson:  'A check after two streets of aggression is one of the strongest tells in poker. It caps the opponent\'s range by removing their strongest value hands. When an opponent checks in a spot where their value hands would clearly bet, you can narrow their range dramatically and either value bet thin or call down lighter.',
  },
  {
    title:   'MP vs CO: Monotone Flop',
    preflop: 'MP opens to 2.5 BB. CO calls with a range that includes pocket pairs, suited connectors, suited broadways, and some suited aces. MP\'s opening range is roughly 18% — mostly strong broadways, pairs, and suited hands.',
    flop:    'Flop: Q♥ 8♥ 4♥. MP checks. This is a key moment for hand reading — a check from the PFR on a monotone board is very common in GTO play because the caller has more flush combos. MP\'s check does not mean weakness per se, but it does indicate they likely do not have a flush. Their checking range includes overpairs without a heart, AQ without a heart, and strong hands with one heart (like A♥K or K♥K) that want to check-raise.',
    turn:    'Turn: J♣. MP now leads for 50% pot (a "donk bet" into the flop checker). This is unusual and informative. After checking a monotone flop, betting the turn when a non-heart hits suggests MP has a hand that improved or gained confidence that no flush is present. Their range includes QQ for a set, QJ for two pair, JJ for a turned set, and possibly A♥x one-heart hands that are semi-bluffing.',
    river:   'River: 2♠. MP bets 75% pot. No flush ever arrived, and MP has barreled two streets after a flop check. Their range is heavily weighted toward strong made hands that were trapping on the flop — sets, two pair, and overpairs that checked the flop for deception. Bluffs in this line are rare because most players would not check the flop and then barrel two streets with air on a monotone board.',
    lesson:  'When a player checks a flop where they would normally c-bet and then starts betting on later streets, they are often revealing a trapping line with a strong hand. On monotone boards, a flop check followed by turn and river aggression when no additional flush cards come is a very strong line that is hard to bluff.',
  },
  {
    title:   'SB vs BB: Multi-Street Barrel Line',
    preflop: 'SB completes (limps). BB checks. Both ranges are very wide — SB could have almost any two cards that did not raise, and BB has a random range. Neither player has shown strength preflop, so starting ranges are extremely wide and undefined.',
    flop:    'Flop: K♦ 9♠ 5♦. BB bets 50% pot. In a limped pot, the first bettor takes the initiative that no one claimed preflop. BB\'s betting range here is wide: any king, any 9, any 5, diamond draws, gutshots, and pure bluffs. Because preflop ranges are so wide, this single bet does very little to narrow the range — we cannot assume much strength or weakness yet.',
    turn:    'Turn: 2♣. BB bets 66% pot. A second barrel on a brick turn starts to narrow the range meaningfully. Weak pairs of 9 and 5 would likely check for pot control. Diamond draws continue. BB\'s range is now weighted toward Kx hands, strong 9x hands, diamond draws with extra equity, and persistent bluffs. Pure air starts to drop out here.',
    river:   'River: 7♥. BB bets 80% pot. Diamonds missed. The third barrel for a large size after limped preflop action is notable. BB\'s value range includes strong kings (K9, K5 for two pair, KT+), sets, and the rare straight (86 for the gutshot that got there). Their bluff range is mainly busted diamond draws that picked up this line. The key question: does this opponent bluff rivers enough? In a limped pot with wide ranges, triple barrels should be respected more than usual because there is less incentive to bluff three streets for a small pot.',
    lesson:  'In limped pots, hand reading is harder because preflop ranges are undefined. Pay extra attention to each postflop action as the primary source of information. Multi-street aggression in a small, limped pot is often more credible than in a raised pot because players have less incentive to run complex bluffs for small pots. Respect triple barrels in limped pots unless you have a strong read that the opponent is overly aggressive.',
  },
];
