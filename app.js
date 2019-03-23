const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const socketIO  = require('socket.io')(server); //hello I am new

const LISTEN_PORT = 8080; //make sure greater than 3000. Some ports are reserved/blocked by firewall ...

var playerOne = 0;
var playerTwo = 0;

app.use((express.static(__dirname + '/public'))); //set root dir to the public folder

//routes
app.get('/color', function(req,res) {
    res.sendFile(__dirname + '/public/color.html');
});

app.get('/controller', function(req,res) {
    res.sendFile(__dirname + '/public/controller.html');
});

//websocket stuff
socketIO.on('connection', function(socket) {
    console.log(socket.id + ' has connected!');


    socket.on('disconnect', function(data) {
        console.log(socket.id + ' has disconnected');
    });

    //custom events
    //socket = one client
    //socketIO.sockets = all clients

    socket.on('playerOne', function(data) {
        if(playerOne != 100 & playerTwo != 100){
            playerOne ++;
            socketIO.sockets.emit('Score', [playerOne, playerTwo]);
        }
        else if(playerOne == 100){
            socketIO.sockets.emit('Win', "playerOne");
        }
        else if(playerTwo == 100){
            socketIO.sockets.emit('Win', "playerTwo");
        }
    });

    socket.on('playerTwo', function(data) {
        if(playerOne != 100 & playerTwo != 100){
            playerTwo ++;
            socketIO.sockets.emit('Score', [playerOne, playerTwo]);
        }
        else if(playerOne == 100){
            socketIO.sockets.emit('Win', "playerOne");
        }
        else if(playerTwo == 100){
            socketIO.sockets.emit('Win', "playerTwo");
        }
    });


    socket.on('red', function(data) {
        var buttonOn = "red1";
        console.log('red event heard');
        socketIO.sockets.emit('color_change', buttonOn);
    });

    socket.on('green', function(data) {
        var buttonOn = "green1";
        console.log('green event heard');
        socketIO.sockets.emit('color_change', buttonOn);
    });

    socket.on('blue', function(data) {
        var buttonOn = "blue1";
        console.log('blue event heard');
        socketIO.sockets.emit('color_change', buttonOn);
    });

    socket.on('red2', function(data) {
        var buttonOn = "red2";
        console.log('red2 event heard');
        socketIO.sockets.emit('color_change', buttonOn);
    });

    socket.on('green2', function(data) {
        var buttonOn = "green2";
        console.log('green2 event heard');
        socketIO.sockets.emit('color_change', buttonOn);
    });

    socket.on('blue2', function(data) {
        var buttonOn = "blue2";
        console.log('blue2 event heard');
        socketIO.sockets.emit('color_change', buttonOn);
    });
});



//finally, start server
server.listen(LISTEN_PORT);
console.log('listening to port: ' + LISTEN_PORT);