import { Link } from 'react-router-dom';
import { Github, Linkedin } from 'lucide-react';

export function Home() {
	return (
		<>
			<main className='container p-4'>
				<figure className='flex justify-center'>
					<img
						src='https://avatars.githubusercontent.com/u/89430618?v=4'
						alt='Author deste projeto'
						className='rounded-full border-2 border-black max-lg:w-96 max-md:w-80 max-sm:w-60'
					/>
				</figure>
				<section className='mt-6 rounded-lg bg-gray-100 p-6 shadow-lg'>
					<h1 className='mb-4 text-center text-3xl font-bold'>
						👋 Olá, eu sou o Arthur Gabriel
					</h1>
					<ul className='mb-6 flex justify-center gap-6'>
						<li className='flex'>
							<Link
								to='https://github.com/Arthur-Gab'
								className='h-fit w-fit rounded bg-orange-500 p-2 text-white'
								aria-label='Visite meu perfil no Github'
							>
								<Github
									size={32}
									aria-hidden='true'
									focusable='false'
								/>
							</Link>
						</li>
						<li className='flex'>
							<Link
								to='https://github.com/Arthur-Gab'
								className='h-fit w-fit rounded bg-orange-500 p-2 text-white'
								aria-label='Visite meu perfil no Linkedin'
							>
								<Linkedin
									size={32}
									aria-hidden='true'
									focusable='false'
								/>
							</Link>
						</li>
					</ul>

					<div className='text-center'>
						<h2 className='mb-2 text-lg'>
							E este é meu{' '}
							<span className='relative inline-block -rotate-6 transform bg-orange-500 px-2 py-1 text-white'>
								React-Router
							</span>
						</h2>
						<h3 className='mb-2 text-xl font-semibold'>No Frontend</h3>
						<p className='mb-4'>
							Para este projeto, utilizei o React Router Dom para lidar com as
							rotas, Tailwind CSS para a estilização, React Query para fetch e
							cacheamento das respostas, e React Hook Form para validação.
						</p>
						<h3 className='mb-2 text-xl font-semibold'>No Backend</h3>
						<p>
							Levantei uma REST API com arquitetura MVC, utilizando Express,
							TypeScript e Prisma para os Model.
						</p>
					</div>
				</section>
			</main>
		</>
	);
}
