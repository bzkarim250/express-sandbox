import StudentController from "../controllers/studentController";
import express from "express";

const studentRoute = express.Router();

studentRoute.post("/create", StudentController.createStudent);
studentRoute.get("/all", StudentController.getStudents);
studentRoute.get("/single/:id", StudentController.getStudentById);
studentRoute.put("/update/:id", StudentController.updateStudent);
studentRoute.delete("/delete/:id", StudentController.deleteStudent);

export default studentRoute;

