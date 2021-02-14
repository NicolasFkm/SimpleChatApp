import { HttpStatus } from "../helper/status";
import ChatService from "../services/ChatService";
import RoomService from "../services/RoomService";
import UserService from "../services/UserService";

const roomService = new RoomService();
const userService = new UserService();
const chatService = new ChatService();

export const GetChatRoom = async (req, res, next) => {
    try {
        res.render("chatRoom", {
            chatName: req.params.id
        });

    } catch (error) {
        console.error(error);

        res.status(HttpStatus.ERROR)
            .json({ error });
    }
}

export const GetChatRoomMessages = async (req, res, next) => {
    try {
        const { id } = req.params;
        const room = await roomService.getByName(id);
        let messages = await chatService.fetchMessages(room!);

        res.status(HttpStatus.SUCCESS)
            .json({ messages });

    } catch (error) {
        console.error(error);

        res.status(HttpStatus.ERROR)
            .json({ error });
    }
}