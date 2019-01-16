'use strict';

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use(express.static('client'));

app.get('/hola-mundo', (req, res) => {
  res.status(200).send('Hola mundo desde una ruta');
});

var messages = [
  {
    id: 1,
    text:
      'Bienvenido al chat privado de Socket.io y NodeJs de Juan Carlos Guerrero Programador software',
    nickname: 'BOT - juan carlos'
  }
];

io.on('connection', socket => {
  console.log(
    'El nodo con IP: ' + socket.handshake.address + ' se ha conectado...'
  );
  socket.emit('messages', messages);

  socket.join('add-message', function(data) {
    messages.push(data);

    io.sockets.emit('message', messages);
  });
});

server.listen(6677, () => {
  console.log('Servidor está funcionando en htpp://localhost:6677');
});
