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
          highCard: 'a',
        },
        d: {
          count: 2,
          highCard: '6',
        },
        s: {
          count: 1,
          highCard: '4',
        },
        c: {
          count: 2,
          highCard: '7',
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
          highCard: 'a',
        },
        d: {
          count: 2,
          highCard: '6',
        },
        s: {
          count: 1,
          highCard: '4',
        },
        c: {
          count: 1,
          highCard: '3',
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
          highCard: 'a',
        },
        d: {
          count: 1,
          highCard: '2',
        },
        s: {
          count: 1,
          highCard: '4',
        },
        c: {
          count: 1,
          highCard: '3',
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
          highCard: 'a',
        },
        d: {
          count: 1,
          highCard: '2',
        },
        s: {
          count: 0,
          highCard: null,
        },
        c: {
          count: 1,
          highCard: '3',
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
          highCard: 'a',
        },
        d: {
          count: 1,
          highCard: '2',
        },
        s: {
          count: 0,
          highCard: null,
        },
        c: {
          count: 0,
          highCard: null,
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
          highCard: 'a',
        },
        d: {
          count: 0,
          highCard: null,
        },
        s: {
          count: 0,
          highCard: null,
        },
        c: {
          count: 0,
          highCard: null,
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
});
