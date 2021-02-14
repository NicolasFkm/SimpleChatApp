import { DataTypes, NOW, Sequelize } from "sequelize";
import { Message } from "../models/Message";
import { Room } from "../models/Room";
import { User } from "../models/User";

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

Message.belongsTo(Room, {
    targetKey: "id"
});

Message.belongsTo(User, {
    targetKey: "id"
});

Room.hasMany(Message, {
    sourceKey: "id"
});

User.hasMany(Message, {
    sourceKey: "id"
});

Room.belongsToMany(User, {
    through: "Room_User"
});

User.belongsToMany(Room, {
    through: "Room_User"
});