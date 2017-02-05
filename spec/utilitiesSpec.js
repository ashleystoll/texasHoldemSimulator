describe('utilities', function () {
  describe('compareRanks', function () {
    describe('<', function () {
      it('true', function () {
        expect(utilities.compareRanks('j', '<', 'q')).toBe(true);
      });

      it('false', function () {
        expect(utilities.compareRanks('q', '<', 'j')).toBe(false);
      });
    });

    describe('>', function () {
      it('true', function () {
        expect(utilities.compareRanks('q', '>', 'j')).toBe(true);
      });

      it('false', function () {
        expect(utilities.compareRanks('j', '>', 'q')).toBe(false);
      });
    });

    describe('=', function () {
      it('true', function () {
        expect(utilities.compareRanks('q', '=', 'q')).toBe(true);
      });

      it('false', function () {
        expect(utilities.compareRanks('j', '=', 'q')).toBe(false);
      });
    });

    describe('>=', function () {
      it('true', function () {
        expect(utilities.compareRanks('q', '>=', 'j')).toBe(true);
        expect(utilities.compareRanks('j', '>=', 'j')).toBe(true);
      });

      it('false', function () {
        expect(utilities.compareRanks('j', '>=', 'q')).toBe(false);
      });
    });

    describe('<=', function () {
      it('true', function () {
        expect(utilities.compareRanks('j', '<=', 'q')).toBe(true);
        expect(utilities.compareRanks('j', '<=', 'j')).toBe(true);
      });

      it('false', function () {
        expect(utilities.compareRanks('q', '<=', 'j')).toBe(false);
      });
    });
  });

  describe('getRankCount', function () {
    it('no pair', function () {
      var playerCards = [
        new Card('a', 'h'),
        new Card('2', 'h'),
      ];

      var boardCards = [
        new Card('3', 'h'),
        new Card('4', 'h'),
        new Card('5', 'h'),
        new Card('6', 'h'),
        new Card('7', 'h'),
      ];

      expect(utilities.getRankCount(playerCards, boardCards)).toEqual({
        '2': 1,
        '3': 1,
        '4': 1,
        '5': 1,
        '6': 1,
        '7': 1,
        '8': 0,
        '9': 0,
        '10': 0,
        'j': 0,
        'q': 0,
        'k': 0,
        'a': 1,
      });
    });

    it('pair', function () {
      var playerCards = [
        new Card('a', 'h'),
        new Card('2', 'h'),
      ];

      var boardCards = [
        new Card('3', 'h'),
        new Card('4', 'h'),
        new Card('5', 'h'),
        new Card('6', 'h'),
        new Card('a', 's'),
      ];

      expect(utilities.getRankCount(playerCards, boardCards)).toEqual({
        '2': 1,
        '3': 1,
        '4': 1,
        '5': 1,
        '6': 1,
        '7': 0,
        '8': 0,
        '9': 0,
        '10': 0,
        'j': 0,
        'q': 0,
        'k': 0,
        'a': 2,
      });
    });

    it('two pair', function () {
      var playerCards = [
        new Card('a', 'h'),
        new Card('2', 'h'),
      ];

      var boardCards = [
        new Card('3', 'h'),
        new Card('4', 'h'),
        new Card('5', 'h'),
        new Card('2', 's'),
        new Card('a', 's'),
      ];

      expect(utilities.getRankCount(playerCards, boardCards)).toEqual({
        '2': 2,
        '3': 1,
        '4': 1,
        '5': 1,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
        '10': 0,
        'j': 0,
        'q': 0,
        'k': 0,
        'a': 2,
      });
    });

    it('three pairs', function () {
      var playerCards = [
        new Card('a', 'h'),
        new Card('2', 'h'),
      ];

      var boardCards = [
        new Card('3', 'h'),
        new Card('4', 'h'),
        new Card('4', 's'),
        new Card('2', 's'),
        new Card('a', 's'),
      ];

      expect(utilities.getRankCount(playerCards, boardCards)).toEqual({
        '2': 2,
        '3': 1,
        '4': 2,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
        '10': 0,
        'j': 0,
        'q': 0,
        'k': 0,
        'a': 2,
      });
    });

    it('trips', function () {
      var playerCards = [
        new Card('a', 'h'),
        new Card('2', 'h'),
      ];

      var boardCards = [
        new Card('3', 'h'),
        new Card('4', 'h'),
        new Card('5', 'h'),
        new Card('a', 'c'),
        new Card('a', 's'),
      ];

      expect(utilities.getRankCount(playerCards, boardCards)).toEqual({
        '2': 1,
        '3': 1,
        '4': 1,
        '5': 1,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
        '10': 0,
        'j': 0,
        'q': 0,
        'k': 0,
        'a': 3,
      });
    });

    describe('full house', function () {
      it('three two', function () {
        var playerCards = [
          new Card('a', 'h'),
          new Card('2', 'h'),
        ];

        var boardCards = [
          new Card('3', 'h'),
          new Card('4', 'h'),
          new Card('4', 'c'),
          new Card('a', 'c'),
          new Card('a', 's'),
        ];

        expect(utilities.getRankCount(playerCards, boardCards)).toEqual({
          '2': 1,
          '3': 1,
          '4': 2,
          '5': 0,
          '6': 0,
          '7': 0,
          '8': 0,
          '9': 0,
          '10': 0,
          'j': 0,
          'q': 0,
          'k': 0,
          'a': 3,
        });
      });

      it('three three', function () {
        var playerCards = [
          new Card('a', 'h'),
          new Card('2', 'h'),
        ];

        var boardCards = [
          new Card('4', 'd'),
          new Card('4', 'h'),
          new Card('4', 'c'),
          new Card('a', 'c'),
          new Card('a', 's'),
        ];

        expect(utilities.getRankCount(playerCards, boardCards)).toEqual({
          '2': 1,
          '3': 0,
          '4': 3,
          '5': 0,
          '6': 0,
          '7': 0,
          '8': 0,
          '9': 0,
          '10': 0,
          'j': 0,
          'q': 0,
          'k': 0,
          'a': 3,
        });
      });

      it('three two two', function () {
        var playerCards = [
          new Card('a', 'h'),
          new Card('2', 'h'),
        ];

        var boardCards = [
          new Card('2', 's'),
          new Card('3', 's'),
          new Card('3', 'c'),
          new Card('a', 'c'),
          new Card('a', 's'),
        ];

        expect(utilities.getRankCount(playerCards, boardCards)).toEqual({
          '2': 2,
          '3': 2,
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
          'a': 3,
        });
      });
    });

    it('quads', function () {
      var playerCards = [
        new Card('a', 'h'),
        new Card('2', 'h'),
      ];

      var boardCards = [
        new Card('3', 'h'),
        new Card('4', 'h'),
        new Card('a', 'd'),
        new Card('a', 'c'),
        new Card('a', 's'),
      ];

      expect(utilities.getRankCount(playerCards, boardCards)).toEqual({
        '2': 1,
        '3': 1,
        '4': 1,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
        '10': 0,
        'j': 0,
        'q': 0,
        'k': 0,
        'a': 4,
      });
    });
  });

  describe('getSuitCount', function () {
    it('2', function () {
      var playerCards = [
        new Card('a', 'h'),
        new Card('2', 'd'),
      ];

      var boardCards = [
        new Card('3', 'c'),
        new Card('4', 's'),
        new Card('5', 'h'),
        new Card('6', 'd'),
        new Card('7', 'c'),
      ];

      expect(utilities.getSuitCount(playerCards, boardCards)).toEqual({
        h: {
          count: 2,
          ranks: ['a', '5'],
        },
        d: {
          count: 2,
          ranks: ['6', '2'],
        },
        s: {
          count: 1,
          ranks: ['4'],
        },
        c: {
          count: 2,
          ranks: ['7', '3'],
        }
      });
    });

    it('3', function () {
      var playerCards = [
        new Card('a', 'h'),
        new Card('2', 'd'),
      ];

      var boardCards = [
        new Card('3', 'c'),
        new Card('4', 's'),
        new Card('5', 'h'),
        new Card('6', 'd'),
        new Card('7', 'h'),
      ];

      expect(utilities.getSuitCount(playerCards, boardCards)).toEqual({
        h: {
          count: 3,
          ranks: ['a', '7', '5'],
        },
        d: {
          count: 2,
          ranks: ['6', '2'],
        },
        s: {
          count: 1,
          ranks: ['4'],
        },
        c: {
          count: 1,
          ranks: ['3'],
        }
      });
    });

    it('4', function () {
      var playerCards = [
        new Card('a', 'h'),
        new Card('2', 'd'),
      ];

      var boardCards = [
        new Card('3', 'c'),
        new Card('4', 's'),
        new Card('5', 'h'),
        new Card('6', 'h'),
        new Card('7', 'h'),
      ];

      expect(utilities.getSuitCount(playerCards, boardCards)).toEqual({
        h: {
          count: 4,
          ranks: ['a', '7', '6', '5'],
        },
        d: {
          count: 1,
          ranks: ['2'],
        },
        s: {
          count: 1,
          ranks: ['4'],
        },
        c: {
          count: 1,
          ranks: ['3'],
        }
      });
    });

    it('5', function () {
      var playerCards = [
        new Card('a', 'h'),
        new Card('2', 'd'),
      ];

      var boardCards = [
        new Card('3', 'c'),
        new Card('4', 'h'),
        new Card('5', 'h'),
        new Card('6', 'h'),
        new Card('7', 'h'),
      ];

      expect(utilities.getSuitCount(playerCards, boardCards)).toEqual({
        h: {
          count: 5,
          ranks: ['a', '7', '6', '5', '4'],
        },
        d: {
          count: 1,
          ranks: ['2'],
        },
        s: {
          count: 0,
          ranks: [],
        },
        c: {
          count: 1,
          ranks: ['3'],
        }
      });
    });

    it('6', function () {
      var playerCards = [
        new Card('a', 'h'),
        new Card('2', 'd'),
      ];

      var boardCards = [
        new Card('3', 'h'),
        new Card('4', 'h'),
        new Card('5', 'h'),
        new Card('6', 'h'),
        new Card('7', 'h'),
      ];

      expect(utilities.getSuitCount(playerCards, boardCards)).toEqual({
        h: {
          count: 6,
          ranks: ['a', '7', '6', '5', '4', '3'],
        },
        d: {
          count: 1,
          ranks: ['2'],
        },
        s: {
          count: 0,
          ranks: [],
        },
        c: {
          count: 0,
          ranks: [],
        }
      });
    });

    it('7', function () {
      var playerCards = [
        new Card('a', 'h'),
        new Card('2', 'h'),
      ];

      var boardCards = [
        new Card('3', 'h'),
        new Card('4', 'h'),
        new Card('5', 'h'),
        new Card('6', 'h'),
        new Card('7', 'h'),
      ];

      expect(utilities.getSuitCount(playerCards, boardCards)).toEqual({
        h: {
          count: 7,
          ranks: ['a', '7', '6', '5', '4', '3', '2'],
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
        }
      });
    });
  });

  describe('getRankIndexesUsed', function () {
    it('should sort', function () {
      var playerCards = [
        new Card('5', 'h'),
        new Card('2', 'h'),
      ];

      var boardCards = [
        new Card('a', 'h'),
        new Card('6', 'h'),
        new Card('3', 'h'),
        new Card('7', 'h'),
        new Card('4', 'h'),
      ];

      expect(utilities.getRankIndexesUsed(playerCards, boardCards)).toEqual([
        0, 1, 2, 3, 4, 5, 12,
      ]);
    });

    it('should remove duplicates', function () {
      var playerCards = [
        new Card('5', 'h'),
        new Card('2', 'h'),
      ];

      var boardCards = [
        new Card('a', 'h'),
        new Card('6', 'h'),
        new Card('3', 'h'),
        new Card('a', 'h'),
        new Card('4', 'h'),
      ];

      expect(utilities.getRankIndexesUsed(playerCards, boardCards)).toEqual([
        0, 1, 2, 3, 4, 12,
      ]);
    });
  });

  describe('areCardsEqual', function () {
    it('equal', function () {
      var card1 = new Card('a', 'h');
      var card2 = new Card('a', 'h');
      expect(utilities.areCardsEqual(card1, card2)).toBe(true);
    });

    it('different suit', function () {
      var card1 = new Card('a', 'h');
      var card2 = new Card('a', 's');
      expect(utilities.areCardsEqual(card1, card2)).toBe(false);
    });

    it('different rank', function () {
      var card1 = new Card('a', 'h');
      var card2 = new Card('2', 'h');
      expect(utilities.areCardsEqual(card1, card2)).toBe(false);
    });

    it('different suit and rank', function () {
      var card1 = new Card('a', 'h');
      var card2 = new Card('2', 's');
      expect(utilities.areCardsEqual(card1, card2)).toBe(false);
    });
  });

  describe('areHandsEqual', function () {
    it('equal in order', function () {
      var hand1 = [
        new Card('a', 'h'),
        new Card('2', 'h'),
      ];

      var hand2 = [
        new Card('a', 'h'),
        new Card('2', 'h'),
      ];

      expect(utilities.areHandsEqual(hand1, hand2)).toBe(true);
    });

    it('equal reverse order', function () {
      var hand1 = [
        new Card('a', 'h'),
        new Card('2', 'h'),
      ];

      var hand2 = [
        new Card('2', 'h'),
        new Card('a', 'h'),
      ];

      expect(utilities.areHandsEqual(hand1, hand2)).toBe(true);
    });

    it('not equal', function () {
      var hand1 = [
        new Card('a', 'h'),
        new Card('2', 's'),
      ];

      var hand2 = [
        new Card('a', 'h'),
        new Card('2', 'h'),
      ];

      expect(utilities.areHandsEqual(hand1, hand2)).toBe(false);
    });
  });

  describe('getHandString', function () {
    it('tt', function () {
      expect(utilities.getHandString([
        new Card('10', 's'),
        new Card('10', 'c'),
      ])).toBe('tt');
    });

    it('99', function () {
      expect(utilities.getHandString([
        new Card('9', 's'),
        new Card('9', 'c'),
      ])).toBe('99');
    });

    it('76s', function () {
      expect(utilities.getHandString([
        new Card('7', 's'),
        new Card('6', 's'),
      ])).toBe('76s');
    });

    it('67s', function () {
      expect(utilities.getHandString([
        new Card('6', 's'),
        new Card('7', 's'),
      ])).toBe('76s');
    });

    it('76o', function () {
      expect(utilities.getHandString([
        new Card('7', 's'),
        new Card('6', 'c'),
      ])).toBe('76o');
    });

    it('67o', function () {
      expect(utilities.getHandString([
        new Card('6', 's'),
        new Card('7', 'c'),
      ])).toBe('76o');
    });
  });

  describe('getKickers', function () {
    it('nothing', function () {
      var playerCards = [
        new Card('a', 'h'),
        new Card('2', 'd'),
      ];
      var boardCards = [
        new Card('7', 'c'),
        new Card('4', 's'),
        new Card('k', 'd'),
        new Card('q', 'h'),
        new Card('8', 'd'),
      ];
      var rankCount = utilities.getRankCount(playerCards, boardCards);

      expect(utilities.getKickers(rankCount, 'nothing')).toEqual(['a', 'k', 'q', '8', '7']);
    });

    it('pair', function () {
      var playerCards = [
        new Card('a', 'h'),
        new Card('a', 'd'),
      ];
      var boardCards = [
        new Card('2', 'c'),
        new Card('4', 's'),
        new Card('k', 'd'),
        new Card('q', 'h'),
        new Card('8', 'd'),
      ];
      var rankCount = utilities.getRankCount(playerCards, boardCards);

      expect(utilities.getKickers(rankCount, 'pair')).toEqual(['k', 'q', '8']);
    });

    describe('two pair', function () {
      it('two pairs, three kickers', function () {
        var playerCards = [
          new Card('a', 'h'),
          new Card('2', 'd'),
        ];
        var boardCards = [
          new Card('a', 'c'),
          new Card('4', 's'),
          new Card('k', 'd'),
          new Card('2', 'h'),
          new Card('8', 'd'),
        ];
        var rankCount = utilities.getRankCount(playerCards, boardCards);

        expect(utilities.getKickers(rankCount, 'two pair')).toEqual(['k']);
      });

      it('three pairs, one kicker', function () {
        var playerCards = [
          new Card('a', 'h'),
          new Card('a', 'd'),
        ];
        var boardCards = [
          new Card('7', 'c'),
          new Card('7', 's'),
          new Card('k', 'd'),
          new Card('k', 'h'),
          new Card('8', 'd'),
        ];
        var rankCount = utilities.getRankCount(playerCards, boardCards);

        expect(utilities.getKickers(rankCount, 'two pair')).toEqual(['8']);
      });
    });

    it('trips', function () {
      var playerCards = [
        new Card('a', 'h'),
        new Card('a', 'd'),
      ];
      var boardCards = [
        new Card('a', 'c'),
        new Card('4', 's'),
        new Card('k', 'd'),
        new Card('q', 'h'),
        new Card('8', 'd'),
      ];
      var rankCount = utilities.getRankCount(playerCards, boardCards);

      expect(utilities.getKickers(rankCount, 'trips')).toEqual(['k', 'q']);
    });

    describe('quads', function () {
      it('three kickers', function () {
        var playerCards = [
          new Card('a', 'h'),
          new Card('a', 'd'),
        ];
        var boardCards = [
          new Card('a', 'c'),
          new Card('a', 's'),
          new Card('2', 'd'),
          new Card('6', 'd'),
          new Card('k', 'c'),
        ];
        var rankCount = utilities.getRankCount(playerCards, boardCards);

        expect(utilities.getKickers(rankCount, 'quads')).toEqual(['k']);
      });

      it('four two', function () {
        var playerCards = [
          new Card('a', 'h'),
          new Card('a', 'd'),
        ];
        var boardCards = [
          new Card('a', 'c'),
          new Card('a', 's'),
          new Card('2', 's'),
          new Card('2', 'd'),
          new Card('k', 'c'),
        ];
        var rankCount = utilities.getRankCount(playerCards, boardCards);

        expect(utilities.getKickers(rankCount, 'quads')).toEqual(['k']);
      });

      it('four three', function () {
        var playerCards = [
          new Card('a', 'h'),
          new Card('a', 'd'),
        ];
        var boardCards = [
          new Card('a', 'c'),
          new Card('a', 's'),
          new Card('2', 'd'),
          new Card('2', 's'),
          new Card('2', 'c'),
        ];
        var rankCount = utilities.getRankCount(playerCards, boardCards);

        expect(utilities.getKickers(rankCount, 'quads')).toEqual(['2']);
      });
    });
  });

  describe('getPairType', function () {
    describe('river', function () {
      var boardCards;

      beforeEach(function () {
        boardCards = [
          new Card('3', 'h'),
          new Card('5', 's'),
          new Card('7', 'c'),
          new Card('9', 'd'),
          new Card('j', 's'),
        ];
      });

      it('overpair', function () {
        expect(utilities.getPairType('q', boardCards)).toBe('overpair');
      });

      it('top pair', function () {
        expect(utilities.getPairType('j', boardCards)).toBe('top pair');
      });

      it('second pair+', function () {
        expect(utilities.getPairType('10', boardCards)).toBe('second pair+');
      });

      it('second pair', function () {
        expect(utilities.getPairType('9', boardCards)).toBe('second pair');
      });

      it('third pair+', function () {
        expect(utilities.getPairType('8', boardCards)).toBe('third pair+');
      });

      it('third pair', function () {
        expect(utilities.getPairType('7', boardCards)).toBe('third pair');
      });

      it('fourth pair+', function () {
        expect(utilities.getPairType('6', boardCards)).toBe('fourth pair+');
      });

      it('fourth pair', function () {
        expect(utilities.getPairType('5', boardCards)).toBe('fourth pair');
      });

      it('fifth pair+', function () {
        expect(utilities.getPairType('4', boardCards)).toBe('fifth pair+');
      });

      it('fifth pair', function () {
        expect(utilities.getPairType('3', boardCards)).toBe('fifth pair');
      });

      it('under pair', function () {
        expect(utilities.getPairType('2', boardCards)).toBe('underpair');
      });

      it('board pair', function () {
        var boardCards = [
          new Card('7', 'c'),
          new Card('7', 's'),
          new Card('k', 'd'),
          new Card('8', 'd'),
          new Card('3', 'd'),
        ];

        expect(utilities.getPairType('6', boardCards)).toBe('third pair+');
      });
    });

    describe('flop', function () {
      var boardCards;

      beforeEach(function () {
        boardCards = [
          new Card('7', 'c'),
          new Card('9', 'd'),
          new Card('j', 's'),
        ];
      });

      it('overpair', function () {
        expect(utilities.getPairType('q', boardCards)).toBe('overpair');
      });

      it('top pair', function () {
        expect(utilities.getPairType('j', boardCards)).toBe('top pair');
      });

      it('second pair+', function () {
        expect(utilities.getPairType('10', boardCards)).toBe('second pair+');
      });

      it('second pair', function () {
        expect(utilities.getPairType('9', boardCards)).toBe('second pair');
      });

      it('third pair+', function () {
        expect(utilities.getPairType('8', boardCards)).toBe('third pair+');
      });

      it('third pair', function () {
        expect(utilities.getPairType('7', boardCards)).toBe('third pair');
      });

      it('underpair', function () {
        expect(utilities.getPairType('6', boardCards)).toBe('underpair');
      });
    });
  });
});
