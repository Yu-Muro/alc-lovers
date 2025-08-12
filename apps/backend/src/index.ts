import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createTodoRoutes } from './presentation/routes/todoRoutes';

const app = new Hono();

app.use(
    '*',
    cors({
        origin: '*',
    }),
);

const appWithRoutes = app.route('/', createTodoRoutes());

export type AppType = typeof appWithRoutes;

export default appWithRoutes;
