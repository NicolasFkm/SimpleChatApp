import { Model, DataTypes, Association, Optional, HasOneGetAssociationMixin, BuildOptions, NOW, BelongsToGetAssociationMixin } from "sequelize";
import { database } from "../helper/database";
import { Room } from "./Room";
import { User } from "./User";

export interface MessageAttributes {
	id: number;
	text: string;

	createdAt: Date;
	updatedAt: Date;
}

export interface MessageCreationAttributes extends Optional<MessageAttributes, "id"> { }

export class Message extends Model<MessageAttributes, MessageCreationAttributes> {
	public id!: number;
	public text!: string;

	public roomId!: number;
	public userId!: number;

	public createdAt!: Date;
	public updatedAt!: Date;
	public user!: User

	public getUser!: BelongsToGetAssociationMixin<User>;
	public getRoom!: BelongsToGetAssociationMixin<Room>;

	public static associations: {
		user: Association<Message, User>,
		room: Association<Room, User>
	};
}

export const initMessage = () => {

	Message.init(
		{
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				autoIncrement: true,
				primaryKey: true
			},
			text: {
				type: new DataTypes.STRING(255),
				allowNull: false,
			},
			createdAt: {
				type: DataTypes.DATE,
				defaultValue: NOW
			},
			updatedAt: {
				type: DataTypes.DATE,
				defaultValue: NOW
			}
		},
		{
			tableName: "messages",
			timestamps: false,
			sequelize: database
		}
	);

	
}

export const associateMessage = () => {
	Message.belongsTo(Room);
	
	Message.belongsTo(User);
};