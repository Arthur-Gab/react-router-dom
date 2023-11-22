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
			<header className="border-b-2 border-b-orange-500">
				<nav className="container p-2 flex justify-between items-center">
					<Link to={'/'}>
						<Logo
							size={32}
							className="text-orange-500"
						/>
					</Link>

					<button
						aria-label="Abrir Menu"
						onClick={handlerOpenMenu}
						ref={openBtn}
						className="sm:hidden"
					>
						<Menu
							size={32}
							aria-hidden="true"
							className="pointer-events-none text-orange-500"
						/>
					</button>

					{/* Backdrop */}
					{isOpen && (
						<div
							className="absolute top-0 right-0 w-full h-full z-20 bg-black/20"
							onClick={handlerCloseMenu}
						></div>
					)}

					{/* Menu */}
					<ul
						className={`flex sm:items-center sm:gap-6 sm:p-2 max-sm:flex-col max-sm:absolute max-sm:top-0 max-sm:right-0 max-sm:h-full max-sm:z-30 max-sm:bg-orange-500 transition-all ${
							isOpen ? 'max-sm:w-10/12' : 'max-sm:w-0'
						}`}
					>
						<button
							className={`p-2 w-fit self-end sm:hidden transition-opacity  opacity-1 ${
								!isOpen && 'max-sm:w-0 opacity-5'
							}`}
							onClick={handlerCloseMenu}
							ref={closerBtn}
						>
							<X
								size={36}
								aria-hidden="true"
							/>
						</button>

						<li className="text-center text-xl max-sm:mb-6">
							<NavLink
								to={'/'}
								onClick={handlerCloseMenu}
								className={({ isActive }) =>
									isActive
										? "sm:relative sm:text-orange-500 sm:before:content-[''] sm:before:absolute sm:before:bottom-0 sm:before:left-0 sm:before:w-6/12 sm:before:h-[2px] sm:before:bg-black"
										: 'text-black'
								}
							>
								HOME
							</NavLink>
						</li>
						<li className="text-center text-xl max-sm:mb-6">
							<NavLink
								to={'/events'}
								onClick={handlerCloseMenu}
								className={({ isActive }) =>
									isActive
										? "sm:relative sm:text-orange-500 sm:before:content-[''] sm:before:absolute sm:before:bottom-0 sm:before:left-0 sm:before:w-6/12 sm:before:h-[2px] sm:before:bg-black"
										: 'text-black'
								}
							>
								EVENTOS
							</NavLink>
						</li>

						<div className="max-sm:p-4 max-sm:absolute max-sm:w-full max-sm:bottom-0">
							<Link
								to={'/events/create'}
								className="relative flex p-4 gap-2 w-full bg-white sm:bg-orange-500 sm:text-white justify-center py-2 btn"
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
