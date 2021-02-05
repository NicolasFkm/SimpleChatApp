import { Model, DataTypes, Optional, HasManyAddAssociationMixin, HasManyCountAssociationsMixin, Association, HasManyGetAssociationsMixin } from "sequelize";
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
