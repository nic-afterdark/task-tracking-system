import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";



const Dashboard = () => {

  const name = localStorage.getItem("loggedInUser");

  const [tasks, setTasks] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`https://task-tracking-system-1.onrender.com/api/tasks/${userId}`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };

    if (userId) {
      fetchTasks();
    }
  }, [userId]);



 const handleDelete = async (taskId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this task?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`https://task-tracking-system-1.onrender.com/api/tasks/${taskId}`);
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    alert("Task deleted successfully.");
  } catch (error) {
    console.error("Failed to delete task:", error.message);
    alert("Failed to delete task.");
  }
};


  const handleEdit = (taskId) => {
    navigate(`/dashboard/edit/${taskId}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl text-white font-bold mb-6 text-center">Hey there 👋 your tasks are here</h1>
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tasks.map((task) => (
            <div key={task._id} className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all relative">
              <h2 className="text-xl font-semibold text-blue-600">{task.title}</h2>
              <p className="text-gray-700 mt-1">{task.description}</p>
              <p className="text-sm text-gray-500 mt-2">📅 <strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">⚡ <strong>Priority:</strong> {task.priority}</p>
              <p className="text-sm text-gray-500">📌 <strong>Status:</strong> {task.status}</p>

              <div className="flex justify-between mt-4">
                <button
                    onClick={() => handleEdit(task._id)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                        >
                    Edit
                    </button>

                <button
                  onClick={() => handleDelete(task._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
             
            </div>
            
          ))}
        </div>
      )}
       <p className="text-2xl text-white">If you don't find your task you can create on 🤝 <Link to={'/dashboard/add'} className="text-blue-600 underline">Add</Link> </p>
    </div>
  );
};

export default Dashboard;

