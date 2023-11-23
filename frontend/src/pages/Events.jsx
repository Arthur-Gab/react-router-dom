import { EventItem } from '../components/EventItem';
import { API } from '../services/api';
import { useLoaderData, Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

export function Events() {
	const response = useLoaderData();
	const status = response?.status;

	let responseErrorElement = null;
	if (status != 200 || !response) {
		responseErrorElement = (
			<section className='flex flex-1 flex-col items-center justify-center'>
				<h1 className='mb-8 text-4xl font-bold'>👀 Oops!</h1>
				<p>{response ? response.data.error : 'Something went wrong!'} 🤔</p>
				<p className='mb-6'>Esperimente criar um evento logo a baixo</p>

				<Link
					to={'/events/create'}
					className='btn relative flex w-full max-w-md justify-center gap-2 bg-orange-500 p-4 max-sm:p-2 sm:p-4'
				>
					<Plus size={24} />
					Criar Evento
				</Link>
			</section>
		);
	}

	let fetchedEvents = null;
	if (status == 200) {
		fetchedEvents = response.data.map((event) => (
			<EventItem
				key={event.id}
				id={event.id}
				title={event.title}
				description={event.description}
				image={event.image}
				date={event.date}
			/>
		));
	}

	return (
		<>
			<main className='container mt-4 flex flex-1 flex-col p-4'>
				{status == 200 ? fetchedEvents : responseErrorElement}
			</main>
		</>
	);
}

export function loader(queryClient) {
	return async () => {
		try {
			let data = queryClient.getQueryData({
				queryKey: ['get_event'],
			});

			if (!data) {
				data = await queryClient.fetchQuery({
					queryKey: ['get_event'],
					queryFn: async () => await API.get('/events'),
				});
			}

			return data;
		} catch (error) {
			return error.response;
		}
	};
}
