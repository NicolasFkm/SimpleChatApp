import { Message } from '../models/Message';
import { Room } from '../models/Room';
import { User } from '../models/User';

export default class RoomService {
    async create(name: string): Promise<Room> {
        const room = await Room.create({ name });
        return room;
    }

    async addUser(room: Room, user: User): Promise<boolean> {
        try {
            await room.addUser(user, { through: {} });
            return true;
        }
        catch (e) {
            return false;
        }
    }

    async getByName(name: string): Promise<Room | null> {
        const user = Room.findOne({ where: { name } });
        return user;
    }

    async getMessages(roomId: number): Promise<Message[] | undefined> {
        const room = await Room.findByPk(roomId);
        return room?.messages;
    }
}