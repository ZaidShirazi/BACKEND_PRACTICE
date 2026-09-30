import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const userRoutes = express.Router();

//CRUD OPERATIONS

//1. CREATE USER
userRoutes.post("/", createUser);

//2. READ ALL USERS
userRoutes.get("/", getUsers);

//3. UPDATE USER
userRoutes.patch("/:id", updateUser);

//4. DELETE USER
userRoutes.delete("/:id", deleteUser);

export default userRoutes;
