import express from 'express';
import adminController from '../controllers/adminController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const adminRouter = express.Router();

adminRouter.get('/', authenticate, authorize(['Admin']), adminController.getAllUsers);
adminRouter.post('/add-user', authenticate, authorize(['Admin']), adminController.addUser);
adminRouter.delete('/:id', authenticate, authorize(['Admin']), adminController.deleteUser);

export { adminRouter };