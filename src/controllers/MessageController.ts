import { HttpStatus } from "../helper/status";
import MessageService from "../services/MessageService";
import RoomService from "../services/RoomService";

const messageService = new MessageService();
const roomService = new RoomService();

export const CreateMessage = async (req, res, next) => {
    try {
        const { chatRoomId, userId, text } = req.body;
        const message = await messageService.create(text, chatRoomId, userId);
        const room = await roomService.getById(chatRoomId);
        
        room?.addMessage(message);

        res.status(HttpStatus.SUCCESS)
            .json({ data: message });

    } catch (error) {
        console.error(error);

        res.status(HttpStatus.ERROR)
            .json({ error });
    }
}

export const GetMessageById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const message = await messageService.getById(id);

        if (message == null) {
            res.status(HttpStatus.NOT_FOUND);
        }
        else {
            res.status(HttpStatus.SUCCESS)
                .json({ data: message });
        }
    }
    catch (error) {
        console.error(error);

        res.status(HttpStatus.ERROR)
            .json({ error });
    }
}