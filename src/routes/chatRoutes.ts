import { Router } from 'express';

const router = Router();

import { GetChatRoom, GetChatRoomMessages } from '../controllers/ChatController';


router.get('/:id', GetChatRoom);
router.get('/:id/message', GetChatRoomMessages);

router.post('/join', (req, res) => {
    try {
        res.redirect(`${req.body.chatRoomName}`);
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;