import { Router } from 'express';
import { CreateMessage, GetMessageById } from '../controllers/MessageController';

const router = Router();

router.post('/', CreateMessage);
router.get('/:id', GetMessageById);

module.exports = router;