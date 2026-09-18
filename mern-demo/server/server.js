const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Student = require("./models/Student");

// Đọc file .env ở thư mục /workspaces/cloud-lab/.env
dotenv.config({ path: "../.env" });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ==================== TEST API ====================

app.get("/api/hello", (req, res) => {
    res.json({
        message: "Hello from MERN Backend"
    });
});

// ==================== STUDENTS ====================

// GET: Lấy danh sách sinh viên
app.get("/api/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// POST: Thêm sinh viên
app.post("/api/students", async (req, res) => {
    try {
        const student = await Student.create(req.body);

        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// PUT: Cập nhật sinh viên
app.put("/api/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).json({
                message: "Không tìm thấy sinh viên"
            });
        }

        res.json(student);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// DELETE: Xóa sinh viên
app.delete("/api/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(
            req.params.id
        );

        if (!student) {
            return res.status(404).json({
                message: "Không tìm thấy sinh viên"
            });
        }

        res.json({
            message: "Xóa sinh viên thành công",
            student
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// ==================== MONGODB + SERVER ====================

const PORT = 5000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB Atlas connected successfully!");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on: http://0.0.0.0:${PORT}`);
            console.log(`API link: http://localhost:${PORT}/api/hello`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:");
        console.error(error);
    });curl http://localhost:5000/api/hello