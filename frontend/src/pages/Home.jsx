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
				<section className='mt-6'>
					<h1 className='text-center text-2xl'>👋, eu sou o Arthur Gabriel</h1>
				</section>
			</main>
		</>
	);
}
