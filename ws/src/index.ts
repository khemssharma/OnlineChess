import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager.js";
const wss = new WebSocketServer({ port: 8080 });
const gameManager = new GameManager();

wss.on("connection", function connection(ws) {
    gameManager.addUser(ws);
    ws.on("disconnect", () => {
        gameManager.removeUser(ws);
    });
    ws.on("message", function message(data) {
        console.log('received: %s', data);
    });
    ws.send("e4 e5");
});

console.log("WebSocket server is running on ws://localhost:8080");