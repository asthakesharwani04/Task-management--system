const Task = require("../models/Task");

exports.createTask = async (req, res, next) => {
  try {
    const { title } = req.body;
    const task = new Task({ user: req.userId, title });
    await task.save();
    return res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });
    return res.json(tasks);
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, title } = req.body;

    const task = await Task.findOne({ _id: id, user: req.userId });
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (typeof title !== 'undefined') {
      const trimmed = String(title).trim();
      if (!trimmed) return res.status(400).json({ message: 'Title cannot be empty' });
      task.title = trimmed;
    }

    if (typeof status !== 'undefined') {
      const allowed = ['Pending', 'Processing', 'Completed'];
      if (!allowed.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
      task.status = status;
    }

    await task.save();
    return res.json(task);
  } catch (err) {
    next(err);
  }
};


// Delete task 
exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    console.log(`[DELETE TASK] userId=${userId} taskId=${id}`);

    const task = await Task.findOne({ _id: id, user: userId });
    if (!task) {
      console.log(`[DELETE TASK] Not found or ownership mismatch. userId=${userId} taskId=${id}`);
      return res.status(404).json({ message: 'Task not found or you are not the owner' });
    }

    await task.deleteOne();
    console.log(`[DELETE TASK] Deleted taskId=${id} by userId=${userId}`);
    return res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('[DELETE TASK] error', err && err.stack ? err.stack : err);
    next(err);
  }
};