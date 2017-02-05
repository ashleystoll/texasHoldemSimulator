// lots of edge cases found here https://en.wikipedia.org/wiki/Poker_probability#Derivation_of_frequencies_of_7-card_poker_hands
describe('handAnalyzer', function () {
  describe('player', function () {
    describe('river', function () {
      var nothing = {
        playerCards: [
          new Card('a', 'h'),
          new Card('2', 'd'),
        ],
        boardCards: [
          new Card('7', 'c'),
          new Card('4', 's'),
          new Card('k', 'd'),
          new Card('q', 'h'),
          new Card('8', 'd'),
        ],
      };

      var pair = {
        fromPocketPair: {
          playerCards: [
            new Card('a', 'h'),
            new Card('a', 'd'),
          ],
          boardCards: [
            new Card('2', 'c'),
            new Card('4', 's'),
            new Card('k', 'd'),
            new Card('q', 'h'),
            new Card('8', 'd'),
          ],
        },
        fromOneHoleCard: {
          playerCards: [
            new Card('a', 'h'),
            new Card('2', 'd'),
          ],
          boardCards: [
            new Card('a', 'c'),
            new Card('4', 's'),
            new Card('k', 'd'),
            new Card('q', 'h'),
            new Card('8', 'd'),
          ],
        },
        fromBoard: {
          playerCards: [
            new Card('a', 'h'),
            new Card('2', 'd'),
          ],
          boardCards: [
            new Card('7', 'c'),
            new Card('7', 's'),
            new Card('k', 'd'),
            new Card('q', 'h'),
            new Card('8', 'd'),
          ],
        },
        andStraight: {
          playerCards: [
            new Card('a', 'h'),
            new Card('a', 'd'),
          ],
          boardCards: [
            new Card('2', 'c'),
            new Card('3', 's'),
            new Card('4', 'd'),
            new Card('5', 'd'),
            new Card('k', 'c'),
          ],
        },
        andFlush: {
          playerCards: [
            new Card('a', 'h'),
            new Card('a', 'd'),
          ],
          boardCards: [
            new Card('2', 'c'),
            new Card('3', 'c'),
            new Card('10', 'c'),
            new Card('6', 'c'),
            new Card('k', 'c'),
          ],
        },
      };

      var twoPair = {
        fromHoleCards: {
          playerCards: [
            new Card('a', 'h'),
            new Card('2', 'd'),
          ],
          boardCards: [
            new Card('a', 'c'),
            new Card('4', 's'),
            new Card('k', 'd'),
            new Card('2', 'h'),
            new Card('8', 'd'),
          ],
        },
        fromOneHoleCard: {
          playerCards: [
            new Card('a', 'h'),
            new Card('6', 'd'),
          ],
          boardCards: [
            new Card('a', 'c'),
            new Card('2', 's'),
            new Card('2', 'd'),
            new Card('q', 'h'),
            new Card('8', 'd'),
          ],
        },
        fromBoard: {
          playerCards: [
            new Card('a', 'h'),
            new Card('2', 'd'),
          ],
          boardCards: [
            new Card('7', 'c'),
            new Card('7', 's'),
            new Card('k', 'd'),
            new Card('k', 'h'),
            new Card('8', 'd'),
          ],
        },
        threePairs: {
          playerCards: [
            new Card('a', 'h'),
            new Card('a', 'd'),
          ],
          boardCards: [
            new Card('7', 'c'),
            new Card('7', 's'),
            new Card('k', 'd'),
            new Card('k', 'h'),
            new Card('8', 'd'),
          ],
        },
        andTrips: {
          playerCards: [
            new Card('a', 'h'),
            new Card('6', 'd'),
          ],
          boardCards: [
            new Card('2', 'c'),
            new Card('2', 's'),
            new Card('2', 'd'),
            new Card('6', 's'),
            new Card('a', 'c'),
          ],
        },
        andStraight: {
          playerCards: [
            new Card('a', 'h'),
            new Card('2', 'd'),
          ],
          boardCards: [
            new Card('a', 'c'),
            new Card('2', 's'),
            new Card('3', 'd'),
            new Card('4', 'd'),
            new Card('5', 'c'),
          ],
        },
        andFlush: {
          playerCards: [
            new Card('a', 'h'),
            new Card('a', 'd'),
          ],
          boardCards: [
            new Card('2', 'h'),
            new Card('2', 's'),
            new Card('9', 'h'),
            new Card('6', 'h'),
            new Card('k', 'h'),
          ],
        },
      };

      var trips = {
        fromPocketPair: {
          playerCards: [
            new Card('a', 'h'),
            new Card('a', 'd'),
          ],
          boardCards: [
            new Card('a', 'c'),
            new Card('4', 's'),
            new Card('k', 'd'),
            new Card('q', 'h'),
            new Card('8', 'd'),
          ],
        },
        fromOneHoleCard: {
          playerCards: [
            new Card('a', 'h'),
            new Card('2', 'd'),
          ],
          boardCards: [
            new Card('a', 'c'),
            new Card('a', 's'),
            new Card('k', 'd'),
            new Card('q', 'h'),
            new Card('8', 'd'),
          ],
        },
        fromBoard: {
          playerCards: [
            new Card('a', 'h'),
            new Card('2', 'd'),
          ],
          boardCards: [
            new Card('7', 'c'),
            new Card('7', 's'),
            new Card('7', 'd'),
            new Card('q', 'h'),
            new Card('8', 'd'),
          ],
        },
        andStraight: {
          playerCards: [
            new Card('6', 'h'),
            new Card('10', 'd'),
          ],
          boardCards: [
            new Card('7', 'c'),
            new Card('7', 's'),
            new Card('7', 'd'),
            new Card('8', 'h'),
            new Card('9', 'd'),
          ],
        },
        andFlush: {
          playerCards: [
            new Card('a', 'h'),
            new Card('2', 'h'),
          ],
          boardCards: [
            new Card('7', 'h'),
            new Card('7', 's'),
            new Card('7', 'd'),
            new Card('q', 'h'),
            new Card('8', 'h'),
          ],
        },
      };

      var straight = {
        aceHigh: {
          playerCards: [
            new Card('a', 'h'),
            new Card('k', 's'),
          ],
          boardCards: [
            new Card('q', 'c'),
            new Card('j', 'd'),
            new Card('10', 's'),
            new Card('2', 'c'),
            new Card('5', 's'),
          ],
        },
        kingHigh: {
          playerCards: [
            new Card('9', 'h'),
            new Card('k', 's'),
          ],
          boardCards: [
            new Card('q', 'c'),
            new Card('j', 'd'),
            new Card('10', 's'),
            new Card('2', 'c'),
            new Card('5', 's'),
          ],
        },
        tenHigh: {
          playerCards: [
            new Card('6', 'h'),
            new Card('7', 's'),
          ],
          boardCards: [
            new Card('8', 'c'),
            new Card('9', 'd'),
            new Card('10', 's'),
            new Card('2', 'c'),
            new Card('3', 's'),
          ],
        },
        aceLow: {
          fiveInARow: {
            playerCards: [
              new Card('a', 'h'),
              new Card('2', 's'),
            ],
            boardCards: [
              new Card('3', 'c'),
              new Card('4', 'd'),
              new Card('5', 's'),
              new Card('10', 'c'),
              new Card('8', 's'),
            ],
          },
          sixInARow: {
            playerCards: [
              new Card('a', 'h'),
              new Card('2', 's'),
            ],
            boardCards: [
              new Card('3', 'c'),
              new Card('4', 'd'),
              new Card('5', 's'),
              new Card('6', 'c'),
              new Card('8', 's'),
            ],
          },
          sevenInARow: {
            playerCards: [
              new Card('a', 'h'),
              new Card('2', 's'),
            ],
            boardCards: [
              new Card('3', 'c'),
              new Card('4', 'd'),
              new Card('5', 's'),
              new Card('6', 'c'),
              new Card('7', 's'),
            ],
          },
          repeatOnce: {
            playerCards: [
              new Card('a', 'h'),
              new Card('2', 's'),
            ],
            boardCards: [
              new Card('3', 'c'),
              new Card('4', 'd'),
              new Card('5', 's'),
              new Card('a', 'c'),
              new Card('8', 's'),
            ],
          },
          repeatTwice: {
            playerCards: [
              new Card('a', 'h'),
              new Card('2', 's'),
            ],
            boardCards: [
              new Card('3', 'c'),
              new Card('4', 'd'),
              new Card('5', 's'),
              new Card('a', 'c'),
              new Card('a', 's'),
            ],
          },
          repeatOnceEach: {
            playerCards: [
              new Card('a', 'h'),
              new Card('2', 's'),
            ],
            boardCards: [
              new Card('3', 'c'),
              new Card('4', 'd'),
              new Card('5', 's'),
              new Card('a', 'c'),
              new Card('3', 's'),
            ],
          },
        },
        sixInARow: {
          playerCards: [
            new Card('9', 'h'),
            new Card('k', 's'),
          ],
          boardCards: [
            new Card('q', 'c'),
            new Card('j', 'd'),
            new Card('10', 's'),
            new Card('8', 'c'),
            new Card('5', 's'),
          ],
        },
        sevenInARow: {
          playerCards: [
            new Card('9', 'h'),
            new Card('k', 's'),
          ],
          boardCards: [
            new Card('q', 'c'),
            new Card('j', 'd'),
            new Card('10', 's'),
            new Card('8', 'c'),
            new Card('7', 's'),
          ],
        },
        repeatOnce: {
          playerCards: [
            new Card('a', 'h'),
            new Card('2', 's'),
          ],
          boardCards: [
            new Card('3', 'c'),
            new Card('4', 'd'),
            new Card('5', 's'),
            new Card('a', 'c'),
            new Card('8', 's'),
          ],
        },
        repeatTwice: {
          playerCards: [
            new Card('a', 'h'),
            new Card('2', 's'),
          ],
          boardCards: [
            new Card('3', 'c'),
            new Card('4', 'd'),
            new Card('5', 's'),
            new Card('a', 'c'),
            new Card('a', 's'),
          ],
        },
        repeatOnceEach: {
          playerCards: [
            new Card('a', 'h'),
            new Card('2', 's'),
          ],
          boardCards: [
            new Card('3', 'c'),
            new Card('4', 'd'),
            new Card('5', 's'),
            new Card('a', 'c'),
            new Card('3', 's'),
          ],
        },
      };

      var flush = {
        fromTwoHoleCards: {
          playerCards: [
            new Card('a', 'h'),
            new Card('2', 'h'),
          ],
          boardCards: [
            new Card('7', 'c'),
            new Card('4', 'h'),
            new Card('k', 'h'),
            new Card('q', 'h'),
            new Card('8', 'd'),
          ],
        },
        fromOneHoleCard: {
          playerCards: [
            new Card('a', 'h'),
            new Card('2', 'd'),
          ],
          boardCards: [
            new Card('7', 'h'),
            new Card('4', 'h'),
            new Card('k', 'h'),
            new Card('q', 'h'),
            new Card('8', 'd'),
          ],
        },
        fromBoard: {
          playerCards: [
            new Card('a', 'h'),
            new Card('2', 'd'),
          ],
          boardCards: [
            new Card('7', 'c'),
            new Card('4', 'c'),
            new Card('k', 'c'),
            new Card('q', 'c'),
            new Card('8', 'c'),
          ],
        },
        withSix: {
          playerCards: [
            new Card('a', 'h'),
            new Card('k', 'c'),
          ],
          boardCards: [
            new Card('7', 'c'),
            new Card('4', 'c'),
            new Card('2', 'c'),
            new Card('q', 'c'),
            new Card('8', 'c'),
          ],
        },
        withSeven: {
          playerCards: [
            new Card('2', 'c'),
            new Card('a', 'c'),
          ],
          boardCards: [
            new Card('7', 'c'),
            new Card('4', 'c'),
            new Card('k', 'c'),
            new Card('q', 'c'),
            new Card('8', 'c'),
          ],
        },
      };

      var fullHouse = {
        fromPocketPair: {
          holeMakesTheTwo: {
            playerCards: [
              new Card('a', 'h'),
              new Card('a', 'd'),
            ],
            boardCards: [
              new Card('2', 'c'),
              new Card('2', 's'),
              new Card('2', 'd'),
              new Card('6', 'd'),
              new Card('k', 'c'),
            ],
          },
          holeMakesTheThree: {
            playerCards: [
              new Card('a', 'h'),
              new Card('a', 'd'),
            ],
            boardCards: [
              new Card('a', 'c'),
              new Card('2', 's'),
              new Card('2', 'd'),
              new Card('6', 'd'),
              new Card('k', 'c'),
            ],
          },
        },
        fromTwoHoleCards: {
          playerCards: [
            new Card('a', 'h'),
            new Card('2', 'd'),
          ],
          boardCards: [
            new Card('2', 'c'),
            new Card('2', 's'),
            new Card('a', 'd'),
            new Card('6', 'd'),
            new Card('k', 'c'),
          ],
        },
        fromOneHoleCard: {
          holeMakesTheTwo: {
            playerCards: [
              new Card('a', 'h'),
              new Card('7', 'd'),
            ],
            boardCards: [
              new Card('a', 'c'),
              new Card('2', 's'),
              new Card('2', 'd'),
              new Card('2', 'h'),
              new Card('k', 'c'),
            ],
          },
          holeMakesTheThree: {
            playerCards: [
              new Card('a', 'h'),
              new Card('7', 'd'),
            ],
            boardCards: [
              new Card('a', 'c'),
              new Card('a', 's'),
              new Card('2', 'd'),
              new Card('6', 'd'),
              new Card('6', 'c'),
            ],
          },
        },
        fromBoard: {
          playerCards: [
            new Card('a', 'h'),
            new Card('7', 'd'),
          ],
          boardCards: [
            new Card('2', 'c'),
            new Card('2', 's'),
            new Card('2', 'd'),
            new Card('6', 'd'),
            new Card('6', 'c'),
          ],
        },
        threeTwoTwo: {
          playerCards: [
            new Card('3', 'h'),
            new Card('3', 'd'),
          ],
          boardCards: [
            new Card('2', 'c'),
            new Card('2', 's'),
            new Card('2', 'd'),
            new Card('k', 'h'),
            new Card('k', 'c'),
          ],
        },
        threeThree: {
          playerCards: [
            new Card('3', 'h'),
            new Card('2', 'd'),
          ],
          boardCards: [
            new Card('2', 'c'),
            new Card('2', 's'),
            new Card('k', 'd'),
            new Card('k', 'h'),
            new Card('k', 'c'),
          ],
        },
        andQuads: {
          playerCards: [
            new Card('a', 'h'),
            new Card('a', 'd'),
          ],
          boardCards: [
            new Card('2', 'c'),
            new Card('2', 's'),
            new Card('2', 'd'),
            new Card('2', 'h'),
            new Card('k', 'c'),
          ],
        }
      };

      var quads = {
        fromPocketPair: {
          playerCards: [
            new Card('a', 'h'),
            new Card('a', 'd'),
          ],
          boardCards: [
            new Card('a', 'c'),
            new Card('a', 's'),
            new Card('2', 'd'),
            new Card('6', 'd'),
            new Card('k', 'c'),
          ],
        },
        fromOneHoleCard: {
          playerCards: [
            new Card('a', 'h'),
            new Card('7', 'd'),
          ],
          boardCards: [
            new Card('a', 'c'),
            new Card('a', 's'),
            new Card('a', 'd'),
            new Card('6', 'd'),
            new Card('k', 'c'),
          ],
        },
        fromBoard: {
          playerCards: [
            new Card('a', 'h'),
            new Card('a', 'd'),
          ],
          boardCards: [
            new Card('2', 'c'),
            new Card('2', 's'),
            new Card('2', 'd'),
            new Card('2', 'h'),
            new Card('k', 'c'),
          ],
        },
      };

      var straightFlush = {
        fromTwoHoleCards: {
          playerCards: [
            new Card('a', 'h'),
            new Card('2', 'h'),
          ],
          boardCards: [
            new Card('3', 'h'),
            new Card('4', 'h'),
            new Card('5', 'h'),
            new Card('6', 'd'),
            new Card('k', 'c'),
          ],
        },
        fromOneHoleCard: {
          playerCards: [
            new Card('a', 'h'),
            new Card('2', 'd'),
          ],
          boardCards: [
            new Card('2', 'h'),
            new Card('3', 'h'),
            new Card('4', 'h'),
            new Card('5', 'h'),
            new Card('k', 'c'),
          ],
        },
        fromBoard: {
          playerCards: [
            new Card('a', 'h'),
            new Card('a', 'd'),
          ],
          boardCards: [
            new Card('a', 'c'),
            new Card('2', 'c'),
            new Card('3', 'c'),
            new Card('4', 'c'),
            new Card('5', 'c'),
          ],
        },
      };

      var royalFlush = {
        fromTwoHoleCards: {
          playerCards: [
            new Card('a', 'h'),
            new Card('k', 'h'),
          ],
          boardCards: [
            new Card('q', 'h'),
            new Card('j', 'h'),
            new Card('10', 'h'),
            new Card('6', 'd'),
            new Card('k', 'c'),
          ],
        },
        fromOneHoleCard: {
          playerCards: [
            new Card('a', 'h'),
            new Card('a', 'd'),
          ],
          boardCards: [
            new Card('k', 'h'),
            new Card('q', 'h'),
            new Card('j', 'h'),
            new Card('10', 'h'),
            new Card('k', 'c'),
          ],
        },
        fromBoard: {
          playerCards: [
            new Card('2', 'h'),
            new Card('2', 'd'),
          ],
          boardCards: [
            new Card('a', 'h'),
            new Card('k', 'h'),
            new Card('q', 'h'),
            new Card('j', 'h'),
            new Card('10', 'h'),
          ],
        },
      };

      describe('pair', function () {
        it('got it', function () {
          expect(handAnalyzer.bestHand(pair.fromPocketPair.playerCards, pair.fromPocketPair.boardCards)).toEqual({
            hand: 'pair',
            handRank: 1,
            rank: 'a',
            kickers: ['k', 'q', '8'],
            pairType: 'overpair',
          });

          expect(handAnalyzer.bestHand(pair.fromOneHoleCard.playerCards, pair.fromOneHoleCard.boardCards)).toEqual({
            hand: 'pair',
            handRank: 1,
            rank: 'a',
            kickers: ['k', 'q', '8'],
            pairType: 'top pair',
          });

          expect(handAnalyzer.bestHand(pair.fromBoard.playerCards, pair.fromBoard.boardCards)).toEqual({
            hand: 'pair',
            handRank: 1,
            rank: '7',
            kickers: ['a', 'k', 'q'],
            pairType: 'underpair',
          });
        });

        it('don\'t got it', function () {
          expect(handAnalyzer.bestHand(nothing.playerCards, nothing.boardCards).hand).not.toBe('trips');

          expect(handAnalyzer.bestHand(pair.andStraight.playerCards, pair.andStraight.boardCards).hand).not.toBe('pair');
          expect(handAnalyzer.bestHand(pair.andFlush.playerCards, pair.andFlush.boardCards).hand).not.toBe('pair');

          expect(handAnalyzer.bestHand(twoPair.fromHoleCards.playerCards, twoPair.fromHoleCards.boardCards).hand).not.toBe('pair');
          expect(handAnalyzer.bestHand(twoPair.fromOneHoleCard.playerCards, twoPair.fromOneHoleCard.boardCards).hand).not.toBe('pair');
          expect(handAnalyzer.bestHand(twoPair.fromBoard.playerCards, twoPair.fromBoard.boardCards).hand).not.toBe('pair');
          expect(handAnalyzer.bestHand(twoPair.threePairs.playerCards, twoPair.threePairs.boardCards).hand).not.toBe('pair');
          expect(handAnalyzer.bestHand(twoPair.andTrips.playerCards, twoPair.andTrips.boardCards).hand).not.toBe('pair');
          expect(handAnalyzer.bestHand(twoPair.andStraight.playerCards, twoPair.andStraight.boardCards).hand).not.toBe('pair');
          expect(handAnalyzer.bestHand(twoPair.andFlush.playerCards, twoPair.andFlush.boardCards).hand).not.toBe('pair');

          expect(handAnalyzer.bestHand(trips.fromPocketPair.playerCards, trips.fromPocketPair.boardCards).hand).not.toBe('pair');
          expect(handAnalyzer.bestHand(trips.fromOneHoleCard.playerCards, trips.fromOneHoleCard.boardCards).hand).not.toBe('pair');
          expect(handAnalyzer.bestHand(trips.fromBoard.playerCards, trips.fromBoard.boardCards).hand).not.toBe('pair');
          expect(handAnalyzer.bestHand(trips.andStraight.playerCards, trips.andStraight.boardCards).hand).not.toBe('pair');
          expect(handAnalyzer.bestHand(trips.andFlush.playerCards, trips.andFlush.boardCards).hand).not.toBe('pair');

          expect(handAnalyzer.bestHand(straight.aceHigh.playerCards, straight.aceHigh.boardCards)).not.toBe('pair');
          expect(handAnalyzer.bestHand(straight.kingHigh.playerCards, straight.kingHigh.boardCards)).not.toBe('pair');
          expect(handAnalyzer.bestHand(straight.tenHigh.playerCards, straight.tenHigh.boardCards)).not.toBe('pair');
          expect(handAnalyzer.bestHand(straight.aceLow.fiveInARow.playerCards, straight.aceLow.fiveInARow.boardCards)).not.toBe('pair');
          expect(handAnalyzer.bestHand(straight.aceLow.sixInARow.playerCards, straight.aceLow.sixInARow.boardCards)).not.toBe('pair');
          expect(handAnalyzer.bestHand(straight.aceLow.sevenInARow.playerCards, straight.aceLow.sevenInARow.boardCards)).not.toBe('pair');
          expect(handAnalyzer.bestHand(straight.sixInARow.playerCards, straight.sixInARow.boardCards)).not.toBe('pair');
          expect(handAnalyzer.bestHand(straight.sevenInARow.playerCards, straight.sevenInARow.boardCards)).not.toBe('pair');

          expect(handAnalyzer.bestHand(flush.fromTwoHoleCards.playerCards, flush.fromTwoHoleCards.boardCards).hand).not.toBe('pair');
          expect(handAnalyzer.bestHand(flush.fromOneHoleCard.playerCards, flush.fromOneHoleCard.boardCards).hand).not.toBe('pair');
          expect(handAnalyzer.bestHand(flush.fromBoard.playerCards, flush.fromBoard.boardCards).hand).not.toBe('pair');
          expect(handAnalyzer.bestHand(flush.withSix.playerCards, flush.withSix.boardCards).hand).not.toBe('pair');
          expect(handAnalyzer.bestHand(flush.withSeven.playerCards, flush.withSeven.boardCards).hand).not.toBe('pair');

          expect(handAnalyzer.bestHand(fullHouse.fromPocketPair.holeMakesTheTwo.playerCards, fullHouse.fromPocketPair.holeMakesTheTwo.boardCards).hand).not.toBe('pair');
          expect(handAnalyzer.bestHand(fullHouse.fromPocketPair.holeMakesTheThree.playerCards, fullHouse.fromPocketPair.holeMakesTheThree.boardCards).hand).not.toBe('pair');
          expect(handAnalyzer.bestHand(fullHouse.fromTwoHoleCards.playerCards, fullHouse.fromTwoHoleCards.boardCards).hand).not.toBe('pair');
          expect(handAnalyzer.bestHand(fullHouse.fromOneHoleCard.holeMakesTheTwo.playerCards, fullHouse.fromOneHoleCard.holeMakesTheTwo.boardCards).hand).not.toBe('pair');
          expect(handAnalyzer.bestHand(fullHouse.fromOneHoleCard.holeMakesTheThree.playerCards, fullHouse.fromOneHoleCard.holeMakesTheThree.boardCards).hand).not.toBe('pair');
          expect(handAnalyzer.bestHand(fullHouse.fromBoard.playerCards, fullHouse.fromBoard.boardCards).hand).not.toBe('pair');
          expect(handAnalyzer.bestHand(fullHouse.fromBoard.playerCards, fullHouse.threeTwoTwo.boardCards).hand).not.toBe('pair');
          expect(handAnalyzer.bestHand(fullHouse.fromBoard.playerCards, fullHouse.threeThree.boardCards).hand).not.toBe('pair');
          expect(handAnalyzer.bestHand(fullHouse.andQuads.playerCards, fullHouse.andQuads.boardCards).hand).not.toBe('pair');

          expect(handAnalyzer.bestHand(quads.fromPocketPair.playerCards, quads.fromPocketPair.boardCards).hand).not.toBe('pair');
          expect(handAnalyzer.bestHand(quads.fromOneHoleCard.playerCards, quads.fromOneHoleCard.boardCards).hand).not.toBe('pair');
          expect(handAnalyzer.bestHand(quads.fromBoard.playerCards, quads.fromBoard.boardCards).hand).not.toBe('pair');

          expect(handAnalyzer.bestHand(straightFlush.fromTwoHoleCards.playerCards, straightFlush.fromTwoHoleCards.boardCards).hand).not.toBe('pair');
          expect(handAnalyzer.bestHand(straightFlush.fromOneHoleCard.playerCards, straightFlush.fromOneHoleCard.boardCards).hand).not.toBe('pair');
          expect(handAnalyzer.bestHand(straightFlush.fromBoard.playerCards, straightFlush.fromBoard.boardCards).hand).not.toBe('pair');

          expect(handAnalyzer.bestHand(royalFlush.fromTwoHoleCards.playerCards, royalFlush.fromTwoHoleCards.boardCards).hand).not.toBe('pair');
          expect(handAnalyzer.bestHand(royalFlush.fromOneHoleCard.playerCards, royalFlush.fromOneHoleCard.boardCards).hand).not.toBe('pair');
          expect(handAnalyzer.bestHand(royalFlush.fromBoard.playerCards, royalFlush.fromBoard.boardCards).hand).not.toBe('pair');
        });
      });

      describe('two pair', function () {
        it('got it', function () {
          expect(handAnalyzer.bestHand(twoPair.fromHoleCards.playerCards, twoPair.fromHoleCards.boardCards)).toEqual({
            hand: 'two pair',
            handRank: 2,
            high: 'a',
            low: '2',
            kickers: ['k'],
          });
          expect(handAnalyzer.bestHand(twoPair.fromOneHoleCard.playerCards, twoPair.fromOneHoleCard.boardCards)).toEqual({
            hand: 'two pair',
            handRank: 2,
            high: 'a',
            low: '2',
            kickers: ['q'],
          });
          expect(handAnalyzer.bestHand(twoPair.fromBoard.playerCards, twoPair.fromBoard.boardCards)).toEqual({
            hand: 'two pair',
            handRank: 2,
            high: 'k',
            low: '7',
            kickers: ['a'],
          });
          expect(handAnalyzer.bestHand(twoPair.threePairs.playerCards, twoPair.threePairs.boardCards)).toEqual({
            hand: 'two pair',
            handRank: 2,
            high: 'a',
            low: 'k',
            kickers: ['8'],
          });
        });

        it('don\'t got it', function () {
          expect(handAnalyzer.bestHand(nothing.playerCards, nothing.boardCards).hand).not.toBe('trips');

          expect(handAnalyzer.bestHand(pair.fromPocketPair.playerCards, pair.fromPocketPair.boardCards).hand).not.toBe('two pair');
          expect(handAnalyzer.bestHand(pair.fromOneHoleCard.playerCards, pair.fromOneHoleCard.boardCards).hand).not.toBe('two pair');
          expect(handAnalyzer.bestHand(pair.fromBoard.playerCards, pair.fromBoard.boardCards).hand).not.toBe('two pair');

          expect(handAnalyzer.bestHand(twoPair.andTrips.playerCards, twoPair.andTrips.boardCards).hand).not.toBe('two pair');
          expect(handAnalyzer.bestHand(twoPair.andStraight.playerCards, twoPair.andStraight.boardCards).hand).not.toBe('two pair');
          expect(handAnalyzer.bestHand(twoPair.andFlush.playerCards, twoPair.andFlush.boardCards).hand).not.toBe('two pair');

          expect(handAnalyzer.bestHand(trips.fromPocketPair.playerCards, trips.fromPocketPair.boardCards).hand).not.toBe('two pair');
          expect(handAnalyzer.bestHand(trips.fromOneHoleCard.playerCards, trips.fromOneHoleCard.boardCards).hand).not.toBe('two pair');
          expect(handAnalyzer.bestHand(trips.fromBoard.playerCards, trips.fromBoard.boardCards).hand).not.toBe('two pair');
          expect(handAnalyzer.bestHand(trips.andStraight.playerCards, trips.andStraight.boardCards).hand).not.toBe('two pair');
          expect(handAnalyzer.bestHand(trips.andFlush.playerCards, trips.andFlush.boardCards).hand).not.toBe('two pair');

          expect(handAnalyzer.bestHand(straight.aceHigh.playerCards, straight.aceHigh.boardCards)).not.toBe('two pair');
          expect(handAnalyzer.bestHand(straight.kingHigh.playerCards, straight.kingHigh.boardCards)).not.toBe('two pair');
          expect(handAnalyzer.bestHand(straight.tenHigh.playerCards, straight.tenHigh.boardCards)).not.toBe('two pair');
          expect(handAnalyzer.bestHand(straight.aceLow.fiveInARow.playerCards, straight.aceLow.fiveInARow.boardCards)).not.toBe('two pair');
          expect(handAnalyzer.bestHand(straight.aceLow.sixInARow.playerCards, straight.aceLow.sixInARow.boardCards)).not.toBe('two pair');
          expect(handAnalyzer.bestHand(straight.aceLow.sevenInARow.playerCards, straight.aceLow.sevenInARow.boardCards)).not.toBe('two pair');
          expect(handAnalyzer.bestHand(straight.sixInARow.playerCards, straight.sixInARow.boardCards)).not.toBe('two pair');
          expect(handAnalyzer.bestHand(straight.sevenInARow.playerCards, straight.sevenInARow.boardCards)).not.toBe('two pair');

          expect(handAnalyzer.bestHand(flush.fromTwoHoleCards.playerCards, flush.fromTwoHoleCards.boardCards).hand).not.toBe('two pair');
          expect(handAnalyzer.bestHand(flush.fromOneHoleCard.playerCards, flush.fromOneHoleCard.boardCards).hand).not.toBe('two pair');
          expect(handAnalyzer.bestHand(flush.fromBoard.playerCards, flush.fromBoard.boardCards).hand).not.toBe('two pair');
          expect(handAnalyzer.bestHand(flush.withSix.playerCards, flush.withSix.boardCards).hand).not.toBe('two pair');
          expect(handAnalyzer.bestHand(flush.withSeven.playerCards, flush.withSeven.boardCards).hand).not.toBe('two pair');

          expect(handAnalyzer.bestHand(fullHouse.fromPocketPair.holeMakesTheTwo.playerCards, fullHouse.fromPocketPair.holeMakesTheTwo.boardCards).hand).not.toBe('two pair');
          expect(handAnalyzer.bestHand(fullHouse.fromPocketPair.holeMakesTheThree.playerCards, fullHouse.fromPocketPair.holeMakesTheThree.boardCards).hand).not.toBe('two pair');
          expect(handAnalyzer.bestHand(fullHouse.fromTwoHoleCards.playerCards, fullHouse.fromTwoHoleCards.boardCards).hand).not.toBe('two pair');
          expect(handAnalyzer.bestHand(fullHouse.fromOneHoleCard.holeMakesTheTwo.playerCards, fullHouse.fromOneHoleCard.holeMakesTheTwo.boardCards).hand).not.toBe('two pair');
          expect(handAnalyzer.bestHand(fullHouse.fromOneHoleCard.holeMakesTheThree.playerCards, fullHouse.fromOneHoleCard.holeMakesTheThree.boardCards).hand).not.toBe('two pair');
          expect(handAnalyzer.bestHand(fullHouse.fromBoard.playerCards, fullHouse.fromBoard.boardCards).hand).not.toBe('two pair');
          expect(handAnalyzer.bestHand(fullHouse.fromBoard.playerCards, fullHouse.threeTwoTwo.boardCards).hand).not.toBe('two pair');
          expect(handAnalyzer.bestHand(fullHouse.fromBoard.playerCards, fullHouse.threeThree.boardCards).hand).not.toBe('two pair');
          expect(handAnalyzer.bestHand(fullHouse.andQuads.playerCards, fullHouse.andQuads.boardCards).hand).not.toBe('two pair');

          expect(handAnalyzer.bestHand(quads.fromPocketPair.playerCards, quads.fromPocketPair.boardCards).hand).not.toBe('two pair');
          expect(handAnalyzer.bestHand(quads.fromOneHoleCard.playerCards, quads.fromOneHoleCard.boardCards).hand).not.toBe('two pair');
          expect(handAnalyzer.bestHand(quads.fromBoard.playerCards, quads.fromBoard.boardCards).hand).not.toBe('two pair');

          expect(handAnalyzer.bestHand(straightFlush.fromTwoHoleCards.playerCards, straightFlush.fromTwoHoleCards.boardCards).hand).not.toBe('two pair');
          expect(handAnalyzer.bestHand(straightFlush.fromOneHoleCard.playerCards, straightFlush.fromOneHoleCard.boardCards).hand).not.toBe('two pair');
          expect(handAnalyzer.bestHand(straightFlush.fromBoard.playerCards, straightFlush.fromBoard.boardCards).hand).not.toBe('two pair');

          expect(handAnalyzer.bestHand(royalFlush.fromTwoHoleCards.playerCards, royalFlush.fromTwoHoleCards.boardCards).hand).not.toBe('two pair');
          expect(handAnalyzer.bestHand(royalFlush.fromOneHoleCard.playerCards, royalFlush.fromOneHoleCard.boardCards).hand).not.toBe('two pair');
          expect(handAnalyzer.bestHand(royalFlush.fromBoard.playerCards, royalFlush.fromBoard.boardCards).hand).not.toBe('two pair');
        });
      });

      describe('trips', function () {
        it('got it', function () {
          expect(handAnalyzer.bestHand(trips.fromPocketPair.playerCards, trips.fromPocketPair.boardCards)).toEqual({
            hand: 'trips',
            handRank: 3,
            rank: 'a',
            kickers: ['k', 'q'],
          });
          expect(handAnalyzer.bestHand(trips.fromOneHoleCard.playerCards, trips.fromOneHoleCard.boardCards)).toEqual({
            hand: 'trips',
            handRank: 3,
            rank: 'a',
            kickers: ['k', 'q'],
          });
          expect(handAnalyzer.bestHand(trips.fromBoard.playerCards, trips.fromBoard.boardCards)).toEqual({
            hand: 'trips',
            handRank: 3,
            rank: '7',
            kickers: ['a', 'q'],
          });
        });

        it('don\'t got it', function () {
          expect(handAnalyzer.bestHand(nothing.playerCards, nothing.boardCards).hand).not.toBe('trips');

          expect(handAnalyzer.bestHand(pair.fromPocketPair.playerCards, pair.fromPocketPair.boardCards).hand).not.toBe('trips');
          expect(handAnalyzer.bestHand(pair.fromOneHoleCard.playerCards, pair.fromOneHoleCard.boardCards).hand).not.toBe('trips');
          expect(handAnalyzer.bestHand(pair.fromBoard.playerCards, pair.fromBoard.boardCards).hand).not.toBe('trips');

          expect(handAnalyzer.bestHand(twoPair.fromHoleCards.playerCards, twoPair.fromHoleCards.boardCards).hand).not.toBe('trips');
          expect(handAnalyzer.bestHand(twoPair.fromOneHoleCard.playerCards, twoPair.fromOneHoleCard.boardCards).hand).not.toBe('trips');
          expect(handAnalyzer.bestHand(twoPair.fromBoard.playerCards, twoPair.fromBoard.boardCards).hand).not.toBe('trips');
          expect(handAnalyzer.bestHand(twoPair.threePairs.playerCards, twoPair.threePairs.boardCards).hand).not.toBe('trips');
          expect(handAnalyzer.bestHand(twoPair.andTrips.playerCards, twoPair.andTrips.boardCards).hand).not.toBe('trips');
          expect(handAnalyzer.bestHand(twoPair.andStraight.playerCards, twoPair.andStraight.boardCards).hand).not.toBe('trips');
          expect(handAnalyzer.bestHand(twoPair.andFlush.playerCards, twoPair.andFlush.boardCards).hand).not.toBe('trips');

          expect(handAnalyzer.bestHand(trips.andStraight.playerCards, trips.andStraight.boardCards).hand).not.toBe('trips');
          expect(handAnalyzer.bestHand(trips.andFlush.playerCards, trips.andFlush.boardCards).hand).not.toBe('trips');

          expect(handAnalyzer.bestHand(straight.aceHigh.playerCards, straight.aceHigh.boardCards)).not.toBe('trips');
          expect(handAnalyzer.bestHand(straight.kingHigh.playerCards, straight.kingHigh.boardCards)).not.toBe('trips');
          expect(handAnalyzer.bestHand(straight.tenHigh.playerCards, straight.tenHigh.boardCards)).not.toBe('trips');
          expect(handAnalyzer.bestHand(straight.aceLow.fiveInARow.playerCards, straight.aceLow.fiveInARow.boardCards)).not.toBe('trips');
          expect(handAnalyzer.bestHand(straight.aceLow.sixInARow.playerCards, straight.aceLow.sixInARow.boardCards)).not.toBe('trips');
          expect(handAnalyzer.bestHand(straight.aceLow.sevenInARow.playerCards, straight.aceLow.sevenInARow.boardCards)).not.toBe('trips');
          expect(handAnalyzer.bestHand(straight.sixInARow.playerCards, straight.sixInARow.boardCards)).not.toBe('trips');
          expect(handAnalyzer.bestHand(straight.sevenInARow.playerCards, straight.sevenInARow.boardCards)).not.toBe('trips');

          expect(handAnalyzer.bestHand(flush.fromTwoHoleCards.playerCards, flush.fromTwoHoleCards.boardCards).hand).not.toBe('trips');
          expect(handAnalyzer.bestHand(flush.fromOneHoleCard.playerCards, flush.fromOneHoleCard.boardCards).hand).not.toBe('trips');
          expect(handAnalyzer.bestHand(flush.fromBoard.playerCards, flush.fromBoard.boardCards).hand).not.toBe('trips');
          expect(handAnalyzer.bestHand(flush.withSix.playerCards, flush.withSix.boardCards).hand).not.toBe('trips');
          expect(handAnalyzer.bestHand(flush.withSeven.playerCards, flush.withSeven.boardCards).hand).not.toBe('trips');

          expect(handAnalyzer.bestHand(fullHouse.fromPocketPair.holeMakesTheTwo.playerCards, fullHouse.fromPocketPair.holeMakesTheTwo.boardCards).hand).not.toBe('trips');
          expect(handAnalyzer.bestHand(fullHouse.fromPocketPair.holeMakesTheThree.playerCards, fullHouse.fromPocketPair.holeMakesTheThree.boardCards).hand).not.toBe('trips');
          expect(handAnalyzer.bestHand(fullHouse.fromTwoHoleCards.playerCards, fullHouse.fromTwoHoleCards.boardCards).hand).not.toBe('trips');
          expect(handAnalyzer.bestHand(fullHouse.fromOneHoleCard.holeMakesTheTwo.playerCards, fullHouse.fromOneHoleCard.holeMakesTheTwo.boardCards).hand).not.toBe('trips');
          expect(handAnalyzer.bestHand(fullHouse.fromOneHoleCard.holeMakesTheThree.playerCards, fullHouse.fromOneHoleCard.holeMakesTheThree.boardCards).hand).not.toBe('trips');
          expect(handAnalyzer.bestHand(fullHouse.fromBoard.playerCards, fullHouse.fromBoard.boardCards).hand).not.toBe('trips');
          expect(handAnalyzer.bestHand(fullHouse.fromBoard.playerCards, fullHouse.threeTwoTwo.boardCards).hand).not.toBe('trips');
          expect(handAnalyzer.bestHand(fullHouse.fromBoard.playerCards, fullHouse.threeThree.boardCards).hand).not.toBe('trips');
          expect(handAnalyzer.bestHand(fullHouse.andQuads.playerCards, fullHouse.andQuads.boardCards).hand).not.toBe('trips');

          expect(handAnalyzer.bestHand(quads.fromPocketPair.playerCards, quads.fromPocketPair.boardCards).hand).not.toBe('trips');
          expect(handAnalyzer.bestHand(quads.fromOneHoleCard.playerCards, quads.fromOneHoleCard.boardCards).hand).not.toBe('trips');
          expect(handAnalyzer.bestHand(quads.fromBoard.playerCards, quads.fromBoard.boardCards).hand).not.toBe('trips');

          expect(handAnalyzer.bestHand(straightFlush.fromTwoHoleCards.playerCards, straightFlush.fromTwoHoleCards.boardCards).hand).not.toBe('trips');
          expect(handAnalyzer.bestHand(straightFlush.fromOneHoleCard.playerCards, straightFlush.fromOneHoleCard.boardCards).hand).not.toBe('trips');
          expect(handAnalyzer.bestHand(straightFlush.fromBoard.playerCards, straightFlush.fromBoard.boardCards).hand).not.toBe('trips');

          expect(handAnalyzer.bestHand(royalFlush.fromTwoHoleCards.playerCards, royalFlush.fromTwoHoleCards.boardCards).hand).not.toBe('trips');
          expect(handAnalyzer.bestHand(royalFlush.fromOneHoleCard.playerCards, royalFlush.fromOneHoleCard.boardCards).hand).not.toBe('trips');
          expect(handAnalyzer.bestHand(royalFlush.fromBoard.playerCards, royalFlush.fromBoard.boardCards).hand).not.toBe('trips');
        });
      });

      describe('straight', function () {
        it('got it', function () {
          expect(handAnalyzer.bestHand(straight.aceHigh.playerCards, straight.aceHigh.boardCards)).toEqual({
            hand: 'straight',
            handRank: 4,
            highCard: 'a',
          });

          expect(handAnalyzer.bestHand(straight.kingHigh.playerCards, straight.kingHigh.boardCards)).toEqual({
            hand: 'straight',
            handRank: 4,
            highCard: 'k',
          });

          expect(handAnalyzer.bestHand(straight.tenHigh.playerCards, straight.tenHigh.boardCards)).toEqual({
            hand: 'straight',
            handRank: 4,
            highCard: '10',
          });

          expect(handAnalyzer.bestHand(straight.aceLow.fiveInARow.playerCards, straight.aceLow.fiveInARow.boardCards)).toEqual({
            hand: 'straight',
            handRank: 4,
            highCard: '5',
          });

          expect(handAnalyzer.bestHand(straight.aceLow.sixInARow.playerCards, straight.aceLow.sixInARow.boardCards)).toEqual({
            hand: 'straight',
            handRank: 4,
            highCard: '6',
          });

          expect(handAnalyzer.bestHand(straight.aceLow.sevenInARow.playerCards, straight.aceLow.sevenInARow.boardCards)).toEqual({
            hand: 'straight',
            handRank: 4,
            highCard: '7',
          });

          expect(handAnalyzer.bestHand(straight.aceLow.repeatOnce.playerCards, straight.aceLow.repeatOnce.boardCards)).toEqual({
            hand: 'straight',
            handRank: 4,
            highCard: '5',
          });

          expect(handAnalyzer.bestHand(straight.aceLow.repeatTwice.playerCards, straight.aceLow.repeatTwice.boardCards)).toEqual({
            hand: 'straight',
            handRank: 4,
            highCard: '5',
          });

          expect(handAnalyzer.bestHand(straight.aceLow.repeatOnceEach.playerCards, straight.aceLow.repeatOnceEach.boardCards)).toEqual({
            hand: 'straight',
            handRank: 4,
            highCard: '5',
          });

          expect(handAnalyzer.bestHand(straight.sixInARow.playerCards, straight.sixInARow.boardCards)).toEqual({
            hand: 'straight',
            handRank: 4,
            highCard: 'k',
          });

          expect(handAnalyzer.bestHand(straight.sevenInARow.playerCards, straight.sevenInARow.boardCards)).toEqual({
            hand: 'straight',
            handRank: 4,
            highCard: 'k',
          });

          expect(handAnalyzer.bestHand(straight.repeatOnce.playerCards, straight.repeatOnce.boardCards)).toEqual({
            hand: 'straight',
            handRank: 4,
            highCard: '5',
          });

          expect(handAnalyzer.bestHand(straight.repeatTwice.playerCards, straight.repeatTwice.boardCards)).toEqual({
            hand: 'straight',
            handRank: 4,
            highCard: '5',
          });

          expect(handAnalyzer.bestHand(straight.repeatOnceEach.playerCards, straight.repeatOnceEach.boardCards)).toEqual({
            hand: 'straight',
            handRank: 4,
            highCard: '5',
          });

          expect(handAnalyzer.bestHand(pair.andStraight.playerCards, pair.andStraight.boardCards)).toEqual({
            hand: 'straight',
            handRank: 4,
            highCard: '5',
          });
          expect(handAnalyzer.bestHand(twoPair.andStraight.playerCards, twoPair.andStraight.boardCards)).toEqual({
            hand: 'straight',
            handRank: 4,
            highCard: '5',
          });
          expect(handAnalyzer.bestHand(trips.andStraight.playerCards, trips.andStraight.boardCards)).toEqual({
            hand: 'straight',
            handRank: 4,
            highCard: '10',
          });
        });

        it('don\'t got it', function () {
          expect(handAnalyzer.bestHand(nothing.playerCards, nothing.boardCards).hand).not.toBe('straight');

          expect(handAnalyzer.bestHand(pair.fromPocketPair.playerCards, pair.fromPocketPair.boardCards).hand).not.toBe('straight');
          expect(handAnalyzer.bestHand(pair.fromOneHoleCard.playerCards, pair.fromOneHoleCard.boardCards).hand).not.toBe('straight');
          expect(handAnalyzer.bestHand(pair.fromBoard.playerCards, pair.fromBoard.boardCards).hand).not.toBe('straight');
          expect(handAnalyzer.bestHand(pair.andFlush.playerCards, pair.andFlush.boardCards).hand).not.toBe('straight');

          expect(handAnalyzer.bestHand(twoPair.fromHoleCards.playerCards, twoPair.fromHoleCards.boardCards).hand).not.toBe('straight');
          expect(handAnalyzer.bestHand(twoPair.fromOneHoleCard.playerCards, twoPair.fromOneHoleCard.boardCards).hand).not.toBe('straight');
          expect(handAnalyzer.bestHand(twoPair.fromBoard.playerCards, twoPair.fromBoard.boardCards).hand).not.toBe('straight');
          expect(handAnalyzer.bestHand(twoPair.threePairs.playerCards, twoPair.threePairs.boardCards).hand).not.toBe('straight');
          expect(handAnalyzer.bestHand(twoPair.andTrips.playerCards, twoPair.andTrips.boardCards).hand).not.toBe('straight');
          expect(handAnalyzer.bestHand(twoPair.andFlush.playerCards, twoPair.andFlush.boardCards).hand).not.toBe('straight');

          expect(handAnalyzer.bestHand(trips.fromPocketPair.playerCards, trips.fromPocketPair.boardCards).hand).not.toBe('straight');
          expect(handAnalyzer.bestHand(trips.fromOneHoleCard.playerCards, trips.fromOneHoleCard.boardCards).hand).not.toBe('straight');
          expect(handAnalyzer.bestHand(trips.fromBoard.playerCards, trips.fromBoard.boardCards).hand).not.toBe('straight');
          expect(handAnalyzer.bestHand(trips.andFlush.playerCards, trips.andFlush.boardCards).hand).not.toBe('straight');

          expect(handAnalyzer.bestHand(flush.fromTwoHoleCards.playerCards, flush.fromTwoHoleCards.boardCards).hand).not.toBe('straight');
          expect(handAnalyzer.bestHand(flush.fromOneHoleCard.playerCards, flush.fromOneHoleCard.boardCards).hand).not.toBe('straight');
          expect(handAnalyzer.bestHand(flush.fromBoard.playerCards, flush.fromBoard.boardCards).hand).not.toBe('straight');
          expect(handAnalyzer.bestHand(flush.withSix.playerCards, flush.withSix.boardCards).hand).not.toBe('straight');
          expect(handAnalyzer.bestHand(flush.withSeven.playerCards, flush.withSeven.boardCards).hand).not.toBe('straight');

          expect(handAnalyzer.bestHand(fullHouse.fromPocketPair.holeMakesTheTwo.playerCards, fullHouse.fromPocketPair.holeMakesTheTwo.boardCards).hand).not.toBe('straight');
          expect(handAnalyzer.bestHand(fullHouse.fromPocketPair.holeMakesTheThree.playerCards, fullHouse.fromPocketPair.holeMakesTheThree.boardCards).hand).not.toBe('straight');
          expect(handAnalyzer.bestHand(fullHouse.fromTwoHoleCards.playerCards, fullHouse.fromTwoHoleCards.boardCards).hand).not.toBe('straight');
          expect(handAnalyzer.bestHand(fullHouse.fromOneHoleCard.holeMakesTheTwo.playerCards, fullHouse.fromOneHoleCard.holeMakesTheTwo.boardCards).hand).not.toBe('straight');
          expect(handAnalyzer.bestHand(fullHouse.fromOneHoleCard.holeMakesTheThree.playerCards, fullHouse.fromOneHoleCard.holeMakesTheThree.boardCards).hand).not.toBe('straight');
          expect(handAnalyzer.bestHand(fullHouse.fromBoard.playerCards, fullHouse.fromBoard.boardCards).hand).not.toBe('straight');
          expect(handAnalyzer.bestHand(fullHouse.fromBoard.playerCards, fullHouse.threeTwoTwo.boardCards).hand).not.toBe('straight');
          expect(handAnalyzer.bestHand(fullHouse.fromBoard.playerCards, fullHouse.threeThree.boardCards).hand).not.toBe('straight');
          expect(handAnalyzer.bestHand(fullHouse.andQuads.playerCards, fullHouse.andQuads.boardCards).hand).not.toBe('straight');

          expect(handAnalyzer.bestHand(quads.fromPocketPair.playerCards, quads.fromPocketPair.boardCards).hand).not.toBe('straight');
          expect(handAnalyzer.bestHand(quads.fromOneHoleCard.playerCards, quads.fromOneHoleCard.boardCards).hand).not.toBe('straight');
          expect(handAnalyzer.bestHand(quads.fromBoard.playerCards, quads.fromBoard.boardCards).hand).not.toBe('straight');

          // expect(handAnalyzer.bestHand(straightFlush.fromTwoHoleCards.playerCards, straightFlush.fromTwoHoleCards.boardCards).hand).not.toBe('straight');
          // expect(handAnalyzer.bestHand(straightFlush.fromOneHoleCard.playerCards, straightFlush.fromOneHoleCard.boardCards).hand).not.toBe('straight');
          // expect(handAnalyzer.bestHand(straightFlush.fromBoard.playerCards, straightFlush.fromBoard.boardCards).hand).not.toBe('straight');
          //
          // expect(handAnalyzer.bestHand(royalFlush.fromTwoHoleCards.playerCards, royalFlush.fromTwoHoleCards.boardCards).hand).not.toBe('straight');
          // expect(handAnalyzer.bestHand(royalFlush.fromOneHoleCard.playerCards, royalFlush.fromOneHoleCard.boardCards).hand).not.toBe('straight');
          // expect(handAnalyzer.bestHand(royalFlush.fromBoard.playerCards, royalFlush.fromBoard.boardCards).hand).not.toBe('straight');
        });
      });

      describe('flush', function () {
        it('got it', function () {
          expect(handAnalyzer.bestHand(flush.fromTwoHoleCards.playerCards, flush.fromTwoHoleCards.boardCards)).toEqual({
            hand: 'flush',
            handRank: 5,
            suit: 'h',
            ranks: ['a', 'k', 'q', '4', '2'],
          });
          expect(handAnalyzer.bestHand(flush.fromOneHoleCard.playerCards, flush.fromOneHoleCard.boardCards)).toEqual({
            hand: 'flush',
            handRank: 5,
            suit: 'h',
            ranks: ['a', 'k', 'q', '7', '4'],
          });
          expect(handAnalyzer.bestHand(flush.fromBoard.playerCards, flush.fromBoard.boardCards)).toEqual({
            hand: 'flush',
            handRank: 5,
            suit: 'c',
            ranks: ['k', 'q', '8', '7', '4'],
          });
          expect(handAnalyzer.bestHand(flush.withSix.playerCards, flush.withSix.boardCards)).toEqual({
            hand: 'flush',
            handRank: 5,
            suit: 'c',
            ranks: ['k', 'q', '8', '7', '4'],
          });
          expect(handAnalyzer.bestHand(flush.withSeven.playerCards, flush.withSeven.boardCards)).toEqual({
            hand: 'flush',
            handRank: 5,
            suit: 'c',
            ranks: ['a', 'k', 'q', '8', '7'],
          });
          expect(handAnalyzer.bestHand(pair.andFlush.playerCards, pair.andFlush.boardCards)).toEqual({
            hand: 'flush',
            handRank: 5,
            suit: 'c',
            ranks: ['k', '10', '6', '3', '2'],
          });
          expect(handAnalyzer.bestHand(twoPair.andFlush.playerCards, twoPair.andFlush.boardCards)).toEqual({
            hand: 'flush',
            handRank: 5,
            suit: 'h',
            ranks: ['a', 'k', '9', '6', '2'],
          });
          expect(handAnalyzer.bestHand(trips.andFlush.playerCards, trips.andFlush.boardCards)).toEqual({
            hand: 'flush',
            handRank: 5,
            suit: 'h',
            ranks: ['a', 'q', '8', '7', '2'],
          });
        });

        it('don\'t got it', function () {
          expect(handAnalyzer.bestHand(nothing.playerCards, nothing.boardCards).hand).not.toBe('flush');

          expect(handAnalyzer.bestHand(pair.fromPocketPair.playerCards, pair.fromPocketPair.boardCards).hand).not.toBe('flush');
          expect(handAnalyzer.bestHand(pair.fromOneHoleCard.playerCards, pair.fromOneHoleCard.boardCards).hand).not.toBe('flush');
          expect(handAnalyzer.bestHand(pair.fromBoard.playerCards, pair.fromBoard.boardCards).hand).not.toBe('flush');
          expect(handAnalyzer.bestHand(pair.andStraight.playerCards, pair.andStraight.boardCards).hand).not.toBe('flush');

          expect(handAnalyzer.bestHand(twoPair.fromHoleCards.playerCards, twoPair.fromHoleCards.boardCards).hand).not.toBe('flush');
          expect(handAnalyzer.bestHand(twoPair.fromOneHoleCard.playerCards, twoPair.fromOneHoleCard.boardCards).hand).not.toBe('flush');
          expect(handAnalyzer.bestHand(twoPair.fromBoard.playerCards, twoPair.fromBoard.boardCards).hand).not.toBe('flush');
          expect(handAnalyzer.bestHand(twoPair.threePairs.playerCards, twoPair.threePairs.boardCards).hand).not.toBe('flush');
          expect(handAnalyzer.bestHand(twoPair.andTrips.playerCards, twoPair.andTrips.boardCards).hand).not.toBe('flush');
          expect(handAnalyzer.bestHand(twoPair.andStraight.playerCards, twoPair.andStraight.boardCards).hand).not.toBe('flush');

          expect(handAnalyzer.bestHand(trips.fromPocketPair.playerCards, trips.fromPocketPair.boardCards).hand).not.toBe('flush');
          expect(handAnalyzer.bestHand(trips.fromOneHoleCard.playerCards, trips.fromOneHoleCard.boardCards).hand).not.toBe('flush');
          expect(handAnalyzer.bestHand(trips.fromBoard.playerCards, trips.fromBoard.boardCards).hand).not.toBe('flush');
          expect(handAnalyzer.bestHand(trips.andStraight.playerCards, trips.andStraight.boardCards).hand).not.toBe('flush');

          expect(handAnalyzer.bestHand(straight.aceHigh.playerCards, straight.aceHigh.boardCards)).not.toBe('flush');
          expect(handAnalyzer.bestHand(straight.kingHigh.playerCards, straight.kingHigh.boardCards)).not.toBe('flush');
          expect(handAnalyzer.bestHand(straight.tenHigh.playerCards, straight.tenHigh.boardCards)).not.toBe('flush');
          expect(handAnalyzer.bestHand(straight.aceLow.fiveInARow.playerCards, straight.aceLow.fiveInARow.boardCards)).not.toBe('flush');
          expect(handAnalyzer.bestHand(straight.aceLow.sixInARow.playerCards, straight.aceLow.sixInARow.boardCards)).not.toBe('flush');
          expect(handAnalyzer.bestHand(straight.aceLow.sevenInARow.playerCards, straight.aceLow.sevenInARow.boardCards)).not.toBe('flush');
          expect(handAnalyzer.bestHand(straight.sixInARow.playerCards, straight.sixInARow.boardCards)).not.toBe('flush');
          expect(handAnalyzer.bestHand(straight.sevenInARow.playerCards, straight.sevenInARow.boardCards)).not.toBe('flush');

          expect(handAnalyzer.bestHand(fullHouse.fromPocketPair.holeMakesTheTwo.playerCards, fullHouse.fromPocketPair.holeMakesTheTwo.boardCards).hand).not.toBe('flush');
          expect(handAnalyzer.bestHand(fullHouse.fromPocketPair.holeMakesTheThree.playerCards, fullHouse.fromPocketPair.holeMakesTheThree.boardCards).hand).not.toBe('flush');
          expect(handAnalyzer.bestHand(fullHouse.fromTwoHoleCards.playerCards, fullHouse.fromTwoHoleCards.boardCards).hand).not.toBe('flush');
          expect(handAnalyzer.bestHand(fullHouse.fromOneHoleCard.holeMakesTheTwo.playerCards, fullHouse.fromOneHoleCard.holeMakesTheTwo.boardCards).hand).not.toBe('flush');
          expect(handAnalyzer.bestHand(fullHouse.fromOneHoleCard.holeMakesTheThree.playerCards, fullHouse.fromOneHoleCard.holeMakesTheThree.boardCards).hand).not.toBe('flush');
          expect(handAnalyzer.bestHand(fullHouse.fromBoard.playerCards, fullHouse.fromBoard.boardCards).hand).not.toBe('flush');
          expect(handAnalyzer.bestHand(fullHouse.fromBoard.playerCards, fullHouse.threeTwoTwo.boardCards).hand).not.toBe('flush');
          expect(handAnalyzer.bestHand(fullHouse.fromBoard.playerCards, fullHouse.threeThree.boardCards).hand).not.toBe('flush');
          expect(handAnalyzer.bestHand(fullHouse.andQuads.playerCards, fullHouse.andQuads.boardCards).hand).not.toBe('flush');

          expect(handAnalyzer.bestHand(quads.fromPocketPair.playerCards, quads.fromPocketPair.boardCards).hand).not.toBe('flush');
          expect(handAnalyzer.bestHand(quads.fromOneHoleCard.playerCards, quads.fromOneHoleCard.boardCards).hand).not.toBe('flush');
          expect(handAnalyzer.bestHand(quads.fromBoard.playerCards, quads.fromBoard.boardCards).hand).not.toBe('flush');

          // expect(handAnalyzer.bestHand(straightFlush.fromTwoHoleCards.playerCards, straightFlush.fromTwoHoleCards.boardCards).hand).not.toBe('flush');
          // expect(handAnalyzer.bestHand(straightFlush.fromOneHoleCard.playerCards, straightFlush.fromOneHoleCard.boardCards).hand).not.toBe('flush');
          // expect(handAnalyzer.bestHand(straightFlush.fromBoard.playerCards, straightFlush.fromBoard.boardCards).hand).not.toBe('flush');
          //
          // expect(handAnalyzer.bestHand(royalFlush.fromTwoHoleCards.playerCards, royalFlush.fromTwoHoleCards.boardCards).hand).not.toBe('flush');
          // expect(handAnalyzer.bestHand(royalFlush.fromOneHoleCard.playerCards, royalFlush.fromOneHoleCard.boardCards).hand).not.toBe('flush');
          // expect(handAnalyzer.bestHand(royalFlush.fromBoard.playerCards, royalFlush.fromBoard.boardCards).hand).not.toBe('flush');
        });
      });

      describe('full house', function () {
        it('got it', function () {
          expect(handAnalyzer.bestHand(fullHouse.fromPocketPair.holeMakesTheTwo.playerCards, fullHouse.fromPocketPair.holeMakesTheTwo.boardCards)).toEqual({
            hand: 'full house',
            handRank: 6,
            three: '2',
            two: 'a',
          });
          expect(handAnalyzer.bestHand(fullHouse.fromPocketPair.holeMakesTheThree.playerCards, fullHouse.fromPocketPair.holeMakesTheThree.boardCards)).toEqual({
            hand: 'full house',
            handRank: 6,
            three: 'a',
            two: '2',
          });
          expect(handAnalyzer.bestHand(fullHouse.fromTwoHoleCards.playerCards, fullHouse.fromTwoHoleCards.boardCards)).toEqual({
            hand: 'full house',
            handRank: 6,
            three: '2',
            two: 'a',
          });
          expect(handAnalyzer.bestHand(fullHouse.fromOneHoleCard.holeMakesTheTwo.playerCards, fullHouse.fromOneHoleCard.holeMakesTheTwo.boardCards)).toEqual({
            hand: 'full house',
            handRank: 6,
            three: '2',
            two: 'a',
          });
          expect(handAnalyzer.bestHand(fullHouse.fromOneHoleCard.holeMakesTheThree.playerCards, fullHouse.fromOneHoleCard.holeMakesTheThree.boardCards)).toEqual({
            hand: 'full house',
            handRank: 6,
            three: 'a',
            two: '6',
          });
          expect(handAnalyzer.bestHand(fullHouse.fromBoard.playerCards, fullHouse.fromBoard.boardCards)).toEqual({
            hand: 'full house',
            handRank: 6,
            three: '2',
            two: '6',
          });
          expect(handAnalyzer.bestHand(fullHouse.threeTwoTwo.playerCards, fullHouse.threeTwoTwo.boardCards)).toEqual({
            hand: 'full house',
            handRank: 6,
            three: '2',
            two: 'k',
          });
          expect(handAnalyzer.bestHand(fullHouse.threeThree.playerCards, fullHouse.threeThree.boardCards)).toEqual({
            hand: 'full house',
            handRank: 6,
            three: 'k',
            two: '2',
          });
          expect(handAnalyzer.bestHand(twoPair.andTrips.playerCards, twoPair.andTrips.boardCards)).toEqual({
            hand: 'full house',
            handRank: 6,
            three: '2',
            two: 'a',
          });
        });

        it('don\'t got it', function () {
          expect(handAnalyzer.bestHand(nothing.playerCards, nothing.boardCards).hand).not.toBe('full house');

          expect(handAnalyzer.bestHand(pair.fromPocketPair.playerCards, pair.fromPocketPair.boardCards).hand).not.toBe('full house');
          expect(handAnalyzer.bestHand(pair.fromOneHoleCard.playerCards, pair.fromOneHoleCard.boardCards).hand).not.toBe('full house');
          expect(handAnalyzer.bestHand(pair.fromBoard.playerCards, pair.fromBoard.boardCards).hand).not.toBe('full house');
          expect(handAnalyzer.bestHand(pair.andStraight.playerCards, pair.andStraight.boardCards).hand).not.toBe('full house');
          expect(handAnalyzer.bestHand(pair.andFlush.playerCards, pair.andFlush.boardCards).hand).not.toBe('full house');

          expect(handAnalyzer.bestHand(twoPair.fromHoleCards.playerCards, twoPair.fromHoleCards.boardCards).hand).not.toBe('full house');
          expect(handAnalyzer.bestHand(twoPair.fromOneHoleCard.playerCards, twoPair.fromOneHoleCard.boardCards).hand).not.toBe('full house');
          expect(handAnalyzer.bestHand(twoPair.fromBoard.playerCards, twoPair.fromBoard.boardCards).hand).not.toBe('full house');
          expect(handAnalyzer.bestHand(twoPair.threePairs.playerCards, twoPair.threePairs.boardCards).hand).not.toBe('full house');
          expect(handAnalyzer.bestHand(twoPair.andStraight.playerCards, twoPair.andStraight.boardCards).hand).not.toBe('full house');
          expect(handAnalyzer.bestHand(twoPair.andFlush.playerCards, twoPair.andFlush.boardCards).hand).not.toBe('full house');

          expect(handAnalyzer.bestHand(trips.fromPocketPair.playerCards, trips.fromPocketPair.boardCards).hand).not.toBe('full house');
          expect(handAnalyzer.bestHand(trips.fromOneHoleCard.playerCards, trips.fromOneHoleCard.boardCards).hand).not.toBe('full house');
          expect(handAnalyzer.bestHand(trips.fromBoard.playerCards, trips.fromBoard.boardCards).hand).not.toBe('full house');
          expect(handAnalyzer.bestHand(trips.andStraight.playerCards, trips.andStraight.boardCards).hand).not.toBe('full house');
          expect(handAnalyzer.bestHand(trips.andFlush.playerCards, trips.andFlush.boardCards).hand).not.toBe('full house');

          expect(handAnalyzer.bestHand(straight.aceHigh.playerCards, straight.aceHigh.boardCards)).not.toBe('straight');
          expect(handAnalyzer.bestHand(straight.kingHigh.playerCards, straight.kingHigh.boardCards)).not.toBe('straight');
          expect(handAnalyzer.bestHand(straight.tenHigh.playerCards, straight.tenHigh.boardCards)).not.toBe('straight');
          expect(handAnalyzer.bestHand(straight.aceLow.fiveInARow.playerCards, straight.aceLow.fiveInARow.boardCards)).not.toBe('straight');
          expect(handAnalyzer.bestHand(straight.aceLow.sixInARow.playerCards, straight.aceLow.sixInARow.boardCards)).not.toBe('straight');
          expect(handAnalyzer.bestHand(straight.aceLow.sevenInARow.playerCards, straight.aceLow.sevenInARow.boardCards)).not.toBe('straight');
          expect(handAnalyzer.bestHand(straight.sixInARow.playerCards, straight.sixInARow.boardCards)).not.toBe('straight');
          expect(handAnalyzer.bestHand(straight.sevenInARow.playerCards, straight.sevenInARow.boardCards)).not.toBe('straight');

          expect(handAnalyzer.bestHand(flush.fromTwoHoleCards.playerCards, flush.fromTwoHoleCards.boardCards).hand).not.toBe('full house');
          expect(handAnalyzer.bestHand(flush.fromOneHoleCard.playerCards, flush.fromOneHoleCard.boardCards).hand).not.toBe('full house');
          expect(handAnalyzer.bestHand(flush.fromBoard.playerCards, flush.fromBoard.boardCards).hand).not.toBe('full house');
          expect(handAnalyzer.bestHand(flush.withSix.playerCards, flush.withSix.boardCards).hand).not.toBe('full house');
          expect(handAnalyzer.bestHand(flush.withSeven.playerCards, flush.withSeven.boardCards).hand).not.toBe('full house');

          expect(handAnalyzer.bestHand(fullHouse.andQuads.playerCards, fullHouse.andQuads.boardCards).hand).not.toBe('full house');

          expect(handAnalyzer.bestHand(quads.fromPocketPair.playerCards, quads.fromPocketPair.boardCards).hand).not.toBe('full house');
          expect(handAnalyzer.bestHand(quads.fromOneHoleCard.playerCards, quads.fromOneHoleCard.boardCards).hand).not.toBe('full house');
          expect(handAnalyzer.bestHand(quads.fromBoard.playerCards, quads.fromBoard.boardCards).hand).not.toBe('full house');

          expect(handAnalyzer.bestHand(straightFlush.fromTwoHoleCards.playerCards, straightFlush.fromTwoHoleCards.boardCards).hand).not.toBe('full house');
          expect(handAnalyzer.bestHand(straightFlush.fromOneHoleCard.playerCards, straightFlush.fromOneHoleCard.boardCards).hand).not.toBe('full house');
          expect(handAnalyzer.bestHand(straightFlush.fromBoard.playerCards, straightFlush.fromBoard.boardCards).hand).not.toBe('full house');

          expect(handAnalyzer.bestHand(royalFlush.fromTwoHoleCards.playerCards, royalFlush.fromTwoHoleCards.boardCards).hand).not.toBe('full house');
          expect(handAnalyzer.bestHand(royalFlush.fromOneHoleCard.playerCards, royalFlush.fromOneHoleCard.boardCards).hand).not.toBe('full house');
          expect(handAnalyzer.bestHand(royalFlush.fromBoard.playerCards, royalFlush.fromBoard.boardCards).hand).not.toBe('full house');
        });
      });

      describe('quads', function () {
        it('got it', function () {
          expect(handAnalyzer.bestHand(quads.fromPocketPair.playerCards, quads.fromPocketPair.boardCards)).toEqual({
            hand: 'quads',
            handRank: 7,
            rank: 'a',
            kickers: ['k'],
          });
          expect(handAnalyzer.bestHand(quads.fromOneHoleCard.playerCards, quads.fromOneHoleCard.boardCards)).toEqual({
            hand: 'quads',
            handRank: 7,
            rank: 'a',
            kickers: ['k'],
          });
          expect(handAnalyzer.bestHand(quads.fromBoard.playerCards, quads.fromBoard.boardCards)).toEqual({
            hand: 'quads',
            handRank: 7,
            rank: '2',
            kickers: ['a'],
          });
          expect(handAnalyzer.bestHand(fullHouse.andQuads.playerCards, fullHouse.andQuads.boardCards)).toEqual({
            hand: 'quads',
            handRank: 7,
            rank: '2',
            kickers: ['a'],
          });
        });

        it('don\'t got it', function () {
          expect(handAnalyzer.bestHand(nothing.playerCards, nothing.boardCards).hand).not.toBe('quads');

          expect(handAnalyzer.bestHand(pair.fromPocketPair.playerCards, pair.fromPocketPair.boardCards).hand).not.toBe('quads');
          expect(handAnalyzer.bestHand(pair.fromOneHoleCard.playerCards, pair.fromOneHoleCard.boardCards).hand).not.toBe('quads');
          expect(handAnalyzer.bestHand(pair.fromBoard.playerCards, pair.fromBoard.boardCards).hand).not.toBe('quads');
          expect(handAnalyzer.bestHand(pair.andStraight.playerCards, pair.andStraight.boardCards).hand).not.toBe('quads');
          expect(handAnalyzer.bestHand(pair.andFlush.playerCards, pair.andFlush.boardCards).hand).not.toBe('quads');

          expect(handAnalyzer.bestHand(twoPair.fromHoleCards.playerCards, twoPair.fromHoleCards.boardCards).hand).not.toBe('quads');
          expect(handAnalyzer.bestHand(twoPair.fromOneHoleCard.playerCards, twoPair.fromOneHoleCard.boardCards).hand).not.toBe('quads');
          expect(handAnalyzer.bestHand(twoPair.fromBoard.playerCards, twoPair.fromBoard.boardCards).hand).not.toBe('quads');
          expect(handAnalyzer.bestHand(twoPair.threePairs.playerCards, twoPair.threePairs.boardCards).hand).not.toBe('quads');
          expect(handAnalyzer.bestHand(twoPair.andTrips.playerCards, twoPair.andTrips.boardCards).hand).not.toBe('quads');
          expect(handAnalyzer.bestHand(twoPair.andStraight.playerCards, twoPair.andStraight.boardCards).hand).not.toBe('quads');
          expect(handAnalyzer.bestHand(twoPair.andFlush.playerCards, twoPair.andFlush.boardCards).hand).not.toBe('quads');

          expect(handAnalyzer.bestHand(trips.fromPocketPair.playerCards, trips.fromPocketPair.boardCards).hand).not.toBe('quads');
          expect(handAnalyzer.bestHand(trips.fromOneHoleCard.playerCards, trips.fromOneHoleCard.boardCards).hand).not.toBe('quads');
          expect(handAnalyzer.bestHand(trips.fromBoard.playerCards, trips.fromBoard.boardCards).hand).not.toBe('quads');
          expect(handAnalyzer.bestHand(trips.andStraight.playerCards, trips.andStraight.boardCards).hand).not.toBe('quads');
          expect(handAnalyzer.bestHand(trips.andFlush.playerCards, trips.andFlush.boardCards).hand).not.toBe('quads');

          expect(handAnalyzer.bestHand(straight.aceHigh.playerCards, straight.aceHigh.boardCards)).not.toBe('quads');
          expect(handAnalyzer.bestHand(straight.kingHigh.playerCards, straight.kingHigh.boardCards)).not.toBe('quads');
          expect(handAnalyzer.bestHand(straight.tenHigh.playerCards, straight.tenHigh.boardCards)).not.toBe('quads');
          expect(handAnalyzer.bestHand(straight.aceLow.fiveInARow.playerCards, straight.aceLow.fiveInARow.boardCards)).not.toBe('quads');
          expect(handAnalyzer.bestHand(straight.aceLow.sixInARow.playerCards, straight.aceLow.sixInARow.boardCards)).not.toBe('quads');
          expect(handAnalyzer.bestHand(straight.aceLow.sevenInARow.playerCards, straight.aceLow.sevenInARow.boardCards)).not.toBe('quads');
          expect(handAnalyzer.bestHand(straight.sixInARow.playerCards, straight.sixInARow.boardCards)).not.toBe('quads');
          expect(handAnalyzer.bestHand(straight.sevenInARow.playerCards, straight.sevenInARow.boardCards)).not.toBe('quads');

          expect(handAnalyzer.bestHand(flush.fromTwoHoleCards.playerCards, flush.fromTwoHoleCards.boardCards).hand).not.toBe('quads');
          expect(handAnalyzer.bestHand(flush.fromOneHoleCard.playerCards, flush.fromOneHoleCard.boardCards).hand).not.toBe('quads');
          expect(handAnalyzer.bestHand(flush.fromBoard.playerCards, flush.fromBoard.boardCards).hand).not.toBe('quads');
          expect(handAnalyzer.bestHand(flush.withSix.playerCards, flush.withSix.boardCards).hand).not.toBe('quads');
          expect(handAnalyzer.bestHand(flush.withSeven.playerCards, flush.withSeven.boardCards).hand).not.toBe('quads');

          expect(handAnalyzer.bestHand(fullHouse.fromPocketPair.holeMakesTheTwo.playerCards, fullHouse.fromPocketPair.holeMakesTheTwo.boardCards).hand).not.toBe('quads');
          expect(handAnalyzer.bestHand(fullHouse.fromPocketPair.holeMakesTheThree.playerCards, fullHouse.fromPocketPair.holeMakesTheThree.boardCards).hand).not.toBe('quads');
          expect(handAnalyzer.bestHand(fullHouse.fromTwoHoleCards.playerCards, fullHouse.fromTwoHoleCards.boardCards).hand).not.toBe('quads');
          expect(handAnalyzer.bestHand(fullHouse.fromOneHoleCard.holeMakesTheTwo.playerCards, fullHouse.fromOneHoleCard.holeMakesTheTwo.boardCards).hand).not.toBe('quads');
          expect(handAnalyzer.bestHand(fullHouse.fromOneHoleCard.holeMakesTheThree.playerCards, fullHouse.fromOneHoleCard.holeMakesTheThree.boardCards).hand).not.toBe('quads');
          expect(handAnalyzer.bestHand(fullHouse.fromBoard.playerCards, fullHouse.threeTwoTwo.boardCards).hand).not.toBe('quads');
          expect(handAnalyzer.bestHand(fullHouse.fromBoard.playerCards, fullHouse.threeThree.boardCards).hand).not.toBe('quads');
          expect(handAnalyzer.bestHand(fullHouse.fromBoard.playerCards, fullHouse.fromBoard.boardCards).hand).not.toBe('quads');

          expect(handAnalyzer.bestHand(straightFlush.fromTwoHoleCards.playerCards, straightFlush.fromTwoHoleCards.boardCards).hand).not.toBe('quads');
          expect(handAnalyzer.bestHand(straightFlush.fromOneHoleCard.playerCards, straightFlush.fromOneHoleCard.boardCards).hand).not.toBe('quads');
          expect(handAnalyzer.bestHand(straightFlush.fromBoard.playerCards, straightFlush.fromBoard.boardCards).hand).not.toBe('quads');

          expect(handAnalyzer.bestHand(royalFlush.fromTwoHoleCards.playerCards, royalFlush.fromTwoHoleCards.boardCards).hand).not.toBe('quads');
          expect(handAnalyzer.bestHand(royalFlush.fromOneHoleCard.playerCards, royalFlush.fromOneHoleCard.boardCards).hand).not.toBe('quads');
          expect(handAnalyzer.bestHand(royalFlush.fromBoard.playerCards, royalFlush.fromBoard.boardCards).hand).not.toBe('quads');
        });
      });

      describe('straight flush', function () {

      });

      describe('royal flush', function () {

      });
    });
  });

  // xdescribe('board', function () {
  //   describe('flop', function () {
  //     var trips = [
  //       new Card('a', 'h'),
  //       new Card('a', 'd'),
  //       new Card('a', 's'),
  //     ];
  //
  //     var pairedBoard = {
  //       rainbow: {
  //         sequence: [
  //           new Card('a', 'h'),
  //           new Card('a', 'd'),
  //           new Card('2', 'c'),
  //         ],
  //         oneGap: [
  //           new Card('a', 'h'),
  //           new Card('a', 'd'),
  //           new Card('3', 'c'),
  //         ],
  //         twoGap: [
  //           new Card('a', 'h'),
  //           new Card('a', 'd'),
  //           new Card('4', 'c'),
  //         ],
  //         noSequence: [
  //           new Card('a', 'h'),
  //           new Card('a', 'd'),
  //           new Card('5', 'c'),
  //         ],
  //       },
  //
  //       twoOfSameSuit: {
  //         sequence: [
  //           new Card('a', 'h'),
  //           new Card('a', 'd'),
  //           new Card('2', 'h'),
  //         ],
  //         oneGap: [
  //           new Card('a', 'h'),
  //           new Card('a', 'd'),
  //           new Card('3', 'h'),
  //         ],
  //         twoGap: [
  //           new Card('a', 'h'),
  //           new Card('a', 'd'),
  //           new Card('4', 'h'),
  //         ],
  //         noSequence: [
  //           new Card('a', 'h'),
  //           new Card('a', 'd'),
  //           new Card('5', 'h'),
  //         ],
  //       },
  //     };
  //
  //     var unpairedBoard = {
  //       rainbow: {
  //         threeSequence: [
  //           new Card('a', 'h'),
  //           new Card('2', 'd'),
  //           new Card('3', 's'),
  //         ],
  //         sequence: {
  //           oneGap: [
  //             new Card('a', 'h'),
  //             new Card('2', 'd'),
  //             new Card('4', 'c'),
  //           ],
  //           twoGap: [
  //             new Card('a', 'h'),
  //             new Card('2', 'd'),
  //             new Card('5', 'c'),
  //           ],
  //           noSequence: [
  //             new Card('a', 'h'),
  //             new Card('2', 'd'),
  //             new Card('6', 'c'),
  //           ],
  //         },
  //         oneGap: {
  //           oneGap: [
  //             new Card('a', 'h'),
  //             new Card('3', 'd'),
  //             new Card('5', 'c'),
  //           ],
  //           twoGap: [
  //             new Card('a', 'h'),
  //             new Card('3', 'd'),
  //             new Card('6', 'c'),
  //           ],
  //           noSequence: [
  //             new Card('a', 'h'),
  //             new Card('3', 'd'),
  //             new Card('7', 'c'),
  //           ],
  //         },
  //         twoGap: {
  //           twoGap: [
  //             new Card('a', 'h'),
  //             new Card('4', 'd'),
  //             new Card('7', 'c'),
  //           ],
  //           noSequence: [
  //             new Card('a', 'h'),
  //             new Card('4', 'd'),
  //             new Card('8', 'c'),
  //           ],
  //         },
  //       },
  //
  //       twoOfSameSuit: {
  //         threeSequence: [
  //           new Card('a', 'h'),
  //           new Card('2', 'h'),
  //           new Card('3', 'd'),
  //         ],
  //         sequence: {
  //           oneGap: [
  //             new Card('a', 'h'),
  //             new Card('2', 'h'),
  //             new Card('4', 'c'),
  //           ],
  //           twoGap: [
  //             new Card('a', 'h'),
  //             new Card('2', 'h'),
  //             new Card('5', 'c'),
  //           ],
  //           noSequence: [
  //             new Card('a', 'h'),
  //             new Card('2', 'h'),
  //             new Card('6', 'c'),
  //           ],
  //         },
  //         oneGap: {
  //           oneGap: [
  //             new Card('a', 'h'),
  //             new Card('3', 'h'),
  //             new Card('5', 'c'),
  //           ],
  //           twoGap: [
  //             new Card('a', 'h'),
  //             new Card('3', 'h'),
  //             new Card('6', 'c'),
  //           ],
  //           noSequence: [
  //             new Card('a', 'h'),
  //             new Card('3', 'h'),
  //             new Card('7', 'c'),
  //           ],
  //         },
  //         twoGap: {
  //           twoGap: [
  //             new Card('a', 'h'),
  //             new Card('4', 'h'),
  //             new Card('7', 'c'),
  //           ],
  //           noSequence: [
  //             new Card('a', 'h'),
  //             new Card('4', 'h'),
  //             new Card('8', 'c'),
  //           ],
  //         },
  //       },
  //
  //       threeOfSameSuit: {
  //         threeSequence: [
  //           new Card('a', 'h'),
  //           new Card('2', 'h'),
  //           new Card('3', 'h'),
  //         ],
  //         sequence: {
  //           oneGap: [
  //             new Card('a', 'h'),
  //             new Card('2', 'h'),
  //             new Card('4', 'h'),
  //           ],
  //           twoGap: [
  //             new Card('a', 'h'),
  //             new Card('2', 'h'),
  //             new Card('5', 'h'),
  //           ],
  //           noSequence: [
  //             new Card('a', 'h'),
  //             new Card('2', 'h'),
  //             new Card('6', 'h'),
  //           ],
  //         },
  //         oneGap: {
  //           oneGap: [
  //             new Card('a', 'h'),
  //             new Card('3', 'h'),
  //             new Card('5', 'h'),
  //           ],
  //           twoGap: [
  //             new Card('a', 'h'),
  //             new Card('3', 'h'),
  //             new Card('6', 'h'),
  //           ],
  //           noSequence: [
  //             new Card('a', 'h'),
  //             new Card('3', 'h'),
  //             new Card('7', 'h'),
  //           ],
  //         },
  //         twoGap: {
  //           twoGap: [
  //             new Card('a', 'h'),
  //             new Card('4', 'h'),
  //             new Card('7', 'h'),
  //           ],
  //           noSequence: [
  //             new Card('a', 'h'),
  //             new Card('4', 'h'),
  //             new Card('8', 'h'),
  //           ],
  //         },
  //       },
  //     };
});
