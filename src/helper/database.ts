import { DataTypes, NOW, Sequelize } from "sequelize";
import { associateMessage, initMessage, Message } from "../models/Message";
import { associateRoom, initRoom, Room } from "../models/Room";
import { associateUser, initUser, User } from "../models/User";

export const database = new Sequelize(process.env.DATABASE_DB!, process.env.DATABASE_USERNAME!, process.env.DATABASE_PASSWORD, {
    dialect: "mysql",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT!),
    pool: {
        max: 5,
        min: 0,
        idle: 20000,
        acquire: 20000
    }
});

initMessage();
initUser();
initRoom();
associateMessage();
associateUser();
associateRoom();