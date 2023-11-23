import { Link } from 'react-router-dom';

export function EventItem({ id, title, description, image, date }) {
	return (
		<article className='mb-12 h-fit w-full max-w-3xl self-center rounded-md  bg-neutral-100 p-6 shadow shadow-black/20'>
			<div className='flex max-md:flex-col md:flex md:gap-6'>
				<figure className='relative w-full max-w-[350px] self-center'>
					<span className='absolute left-2/4 top-2/4 z-10 -translate-x-1/2 -translate-y-1/2 rounded bg-white/75 px-4 py-1 text-2xl'>
						{date}
					</span>
					<img
						src={image}
						alt={title}
						className='h-full w-full rounded shadow brightness-75'
					/>
				</figure>
				<div className='relative z-0 flex flex-col'>
					<h2 className='mb-2 mt-6 text-center text-2xl font-bold'>{title}</h2>
					<p>{description}</p>

					<Link
						to={`/events/edit/${id}`}
						className='btn mt-8 w-full bg-orange-500 p-2 text-center'
					>
						Editar
					</Link>
				</div>
			</div>
		</article>
	);
}
