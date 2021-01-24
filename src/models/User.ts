import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../helper/database";
import { Message } from "./Message";

export class User extends Model {
    public id!: number;
    public name!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

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
      sequelize: database
    }
);

User.hasMany(Message);