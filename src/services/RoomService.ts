import { database } from '../helper/database';
import { Message } from '../models/Message';
import { Room } from '../models/Room';
import { User } from '../models/User';

export default class RoomService {
    async create(name: string): Promise<Room> {
        const room = await Room.create({ name });
        return room;
    }

    async addUser(room: Room, userId: number): Promise<User | null> {
        const user = await User.findByPk(userId);
        await room.addUser(user!, { through: {} });

        return user;
    }

    async getByName(name: string): Promise<Room | null> {
        const user = Room.findOne({ where: { name } });
        return user;
    }

    async getById(id: number): Promise<Room | null> {
        const room = await Room.findByPk(id);

        return room;
    }
}