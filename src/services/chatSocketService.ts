import { Server, Socket } from "socket.io";
import { Server as HttpServer } from 'http';

export default class ChatSocketService {
    chatIO: Server;

    constructor(http: HttpServer) {
        this.chatIO = new Server(http);
    }

    StartService = () => {
        try {
            this.chatIO.on('connection', this.ConfigureConnection);
        } catch (error) {
            console.error(error);
        }
    }

    ConfigureConnection = (socket: Socket) => {
        let room = socket.handshake.query['room'];
        let username = socket.handshake.query['username'];
        let roomName = room.replace(/\//g, "-");

        socket.join(roomName);

        this.SendJoinRoomEvent(roomName, username);

        socket.on('chat message', (msg) => {
            this.chatIO.to(roomName).emit('chat message', msg);
        });

        socket.on('disconnect', () => {
            console.log(`User ${username} disconnected.`)
        });
    }

    SendJoinRoomEvent = (roomName: string, username: string) => {
        console.log(`New connection: ${username} joined room ${roomName}.`);
        this.chatIO.to(roomName).emit('joined', username);
    }
}