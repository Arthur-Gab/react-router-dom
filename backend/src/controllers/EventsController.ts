import { prisma } from '../lib/prisma';
import { Request, Response } from 'express';
import {
	getFieldsWithValue,
	isAnyFieldMissing,
	isEveryFieldMissing,
} from './util/fieldsValidation';

/* 
	Recuperar Eventos com Base no ID
	200:
		- Retorna sucesso quando recuperar o evento pelo ID com sucesso
	400:
        - Retorna erro quando não foi possível recuperar o evento pq o ID informado não é válido.
*/
export async function getEventById(req: Request, res: Response) {
	try {
		const { id } = req.params;

		const event = await prisma.event.findUniqueOrThrow({
			where: { id },
		});

		console.log('on getEvent');

		setTimeout(() => {
			return res.status(200).json(event);
		}, 800);
	} catch (error) {
		return res.status(404).json({
			error:
				'A recuperação deste evento falhou, pois não foi encontrado nenhum registro correspondente ao ID fornecido.',
		});
	}
}

/* 
	Recuperar Eventos do BD
	200:
		- Retorna sucesso quando recuperar todos os eventos com sucesso
	404:
		- Retornar erro não achar nenhum evento registrado no BD
*/
export async function getAllEvents(_: Request, res: Response) {
	const events = await prisma.event.findMany();

	if (events.length < 1) {
		return res.status(404).json({
			error:
				'Parece que ainda não foi criado nenhum evento. Por favor, considere criar um novo evento.',
		});
	}

	setTimeout(() => {
		return res.status(200).json(events);
	}, 800);
}

/* 
   Criação de Evento
   200:
        - Retorna sucesso quando foi possível a criação do Evento.
   400:
        - Retorna erro quando os valores informados não forem válidos.
*/
export async function createEvent(req: Request, res: Response) {
	// Validar se pelo menos 1 campo não contem valor
	if (isAnyFieldMissing(req.body)) {
		return res.status(400).json({
			error:
				'Por favor, preencha todos os campos obrigatórios antes de prosseguir.',
		});
	}

	await prisma.event.create({
		data: {
			...req.body,
		},
	});

	setTimeout(() => {
		return res.status(201).json();
	}, 800);
}

/* 
   Modificar Evento com base no ID
   204:
        - Retorna sucesso o registro do evento é alterado com sucesso pelas informações passadas
   404:
        - Retorna erro quando não foi possível deletar o recurso pq o ID informado não é válido.
*/
export async function modifyEventById(req: Request, res: Response) {
	try {
		// Validar se todos os campos não contem valor
		if (isEveryFieldMissing(req.body)) {
			return res.status(400).json({
				error:
					'Nenhum campo foi fornecido para realizar a alteração. Por favor, inclua os campos que deseja modificar e tente novamente.',
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

		setTimeout(() => {
			return res.status(204).json({
				message: 'Alteração realizada com sucesso!',
			});
		}, 800);
	} catch (error) {
		return res.status(404).json({
			error:
				'Não foi possível editar o evento. O ID fornecido não corresponde a nenhum registro existente. Certifique-se de utilizar um ID válido e tente novamente.',
		});
	}
}

/* 
   Deletar evento com base no ID
   204:
        - Retorna sucesso quando pelo o registro do evento é removido do BD com sucesso.
   404:
        - Retorna erro quando não foi possível deletar o recurso pq o ID informado não é válido.
*/
export async function deleteEventById(req: Request, res: Response) {
	try {
		const { id } = req.params;

		await prisma.event.delete({
			where: {
				id,
			},
		});

		setTimeout(() => {
			return res.status(204).json({
				message: 'Registro deletado com sucesso!',
			});
		}, 800);
	} catch (error) {
		return res.status(404).json({
			error:
				'O ID não foi fornecido como parâmetro. Por favor, inclua um ID válido para realizar a operação desejada.',
		});
	}
}
