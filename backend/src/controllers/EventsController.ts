import { prisma } from '../lib/prisma';
import { Request, Response } from 'express';
import {
	isAnyFieldMissing,
	isEveryFieldMissing,
} from './util/isAnyFieldMissing';

// 🚧 Work on progress 🚧

// Get all events on db
export async function index(_: Request, res: Response) {
	const all_events = await prisma.event.findMany();

	return res.status(200).json(all_events);
}

// Create a Event on db
export async function store(req: Request, res: Response) {
	const fieldMissing = isAnyFieldMissing(req.body);

	if (fieldMissing) {
		return res.status(400).json({
			error: 'Um ou mais campos estão faltando.',
		});
	}

	const event = await prisma.event.create({
		data: {
			...req.body,
		},
	});

	return res.status(201).json(event);
}

/*
    Alterar campos informados pelo cliente
    - Caso nenhum campo seja enviado enviar 400
*/
export async function update(req: Request, res: Response) {
	const { id, ...otherFields } = req.body;

	const fieldMissing = isEveryFieldMissing(req.body);

	if (fieldMissing) {
		return res.status(400).json({
			error: 'Nenhum campo para alteração informado',
		});
	}

	// Procurar o evento pelo id e substituir os dados
	await prisma.event.update({
		where: {
			id,
		},
		data: {
			...otherFields,
		},
	});

	return res.status(200).json({
		message: 'Alteração realizada com sucesso',
	});
}
