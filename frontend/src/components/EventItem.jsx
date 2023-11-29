import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export function EventItem({ id, title, description, image, date }) {
	const [isOpen, setIsOpen] = useState(false);
	const eventDescription = useRef(null);
	const seeMoreButton = useRef(null);

	function handlerCloseEventDescriptionOverflow() {
		setIsOpen(false);
		seeMoreButton.current.focus({ focusVisible: true });
	}

	function handlerOpenEventDescriptionOverflow() {
		setIsOpen(true);
		eventDescription.current.focus({ focusVisible: true });
	}

	return (
		<article className='mb-12 h-fit self-center rounded-md bg-neutral-100 p-6  shadow shadow-black/20 max-md:max-w-2xl md:w-full'>
			<div className='flex max-md:flex-col md:flex md:gap-6'>
				<figure className='relative max-w-[350px] flex-1 self-center'>
					<span className='absolute left-2/4 top-2/4 z-10 -translate-x-1/2 -translate-y-1/2 rounded bg-white/75 px-4 py-1 text-2xl max-sm:text-lg'>
						{date}
					</span>
					<img
						src={image}
						alt={title}
						className='h-full w-full rounded shadow brightness-75'
					/>
				</figure>
				<div className='relative z-0 flex flex-1 flex-col'>
					<h2 className='mb-4 text-center text-2xl font-bold max-md:mt-6'>
						{title}
					</h2>
					<span
						className={`overflow-hidden bg-transparent ${
							isOpen ? 'mb-6 h-fit rounded' : 'max-md:h-24 md:h-36'
						}`}
						role='button'
						tabIndex={1}
						ref={eventDescription}
						onKeyDown={(e) => {
							if (e.key == 'Enter') {
								e.preventDefault();
								handlerCloseEventDescriptionOverflow();
							}
						}}
						onClick={handlerCloseEventDescriptionOverflow}
					>
						{description}
					</span>

					<button
						onClick={handlerOpenEventDescriptionOverflow}
						ref={seeMoreButton}
						className={`mb-4 w-fit py-1 text-orange-700 ${isOpen && 'sr-only'}`}
					>
						Veja mais
					</button>

					<div className='w-full md:relative md:bottom-0 md:left-0 md:z-0'>
						<Link
							to={`/events/edit/${id}`}
							className='btn block w-full bg-orange-500 p-2 text-center'
						>
							Editar
						</Link>
					</div>
				</div>
			</div>
		</article>
	);
}
