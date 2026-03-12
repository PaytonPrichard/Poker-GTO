export const handScenarios = [
  // ============================================================
  // EASY #1
  // ============================================================
  {
    id: 1,
    title: "Top Pair Good Kicker on Dry Board",
    difficulty: "easy",
    setup:
      "You hold A♠ K♦ on the Button. 100bb effective stacks. A loose player in the HJ opens to 2.5bb. You 3-bet to 8bb. Blinds fold. HJ calls.",
    streets: [
      {
        street: "flop",
        board: "A♥ 7♣ 2♠",
        pot: "17.5 BB",
        narrative:
          "You flop top pair top kicker on a very dry board. Villain checks to you as the 3-bettor.",
        options: [
          {
            label: "Check",
            correct: false,
            feedback:
              "Checking here misses value. You have the range and nut advantage on this A-high dry board. As the preflop 3-bettor you should be c-betting at a high frequency here, and TPTK is a clear value hand to bet with."
          },
          {
            label: "Bet 1/3 pot (~6 BB)",
            correct: true,
            feedback:
              "Correct. On dry A-high boards, the 3-bettor has a massive range advantage. Solvers prefer a small, high-frequency c-bet here. Betting 1/3 pot lets you value-bet thinly and bluff cheaply. TPTK is strong enough to bet for value against Villain's continuing range of Ax, pocket pairs, and some floats."
          },
          {
            label: "Bet 2/3 pot (~12 BB)",
            correct: false,
            feedback:
              "Overbetting relative to what the situation calls for. On a dry A-x-x board as the 3-bettor, a small c-bet is preferred because your range advantage is so large that you can bet nearly your entire range at a low price. A 2/3 pot bet folds out too many hands you want to keep in."
          }
        ]
      },
      {
        street: "turn",
        board: "A♥ 7♣ 2♠ 9♦",
        pot: "29.5 BB",
        narrative:
          "The turn is the 9♦, a relatively blank card. Villain checks again.",
        options: [
          {
            label: "Check",
            correct: false,
            feedback:
              "Your hand is too strong to give up betting here. Villain's checking range still contains plenty of Ax hands with weaker kickers, pocket pairs like TT-QQ, and some stubborn floats. You should continue extracting value."
          },
          {
            label: "Bet 1/3 pot (~10 BB)",
            correct: false,
            feedback:
              "On the turn you can start sizing up. A 1/3 pot bet is too small — it lets Villain continue too cheaply with draws and weak pairs while not building the pot enough with your premium hand."
          },
          {
            label: "Bet 2/3 pot (~20 BB)",
            correct: true,
            feedback:
              "Correct. On the turn, the board is still relatively dry and your hand is strong. A 2/3 pot bet extracts value from Ax hands, overpairs below your TPTK, and stubborn pocket pairs, while also charging any backdoor draws or floats."
          },
          {
            label: "All-in",
            correct: false,
            feedback:
              "Way too aggressive. An all-in overbet on the turn with one pair would only get called by hands that beat you (sets, two pair). You want to bet for value, not blow Villain off the hands you dominate."
          }
        ]
      },
      {
        street: "river",
        board: "A♥ 7♣ 2♠ 9♦ 4♣",
        pot: "69.5 BB",
        narrative:
          "The river is the 4♣, completing no draws. Villain checks a third time. You have about 72bb behind.",
        options: [
          {
            label: "Check",
            correct: false,
            feedback:
              "Villain's range is capped after checking three streets. They likely hold a medium-strength hand like a weaker Ace, a pocket pair, or possibly gave up on a float. You should bet for thin value — many of these hands will pay off one more bet."
          },
          {
            label: "Bet 1/3 pot (~23 BB)",
            correct: true,
            feedback:
              "Correct. A thin value bet is ideal here. Villain's range is heavily capped after triple-checking, but they can still call with weaker Aces, pocket pairs like TT-QQ, and occasionally a sticky 77. A small river bet maximizes the calls you get from these weaker hands."
          },
          {
            label: "Bet 2/3 pot (~46 BB)",
            correct: false,
            feedback:
              "This is a bit too large. After Villain has checked three times, their range is weak and capped. A 2/3 pot bet will fold out most of the hands you're trying to extract value from. Size down to keep them in."
          }
        ]
      }
    ]
  },

  // ============================================================
  // EASY #2
  // ============================================================
  {
    id: 2,
    title: "Overpair Facing a Donk Bet",
    difficulty: "easy",
    setup:
      "You hold Q♠ Q♥ in the CO. 100bb effective stacks. You open to 2.5bb. The BB calls.",
    streets: [
      {
        street: "flop",
        board: "8♦ 5♣ 3♠",
        pot: "5.5 BB",
        narrative:
          "You flop an overpair on a low, dry board. Surprisingly, the BB leads into you for 4bb (a donk bet).",
        options: [
          {
            label: "Fold",
            correct: false,
            feedback:
              "Folding an overpair on a low board to a single bet is far too tight. You beat the vast majority of Villain's donk-betting range, which often includes top pair, middle pair, and draws."
          },
          {
            label: "Call",
            correct: false,
            feedback:
              "Calling is okay but not optimal. With an overpair on a dry low board, you should raise to punish Villain's merged donk range. By raising, you build the pot when ahead, deny equity from draws like 67 or 46, and define Villain's range going forward."
          },
          {
            label: "Raise to 12 BB",
            correct: true,
            feedback:
              "Correct. Raising the donk bet with QQ is the best play. You have a significant equity advantage over Villain's donk range, which typically includes top pair (8x), middle pair, gutshots, and some bluffs. Raising builds the pot with the best hand, charges draws, and puts Villain in a tough spot with their weaker holdings."
          }
        ]
      },
      {
        street: "turn",
        board: "8♦ 5♣ 3♠ J♥",
        pot: "29.5 BB",
        narrative:
          "Villain called your raise. The turn is the J♥. Villain checks to you. You have ~76bb behind.",
        options: [
          {
            label: "Check",
            correct: false,
            feedback:
              "Checking would be too passive. The J♥ doesn't change the board texture dramatically. Your overpair is still well ahead of Villain's range of 8x, 5x, and draws. Keep betting for value and protection."
          },
          {
            label: "Bet ~15 BB (half pot)",
            correct: true,
            feedback:
              "Correct. A half-pot bet continues to extract value from Villain's pair hands (88, J8, 8x, 5x) and charges any remaining draws. You want to keep the pot manageable with one pair while still building value."
          },
          {
            label: "Bet ~25 BB (pot)",
            correct: false,
            feedback:
              "A pot-sized bet is too large. It folds out most of the hands you want to get value from and only gets called by hands that are ahead of you or have strong draws. A more moderate sizing keeps Villain's weaker holdings in."
          }
        ]
      },
      {
        street: "river",
        board: "8♦ 5♣ 3♠ J♥ 2♦",
        pot: "59.5 BB",
        narrative:
          "Villain calls again. The river is the 2♦, a complete blank. Villain checks. You have ~61bb behind.",
        options: [
          {
            label: "Check",
            correct: false,
            feedback:
              "Villain has called two streets and can still have 8x, J8, and maybe even a stubborn 55. Checking the river with QQ leaves money on the table. You should bet for thin value."
          },
          {
            label: "Bet ~20 BB (1/3 pot)",
            correct: true,
            feedback:
              "Correct. A thin value bet targets the 8x and Jx hands that Villain may have floated with. After calling flop and turn, Villain's range is narrowed but still contains enough worse hands to make a small river bet profitable."
          },
          {
            label: "All-in (~61 BB)",
            correct: false,
            feedback:
              "Shoving the river with one pair is a massive overbet that only gets called by hands beating you (sets, two pair, potentially JJ). You want to size small and get looked up by Villain's bluff-catchers."
          }
        ]
      }
    ]
  },

  // ============================================================
  // EASY #3
  // ============================================================
  {
    id: 3,
    title: "Flopped Set on a Wet Board",
    difficulty: "easy",
    setup:
      "You hold 7♠ 7♥ in the BB. 100bb effective stacks. The CO opens to 2.5bb, you call.",
    streets: [
      {
        street: "flop",
        board: "K♠ 7♦ 6♠",
        pot: "5.5 BB",
        narrative:
          "You flop bottom set on a wet board with a flush draw and straight draw possible. CO c-bets 3.5bb.",
        options: [
          {
            label: "Fold",
            correct: false,
            feedback:
              "Never fold a set here. You have one of the strongest hands possible. Even on a wet board, bottom set has enormous equity against Villain's entire range."
          },
          {
            label: "Call",
            correct: false,
            feedback:
              "Calling is too passive with a set on a wet board. There are many turn cards that can kill your action (any spade, any 5, 8, 9, T) or give Villain a free card to outdraw you. You need to raise to build the pot and charge draws."
          },
          {
            label: "Raise to 11 BB",
            correct: true,
            feedback:
              "Correct. On a wet, coordinated board with flush and straight draws available, you must raise your sets to build the pot and charge drawing hands. A raise to about 3x the c-bet is standard. You also balance your check-raise range with semi-bluffs like flush draws and straight draws from this position."
          }
        ]
      },
      {
        street: "turn",
        board: "K♠ 7♦ 6♠ 2♥",
        pot: "28.5 BB",
        narrative:
          "Villain calls your check-raise. The turn is the 2♥, a brick that completes no draws. Villain checks. You have ~78bb behind.",
        options: [
          {
            label: "Check",
            correct: false,
            feedback:
              "Checking gives free cards to all the flush and straight draws in Villain's range. With a set you want to keep building the pot. The 2♥ changed nothing — keep applying pressure."
          },
          {
            label: "Bet ~14 BB (half pot)",
            correct: false,
            feedback:
              "A half-pot bet is reasonable but undersized. With a set on a draw-heavy board, you want to bet larger to charge the flush draws (which have ~20% equity) and straight draws. You also want to build the pot to set up a river shove."
          },
          {
            label: "Bet ~21 BB (3/4 pot)",
            correct: true,
            feedback:
              "Correct. A 3/4 pot bet is the right sizing here. It charges flush and straight draws the maximum while still getting called by top pair and overpairs. It also sets up a natural river all-in with ~57bb going into a ~70bb pot."
          }
        ]
      },
      {
        street: "river",
        board: "K♠ 7♦ 6♠ 2♥ T♣",
        pot: "70.5 BB",
        narrative:
          "Villain calls. The river is the T♣, missing all draws. Villain checks. You have ~57bb behind.",
        options: [
          {
            label: "Check",
            correct: false,
            feedback:
              "Checking the river with a set after betting two streets would be a huge mistake. Villain's range is heavy with Kx hands and overpairs that will call a shove. You've built the pot specifically to get all the money in on the river."
          },
          {
            label: "Bet ~25 BB (1/3 pot)",
            correct: false,
            feedback:
              "Undersized. You've built the pot across two streets to set up a river jam. Betting small leaves money behind when Villain will call a larger bet with Kx and overpairs."
          },
          {
            label: "All-in (~57 BB)",
            correct: true,
            feedback:
              "Correct. After check-raising the flop and betting the turn, the stack-to-pot ratio is perfect for a river shove. Villain's range is full of Kx hands, overpairs, and KT that just improved. They'll be priced in to call with most of these hands, maximizing your value."
          }
        ]
      }
    ]
  },

  // ============================================================
  // MEDIUM #1
  // ============================================================
  {
    id: 4,
    title: "Flush Draw as a Semi-Bluff",
    difficulty: "medium",
    setup:
      "You hold A♥ 9♥ on the BTN. 100bb effective stacks. You open to 2.5bb. The BB calls.",
    streets: [
      {
        street: "flop",
        board: "K♥ 6♥ 3♦",
        pot: "5.5 BB",
        narrative:
          "You flop the nut flush draw with a backdoor straight draw. You have no made hand yet, but strong equity. BB checks to you.",
        options: [
          {
            label: "Check",
            correct: false,
            feedback:
              "Checking is suboptimal. You have the nut flush draw which has ~36% equity against a typical top-pair hand, plus you have position. This is a textbook semi-bluff c-bet spot — you can win the pot immediately or build it for when you hit."
          },
          {
            label: "Bet 1/3 pot (~2 BB)",
            correct: true,
            feedback:
              "Correct. A small c-bet with the nut flush draw is ideal. On a K-high board as the preflop raiser, you have a range advantage and can c-bet at high frequency with a small size. Your hand benefits from fold equity now and has strong equity when called. The small size also keeps the pot manageable if you miss."
          },
          {
            label: "Bet 3/4 pot (~4 BB)",
            correct: false,
            feedback:
              "Too large for this spot. On a K-x-x board, a small c-bet achieves the same goals at lower risk. A larger bet commits more chips with a drawing hand and folds out the very hands (weak pairs) that you have good equity against."
          }
        ]
      },
      {
        street: "turn",
        board: "K♥ 6♥ 3♦ T♠",
        pot: "9.5 BB",
        narrative:
          "Villain calls. The turn is the T♠, which misses your flush draw. Villain checks again.",
        options: [
          {
            label: "Check",
            correct: true,
            feedback:
              "Correct. After getting called on the flop, Villain has shown some strength (likely Kx or a pair). Firing again on a blank turn with just a draw risks building a big pot when you're behind. Checking preserves your equity, keeps the pot small, and lets you see a river card for free. You can also represent a slow-play on the river."
          },
          {
            label: "Bet 1/3 pot (~3 BB)",
            correct: false,
            feedback:
              "A small bet could work as a blocker bet in some lines, but against a BB defender who called the flop, double-barreling with just a flush draw on an unfavorable turn card burns money when called. Checking keeps the pot small and lets you realize your equity."
          },
          {
            label: "Bet 2/3 pot (~6 BB)",
            correct: false,
            feedback:
              "Firing a large turn bet with a naked flush draw after getting called on the flop is too aggressive. Villain's range is condensed to pairs and draws after calling flop, and a 2/3 pot bet with no made hand and no additional equity pickup is a losing play over time."
          }
        ]
      },
      {
        street: "river",
        board: "K♥ 6♥ 3♦ T♠ 5♥",
        pot: "9.5 BB",
        narrative:
          "The river is the 5♥, completing your nut flush! Villain leads out for 7bb.",
        options: [
          {
            label: "Call",
            correct: false,
            feedback:
              "Just calling with the nut flush is far too passive. Villain is betting into you, which means they have a hand they think is good. Raising extracts maximum value against their top pairs, two pairs, and lower flushes."
          },
          {
            label: "Raise to 22 BB",
            correct: true,
            feedback:
              "Correct. With the nut flush on the river facing a donk bet, raising is mandatory for value. Villain's bet indicates strength — likely Kx, KT two pair, or a lower flush. A raise to about 3x gets called by two pair and lower flushes, which is exactly the value you want to extract."
          },
          {
            label: "All-in (~90 BB)",
            correct: false,
            feedback:
              "An all-in overbet jams is too large and looks very strong. It folds out Villain's medium-strength hands like top pair, which would have called a normal raise. A standard raise sizes up the pot while keeping more of Villain's range calling."
          }
        ]
      }
    ]
  },

  // ============================================================
  // MEDIUM #2
  // ============================================================
  {
    id: 5,
    title: "C-Bet Bluff on a Favorable Board",
    difficulty: "medium",
    setup:
      "You hold A♠ 5♠ in the CO. 100bb effective stacks. You open to 2.5bb. Only the BB calls.",
    streets: [
      {
        street: "flop",
        board: "Q♦ 8♣ 3♥",
        pot: "5.5 BB",
        narrative:
          "You completely missed this flop with A-high. BB checks to you. You have position and the preflop range advantage on this Q-high board.",
        options: [
          {
            label: "Check",
            correct: false,
            feedback:
              "While checking has some merit to realize your A-high equity, this is a favorable board texture for your c-bet range. You have A-high with a backdoor nut flush draw, and this hand benefits from fold equity more than showdown value."
          },
          {
            label: "Bet 1/3 pot (~2 BB)",
            correct: true,
            feedback:
              "Correct. A small c-bet is the right play. On Q-8-3 rainbow, the CO opening range has a significant advantage. A small bet puts BB's wide defending range in a tough spot. Your A5s has backdoor nut flush equity, an overcard, and very little showdown value — making it an ideal bluffing candidate at this small size."
          },
          {
            label: "Bet 3/4 pot (~4 BB)",
            correct: false,
            feedback:
              "The sizing is too large. On a dry, disconnected board where you want to c-bet at high frequency, a small sizing is more efficient. It achieves nearly the same fold equity at a fraction of the cost, and when you do get called, you lose less with your bluffs."
          }
        ]
      },
      {
        street: "turn",
        board: "Q♦ 8♣ 3♥ 2♠",
        pot: "9.5 BB",
        narrative:
          "Villain calls. The turn is the 2♠, giving you a backdoor flush draw. Villain checks.",
        options: [
          {
            label: "Check",
            correct: true,
            feedback:
              "Correct. After getting called on the flop, Villain likely has a pair (Qx, 8x, or a pocket pair). Continuing to bluff with just A-high and a backdoor flush draw on a blank turn is unprofitable. Checking lets you see a free river, and if you hit your flush or Ace, you can bet for value. If not, you can give up."
          },
          {
            label: "Bet 1/3 pot (~3 BB)",
            correct: false,
            feedback:
              "Firing the turn after getting called is generally a mistake without additional equity pickups. Yes, you have a backdoor flush draw now, but Villain's range is stronger after calling the flop. Save your aggression for hands with better equity."
          },
          {
            label: "Bet 2/3 pot (~6 BB)",
            correct: false,
            feedback:
              "Double-barreling large with A-high is burning money. Villain called the flop and holds pairs that are not folding to a turn bet. You need to recognize when your bluff has run its course and preserve your stack."
          }
        ]
      },
      {
        street: "river",
        board: "Q♦ 8♣ 3♥ 2♠ J♠",
        pot: "9.5 BB",
        narrative:
          "The river is the J♠, missing your flush draw. You have Ace-high. Villain checks.",
        options: [
          {
            label: "Check",
            correct: true,
            feedback:
              "Correct. Your A-high has very little showdown value but also very little fold equity after Villain called the flop and checked two streets. Villain's range is mostly Qx and 8x hands that will not fold to a river bet. Ace-high might occasionally win at showdown against complete missed draws. Accept the result and check it back."
          },
          {
            label: "Bet 1/3 pot (~3 BB)",
            correct: false,
            feedback:
              "A river bluff here has very little chance of working. Villain's range after calling the flop and checking through is loaded with pairs that will look you up. Don't throw away chips with a hopeless bluff."
          },
          {
            label: "Bet 2/3 pot (~6 BB)",
            correct: false,
            feedback:
              "This would be a punt. You have no blockers to Villain's calling range, no straight or flush that you can credibly represent given your line, and Villain's range is condensed to medium-strength hands that are not folding. Check and accept the loss."
          }
        ]
      }
    ]
  },

  // ============================================================
  // MEDIUM #3
  // ============================================================
  {
    id: 6,
    title: "Check-Raise Bluff with a Combo Draw",
    difficulty: "medium",
    setup:
      "You hold 9♠ 8♠ in the BB. 100bb effective stacks. The BTN opens to 2.5bb. SB folds. You call.",
    streets: [
      {
        street: "flop",
        board: "T♠ 7♦ 2♠",
        pot: "5.5 BB",
        narrative:
          "You flop an open-ended straight draw plus a flush draw — a monster combo draw with 15 outs. BTN c-bets 2bb.",
        options: [
          {
            label: "Call",
            correct: false,
            feedback:
              "Calling is too passive with 15 outs (~54% equity against top pair). You have a monster draw that should be played aggressively. A check-raise builds the pot for when you hit and puts maximum pressure on Villain's weaker holdings."
          },
          {
            label: "Check-raise to 7.5 BB",
            correct: true,
            feedback:
              "Correct. With an open-ended straight flush draw (15 outs, ~54% equity vs top pair), this is a textbook check-raise semi-bluff. You can win the pot immediately if Villain folds, and if called, you have massive equity to draw to the nuts on the turn and river. This hand is one of the best candidates for a check-raise in your BB defending range."
          },
          {
            label: "Fold",
            correct: false,
            feedback:
              "Never fold a combo draw with 15 outs. You have more equity than most made hands on this board. This is one of the most profitable spots in poker — folding here is leaving enormous value on the table."
          }
        ]
      },
      {
        street: "turn",
        board: "T♠ 7♦ 2♠ K♣",
        pot: "20.5 BB",
        narrative:
          "Villain calls your check-raise. The turn is the K♣, which misses your draws but adds some credibility to your range. You have ~72bb behind.",
        options: [
          {
            label: "Check",
            correct: false,
            feedback:
              "Checking gives up all your fold equity and allows Villain to realize equity for free. After check-raising the flop, you should continue telling a credible story on turns that favor your perceived range. The K♣ is a great card to barrel because it's a scare card for Villain's medium-strength hands."
          },
          {
            label: "Bet ~10 BB (half pot)",
            correct: true,
            feedback:
              "Correct. The K♣ is an excellent barrel card. It improves your perceived range (you could have KTs, K7s, KK in your check-raise range) and puts pressure on Villain's Tx and 77 hands. You still have 12 outs to the nuts (8 flush outs + 4 straight outs minus overlap). A half-pot bet balances aggression with pot control, keeping your river options open."
          },
          {
            label: "All-in (~72 BB)",
            correct: false,
            feedback:
              "Shoving is way too aggressive. It overcommits your stack with a draw and gives Villain a very easy call with strong hands while folding out everything you have beat. A measured bet keeps the pressure on while leaving room to navigate the river."
          }
        ]
      },
      {
        street: "river",
        board: "T♠ 7♦ 2♠ K♣ 4♥",
        pot: "40.5 BB",
        narrative:
          "Villain calls. The river is the 4♥, missing all your draws. You have 9-high. You have ~62bb behind.",
        options: [
          {
            label: "Check (give up)",
            correct: false,
            feedback:
              "Checking concedes the pot with 9-high, which has zero showdown value. After telling a strong story with a check-raise and turn barrel, you should follow through and bluff the river at some frequency. This is one of the hands in your range that must bluff to stay balanced."
          },
          {
            label: "Bet ~20 BB (half pot)",
            correct: false,
            feedback:
              "A half-pot bet is too small for a river bluff in this spot. After building a big pot, a small river bet looks weak and gets looked up too often. If you're going to bluff, you need to use a sizing that puts genuine pressure on Villain's bluff-catchers."
          },
          {
            label: "Bet ~32 BB (3/4 pot)",
            correct: true,
            feedback:
              "Correct. With 9-high and zero showdown value, this hand must either bluff or surrender the pot. After check-raising flop and barreling turn, your line tells a very credible story — you could have KT, a set, K7s, or two pair. A 3/4 pot river bet applies maximum pressure on Villain's Tx and underpair bluff-catchers. This is a spot where you must follow through with your bluffs to stay balanced."
          }
        ]
      }
    ]
  },

  // ============================================================
  // HARD #1
  // ============================================================
  {
    id: 7,
    title: "Thin Value Bet vs. Check on a Scary River",
    difficulty: "hard",
    setup:
      "You hold A♦ J♦ in the CO. 100bb effective stacks. You open to 2.5bb. The BTN calls, blinds fold.",
    streets: [
      {
        street: "flop",
        board: "J♠ 5♣ 3♦",
        pot: "6 BB",
        narrative:
          "You flop top pair top kicker on a dry board. You c-bet 2bb. Villain calls.",
        options: [
          {
            label: "This is a summary of what happened. Continue to the turn.",
            correct: true,
            feedback:
              "The flop play was standard — c-betting top pair on a dry board for a small sizing. Let's see what happens on the turn."
          }
        ]
      },
      {
        street: "turn",
        board: "J♠ 5♣ 3♦ T♥",
        pot: "10 BB",
        narrative:
          "The turn is the T♥. This card brings some straight draws (QK, Q9, 98) into play. You bet 7bb and Villain calls again. The pot is now 24bb heading to the river.",
        options: [
          {
            label: "This is a summary of what happened. Continue to the river.",
            correct: true,
            feedback:
              "Good. You bet the turn for value and protection, which is standard with TPTK. The T♥ introduced some draws. Now let's see the critical river decision."
          }
        ]
      },
      {
        street: "river",
        board: "J♠ 5♣ 3♦ T♥ Q♠",
        pot: "24 BB",
        narrative:
          "The river is the Q♠, completing the KA and K9 straight draws and making QQ/QT/QJ possible. You have ~79bb behind. Villain checks. Do you bet for thin value or check behind?",
        options: [
          {
            label: "Check",
            correct: true,
            feedback:
              "Correct. The Q♠ is a terrible river card for your hand. It completes KA and K9 straights, makes Q pairs and two-pair hands, and improves QJ past your AJ. While Villain checked, your hand is no longer comfortably ahead of Villain's calling range. Hands that would call a bet here are heavily weighted toward hands that beat you (QT, QJ, KA, K9, QQ). Your AJ still has decent showdown value that you preserve by checking."
          },
          {
            label: "Bet ~8 BB (1/3 pot)",
            correct: false,
            feedback:
              "The river Q♠ dramatically changes the dynamic. Villain's calling range on this card is heavily skewed toward hands that beat you — QJ, QT, straights with K9/KA, and slow-played sets. Hands you beat (like T9, 55, smaller Jx) are unlikely to call a river bet after a scare card hits. Betting thin here is a losing play."
          },
          {
            label: "Bet ~16 BB (2/3 pot)",
            correct: false,
            feedback:
              "A large river bet into a scare card is a significant mistake. You're only getting called by better — straights, two pair, and QJ. All the hands you beat (lower pairs, worse Jx) are folding to this sizing on a scary board. Check and showdown your top pair."
          }
        ]
      }
    ]
  },

  // ============================================================
  // HARD #2 — Bluff-Catching on a Scary River
  // ============================================================
  {
    id: 8,
    title: "Bluff-Catching with Top Pair on a Four-Flush Board",
    difficulty: "hard",
    setup:
      "You hold K♦ Q♦ in the CO. 100bb effective stacks. You open to 2.5bb. The BTN calls, blinds fold.",
    streets: [
      {
        street: "flop",
        board: "Q♠ 7♠ 3♣",
        pot: "6 BB",
        narrative:
          "You flop top pair with a good kicker on a board with a flush draw. You c-bet 2bb and Villain calls.",
        options: [
          {
            label: "This is a summary of what happened. Continue to the turn.",
            correct: true,
            feedback:
              "Standard play — c-betting top pair on a board where you have a range advantage. The flush draw is present but you're ahead of most of Villain's range."
          }
        ]
      },
      {
        street: "turn",
        board: "Q♠ 7♠ 3♣ 5♠",
        pot: "10 BB",
        narrative:
          "The turn brings the 5♠, putting three spades on board. This completes some flush draws. Villain checks to you.",
        options: [
          {
            label: "Check",
            correct: true,
            feedback:
              "Correct. The third spade dramatically changes the board texture. Villain's calling range on the flop included many spade draws that just got there. Betting allows Villain to check-raise with flushes and puts you in a terrible spot. Checking keeps the pot small and lets you get to showdown with a one-pair hand on a wet board."
          },
          {
            label: "Bet ~5 BB (half pot)",
            correct: false,
            feedback:
              "Betting into a three-flush board with a non-spade top pair is risky. Villain's flop calling range is loaded with spade hands (suited connectors, suited aces, suited broadways) that just made a flush. A bet here either gets called by flushes or folds out the hands you beat."
          },
          {
            label: "Bet ~7 BB (3/4 pot)",
            correct: false,
            feedback:
              "A large bet on a three-flush turn is a mistake. You're turning your top pair into a bluff against a range that hit many flush combos. This size especially invites check-raises from made flushes."
          }
        ]
      },
      {
        street: "river",
        board: "Q♠ 7♠ 3♣ 5♠ T♥",
        pot: "10 BB",
        narrative:
          "Both players checked the turn. The river is the T♥, a non-spade. Villain now bets 8bb into the 10bb pot.",
        options: [
          {
            label: "Fold",
            correct: false,
            feedback:
              "Folding top pair to a single bet after checking back the turn is too tight. Villain knows you showed weakness by checking the turn and is likely to stab with a wide range of bluffs and thin value. KQ is near the top of your range here."
          },
          {
            label: "Call",
            correct: true,
            feedback:
              "Correct. After checking the turn, your range is capped — and Villain knows it. This means they will bet the river with both value hands (flushes, two pair) AND bluffs (missed draws, air). KQ is one of the strongest hands in your turn-checking range, making it a clear bluff-catcher. You don't need to beat everything, just enough of their bluffs to make calling profitable."
          },
          {
            label: "Raise to 24 BB",
            correct: false,
            feedback:
              "Raising with one pair as a bluff-catch makes no sense. You'd only get called by better (flushes, sets, two pair) and fold out all the bluffs you currently beat. KQ is a hand that wants to call and showdown, not raise."
          }
        ]
      }
    ]
  },

  // ============================================================
  // HARD #3 — Multiway Pot with a Vulnerable Overpair
  // ============================================================
  {
    id: 9,
    title: "Multiway Pot with a Vulnerable Overpair",
    difficulty: "hard",
    setup:
      "You hold J♣ J♠ in the LJ. 100bb effective stacks. You open to 2.5bb. The HJ calls, the BTN calls, and the BB calls. Four players see the flop.",
    streets: [
      {
        street: "flop",
        board: "9♠ 6♥ 4♦",
        pot: "10.5 BB",
        narrative:
          "You flop an overpair on a low, somewhat coordinated board (straight draws possible with 78, 57, 53). In a 4-way pot, your JJ is vulnerable. BB checks to you.",
        options: [
          {
            label: "Check",
            correct: false,
            feedback:
              "Checking with an overpair on a coordinated board in a multiway pot gives free cards to multiple opponents who likely have draws and overcards. With three opponents, someone almost certainly has equity against you. You need to charge them."
          },
          {
            label: "Bet ~3.5 BB (1/3 pot)",
            correct: false,
            feedback:
              "A 1/3 pot bet is too small multiway. With three opponents who can have straight draws, overcards, and smaller pairs, a tiny bet gives them excellent odds to continue. You need to thin the field and charge draws properly."
          },
          {
            label: "Bet ~7 BB (2/3 pot)",
            correct: true,
            feedback:
              "Correct. In a multiway pot with a vulnerable overpair, you need to bet large to thin the field and charge the many draws present. A 2/3 pot bet accomplishes both goals — it prices out gutshots and overcards, and ideally gets the pot heads-up against the one player who has a real hand. Multiway pots demand larger sizings because you're competing against multiple ranges."
          },
          {
            label: "Bet ~10 BB (pot)",
            correct: false,
            feedback:
              "A pot-sized bet is slightly too large and polarizing for a hand that wants calls from worse. It folds out the medium pairs and weak draws you dominate while only getting action from hands that have you in trouble (sets, two pair, big draws). A 2/3 pot sizing hits the sweet spot."
          }
        ]
      },
      {
        street: "turn",
        board: "9♠ 6♥ 4♦ 2♣",
        pot: "24.5 BB",
        narrative:
          "HJ and BTN fold. BB calls. Heads-up to the turn, which brings the 2♣ — a brick. BB checks. You have ~83bb behind.",
        options: [
          {
            label: "Check",
            correct: false,
            feedback:
              "Checking gives a free card to draws. BB called in a multiway pot, which could indicate a pair, a draw, or a mix. The 2♣ is a great card for your hand — no draws completed. Continue applying pressure."
          },
          {
            label: "Bet ~12 BB (half pot)",
            correct: true,
            feedback:
              "Correct. The 2♣ is a clean runout for your overpair. After thinning the field on the flop, you should continue for value against BB's range of 9x, pocket pairs below yours, and remaining draws. A half-pot bet extracts value while keeping the pot manageable with a one-pair hand going to the river."
          },
          {
            label: "Bet ~18 BB (3/4 pot)",
            correct: false,
            feedback:
              "A 3/4 pot bet is slightly too large. You have a one-pair hand and BB's range is somewhat capped after calling in a multiway pot. A moderate sizing keeps more of their weaker holdings in while still building the pot."
          }
        ]
      },
      {
        street: "river",
        board: "9♠ 6♥ 4♦ 2♣ A♠",
        pot: "48.5 BB",
        narrative:
          "BB calls again. The river is the A♠ — one of the worst cards for your hand. BB checks. You have ~71bb behind.",
        options: [
          {
            label: "Check",
            correct: true,
            feedback:
              "Correct. The A♠ is a disastrous river card for JJ. It improves several hands in BB's calling range: A9, A6, A4 all make two pair or better, and any Ax that called flop and turn now has top pair. Your JJ is no longer confidently ahead of BB's checking range. Checking preserves your showdown value and avoids getting check-raised off the best hand."
          },
          {
            label: "Bet ~16 BB (1/3 pot)",
            correct: false,
            feedback:
              "Betting the river when an Ace hits is a common mistake with overpairs below Aces. BB's range after calling flop and turn on a low board is weighted toward pairs and draws. The Ace improves many of their hands (Ax combos like A9, A6, A4) while not improving any hands you beat. A bet here only gets called by better."
          },
          {
            label: "Bet ~36 BB (3/4 pot)",
            correct: false,
            feedback:
              "A large river bet with JJ when an Ace peels off is lighting money on fire. You'll only be called by Ax hands that now beat you, sets, and two pair. Every hand you were ahead of either folded earlier or now has you beat. Check and hope to win at showdown."
          }
        ]
      }
    ]
  },

  // ============================================================
  // MEDIUM #4 — Delayed C-Bet with Position
  // ============================================================
  {
    id: 10,
    title: "Delayed C-Bet After Checking the Flop",
    difficulty: "medium",
    setup:
      "You hold A♦ K♣ on the BTN. 100bb effective stacks. You open to 2.5bb. The BB calls.",
    streets: [
      {
        street: "flop",
        board: "J♥ 8♥ 6♣",
        pot: "5.5 BB",
        narrative:
          "You completely miss this coordinated flop. BB checks to you. This board favors BB's range (lots of Jx, 8x, 67, 78, suited hearts).",
        options: [
          {
            label: "Check",
            correct: true,
            feedback:
              "Correct. On a J-8-6 two-tone board, the BB's range connects heavily (Jx, 8x, 67s, 78s, flush draws). Your AK has very little equity when called. Checking preserves your equity (6 outs to top pair) and avoids burning chips into a board that doesn't favor your range. You can also represent a slow-play on later streets."
          },
          {
            label: "Bet 1/3 pot (~2 BB)",
            correct: false,
            feedback:
              "Even a small c-bet on this board is suboptimal with AK. The BB's calling range is strong here — Jx, 8x, draws, and two pairs. You'd be c-betting with no pair, no draw, and very little fold equity against a range that connects with this texture."
          },
          {
            label: "Bet 2/3 pot (~4 BB)",
            correct: false,
            feedback:
              "Betting large on a board that heavily favors the BB's range is a mistake. Your AK has very little equity when called, and the BB will rarely fold hands that beat you. Save your chips for better spots."
          }
        ]
      },
      {
        street: "turn",
        board: "J♥ 8♥ 6♣ K♠",
        pot: "5.5 BB",
        narrative:
          "Both players checked the flop. The turn is the K♠, giving you top pair top kicker! BB checks again.",
        options: [
          {
            label: "Check",
            correct: false,
            feedback:
              "Checking again would be too passive. You now have top pair top kicker and need to start building the pot. After checking the flop, your hand is hidden — Villain won't expect you to have a K since you checked back a coordinated flop."
          },
          {
            label: "Bet ~3 BB (half pot)",
            correct: true,
            feedback:
              "Correct. A delayed c-bet after the K♠ turn is a strong play. Your hand was hidden by the flop check, so Villain won't put you on Kx easily. A half-pot bet extracts value from BB's Jx hands, 8x, and draws while not overcommitting with one pair on a still-coordinated board."
          },
          {
            label: "Bet ~5 BB (pot)",
            correct: false,
            feedback:
              "A pot-sized bet is too aggressive. While you have top pair, the board is still very coordinated with straight and flush draws. A moderate sizing keeps in the hands you beat while managing the pot size with one pair."
          }
        ]
      },
      {
        street: "river",
        board: "J♥ 8♥ 6♣ K♠ 3♥",
        pot: "11.5 BB",
        narrative:
          "Villain calls your turn bet. The river is the 3♥, completing the flush draw. Villain checks.",
        options: [
          {
            label: "Check",
            correct: true,
            feedback:
              "Correct. The 3♥ completes the heart flush draw that was present from the flop. Villain's calling range on the turn included many heart combos (suited connectors, A♥x♥, suited Jx). Betting the river risks getting check-raised by flushes, and the hands you beat (Jx, 8x) will be reluctant to call on a three-flush board. Check and showdown your top pair."
          },
          {
            label: "Bet ~4 BB (1/3 pot)",
            correct: false,
            feedback:
              "Even a small bet is risky here. The completed flush draw means much of Villain's turn-calling range now beats you. Hands you beat (Jx) will often fold the river facing a flush-completing card. You'd be betting into a range that either has you crushed or won't call."
          },
          {
            label: "Bet ~8 BB (2/3 pot)",
            correct: false,
            feedback:
              "A large river bet when the flush completes is a significant error. You're turning your top pair into a bluff — only flushes and better call, and everything you beat folds. Check and hope to win at showdown."
          }
        ]
      }
    ]
  },

  // ============================================================
  // EASY #4 — Playing the Nut Straight
  // ============================================================
  {
    id: 11,
    title: "Flopping the Nut Straight",
    difficulty: "easy",
    setup:
      "You hold T♠ 9♠ on the BTN. 100bb effective stacks. The CO opens to 2.5bb. You call. Blinds fold.",
    streets: [
      {
        street: "flop",
        board: "8♦ 7♣ 6♥",
        pot: "6 BB",
        narrative:
          "You flop the nut straight on a rainbow board. Villain c-bets 3bb.",
        options: [
          {
            label: "Call",
            correct: true,
            feedback:
              "Correct. With the nut straight on a rainbow board, there's no rush. No flush draws can hit on the turn, and the board is unlikely to pair. Slow-playing by calling keeps Villain's bluffs in their range and lets them continue barreling on the turn with their overpairs and top pairs. You can raise the turn or river for maximum value."
          },
          {
            label: "Raise to 9 BB",
            correct: false,
            feedback:
              "Raising the flop isn't wrong per se, but on a rainbow board with the nuts, it's premature. A raise folds out Villain's bluffs and weaker hands immediately. By calling, you let them keep betting into you on later streets with overpairs and top pair, extracting more value over multiple streets."
          },
          {
            label: "Fold",
            correct: false,
            feedback:
              "Never fold the nut straight. You have the absolute best hand possible right now."
          }
        ]
      },
      {
        street: "turn",
        board: "8♦ 7♣ 6♥ K♠",
        pot: "12 BB",
        narrative:
          "Villain bets 8bb on the K♠ turn. This is a great card for you — it likely improved Villain's hand (KK, AK, KQ all hit) while keeping your straight as the nuts.",
        options: [
          {
            label: "Call",
            correct: false,
            feedback:
              "Calling the turn is too slow. The K♠ likely improved Villain's hand and they're betting large. If you just call, you might miss value on the river if a scary card comes (a board pair) or Villain checks. Now is the time to raise and build the pot."
          },
          {
            label: "Raise to 24 BB",
            correct: true,
            feedback:
              "Correct. The K♠ is an excellent action card. Villain likely improved to top pair or better (AK, KQ, KK) and is betting for value. Raising now builds a huge pot while Villain is committed with their strong-but-second-best hand. A raise to 3x sets up a river all-in with the remaining stacks."
          },
          {
            label: "All-in (~86 BB)",
            correct: false,
            feedback:
              "An immediate all-in overbet is too large and looks incredibly strong. It folds out Villain's Kx hands that would have put in more money on a standard raise. A raise to ~3x the bet builds the pot while keeping Villain invested."
          }
        ]
      },
      {
        street: "river",
        board: "8♦ 7♣ 6♥ K♠ 2♣",
        pot: "56 BB",
        narrative:
          "Villain calls your raise. The river is the 2♣, a complete blank. Villain checks. You have ~52bb behind.",
        options: [
          {
            label: "Check",
            correct: false,
            feedback:
              "Checking the river with the nuts after building a massive pot would be leaving huge value on the table. Villain's range is loaded with Kx, overpairs, and possibly sets that will call a shove."
          },
          {
            label: "Bet ~18 BB (1/3 pot)",
            correct: false,
            feedback:
              "Undersized. You've built the pot specifically to jam the river. Villain has invested significant chips and their range is strong — they'll call much more than 1/3 pot with their Kx and overpair hands."
          },
          {
            label: "All-in (~52 BB)",
            correct: true,
            feedback:
              "Correct. After raising the turn and getting called, Villain's range is very strong — top pair, overpairs, and possibly sets. These hands are committed to calling a river shove given the pot odds. Jamming extracts maximum value from the nut straight and is the natural culmination of your line."
          }
        ]
      }
    ]
  },

  // ============================================================
  // MEDIUM #5 — River Overbet for Value
  // ============================================================
  {
    id: 12,
    title: "River Overbet with the Second Nut Flush",
    difficulty: "medium",
    setup:
      "You hold K♥ J♥ in the CO. 100bb effective stacks. You open to 2.5bb. The BTN calls. Blinds fold.",
    streets: [
      {
        street: "flop",
        board: "T♥ 5♥ 2♣",
        pot: "6 BB",
        narrative:
          "You flop a strong flush draw with two overcards. You c-bet 2bb, and Villain calls.",
        options: [
          {
            label: "This is a summary of what happened. Continue to the turn.",
            correct: true,
            feedback:
              "Standard semi-bluff c-bet with the second nut flush draw plus two overcards. Let's see the turn."
          }
        ]
      },
      {
        street: "turn",
        board: "T♥ 5♥ 2♣ 8♥",
        pot: "10 BB",
        narrative:
          "The 8♥ completes your flush — you have the K-high flush (second nuts). Villain checks.",
        options: [
          {
            label: "Check",
            correct: false,
            feedback:
              "Checking here is too conservative. You have the second nut flush and there are many hands in Villain's range that will pay you off — top pair, overpairs, lower flushes, and straight draws. You should bet to build the pot."
          },
          {
            label: "Bet ~5 BB (half pot)",
            correct: true,
            feedback:
              "Correct. A moderate turn bet with the K-high flush is ideal. It extracts value from Villain's top pairs, overpairs, and lower heart hands while also building the pot for a big river bet. Betting too small lets draws in cheaply; betting too large folds out the hands you want to keep in."
          },
          {
            label: "Bet ~10 BB (pot)",
            correct: false,
            feedback:
              "A pot-sized bet risks folding out the medium-strength hands (top pair, overpairs) you want to keep in. These hands will call a half-pot bet but fold to a full-pot bet. Save the large sizing for the river."
          }
        ]
      },
      {
        street: "river",
        board: "T♥ 5♥ 2♣ 8♥ T♣",
        pot: "20 BB",
        narrative:
          "Villain calls. The river pairs the board with the T♣. Villain checks. You have ~86bb behind.",
        options: [
          {
            label: "Check",
            correct: false,
            feedback:
              "Checking the river with the second nut flush is far too passive. The board pairing is scary (full houses are possible), but Villain's range after calling flop and turn is heavily weighted toward one-pair hands and lower flushes that will pay off a big bet."
          },
          {
            label: "Bet ~10 BB (half pot)",
            correct: false,
            feedback:
              "A half-pot bet is undersized given the situation. Villain's range after calling two streets on a flushing board includes many hands that are committed to paying more. You should use a larger sizing to maximize value from lower flushes and hands like TT that improved to trips."
          },
          {
            label: "Bet ~30 BB (1.5x pot overbet)",
            correct: true,
            feedback:
              "Correct. An overbet is the optimal river sizing here. Villain's calling range is polarized — they either have a flush (which calls any size) or a strong one-pair hand that may hero-call an overbet. Lower flushes like Q♥x♥ or J♥x♥ are never folding. Even TT (now trips) is committed. The overbet maximizes value against the inelastic portion of Villain's range."
          }
        ]
      }
    ]
  },

  // ============================================================
  // EASY #5 — Facing a Check-Raise on the Flop
  // ============================================================
  {
    id: 13,
    title: "Reacting to a Flop Check-Raise",
    difficulty: "easy",
    setup:
      "You hold A♣ K♠ in the CO. 100bb effective stacks. You open to 2.5bb. The BB calls.",
    streets: [
      {
        street: "flop",
        board: "A♦ 9♣ 4♥",
        pot: "5.5 BB",
        narrative:
          "You flop top pair top kicker on a dry board. You c-bet 2bb. The BB check-raises to 7bb.",
        options: [
          {
            label: "Fold",
            correct: false,
            feedback:
              "Never fold TPTK on a dry board to a single check-raise. You have one of the strongest hands possible here. The BB could be check-raising with a wide range including top pair worse kicker, middle pair, and draws."
          },
          {
            label: "Call",
            correct: true,
            feedback:
              "Correct. Calling is the best play with TPTK on a dry board. You're ahead of almost all of Villain's check-raising range (A9, A4, 99, 44, flush draws, bluffs). Calling keeps their bluffs in and avoids bloating the pot against the small portion of their range that has you beat (sets). You can re-evaluate on the turn."
          },
          {
            label: "Re-raise to 20 BB",
            correct: false,
            feedback:
              "3-betting the flop with top pair is too aggressive on a dry board. It folds out all the bluffs and worse hands in Villain's range and only gets action from sets and two pair that beat you. Calling keeps the pot manageable and preserves Villain's wide range."
          }
        ]
      },
      {
        street: "turn",
        board: "A♦ 9♣ 4♥ 6♠",
        pot: "19.5 BB",
        narrative:
          "You called the check-raise. The turn is the 6♠, a brick. Villain bets 10bb.",
        options: [
          {
            label: "Fold",
            correct: false,
            feedback:
              "Folding top pair top kicker to a turn bet after calling the flop check-raise is too tight. Villain can still be value-betting worse (A9, A6, 99) or semi-bluffing. Your hand is too strong to give up."
          },
          {
            label: "Call",
            correct: true,
            feedback:
              "Correct. Continue calling. The 6♠ doesn't change much. Villain could be barreling with A9 (two pair that you beat on some boards), 99, a turned two pair like 96s, or semi-bluffs. AK is still ahead of most of their betting range. Calling controls the pot while keeping you in against a wide range."
          },
          {
            label: "Raise to 28 BB",
            correct: false,
            feedback:
              "Raising the turn with one pair is too aggressive. If Villain is bluffing, a raise folds them out. If they have a set or strong two pair, you're in trouble. Calling lets you get to the river with a strong hand at a reasonable price."
          }
        ]
      },
      {
        street: "river",
        board: "A♦ 9♣ 4♥ 6♠ 2♦",
        pot: "39.5 BB",
        narrative:
          "The river is the 2♦, another brick. Villain shoves all-in for 61bb into the 39.5bb pot.",
        options: [
          {
            label: "Fold",
            correct: false,
            feedback:
              "While the overbet shove is scary, folding TPTK on a completely dry run-out is too exploitable. Villain's line is consistent with both nutted hands (44, 99) AND bluffs. At this pot price, you need to be right less than 40% of the time. AK blocks AA and is near the top of your range."
          },
          {
            label: "Call",
            correct: true,
            feedback:
              "Correct. This is a tough but necessary call. On A-9-4-6-2 with no draws completing, Villain's shoving range is polarized: sets (99, 44) and bluffs. You need to call with your strongest hands to avoid being exploited, and AK is near the top of your range. You block AA (reducing their value combos) and the board runout didn't improve any draws. Call and accept the result."
          }
        ]
      }
    ]
  },
];
