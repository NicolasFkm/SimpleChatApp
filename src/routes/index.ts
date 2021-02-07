import { Router } from 'express';
import { HttpStatus } from '../helper/status';

const router = Router();

router.use("/chat", require("./ChatRoutes"));
router.use("/message", require("./MessageRoutes"));
router.use("/user", require("./UserRoutes"));
router.use("/room", require("./RoomRoutes"));

router.get('/', (req, res) => {
    try {
        res.render("index");
    } catch (error) {
        console.error(error);
    }
});

router.all('*', (req, res) => {
    res.status(HttpStatus.NOT_FOUND).send({ msg: 'Not Found' });
});

module.exports = router;