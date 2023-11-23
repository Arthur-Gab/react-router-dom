import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from '../pages/Home';
import { EventForm } from '../components/EventForm';
import { Events, loader as eventLoader } from '../pages/Events';
import { Navbar } from '../components/Navbar';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5min
		},
	},
});

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
				loader: eventLoader(queryClient),
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
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={routes} />
			<ReactQueryDevtools position='bottom' />
		</QueryClientProvider>
	);
}
