export function Loading({ title }) {
	return (
		<>
			<section className='flex h-full w-full flex-col items-center justify-center gap-8'>
				<h1 className='text-xl font-bold'>{title}</h1>
				<div className='flex gap-4'>
					<div className='animate-loading h-4 w-4 rounded-full bg-orange-400'></div>
					<div className='animation-delay-200 animate-loading h-4 w-4 rounded-full bg-orange-400'></div>
					<div className='animation-delay-350 animate-loading h-4 w-4 rounded-full bg-orange-400'></div>
				</div>
			</section>
		</>
	);
}
