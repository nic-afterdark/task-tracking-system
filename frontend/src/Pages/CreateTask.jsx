
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
    const navigate=useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not logged in.");
      return;
    }

    try {
      const response = await axios.post(`https://task-tracking-system-1.onrender.com/api/tasks/${userId}`, {
        ...form,
        user: userId,
      });

      alert("Task created successfully!");
      console.log(response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Task creation failed:", error.message);
      alert("Failed to create task.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3 bg-white rounded shadow-md w-96 mx-auto mt-10">
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
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Create Task</button>
    </form>
  );
};

export default CreateTask;
