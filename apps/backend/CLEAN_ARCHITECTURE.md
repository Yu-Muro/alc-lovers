# クリーンアーキテクチャ移行ガイド

## 移行完了項目

### ✅ 完了

- [x] ユースケース層の実装 (`use-cases/`)
- [x] 依存関係の逆転（リポジトリパターン）
- [x] DIコンテナの導入
- [x] エンティティの拡張（ID、タイムスタンプ追加）
- [x] エラーハンドリングの改善
- [x] 古いDDDサービスの削除
- [x] 不要なディレクトリの削除とクリーンアップ

### 🔄 進行中

- [ ] データベース実装（現在はInMemory）
- [ ] より複雑なビジネスルールの実装
- [ ] テストの追加

## アーキテクチャ構造

```
src/
├── domain/                    # エンティティ、値オブジェクト
│   └── entities/
│       └── todo.ts
├── use-cases/                 # アプリケーションビジネスルール
│   └── todo/
│       ├── CreateTodoUseCase.ts
│       └── GetTodosUseCase.ts
├── interface-adapters/        # リポジトリ実装
│   └── repositories/
│       └── InMemoryTodoRepository.ts
├── presentation/              # Webフレームワーク層
│   ├── controllers/
│   │   └── todoController.ts
│   └── routes/
│       └── todoRoutes.ts
├── infrastructure/            # バリデーション、外部ツール
│   └── validators/
│       └── todoValidator.ts
└── shared/                   # 共通ユーティリティ
    └── container/
        └── DIContainer.ts

```

## 依存関係の方向

```
Frameworks & Drivers → Interface Adapters → Use Cases → Domain
```

- **Domain**: 最も内側、他に依存しない
- **Use Cases**: ドメインのみに依存
- **Interface Adapters**: ユースケースとドメインに依存
- **Frameworks & Drivers**: 最も外側、すべてに依存可能

## 次のステップ

1. **データベース実装**: PrismaやD1を使った永続化層
2. **テスト追加**: 各層のユニットテスト
3. **エラーハンドリング**: カスタム例外クラス
4. **ログ機能**: 構造化ログの実装
5. **認証・認可**: セキュリティ層の追加

## API エンドポイント

- `GET /hello` - ヘルスチェック
- `GET /todos` - Todo一覧取得
- `POST /todos` - Todo作成
