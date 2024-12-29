import express from 'express';
import {register, login, logout, profile,googleLogin} from '../controller/user.controller'; 
// import authMiddleware from "../middleware/auth.middleware";

const router =express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/logout', logout);
router.get('/profile',profile);
router.post('/google',googleLogin)

export default router;