import mongoose, { Schema, Document } from 'mongoose';

interface Student extends Document {
  email: string;
  password: string;
}

const StudentSchema: Schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const StudentModel = mongoose.model<Student>('Student', StudentSchema);

export default StudentModel;
