import express from "express";
import User from "../../models/users/User.js";

const router = express.Router();


router.get("/getalluser", async (req, res) => {
  try {
    const users = await User.find();
    // Using modelName and doing .find() method will give you all users in
    //  an array
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});


// ✅ Get user by ID
router.get("/getuser/:id", async (req, res) => {
  try {
    const { id } = req.params; // extract id from URL
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});


router.post("/signup", async (req, res) => {
  try {
    // const fullName = req.body.fullName;
    // const email = req.body.email;
    // const phone = req.body.phone;
    // const age = req.body.age;

      // or we can write like this to extract all fields from the body

    const { fullName, email, phone, age } = req.body;
    console.log(fullName, email, phone, age);

    
    // ! means if the field is not present, return the error
    // || means or


    if (!fullName || !email || !phone || !age) {
      return res.status(400).json({ success: false, msg: "All fields required" });
    }

    const existingUser = await User.findOne({ email : email });
    console.log(existingUser);


    if (existingUser) {
      return res.status(400).json({ success: false, msg: "User already exists" });
    }

    const newUser = await User.create({ fullName, email, phone, age });

    res.status(201).json({ success: true, msg: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});


router.put("/updateuser/:id", async (req, res) => {
  try {
 
    // const id = req.params.id; this is old way to get the id

    // console.log(id);

    const { id } = req.params; // this is new way to get the id
    console.log(id);

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    res.status(200).json({ success: true, msg: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});


router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const deletedUser = await User.findByIdAndDelete(id);
    console.log(deletedUser);

    if (!deletedUser) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    res.status(200).json({ success: true, msg: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

export default router;