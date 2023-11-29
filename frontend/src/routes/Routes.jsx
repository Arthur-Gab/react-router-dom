import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { ErrorElement } from '../components/ErrorElement';
import { Home } from '../pages/Home';
import { Events, loader as eventLoader } from '../pages/Events';
import {
	EditEvent,
	loader as updateEventLoader,
	action as updateEventAction,
} from '../pages/EditEvent';
import { CreateEvent, action as createEventAction } from '../pages/CreateEvent';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 2, // 2min
		},
	},
});

const routes = createBrowserRouter([
	{
		path: '/',
		element: <Navbar />,
		errorElement: <ErrorElement />,
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
		path: '/events/edit/:id',
		element: <EditEvent />,
		errorElement: <ErrorElement />,
		loader: updateEventLoader(queryClient),
		action: updateEventAction(queryClient),
	},
	{
		path: '/events/create',
		element: <CreateEvent />,
		errorElement: <ErrorElement />,
		action: createEventAction(queryClient),
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
