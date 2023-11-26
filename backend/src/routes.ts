import { Router } from 'express';
import * as eventsController from './controllers/EventsController';

export const routes = Router();

// Recuperar um evento especifico
routes.get('/events/:id', eventsController.show);
// Recuperar Todos os Eventos
routes.get('/events', eventsController.index);
// Criar Evento
routes.post('/events/create', eventsController.store);
// Alterar Evento
routes.patch('/events/edit/:id', eventsController.update);
