import { Model, DataTypes, Optional, HasManyAddAssociationMixin, HasManyCountAssociationsMixin, Association, HasManyGetAssociationsMixin } from "sequelize";
import { database } from "../helper/database";
import { Message } from "./Message";
import { Room } from "./Room";

export interface UserAttributes {
	id: number;
	name: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }

export class User extends Model<UserAttributes, UserCreationAttributes> {
	public id!: number;
	public name!: string;

	public messages?: Message[];
	public rooms?: Room[];

	public createMessage!: HasManyAddAssociationMixin<Message, number>;
	public countMessage!: HasManyCountAssociationsMixin;
	public getMessages!: HasManyGetAssociationsMixin<Message>;

	public static associations: {
		messages: Association<User, Message>;
	};
}

export const initUser = () => {


	User.init(
		{
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: new DataTypes.STRING(128),
				allowNull: false,
			},
		},
		{
			tableName: "users",
			timestamps: true,
			sequelize: database
		}
	);
} 

export const associateUser = () => {
	User.hasMany(Message, {
		sourceKey: "id"
	});


	User.belongsToMany(Room, {
		through: "Room_User"
	});
};