import { all } from "sequelize/types/lib/operators";
import { Message } from "../models/Message";
import { Room } from "../models/Room";

export default class ChatService{
    async fetchMessages(room: Room): Promise<Message[]|undefined> {
        console.log("FETCH MESSAGES");

        let roomMessages = await room?.getMessages({include: [{all: true}]});

        let messages = roomMessages?.filter( message => {
            let date = new Date();
            date.setDate(date.getDate() -1);
            
            return message.createdAt > date;
        });
        
        return messages;
    }
}