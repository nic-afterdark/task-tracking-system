import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`https://task-tracking-system-1.onrender.com/${taskId}`);
        const task = response.data;
        setForm({
          title: task.title,
          description: task.description,
          dueDate: task.dueDate?.split("T")[0] || "",
          priority: task.priority,
          status: task.status,
        });
      } catch (error) {
        console.error("Failed to load task:", error.message);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.put(`https://task-tracking-system-1.onrender.com/${taskId}`, form);
      alert("Task updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to update task:", error.message);
      alert("Task update failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3 bg-white rounded shadow-md w-96 mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Edit Task</h2>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border" />
      <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} className="w-full p-2 border" />
      <select name="priority" value={form.priority} onChange={handleChange} className="w-full p-2 border">
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <select name="status" value={form.status} onChange={handleChange} className="w-full p-2 border">
        <option>Pending</option>
        <option>Started</option>
        <option>Completed</option>
        <option>Never Touched</option>
      </select>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Update Task</button>
    </form>
  );
};

export default EditTask;
