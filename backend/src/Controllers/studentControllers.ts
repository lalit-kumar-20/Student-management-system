import { Request, Response } from 'express';
import Student from '../models/studentModel';
import Task from '../models/taskModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find the student by email
    const student = await Student.findOne({ email });

    // If the student is not found, return an error
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, student.password);

    // If the passwords don't match, return an error
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Create a JWT token for authentication
    const token = jwt.sign({ userId: student._id }, process.env.JWT_SECRET || '', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error in student login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getTasks = async (req: Request, res: Response) => {
    try {
      // Assuming you have a middleware to verify the JWT token and set the userId in req.userId
      const studentId = (req as any).userId;
  
      // Find tasks assigned to the student
      const tasks = await Task.find({ assignedTo: studentId });
  
      res.json({ tasks });
    } catch (error) {
      console.error('Error getting tasks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const completeTask = async (req: Request, res: Response) => {
  try {
    const { taskId, newStatus } = req.body;

    // Find the task by ID
    const task = await Task.findById(taskId);

    // If the task is not found, return an error
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Assuming you have a middleware to verify the JWT token and set the userId in req.userId
     const studentId = (req as any).userId;

    // Check if the task is assigned to the requesting student
    if (task.assignedTo.toString() !== studentId) {
      return res.status(403).json({ error: 'You are not authorized to complete this task' });
    }

    // Update the task status
    task.status = newStatus;
    await task.save();

    res.json({ message: 'Task status updated successfully' });
  } catch (error) {
    console.error('Error completing task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const signupStudent = async (req: Request, res: Response) => {
  console.log('Reached signupStudent function');
    try {
      const { name, email, password, department } = req.body;
  
      const existingStudent = await Student.findOne({ email });
      if (existingStudent) {
        return res.status(400).json({ error: 'Email is already registered' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newStudent = new Student({
        name,
        email,
        password: hashedPassword,
        department,
      });
  
      await newStudent.save();
  
      res.json({ message: 'Student registered successfully' });
    } catch (error) {
      console.error('Error in student signup:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export default { login, getTasks, completeTask, signupStudent };
  
