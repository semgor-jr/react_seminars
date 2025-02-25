const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const controller = require('./controllers/controller');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json()); 

app.get('/posts', controller.getAllPosts);
app.get('/posts/:id', controller.getPostById);


io.on('connection', (socket) => {
  console.log('Пользователь подключился:', socket.id);

  socket.on('chat message', (msg) => {
    io.emit('chat message', { sender: socket.id, message: msg });
  });

  socket.on('disconnect', () => {
    console.log('Пользователь отключился:', socket.id);
  });
});


const port = 3000;
server.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});