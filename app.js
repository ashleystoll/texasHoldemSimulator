angular
  .module('texasHoldemSimulator', [])
  .controller('MainCtrl', MainCtrl)
;

function MainCtrl() {
  var vm = this;
  var deck = new Deck();

  vm.playersSpec = [];
  /*
    playersSpec = [{
      method: 'random',
    }, {
      method: 'tier',
      tiers: ['tier1', 'tier2'],
    }, {
      method: 'type',
      type: 'pocketPairs'
    },}{
      method: 'manual',
      card1: new Card('a', 'h'),
      card2: new Card('3', 'h'),
    }];
  */

  vm.boardCards = [];

  vm.waysToDealPlayer = [
    'random',
    'tier',
    'type',
    'manual',
  ];
  vm.startingHandTiers = [
    'Tier 1',
    'Tier 2',
    'Tier 3',
    'Tier 4',
    'Tier 5',
    'Tier 6',
    'Tier 7',
    'Tier 8',
  ];
  vm.startingHandTypes = [
    'pocketPairs',
    'suitedConnectors',
    'suitedOneGappers',
    'aceXSuited',
    'kingXSuited',
  ];
  vm.suits = ['h', 'c', 'd', 's'];
  vm.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];
  vm.dealToOptions = ['preflop', 'flop', 'turn', 'river'];
  vm.dealTo = 'river';
  vm.usesStartingHandTiers = false;
  vm.numberOfSimulations = 10000;
  vm.handPossibilities = [
    'pair',
    'two pair',
    'trips',
    'straight',
    'flush',
    'full house',
    'quads',
  ];
  vm.pairTypes = [
    'overpair',
    'top pair',
    'second pair+',
    'second pair',
    'third pair+',
    'third pair',
    'fourth pair+',
    'fourth pair',
    'fifth pair+',
    'fifth pair',
    'underpair',
  ];
  vm.evalAgainstAllPairsFromHoleCards = true;
  vm.handsFromHoleCardsToEvalAgainst = {
    pair: true,
    'two pair': false,
    trips: false,
    straight: false,
    flush: false,
    'full house': false,
    quads: false,
  };
  vm.pairsFromHoleCardsToEvalAgainst = {
    overpair: true,
    'top pair': true,
    'second pair+': true,
    'second pair': true,
    'third pair+': true,
    'third pair': true,
    'fourth pair+': true,
    'fourth pair': true,
    'fifth pair+': true,
    'fifth pair': true,
    underpair: true,
  };
  vm.evalAgainstAllPairs = true;
  vm.handsToEvalAgainst = {
    pair: false,
    'two pair': false,
    trips: false,
    straight: false,
    flush: false,
    'full house': false,
    quads: false,
  };
  vm.pairsToEvalAgainst = {
    overpair: true,
    'top pair': true,
    'second pair+': true,
    'second pair': true,
    'third pair+': true,
    'third pair': true,
    'fourth pair+': true,
    'fourth pair': true,
    'fifth pair+': true,
    'fifth pair': true,
    underpair: true,
  };
  vm.drawPossibilities = [
    'flushDraw',
    'openEndedStraightDraw',
    'doubleBellyBusterStraightDraw',
  ];
  vm.drawsToEvalAgainst = {
    flushDraw: false,
    openEndedStraightDraw: false,
    doubleBellyBusterStraightDraw: false,
  };

  vm.addPlayer = function () {
    vm.playersSpec.push({
      method: 'random',
    });
  };

  vm.removePlayer = function (i) {
    vm.playersSpec.splice(i, 1);
  };

  vm.updatePlayerMethod = function (player) {
    if (player.method === 'random') {
      deleteTiers(player);
      deleteTypes(player);
      deleteManualCards(player);
    }

    else if (player.method === 'tier') {
      deleteTypes(player);
      deleteManualCards(player);
    }

    else if (player.method === 'type') {
      deleteTiers(player);
      deleteManualCards(player);
    }

    else if (player.method === 'manual') {
      deleteTiers(player);
      deleteTypes(player);
      player.card1 = {
        rank: '2',
        suit: 'h',
      };
      player.card2 = {
        rank: '2',
        suit: 's',
      };
    }
  };

  vm.setPlayersSpec = function () {
    var textToCamelCaseMap = {
      'Tier 1': 'tier1',
      'Tier 2': 'tier2',
      'Tier 3': 'tier3',
      'Tier 4': 'tier4',
      'Tier 5': 'tier5',
      'Tier 6': 'tier6',
      'Tier 7': 'tier7',
      'Tier 8': 'tier8',
    };
    var player;
    var j;

    for (var i = 0, len = vm.playersSpec.length; i < len; i++) {
      player = vm.playersSpec[i];

      if (player.method === 'tier') {
        vm.usesStartingHandTiers = true;

        player.tiers = [];
        for (j = 1; j <= 8; j++) {
          if (player['Tier ' + j]) {
            player.tiers.push('tier' + j);
          }
        }
      }

      else if (player.method === 'type') {
        vm.usesStartingHandTiers = true;

        player.types = [];
        if (player.pocketPairs) {
          player.types.push('pocketPairs');
        }

        if (player.suitedConnectors) {
          player.types.push('suitedConnectors');
        }

        if (player.suitedOneGappers) {
          player.types.push('suitedOneGappers');
        }

        if (player.aceXSuited) {
          player.types.push('aceXSuited');
        }

        if (player.kingXSuited) {
          player.types.push('kingXSuited');
        }
      }

      else if (player.method === 'manual') {
        player.hand = [];
        player.hand.push(player.card1);
        player.hand.push(player.card2);
      }

      deleteTiers(player);
      deleteTypes(player);
      deleteManualCards(player);
    }
  };

  vm.setBoardCards = function () {
    for (var i = 0; i < 5; i++) {
      if (vm.boardCards[i]) {
        vm.boardCards[i] = new Card(vm.boardCards[i].rank, vm.boardCards[i].suit);
      }
    }
  };

  vm.togglePairTypesHoleCards = function () {
    vm.pairsFromHoleCardsToEvalAgainst.overpair = vm.evalAgainstAllPairsFromHoleCards;
    vm.pairsFromHoleCardsToEvalAgainst['top pair'] = vm.evalAgainstAllPairsFromHoleCards;
    vm.pairsFromHoleCardsToEvalAgainst['second pair+'] = vm.evalAgainstAllPairsFromHoleCards;
    vm.pairsFromHoleCardsToEvalAgainst['second pair'] = vm.evalAgainstAllPairsFromHoleCards;
    vm.pairsFromHoleCardsToEvalAgainst['third pair+'] = vm.evalAgainstAllPairsFromHoleCards;
    vm.pairsFromHoleCardsToEvalAgainst['third pair'] = vm.evalAgainstAllPairsFromHoleCards;
    vm.pairsFromHoleCardsToEvalAgainst['fourth pair+'] = vm.evalAgainstAllPairsFromHoleCards;
    vm.pairsFromHoleCardsToEvalAgainst['fourth pair'] = vm.evalAgainstAllPairsFromHoleCards;
    vm.pairsFromHoleCardsToEvalAgainst['fifth pair+'] = vm.evalAgainstAllPairsFromHoleCards;
    vm.pairsFromHoleCardsToEvalAgainst['fifth pair'] = vm.evalAgainstAllPairsFromHoleCards;
    vm.pairsFromHoleCardsToEvalAgainst.underpair = vm.evalAgainstAllPairsFromHoleCards;
  };

  vm.togglePairTypes = function () {
    vm.pairsToEvalAgainst.overpair = vm.evalAgainstAllPairs;
    vm.pairsToEvalAgainst['top pair'] = vm.evalAgainstAllPairs;
    vm.pairsToEvalAgainst['second pair+'] = vm.evalAgainstAllPairs;
    vm.pairsToEvalAgainst['second pair'] = vm.evalAgainstAllPairs;
    vm.pairsToEvalAgainst['third pair+'] = vm.evalAgainstAllPairs;
    vm.pairsToEvalAgainst['third pair'] = vm.evalAgainstAllPairs;
    vm.pairsToEvalAgainst['fourth pair+'] = vm.evalAgainstAllPairs;
    vm.pairsToEvalAgainst['fourth pair'] = vm.evalAgainstAllPairs;
    vm.pairsToEvalAgainst['fifth pair+'] = vm.evalAgainstAllPairs;
    vm.pairsToEvalAgainst['fifth pair'] = vm.evalAgainstAllPairs;
    vm.pairsToEvalAgainst.underpair = vm.evalAgainstAllPairs;
  };

  vm.runSimulation = function (playersSpec, boardCards, dealTo, usesStartingHandTiers) {
    var players = [];
    var hand;
    var draw;
    var i;
    var len;

    for (i = 0, len = playersSpec.length; i < len; i++) {
      players.push([]);
    }

    deck.initialize();
    if (usesStartingHandTiers) {
      constants.startingHands.initialize();
    }

    dealer.dealPlayers(playersSpec, players, deck);
    dealer.dealBoard(boardCards, dealTo, deck);

    hand = handAnalyzer.bestHand(players[0], boardCards).hand;
    draw = handAnalyzer.draw(players[0], boardCards);

    for (var handFromHoleCardsToEvalAgainst in vm.handsFromHoleCardsToEvalAgainst) {
      // if we're supposed to compare against it (pair, two pair, trips...)
      if (vm.handsFromHoleCardsToEvalAgainst.hasOwnProperty(handFromHoleCardsToEvalAgainst) && vm.handsFromHoleCardsToEvalAgainst[handFromHoleCardsToEvalAgainst]) {

        if (handFromHoleCardsToEvalAgainst === 'pair') {
          if (handAnalyzer.handFromHoleCards('pair', players[0], boardCards)) { // if there's a pair
            for (var pairType in vm.pairsFromHoleCardsToEvalAgainst) {
              if (vm.pairsFromHoleCardsToEvalAgainst.hasOwnProperty(pairType) && vm.pairsFromHoleCardsToEvalAgainst[pairType]) { // if we're supposed to compare against it
                if (handAnalyzer.bestHand(players[0], boardCards).pairType === pairType) {
                  return true;
                }
              }
            }
          }
        }

        else if (handFromHoleCardsToEvalAgainst !== 'pair') {
          if (handAnalyzer.handFromHoleCards(handFromHoleCardsToEvalAgainst, players[0], boardCards)) {
            return true;
          }
        }

      }
    }

    for (var handToEvalAgainst in vm.handsToEvalAgainst) {
      // if we're supposed to compare against it (pair, two pair, trips...)
      if (vm.handsToEvalAgainst.hasOwnProperty(handToEvalAgainst) && vm.handsToEvalAgainst[handToEvalAgainst]) {
        if (handToEvalAgainst === 'pair') {
          if (hand === 'pair') {
            for (var pairType2 in vm.pairsToEvalAgainst) {
              if (vm.pairsToEvalAgainst.hasOwnProperty(pairType2) && vm.pairsToEvalAgainst[pairType2]) { // if we're supposed to compare against it
                if (handAnalyzer.bestHand(players[0], boardCards).pairType === pairType2) {
                  return true;
                }
              }
            }
          }
        }


        else if (handToEvalAgainst !== 'pair') {
          if (hand === handToEvalAgainst) {
            return true;
          }
        }

      }
    }

    for (var drawToEvalAgainst in vm.drawsToEvalAgainst) {
      if (vm.drawsToEvalAgainst.hasOwnProperty(drawToEvalAgainst) && vm.drawsToEvalAgainst[drawToEvalAgainst]) {
        if (drawToEvalAgainst === 'flushDraw' && draw.flushDraw) {
          return true;
        }

        else if (drawToEvalAgainst === 'openEndedStraightDraw' && draw.openEndedStraightDraw) {
          return true;
        }

        else if (drawToEvalAgainst === 'doubleBellyBusterStraightDraw' && draw.doubleBellyBusterStraightDraw) {
          return true;
        }
      }
    }

    return false;
  };

  vm.runSimulations = function () {
    var successes = 0;
    var boardCards;
    var oldPlayersSpec = angular.copy(vm.playersSpec);

    vm.setPlayersSpec();
    vm.setBoardCards();
    vm.determineIfEvalAgainstPair();

    for (var i = 0; i < vm.numberOfSimulations; i++) {
      boardCards = angular.copy(vm.boardCards);

      if (i % 1000 === 0) {
        console.log(i);
      }

      if (vm.runSimulation(vm.playersSpec, boardCards, vm.dealTo, vm.usesStartingHandTiers)) {
        successes++;
      }
    }

    vm.result = (successes / vm.numberOfSimulations) * 100;
    vm.playersSpec = oldPlayersSpec;
  };

  vm.determineIfEvalAgainstPair = function () {
    // from hole cards
    if (vm.pairsFromHoleCardsToEvalAgainst.overpair ||
        vm.pairsFromHoleCardsToEvalAgainst['top pair'] ||
        vm.pairsFromHoleCardsToEvalAgainst['second pair+'] ||
        vm.pairsFromHoleCardsToEvalAgainst['second pair'] ||
        vm.pairsFromHoleCardsToEvalAgainst['third pair+'] ||
        vm.pairsFromHoleCardsToEvalAgainst['third pair'] ||
        vm.pairsFromHoleCardsToEvalAgainst['fourth pair+'] ||
        vm.pairsFromHoleCardsToEvalAgainst['fourth pair'] ||
        vm.pairsFromHoleCardsToEvalAgainst['fifth pair+'] ||
        vm.pairsFromHoleCardsToEvalAgainst['fifth pair'] ||
        vm.pairsFromHoleCardsToEvalAgainst.underpair
    ) {
      vm.handsFromHoleCardsToEvalAgainst.pair = true;
    } else {
      vm.handsFromHoleCardsToEvalAgainst.pair = false;
    }

    // regular
    if (vm.pairsToEvalAgainst.overpair ||
        vm.pairsToEvalAgainst['top pair'] ||
        vm.pairsToEvalAgainst['second pair+'] ||
        vm.pairsToEvalAgainst['second pair'] ||
        vm.pairsToEvalAgainst['third pair+'] ||
        vm.pairsToEvalAgainst['third pair'] ||
        vm.pairsToEvalAgainst['fourth pair+'] ||
        vm.pairsToEvalAgainst['fourth pair'] ||
        vm.pairsToEvalAgainst['fifth pair+'] ||
        vm.pairsToEvalAgainst['fifth pair'] ||
        vm.pairsToEvalAgainst.underpair
    ) {
      vm.handsToEvalAgainst.pair = true;
    } else {
      vm.handsToEvalAgainst.pair = false;
    }
  };

  function deleteTiers(player) {
    delete player['Tier 1'];
    delete player['Tier 2'];
    delete player['Tier 3'];
    delete player['Tier 4'];
    delete player['Tier 5'];
    delete player['Tier 6'];
    delete player['Tier 7'];
    delete player['Tier 8'];
  }

  function deleteTypes(player) {
    delete player.pocketPairs;
    delete player.suitedConnectors;
    delete player.suitedOneGappers;
    delete player.aceXSuited;
    delete player.kingXSuited;
  }

  function deleteManualCards(player) {
    delete player.card1;
    delete player.card2;
  }
}
