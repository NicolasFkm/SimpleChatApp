import express from 'express';
import bodyParser from "body-parser";
import ChatSocketService from "./services/chatSocketService";
import path from "path";
import dotenv from 'dotenv';


dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))
app.use(require("./routes"));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

const http = require('http').createServer(app);

const chatSocket = new ChatSocketService(http);
chatSocket.StartService();

const PORT = process.env.PORT || 3000;

console.log(process.env);

http.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});