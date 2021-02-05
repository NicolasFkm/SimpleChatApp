import { Model,	DataTypes, Association,	Optional } from "sequelize";
import { database } from "../helper/database";
import { Room } from "./Room";
import { User } from "./User";

export interface MessageAttributes {
	id: number;
	text: string;
}

export interface MessageCreationAttributes extends Optional<MessageAttributes, "id"> { }

export class Message extends Model<MessageAttributes, MessageCreationAttributes> {
	public id!: number;
	public text!: string;
	
	public roomId!: number;
	public userId!: number;

	public static associations: {
		user: Association<Message, User>,
		room: Association<Room, User>
	};
}
