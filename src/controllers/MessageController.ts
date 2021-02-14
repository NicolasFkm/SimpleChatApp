import { HttpStatus } from "../helper/status";
import MessageService from "../services/MessageService";

const messageService = new MessageService();

export const CreateMessage = async (req, res, next) => {
    try {
        const { chatRoomId, userId, text } = req.body;

        console.log("CREATE MESSAGE", chatRoomId, userId, text);
        
        const message = await messageService.create(text, chatRoomId, userId);
        
        console.log("MESSAGE", message);

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