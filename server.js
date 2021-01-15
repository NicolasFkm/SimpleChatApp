const express = require('express');
const app = express();
const router = require("./routes");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))
app.use(router);
app.set('view engine', 'pug');
app.set('views', './views');

const http = require('http').createServer(app);
const ChatSocketService = require("./services/chatSocketService");

const chatSocket = new ChatSocketService(http);
const io = chatSocket.chatIO;

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});