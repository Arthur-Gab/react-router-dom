import {
	Link,
	useRouteError,
	isRouteErrorResponse,
	useLocation,
} from 'react-router-dom';
import { MoveLeft, Plus } from 'lucide-react';

export function ErrorElement() {
	const error = useRouteError();
	const { pathname } = useLocation();

	if (isRouteErrorResponse(error)) {
		<>
			<section className='flex flex-1 flex-col items-center justify-center gap-6 p-4'>
				<h1 className='text-4xl font-bold'>Opps!</h1>
				<h2 className='text-2xl'>{error.status}</h2>
				<p className='text-center text-base'>{error.statusText}</p>
				{error.data?.message && <p>error.data.message</p>}
				<Link
					to={'/'}
					className='btn relative flex w-60 justify-center gap-2 bg-orange-500 p-4 py-2 text-white'
				>
					<MoveLeft
						size={26}
						aria-hidden='true'
						focusable='false'
					/>
					Voltar
				</Link>
			</section>
		</>;
	} else if (pathname == '/events') {
		return (
			<>
				<section className='flex flex-1 flex-col items-center justify-center gap-6 p-4'>
					<h1 className='text-4xl font-bold'>Opps!</h1>
					<p className='text-center text-lg'>
						{error?.message ||
							'Nenhum evento foi criado ainda experimente cria um... 👀'}
					</p>
					<Link
						to={'/events/create'}
						className='btn relative flex w-60 justify-center gap-2 bg-orange-500 p-4 py-2 text-white'
					>
						<Plus
							size={26}
							aria-hidden='true'
							focusable='false'
						/>
						Criar Evento
					</Link>
				</section>
			</>
		);
	} else {
		return (
			<>
				<section className='flex flex-1 flex-col items-center justify-center gap-6 p-4'>
					<h1 className='text-4xl font-bold'>Opps!</h1>
					<p className='text-center text-lg'>
						{error?.message ||
							'Nossos serviços estão indisponíveis no momento... 😥'}
					</p>
					<Link
						to={'/'}
						className='btn relative flex w-60 justify-center gap-2 bg-orange-500 p-4 py-2 text-white'
					>
						<MoveLeft
							size={26}
							aria-hidden='true'
							focusable='false'
						/>
						Voltar
					</Link>
				</section>
			</>
		);
	}
}
