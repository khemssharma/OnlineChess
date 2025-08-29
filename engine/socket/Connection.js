var SocketConnection = require("./SocketConnection.js");
var GameBuilder = require("../game/GameBuilder.js");

var method = Connection.prototype

var socketConnection = new SocketConnection();
var gameBuilder = new GameBuilder();

function Connection() {

}

method.processClient = function (socket) {
    //socketConnection.checkIfRecentlyDisconnected(socket)    // check if player was disconnected and connected back
    var player2 = socketConnection.getClientFromPool();
    if (player2 == null) {
        socketConnection.addClientToPool(socket)
    } else {
        var player1 = socketConnection.getPlayer(socket);
        gameBuilder.buildGame(player1, player2);

        player1.getSocket().emit("game created", {"isWhite": true, "opponentName": "Jonu"});
        player2.getSocket().emit("game created", {"isWhite": false, "opponentName": "Monu"});

    }
}

method.processDisconnectedClient = function (socket) {
    socketConnection.removeClientFromPool(socket)
}


method.removeClient = function (socket, data) {
    socketConnection.removeClientFromPool(socket);
}

method.moveOpponent = function (socket, data) {
    var game = gameBuilder.findGame(socket);
    var opponentPlayer = game.findOpponentPlayer(socket);
    opponentPlayer.getSocket().emit('opponent move', data);
}

module.exports = Connection;