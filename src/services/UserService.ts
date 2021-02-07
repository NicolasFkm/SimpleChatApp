import { Message } from '../models/Message';
import { User } from '../models/User';

export default class UserService {
    async create(name: string): Promise<User> {
        const user = await User.create({ name });
        return user;
    }

    async getByName(name: string): Promise<User | null> {
        const user = await User.findOne({ where: { name } });
        return user;
    }
    
    async getById(id: number): Promise<User | null> {
        const user = await User.findByPk(id);
        return user;
    }

    async getMessages(userId: number): Promise<Message[] | undefined> {
        const user = await User.findByPk(userId);
        return user?.messages;
    }
}