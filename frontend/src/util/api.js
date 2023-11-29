import axios from 'axios';

export const API = axios.create({
	baseURL: 'http://localhost:3000',
	timeout: 30000, //30s
	timeoutErrorMessage: 'Tempo limite de resposta atingido (15s)',
});
