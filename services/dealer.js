var dealer = (function () {
  dealer = {
    dealPlayers: dealPlayers,
    dealBoard: dealBoard,
    _getRandomHandFromDeck: getRandomHandFromDeck,
    _getRandomHandFromTiers: getRandomHandFromTiers,
    _getRandomHandFromTypes: getRandomHandFromTypes,
    _dealHandToPlayer: dealHandToPlayer,
    _dealCardToPlayer: dealCardToPlayer,
    _removeCardFromDeck: removeCardFromDeck,
    _removeStartingHandFromTier: removeStartingHandFromTier,
    _removeStartingHandFromType: removeStartingHandFromType,
  };

  function dealPlayers(playersSpec, players, deck) {
    var hand;

    for (var i = 0, len = playersSpec.length; i < len; i++) {
      if (playersSpec[i].method === 'tier') {
        hand = getRandomHandFromTiers(playersSpec[i].tiers);
        dealHandToPlayer(hand, players[i], deck);
      }

      else if (playersSpec[i].method === 'type') {
        hand = getRandomHandFromTypes(playersSpec[i].types);
        dealHandToPlayer(hand, players[i], deck);
      }

      else if (playersSpec[i].method === 'random') {
        players[i] = getRandomHandFromDeck(deck);
      }

      else if (playersSpec[i].method === 'manual') {
        dealHandToPlayer(playersSpec[i].hand, players[i], deck);
      }
    }
  }

  function getRandomHandFromDeck(deck) {
    var card1 = deck.cards.pop();
    var card2 = deck.cards.pop();
    var startingHand = [ card1, card2 ];

    removeStartingHandFromTier(startingHand);
    removeStartingHandFromType(startingHand);
    return startingHand;
  }

  function getRandomHandFromTiers(tiers) {
    var possibleStartingHands = [];
    var currTier;
    var currStartingHand;
    var i;
    var j;

    for (i = 0; i < tiers.length; i++) {
      currTier = tiers[i];
      for (j = 0; j < constants.startingHands[currTier].length; j++) {
        currStartingHand = constants.startingHands[currTier][j];
        possibleStartingHands.push(currStartingHand);
      }
    }

    return possibleStartingHands[Math.floor(Math.random() * possibleStartingHands.length)];
  }

  function getRandomHandFromTypes(types) {
    var possibleStartingHands = [];
    var currType;
    var currStartingHand;
    var i;
    var j;

    for (i = 0; i < types.length; i++) {
      currType = types[i];
      for (j = 0; j < constants.startingHands.types[currType].length; j++) {
        currStartingHand = constants.startingHands.types[currType][j];
        possibleStartingHands.push(currStartingHand);
      }
    }

    return possibleStartingHands[Math.floor(Math.random() * possibleStartingHands.length)];
  }

  function dealHandToPlayer(hand, player, deck) {
    removeStartingHandFromType(hand);
    removeStartingHandFromTier(hand);
    dealCardToPlayer(hand[0], player, deck);
    dealCardToPlayer(hand[1], player, deck);
  }

  function dealCardToPlayer(card, player, deck) {
    removeCardFromDeck(card, deck);
    player.push(card);
  }

  function dealBoard(boardCards, dealTo, deck) {
    if (dealTo === 'preflop') {
      return;
    }

    if (dealTo === 'flop' || dealTo === 'turn' || dealTo === 'river') {
      if (!boardCards[0]) {
        boardCards[0] = deck.cards.pop();
      }

      if (!boardCards[1]) {
        boardCards[1] = deck.cards.pop();
      }

      if (!boardCards[2]) {
        boardCards[2] = deck.cards.pop();
      }
    }

    if (dealTo === 'turn' || dealTo === 'river') {
      if (!boardCards[3]) {
        boardCards[3] = deck.cards.pop();
      }
    }

    if (dealTo === 'river') {
      if (!boardCards[4]) {
        boardCards[4] = deck.cards.pop();
      }
    }
  }

  function removeCardFromDeck(card, deck) {
    var indexOfCardInDeck = _.findIndex(deck.cards, function (currCard) {
      return utilities.areCardsEqual(card, currCard);
    });

    if (indexOfCardInDeck === -1) {
      throw new Error('Trying to remove a card that doesn\'t exist.');
    }
    deck.cards.splice(indexOfCardInDeck, 1);
  }

  function removeStartingHandFromTier(startingHandToRemove) {
    var tiers = [ 'tier1', 'tier2', 'tier3', 'tier4', 'tier5', 'tier6', 'tier7', 'tier8' ];
    var currTier;
    var currStartingHand;
    var i;
    var j;

    for (i = 0; i < tiers.length; i++) {
      currTier = tiers[i];
      for (j = 0; j < constants.startingHands[currTier].length; j++) {
        currStartingHand = constants.startingHands[currTier][j];
        if (utilities.areHandsEqual(startingHandToRemove, currStartingHand)) {
          constants.startingHands[currTier].splice(j, 1);
          return;
        }
      }
    }
  }

  function removeStartingHandFromType(startingHandToRemove) {
    var i;
    var len;
    var currStartingHand;

    for (var type in constants.startingHands.types) {
      if (constants.startingHands.types.hasOwnProperty(type)) {
        for (i = 0, len = constants.startingHands.types[type].length; i < len; i++) {
          currStartingHand = constants.startingHands.types[type][i];
          if (utilities.areHandsEqual(startingHandToRemove, currStartingHand)) {
            constants.startingHands.types[type].splice(i, 1);
            break;
          }
        }
      }
    }
  }

  return dealer;
})();
