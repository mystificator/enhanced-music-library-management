import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const Album = new mongoose.Schema({
    album_id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    year: { type: Number, required: true },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
    hidden: { type: Boolean, default: false },
});

const AlbumSchema = mongoose.model('Album', Album);

export default AlbumSchema;
