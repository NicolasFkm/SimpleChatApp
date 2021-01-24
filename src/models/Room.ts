import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../helper/database";
import { Message } from "./Message";
import { User } from "./User";

export class Room extends Model {
    public id!: number;
    public name!: string;
    public readonly createdAt!: Date;
}

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
      sequelize: database
    }
);

Room.hasMany(Message);