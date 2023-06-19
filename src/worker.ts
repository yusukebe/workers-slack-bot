import { Hono } from 'hono';
import lookup from './routes/lookup';
import webhook from './routes/webhook';

const app = new Hono();

app.route('/lookup', lookup);
app.route('/webhook', webhook);

export default app;
