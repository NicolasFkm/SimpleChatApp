import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../helper/database";
import { Room } from "./Room";
import { User } from "./User";

export class Message extends Model {
    public id!: number;
    public text!: string;
    public readonly createdAt!: Date;
}

Message.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      idUser: {
        type: DataTypes.INTEGER.UNSIGNED
      },
      idRoom: {
        type: DataTypes.INTEGER.UNSIGNED
      },
      text: {
        type: new DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: "messages",
      sequelize: database
    }
);

Message.belongsTo(Room);
Message.belongsTo(User);