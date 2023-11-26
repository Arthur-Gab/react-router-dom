import { API } from '../services/api';

export function parseToEventObject(formData) {
	return {
		title: formData.get('title'),
		description: formData.get('description'),
		date: formData.get('date'),
		image: formData.get('image'),
	};
}

export async function getEvents() {
	return await API.get('/events');
}

export async function getEvent(id) {
	return await API.get(`/events/${id}`);
}

export async function editEvent(id, data) {
	return await API.patch(`/events/edit/${id}`, data);
}

export async function createEvent(data) {
	return await API.post('/events/create', data);
}
