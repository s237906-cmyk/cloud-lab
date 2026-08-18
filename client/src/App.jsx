import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    studentId: "",
    name: "",
    email: ""
  });

  const loadStudents = async () => {
    try {
      const response = await fetch("/api/students");
      const data = await response.json();

      setStudents(data);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error("Không thể thêm sinh viên");
      }

      setForm({
        studentId: "",
        name: "",
        email: ""
      });

      loadStudents();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Quản lý sinh viên</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="studentId"
          placeholder="MSSV"
          value={form.studentId}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Họ tên"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Thêm sinh viên
        </button>
      </form>

      <h2>Danh sách sinh viên</h2>

      <table>
        <thead>
          <tr>
            <th>MSSV</th>
            <th>Họ tên</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

