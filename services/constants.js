var constants = (function () {
  var constants = {};
  constants.startingHands = { // https://en.wikipedia.org/wiki/Texas_hold_'em_starting_hands#Sklansky_hand_groups
    tier1: [],
    tier2: [],
    tier3: [],
    tier4: [],
    tier5: [],
    tier6: [],
    tier7: [],
    tier8: [],
    types: {
      pocketPairs: [],
      suitedConnectors: [],
      suitedOneGappers: [],
      aceXSuited: [],
      kingXSuited: [],
    },
    initialize: function () {
      // reset
      this.tier1 = [];
      this.tier2 = [];
      this.tier3 = [];
      this.tier4 = [];
      this.tier5 = [];
      this.tier6 = [];
      this.tier7 = [];
      this.tier8 = [];
      this.types.pocketPairs = [];
      this.types.suitedConnectors = [];
      this.types.suitedOneGappers = [];
      this.types.aceXSuited = [];
      this.types.kingXSuited = [];

      // tier 1
      addPocketPair(this.tier1, 'a'); // AA
      addPocketPair(this.tier1, 'k'); // KK
      addPocketPair(this.tier1, 'q'); // QQ
      addPocketPair(this.tier1, 'j'); // JJ
      addSuitedCards(this.tier1, 'a', 'k'); // AKs

      // tier 2
      addPocketPair(this.tier2, '10'); // TT
      addSuitedCards(this.tier2, 'a', 'q'); // AQs
      addSuitedCards(this.tier2, 'a', 'j'); // AJs
      addSuitedCards(this.tier2, 'k', 'q'); // KQs
      addUnsuitedCards(this.tier2, 'a', 'k'); // AKo

      // tier 3
      addPocketPair(this.tier3, '9'); // 99
      addSuitedCards(this.tier3, 'a', '10'); // ATs
      addSuitedCards(this.tier3, 'k', 'j'); // KJs
      addSuitedCards(this.tier3, 'q', 'j'); // QJs
      addSuitedCards(this.tier3, 'j', '10'); // JTs
      addUnsuitedCards(this.tier3, 'a', 'q'); // AQo

      // tier 4
      addPocketPair(this.tier4, '8'); // 88
      addSuitedCards(this.tier4, 'k', '10'); // KTs
      addSuitedCards(this.tier4, 'q', '10'); // QTs
      addSuitedCards(this.tier4, 'j', '9'); // J9s
      addSuitedCards(this.tier4, '10', '9'); // T9s
      addSuitedCards(this.tier4, '9', '8'); // 98s
      addUnsuitedCards(this.tier4, 'a', 'j'); // AJo
      addUnsuitedCards(this.tier4, 'k', 'q'); // KQo

      // tier 5
      addPocketPair(this.tier5, '7'); // 77
      for (var i = 9; i >= 2; i--) {
        addSuitedCards(this.tier5, 'a', i.toString()); // A9s thru A2s
      }
      addSuitedCards(this.tier5, 'q', '9'); // Q9s
      addSuitedCards(this.tier5, '10', '8'); // T8s
      addSuitedCards(this.tier5, '9', '7'); // 97s
      addSuitedCards(this.tier5, '8', '7'); // 87s
      addSuitedCards(this.tier5, '7', '6'); // 76s
      addUnsuitedCards(this.tier5, 'k', 'j'); // KJo
      addUnsuitedCards(this.tier5, 'q', 'j'); // QJo
      addUnsuitedCards(this.tier5, 'j', '10'); // JTo

      // tier 6
      addPocketPair(this.tier6, '6'); // 66
      addPocketPair(this.tier6, '5'); // 55
      addSuitedCards(this.tier6, 'k', '9'); // K9s
      addSuitedCards(this.tier6, 'j', '8'); // J8s
      addSuitedCards(this.tier6, '8', '6'); // 86s
      addSuitedCards(this.tier6, '7', '5'); // 75s
      addSuitedCards(this.tier6, '5', '4'); // 54s
      addUnsuitedCards(this.tier6, 'a', '10'); // ATo
      addUnsuitedCards(this.tier6, 'k', '10'); // KTo
      addUnsuitedCards(this.tier6, 'q', '10'); // QTo

      // tier 7
      addPocketPair(this.tier7, '4'); // 44
      addPocketPair(this.tier7, '3'); // 33
      addPocketPair(this.tier7, '2'); // 22
      for (i = 8; i >= 2; i--) {
        addSuitedCards(this.tier7, 'k', i.toString()); // K8s thru K2s
      }
      addSuitedCards(this.tier7, 'q', '8'); // Q8s
      addSuitedCards(this.tier7, '10', '7'); // T7s
      addSuitedCards(this.tier7, '6', '4'); // 64s
      addSuitedCards(this.tier7, '5', '3'); // 53s
      addSuitedCards(this.tier7, '4', '3'); // 43s
      addUnsuitedCards(this.tier7, 'j', '9'); // J9o
      addUnsuitedCards(this.tier7, '10', '9'); // T9o
      addUnsuitedCards(this.tier7, '9', '8'); // 98o

      // tier 8
      addSuitedCards(this.tier8, 'j', '7'); // J7s
      addSuitedCards(this.tier8, '9', '6'); // 96s
      addSuitedCards(this.tier8, '8', '5'); // 85s
      addSuitedCards(this.tier8, '7', '4'); // 74s
      addSuitedCards(this.tier8, '4', '2'); // 42s
      addSuitedCards(this.tier8, '3', '2'); // 32s
      addUnsuitedCards(this.tier8, 'a', '9'); // A9o
      addUnsuitedCards(this.tier8, 'k', '9'); // K9o
      addUnsuitedCards(this.tier8, 'q', '9'); // Q9o
      addUnsuitedCards(this.tier8, 'j', '8'); // J8o
      addUnsuitedCards(this.tier8, '10', '8'); // T8o
      addUnsuitedCards(this.tier8, '8', '7'); // 87o
      addUnsuitedCards(this.tier8, '7', '6'); // 76o
      addUnsuitedCards(this.tier8, '6', '5'); // 65o
      addUnsuitedCards(this.tier8, '5', '4'); // 54o

      // pocket pairs
      addPocketPair(this.types.pocketPairs, '2');
      addPocketPair(this.types.pocketPairs, '3');
      addPocketPair(this.types.pocketPairs, '4');
      addPocketPair(this.types.pocketPairs, '5');
      addPocketPair(this.types.pocketPairs, '6');
      addPocketPair(this.types.pocketPairs, '7');
      addPocketPair(this.types.pocketPairs, '8');
      addPocketPair(this.types.pocketPairs, '9');
      addPocketPair(this.types.pocketPairs, '10');

      // suited connectors
      addSuitedCards(this.types.suitedConnectors, 'q', 'j');
      addSuitedCards(this.types.suitedConnectors, 'j', '10');
      addSuitedCards(this.types.suitedConnectors, '10', '9');
      addSuitedCards(this.types.suitedConnectors, '9', '8');
      addSuitedCards(this.types.suitedConnectors, '8', '7');
      addSuitedCards(this.types.suitedConnectors, '7', '6');
      addSuitedCards(this.types.suitedConnectors, '6', '5');
      addSuitedCards(this.types.suitedConnectors, '5', '4');
      addSuitedCards(this.types.suitedConnectors, '4', '3');
      addSuitedCards(this.types.suitedConnectors, '3', '2');
      addSuitedCards(this.types.suitedConnectors, '2', 'a');

      // suited one gappers
      addSuitedCards(this.types.suitedOneGappers, 'k', 'j');
      addSuitedCards(this.types.suitedOneGappers, 'q', '10');
      addSuitedCards(this.types.suitedOneGappers, 'j', '9');
      addSuitedCards(this.types.suitedOneGappers, '10', '8');
      addSuitedCards(this.types.suitedOneGappers, '9', '7');
      addSuitedCards(this.types.suitedOneGappers, '8', '6');
      addSuitedCards(this.types.suitedOneGappers, '7', '5');
      addSuitedCards(this.types.suitedOneGappers, '6', '4');
      addSuitedCards(this.types.suitedOneGappers, '5', '3');
      addSuitedCards(this.types.suitedOneGappers, '4', '2');
      addSuitedCards(this.types.suitedOneGappers, '3', 'a');

      // Ax suited
      addSuitedCards(this.types.aceXSuited, 'a', '2');
      addSuitedCards(this.types.aceXSuited, 'a', '3');
      addSuitedCards(this.types.aceXSuited, 'a', '4');
      addSuitedCards(this.types.aceXSuited, 'a', '5');
      addSuitedCards(this.types.aceXSuited, 'a', '6');
      addSuitedCards(this.types.aceXSuited, 'a', '7');
      addSuitedCards(this.types.aceXSuited, 'a', '8');
      addSuitedCards(this.types.aceXSuited, 'a', '9');

      // Kx suited
      addSuitedCards(this.types.kingXSuited, 'k', '2');
      addSuitedCards(this.types.kingXSuited, 'k', '3');
      addSuitedCards(this.types.kingXSuited, 'k', '4');
      addSuitedCards(this.types.kingXSuited, 'k', '5');
      addSuitedCards(this.types.kingXSuited, 'k', '6');
      addSuitedCards(this.types.kingXSuited, 'k', '7');
      addSuitedCards(this.types.kingXSuited, 'k', '8');
    },
  };

  function addPocketPair(tier, rank) {
    tier.push([
      new Card(rank, 'h'),
      new Card(rank, 'd'),
    ]);

    tier.push([
      new Card(rank, 'h'),
      new Card(rank, 'c'),
    ]);

    tier.push([
      new Card(rank, 'h'),
      new Card(rank, 's'),
    ]);

    tier.push([
      new Card(rank, 'd'),
      new Card(rank, 'c'),
    ]);

    tier.push([
      new Card(rank, 'd'),
      new Card(rank, 's'),
    ]);

    tier.push([
      new Card(rank, 'c'),
      new Card(rank, 's'),
    ]);
  }

  function addSuitedCards(tier, rank1, rank2) {
    tier.push([
      new Card(rank1, 'h'),
      new Card(rank2, 'h'),
    ]);

    tier.push([
      new Card(rank1, 'd'),
      new Card(rank2, 'd'),
    ]);

    tier.push([
      new Card(rank1, 'c'),
      new Card(rank2, 'c'),
    ]);

    tier.push([
      new Card(rank1, 's'),
      new Card(rank2, 's'),
    ]);
  }

  function addUnsuitedCards(tier, rank1, rank2) {
    tier.push([
      new Card(rank1, 'h'),
      new Card(rank2, 'd'),
    ]);

    tier.push([
      new Card(rank1, 'h'),
      new Card(rank2, 'c'),
    ]);

    tier.push([
      new Card(rank1, 'h'),
      new Card(rank2, 's'),
    ]);

    tier.push([
      new Card(rank1, 'd'),
      new Card(rank2, 'h'),
    ]);

    tier.push([
      new Card(rank1, 'd'),
      new Card(rank2, 'c'),
    ]);

    tier.push([
      new Card(rank1, 'd'),
      new Card(rank2, 's'),
    ]);

    tier.push([
      new Card(rank1, 'c'),
      new Card(rank2, 'h'),
    ]);

    tier.push([
      new Card(rank1, 'c'),
      new Card(rank2, 'd'),
    ]);

    tier.push([
      new Card(rank1, 'c'),
      new Card(rank2, 's'),
    ]);

    tier.push([
      new Card(rank1, 's'),
      new Card(rank2, 'h'),
    ]);

    tier.push([
      new Card(rank1, 's'),
      new Card(rank2, 'd'),
    ]);

    tier.push([
      new Card(rank1, 's'),
      new Card(rank2, 'c'),
    ]);
  }

  return constants;
})();
