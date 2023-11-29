import { prisma } from '../lib/prisma';
import { Request, Response } from 'express';
import {
	getFieldsWithValue,
	isAnyFieldMissing,
	isEveryFieldMissing,
} from './util/fieldsValidation';

export async function getEventById(req: Request, res: Response) {
	const { id } = req.params;

	const event = await prisma.event.findUnique({
		where: { id },
	});

	if (!event) {
		return res.status(404).json({
			error: 'Esse evento não existe mais...',
		});
	}

	setTimeout(() => {
		return res.status(200).json(event);
	}, 3000);
}

/* 
	Recuperar Eventos do BD
	200:
		- Retorna sucesso quando recuperar todos os eventos do DB
	400:
		- Retornar erro quando não achar nenhum evento registrado no DB
*/
export async function getAllEvents(_: Request, res: Response) {
	const events = await prisma.event.findMany();

	if (events.length < 1) {
		return res.status(404).json({
			error: 'Nenhum evento criado ainda...',
		});
	}

	setTimeout(() => {
		return res.status(200).json(events);
	}, 3000);
}

/* 
   Criação de Evento
   200:
        - Retorna sucesso quando todos os campos contêm valor.
   400:
        - Retorna erro quando pelo menos um campo não contém valor.
*/
export async function createEvent(req: Request, res: Response) {
	// Validar se pelo menos 1 campo não contem valor
	if (isAnyFieldMissing(req.body)) {
		return res.status(400).json({
			error: 'Um ou mais campos estão faltando.',
		});
	}

	await prisma.event.create({
		data: {
			...req.body,
		},
	});

	return res.status(201).json({
		message: 'Evento criado com sucesso',
	});
}

/* 
   Alterar campos informados pelo cliente
   200:
        - Retorna sucesso quando pelo menos um campo é alterado com sucesso.
   400:
        - Retorna erro quando nenhum campo é alterado ou ocorre algum problema.
*/
export async function modifyEventById(req: Request, res: Response) {
	// Validar se todos os campos não contem valor
	if (isEveryFieldMissing(req.body)) {
		return res.status(400).json({
			error: 'Nenhum campo para alteração informado',
		});
	}

	const { id } = req.params;
	const fieldsWithValue = getFieldsWithValue(req.body);

	//Procurar o evento pelo id e substituir os dados
	await prisma.event.update({
		where: {
			id,
		},
		data: {
			...fieldsWithValue,
		},
	});

	return res.status(204).json({
		message: 'Alteração realizada com sucesso',
	});
}
