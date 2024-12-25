import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const Favorite = new mongoose.Schema({
    favorite_id: { type: String, default: uuidv4 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
    album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
    track: { type: mongoose.Schema.Types.ObjectId, ref: 'Track' },
});

const FavoriteSchema = mongoose.model('Favorite', Favorite);

export default FavoriteSchema;
