import { HttpStatus } from "../helper/status";
import { User } from "../models/User";
import RoomService from "../services/RoomService";
import UserService from "../services/UserService";

const userService = new UserService();
const roomService = new RoomService();

export const CreateUser = async (req, res, next) => {
    try {
        const { name, roomId } = req.body;
        let [user, created] : [User|undefined, boolean] = await userService.create(name);
        const room = await roomService.getById(roomId);
        const status = created? HttpStatus.CREATED: HttpStatus.SUCCESS;

        room?.addUser(user);

        res.status(status)
            .json({ data: user });
    } catch (error) {
        console.error(error);

        res.status(HttpStatus.ERROR)
            .json(error);
    }
}

export const GetUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userService.getById(id);

        res.status(HttpStatus.SUCCESS)
            .json({ data: user });
    } catch (error) {
        console.error(error);

        res.status(HttpStatus.ERROR)
            .json(error);
    }
}