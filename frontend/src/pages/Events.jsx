import { Navbar } from '../components/Navbar';
import { EventItem } from '../components/EventItem';

export function Events() {
	return (
		<>
			<Navbar />
			<main className="container p-4 mt-4">
				<EventItem />
			</main>
		</>
	);
}
