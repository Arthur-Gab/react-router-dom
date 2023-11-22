import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:3838',
	})
);

app.use(routes);

app.listen(3000, () => {
	console.log(`🏃‍♂️ on port 3000`);
});
