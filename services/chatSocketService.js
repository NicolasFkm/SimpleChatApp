class ChatSocketService {
    constructor(http) {
        this.chatIO = require('socket.io')(http);

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


module.exports = ChatSocketService;