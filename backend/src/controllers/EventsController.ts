import { prisma } from '../lib/prisma';
import { Request, Response } from 'express';
import {
	isAnyFieldMissingValidation,
	isEveryFieldMissingValidation,
} from './util/fieldsValidation';

// 🚧 Work on progress 🚧

/* 
	Recuperar Eventos do BD
	200:
		- Retorna sucesso quando recuperar todos os eventos do DB
	400:
		- Retornar erro quando não achar nenhum evento registrado no DB
*/
export async function getAllEvents(_: Request, res: Response) {
	const all_events = await prisma.event.findMany();

	if (all_events.length < 1) {
		return res.status(404).json({
			error: 'Nenhum evento criado ainda...',
		});
	}

	return res.status(200).json(all_events);
}

/* 
   Criação de Evento
   200:
        - Retorna sucesso quando todos os campos contêm valor.
   400:
        - Retorna erro quando pelo menos um campo não contém valor.
*/
export async function create(req: Request, res: Response) {
	// Validar se pelo menos 1 campo não contem valor
	const isAnyFieldMissing = isAnyFieldMissingValidation(req.body);

	if (isAnyFieldMissing) {
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
   200:
        - Retorna sucesso quando pelo menos um campo é alterado com sucesso.
   400:
        - Retorna erro quando nenhum campo é alterado ou ocorre algum problema.
*/
export async function update(req: Request, res: Response) {
	// Validar se todos os campos não contem valor
	const isEveryFieldMissing = isEveryFieldMissingValidation(req.body);

	if (isEveryFieldMissing) {
		return res.status(400).json({
			error: 'Nenhum campo para alteração informado',
		});
	}

	const { id, ...eventFields } = req.body;
	// Procurar o evento pelo id e substituir os dados
	await prisma.event.update({
		where: {
			id,
		},
		data: {
			...eventFields,
		},
	});

	return res.status(200).json({
		message: 'Alteração realizada com sucesso',
	});
}
