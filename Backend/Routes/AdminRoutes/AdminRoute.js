import express from "express";
const router = express.Router();
import { verifyToken } from "../../Utilis/Token.js";

import {
  loginAdmin,
  logoutAdmin,
} from "../../Controllers/AdminControllers/AdminController.js";
import {
  addProduct,
  deleteProduct,
  getProducts,
} from "../../Controllers/ProductControllers/ProductController.js";

// Check session route
router.get("/check-session", (req, res) => {
  const token = req.cookies.token;
  const decoded = verifyToken(token);

  if (!decoded || decoded.role !== "admin") {
    return res.status(401).json({ loggedIn: false });
  }

  res.status(200).json({ loggedIn: true });
});

// login
router.post("/adminlogin", loginAdmin);

router.post("/logout", logoutAdmin);

router.post("/products", addProduct);

router.get("/products", getProducts);

router.put("/products/:id", deleteProduct);

export default router;
