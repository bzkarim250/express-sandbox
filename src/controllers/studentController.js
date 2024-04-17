import Student from '../models/Student';

class StudentController {
    static async createStudent(req, res) {
        try {
            const { name, age } = req.body;
            const newStudtent={
                name,
                age
            }
        const student = await Student.create(newStudtent);
        return res.status(201).json({ student });
        } catch (err) {
        return res.status(500).json({ error: err });
        }
    }
    
    static async getStudents(req, res) {
        try {
        const students = await Student.find();
        return res.status(200).json({ students });
        } catch (err) {
        return res.status(500).json({ error: err });
        }
    }
    
    static async getStudentById(req, res) {
        try {
        const { id } = req.params;
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        return res.status(200).json({ student });
        } catch (err) {
        return res.status(500).json({ error: err });
        }
    }
    
    static async updateStudent(req, res) {
        try {
        const { id } = req.params;
        const student = await Student.findByIdAndUpdate(id, req.body, { new: true });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        return res.status(200).json({ student });
        } catch (err) {
        return res.status(500).json({ error: err });
        }
    }
    
    static async deleteStudent(req, res) {
        try {
        const { id } = req.params;
        const student = await Student.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        return res.status(204).send();
        } catch (err) {
        return res.status(500).json({ error: err });
        }
    }
}

export default StudentController;