describe('dealer', function() {
  var deck = new Deck();
  var player;
  var boardCards;

  beforeEach(function () {
    deck.initialize();
    player = [];
    boardCards = [];
    constants.startingHands.initialize();
  });

  describe('dealPlayers', function () {
  });

  describe('dealBoard', function () {
    it('preflop', function () {
      dealer.dealBoard(boardCards, 'preflop', deck);
      expect(boardCards.length).toBe(0);
      expect(deck.cards.length).toBe(52);
    });

    it('flop', function () {
      dealer.dealBoard(boardCards, 'flop', deck);
      expect(boardCards.length).toBe(3);
      expect(deck.cards.length).toBe(49);
    });

    it('turn', function () {
      dealer.dealBoard(boardCards, 'turn', deck);
      expect(boardCards.length).toBe(4);
      expect(deck.cards.length).toBe(48);
    });

    it('river', function () {
      dealer.dealBoard(boardCards, 'river', deck);
      expect(boardCards.length).toBe(5);
      expect(deck.cards.length).toBe(47);
    });
  });

  describe('_getRandomHandFromDeck', function () {
    it('should randomly choose a hand', function () {
      var currHand;
      var suitCounts = {
        h: 0,
        d: 0,
        c: 0,
        s: 0,
      };
      var rankCounts = {
        'a': 0,
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
      };
      var simulations = 100000;

      for (var i = 0; i < simulations; i++) {
        deck.initialize();
        currHand = dealer._getRandomHandFromDeck(deck);
        suitCounts[currHand[0].suit]++;
        rankCounts[currHand[0].rank]++;
      }


      expect((suitCounts.h / simulations) > 0.24 && (suitCounts.h / simulations) < 0.26).toBe(true);
      expect((suitCounts.d / simulations) > 0.24 && (suitCounts.d / simulations) < 0.26).toBe(true);
      expect((suitCounts.c / simulations) > 0.24 && (suitCounts.c / simulations) < 0.26).toBe(true);
      expect((suitCounts.s / simulations) > 0.24 && (suitCounts.s / simulations) < 0.26).toBe(true);

      expect((rankCounts.a / simulations) > 0.067 && (rankCounts.a / simulations) < 0.086).toBe(true);
      expect((rankCounts['2'] / simulations) > 0.067 && (rankCounts['2'] / simulations) < 0.086).toBe(true);
      expect((rankCounts['3'] / simulations) > 0.067 && (rankCounts['3'] / simulations) < 0.086).toBe(true);
      expect((rankCounts['4'] / simulations) > 0.067 && (rankCounts['4'] / simulations) < 0.086).toBe(true);
      expect((rankCounts['5'] / simulations) > 0.067 && (rankCounts['5'] / simulations) < 0.086).toBe(true);
      expect((rankCounts['6'] / simulations) > 0.067 && (rankCounts['6'] / simulations) < 0.086).toBe(true);
      expect((rankCounts['7'] / simulations) > 0.067 && (rankCounts['7'] / simulations) < 0.086).toBe(true);
      expect((rankCounts['8'] / simulations) > 0.067 && (rankCounts['8'] / simulations) < 0.086).toBe(true);
      expect((rankCounts['9'] / simulations) > 0.067 && (rankCounts['9'] / simulations) < 0.086).toBe(true);
      expect((rankCounts['10'] / simulations) > 0.067 && (rankCounts['10'] / simulations) < 0.086).toBe(true);
      expect((rankCounts.j / simulations) > 0.067 && (rankCounts.j / simulations) < 0.086).toBe(true);
      expect((rankCounts.q / simulations) > 0.067 && (rankCounts.q / simulations) < 0.086).toBe(true);
      expect((rankCounts.k / simulations) > 0.067 && (rankCounts.k / simulations) < 0.086).toBe(true);

      expect(deck.cards.length).toBe(50);
      // hard to test that it removes from tier and type; just check code to make sure functions are called; functions are unit tested elsewhere
    });
  });

  describe('_getRandomHandFromTiers', function () {
    xit('tier 1', function () {
      var hand = {
        aa: 0,
        kk: 0,
        qq: 0,
        jj: 0,
        aks: 0,
      };

      var simulations = 100000;
      var currHand;
      var currHandString;

      for (var i = 0; i < simulations; i++) {
        constants.startingHands.initialize();
        currHand = dealer._getRandomHandFromTiers(['tier1']);
        currHandString = utilities.getHandString(currHand);
        hand[currHandString]++;
      }

      expect((hand.aa / simulations) > 0.204 && (hand.aa / simulations) < 0.224).toBe(true);
      expect((hand.kk / simulations) > 0.204 && (hand.kk / simulations) < 0.224).toBe(true);
      expect((hand.qq / simulations) > 0.204 && (hand.qq / simulations) < 0.224).toBe(true);
      expect((hand.jj / simulations) > 0.204 && (hand.jj / simulations) < 0.224).toBe(true);
      expect((hand.aks / simulations) > 0.133 && (hand.aks / simulations) < 0.153).toBe(true);
      expect(hand.aa + hand.kk + hand.qq + hand.jj + hand.aks).toBe(simulations);
    });

    xit('tier 2', function () {
      var hand = {
        tt: 0,
        aqs: 0,
        ajs: 0,
        kqs: 0,
        ako: 0,
      };

      var simulations = 100000;
      var currHand;
      var currHandString;

      for (var i = 0; i < simulations; i++) {
        constants.startingHands.initialize();
        currHand = dealer._getRandomHandFromTiers(['tier2']);
        currHandString = utilities.getHandString(currHand);
        hand[currHandString]++;
      }

      expect((hand.tt / simulations) > 0.19 && (hand.tt / simulations) < 0.21).toBe(true);
      expect((hand.aqs / simulations) > 0.123 && (hand.aqs / simulations) < 0.143).toBe(true);
      expect((hand.ajs / simulations) > 0.123 && (hand.ajs / simulations) < 0.143).toBe(true);
      expect((hand.kqs / simulations) > 0.123 && (hand.kqs / simulations) < 0.143).toBe(true);
      expect((hand.ako / simulations) > 0.39 && (hand.ako / simulations) < 0.41).toBe(true);
      expect(hand.tt + hand.aqs + hand.ajs + hand.kqs + hand.ako).toBe(simulations);
    });

    xit('tier 3', function () {
      var hand = {
        '99': 0,
        ats: 0,
        kjs: 0,
        qjs: 0,
        jts: 0,
        aqo: 0,
      };

      var simulations = 100000;
      var currHand;
      var currHandString;

      for (var i = 0; i < simulations; i++) {
        constants.startingHands.initialize();
        currHand = dealer._getRandomHandFromTiers(['tier3']);
        currHandString = utilities.getHandString(currHand);
        hand[currHandString]++;
      }

      expect((hand['99'] / simulations) > 0.166 && (hand['99'] / simulations) < 0.186).toBe(true);
      expect((hand.ats / simulations) > 0.107 && (hand.ats / simulations) < 0.127).toBe(true);
      expect((hand.kjs / simulations) > 0.107 && (hand.kjs / simulations) < 0.127).toBe(true);
      expect((hand.qjs / simulations) > 0.107 && (hand.qjs / simulations) < 0.127).toBe(true);
      expect((hand.jts / simulations) > 0.107 && (hand.jts / simulations) < 0.127).toBe(true);
      expect((hand.aqo / simulations) > 0.343 && (hand.aqo / simulations) < 0.363).toBe(true);
      expect(hand['99'] + hand.ats + hand.kjs + hand.qjs + hand.jts + hand.aqo).toBe(simulations);
    });

    xit('tier 4', function () {
      var hand = {
        '88': 0,
         kts: 0,
         qts: 0,
         j9s: 0,
         t9s: 0,
       '98s': 0,
         ajo: 0,
         kqo: 0,
      };

      var simulations = 100000;
      var currHand;
      var currHandString;

      for (var i = 0; i < simulations; i++) {
        constants.startingHands.initialize();
        currHand = dealer._getRandomHandFromTiers(['tier4']);
        currHandString = utilities.getHandString(currHand);
        hand[currHandString]++;
      }

      expect((hand['88'] / simulations) > 0.11 && (hand['88'] / simulations) < 0.13).toBe(true);
      expect((hand.kts / simulations) > 0.07 && (hand.kts / simulations) < 0.09).toBe(true);
      expect((hand.qts / simulations) > 0.07 && (hand.qts / simulations) < 0.09).toBe(true);
      expect((hand.j9s / simulations) > 0.07 && (hand.j9s / simulations) < 0.09).toBe(true);
      expect((hand.t9s / simulations) > 0.07 && (hand.t9s / simulations) < 0.09).toBe(true);
      expect((hand['98s'] / simulations) > 0.07 && (hand['98s'] / simulations) < 0.09).toBe(true);
      expect((hand.ajo / simulations) > 0.23 && (hand.ajo / simulations) < 0.25).toBe(true);
      expect((hand.kqo / simulations) > 0.23 && (hand.kqo / simulations) < 0.25).toBe(true);
      expect(hand['88'] + hand.kts + hand.qts + hand.j9s + hand.t9s + hand['98s'] + hand.ajo + hand.kqo).toBe(simulations);
    });

    xit('tier 5', function () {
      var hand = {
        '77': 0,
        'a9s': 0,
        'a8s': 0,
        'a7s': 0,
        'a6s': 0,
        'a5s': 0,
        'a4s': 0,
        'a3s': 0,
        'a2s': 0,
        'q9s': 0,
        't8s': 0,
        '97s': 0,
        '87s': 0,
        '76s': 0,
        'kjo': 0,
        'qjo': 0,
        'jto': 0
      };

      var simulations = 100000;
      var currHand;
      var currHandString;

      for (var i = 0; i < simulations; i++) {
        constants.startingHands.initialize();
        currHand = dealer._getRandomHandFromTiers(['tier5']);
        currHandString = utilities.getHandString(currHand);
        hand[currHandString]++;
      }

      expect((hand['77'] / simulations) > 0.053 && (hand['77'] / simulations) < 0.073).toBe(true);
      expect((hand.a9s / simulations) > 0.032 && (hand.a9s / simulations) < 0.052).toBe(true);
      expect((hand.a8s / simulations) > 0.032 && (hand.a8s / simulations) < 0.052).toBe(true);
      expect((hand.a7s / simulations) > 0.032 && (hand.a7s / simulations) < 0.052).toBe(true);
      expect((hand.a6s / simulations) > 0.032 && (hand.a6s / simulations) < 0.052).toBe(true);
      expect((hand.a5s / simulations) > 0.032 && (hand.a5s / simulations) < 0.052).toBe(true);
      expect((hand.a4s / simulations) > 0.032 && (hand.a4s / simulations) < 0.052).toBe(true);
      expect((hand.a3s / simulations) > 0.032 && (hand.a3s / simulations) < 0.052).toBe(true);
      expect((hand.a2s / simulations) > 0.032 && (hand.a2s / simulations) < 0.052).toBe(true);
      expect((hand.q9s / simulations) > 0.032 && (hand.q9s / simulations) < 0.052).toBe(true);
      expect((hand.t8s / simulations) > 0.032 && (hand.t8s / simulations) < 0.052).toBe(true);
      expect((hand['97s'] / simulations) > 0.032 && (hand['97s'] / simulations) < 0.052).toBe(true);
      expect((hand['87s'] / simulations) > 0.032 && (hand['87s'] / simulations) < 0.052).toBe(true);
      expect((hand['76s'] / simulations) > 0.032 && (hand['76s'] / simulations) < 0.052).toBe(true);
      expect((hand.kjo / simulations) > 0.117 && (hand.kjo / simulations) < 0.137).toBe(true);
      expect((hand.qjo / simulations) > 0.117 && (hand.qjo / simulations) < 0.137).toBe(true);
      expect((hand.jto / simulations) > 0.117 && (hand.jto / simulations) < 0.137).toBe(true);
      expect(hand['77'] + hand.a9s + hand.a8s + hand.a7s + hand.a6s + hand.a5s + hand.a4s + hand.a3s + hand.a2s + hand.q9s + hand.t8s + hand['97s'] + hand['87s'] + hand['76s'] + hand.kjo + hand.qjo + hand.jto).toBe(simulations);
    });

    xit('tier 6', function () {
      var hand = {
        '66': 0,
        '55': 0,
         k9s: 0,
         j8s: 0,
       '86s': 0,
       '75s': 0,
       '54s': 0,
         ato: 0,
         kto: 0,
         qto: 0,
      };

      var simulations = 100000;
      var currHand;
      var currHandString;

      for (var i = 0; i < simulations; i++) {
        constants.startingHands.initialize();
        currHand = dealer._getRandomHandFromTiers(['tier6']);
        currHandString = utilities.getHandString(currHand);
        hand[currHandString]++;
      }

      expect((hand['66'] / simulations) > 0.078 && (hand['66'] / simulations) < 0.098).toBe(true);
      expect((hand['55'] / simulations) > 0.078 && (hand['55'] / simulations) < 0.098).toBe(true);
      expect((hand.k9s / simulations) > 0.049 && (hand.k9s / simulations) < 0.069).toBe(true);
      expect((hand.j8s / simulations) > 0.049 && (hand.j8s / simulations) < 0.069).toBe(true);
      expect((hand['86s'] / simulations) > 0.049 && (hand['86s'] / simulations) < 0.069).toBe(true);
      expect((hand['75s'] / simulations) > 0.049 && (hand['75s'] / simulations) < 0.069).toBe(true);
      expect((hand['54s'] / simulations) > 0.049 && (hand['54s'] / simulations) < 0.069).toBe(true);
      expect((hand.ato / simulations) > 0.166 && (hand.ato / simulations) < 0.186).toBe(true);
      expect((hand.kto / simulations) > 0.166 && (hand.kto / simulations) < 0.186).toBe(true);
      expect((hand.qto / simulations) > 0.166 && (hand.qto / simulations) < 0.186).toBe(true);
      expect(hand['66'] + hand['55'] + hand.k9s + hand.j8s + hand['86s'] + hand['75s'] + hand['54s'] + hand.ato + hand.kto + hand.qto).toBe(simulations);
    });

    xit('tier 7', function () {
      var hand = {
        '44': 0,
        '33': 0,
        '22': 0,
        k8s: 0,
        k7s: 0,
        k6s: 0,
        k5s: 0,
        k4s: 0,
        k3s: 0,
        k2s: 0,
        q8s: 0,
        t7s: 0,
        '64s': 0,
        '53s': 0,
        '43s': 0,
        j9o: 0,
        t9o: 0,
        '98o': 0,
      };

      var simulations = 100000;
      var currHand;
      var currHandString;

      for (var i = 0; i < simulations; i++) {
        constants.startingHands.initialize();
        currHand = dealer._getRandomHandFromTiers(['tier7']);
        currHandString = utilities.getHandString(currHand);
        hand[currHandString]++;
      }

      expect((hand['44'] / simulations) > 0.048 && (hand['44'] / simulations) < 0.068).toBe(true);
      expect((hand['33'] / simulations) > 0.048 && (hand['33'] / simulations) < 0.068).toBe(true);
      expect((hand['22'] / simulations) > 0.048 && (hand['22'] / simulations) < 0.068).toBe(true);
      expect((hand.k8s / simulations) > 0.029 && (hand.k8s / simulations) < 0.049).toBe(true);
      expect((hand.k7s / simulations) > 0.029 && (hand.k7s / simulations) < 0.049).toBe(true);
      expect((hand.k6s / simulations) > 0.029 && (hand.k6s / simulations) < 0.049).toBe(true);
      expect((hand.k5s / simulations) > 0.029 && (hand.k5s / simulations) < 0.049).toBe(true);
      expect((hand.k4s / simulations) > 0.029 && (hand.k4s / simulations) < 0.049).toBe(true);
      expect((hand.k3s / simulations) > 0.029 && (hand.k3s / simulations) < 0.049).toBe(true);
      expect((hand.k2s / simulations) > 0.029 && (hand.k2s / simulations) < 0.049).toBe(true);
      expect((hand.q8s / simulations) > 0.029 && (hand.q8s / simulations) < 0.049).toBe(true);
      expect((hand.t7s / simulations) > 0.029 && (hand.t7s / simulations) < 0.049).toBe(true);
      expect((hand['64s'] / simulations) > 0.029 && (hand['64s'] / simulations) < 0.049).toBe(true);
      expect((hand['53s'] / simulations) > 0.029 && (hand['53s'] / simulations) < 0.049).toBe(true);
      expect((hand['43s'] / simulations) > 0.029 && (hand['43s'] / simulations) < 0.049).toBe(true);
      expect((hand.j9o / simulations) > 0.108 && (hand.j9o / simulations) < 0.128).toBe(true);
      expect((hand.t9o / simulations) > 0.108 && (hand.t9o / simulations) < 0.128).toBe(true);
      expect((hand['98o'] / simulations) > 0.108 && (hand['98o'] / simulations) < 0.128).toBe(true);
      expect(hand['44'] + hand['33'] + hand['22'] + hand.k8s + hand.k7s + hand.k6s + hand.k5s + hand.k4s + hand.k3s + hand.k2s + hand.q8s + hand.t7s + hand['64s'] + hand['53s'] + hand['43s'] + hand.j9o + hand.t9o + hand['98o']).toBe(simulations);
    });

    xit('tier 8', function () {
      var hand = {
        j7s: 0,
        '96s': 0,
        '85s': 0,
        '74s': 0,
        '42s': 0,
        '32s': 0,
        a9o: 0,
        k9o: 0,
        q9o: 0,
        j8o: 0,
        t8o: 0,
        '87o': 0,
        '76o': 0,
        '65o': 0,
        '54o': 0,
      };

      var simulations = 1000000;
      var currHand;
      var currHandString;

      for (var i = 0; i < simulations; i++) {
        constants.startingHands.initialize();
        currHand = dealer._getRandomHandFromTiers(['tier8']);
        currHandString = utilities.getHandString(currHand);
        hand[currHandString]++;
      }

      expect((hand.j7s / simulations) > 0.02 && (hand.j7s / simulations) < 0.04).toBe(true);
      expect((hand['96s'] / simulations) > 0.02 && (hand['96s'] / simulations) < 0.04).toBe(true);
      expect((hand['85s'] / simulations) > 0.02 && (hand['85s'] / simulations) < 0.04).toBe(true);
      expect((hand['74s'] / simulations) > 0.02 && (hand['74s'] / simulations) < 0.04).toBe(true);
      expect((hand['42s'] / simulations) > 0.02 && (hand['42s'] / simulations) < 0.04).toBe(true);
      expect((hand['32s'] / simulations) > 0.02 && (hand['32s'] / simulations) < 0.04).toBe(true);
      expect((hand.a9o / simulations) > 0.09 && (hand.a9o / simulations) < 0.11).toBe(true);
      expect((hand.k9o / simulations) > 0.09 && (hand.k9o / simulations) < 0.11).toBe(true);
      expect((hand.q9o / simulations) > 0.09 && (hand.q9o / simulations) < 0.11).toBe(true);
      expect((hand.j8o / simulations) > 0.09 && (hand.j8o / simulations) < 0.11).toBe(true);
      expect((hand.t8o / simulations) > 0.09 && (hand.t8o / simulations) < 0.11).toBe(true);
      expect((hand['87o'] / simulations) > 0.09 && (hand['87o'] / simulations) < 0.11).toBe(true);
      expect((hand['76o'] / simulations) > 0.09 && (hand['76o'] / simulations) < 0.11).toBe(true);
      expect((hand['65o'] / simulations) > 0.09 && (hand['65o'] / simulations) < 0.11).toBe(true);
      expect((hand['54o'] / simulations) > 0.09 && (hand['54o'] / simulations) < 0.11).toBe(true);
      expect(hand.j7s + hand['96s'] + hand['85s'] + hand['74s'] + hand['42s'] + hand['32s'] + hand.a9o + hand.k9o + hand.q9o + hand.j8o + hand.t8o + hand['87o'] + hand['76o'] + hand['65o'] + hand['54o']).toBe(simulations);
    });

    xit('tier1 and tier 2', function () {
      var hand = {
        aa: 0,
        kk: 0,
        qq: 0,
        jj: 0,
        aks: 0,
        tt: 0,
        aqs: 0,
        ajs: 0,
        kqs: 0,
        ako: 0,
      };

      var simulations = 100000;
      var currHand;
      var currHandString;

      for (var i = 0; i < simulations; i++) {
        constants.startingHands.initialize();
        currHand = dealer._getRandomHandFromTiers(['tier1', 'tier2']);
        currHandString = utilities.getHandString(currHand);
        hand[currHandString]++;
      }

      expect((hand.aa / simulations) > 0.093 && (hand.aa / simulations) < 0.113).toBe(true);
      expect((hand.kk / simulations) > 0.093 && (hand.kk / simulations) < 0.113).toBe(true);
      expect((hand.qq / simulations) > 0.093 && (hand.qq / simulations) < 0.113).toBe(true);
      expect((hand.jj / simulations) > 0.093 && (hand.jj / simulations) < 0.113).toBe(true);
      expect((hand.tt / simulations) > 0.093 && (hand.tt / simulations) < 0.113).toBe(true);
      expect((hand.aks / simulations) > 0.059 && (hand.aks / simulations) < 0.079).toBe(true);
      expect((hand.aqs / simulations) > 0.059 && (hand.aqs / simulations) < 0.079).toBe(true);
      expect((hand.ajs / simulations) > 0.059 && (hand.ajs / simulations) < 0.079).toBe(true);
      expect((hand.kqs / simulations) > 0.059 && (hand.kqs / simulations) < 0.079).toBe(true);
      expect((hand.ako / simulations) > 0.197 && (hand.ako / simulations) < 0.217).toBe(true);
      expect(hand.aa + hand.kk + hand.qq + hand.jj + hand.aks + hand.tt + hand.aqs + hand.ajs + hand.kqs + hand.ako).toBe(simulations);
    });
  });

  describe('_getRandomHandFromTypes', function () {
    xit('pocket pairs', function () {
      var hand = {
        '22': 0,
        '33': 0,
        '44': 0,
        '55': 0,
        '66': 0,
        '77': 0,
        '88': 0,
        '99': 0,
          tt: 0,
      };

      var simulations = 100000;
      var currHand;
      var currHandString;

      for (var i = 0; i < simulations; i++) {
        constants.startingHands.initialize();
        currHand = dealer._getRandomHandFromTypes(['pocketPairs']);
        currHandString = utilities.getHandString(currHand);
        hand[currHandString]++;
      }

      expect((hand['22'] / simulations) > 0.101 && (hand['22'] / simulations) < 0.121).toBe(true);
      expect((hand['33'] / simulations) > 0.101 && (hand['33'] / simulations) < 0.121).toBe(true);
      expect((hand['44'] / simulations) > 0.101 && (hand['44'] / simulations) < 0.121).toBe(true);
      expect((hand['55'] / simulations) > 0.101 && (hand['55'] / simulations) < 0.121).toBe(true);
      expect((hand['66'] / simulations) > 0.101 && (hand['66'] / simulations) < 0.121).toBe(true);
      expect((hand['77'] / simulations) > 0.101 && (hand['77'] / simulations) < 0.121).toBe(true);
      expect((hand['88'] / simulations) > 0.101 && (hand['88'] / simulations) < 0.121).toBe(true);
      expect((hand['99'] / simulations) > 0.101 && (hand['99'] / simulations) < 0.121).toBe(true);
      expect((hand.tt / simulations) > 0.101 && (hand.tt / simulations) < 0.121).toBe(true);
      expect(hand['22'] + hand['33'] + hand['44'] + hand['55'] + hand['66'] + hand['77'] + hand['88'] + hand['99'] + hand.tt).toBe(simulations);
    });

    xit('suited connectors', function () {
      var hand = {
        qjs: 0,
        jts: 0,
        t9s: 0,
        '98s': 0,
        '87s': 0,
        '76s': 0,
        '65s': 0,
        '54s': 0,
        '43s': 0,
        '32s': 0,
        'a2s': 0,
      };

      var simulations = 100000;
      var currHand;
      var currHandString;

      for (var i = 0; i < simulations; i++) {
        constants.startingHands.initialize();
        currHand = dealer._getRandomHandFromTypes(['suitedConnectors']);
        currHandString = utilities.getHandString(currHand);
        hand[currHandString]++;
      }

      expect((hand.qjs / simulations) > 0.081 && (hand.qjs / simulations) < 0.101).toBe(true);
      expect((hand.jts / simulations) > 0.081 && (hand.jts / simulations) < 0.101).toBe(true);
      expect((hand.t9s / simulations) > 0.081 && (hand.t9s / simulations) < 0.101).toBe(true);
      expect((hand['98s'] / simulations) > 0.081 && (hand['98s'] / simulations) < 0.101).toBe(true);
      expect((hand['87s'] / simulations) > 0.081 && (hand['87s'] / simulations) < 0.101).toBe(true);
      expect((hand['76s'] / simulations) > 0.081 && (hand['76s'] / simulations) < 0.101).toBe(true);
      expect((hand['65s'] / simulations) > 0.081 && (hand['65s'] / simulations) < 0.101).toBe(true);
      expect((hand['54s'] / simulations) > 0.081 && (hand['54s'] / simulations) < 0.101).toBe(true);
      expect((hand['43s'] / simulations) > 0.081 && (hand['43s'] / simulations) < 0.101).toBe(true);
      expect((hand['32s'] / simulations) > 0.081 && (hand['32s'] / simulations) < 0.101).toBe(true);
      expect((hand.a2s / simulations) > 0.081 && (hand.a2s / simulations) < 0.101).toBe(true);
      expect(hand.qjs + hand.jts + hand.t9s + hand['98s'] + hand['87s'] + hand['76s'] + hand['65s'] + hand['54s'] + hand['43s'] + hand['32s'] + hand.a2s).toBe(simulations);
    });

    xit('suited one gappers', function () {
      var hand = {
        kjs: 0,
        qts: 0,
        j9s: 0,
        t8s: 0,
        '97s': 0,
        '86s': 0,
        '75s': 0,
        '64s': 0,
        '53s': 0,
        '42s': 0,
        a3s: 0,
      };

      var simulations = 100000;
      var currHand;
      var currHandString;

      for (var i = 0; i < simulations; i++) {
        constants.startingHands.initialize();
        currHand = dealer._getRandomHandFromTypes(['suitedOneGappers']);
        currHandString = utilities.getHandString(currHand);
        hand[currHandString]++;
      }

      expect((hand.kjs / simulations) > 0.081 && (hand.kjs / simulations) < 0.101).toBe(true);
      expect((hand.qts / simulations) > 0.081 && (hand.qts / simulations) < 0.101).toBe(true);
      expect((hand.j9s / simulations) > 0.081 && (hand.j9s / simulations) < 0.101).toBe(true);
      expect((hand.t8s / simulations) > 0.081 && (hand.t8s / simulations) < 0.101).toBe(true);
      expect((hand['97s'] / simulations) > 0.081 && (hand['97s'] / simulations) < 0.101).toBe(true);
      expect((hand['86s'] / simulations) > 0.081 && (hand['86s'] / simulations) < 0.101).toBe(true);
      expect((hand['75s'] / simulations) > 0.081 && (hand['75s'] / simulations) < 0.101).toBe(true);
      expect((hand['64s'] / simulations) > 0.081 && (hand['64s'] / simulations) < 0.101).toBe(true);
      expect((hand['53s'] / simulations) > 0.081 && (hand['53s'] / simulations) < 0.101).toBe(true);
      expect((hand['42s'] / simulations) > 0.081 && (hand['42s'] / simulations) < 0.101).toBe(true);
      expect((hand.a3s / simulations) > 0.081 && (hand.a3s / simulations) < 0.101).toBe(true);
      expect(hand.kjs + hand.qts + hand.j9s + hand.t8s + hand['97s'] + hand['86s'] + hand['75s'] + hand['64s'] + hand['53s'] + hand['42s'] + hand.a3s).toBe(simulations);
    });

    xit('ace x suited', function () {
      var hand = {
        a2s: 0,
        a3s: 0,
        a4s: 0,
        a5s: 0,
        a6s: 0,
        a7s: 0,
        a8s: 0,
        a9s: 0,
      };

      var simulations = 100000;
      var currHand;
      var currHandString;

      for (var i = 0; i < simulations; i++) {
        constants.startingHands.initialize();
        currHand = dealer._getRandomHandFromTypes(['aceXSuited']);
        currHandString = utilities.getHandString(currHand);
        hand[currHandString]++;
      }

      expect((hand.a2s / simulations) > 0.115 && (hand.a2s / simulations) < 0.135).toBe(true);
      expect((hand.a3s / simulations) > 0.115 && (hand.a3s / simulations) < 0.135).toBe(true);
      expect((hand.a4s / simulations) > 0.115 && (hand.a4s / simulations) < 0.135).toBe(true);
      expect((hand.a5s / simulations) > 0.115 && (hand.a5s / simulations) < 0.135).toBe(true);
      expect((hand.a6s / simulations) > 0.115 && (hand.a6s / simulations) < 0.135).toBe(true);
      expect((hand.a7s / simulations) > 0.115 && (hand.a7s / simulations) < 0.135).toBe(true);
      expect((hand.a8s / simulations) > 0.115 && (hand.a8s / simulations) < 0.135).toBe(true);
      expect((hand.a9s / simulations) > 0.115 && (hand.a9s / simulations) < 0.135).toBe(true);
      expect(hand.a2s + hand.a3s + hand.a4s + hand.a5s + hand.a6s + hand.a7s + hand.a8s + hand.a9s).toBe(simulations);
    });

    xit('king x suited', function () {
      var hand = {
        k2s: 0,
        k3s: 0,
        k4s: 0,
        k5s: 0,
        k6s: 0,
        k7s: 0,
        k8s: 0,
      };

      var simulations = 100000;
      var currHand;
      var currHandString;

      for (var i = 0; i < simulations; i++) {
        constants.startingHands.initialize();
        currHand = dealer._getRandomHandFromTypes(['kingXSuited']);
        currHandString = utilities.getHandString(currHand);
        hand[currHandString]++;
      }

      expect((hand.k2s / simulations) > 0.133 && (hand.k2s / simulations) < 0.153).toBe(true);
      expect((hand.k3s / simulations) > 0.133 && (hand.k3s / simulations) < 0.153).toBe(true);
      expect((hand.k4s / simulations) > 0.133 && (hand.k4s / simulations) < 0.153).toBe(true);
      expect((hand.k5s / simulations) > 0.133 && (hand.k5s / simulations) < 0.153).toBe(true);
      expect((hand.k6s / simulations) > 0.133 && (hand.k6s / simulations) < 0.153).toBe(true);
      expect((hand.k7s / simulations) > 0.133 && (hand.k7s / simulations) < 0.153).toBe(true);
      expect((hand.k8s / simulations) > 0.133 && (hand.k8s / simulations) < 0.153).toBe(true);
      expect(hand.k2s + hand.k3s + hand.k4s + hand.k5s + hand.k6s + hand.k7s + hand.k8s).toBe(simulations);
    });
  });

  describe('_dealHandToPlayer', function () {
    it('99', function () {
      var hand = [
        new Card('9', 'h'),
        new Card('9', 's'),
      ];

      dealer._dealHandToPlayer(hand, player, deck);

      expect(player).toEqual(hand);
      expect(deck.cards.length).toBe(50);
      expect(_.findIndex(constants.startingHands.tier3, function (currHand) {
        return utilities.areHandsEqual(hand, currHand);
      })).toBe(-1);
      expect(_.findIndex(constants.startingHands.types.pocketPairs, function (currHand) {
        return utilities.areHandsEqual(hand, currHand);
      })).toBe(-1);
    });

    it('AA', function () {
      var hand = [
        new Card('a', 'h'),
        new Card('a', 's'),
      ];

      dealer._dealHandToPlayer(hand, player, deck);

      expect(player).toEqual(hand);
      expect(deck.cards.length).toBe(50);
      expect(_.findIndex(constants.startingHands.tier1, function (currHand) {
        return utilities.areHandsEqual(hand, currHand);
      })).toBe(-1);
      expect(_.findIndex(constants.startingHands.types.pocketPairs, function (currHand) {
        return utilities.areHandsEqual(hand, currHand);
      })).toBe(-1);
    });

    it('A5s', function () {
      var hand = [
        new Card('a', 'h'),
        new Card('5', 's'),
      ];

      dealer._dealHandToPlayer(hand, player, deck);

      expect(player).toEqual(hand);
      expect(deck.cards.length).toBe(50);
      expect(_.findIndex(constants.startingHands.tier5, function (currHand) {
        return utilities.areHandsEqual(hand, currHand);
      })).toBe(-1);
      expect(_.findIndex(constants.startingHands.types.aceXSuited, function (currHand) {
        return utilities.areHandsEqual(hand, currHand);
      })).toBe(-1);
    });

    it('67s', function () {
      var hand = [
        new Card('6', 's'),
        new Card('7', 's'),
      ];

      dealer._dealHandToPlayer(hand, player, deck);

      expect(player).toEqual(hand);
      expect(deck.cards.length).toBe(50);
      expect(_.findIndex(constants.startingHands.tier5, function (currHand) {
        return utilities.areHandsEqual(hand, currHand);
      })).toBe(-1);
      expect(_.findIndex(constants.startingHands.types.suitedConnectors, function (currHand) {
        return utilities.areHandsEqual(hand, currHand);
      })).toBe(-1);
    });

    it('46s', function () {
      var hand = [
        new Card('4', 's'),
        new Card('6', 's'),
      ];

      dealer._dealHandToPlayer(hand, player, deck);

      expect(player).toEqual(hand);
      expect(deck.cards.length).toBe(50);
      expect(_.findIndex(constants.startingHands.tier7, function (currHand) {
        return utilities.areHandsEqual(hand, currHand);
      })).toBe(-1);
      expect(_.findIndex(constants.startingHands.types.suitedOneGappers, function (currHand) {
        return utilities.areHandsEqual(hand, currHand);
      })).toBe(-1);
    });

    it('K4s', function () {
      var hand = [
        new Card('9', 'h'),
        new Card('9', 's'),
      ];

      dealer._dealHandToPlayer(hand, player, deck);

      expect(player).toEqual(hand);
      expect(deck.cards.length).toBe(50);
      expect(_.findIndex(constants.startingHands.tier7, function (currHand) {
        return utilities.areHandsEqual(hand, currHand);
      })).toBe(-1);
      expect(_.findIndex(constants.startingHands.types.kingXSuited, function (currHand) {
        return utilities.areHandsEqual(hand, currHand);
      })).toBe(-1);
    });
  });

  describe('_dealCardToPlayer', function () {
    it('card in the deck', function () {
      var card = new Card('a', 'h');

      dealer._dealCardToPlayer(card, player, deck);

      expect(player[0]).toEqual(card);
      expect(_.findIndex(deck.cards, function (currCard) {
        return utilities.areCardsEqual(card, currCard);
      })).toBe(-1);
      expect(deck.cards.length).toBe(51);
    });
  });

  describe('_removeCardFromDeck', function () {
    it('card that is in deck', function () {
      var card = new Card('a', 'h');
      var indexOfAh;

      dealer._removeCardFromDeck(card, deck);
      indexOfAh = _.findIndex(deck.cards, function (currCard) {
        return utilities.areCardsEqual(card, currCard);
      });
      expect(indexOfAh).toBe(-1);
      expect(deck.cards.length).toBe(51);
    });

    it('card that isn\'t in deck', function () {
      var card = new Card('a', 'h');
      var indexOfAh;

      indexOfAh = _.findIndex(deck.cards, function (currCard) {
        return utilities.areCardsEqual(card, currCard);
      });
      deck.cards.splice(indexOfAh, 1);

      expect(function () {
        dealer._removeCardFromDeck(card, deck);
      }).toThrowError('Trying to remove a card that doesn\'t exist.');

      indexOfAh = _.findIndex(deck.cards, function (currCard) {
        return utilities.areCardsEqual(card, currCard);
      });
      expect(indexOfAh).toBe(-1);
      expect(deck.cards.length).toBe(51);
    });
  });

  describe('_removeStartingHandFromTier', function () {
    it('tier 1 hand', function () {
      var hand = [
        new Card('A', 'h'),
        new Card('A', 's'),
      ];

      dealer._removeStartingHandFromTier(hand);

      expect(_.findIndex(constants.startingHands.tier1, function (currHand) {
        return utilities.areHandsEqual(hand, currHand);
      })).toBe(-1);
    });

    it('tier 2 hand', function () {
      var hand = [
        new Card('10', 'h'),
        new Card('10', 's'),
      ];

      dealer._removeStartingHandFromTier(hand);

      expect(_.findIndex(constants.startingHands.tier2, function (currHand) {
        return utilities.areHandsEqual(hand, currHand);
      })).toBe(-1);
    });

    it('tier 3 hand', function () {
      var hand = [
        new Card('9', 'h'),
        new Card('9', 's'),
      ];

      dealer._removeStartingHandFromTier(hand);

      expect(_.findIndex(constants.startingHands.tier3, function (currHand) {
        return utilities.areHandsEqual(hand, currHand);
      })).toBe(-1);
    });

    it('tier 4 hand', function () {
      var hand = [
        new Card('8', 'h'),
        new Card('8', 's'),
      ];

      dealer._removeStartingHandFromTier(hand);

      expect(_.findIndex(constants.startingHands.tier4, function (currHand) {
        return utilities.areHandsEqual(hand, currHand);
      })).toBe(-1);
    });

    it('tier 5 hand', function () {
      var hand = [
        new Card('7', 'h'),
        new Card('7', 's'),
      ];

      dealer._removeStartingHandFromTier(hand);

      expect(_.findIndex(constants.startingHands.tier5, function (currHand) {
        return utilities.areHandsEqual(hand, currHand);
      })).toBe(-1);
    });

    it('tier 6 hand', function () {
      var hand = [
        new Card('6', 'h'),
        new Card('6', 's'),
      ];

      dealer._removeStartingHandFromTier(hand);

      expect(_.findIndex(constants.startingHands.tier6, function (currHand) {
        return utilities.areHandsEqual(hand, currHand);
      })).toBe(-1);
    });

    it('tier 7 hand', function () {
      var hand = [
        new Card('7', 'h'),
        new Card('7', 's'),
      ];

      dealer._removeStartingHandFromTier(hand);

      expect(_.findIndex(constants.startingHands.tier7, function (currHand) {
        return utilities.areHandsEqual(hand, currHand);
      })).toBe(-1);
    });

    it('tier 8 hand', function () {
      var hand = [
        new Card('J', 'h'),
        new Card('7', 'h'),
      ];

      dealer._removeStartingHandFromTier(hand);

      expect(_.findIndex(constants.startingHands.tier8, function (currHand) {
        return utilities.areHandsEqual(hand, currHand);
      })).toBe(-1);
    });
  });

  describe('_removeStartingHandFromType', function () {
    it('pocket pair', function () {
      var hand = [
        new Card('2', 'h'),
        new Card('2', 's'),
      ];

      dealer._removeStartingHandFromType(hand);

      expect(_.findIndex(constants.startingHands.types.pocketPairs, function (currHand) {
        return utilities.areHandsEqual(hand, currHand);
      })).toBe(-1);
    });

    it('suited connectors', function () {
      var hand = [
        new Card('2', 'h'),
        new Card('3', 'h'),
      ];

      dealer._removeStartingHandFromType(hand);

      expect(_.findIndex(constants.startingHands.types.suitedConnectors, function (currHand) {
        return utilities.areHandsEqual(hand, currHand);
      })).toBe(-1);
    });

    it('suited one gappers', function () {
      var hand = [
        new Card('2', 'h'),
        new Card('4', 'h'),
      ];

      dealer._removeStartingHandFromType(hand);

      expect(_.findIndex(constants.startingHands.types.suitedOneGappers, function (currHand) {
        return utilities.areHandsEqual(hand, currHand);
      })).toBe(-1);
    });

    it('ace x suited', function () {
      var hand = [
        new Card('a', 'h'),
        new Card('2', 'h'),
      ];

      dealer._removeStartingHandFromType(hand);

      expect(_.findIndex(constants.startingHands.types.aceXSuited, function (currHand) {
        return utilities.areHandsEqual(hand, currHand);
      })).toBe(-1);
    });

    it('king x suited', function () {
      var hand = [
        new Card('k', 'h'),
        new Card('2', 'h'),
      ];

      dealer._removeStartingHandFromType(hand);

      expect(_.findIndex(constants.startingHands.types.kingXSuited, function (currHand) {
        return utilities.areHandsEqual(hand, currHand);
      })).toBe(-1);
    });
  });
});
