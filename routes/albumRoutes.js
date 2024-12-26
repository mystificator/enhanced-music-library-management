import express from 'express';
import AlbumController from '../controllers/albumController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const albumRouter = express.Router();

albumRouter.get('/', authenticate, AlbumController.getAllAlbums);
albumRouter.get('/:id', authenticate, AlbumController.getAlbumByID);
albumRouter.post('/add-album', authenticate, authorize(['Admin', 'Editor']), AlbumController.addNewAlbum);
albumRouter.put('/:id', authenticate, authorize(['Admin', 'Editor']), AlbumController.updateAlbum);
albumRouter.delete('/:id', authenticate, authorize(['Admin', 'Editor']), AlbumController.deleteAlbum);

export { albumRouter };