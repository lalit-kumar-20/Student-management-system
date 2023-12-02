import express from 'express';
import adminRoutes from './routes/adminRoutes';
import studentRoutes from './routes/studentRoutes';
const path = require('path');
const cors = require('cors');
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
// Use built-in express middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/admin', adminRoutes);
app.use('/student', studentRoutes);


export default app;
