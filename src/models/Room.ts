import { Model, DataTypes, Optional, Association, HasManyGetAssociationsMixin, HasManyCountAssociationsMixin, BelongsToManyAddAssociationMixin } from "sequelize";
import { database } from "../helper/database";
import { Message } from "./Message";
import { User } from "./User";

export interface RoomAttributes {
	id: number;
	name: string;
}

export interface RoomCreationAttributes extends Optional<RoomAttributes, "id"> { }


export class Room extends Model<RoomAttributes, RoomCreationAttributes> {
	public id!: number;
	public name!: string;

	public messages?: Message[];
	public users?: User[];

	public getMessages!: HasManyGetAssociationsMixin<Message>;
	public getUsers!: HasManyGetAssociationsMixin<User>;
	public countUsers!: HasManyCountAssociationsMixin;
	public addUser!: BelongsToManyAddAssociationMixin<User, number>;
	public addMessage!: BelongsToManyAddAssociationMixin<Message, number>;

	public static associations: {
		users: Association<User, Room>,
		messages: Association<Message, Room>
	};
}
