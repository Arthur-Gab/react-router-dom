import { Router } from 'express';
import * as eventsController from './controllers/EventsController';

export const routes = Router();

// Recuperar Evento
routes.get('/events', eventsController.getAllEvents);
// Criar Evento
routes.post('/events/create', eventsController.create);
// Alterar Evento
routes.patch('/events/edit', eventsController.update);
