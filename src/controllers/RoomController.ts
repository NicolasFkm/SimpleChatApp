import { HttpStatus } from "../helper/status";
import RoomService from "../services/RoomService";

const roomService = new RoomService();

export const CreateRoom = async (req, res, next) => {
    try {
        const { name } = req.body;
        const [room, created] = await roomService.create(name);

        const status = created? HttpStatus.CREATED:HttpStatus.SUCCESS;

        res.status(status)
            .json({ data: room });
    } catch (error) {
        console.error(error);

        res.status(500)
            .json(error);
    }
}

export const GetRoomById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const room = await roomService.getById(id);

        if (room == null) {
            res.status(HttpStatus.NOT_FOUND);
        }
        else {
            res.status(HttpStatus.SUCCESS)
                .json({ data: room });
        }
    } catch (error) {
        console.error(error);

        res.status(500)
            .json(error);
    }
}

export const AddUser = async (req, res, next) => {
    try {
        const { userId } = req.body;
        const { id } = req.params;
        const room = await roomService.getById(id);
        const user = await roomService.addUser(room!, userId);

        res.status(HttpStatus.SUCCESS)
            .json({ data: user });
    }
    catch (error) {
        console.error(error);

        res.status(500)
            .json(error);
    }
}