const { Router } = require('express')
const app = Router();

app.use("/chat", require("./chatRoutes"));

app.get('/', (req, res) => {
    res.render("index");
});

module.exports = app;