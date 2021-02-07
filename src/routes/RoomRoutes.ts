import { Router } from 'express';
import { AddUser, CreateRoom, GetRoomById } from '../controllers/RoomController';

const router = Router();

router.post('/', CreateRoom);
router.get('/:id', GetRoomById);
router.post('/:id/user', AddUser);

module.exports = router;