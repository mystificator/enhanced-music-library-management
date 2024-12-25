import bcrypt from 'bcryptjs';
import User from '../mongodb/models/user.js';

export const createUser = async (email, password, role = 'Viewer') => {
    try {
        // Role validation
        if (role === 'Admin') {
            return { status: 400, message: 'Bad Request: Invalid role.' };
        }

        // Password validation
        if (!password) {
            return { status: 400, message: 'Bad Request: Password is required.' };
        }

        // Assign first user as Admin
        if (await User.countDocuments() === 0) {
            role = 'Admin';
        }

        // Hash password and create user
        const hashedPassword = bcrypt.hashSync(password, 10);
        await User.create({ email, password: hashedPassword, role });

        return { status: 200, message: 'User created successfully.' };
    } catch (error) {
        console.error(error);

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return { status: 400, message: messages.join(', ') };
        }

        // Handle duplicate email errors
        if (error.code === 11000) {
            return { status: 409, message: 'Email already exists.' };
        }

        // Handle generic errors
        return { status: 500, message: 'Internal server error.' };
    }
};