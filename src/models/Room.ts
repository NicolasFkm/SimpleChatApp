import { Model, DataTypes, Optional, Association, HasManyGetAssociationsMixin, HasManyCountAssociationsMixin, BelongsToManyAddAssociationMixin, HasManyAddAssociationMixin } from "sequelize";
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
	public addMessage!: HasManyAddAssociationMixin<Message, number>;

	public static associations: {
		users: Association<User, Room>,
		messages: Association<Message, Room>
	};
}

export const initRoom = () => {
	Room.init(
		{
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				autoIncrement: true,
				primaryKey: true
			},
			name: {
				type: new DataTypes.STRING(255),
				allowNull: false,
			},
		},
		{
			tableName: "rooms",
			timestamps: true,
			sequelize: database
		}
	);


}

export const associateRoom = () => {
	Room.hasMany(Message);

	Room.belongsToMany(User, {
		through: "Room_User"
	});
};