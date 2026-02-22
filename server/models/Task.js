import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: String,
  assignedTo: String,
  status: {
    type: String,
    default: "Pending"
  },
  dueDate: Date
}, { timestamps: true });

export default mongoose.model("Task", TaskSchema);