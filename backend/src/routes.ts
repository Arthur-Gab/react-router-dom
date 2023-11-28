import { Router } from 'express';
import * as eventsController from './controllers/EventsController';

export const routes = Router();

// Recuperar um evento especifico
routes.get('/events/:id', eventsController.getEventById);
// Recuperar Todos os Eventos
routes.get('/events', eventsController.getAllEvents);
// Criar Evento
routes.post('/events/create', eventsController.createEvent);
// Alterar Evento específico
routes.patch('/events/edit/:id', eventsController.modifyEventById);
