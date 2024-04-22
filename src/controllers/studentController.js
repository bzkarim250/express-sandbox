import Student from "../models/Student";

class StudentController {
  static async createStudent(req, res) {
    try {
      const { name, age } = req.body;
      const newStudent = { name, age };
      const student = await Student.create(newStudent);
      return res
        .status(201)
        .json({
          status: 201,
          message: "Student created successfully",
          data: { student },
        });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "Internal server error", error: error.message });
    }
  }

  static async getStudents(req, res) {
    try {
      const students = await Student.find();
      return res
        .status(200)
        .json({
          status: 200,
          message: "Students retrieved successfully",
          data: { students },
        });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "Internal server error", error: error.message });
    }
  }

  static async getStudentById(req, res) {
    try {
      const { id } = req.params;
      const student = await Student.findById(id);
      if (!student) {
        return res
          .status(404)
          .json({ status: 404, message: "Student not found" });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Student retrieved successfully",
          data: { student },
        });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "Internal server error", error: error.message });
    }
  }

  static async updateStudent(req, res) {
    try {
      const { id } = req.params;
      const student = await Student.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!student) {
        return res
          .status(404)
          .json({ status: 404, message: "Student not found" });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Student updated successfully",
          data: { student },
        });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "Internal server error", error: error.message });
    }
  }

  static async deleteStudent(req, res) {
    try {
      const { id } = req.params;
      const student = await Student.findByIdAndDelete(id);
      if (!student) {
        return res
          .status(404)
          .json({ status: 404, message: "Student not found" });
      }
      return res
        .status(204)
        .json({ status: 204, message: "Student deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "Internal server error", error: error.message });
    }
  }
}

export default StudentController;
