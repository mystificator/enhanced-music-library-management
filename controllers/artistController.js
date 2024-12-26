import Artist from '../mongodb/models/artist.js';
import RecordHandler from '../utils/RecordHandler.js';

const getAllArtists = async (req, res) => {
    await RecordHandler.fetchRecords({
        model: Artist,
        query: req.query,
        filterParams: ['grammy', 'hidden'],
        res,
        successMessage: 'Artists retrieved successfully.'
    });
};

const getArtistByID = async (req, res) => {
    await RecordHandler.fetchRecordById({
        model: Artist,
        idField: 'artist_id',
        id: req.params.id,
        res,
        successMessage: 'Artist retrieved successfully.',
        notFoundMessage: 'Artist not found.'
    });
};

const addArtist = async (req, res) => {
    const { name, grammy = 0, hidden = false } = req.body;
    await RecordHandler.addNewRecord({
        model: Artist,
        data: { name, grammy, hidden },
        res,
        successMessage: 'Artist created successfully.'
    });
};

const updateArtist = async (req, res) => {
    await RecordHandler.updateRecord({
        model: Artist,
        idField: 'artist_id',
        id: req.params.id,
        updates: req.body,
        res,
        notFoundMessage: 'Artist not found.'
    });
};

const deleteArtist = async (req, res) => {
    await RecordHandler.deleteRecord({
        model: Artist,
        idField: 'artist_id',
        id: req.params.id,
        res,
        notFoundMessage: 'Artist not found.'
    });
};

export default { getAllArtists, getArtistByID, addArtist, updateArtist, deleteArtist };