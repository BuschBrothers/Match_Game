

var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */

 $(document).ready(function() {

   var values = MatchGame.generateCardValues();
   var $game = $('#game');
   MatchGame.renderCards(values, $game);

 });

// function remove_data(index, array) {
//   var temp = [];
//   var num;
//   for (var i = 0; i<array.length; i++){
//     if (i === index) {
//       num = array[i];
//     } else {
//       temp.push(array[i]);
//     }
//   }
//   return [num, temp];
// };

MatchGame.generateCardValues = function () {
  var array = [];
  var mix = [];
  var index;

  for (var i = 1; i < 9; i++) {
    array.push(i);
    array.push(i);
  }

  while (array.length > 0) {
    index = Math.floor(Math.random() * (array.length));
    mix.push(array[index]);
    array.splice(index, 1);
  }
  console.log(mix);
  return mix;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/
MatchGame.renderCards = function(cardValues, $game) {

  $game.empty();

  $game.data('flippedCards',[]);

  var colors = [
              'hsl(25, 85%, 65%)',
              'hsl(55, 85%, 65%)',
              'hsl(90, 85%, 65%)',
              'hsl(160, 85%, 65%)',
              'hsl(220, 85%, 65%)',
              'hsl(265, 85%, 65%)',
              'hsl(310, 85%, 65%)',
              'hsl(360, 85%, 65%)'
              ];

  for(var i = 0; i<cardValues.length; i++) {
    var $card = $('<div class="card col-xs-3"></div>');
    var prop = {
      value: cardValues[i],
      flipped: false,
      color: colors[cardValues[i]-1]
    };
    $card.data(prop);
    $game.append($card);
  }

  $('.card').click(function() {
    MatchGame.flipCard($(this), $game);
  });

};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

  if ($card.data('flipped')) {
    return
  }
  $card.css('background-color', $card.data('color'));
  $card.text($card.data('value'));
  $card.data('flipped', true);
  $game.data('flippedCards').push($card);

  if ($game.data('flippedCards').length === 2) {

    setTimeout(function() {
        if ($game.data('flippedCards')[0].data('value') === $game.data('flippedCards')[1].data('value')) {
        var new_colors = {
          'backgroundColor': 'rgb(153, 153, 153)',
          'color': 'rgb(204, 204, 204)'
        }
        $game.data('flippedCards')[0].css(new_colors);
        $game.data('flippedCards')[1].css(new_colors);
      } else {
        $game.data('flippedCards')[0].css('background-color', 'rgb(32, 64, 86)');
        $game.data('flippedCards')[1].css('background-color', 'rgb(32, 64, 86)');
        $game.data('flippedCards')[0].data('flipped', false);
        $game.data('flippedCards')[1].data('flipped', false);
        $game.data('flippedCards')[0].text('');
        $game.data('flippedCards')[1].text('');
      }
      $game.data('flippedCards', []);

    }, 400);
  }

};





//
