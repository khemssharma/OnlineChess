var method = Player.prototype

function Player(socket) {
    this.socket = socket;
}

var socket;
var name;

method.getSocketId = function () {
    return this.socket.id;
}

method.getSocket = function () {
    return this.socket;
}

module.exports = Player;