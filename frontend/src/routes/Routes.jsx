import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { EventForm } from '../components/EventForm';

export function RoutesApp() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/events/create"
					element={
						<EventForm
							method="POST"
							title={'Criar Evento'}
							nav_label={'Voltar'}
						/>
					}
				/>
				<Route
					path="/events/edit"
					element={
						<EventForm
							method="PATCH"
							title={'Editar Evento'}
							nav_label={'Cancelar'}
						/>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}
