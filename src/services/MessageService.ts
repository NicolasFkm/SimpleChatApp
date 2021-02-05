import { Message } from '../models/Message';
import { Room } from '../models/Room';
import { User } from '../models/User';

export default class MessageService {
    async create(text: string, roomId: number, userId: number): Promise<Message> {
        const message = await Message.create(
            { 
                text
            }
            );
        const user = await User.findByPk(userId);
        user?.createMessage(message);
        
        const room = await Room.findByPk(roomId);
        room?.addMessage(message);
        
        return message;
    }

    async getAll(): Promise<Message[]> {
        const messages = await Message.findAll();
        return messages;
    }

    async getById(): Promise<Message[]> {
        const messages = await Message.findAll();
        return messages;
    }
}