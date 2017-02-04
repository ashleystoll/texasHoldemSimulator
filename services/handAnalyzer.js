var handAnalyzer = (function () {

  var handAnalyzer = {
    bestHandOnBoard: bestHandOnBoard,
    handFromHoleCards: handFromHoleCards,
    bestHand: bestHand,
    draw: draw,
  };

  function bestHandOnBoard(playerCards, boardCards) {
    return bestHand(null, boardCards);
  }

  function handFromHoleCards(hand, playerCards, boardCards) {
    return bestHand(playerCards, boardCards).hand === hand && bestHandOnBoard(playerCards, boardCards).hand !== hand;
  }

  function bestHand(playerCards, boardCards) {
    var rankCount = utilities.getRankCount(playerCards, boardCards);
    var royalFlush;
    var straightFlush;
    var quads;
    var fullHouse;
    var flush;
    var straight;
    var trips;
    var twoPair;
    var pair;

    // royalFlush = _royalFlush(straight, flush);
    // if (royalFlush) {
    //   return royalFlush;
    // }

    // straightFlush = _straightFlush(straight, flush);
    // if (straightFlush) {
    //   return straightFlush;
    // }

    quads = _quads(rankCount);
    if (quads) {
      return quads;
    }

    fullHouse = _fullHouse(rankCount);
    if (fullHouse) {
      return fullHouse;
    }

    flush = _flush(playerCards, boardCards);
    if (flush) {
      return flush;
    }

    straight = _straight(playerCards, boardCards);
    if (straight) {
      return straight;
    }

    trips = _trips(rankCount);
    if (trips) {
      return trips;
    }

    twoPair = _twoPair(rankCount);
    if (twoPair) {
      return twoPair;
    }

    pair = _pair(rankCount);
    if (pair) {
      return pair;
    }

    return _highCard(playerCards, boardCards);
  }

  function _royalFlush(playerCards, boardCards) {
    var cards;
    var royalFlush;
    var flush = _flush(playerCards, boardCards);

    if (!flush) {
      return false;
    }

    cards = utilities.combineCards(playerCards, boardCards);
    royalFlush = {
      a: false,
      k: false,
      q: false,
      j: false,
      10: false,
    };

    for (var i = 0, len = cards.length; i < len; i++) {
      if (cards[i].suit === flush.suit && cards[i].rank === 'a') {
        royalFlush.a = true;
      } else if (cards[i].suit === flush.suit && cards[i].rank === 'k') {
        royalFlush.k = true;
      } else if (cards[i].suit === flush.suit && cards[i].rank === 'q') {
        royalFlush.q = true;
      } else if (cards[i].suit === flush.suit && cards[i].rank === 'j') {
        royalFlush.j = true;
      } else if (cards[i].suit === flush.suit && cards[i].rank === '10') {
        royalFlush[10] = true;
      }
    }

    if (royalFlush.a && royalFlush.k && royalFlush.q && royalFlush.j && royalFlush[10]) {
      return {
        hand: 'royal flush',
        handRank: 9,
        suit: flush.suit,
      };
    }

    return false;
  }

  function _straightFlush(playerCards, boardCards) {
    var cards;
    var flush = _flush(playerCards, boardCards);
    var sequence;

    if (!flush) {
      return false;
    }

    cards = utilities.combineCards(playerCards, boardCards);

    // remove cards that aren't part of the flush
    _.remove(cards, function (card) {
      return card.suit !== flush.suit;
    });

    // todo: handle case of an ace low straight

    for (var i = 0; i < cards.length - 5; i++) {
      sequence = {
        length: 1,
        highCard: cards[i].rank,
      };

      for (var j = i + 1; j < i + 5; j++) {
        if (utilities.getRankIndex(cards[j].rank) - utilities.getRankIndex(cards[j-1]) === 1) {
          sequence.highCard = cards[j].rank;
          sequence.length++;
        } else {
          break;
        }
      }

      if (sequence.length === 5) {
        break;
      }
    }

    if (sequence.length === 5) {

    }
  }

  function _quads(rankCount) {
    for (var rank in rankCount) {
      if (rankCount.hasOwnProperty(rank)) {
        if (rankCount[rank] === 4) {
          return {
            hand: 'quads',
            handRank: 7,
            rank: rank,
          };
        }
      }
    }

    return false;
  }

  function _fullHouse(rankCount) {
    var fullHouseCards = {
      three: null,
      two: null,
    };

    for (var rank in rankCount) {
      if (rankCount.hasOwnProperty(rank)) {
        if (rankCount[rank] === 3) {
          if (fullHouseCards.three) { // handle case of 2 triples
            if (utilities.compareRanks(rank, '>', fullHouseCards.three)) { // if the second triple is bigger than the first
              fullHouseCards.two = fullHouseCards.three;
              fullHouseCards.three = rank;
            }

            else { // if the second triple is smaller than the first
              fullHouseCards.two = rank;
            }
          }

          else {
            fullHouseCards.three = rank;
          }
        }

        if (rankCount[rank] === 2) {
          if (!fullHouseCards.two || utilities.compareRanks(rank, '>', fullHouseCards.two)) { // handle case of 1 triple, 2 pairs
            fullHouseCards.two = rank;
          }
        }
      }
    }

    if (fullHouseCards.three && fullHouseCards.two) {
      return {
        hand: 'full house',
        handRank: 6,
        three: fullHouseCards.three,
        two: fullHouseCards.two,
      };
    } else {
      return false;
    }
  }

  function _flush(playerCards, boardCards) {
    var suitCount = utilities.getSuitCount(playerCards, boardCards);

    for (var suit in suitCount) {
      if (suitCount.hasOwnProperty(suit)) {
        if (suitCount[suit].count >= 5) {
          return {
            hand: 'flush',
            handRank: 5,
            suit: suit,
            highCard: suitCount[suit].highCard,
          };
        }
      }
    }

    return false;
  }

  function _straight(playerCards, boardCards) {
    var rankIndexesUsed = utilities.getRankIndexesUsed(playerCards, boardCards);
    var index;
    var intersection;
    var len;
    var acceptableSequences = {
      5: [
        // 5
        [12,0,1,2,3], // a2345
        [0,1,2,3,4], // 23456
        [1,2,3,4,5], // 34567
        [2,3,4,5,6], // 45678
        [3,4,5,6,7], // 56789
        [4,5,6,7,8], // 6789t
        [5,6,7,8,9], // 789tj
        [6,7,8,9,10], // 89tjq
        [7,8,9,10,11], // 9tjqk
        [8,9,10,11,12], // tjqka
      ],

      6: [
        // 6
        [12,0,1,2,3,4], // a23456
        [0,1,2,3,4,5], // 234567
        [1,2,3,4,5,6], // 345678
        [2,3,4,5,6,7], // 456789
        [3,4,5,6,7,8], // 56789t
        [4,5,6,7,8,9], // 6789tj
        [5,6,7,8,9,10], // 789tjq
        [6,7,8,9,10,11], // 89tjqk
        [7,8,9,10,11,12], // 9tjqka

        // 5
        [12,0,1,2,3], // a2345
        [0,1,2,3,4], // 23456
        [1,2,3,4,5], // 34567
        [2,3,4,5,6], // 45678
        [3,4,5,6,7], // 56789
        [4,5,6,7,8], // 6789t
        [5,6,7,8,9], // 789tj
        [6,7,8,9,10], // 89tjq
        [7,8,9,10,11], // 9tjqk
        [8,9,10,11,12], // tjqka
      ],

      7: [
        // 7
        [12,0,1,2,3,4,5], // a234567
        [0,1,2,3,4,5,6], // 2345678
        [1,2,3,4,5,6,7], // 3456789
        [2,3,4,5,6,7,8], // 456789t
        [3,4,5,6,7,8,9], // 56789tj
        [4,5,6,7,8,9,10], // 6789tjq
        [5,6,7,8,9,10,11], // 789tjqk
        [6,7,8,9,10,11,12], // 89tjqka

        // 6
        [12,0,1,2,3,4], // a23456
        [0,1,2,3,4,5], // 234567
        [1,2,3,4,5,6], // 345678
        [2,3,4,5,6,7], // 456789
        [3,4,5,6,7,8], // 56789t
        [4,5,6,7,8,9], // 6789tj
        [5,6,7,8,9,10], // 789tjq
        [6,7,8,9,10,11], // 89tjqk
        [7,8,9,10,11,12], // 9tjqka

        // 5
        [12,0,1,2,3], // a2345
        [0,1,2,3,4], // 23456
        [1,2,3,4,5], // 34567
        [2,3,4,5,6], // 45678
        [3,4,5,6,7], // 56789
        [4,5,6,7,8], // 6789t
        [5,6,7,8,9], // 789tj
        [6,7,8,9,10], // 89tjq
        [7,8,9,10,11], // 9tjqk
        [8,9,10,11,12], // tjqka
      ],
    };

    if (rankIndexesUsed.length === 7) {
      index = _.findIndex(acceptableSequences[7], function (acceptableSequence) {
        intersection = _.intersection(acceptableSequence, rankIndexesUsed);
        return _.isEqual(intersection, acceptableSequence);
      });

      if (index > -1) {
        len = acceptableSequences[7][index].length;
        return {
          hand: 'straight',
          handRank: 4,
          highCard: utilities.getRankFromRankIndex(acceptableSequences[7][index][len - 1]),
        };
      } else {
        return false;
      }
    }

    else if (rankIndexesUsed.length === 6) {
      index = _.findIndex(acceptableSequences[6], function (acceptableSequence) {
        intersection = _.intersection(acceptableSequence, rankIndexesUsed);
        return _.isEqual(intersection, acceptableSequence);
      });

      if (index > -1) {
        len = acceptableSequences[6][index].length;
        return {
          hand: 'straight',
          handRank: 4,
          highCard: utilities.getRankFromRankIndex(acceptableSequences[6][index][len - 1]),
        };
      } else {
        return false;
      }
    }

    else if (rankIndexesUsed.length === 5) {
      index = _.findIndex(acceptableSequences[5], function (acceptableSequence) {
        intersection = _.intersection(acceptableSequence, rankIndexesUsed);
        return _.isEqual(intersection, acceptableSequence);
      });

      if (index > -1) {
        len = acceptableSequences[5][index].length;
        return {
          hand: 'straight',
          handRank: 4,
          highCard: utilities.getRankFromRankIndex(acceptableSequences[5][index][len - 1]),
        };
      } else {
        return false;
      }
    }

    else {
      return false;
    }
  }

  function _trips(rankCount) {
    var tripsRank;

    for (var rank in rankCount) {
      if (rankCount.hasOwnProperty(rank)) {
        if (rankCount[rank] === 2) {
          return false; // even if there were 3 of another rank, this would be a full house, not trips
        }

        if (rankCount[rank] === 3) {
          tripsRank = rank;
        }
      }
    }

    if (tripsRank) {
      return {
        hand: 'trips',
        handRank: 3,
        rank: tripsRank,
      };
    }

    return false;
  }

  function _twoPair(rankCount) {
    var twoPairCards = {
      high: null,
      low: null,
    };

    for (var rank in rankCount) {
      if (rankCount.hasOwnProperty(rank)) {
        if (rankCount[rank] === 2) {
          // first pair
          if (!twoPairCards.high) {
            twoPairCards.high = rank;
          }

          // second or third pair
          else {
            // second pair
            if (!twoPairCards.low) {
              if (utilities.compareRanks(rank, '<', twoPairCards.high)) {
                twoPairCards.low = rank;
              }

              else {
                twoPairCards.low = twoPairCards.high;
                twoPairCards.high = rank;
              }
            }

            // third pair
            else {
              if (utilities.compareRanks(rank, '<', twoPairCards.low)) {
                // do nothing
              } else if (utilities.compareRanks(rank, '<', twoPairCards.high)) {
                twoPairCards.low = rank;
              } else {
                twoPairCards.low = twoPairCards.high;
                twoPairCards.high = rank;
              }
            }
          }

        }
      }
    }

    if (twoPairCards.high && twoPairCards.low) {
      return {
        hand: 'two pair',
        handRank: 2,
        high: twoPairCards.high,
        low: twoPairCards.low,
      };
    }

    return false;
  }

  function _pair(rankCount) {
    for (var rank in rankCount) {
      if (rankCount.hasOwnProperty(rank)) {
        if (rankCount[rank] === 2) {
          return {
            hand: 'pair',
            handRank: 1,
            rank: rank,
          };
        }
      }
    }

    return false;
  }

  function _highCard() {
    return {
      hand: 'high card',
      handRank: 0,
      // todo get high card
    };
  }

  function drawOnBoard(boardCards) {
    return draw(null, boardCards);
  }

  function draw(playerCards, boardCards) { // doesn't take into account if you have stronger made hands than whatever draw
    return {
      flushDraw: _flushDraw(playerCards, boardCards),
      openEndedStraightDraw: _openEndedStraightDraw(playerCards, boardCards),
      gutShotStraightDraw: _gutshotStraightDraw(playerCards, boardCards),
      doubleBellyBusterStraightDraw: _doubleBellyBusterStraightDraw(playerCards, boardCards),
    };
  }

  function _flushDraw(playerCards, boardCards) {
    var suitCount = utilities.getSuitCount(playerCards, boardCards);

    for (var suit in suitCount) {
      if (suitCount.hasOwnProperty(suit)) {
        if (suitCount[suit].count === 4) {
          return {
            suit: suit,
            highCard: suitCount[suit].highCard,
          };
        }
      }
    }

    return false;
  }

  function _openEndedStraightDraw(playerCards, boardCards) {
    var rankIndexesUsed = utilities.getRankIndexesUsed(playerCards, boardCards);
    var index;
    var intersection;
    var acceptableSequences = [
      // a234 is a gut shot
      [0,1,2,3], // 2345
      [1,2,3,4], // 3456
      [2,3,4,5], // 4567
      [3,4,5,6], // 5678
      [4,5,6,7], // 6789
      [5,6,7,8], // 789t
      [6,7,8,9], // 89tj
      [7,8,9,10], // 9tjq
      [8,9,10,11], // tjqk
      // jqka is a gut shot
    ];

    if (rankIndexesUsed.length >= 4) {
      index = _.findIndex(acceptableSequences, function (acceptableSequence) {
        intersection = _.intersection(acceptableSequence, rankIndexesUsed);
        return _.isEqual(intersection, acceptableSequence);
      });

      if (index > -1) {
        return {
          highCard: utilities.getRankFromRankIndex(acceptableSequences[index][3]),
        };
      } else {
        return false;
      }
    }

    else {
      return false;
    }
  }

  function _doubleBellyBusterStraightDraw(playerCards, boardCards) {
    var rankIndexesUsed = utilities.getRankIndexesUsed(playerCards, boardCards);
    var index;
    var intersection;
    var acceptableSequences = [
      [12, 1, 2, 3, 5], // a 345 7
      [0, 2, 3, 4, 6], // 2 456 8
      [1, 3, 4, 5, 7], // 3 567 9
      [2, 4, 5, 6, 8], // 4 678 t
      [3, 5, 6, 7, 9], // 5 789 j
      [4, 6, 7, 8, 10], // 6 89t q
      [5, 7, 8, 9, 11], // 7 9tj k
      [6, 8, 9, 10, 12], // 8 tjq a
    ];

    if (rankIndexesUsed.length >= 5) {
      index = _.findIndex(acceptableSequences, function (acceptableSequence) {
        intersection = _.intersection(acceptableSequence, rankIndexesUsed);
        return _.isEqual(intersection, acceptableSequence);
      });

      if (index > -1) {
        return {
          highCard: utilities.getRankFromRankIndex(acceptableSequences[index][4]),
        };
      } else {
        return false;
      }
    }

    else {
      return false;
    }
  }

  function _gutshotStraightDraw(playerCards, boardCards) {
    return false;
  }

  return handAnalyzer;
})();
