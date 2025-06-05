import express from 'express';
import {registerController} from '../../Controller/UserController/SignUpController.js';
import { Login } from '../../Controller/UserController/LoginController.js'; 
const router =express.Router();
router.post('/signup',registerController)
router.post('/login',Login)

export default router;

