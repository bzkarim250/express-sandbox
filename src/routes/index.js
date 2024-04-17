import studentRoute from "./studentRoutes";
import userRoute from "./userRoutes";
import express from "express";

const route = express.Router();

route.use("/student", studentRoute);
route.use("/user", userRoute);

export default route;