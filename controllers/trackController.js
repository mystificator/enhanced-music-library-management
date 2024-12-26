import Track from '../mongodb/models/track.js';
import RecordHandler from '../utils/RecordHandler.js';


const getAllTracks = async (req, res) => {
    await RecordHandler.fetchRecords({
        model: Track,
        query: req.query,
        filterParams: ['artist_id', 'album_id', 'hidden'],
        res,
        successMessage: 'Tracks retrieved successfully.'
    });
};

const getTrackByID = async (req, res) => {
    await RecordHandler.fetchRecordById({
        model: Track,
        idField: 'track_id',
        id: req.params.id,
        res,
        successMessage: 'Track retrieved successfully.',
        notFoundMessage: 'Track not found.'
    });
};

const addNewTrack = async (req, res) => {
    const { artist_id, album_id, name, duration, hidden = false } = req.body;
    await RecordHandler.addNewRecord({
        model: Track,
        data: { artist_id, album_id, name, duration, hidden },
        res,
        successMessage: 'Track created successfully.'
    });
};

const updateTrack = async (req, res) => {
    await RecordHandler.updateRecord({
        model: Track,
        idField: 'track_id',
        id: req.params.id,
        updates: req.body,
        res,
        notFoundMessage: 'Track not found.'
    });
};

const deleteTrack = async (req, res) => {
    await RecordHandler.deleteRecord({
        model: Track,
        idField: 'track_id',
        id: req.params.id,
        res,
        notFoundMessage: 'Track not found.'
    });
};

export default { getAllTracks, getTrackByID, addNewTrack, updateTrack, deleteTrack };
