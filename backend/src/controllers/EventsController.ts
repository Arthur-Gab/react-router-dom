import { prisma } from '../lib/prisma';
import { Request, Response } from 'express';

// 🚧 Work on progress 🚧

// Get all events on db
export async function index(_: Request, res: Response) {
	const all_events = await prisma.event.findMany();

	return res.status(200).json(all_events);
}

// Create a Event on db
export async function store(req: Request, res: Response) {
	const { title, description, image, date } = req.body;

	console.log(title);
	console.log(description);
	console.log(image);
	console.log(date);

	const isAnyFieldMissing = !title || !description || !image || !date;

	if (isAnyFieldMissing) {
		return res.status(400).json({
			error: 'Um ou mais campos estão faltando.',
		});
	}

	const event = await prisma.event.create({
		data: {
			title,
			description,
			image,
			date,
		},
	});

	return res.status(201).json(event);
}
