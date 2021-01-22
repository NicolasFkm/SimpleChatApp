import { Router } from 'express';

const router = Router();

router.get('/:id', (req, res) => {
    try {
        res.render("chatRoom", {
            chatName: req.params.id
        });

    } catch (error) {
        console.error(error);
    }
});

router.post('/join', (req, res) => {
    try {
        res.redirect(`${req.body.chatRoomName}`);
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;