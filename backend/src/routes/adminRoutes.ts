import express from 'express';
import adminController from '../Controllers/adminControllers';

const router = express.Router();

router.post('/login', adminController.login);
router.post('/signupAdmin', adminController.signupAdmin);
router.post('/assignTask', adminController.assignTask);

export default router;
