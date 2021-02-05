import { database } from "../helper/database";

const Room_User = database.define('User_Profile',
    {},
    {
        timestamps: false
    });
