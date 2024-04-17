import studentRoute from "./studentRoutes";
import express from "express";

const route = express.Router();

route.use("/student", studentRoute);

export default route;