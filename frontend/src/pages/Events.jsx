import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export function Events() {
	return (
		<>
			<Navbar />
			<main className="container p-4 mt-4 max-w-4xl">
				<article className="p-6 rounded-md bg-neutral-100 shadow shadow-black/20">
					<div className="flex flex-col relative z-0">
						<figure className="w-fit before:rounded self-center">
							<img
								src="https://picsum.photos/300/200"
								alt="Random Image"
								className="rounded shadow"
							/>
						</figure>
						<h2 className="mt-6 text-2xl text-center mb-2">Title</h2>
						<p>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry.
						</p>

						<Link
							to={'/events/edit/1'}
							className="bg-orange-500 btn w-full mt-8 text-center p-2"
						>
							Editar
						</Link>
					</div>
				</article>
			</main>
		</>
	);
}
