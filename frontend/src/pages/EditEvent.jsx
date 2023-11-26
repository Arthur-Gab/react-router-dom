import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { Form } from '../components/Form';
import { MoveLeft } from 'lucide-react';
import { getEvent, editEvent, parseToEventObject } from '../util/event';

export function loader(queryClient) {
	return async ({ params }) => {
		try {
			const { id } = params;

			const event = queryClient.getQueryData(['events', id]);

			if (event) {
				return event;
			}

			const fetchedEvent = await queryClient.fetchQuery({
				queryKey: ['events', id],
				queryFn: () => getEvent(id),
			});

			return fetchedEvent;
		} catch (error) {
			console.error('Error in loader:', error);

			if (error.response) {
				// The request was made and the server responded with a status code
				// other than 2xx (e.g., 404, 500).
				console.error('Server Error:', error.response.data);
			} else if (error.request) {
				// The request was made but no response was received.
				console.error('No response received from the server.');
			} else {
				// Something happened in setting up the request that triggered an Error.
				console.error('Error setting up the request:', error.message);
			}

			return null;
		}
	};
}

export function action(queryClient) {
	return async ({ request, params }) => {
		const formData = await request.formData();
		const { id } = params;

		const response = await editEvent(id, parseToEventObject(formData));

		if (response) {
			await queryClient.refetchQueries(['events', id]);
		}

		return redirect('/events');
	};
}

export function EditEvent() {
	const navigate = useNavigate();
	const { data: event } = useLoaderData();

	return (
		<>
			<header className='container max-w-4xl p-4'>
				<nav>
					<button
						className='btn relative flex w-44 justify-center gap-2 bg-orange-500 p-4 py-2 text-white'
						onClick={(e) => {
							e.preventDefault();
							navigate('/events');
						}}
					>
						<MoveLeft size={26} />
						Voltar
					</button>
				</nav>
			</header>
			<main className='container mt-8 max-w-4xl p-4'>
				<h1 className='text-center text-2xl'>Editar Evento</h1>
				<Form
					method={'PATCH'}
					event={event}
				/>
			</main>
		</>
	);
}
