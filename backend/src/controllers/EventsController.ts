import { prisma } from '../lib/prisma';
import { Request, Response } from 'express';

// 🚧 Work on progress 🚧

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
