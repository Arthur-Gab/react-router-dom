import { EventItem } from '../components/EventItem';
import { useLoaderData, Link, defer, Await } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { getEvents } from '../util/event';
import { Suspense } from 'react';

export function loader(queryClient) {
	return async () => {
		try {
			const chacedEvents = queryClient.getQueryData(['events']);

			if (chacedEvents) {
				return chacedEvents;
			}

			const fetchedEvents = await queryClient.fetchQuery({
				queryKey: ['events'],
				queryFn: getEvents,
			});

			return fetchedEvents;
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

export function Events() {
	const { status, data: events } = useLoaderData();

	return (
		<>
			<main className='container flex flex-1 flex-col p-4'>
				{status === 200 &&
					events.map((event) => (
						<EventItem
							key={event.id}
							id={event.id}
							title={event.title}
							description={event.description}
							image={event.image}
							date={event.date}
						/>
					))}
				{status !== 200 && (
					<section className='flex flex-1 flex-col items-center justify-center'>
						<h1 className='mb-8 text-4xl font-bold'>👀 Oops!</h1>
						<p>
							{events
								? events.error
								: 'Something went wrong! Take a look on console'}{' '}
							🤔
						</p>
						<p className='mb-6'>Esperimente criar um evento logo a baixo</p>

						<Link
							to={'/events/create'}
							className='btn relative flex w-full max-w-md justify-center gap-2 bg-orange-500 p-4 max-sm:p-2 sm:p-4'
						>
							<Plus size={24} />
							Criar Evento
						</Link>
					</section>
				)}
			</main>
		</>
	);
}
