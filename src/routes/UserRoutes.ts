import { Router } from 'express';
import { CreateUser, GetUserById } from '../controllers/UserController';

const router = Router();

router.post('/', CreateUser);
router.get('/:id', GetUserById);

module.exports = router;