import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../mongodb/models/user.js';
import { CustomError, handleError } from '../utils/ErrorHandler.js';
import { handleResponse } from '../utils/ResponseHandler.js';
import { createUser } from '../utils/CreateUser.js';


const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await createUser(email, password);
        handleResponse(res, result.status, null, result.message);
    } catch (error) {
        handleError(error, res, 'User');
    }
};


const login = (req, res) => {
    try {
        const { id, role } = req.user;
        const token = jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        handleResponse(res, 200, { token }, 'Login Successful');
    } catch (error) {
        handleError(error, res, 'User');
    }
};


const logout = (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) throw new CustomError(400, 'Bad Request: No token provided.');
        handleResponse(res, 200, null, 'User logged out successfully.');
    } catch (error) {
        handleError(error, res, 'User');
    }
};


const updatePassword = async (req, res) => {
    try {
        const { old_password, new_password } = req.body;
        const user = await User.findOne({ user_id: req.user.id });
        if (!user) throw new CustomError(404, 'User not found.');

        const isPasswordValid = await bcrypt.compare(old_password, user.password);
        if (!isPasswordValid) throw new CustomError(400, 'Invalid old password.');

        const hashedPassword = bcrypt.hashSync(new_password, 10);
        const result = await User.updateOne({ user_id: user.user_id }, { $set: { password: hashedPassword } });

        if (result.modifiedCount === 0) throw new CustomError(404, 'User not found.');

        res.status(204).send();
    } catch (error) {
        handleError(error, res, 'User');
    }
};

export default { signup, login, logout, updatePassword };
