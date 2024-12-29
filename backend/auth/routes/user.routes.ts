import express from 'express';
import {register, login, logout, profile,googleAuthRedirect,googleAuthCallback} from '../controller/user.controller';

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/logout', logout);
router.get('/profile',profile);
router.get('/google',googleAuthRedirect)
router.get('/google/callback',googleAuthCallback)

export default router;