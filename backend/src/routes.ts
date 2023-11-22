import { Router } from 'express';

import * as eventsController from './controllers/EventsController';

export const routes = Router();

routes.get('/events', eventsController.index);
routes.post('/events/create', eventsController.store);
routes.patch('/events/edit', eventsController.update);
