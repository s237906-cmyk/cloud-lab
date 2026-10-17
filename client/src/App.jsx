import { useEffect, useState } from "react";
import "./App.css";


const API_URL = "https://mern-backend-237906.onrender.com/api/students";


function App() {
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    studentId: "",
    name: "",
    email: ""
  });

  const [editingId, setEditingId] = useState(null);

  const loadStudents = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Không thể lấy danh sách sinh viên");
      }

      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error(error);
      alert("Không kết nối được Backend!");
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
      let response;

      if (editingId) {
        response = await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        });
      } else {
        response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Thao tác thất bại");
      }

      alert(editingId ? "Sửa sinh viên thành công!" : "Thêm sinh viên thành công!");

      setForm({
        studentId: "",
        name: "",
        email: ""
      });

      setEditingId(null);

      loadStudents();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEdit = (student) => {
    setEditingId(student._id);

    setForm({
      studentId: student.studentId,
      name: student.name,
      email: student.email
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sinh viên này không?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Xóa thất bại");
      }

      alert("Xóa sinh viên thành công!");

      loadStudents();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancel = () => {
    setEditingId(null);

    setForm({
      studentId: "",
      name: "",
      email: ""
    });
  };

  return (
    <div className="container">
      <h1>Quản lý sinh viên MERN - Version 2.0</h1>

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
          {editingId ? "Lưu thay đổi" : "Thêm sinh viên"}
        </button>

        {editingId && (
          <button type="button" onClick={handleCancel}>
            Hủy
          </button>
        )}
      </form>

      <h2>Danh sách sinh viên</h2>

      <table>
        <thead>
          <tr>
            <th>MSSV</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>

              <td>
                <button onClick={() => handleEdit(student)}>
                  Sửa
                </button>

                <button onClick={() => handleDelete(student._id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
