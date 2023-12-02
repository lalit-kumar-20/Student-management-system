import express from 'express';
import studentController from '../Controllers/studentControllers';

const router = express.Router();

///studentController.hello();


router.post('/signup', studentController.signupStudent);
router.post('/login', studentController.login);
router.get('/tasks', studentController.getTasks);
router.post('/completeTask', studentController.completeTask);

export default router;
