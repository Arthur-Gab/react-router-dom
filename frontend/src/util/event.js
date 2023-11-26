import { API } from '../services/api';

export async function getEvents() {
	return await API.get('/events');
}

export async function getEvent(id) {
	return await API.get(`/events/${id}`);
}

export async function editEvent(id, data) {
	return await API.patch(`/events/edit/${id}`, data);
}
