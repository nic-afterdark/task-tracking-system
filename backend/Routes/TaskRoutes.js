const router = require('express').Router();
const Task =require('../Models/TaskModel')

// CREATE TASK
router.post('/:userId', async (req, res) => {
  try {
    console.log("Incoming Task Data:", req.body); 
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error("Task creation failed:", err); 
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});


// READ All Tasks for a user
router.get('/:userId', async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.params.userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err.message });
  }
});





// UPDATE Task
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task', error });
  }
});

// DELETE Task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error("Delete failed:", error.message);
    res.status(500).json({ message: 'Failed to delete task' });
  }
});




module.exports = router;
