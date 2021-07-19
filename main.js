#!/usr/bin/env node
var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function (request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8080, function () {
    console.log((new Date()) + ' Server is listening on port 8080');
});

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

let clients = [];

wsServer.on('request', function (request) {
    console.log((new Date()) + ' Connection accepted.');

    const connection = request.accept('echo-protocol', request.origin);
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            clients.forEach(x => x.sendUTF(message.utf8Data));
            console.log('Received Message: ' + message.utf8Data);
        }
    });

    connection.on('close', function (reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
        clients = clients.filter(x => x !== connection);
        console.log(clients.length)
    });

    clients.push(connection);
});