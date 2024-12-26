import express from 'express';
import TrackController from '../controllers/trackController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const trackRouter = express.Router();

trackRouter.get('/', authenticate, TrackController.getAllTracks);
trackRouter.get('/:id', authenticate, TrackController.getTrackByID);
trackRouter.post('/add-track', authenticate, authorize(['Admin', 'Editor']), TrackController.addNewTrack);
trackRouter.put('/:id', authenticate, authorize(['Admin', 'Editor']), TrackController.updateTrack);
trackRouter.delete('/:id', authenticate, authorize(['Admin', 'Editor']), TrackController.deleteTrack);

export { trackRouter };