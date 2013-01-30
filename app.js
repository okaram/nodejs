var app = require('http').createServer(handler);

var io = require('socket.io').listen(app)
  , fs = require('fs');

app.listen(8080);


function handler (req, res) {
    console.log(req.url);

  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
    console.log('got other event !!!');
  });

  socket.on('login', function (data) {
    console.log('login');
    console.log(data);
  });

});
