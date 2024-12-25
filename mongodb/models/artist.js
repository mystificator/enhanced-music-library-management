import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const Artist = new mongoose.Schema({
    artist_id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    grammy: { type: Boolean, default: false },
    hidden: { type: Boolean, default: false },
});

const ArtistSchema = mongoose.model('Artist', Artist);

export default ArtistSchema;
