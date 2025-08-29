const Game = require('./Game.js');

class GameBuilder {
    constructor() {
        this.games = [];
    }

    buildGame(player1, player2) {
        this.games.push(new Game(player1, player2));
    }

    findGame(socket) {
        for (let game of this.games) {
            if (game.findSocket(socket)) {
                return game;
            }
        }
        return null;
    }
}

module.exports = GameBuilder;
