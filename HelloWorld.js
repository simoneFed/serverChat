var http = require('http');
let contatore=0;

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  CONTATORE+=1;
  res.end(contatore+1+"");
}).listen(7000); 

