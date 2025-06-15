import express from 'express';
import {registerController} from '../../Controllers/UserController/SignUpController.js';
import { Login,fetchUser,EditMember } from '../../Controllers/UserController/LoginController.js'; 
import { verifyToken } from '../../Utilis/Token.js';
const router =express.Router();
router.get("/check-session", (req, res) => {
  const token = req.cookies.token;
  const decoded = verifyToken(token);
  
  if (!decoded || (decoded.role !== "User" && decoded.role !== "admin")) {
    return res.status(401).json({ loggedIn: false });
  }

  res.status(200).json({ loggedIn: true });
});
router.get("/indvidual/:email",fetchUser)
router.post('/signup',registerController)
router.post('/login',Login)
router.put('/editMember/:email',EditMember);

export default router;

