var utilities = (function () {
  var utilities = {
    compareRanks: compareRanks,
    combineCards: combineCards,
    getRankIndex: getRankIndex,
    getRankFromRankIndex: getRankFromRankIndex,
    getRankCount: getRankCount,
    getSuitCount: getSuitCount,
    getRankIndexesUsed: getRankIndexesUsed,
    areCardsEqual: areCardsEqual,
    areHandsEqual: areHandsEqual,
    getHandString: getHandString,
    getKickers: getKickers,
  };

  var SUITS = ['s', 'c', 'h', 'd'];
  var RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];

  function compareRanks(rank1, operator, rank2) {
    var rank1index = RANKS.indexOf(rank1);
    var rank2index = RANKS.indexOf(rank2);

    if (operator === '<') {
      return rank1index < rank2index;
    } else if (operator === '>') {
      return rank1index > rank2index;
    } else if (operator === '=') {
      return rank1index === rank2index;
    } else if (operator === '>=') {
      return rank1index >= rank2index;
    } else if (operator === '<=') {
      return rank1index <= rank2index;
    }
  }

  function combineCards(a, b) {
    var cards = [];

    for (var i = 0, lenA = a.length; i < lenA; i++) {
      cards.push(a[i]);
    }

    for (var j = 0, lenB = b.length; j < lenB; j++) {
      cards.push(b[j]);
    }

    return cards;
  }

  function getRankIndex(rank) {
    return RANKS.indexOf(rank);
  }

  function getRankFromRankIndex(rankIndex) {
    return RANKS[rankIndex];
  }

  function getRankCount(playerCards, boardCards) {
    var rankCount = {
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0,
      '10': 0,
      'j': 0,
      'q': 0,
      'k': 0,
      'a': 0,
    };

    if (boardCards) {
      for (var i = 0, len = boardCards.length; i < len; i++) {
        rankCount[boardCards[i].rank]++;
      }
    }

    if (playerCards) {
      for (var j = 0; j < 2; j++) {
        rankCount[playerCards[j].rank]++;
      }
    }

    return rankCount;
  }

  function getSuitCount(playerCards, boardCards) {
    var suitCount = {
      h: {
        count: 0,
        ranks: [],
      },
      d: {
        count: 0,
        ranks: [],
      },
      s: {
        count: 0,
        ranks: [],
      },
      c: {
        count: 0,
        ranks: [],
      },
    };

    if (boardCards) {
      for (var i = 0, len = boardCards.length; i < len; i++) {
        suitCount[boardCards[i].suit].count++;
        suitCount[boardCards[i].suit].ranks.push(boardCards[i].rank);
      }
    }

    if (playerCards) {
      for (var j = 0; j < 2; j++) {
        suitCount[playerCards[j].suit].count++;
        suitCount[playerCards[j].suit].ranks.push(playerCards[j].rank);
      }
    }

    for (var suit in suitCount) {
      if (suitCount.hasOwnProperty(suit)) {
        suitCount[suit].ranks.sort(function (a, b) { // jshint ignore:line
          return utilities.compareRanks(a, '<', b);
        });
      }
    }

    return suitCount;
  }

  function getRankIndexesUsed(playerCards, boardCards) {
    var rankIndexesUsed = [];
    var currRankIndex;

    if (boardCards) {
      for (var i = 0, len = boardCards.length; i < len; i++) {
        currRankIndex = getRankIndex(boardCards[i].rank);
        rankIndexesUsed.push(currRankIndex);
      }
    }

    if (playerCards) {
      for (var j = 0; j < 2; j++) {
        currRankIndex = getRankIndex(playerCards[j].rank);
        rankIndexesUsed.push(currRankIndex);
      }
    }

    rankIndexesUsed = rankIndexesUsed.sort(function (a, b) {
      return a - b;
    });

    rankIndexesUsed = _.uniq(rankIndexesUsed); // remove duplicates

    return rankIndexesUsed;
  }

  function areCardsEqual(card1, card2) {
    return card1.rank === card2.rank && card1.suit === card2.suit;
  }

  function areHandsEqual(hand1, hand2) {
    return (areCardsEqual(hand1[0], hand2[0]) && areCardsEqual(hand1[1], hand2[1])) ||
           (areCardsEqual(hand1[0], hand2[1]) && areCardsEqual(hand1[1], hand2[0]))
    ;
  }

  function getHandString(hand) {
    var card1 = hand[0];
    var card2 = hand[1];

    if (card1.rank === card2.rank) {
      changeTen();
      return card1.rank + card1.rank;
    } else if (card1.suit === card2.suit) {
      if (utilities.compareRanks(card1.rank, '>', card2.rank)) {
        changeTen();
        return card1.rank + card2.rank + 's';
      } else {
        changeTen();
        return card2.rank + card1.rank + 's';
      }
    } else {
      if (utilities.compareRanks(card1.rank, '>', card2.rank)) {
        changeTen();
        return card1.rank + card2.rank + 'o';
      } else {
        changeTen();
        return card2.rank + card1.rank + 'o';
      }
    }

    function changeTen() {
      if (card1.rank === '10') {
        card1.rank = 't';
      }

      if (card2.rank === '10') {
        card2.rank = 't';
      }
    }
  }

  function getKickers(rankCount, hand) {
    var kickers = [];
    var twoPairRanks = [];
    var fullHousePairRanks = [];
    var fullHouseTripsRanks = [];

    for (var rank in rankCount) {
      if (rankCount.hasOwnProperty(rank)) {
        if (rankCount[rank] === 1) {
          kickers.push(rank);
        }

        if (hand === 'two pair' && rankCount[rank] === 2) {
          twoPairRanks.push(rank);
        }

        if (hand === 'quads' && rankCount[rank] === 2) {
          kickers.push(rank);
        }

        if (hand === 'quads' && rankCount[rank] === 3) {
          kickers.push(rank);
        }
      }
    }

    if (twoPairRanks.length === 3) {
      twoPairRanks.sort(function (a, b) {
        return utilities.compareRanks(a, '>', b);
      });

      kickers.push(twoPairRanks[0]);
    }

    kickers.sort(function (a, b) {
      return utilities.compareRanks(a, '<', b);
    });

    if (hand === 'pair') {
      return kickers.slice(0, 3);
    } else if (hand === 'two pair' || hand === 'quads') {
      return kickers.slice(0, 1);
    } else if (hand === 'trips') {
      return kickers.slice(0, 2);
    } else if (hand === 'nothing') {
      return kickers.slice(0, 5);
    }
  }

  return utilities;
})();
