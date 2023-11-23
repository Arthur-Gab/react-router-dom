import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from '../pages/Home';
import { EventForm } from '../components/EventForm';
import { Events, loader as eventLoader } from '../pages/Events';
import { Navbar } from '../components/Navbar';

const routes = createBrowserRouter([
	{
		path: '/',
		element: <Navbar />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'events',
				element: <Events />,
				loader: eventLoader,
			},
		],
	},
	{
		path: '/events/create',
		element: (
			<EventForm
				method='POST'
				title={'Criar Evento'}
				nav_label={'Voltar'}
			/>
		),
	},
	{
		path: '/events/edit/:id',
		element: (
			<EventForm
				method='PATCH'
				title={'Editar Evento'}
				nav_label={'Cancelar'}
			/>
		),
	},
]);

export function RoutesApp() {
	return <RouterProvider router={routes} />;
}
