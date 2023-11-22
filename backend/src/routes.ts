import { Router } from 'express';

import * as eventsController from './controllers/EventsController';

export const routes = Router();

routes.post('/events/create', eventsController.store);
