import express from 'express';
import {register, login, logout} from '../controller/user.controller'; 

const router =express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/logout', logout);
// router.get('/profile',);

export default router;