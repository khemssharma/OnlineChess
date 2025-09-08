import { Chess } from "chess.js";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages.js";
import type { WebSocket } from "ws";

export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    private board: Chess; 
    private moves: string[] = [];
    private startTime: Date;
    private moveCount = 0;

    constructor(player1:WebSocket, player2:WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess(); 
        this.startTime = new Date();
        this.player1.send(JSON.stringify({type: INIT_GAME, payload: {color: "white"}}));
        this.player2.send(JSON.stringify({type: INIT_GAME, payload: {color: "black"}}));
    }

    async makeMove(socket: WebSocket, move: {
        from: string;
        to: string;
        // promotion?: string;
    }) {
        if (this.moveCount % 2 === 0 && socket !== this.player1) {
            console.log("early return 1");
            return; // Not player1's turn
        }
        if (this.moveCount % 2 === 1 && socket !== this.player2) {
            console.log("early return 2");
            return; // Not player2's turn
        }
        console.log("did not early return");

        try{
            this.board.move(move);
        }catch(e){ 
            console.log(e);
            return;
        }
        console.log("move succeeded");

       if (this.board.isGameOver()){
            const winner = this.board.isCheckmate() ? (this.moves.length % 2 === 0 ? 'player1' : 'player2') : 'draw';
            const gameOverMsg = JSON.stringify({
                type: GAME_OVER,
                payload: { winner }
            });
            this.player1.send(gameOverMsg);
            this.player2.send(gameOverMsg);
       }
       if (this.moves.length % 2 === 0){
            this.player2.send(JSON.stringify({type: MOVE, payload:move}));
       }else{
            this.player1.send(JSON.stringify({type: MOVE, payload:move}));
        }
        if (this.board.moves().length % 2 === 0){
            console.log("sent1");
            this.player2.send(JSON.stringify({type: MOVE, payload:move}));
        }else{
            console.log("sent2");
            this.player1.send(JSON.stringify({type: MOVE, payload:move}));
        }
        this.moveCount++;
    }
}
