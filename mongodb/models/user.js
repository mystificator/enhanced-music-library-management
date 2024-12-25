import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const User = new mongoose.Schema({
    user_id: { type: String, default: uuidv4 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Editor', 'Viewer'], default: 'Viewer' },
});

const UserSchema = mongoose.model('User', User);

export default UserSchema;
