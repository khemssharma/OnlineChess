var method = Game.prototype

function Game(player1, player2) {
    this.player1 = player1
    this.player2 = player2
}

var player1;
var player2;


method.findSocket = function (socket) {
    /*console.log(player1)
    console.log(this.player1)*/
    if (socket.id == this.player1.getSocketId()) {
        return true;
    }

    if (socket.id == this.player2.getSocketId()) {
        return true;
    }

    return false;

}

method.findOpponentPlayer = function (socket) {
    if (socket.id == this.player1.getSocketId()) {
        return this.player2
    }
    return this.player1;
}
module.exports = Game;