const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Completed"],
      default: "Pending",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);