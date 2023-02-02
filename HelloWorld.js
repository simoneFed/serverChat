
var http = require('http');
const { prependListener } = require('process');
const { measureMemory } = require('vm');
var WebSocketServer = require('websocket').server;
let personeCollegate = [];
let utenti = "";
let persona;
let listaPersone = "";

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
  connection.on('message', function (message) {
    if (message.utf8Data.split("|")[0] == "msg"){
      //mando il messaggio a tutti



    }else if (message.utf8Data.split("|")[2] == "root") {
      connection.nome = message.utf8Data.split("|")[1];
      personeCollegate.push(connection);
      //console.log("le persone collegate sono:" + personeCollegate.length);
      //console.log("ha eseguito l'accesso l'utente: " + message.utf8Data.split("|")[1]);

      connection.sendUTF("lista" + connection.nome);
      if (message.type === 'utf8') {
        //console.log(personeCollegate);
        for (let i = 0; i < personeCollegate.length; i++) {
          utenti += "|" + personeCollegate[i].nome;
        }
        for (let c = 0; c <= personeCollegate.length - 1; c++) {
          persona = personeCollegate[c];
          persona.sendUTF("auth|benvenuto");
          persona.sendUTF("lista" + utenti);
        }
        utenti ="";
      }
      connection.on("close", function () {
        persona.sendUTF(message.utf8Data);
        for (let i = 0; i < personeCollegate.length; i++) {
          if (this == personeCollegate[i]) {
            personeCollegate.splice(i, 1);
            UntentiCollegati.splice(i, 1);
          }
        }
      });
    } else {
      connection.sendUTF("auth|fallito");
    }
  });
});

