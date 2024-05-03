console.log("Welcome to my project...");
// create classes such as player card and deck
class Player {
    constructor(name) {
        this.name = name;
        this.points = 0;
        this.hand = [];
    }
}
//card class 
class Card {
    constructor(suit, name, value) {
        this.suit = suit;
        this.name = name;
        this.value = value;
    }
}
//deck class 
class Deck {
    constructor() {
        this.cards = [];
        this.suits = ["Heart", "Spade", "Diamond", "Club"];
        this.values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        this.names = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];

        // Create the deck
        for (let i = 0; i < this.suits.length; i++) {
            for (let n = 0; n < this.names.length; n++) {
                this.cards.push(new Card(this.suits[i], this.names[n], this.values[n]));
            }
        }
    }
//create loops to shuffle deck and deal cards to players 
    shuffleDeck() {
        console.log('Shuffling deck...');
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); //lets card get pulled from a random position 
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
//deal the cards 
    dealCards(players) {
        console.log("Dealing cards...");
        this.shuffleDeck();
        let playerCards1 = this.cards.splice(0, 26);
        players[0].hand = playerCards1;
        let playerCards2 = this.cards.splice(0, 26);
        players[1].hand = playerCards2;
    }
}
//create the start and play classes along with initial game class 
class Game {
    constructor() {
        this.players = [];
        this.deck = new Deck();
    }
//start the game
    startGame() {
        console.log("The game has started...");
        this.players.push(new Player("Me"));
        this.players.push(new Player("You"));
        console.log("Let the games begin! Players: ", this.players);

        this.deck.shuffleDeck();
        console.log("Deck shuffled.");

        this.deck.dealCards(this.players);
        console.log("Cards dealt.");

        this.playGame();
        this.gameEnd(); 
    }
//play the game 
    playGame() {
        console.log('So it begins...');
        let player1 = this.players[0];
        let player2 = this.players[1];
        console.log("Player 1:", player1.name, "Player 2:", player2.name);

        let turn = 0;
        while (player1.hand.length !== 0 && player2.hand.length !== 0) { //starting players turns 
            turn++;
            console.log("Turn", turn);

            let player1Card = player1.hand.pop();
            let player2Card = player2.hand.pop();

            console.log(player1.name + " plays: ", player1Card);
            console.log(player2.name + " plays: ", player2Card);

            if (player1Card.value > player2Card.value) {
                console.log(player1.name + " wins this round");
                player1.points += 1;
            } else if (player2Card.value > player1Card.value) {
                console.log(player2.name + " wins this round");
                player2.points += 1;
            } else {
                console.log("It's a tie");
            }
        }
    }
//end the game 
    gameEnd() {
        let player1 = this.players[0];
        let player2 = this.players[1];
        let theWinner = '';
        let winnerPoints = 0;

        if (player1.points > player2.points) {
            theWinner = player1.name;
            winnerPoints = player1.points;
            console.log("The game is over! " + theWinner + " has won the game with " + winnerPoints + " points.");
        } else if (player1.points < player2.points) {
            theWinner = player2.name;
            winnerPoints = player2.points;
            console.log("The game is over! " + theWinner + " has won the game with " + winnerPoints + " points.");
        } else {
            console.log("It's a tie! Good game, " + player1.name + " and " + player2.name + ".");
        }
    }
}

// Create a new game instance
let warGame = new Game();
warGame.startGame();
console.log("War Game:", warGame);