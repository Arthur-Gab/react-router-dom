import { redirect, useNavigate } from 'react-router-dom';
import { Form } from '../components/Form';
import { X } from 'lucide-react';
import { createEvent, parseToEventObject } from '../util/event';

export function action(queryClient) {
	return async ({ request }) => {
		const formData = await request.formData();
		// Chamar a function para criar o evento
		const response = await createEvent(parseToEventObject(formData));

		// Invalidar a query para ter um refetch dos eventos
		if (response) {
			await queryClient.refetchQueries(['events']);
		}

		return redirect('/events');
	};
}

export function CreateEvent() {
	const navigate = useNavigate();

	return (
		<>
			<header className='container max-w-4xl p-4'>
				<nav>
					<button
						className='btn relative flex w-44 justify-center gap-2 bg-orange-500 p-4 py-2 text-white'
						onClick={(e) => {
							e.preventDefault();
							navigate(-1);
						}}
					>
						<X size={26} />
						Cancelar
					</button>
				</nav>
			</header>
			<main className='container mt-8 max-w-4xl p-4'>
				<h1 className='text-center text-2xl'>Criar Evento</h1>
				<Form method={'POST'} />
			</main>
		</>
	);
}
