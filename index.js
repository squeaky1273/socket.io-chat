const { emit } = require('process');

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  io.emit('chat message', 'a user connected');
  socket.on('disconnect', () => {
    io.emit('chat message', 'user disconnected');
  });

  // show "User is typing" message when someone is typing
  socket.on('user typing', (typingMsg) => {
    io.emit('user typing', typingMsg);
  });

    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

http.listen(3000, () => {
  console.log('listening on *:3000');
});