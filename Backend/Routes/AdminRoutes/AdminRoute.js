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
  editProduct,
  getProducts,
  indvidualProduct,
  UpdateProduct
} from "../../Controllers/ProductControllers/ProductController.js";

router.get("/check-session", (req, res) => {
  const token = req.cookies.token;
  const decoded = verifyToken(token);
  if (!decoded || decoded.role !== "admin") {
    return res.status(401).json({ loggedIn: false });
  }

  res.status(200).json({ loggedIn: true });
});

router.post("/adminlogin", loginAdmin);

router.post("/logout", logoutAdmin);

router.post("/products", addProduct);

router.get("/products", getProducts);
router.get("/IndvidualProduct/:id", indvidualProduct);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id", editProduct);
router.put("/UpdateProduct/:id", UpdateProduct);


export default router;
