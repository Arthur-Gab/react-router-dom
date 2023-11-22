interface Event {
	title: string;
	description: string;
	image: string;
	date: string;
}

export function isAnyFieldMissing(body: Event) {
	const { title, description, image, date } = body;
	return !title || !description || !image || !date;
}

export function isEveryFieldMissing(body: Event) {
	const { title, description, image, date } = body;
	return !title && !description && !image && !date;
}
