import { all } from 'sequelize/types/lib/operators';
import { database } from '../helper/database';
import { Message } from '../models/Message';
import { Room } from '../models/Room';
import { User } from '../models/User';

export default class RoomService {
    async create(name: string): Promise<[Room, boolean]> {
        const room = await Room.findOrCreate({ where: {name}})
        return room;
    }

    async addUser(room: Room, userId: number): Promise<User | null> {
        const user = await User.findByPk(userId);
        await room.addUser(user!, { through: {} });

        return user;
    }

    async getByName(name: string): Promise<Room | null> {
        const room = await Room.findOne({ where: { name: `/chat/${name}` }, include: [{all: true}] });
        return room;
    }

    async getById(id: number): Promise<Room | null> {
        const room = await Room.findByPk(id);

        return room;
    }
}