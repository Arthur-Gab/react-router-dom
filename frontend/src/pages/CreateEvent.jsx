import { redirect, useNavigate, useNavigation } from 'react-router-dom';
import { Form } from '../components/Form';
import { Loading } from '../components/Loading';
import { X } from 'lucide-react';
import { createEvent, parseToEventObject } from '../util/event';

export function action(queryClient) {
	return async ({ request }) => {
		const formData = await request.formData();
		// Chamar a function para criar o evento
		const response = await createEvent(parseToEventObject(formData));

		// Invalidar a query para ter um refetch dos eventos
		if (response) {
			await queryClient.invalidateQueries({
				queryKey: ['events'],
				refetchType: 'all',
			});
		}

		return redirect('/events');
	};
}

/* 
	- Prover um formulário para criação de eventos
	- Prover um feedback de envio de formulário
	- Se sucesso na criação do evento, redirecionar para paginas eventos
	- Caso contrario, mostrar pagina de erro
*/
export function CreateEvent() {
	const navigate = useNavigate();
	const { state } = useNavigation();

	if (state === 'submitting') {
		return <Loading title={'Criando Evento...'} />;
	} else {
		return (
			<>
				<header className='container max-w-4xl p-4'>
					<nav>
						<button
							className='btn relative flex w-44 justify-center gap-2 bg-orange-500 p-4 py-2 text-white'
							autoFocus={true}
							onClick={(e) => {
								e.preventDefault();
								if (history.length < 3) {
									navigate('/');
								} else {
									navigate(-1);
								}
							}}
						>
							<X
								size={26}
								aria-hidden='true'
								focusable='false'
							/>
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
}
