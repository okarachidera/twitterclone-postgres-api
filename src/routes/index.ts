import express from 'express'
import { register, login, confirmEmail, logout } from '../controllers/auth';
const router = express.Router();


router.post('/', register)
router.get('/verify/:token', confirmEmail)
router.post('/login', login)
router.post('/logout', logout)

export default router;
