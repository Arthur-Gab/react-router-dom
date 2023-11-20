import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navbar } from './components/Navbar';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Navbar />,
	},
]);

export default function App() {
	return <RouterProvider router={router} />;
}
