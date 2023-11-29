import { Router } from 'express';
import * as eventsController from './controllers/EventsController';

export const routes = Router();

// Recuperar um evento pelo ID
routes.get('/events/:id', eventsController.getEventById);
// Recuperar Todos os Eventos
routes.get('/events', eventsController.getAllEvents);
// Criar Evento
routes.post('/events/create', eventsController.createEvent);
// Alterar Evento pelo ID
routes.patch('/events/edit/:id', eventsController.modifyEventById);
// Deletar Evento pelo ID
routes.delete('/events/edit/:id', eventsController.deleteEventById);
