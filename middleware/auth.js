import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../mongodb/models/user.js';
import { handleError } from '../utils/ErrorHandler.js';
import { handleResponse } from '../utils/ResponseHandler.js';


// Middleware for authentication
export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return handleResponse(res, 401, null, 'Unauthorized Access.');
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        handleResponse(res, 401, null, 'Unauthorized Access.');
    }
};

// Middleware for role based authorization
export const authorize = (roles) => (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
        return handleResponse(res, 403, null, 'Forbidden Access.');
    }
    next();
};

// Middleware to validate user credentials
export const validateCredentials = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return handleResponse(res, 400, null, 'Missing email or password.');
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return handleResponse(res, 400, null, 'Invalid credentials.');
        }

        req.user = user;
        next();
    } catch (error) {
        handleError(error, res);
    }
};