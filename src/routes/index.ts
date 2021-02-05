import { Router } from 'express';

const router = Router();

router.use("/chat", require("./ChatRoutes"));

router.get('/', (req, res) => {
    try {
        res.render("index");
    } catch (error) {
        console.error(error);
    }
});

router.all('*', (req, res) => {
    res.status(404).send({ msg: 'Not Found' });
});

module.exports = router;