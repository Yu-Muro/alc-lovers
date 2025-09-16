import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';
import type { Env } from './db/connection';
import { createUserRoutes } from './presentation/routes/userRoutes';

const app = new Hono<{ Bindings: Env }>();

app.use(
    '*',
    cors({
        origin: '*',
    }),
);

// セキュリティヘッダーを追加
app.use(
    '*',
    secureHeaders({
        strictTransportSecurity: 'max-age=31536000; includeSubDomains',
    }),
);
const appWithRoutes = app.route('/api', createUserRoutes());

export type AppType = typeof appWithRoutes;

export default app;
