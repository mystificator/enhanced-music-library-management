import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const Track = new mongoose.Schema({
    track_id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    duration: { type: Number, required: true }, //Duration in seconds
    album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album', required: true },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
    hidden: { type: Boolean, default: false },
});

const TrackSchema = mongoose.model('Track', Track);

export default TrackSchema;
