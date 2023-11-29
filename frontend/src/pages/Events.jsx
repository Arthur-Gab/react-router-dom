import { Suspense } from 'react';
import { useLoaderData, Link, defer, Await } from 'react-router-dom';
import { EventItem } from '../components/EventItem';
import { getAllEvents } from '../util/event';
import { Plus } from 'lucide-react';
import { ErrorElement } from '../components/ErrorElement';

export function loader(queryClient) {
	return () => {
		const chacedEvents = queryClient.getQueryData(['events']);

		if (chacedEvents) {
			return defer({
				response: chacedEvents,
			});
		}

		const fetchedEvents = queryClient.fetchQuery({
			queryKey: ['events'],
			queryFn: getAllEvents,
		});

		return defer({
			response: fetchedEvents,
		});
	};
}

export function Events() {
	const { response } = useLoaderData();

	console.log(response);

	return (
		<>
			<main className='container flex flex-1 flex-col p-4'>
				<Suspense fallback={<SkeletonUI />}>
					<Await
						resolve={response}
						errorElement={<ErrorElement />}
					>
						{({ status, data: events }) =>
							status === 200 ? (
								events.map((event) => (
									<EventItem
										key={event.id}
										id={event.id}
										title={event.title}
										description={event.description}
										image={event.image}
										date={event.date}
									/>
								))
							) : (
								<section className='flex flex-1 flex-col items-center justify-center'>
									<h1 className='mb-8 text-4xl font-bold'>👀 Oops!</h1>
									<p>
										{events
											? events.error
											: 'Something went wrong! Take a look on console'}
										🤔
									</p>
									<p className='mb-6'>
										Esperimente criar um evento logo a baixo
									</p>

									<Link
										to={'/events/create'}
										className='btn relative flex w-full max-w-md justify-center gap-2 bg-orange-500 p-4 max-sm:p-2 sm:p-4'
									>
										<Plus size={24} />
										Criar Evento
									</Link>
								</section>
							)
						}
					</Await>
				</Suspense>
			</main>
		</>
	);
}

function SkeletonUI() {
	return (
		<>
			<article className='mb-12 h-fit w-full max-w-3xl self-center rounded-md  bg-neutral-100 p-6 shadow shadow-black/20'>
				<div className='flex max-md:flex-col md:flex md:gap-6'>
					<div className='min-h-fit w-full max-w-[350px] flex-1 animate-pulse self-center bg-neutral-200'>
						<div className='h-44 w-full'></div>
					</div>
					<div className='flex flex-1 flex-col justify-between'>
						<div className='mb-4 h-6 animate-pulse bg-neutral-200 max-md:mt-6'></div>
						<div className='mb-2 h-2 animate-pulse bg-neutral-200'></div>
						<div className='mb-2 h-2 animate-pulse bg-neutral-200'></div>
						<div className='mb-2 h-2 animate-pulse bg-neutral-200'></div>
						<div className='mb-2 h-2 animate-pulse bg-neutral-200'></div>

						<div className='mt-8 h-10 w-full animate-pulse bg-neutral-200'></div>
					</div>
				</div>
			</article>
			<article className='mb-12 h-fit w-full max-w-3xl self-center rounded-md  bg-neutral-100 p-6 shadow shadow-black/20'>
				<div className='flex max-md:flex-col md:flex md:gap-6'>
					<div className='min-h-fit w-full max-w-[350px] flex-1 animate-pulse self-center bg-neutral-200'>
						<div className='h-44 w-full'></div>
					</div>
					<div className='flex flex-1 flex-col justify-between'>
						<div className='mb-4 h-6 animate-pulse bg-neutral-200 max-md:mt-6'></div>
						<div className='mb-2 h-2 animate-pulse bg-neutral-200'></div>
						<div className='mb-2 h-2 animate-pulse bg-neutral-200'></div>
						<div className='mb-2 h-2 animate-pulse bg-neutral-200'></div>
						<div className='mb-2 h-2 animate-pulse bg-neutral-200'></div>

						<div className='mt-8 h-10 w-full animate-pulse bg-neutral-200'></div>
					</div>
				</div>
			</article>
			<article className='mb-12 h-fit w-full max-w-3xl self-center rounded-md  bg-neutral-100 p-6 shadow shadow-black/20'>
				<div className='flex max-md:flex-col md:flex md:gap-6'>
					<div className='min-h-fit w-full max-w-[350px] flex-1 animate-pulse self-center bg-neutral-200'>
						<div className='h-44 w-full'></div>
					</div>
					<div className='flex flex-1 flex-col justify-between'>
						<div className='mb-4 h-6 animate-pulse bg-neutral-200 max-md:mt-6'></div>
						<div className='mb-2 h-2 animate-pulse bg-neutral-200'></div>
						<div className='mb-2 h-2 animate-pulse bg-neutral-200'></div>
						<div className='mb-2 h-2 animate-pulse bg-neutral-200'></div>
						<div className='mb-2 h-2 animate-pulse bg-neutral-200'></div>

						<div className='mt-8 h-10 w-full animate-pulse bg-neutral-200'></div>
					</div>
				</div>
			</article>
		</>
	);
}
