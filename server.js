const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let students = [
    {
        id: 101,
        name: "Rahul Sharma",
        email: "rahul@gmail.com",
        course: "CSE",
        age: 21
    },
    {
        id: 102,
        name: "Aman Verma",
        email: "aman@gmail.com",
        course: "IT",
        age: 20
    },
    {
        id: 103,
        name: "Priya Singh",
        email: "priya@gmail.com",
        course: "ECE",
        age: 22
    }
];

app.get("/", (req, res) => {
    res.send("Student Management API is Running!");
});

app.post("/api/students", (req, res) => {
    const { id, name, email, course, age } = req.body;

    if (
        id === undefined ||
        !name ||
        !email ||
        !course ||
        age === undefined
    ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    if (students.some(student => student.id === id)) {
        return res.status(409).json({
            message: "Student ID already exists"
        });
    }

    const newStudent = { id, name, email, course, age };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});

app.get("/api/students", (req, res) => {
    res.status(200).json({
        message: "Student records fetched successfully",
        students: students
    });
});

app.put("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, email, course, age } = req.body;

    if (!name || !email || !course || age === undefined) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    student.name = name;
    student.email = email;
    student.course = course;
    student.age = age;

    res.status(200).json({
        message: "Student updated successfully",
        student: student
    });
});

app.delete("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(index, 1);

    res.status(200).json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});