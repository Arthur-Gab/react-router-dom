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
	try {
		const response = await API.get('/events');
		return response.data;
	} catch (error) {
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			throw error.response.data;
		} else if (error.request) {
			// The request was made but no response was received
			console.log(error.request);
		} else {
			// Something happened in setting up the request that triggered an Error
			console.log('Error', error.message);
		}
	}
}

export async function getEventById(id) {
	await API.get(`/events/${id}`);
}

export async function modifyEventById(id, eventFormData) {
	return await API.patch(`/events/edit/${id}`, eventFormData);
}

export async function createEvent(eventFormData) {
	return await API.post('/events/create', eventFormData);
}

export async function deleteEventById(id) {
	return await API.delete(`/events/edit/${id}`);
}
