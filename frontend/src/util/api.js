import axios from 'axios';

export const API = axios.create({
	baseURL: 'http://localhost:3000',
	timeout: 3000, //15s
	timeoutErrorMessage: 'Tempo limite de resposta atingido (15s)',
});
