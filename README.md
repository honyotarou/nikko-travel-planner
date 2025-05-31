# 🏔️ 日光観光プランナー

GPS位置情報と天気予報を活用した日光観光プランナー。滞在時間・人数・年齢・性別に応じた最適な観光ルートを提案するWebアプリケーションです。

## 🌟 特徴

- **GPS位置情報連携**: 現在地から日光までの距離を自動計算
- **天気予報連携**: OpenWeatherMap APIを使用した天気に応じたプラン調整
- **スマートな推奨**: 年齢層、人数、交通手段を考慮した最適化
- **レスポンシブデザイン**: モバイル・デスクトップ対応
- **リアルタイム更新**: 天気情報の自動更新

## 🛠️ 技術スタック

### フロントエンド
- **Framework**: Remix (React Router v7)
- **Styling**: TailwindCSS v4 + daisyUI
- **Map**: Leaflet.js (OpenStreetMap)
- **位置情報**: Web Geolocation API

### バックエンド
- **Runtime**: Node.js
- **Framework**: Remix (サーバーサイド)
- **Database**: SQLite + Drizzle ORM + better-sqlite3
- **天気API**: OpenWeatherMap API

## 🚀 セットアップ

### 前提条件
- Node.js 18+
- npm または pnpm

### インストール

1. リポジトリをクローン
```bash
git clone <repository-url>
cd nikko-travel-planner
```

2. 依存関係をインストール
```bash
npm install
```

3. 環境変数の設定
```bash
cp .env.example .env
```

`.env`ファイルを編集してAPIキーを設定:
```env
OPENWEATHER_API_KEY=your_openweather_api_key_here
DATABASE_URL=./database.sqlite
```

4. データベースのセットアップ
```bash
npx drizzle-kit generate
npx drizzle-kit migrate
npx tsx app/db/seed.ts
```

5. 開発サーバーの起動
```bash
npm run dev
```

アプリケーションは http://localhost:5173 で利用できます。

## 📊 データベース構造

### テーブル一覧
- `tourist_spots`: 観光地マスターデータ
- `weather_cache`: 天気予報キャッシュ
- `user_plans`: ユーザー作成プラン
- `spot_reviews`: スポット評価

## 🗺️ 対応観光スポット

### 文化スポット
- 東照宮 (1-2時間)
- 輪王寺 (30分-1時間)
- 二荒山神社 (30分)

### 自然スポット
- 華厳の滝 (30分-1時間)
- 中禅寺湖 (1-3時間)
- いろは坂 (ドライブ30分)
- 竜頭の滝 (30分)
- 戦場ヶ原 (1.5時間)

### 温泉スポット
- 湯波の里 (2-3時間)
- 奥日光温泉 (宿泊推奨)

## 🎯 主要機能

### プラン生成アルゴリズム
1. **天気連携**: 明日の天気予報に基づく屋内外スポット調整
2. **時間最適化**: 滞在時間に応じたルート効率化
3. **属性マッチング**: 年齢層・人数による興味関心考慮
4. **交通手段最適化**: 移動時間・アクセス性を考慮

### 天気予報機能
- 現在の天気情報
- 明日の天気予報
- 観光に応じた服装・持ち物アドバイス
- 降水確率・風速・湿度などの詳細情報

## 🎨 UI/UX

- **daisyUI**: 一貫したデザインシステム
- **レスポンシブ**: モバイルファーストデザイン
- **アクセシビリティ**: ARIA対応、キーボードナビゲーション
- **多言語対応**: 日本語UI

## 🔧 開発

### コマンド一覧
```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm start

# データベースマイグレーション
npx drizzle-kit generate
npx drizzle-kit migrate

# データベースシード
npx tsx app/db/seed.ts

# 型チェック
npm run typecheck

# リント
npm run lint
```

### APIエンドポイント
- `GET /api/weather?lat=<lat>&lon=<lon>`: 天気情報取得

## 🌐 デプロイ

### Render対応
1. `render.yaml`設定ファイル含まれています
2. 環境変数の設定が必要:
   - `OPENWEATHER_API_KEY`
   - `DATABASE_URL`

## 📱 使い方

1. **位置情報取得**: アプリにアクセスして位置情報の許可
2. **条件入力**: 滞在時間、人数、年齢層、交通手段を選択
3. **プラン生成**: 天気予報を考慮した最適なプランを自動生成
4. **詳細確認**: 各スポットの詳細情報と推奨ルートを確認

## 🤝 貢献

プルリクエストや課題報告を歓迎します。

## 📄 ライセンス

MIT License

## 🙏 謝辞

- OpenWeatherMap API
- OpenStreetMap
- 日光市観光協会のデータ参考

---

**Note**: このアプリケーションは位置情報を使用するため、HTTPS環境での動作が必要です。