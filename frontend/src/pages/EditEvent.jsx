import { Suspense } from 'react';
import {
	redirect,
	useLoaderData,
	useNavigate,
	useNavigation,
	defer,
	Await,
	json,
} from 'react-router-dom';
import { Form } from '../components/Form';
import { Loading } from '../components/Loading';
import { ErrorElement } from '../components/ErrorElement';
import { MoveLeft } from 'lucide-react';
import {
	getEventById,
	modifyEventById,
	parseToEventObject,
} from '../util/event';

export function loader(queryClient) {
	return ({ params }) => {
		const { id } = params;

		const event = queryClient.getQueryData(['events', id]);

		if (event) {
			return defer({
				response: event,
			});
		}

		const fetchedEvent = queryClient.fetchQuery({
			queryKey: ['events', id],
			queryFn: () => getEventById(id),
		});

		return defer({
			response: fetchedEvent,
		});
	};
}

export function action(queryClient) {
	return async ({ request, params }) => {
		const formData = await request.formData();
		const { id } = params;

		const response = await modifyEventById(id, parseToEventObject(formData));

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
	const { state } = useNavigation();
	const { response } = useLoaderData();

	if (state === 'submitting') {
		return <Loading title={'Alterando dados...'} />;
	} else {
		return (
			<>
				<Suspense fallback={<SkeletonUI />}>
					<Await
						resolve={response}
						errorElement={<ErrorElement />}
					>
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
