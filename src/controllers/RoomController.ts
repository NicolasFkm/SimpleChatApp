import { HttpStatus } from "../helper/status";
import RoomService from "../services/RoomService";

const roomService = new RoomService();

export const CreateRoom = async (req, res, next) => {
    try {
        const { name } = req.body;
        console.log("[CreateRoom] body: " + JSON.stringify(req.body));
        console.log("[CreateRoom] name: " + req.body.name)
        const room = await roomService.create(name);

        res.status(HttpStatus.CREATED)
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
        console.log("[ADDUSER] userId ", userId);
        console.log("[ADDUSER] id ", id);
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