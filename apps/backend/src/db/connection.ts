import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { users } from './schema';

// Cloudflare WorkersのHyperdrive型をインポート
interface Hyperdrive {
    connectionString: string;
}

export interface Env {
    HYPERDRIVE: Hyperdrive;
}

export function createDatabaseClient(env: Env) {
    // Hyperdrive経由で接続されたpostgres.jsドライバーでデータベースクライアントを作成
    const sql = postgres(env.HYPERDRIVE.connectionString, {
        // Workersの同時外部接続制限により、Workerリクエストの接続数を5に制限
        max: 5,
        // Postgresスキーマで配列型を使用していない場合、追加のラウンドトリップ（不要な遅延）を避けるために`fetch_types`を無効化
        fetch_types: false,
    });

    // postgres.js接続でDrizzleクライアントを作成
    return drizzle(sql);
}

// 他のファイルで使用するためにusersテーブルをエクスポート
export { users };
