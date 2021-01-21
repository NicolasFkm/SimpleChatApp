import { Router } from 'express';

const router = Router();

router.use("/chat", require("./chatRoutes"));

router.get('/', (req, res) => {
    res.render("index");
});

module.exports = router;