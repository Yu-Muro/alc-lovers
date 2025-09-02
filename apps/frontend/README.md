# Frontend Application

Next.js 15 App Routerを使用したモダンなフロントエンドアプリケーション。Cloudflare WorkersにデプロイするためにOpenNextで最適化されています。

## 🏗️ アーキテクチャ

### ディレクトリ構造

```
app/
├── layout.tsx           # ルートレイアウト
├── page.tsx            # ホームページ
├── globals.css         # グローバルスタイル
└── utils/              # ユーティリティ
    └── client.ts       # APIクライアント
```

### 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **スタイリング**: Tailwind CSS v4
- **APIクライアント**: Hono Client for type-safe API calls
- **デプロイ**: Cloudflare Workers (OpenNext)
- **フォント**: Geist (Google Fonts)

## 🚀 セットアップ

### 前提条件

- [Bun](https://bun.sh/) (最新版)
- バックエンドAPIサーバーが起動していること

### インストール

1. **依存関係をインストール**
   ```bash
   bun install
   ```

2. **環境変数を設定**
   ```bash
   cp .env.example .env
   ```

3. **開発サーバーを起動**
   ```bash
   bun run dev
   ```

4. **ブラウザでアクセス**
   ```
   http://localhost:8771
   ```

## 📱 ページ構成

### ホームページ (`/`)

シンプルなボタンクリックでAPIを呼び出すデモページです。

```tsx
'use client';

import { client } from '@/app/utils/client';

export default function Home() {
  const handleClick = async () => {
    const res = await client.api.users.$get({});
    alert(res.json());
  };

  return (
    <div>
      <button type='button' onClick={handleClick}>
        Click me
      </button>
    </div>
  );
}
```

## 🔗 API統合

### Hono Client

型安全なAPI呼び出しのためのHono Clientを使用しています：

```typescript
import type { AppType } from 'backend/src';
import { hc } from 'hono/client';

export const client = hc<AppType>(process.env.NEXT_PUBLIC_API_URL!);
```

### API呼び出し例

```typescript
// ユーザー一覧取得
const users = await client.api.users.$get({});

// ユーザー作成
const newUser = await client.api.users.$post({
  json: {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  },
});
```

## 🎨 スタイリング

### Tailwind CSS v4

最新のTailwind CSS v4を使用してスタイリングを行います：

```tsx
<div className="container mx-auto px-4 py-8">
  <h1 className="text-3xl font-bold text-gray-900">
    Welcome to Alc Lovers
  </h1>
  <p className="mt-4 text-gray-600">
    A modern full-stack application
  </p>
</div>
```

### フォント

Geistフォントを使用してモダンなタイポグラフィを実現：

```tsx
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});
```

## 🛠️ 開発スクリプト

```bash
# 開発
bun run dev              # 開発サーバー起動 (ポート8771)
bun run build            # 本番用ビルド
bun run build:cloudflare # Cloudflare用ビルド
bun run lint             # Biomeリンター実行
bun run type-check       # TypeScript型チェック

# デプロイ
bun run deploy           # 本番環境にデプロイ
bun run deploy:dev       # 開発環境にデプロイ
```

## 🧪 テスト

### テスト実行

```bash
bun test
```

### テスト構造

- **ユニットテスト**: 個別のコンポーネント
- **統合テスト**: ページとAPI統合
- **E2Eテスト**: 完全なユーザーワークフロー

## 🚀 デプロイ

### Cloudflare Workers

OpenNextを使用してCloudflare Workersにデプロイ：

```bash
# 開発環境
bun run deploy:dev

# 本番環境
bun run deploy
```

### 環境変数

```bash
# 本番環境変数
NEXT_PUBLIC_API_URL=your_api_url
```

## 🔧 開発ガイドライン

### コンポーネント設計

```tsx
import React from 'react';

interface ComponentProps {
  title: string;
  description?: string;
}

export default function ComponentName({ title, description }: ComponentProps) {
  return (
    <div className="container">
      <h1 className="text-2xl font-bold">{title}</h1>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  );
}
```

### ページ設計

```tsx
import React from 'react';

export default function PageName() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* ページコンテンツ */}
      </div>
    </main>
  );
}
```

### コード品質

- **リンター**: Biome for consistent code style
- **型安全性**: Strict TypeScript configuration
- **コンポーネント**: Functional components with hooks
- **スタイリング**: Tailwind CSS with consistent design system

## 📱 レスポンシブデザイン

### ブレークポイント

```css
/* Tailwind CSS ブレークポイント */
sm: 640px   /* スマートフォン */
md: 768px   /* タブレット */
lg: 1024px  /* デスクトップ */
xl: 1280px  /* 大画面 */
2xl: 1536px /* 超大画面 */
```

### レスポンシブ例

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="p-4 bg-white rounded-lg shadow">
    {/* カードコンテンツ */}
  </div>
</div>
```

## 🔐 セキュリティ

### セキュリティ機能

- **環境変数**: クライアントサイドで安全な設定管理
- **CORS**: 適切なクロスオリジン設定
- **入力バリデーション**: フロントエンドとバックエンド両方で検証
