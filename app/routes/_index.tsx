import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "日光観光プランナー" },
    { name: "description", content: "GPS位置情報と天気予報を活用した日光観光プランナー" },
  ];
};

export default function Index() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            🏔️ 日光観光プランナー
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            GPS位置情報と天気予報を活用して、あなたにぴったりの日光観光プランを提案します
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="card bg-white shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">🎯 おすすめ機能</h2>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    現在地からの距離を自動計算
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    天気予報に応じたプラン調整
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    滞在時間に最適化されたルート
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    年齢・人数に合わせた提案
                  </li>
                </ul>
              </div>
            </div>

            <div className="card bg-white shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">🗺️ 対応エリア</h2>
                <div className="space-y-2">
                  <div className="badge badge-primary">東照宮</div>
                  <div className="badge badge-secondary">華厳の滝</div>
                  <div className="badge badge-accent">中禅寺湖</div>
                  <div className="badge badge-info">いろは坂</div>
                  <div className="badge badge-success">輪王寺</div>
                  <div className="badge badge-warning">奥日光温泉</div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  日光の主要観光スポット10箇所以上に対応
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/plan"
              className="btn btn-primary btn-lg px-8 py-4 text-white"
            >
              🚀 プラン作成を始める
            </Link>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-8">
              かんたん3ステップ
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📍</span>
                </div>
                <h4 className="font-semibold mb-2">1. 位置情報取得</h4>
                <p className="text-sm text-gray-600">
                  現在地から日光までの距離を自動計算
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚙️</span>
                </div>
                <h4 className="font-semibold mb-2">2. 条件入力</h4>
                <p className="text-sm text-gray-600">
                  滞在時間、人数、年齢層を選択
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h4 className="font-semibold mb-2">3. プラン提案</h4>
                <p className="text-sm text-gray-600">
                  天気を考慮した最適なルートを表示
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
