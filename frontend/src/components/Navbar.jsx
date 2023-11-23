import { Link, NavLink, Outlet } from 'react-router-dom';
import { Route as Logo, Menu, X, Plus } from 'lucide-react';
import { useState, useRef } from 'react';

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	const closerBtn = useRef(null);
	const openBtn = useRef(null);

	function handlerOpenMenu() {
		setIsOpen(true);

		// Focus on closer btn
		closerBtn.current.focus({ focusVisible: true });
	}

	function handlerCloseMenu() {
		setIsOpen(false);

		// Focus on burguer btn
		openBtn.current.focus({ focusVisible: true });
	}

	return (
		<>
			<header
				className={`w-screen border-b-2 border-b-orange-500 bg-white ${
					isOpen && 'fixed left-0 top-0 z-20 h-screen'
				}`}
			>
				<nav
					className={`container flex items-center justify-between p-2 ${
						isOpen && ''
					}`}
				>
					<Link to={'/'}>
						<Logo
							size={32}
							className='text-orange-500'
						/>
					</Link>

					<button
						aria-label='Abrir Menu'
						onClick={handlerOpenMenu}
						ref={openBtn}
						className='sm:hidden'
					>
						<Menu
							size={32}
							aria-hidden='true'
							className='pointer-events-none text-orange-500'
						/>
					</button>

					{/* Backdrop */}
					{isOpen && (
						<div
							className='absolute right-0 top-0 z-20 h-full w-full bg-black/20'
							onClick={handlerCloseMenu}
						></div>
					)}

					{/* Menu */}
					<ul
						className={`flex transition-all max-sm:absolute max-sm:right-0 max-sm:top-0 max-sm:z-30 max-sm:h-full max-sm:flex-col max-sm:bg-orange-500 sm:items-center sm:gap-6 sm:p-2 ${
							isOpen ? 'max-sm:w-10/12' : 'max-sm:w-0'
						}`}
					>
						<button
							className={`opacity-1 w-fit self-end p-2 transition-opacity  sm:hidden ${
								!isOpen && 'opacity-5 max-sm:w-0'
							}`}
							onClick={handlerCloseMenu}
							ref={closerBtn}
						>
							<X
								size={36}
								aria-hidden='true'
							/>
						</button>

						<li className='text-center text-xl max-sm:mb-6'>
							<NavLink
								to={'/'}
								onClick={handlerCloseMenu}
								className={({ isActive }) =>
									isActive
										? "sm:relative sm:text-orange-500 sm:before:absolute sm:before:bottom-0 sm:before:left-0 sm:before:h-[2px] sm:before:w-6/12 sm:before:bg-black sm:before:content-['']"
										: 'text-black'
								}
							>
								HOME
							</NavLink>
						</li>
						<li className='text-center text-xl max-sm:mb-6'>
							<NavLink
								to={'/events'}
								onClick={handlerCloseMenu}
								className={({ isActive }) =>
									isActive
										? "sm:relative sm:text-orange-500 sm:before:absolute sm:before:bottom-0 sm:before:left-0 sm:before:h-[2px] sm:before:w-6/12 sm:before:bg-black sm:before:content-['']"
										: 'text-black'
								}
							>
								EVENTOS
							</NavLink>
						</li>

						<div className='max-sm:absolute max-sm:bottom-0 max-sm:w-full max-sm:p-4'>
							<Link
								to={'/events/create'}
								className='btn relative flex w-full justify-center gap-2 bg-white p-4 py-2 sm:bg-orange-500 sm:text-white'
								onClick={handlerCloseMenu}
							>
								<Plus size={24} />
								Criar Evento
							</Link>
						</div>
					</ul>
				</nav>
			</header>
			<Outlet />
		</>
	);
}
