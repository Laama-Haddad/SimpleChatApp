const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', socket => {
  console.log('A user connected!');

  socket.on('message', data => {
    console.log(`Message received: ${data}`);
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected!');
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
