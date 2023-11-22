import { Link } from 'react-router-dom';

export function EventItem() {
	return (
		<article className="p-6 rounded-md bg-neutral-100 shadow shadow-black/20  max-w-3xl mx-auto">
			<div className="flex max-md:flex-col md:flex md:gap-6">
				<figure className="self-center w-full">
					<img
						src="https://picsum.photos/500/400"
						alt="Random Image"
						className="rounded shadow w-full h-full min-w-[320px]"
					/>
				</figure>
				<div className="relative z-0 flex flex-col">
					<h2 className="mt-6 text-2xl text-center mb-2">Title</h2>
					<p>
						Lorem Ipsum is simply dummy text of the printing and typesetting industry.
						Lorem Ipsum has been the industry.
					</p>

					<Link
						to={'/events/edit/1'}
						className="bg-orange-500 btn w-full mt-8 text-center p-2"
					>
						Editar
					</Link>
				</div>
			</div>
		</article>
	);
}
