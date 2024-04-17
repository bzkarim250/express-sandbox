import UserController from "../controllers/userController";
import express from "express";

const userRoute = express.Router();

userRoute.post("/signup", UserController.signUp);
userRoute.post("/login", UserController.login);

export default userRoute;