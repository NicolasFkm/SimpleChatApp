const { Router } = require('express')
const app = Router();

app.get('/:id', (req, res) => {
    res.render("chatRoom", {
        chatName: req.params.id
    });
});

app.post('/join', (req, res) => {
    res.redirect(`${req.body.chatRoomName}`);
});

app.post('/send', (req, res) => {
    let { message, chatRoom } = req.body;
    
});

module.exports = app;