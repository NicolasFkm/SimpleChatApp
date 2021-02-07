import express from 'express';
import bodyParser from "body-parser";
import path from "path";
require("dotenv").config();
import ChatSocketService from "./services/ChatSocketService";
import { database } from './helper/database';
import UserService from './services/UserService';
import MessageService from './services/MessageService';
import RoomService from './services/RoomService';

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
(async () => {
    try {
        database.authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch((err) => {
                console.log('Unable to connect to the database:', err);
            });

        await database.sync();

        http.listen(PORT, () => {
            console.log(`listening on ${PORT}`);
        });

    }
    catch (error) {
        console.log(error);

    }
})();