function Game() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber.call();
}

Game.prototype.playersGuessSubmission = function (num) {
    this.playersGuess = num;
    if (num < 1 || num > 100 || typeof num !== "number") {
        throw "That is an invalid guess.";
    } else {
        return this.checkGuess();
    }
}

Game.prototype.checkGuess = function() {
    if (this.winningNumber === this.playersGuess){
        this.pastGuesses.push(this.playersGuess);
        return 'You Win!';
    } else if (this.pastGuesses.indexOf(this.playersGuess) !== -1) {
        return 'You have already guessed that number.';
    } else if (this.pastGuesses.length === 4 ) {
        this.pastGuesses.push(this.playersGuess);
        return "You Lose.";
    }   else if (this.difference() < 10) {
        this.pastGuesses.push(this.playersGuess);
        return "You\'re burning up!";
    } else if (this.difference() >= 10 && this.difference() <25){
        this.pastGuesses.push(this.playersGuess);
        return "You\'re lukewarm.";
    } else if (this.difference() >= 25 && this.difference() <50){
        this.pastGuesses.push(this.playersGuess);
        return 'You\'re a bit chilly.';
    } else {
        this.pastGuesses.push(this.playersGuess);
        return  "You\'re ice cold!";
    } 
}

Game.prototype.difference = function () {
    if (this.playersGuess - this.winningNumber > 0){
        return this.playersGuess - this.winningNumber;
    } else {
        return (this.playersGuess - this.winningNumber)*-1;
    }
}

Game.prototype.isLower = function() {
    if (this.playersGuess - this.winningNumber > 0){
        return false;
        } else {
            return true;
        }
}

Game.prototype.provideHint = function () {
    var hintArr =[];
    hintArr.push(generateWinningNumber.call(this));
    hintArr.push(generateWinningNumber.call(this));
    hintArr.push(this.winningNumber);
    return shuffle(hintArr);
}

function generateWinningNumber() {
    var randomValue = Math.random()*100 +1;
    return Math.floor(randomValue);
}

function newGame() {
   return new Game();
}

function shuffle(arr) {
    var m = arr.length, t, i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
  return arr;
}

function makeAGuess(game){
    var input = +$('#player-input').val();
    $('#player-input').val('');
    var output = game.playersGuessSubmission(input);
    $('#title').text(output);
    if (output === "You Lose.") {  
        $('#instructions').text('Click the Reset Button to Play Again!');
        $('#submit').attr("disabled", true);
        $('#hint').attr("disabled", true);
        $('.guess').eq(game.pastGuesses.length-1).text(input);
    } else if(output === 'You Win!') {
        $('#instructions').text('Great Job! Click the Reset Button to Play Again!');
        $('#submit').attr("disabled", true);
        $('#hint').attr("disabled", true);
        $('.guess').eq(game.pastGuesses.length-1).text(input);
    } else if (output !== 'You have already guessed that number.') {
        if(game.isLower()){
            $('#instructions').text('Guess Higher!');
            $('.guess').eq(game.pastGuesses.length-1).text(input);
        } else {
            $('#instructions').text('Guess Lower!');
            $('.guess').eq(game.pastGuesses.length-1).text(input);
        }
    } 
}

var game;

$(document).ready(function() {
    game = new Game();

    $('#submit').click(function() {
       makeAGuess(game);
    });

    $('#player-input').keypress(function(e){
        if (e.which === 13) {
           makeAGuess(game);
        }
    });

    $('#reset').click(function(){
        game = new Game();
        $('#title').text('Play the Guessing Game!')
        $('#instructions').text('Guess a number between 1-100!');
        $('.guess').text('-');
        $('#submit').attr("disabled", false);
        $('#hint').attr("disabled", false);
    });

    $('#hint').click(function(){
        $('#title').text(game.provideHint());
    });
});