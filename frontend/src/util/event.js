import { API } from './api';

export function parseToEventObject(formData) {
	return {
		title: formData.get('title'),
		description: formData.get('description'),
		date: formData.get('date'),
		image: formData.get('image'),
	};
}

export async function getAllEvents() {
	return await API.get('/events');
}

export async function getEventById(id) {
	return await API.get(`/events/${id}`);
}

export async function modifyEventById(id, data) {
	return await API.patch(`/events/edi/${id}`, data);
}

export async function createEvent(data) {
	return await API.post('/events/create', data);
}
