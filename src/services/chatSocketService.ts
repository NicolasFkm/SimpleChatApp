import { Server, Socket } from "socket.io";

export default class ChatSocketService {
    chatIO: Server;

    constructor(http) {
        this.chatIO = new Server(http);
    }

    StartService(){
        
        this.chatIO.on('connection', (socket:Socket) => {
            let room = socket.handshake.query['room'];
            let username = socket.handshake.query['username'];
            let roomName = room.replace(/\//g, "-");
            
            socket.join(roomName);

            this.chatIO.to(roomName).emit('join', username)
            
            socket.on('chat message', (msg) => {
                this.chatIO.to(roomName).emit('chat message', msg);
            });

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });
    }
}