import mongoose, { Schema, Document } from 'mongoose';

interface Task extends Document {
  name: string;
  dueTime: Date;
  status: string;
  assignedTo: mongoose.Types.ObjectId;
}

const TaskSchema: Schema = new Schema({
  name: { type: String, required: true },
  dueTime: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  assignedTo: { type: mongoose.Types.ObjectId, ref: 'Student', required: true },
});

const TaskModel = mongoose.model<Task>('Task', TaskSchema);

export default TaskModel;
