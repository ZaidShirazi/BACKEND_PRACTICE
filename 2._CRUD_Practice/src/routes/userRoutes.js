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
        message: errorMessage,
      });
    }
  }
});

export default userRoutes;
