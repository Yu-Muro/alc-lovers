import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';
import type { Env } from './db/connection';
import { createUserRoutes } from './presentation/routes/userRoutes';

const app = new Hono<{ Bindings: Env }>();

// CORS設定（すべてのオリジンを許可）
app.use(
    '*',
    cors({
        origin: '*',
    }),
);

// セキュリティヘッダーを追加（HSTS: HTTP Strict Transport Security）
app.use(
    '*',
    secureHeaders({
        strictTransportSecurity: 'max-age=31536000; includeSubDomains',
    }),
);
// APIルートを設定
const appWithRoutes = app.route('/api', createUserRoutes());

export type AppType = typeof appWithRoutes;

export default app;
