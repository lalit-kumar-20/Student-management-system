import { Request, Response } from 'express';
import Admin from '../models/studentModel';
import Task from '../models/taskModel';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// src/controllers/adminController.ts

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find the admin by email
    const admin = await Admin.findOne({ email });

    // If the admin is not found, return an error
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, admin.password);

    // If the passwords don't match, return an error
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Create a JWT token for authentication
    const token = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET || '', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error in admin login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const signupAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password, department } = req.body;

    // Check if the student email is already registered
    const existingStudent = await Admin.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student
    const newStudent = new Admin({
      name,
      email,
      password: hashedPassword,
      department,
    });

    // Save the new student to the database
    await newStudent.save();

    res.json({ message: 'Student registered successfully' });
  } catch (error) {
    console.error('Error in student signup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const assignTask = async (req: Request, res: Response) => {
  try {
    const { studentId, taskDetails } = req.body;

    // Check if the student exists
    const student = await Task.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Create a new task
    const newTask = new Task({
      assignedTo: studentId,
      details: taskDetails,
      status: 'pending', // You can set a default status here
    });

    // Save the new task to the database
    await newTask.save();

    res.json({ message: 'Task assigned successfully' });
  } catch (error) {
    console.error('Error in assigning task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default { login, signupAdmin, assignTask };

