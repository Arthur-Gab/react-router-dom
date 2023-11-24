interface Event {
	title: string;
	description: string;
	image: string;
	date: string;
}

/* 
   Verifica se pelo menos uma das chaves do objeto Event não contém valor.
   Retorna true se pelo menos uma das chaves não contiver valor, caso contrário, retorna false.
*/
export function isAnyFieldMissingValidation(body: Event): Boolean {
	const { title, description, image, date } = body;
	return !title || !description || !image || !date;
}

/* 
   Verifica se todas as chaves do objeto Event não contêm valor.
   Retorna true se todas as chaves não contiverem valor, caso contrário, retorna false.
*/
export function isEveryFieldMissingValidation(body: Event): Boolean {
	const { title, description, image, date } = body;
	return !title && !description && !image && !date;
}

interface EventMissing {
	title?: string;
	description?: string;
	image?: string;
	date?: string;
}

/*
	Filtra as propriedades do objeto 'body', mantendo apenas aquelas cujos valores são truthy,
	e retorna um novo objeto contendo essas chaves e valores.
*/
export function getFieldsWithValue(body: EventMissing): EventMissing {
	const eventFields: EventMissing = {};

	for (const [key, value] of Object.entries(body)) {
		if (value) {
			eventFields[key] = value;
		}
	}

	return eventFields;
}
