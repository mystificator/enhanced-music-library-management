import express from 'express';
import ArtistController from '../controllers/artistController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const artistRouter = express.Router();

artistRouter.get('/', authenticate, ArtistController.getAllArtists);
artistRouter.get('/:id', authenticate, ArtistController.getArtistByID);
artistRouter.post('/add-artist', authenticate, authorize(['Admin', 'Editor']), ArtistController.addArtist);
artistRouter.put('/:id', authenticate, authorize(['Admin', 'Editor']), ArtistController.updateArtist);
artistRouter.delete('/:id', authenticate, authorize(['Admin', 'Editor']), ArtistController.deleteArtist);

export { artistRouter };