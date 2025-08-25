# GitHub Actions セットアップガイド

## 概要

このプロジェクトでは、developブランチへのマージ時に自動的にCloudflareのdev環境にデプロイするGitHub Actionsワークフローを設定しています。

## ワークフローの動作

1. **変更検知**: [tj-actions/changed-files](https://github.com/marketplace/actions/changed-files)アクションを使用して、developブランチへのpush時に、バックエンド（`apps/backend/`）またはフロントエンド（`apps/frontend/`）の変更を高速で検知
2. **条件付きデプロイ**: [cloudflare/wrangler-action](https://github.com/cloudflare/wrangler-action)を使用して、変更があった部分のみをdev環境にデプロイ
3. **環境分離**: バックエンドは`alc-lovers-dev`、フロントエンドは`alc-lovers-frontend-dev`にデプロイ

## 必要な設定

### 1. GitHub Secrets の設定

GitHubリポジトリの設定で以下のSecretsを設定してください：

#### 必須のSecrets

- `CLOUDFLARE_API_TOKEN`: Cloudflare API Token
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare Account ID

#### オプションのSecrets（環境変数用）

- `DATABASE_URL_DEV`: 開発環境用データベースURL
- `API_KEY_DEV`: 開発環境用APIキー
- `NEXT_PUBLIC_API_URL_DEV`: フロントエンド用API URL

#### Cloudflare API Token の作成手順

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) にログイン
2. 右上のプロフィールアイコン → "My Profile"
3. "API Tokens" タブを選択
4. "Create Token" をクリック
5. "Use template" から "Custom token" を選択
6. 以下の権限を設定：
   - **Account**: Workers Scripts (Edit)
   - **Account**: Workers Routes (Edit)
   - **Zone**: Workers Routes (Edit) - 必要に応じて
7. Account Resources で対象のアカウントを選択
8. Zone Resources で対象のドメインを選択（必要に応じて）
9. "Continue to summary" → "Create Token"
10. 生成されたトークンをコピーしてGitHub Secretsに設定

#### Cloudflare Account ID の取得方法

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) にログイン
2. 右サイドバーの "Workers & Pages" をクリック
3. 右上に表示されるAccount IDをコピー

### 2. GitHub Secrets の設定手順

1. GitHubリポジトリのページに移動
2. "Settings" タブをクリック
3. 左サイドバーの "Secrets and variables" → "Actions" をクリック
4. "New repository secret" をクリック
5. 以下のSecretsを追加：
   - Name: `CLOUDFLARE_API_TOKEN`, Value: [上記で作成したAPI Token]
   - Name: `CLOUDFLARE_ACCOUNT_ID`, Value: [上記で取得したAccount ID]

## ワークフローの詳細

### デプロイワークフロー（deploy-dev.yml）

#### トリガー条件
- `develop`ブランチへのpush

### Pull Requestワークフロー（pull-request.yml）

#### トリガー条件
- `main`または`develop`ブランチへのPull Request作成・更新

#### 実行内容
- [dorny/paths-filter](https://github.com/dorny/paths-filter)による変更検知（バックエンド・フロントエンド・共有設定）
- 条件付きビルド・テスト
- Biomeリンター・フォーマットチェック
- 型チェック
- Cloudflare用ビルド

### 厳密テストワークフロー（strict-test.yml）

#### トリガー条件
- `main`ブランチへのPull Request作成・更新

#### 実行内容
- 全体的なビルド・テスト
- Biomeリンター・フォーマットチェック
- セキュリティ監査
- エラーが発生した場合は失敗

### ジョブ構成

1. **detect-changes**: [tj-actions/changed-files](https://github.com/marketplace/actions/changed-files)を使用して変更されたファイルを高速検知
2. **deploy-backend**: [cloudflare/wrangler-action](https://github.com/cloudflare/wrangler-action)を使用してバックエンドをデプロイ
3. **deploy-frontend**: [cloudflare/wrangler-action](https://github.com/cloudflare/wrangler-action)を使用してフロントエンドをデプロイ
4. **notify-no-changes**: 変更がない場合の通知

### デプロイ先

- **バックエンド**: `alc-lovers-dev` (Cloudflare Workers)
- **フロントエンド**: `alc-lovers-frontend-dev` (Cloudflare Workers)

## トラブルシューティング

### よくある問題

1. **権限エラー**: Cloudflare API Tokenの権限が不足している
2. **認証エラー**: Account IDが間違っている
3. **ビルドエラー**: 依存関係のインストールに失敗

### ログの確認方法

1. GitHubリポジトリの "Actions" タブをクリック
2. 実行されたワークフローを選択
3. 各ジョブのログを確認

## 開発フロー

1. 機能ブランチで開発
2. Pull Requestを作成
3. 自動的にビルド・テストが実行される
4. レビュー・承認後、developブランチにマージ
5. 自動的にdev環境にデプロイ
6. 動作確認後、mainブランチにマージ（本番デプロイ）

## 注意事項

- このワークフローはdev環境のみを対象としています
- 本番環境へのデプロイは別途設定が必要です
- API Tokenは定期的に更新することを推奨します
- 機密情報は絶対にコードに直接記述しないでください
