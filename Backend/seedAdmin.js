// seedAdmin.js
import mongoose from "mongoose";
import Admin from "./Database/AdminModels/AdminModel.js";
async function createAdmin() {
  await mongoose.connect(
    "mongodb+srv://amnakhan3756:AM%402003@grocerystore.wk2r7sc.mongodb.net/"
  );
  const existing = await Admin.findOne({ email: "AM@gmail.com" });
  if (!existing) {
    const admin = new Admin({
      email: "AM@gmail.com",
      password: "AM@2003",
    });
    await admin.save();
    console.log("Admin created");
  } else {
    console.log("Admin already exists");
  }

  mongoose.disconnect();
}

createAdmin();
