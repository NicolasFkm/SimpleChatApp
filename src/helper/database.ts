import path from "path"

const Sequelize = require('sequelize');

export const database = new Sequelize({
    dialect: "mysql",
    database: process.env.DATABASE_DB,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    models: [path.join(__dirname, "../models")],
    pool: {
        max: 5,
        min: 0,
        idle: 20000,
        acquire: 20000
    }
});