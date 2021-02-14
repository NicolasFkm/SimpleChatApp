import { Message } from "../models/Message";
import { Room } from "../models/Room";

export default class ChatService{
    async fetchMessages(room: Room): Promise<Message[]|undefined> {
        console.log("FETCH MESSAGES");
        let messages = room?.messages?.filter( message => {
            let date = new Date();
            date.setDate(date.getDate() -1);
            
            return message.createdAt > date;
        });
        console.log("room messages", room?.messages);
        console.log("filtered messages", messages);
        return messages;
    }
}