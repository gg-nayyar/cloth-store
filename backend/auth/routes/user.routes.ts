import express from 'express';
import { authMiddleware } from "../middleware/auth.middleware";
import {register, login, logout, profile,getUserbyId,googleAuthRedirect,googleAuthCallback} from '../controller/user.controller';

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/logout', logout);
router.get('/profile',authMiddleware,profile);
router.get('/getUserbyId/:id',getUserbyId);
router.get('/google',googleAuthRedirect)
router.get('/google/callback',googleAuthCallback)

export default router;