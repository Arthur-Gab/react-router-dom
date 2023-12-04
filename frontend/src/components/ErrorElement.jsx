import {
	Link,
	useRouteError,
	isRouteErrorResponse,
	useAsyncError,
} from 'react-router-dom';
import { MoveLeft, Plus } from 'lucide-react';

export function ErrorElement() {
	const error = useRouteError();
	const response_error = useAsyncError();

	if (isRouteErrorResponse(error)) {
		// Rotas que não existem
		return (
			<>
				<section className='flex flex-1 flex-col items-center justify-center gap-6 p-4'>
					<h1 className='text-4xl font-bold'>{error.status}</h1>
					<p className='text-center sm:text-lg'>
						{error.response?.data ||
							'Parece que você está acessando uma página que não existe... 😥'}
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
	} else if (error) {
		// Error de loading
		const { response } = error;
		return (
			<>
				<section className='flex flex-1 flex-col items-center justify-center gap-6 p-4'>
					<h1 className='text-4xl font-bold'>{response.status}</h1>
					<p className='text-center sm:text-lg'>
						{response?.data.error ||
							'Parece que você está acessando uma página que não existe... 😥'}
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

	// Error de request or response
	return (
		<>
			<section className='flex flex-1 flex-col items-center justify-center gap-6 p-4'>
				<h1 className='text-4xl font-bold'>Opps!</h1>
				<p className='text-center text-lg'>
					{response_error?.error ||
						'Nossos serviços estão indisponíveis no momento... 😥'}
				</p>
				{response_error?.error && (
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
				)}
			</section>
		</>
	);
}
