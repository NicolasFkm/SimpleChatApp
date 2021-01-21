import { Router } from 'express';

const router = Router();

router.get('/:id', (req, res) => {
    res.render("chatRoom", {
        chatName: req.params.id
    });
});

router.post('/join', (req, res) => {
    res.redirect(`${req.body.chatRoomName}`);
});

router.post('/send', (req, res) => {
    let { message, chatRoom } = req.body;
    
});

module.exports = router;