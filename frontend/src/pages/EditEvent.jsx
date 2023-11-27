import { Suspense } from 'react';
import {
	redirect,
	useLoaderData,
	useNavigate,
	defer,
	Await,
	json,
} from 'react-router-dom';
import { Form } from '../components/Form';
import { MoveLeft } from 'lucide-react';
import { getEvent, editEvent, parseToEventObject } from '../util/event';

export function loader(queryClient) {
	return ({ params }) => {
		try {
			const { id } = params;

			const event = queryClient.getQueryData(['events', id]);

			if (event) {
				return defer({
					response: event,
				});
			}

			const fetchedEvent = queryClient.fetchQuery({
				queryKey: ['events', id],
				queryFn: () => getEvent(id),
			});

			return defer({
				response: fetchedEvent,
			});
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

			return json(
				{ error: 'Não foi possível completar a requisição' },
				{ status: 500 },
			);
		}
	};
}

export function action(queryClient) {
	return async ({ request, params }) => {
		const formData = await request.formData();
		const { id } = params;

		const response = await editEvent(id, parseToEventObject(formData));

		if (response) {
			await queryClient.invalidateQueries({
				queryKey: ['events'],
				refetchType: 'all',
			});
		}

		return redirect('/events');
	};
}

export function EditEvent() {
	const navigate = useNavigate();
	const { response } = useLoaderData();

	return (
		<>
			<Suspense fallback={<SkeletonUI />}>
				<Await resolve={response}>
					{({ data: event }) => (
						<>
							<header className='container max-w-4xl p-4'>
								<nav>
									<button
										className='btn relative flex w-44 justify-center gap-2 bg-orange-500 p-4 py-2 text-white'
										autoFocus={true}
										onClick={(e) => {
											e.preventDefault();
											navigate('/events');
										}}
									>
										<MoveLeft
											size={26}
											aria-hidden='true'
											focusable='false'
										/>
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
					)}
				</Await>
			</Suspense>
		</>
	);
}

function SkeletonUI() {
	return (
		<>
			<header className='container max-w-4xl p-4'>
				<div className='h-11 w-44 animate-pulse bg-neutral-200'></div>
			</header>
			<main className='container mt-8 max-w-4xl p-4'>
				<div className='mx-auto h-8 w-72 animate-pulse bg-neutral-200'></div>
				<div className='mt-6 flex flex-col gap-4'>
					<div className='flex flex-col gap-1'>
						<div className='h-7 w-40 animate-pulse bg-neutral-200'></div>
						<div className='h-9 w-full animate-pulse bg-neutral-200'></div>
					</div>
					<div className='flex flex-col gap-1'>
						<div className='h-7 w-40 animate-pulse bg-neutral-200'></div>
						<div className='h-9 w-full animate-pulse bg-neutral-200'></div>
					</div>
					<div className='flex flex-col gap-1'>
						<div className='h-7 w-40 animate-pulse bg-neutral-200'></div>
						<div className='h-36 w-full animate-pulse bg-neutral-200'></div>
					</div>
					<div className='flex flex-col gap-1'>
						<div className='h-7 w-40 animate-pulse bg-neutral-200'></div>
						<div className='h-9 w-full animate-pulse bg-neutral-200'></div>
					</div>
					<div className='mt-8 h-16 w-full animate-pulse bg-neutral-200'></div>
				</div>
			</main>
		</>
	);
}
