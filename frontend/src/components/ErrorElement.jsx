import { useRouteError } from 'react-router-dom';

export function ErrorElement() {
	const error = useRouteError();
	console.error(error);

	return (
		<>
			<section className='flex flex-1 flex-col items-center justify-center gap-6'>
				<h1 className='text-4xl font-bold'>Opps!</h1>
				<p className='text-center text-lg'>
					{error?.message ||
						'Nossos serviços estão indisponíveis no momento... 😥'}
				</p>
			</section>
		</>
	);
}
