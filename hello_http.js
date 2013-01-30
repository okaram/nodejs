var http = require('http');
var num=0;
var server = http.createServer(function(req, res) {
    res.writeHead(200);
    num=num+1
    res.end('Hello Http'+num);
});
server.listen(8080);