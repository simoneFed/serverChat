
var http = require('http');
const { prependListener } = require('process');
var WebSocketServer = require('websocket').server;
let personeCollegate = [];
let persona;
let listaPersone ="";

var WebSocketServer = require('websocket').server;
const { client } = require('websocket');

var server = http.createServer(function (request, response) {

  response.writeHead(404);
  response.end();
});
server.listen(8080, function () {
});

wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
});

function originIsAllowed(origin) {
  return true;
}

wsServer.on('request', function (request) {
  if (!originIsAllowed(request.origin)) {
    request.reject();
    //sbattuto fori 
    return;
  }

  var connection = request.accept(null, request.origin);
  
  console.log("si è connesso " + connection.remoteAddress);
  personeCollegate.push(connection);
  connection.on('message', function (message) {

    console.log("le persone collegate sono:" + personeCollegate.length);

    if (message.type === 'utf8') {
      console.log('Received Message: ' + message.utf8Data);
      for (i = 0; i <= personeCollegate.length - 1; i++) {
        persona = personeCollegate[i];
        console.log(i + "===" + persona);
        persona.sendUTF(message.utf8Data);
      }

    }
    connection.on("close", function () {
      persona.sendUTF(message.utf8Data);
      for (let i = 0; i < personeCollegate.length; i++) {
        if (this == personeCollegate[i]) {
          personeCollegate.splice(i, 1);          
        }
      }
    });

  });
});

