import { Server } from "socket.io";

export default class ChatSocketService {
    chatIO: Server;

    constructor(http) {
        this.chatIO = new Server(http);

        this.chatIO.on('connection', (socket) => {
            console.log("connected", socket.id)
            console.log('User connected');
            socket.on('chat message', (msg) => {
                this.chatIO.emit('chat message', msg);
            });

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });
    }
}