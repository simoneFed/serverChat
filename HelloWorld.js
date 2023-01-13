
var http = require('http');
var WebSocketServer = require('websocket').server;
let personeCollegate = [];

var WebSocketServer = require('websocket').server;
const { client } = require('websocket');

var server = http.createServer(function(request, response) {

    response.writeHead(404);
    response.end();
});
server.listen(8080, function() {
});

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
  return true;
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      request.reject();
      //sbattuto fori 
      return;
    }
    
    var connection = request.accept(null, request.origin);
    console.log("si è connesso "+ connection.remoteAddress);
    personeCollegate.push(connection);
    connection.on('message', function(message) {
    
    console.log("sssssssssssssssss:"+personeCollegate.length);
    
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            
            for(i=0; i<=personeCollegate.length; i++){
              let persona = personeCollegate[i];
              console.log(i+" ====================== "+persona);
              persona.sendUTF(message.utf8Data);
            }
            
        }
        else if (message.type === 'binary') {
           // console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    
});

