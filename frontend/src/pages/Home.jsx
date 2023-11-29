import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitch } from 'lucide-react';

export function Home() {
	return (
		<>
			<main className='container p-4'>
				<h1 className='mb-8 text-center text-2xl'>
					Este é meu{' '}
					<span className='relative inline-block -rotate-12 bg-orange-500 p-2 text-white'>
						React-Router
					</span>
				</h1>
				<figure className='flex justify-center'>
					<img
						src='https://avatars.githubusercontent.com/u/89430618?v=4'
						alt='Author deste projeto'
						className='rounded-full border-2 border-black max-lg:w-96 max-md:w-80 max-sm:w-60'
					/>
				</figure>
				<section className='mt-6 rounded-lg bg-neutral-100 p-6 shadow-lg shadow-black/20'>
					<h2 className='mb-4 text-center text-3xl font-bold'>
						👋 Olá, eu sou o Arthur Gabriel
					</h2>
					<ul className='mb-6 flex justify-center gap-6'>
						<li className='flex'>
							<Link
								to='https://github.com/Arthur-Gab'
								target='_blank'
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
								to='https://www.linkedin.com/in/art2354/'
								target='_blank'
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
						<li className='flex'>
							<Link
								to='https://www.twitch.tv/a_gfer'
								target='_blank'
								className='h-fit w-fit rounded bg-orange-500 p-2 text-white'
								aria-label='Visite meu canal na Twitch'
							>
								<Twitch
									size={32}
									aria-hidden='true'
									focusable='false'
								/>
							</Link>
						</li>
					</ul>

					<div className='text-center'>
						<div className='mb-8'>
							<h3 className='mb-2 text-xl font-semibold'>No Frontend</h3>
							<p className='mb-6'>
								Para este projeto, utilizei o React Router Dom para lidar com as
								rotas, Tailwind CSS para a estilização, React Query para fetch e
								cacheamento das respostas, e React Hook Form para validação das
								entradas do usuário.
							</p>
							<h4 className='mb-2 font-semibold'>🚀 Update 🚀</h4>
							<ul>
								<li className='mx-auto w-fit list-disc'>
									Melhora do Cacheamento
								</li>
							</ul>
						</div>
						<div>
							<h3 className='mb-2 text-xl font-semibold'>No Backend</h3>
							<p className='mb-6'>
								Levantei uma REST API -CRUD - com arquitetura MVC, utilizando
								TypeScript e Express para os Controllers, e Prisma para os
								Model.
							</p>
							<h4 className='mb-2 font-semibold'>🚧 Em construção 🚧</h4>
							<ul>
								<li className='mx-auto w-fit list-disc'>
									Cacheamento no Servidor
								</li>
							</ul>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
