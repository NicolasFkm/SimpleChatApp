import { HttpStatus } from "../helper/status";
import UserService from "../services/UserService";

const userService = new UserService();

export const CreateUser = async (req, res, next) => {
    try {
        const { name } = req.body;
        const user = await userService.create(name);

        res.status(HttpStatus.CREATED)
            .json({ data: user });
    } catch (error) {
        console.error(error);

        res.status(HttpStatus.ERROR)
            .json(error);
    }
}

export const GetUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userService.getById(id);

        res.status(HttpStatus.SUCCESS)
            .json({ data: user });
    } catch (error) {
        console.error(error);

        res.status(HttpStatus.ERROR)
            .json(error);
    }
}