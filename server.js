let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let port = process.env.PORT || 3000;
let path = require('path');

app.use('node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

let Connection = require('./engine/socket/Connection.js');
let connection = new Connection();
io.on('connection', (socket) => {
    connection.addSocket(socket);
    socket.on('disconnect', () => {
        connection.removeSocket(socket);
        console.log('User disconnected');
    });
    socket.on('new player added', (data) => {
        connection.addNewPlayer(data, socket);
    });
    socket.on('game end', (data) => {
        connection.endGame(data, socket);
    });
    socket.on('player move', (data) => {
        connection.playerMove(data, socket);
    });
});

http.listen(port, (req, res) => {
    console.log('listening on *:' + port);
});