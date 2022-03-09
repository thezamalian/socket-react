const express = require('express');
const app = express();
const http = require('http');
const expressServer = http.createServer(app);
const path = require('path');
const { Server } = require('socket.io');
const io = new Server(expressServer);

const port = 5000 | process.env.PORT;

app.use(express.static("client/build"))

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.get('/express-server', function (req, res) {
    res.end("This is my express server");
});

io.on('connection', function (socket) {
    console.log("New User Connected");

    setTimeout(() => {
        socket.emit('msg', "This is a message from socket server.");
    }, 5000);

    socket.on('disconnect', function () {
        console.log("User Disconnected");
    });
});

expressServer.listen(port, function () {
    console.log("Server listening on port " + port);
});