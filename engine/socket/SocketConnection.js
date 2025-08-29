const Player = require('../game/Player.js');

class SocketConnection {
    constructor() {
        // Use Map instead of external HashMap
        this.players = new Map();
    }

    getClientFromPool() {
        if (this.players.size > 0) {
            const firstKey = this.players.keys().next().value;
            const player = this.players.get(firstKey);
            this.players.delete(firstKey);
            return player;
        }
        return null;
    }

    addClientToPool(socket) {
        const player = new Player(socket);
        this.players.set(socket.id, player);
        console.log("Connected Client ", socket.id);
    }

    checkIfRecentlyDisconnected(socket) {
        // Placeholder for logic (maybe keep a temp map of disconnected users)
    }

    removeClientFromPool(socket) {
        this.players.delete(socket.id);
        console.log("Removed Client ", socket.id);
    }

    getPlayer(socket) {
        return new Player(socket);
    }
}

module.exports = SocketConnection;
