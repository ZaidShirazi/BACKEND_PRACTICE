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
      count: users.length,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Users not found in database",
      data: null,
    });
  }
});

//3. UPDATE USER
userRoutes.patch("/:id", async (req, res) => {
  try {
    const { name, age, email, password } = req.body;
    const { id } = req.params;

    const userToBeUpdate = {};
    if (name) userToBeUpdate.name = name;
    if (age) userToBeUpdate.age = age;
    if (email) userToBeUpdate.email = email;
    if (password) userToBeUpdate.password = password;

    if (Object.keys(userToBeUpdate).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body is missing or empty!",
        data: null,
      });
    }

    /* 
      By default, MongoDB returns the document before the update happened. (new: true) forces the method to return the freshly updated document.

      Mongoose only validates data patterns when you create a document, not when you update it. (runValidators: true) forces Mongoose to check your schema rules against the new data before saving it.
    */

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: userToBeUpdate }, // called update
      { new: true, runValidators: true, select: "-password" }, // called options
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: `User not found with this ${id}`,
        data: null,
      });
    }

    /* There are two options to strip password/sensitive key from mongoose object */

    /* OPTION 1: select: "-password" */
    /* OPTION 2:
    Convert to a plain object first before deleting password key.
    const updatedUserObj = updatedUser.toObject();
    delete updatedUserObj.password;
    */

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
  }
});

//4. DELETE USER
userRoutes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      res.status(400).json({
        success: false,
        message: "Invalid Id! User not found in database",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: null,
    });
  } catch (error) {
    console.error(error.message);
  }
});

export default userRoutes;
