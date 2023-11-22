import { Router } from 'express';
import * as eventsController from './controllers/EventsController';

export const routes = Router();

// Recuperar Evento
routes.get('/events', eventsController.index);
// Criar Evento
routes.post('/events/create', eventsController.store);
// Alterar Evento
routes.patch('/events/edit', eventsController.update);
