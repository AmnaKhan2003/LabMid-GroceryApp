import Admin from "../../Database/AdminModels/AdminModel.js";
import bcrypt from "bcryptjs";
import { sendAdminToken } from "../../Utilis/Token.js";

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    sendAdminToken(res, "admin", "Login successful", 200);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const logoutAdmin = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out" });
};
