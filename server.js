const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'pug');
app.set('views', './views');


app.get('/', (req, res) => {
    res.render('index');
});

io.on('connection', (socket) => {
    console.log('User connected');
    socket.broadcast.emit('hi');
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
      });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})

http.listen(3000, () => {
    console.log('listening on *:3000');
});