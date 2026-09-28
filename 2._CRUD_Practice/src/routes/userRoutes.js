import express from "express";
import User from "../models/userModel.js";

const userRoutes = express.Router();

//CRUD OPERATIONS

//1. CREATE USER
userRoutes.post("/", async (req, res) => {
  try {
    const { name, age, email, password } = req.body;

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(409).json({
        success: false,
        message: "User already exists in database!",
        data: null,
      });
    }

    const user = new User({
      name,
      age,
      email,
      password,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error.message);

    if (error.name === "ValidationError") {
      /* Extract validation error message/messages from mongoose */
      const errorMessage = Object.values(error.errors)
        .map((errorObj) => errorObj.message)
        .join(", ");

      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }
  }
});

//2. READ ALL USERS
userRoutes.get("/", async (_req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Users not found",
      data: null,
    });
  }
});

export default userRoutes;
