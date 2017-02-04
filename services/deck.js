var SUITS = ['s', 'c', 'h', 'd'];
var RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];

function Deck() {
  this.cards = [];

  this.initialize = function () {
    this.cards = [];

    for (var i = 0; i < RANKS.length; i++) {
      for (var j = 0; j < SUITS.length; j++) {
        this.cards.push(new Card(RANKS[i], SUITS[j]));
      }
    }

    this.shuffle();
  };

  this.shuffle = function () {
    function knuthShuffle(array) { // http://stackoverflow.com/a/2450976/1927876
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    knuthShuffle(this.cards);
  };
}
