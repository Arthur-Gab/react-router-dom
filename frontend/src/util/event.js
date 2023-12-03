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
		return await API.get('/events');
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
	try {
		return API.get(`/events/${id}`);
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

export async function modifyEventById(id, eventFormData) {
	try {
		return await API.patch(`/events/edit/${id}`, eventFormData);
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

export async function createEvent(eventFormData) {
	try {
		return await API.post('/events/create', eventFormData);
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

export async function deleteEventById(id) {
	try {
		return await API.delete(`/events/edit/${id}`);
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
