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
    <div className="relative bg-white w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden w-full">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-cyan-500/8 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-3xl mb-6 shadow-2xl shadow-emerald-500/25">
              <span className="text-4xl">🏔️</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
              日光観光プランナー
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              GPS位置情報と天気予報を活用して、<br className="hidden md:block" />
              あなたにぴったりの日光観光プランを提案します
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/plan"
              className="group bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center space-x-2">
                <span>🚀</span>
                <span>プラン作成を始める</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </Link>
            <button className="text-gray-600 hover:text-gray-900 px-8 py-4 rounded-2xl border border-gray-300 hover:border-gray-400 transition-all duration-300 hover:bg-gray-50">
              デモを見る
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative bg-gray-50 w-full">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              スマートな機能
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              最新技術を活用した、これまでにない観光体験を提供します
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: "📍",
                title: "GPS連携",
                description: "現在地からの距離を自動計算"
              },
              {
                icon: "🌤️",
                title: "天気予報",
                description: "リアルタイム天気に応じたプラン調整"
              },
              {
                icon: "🎯",
                title: "最適化",
                description: "滞在時間に最適化されたルート"
              },
              {
                icon: "👥",
                title: "パーソナル",
                description: "年齢・人数に合わせた提案"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:bg-gray-50 hover:border-gray-300 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-gray-900 font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Tourist Spots */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">🗺️ 対応観光スポット</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {["東照宮", "華厳の滝", "中禅寺湖", "いろは坂", "輪王寺", "奥日光温泉", "竜頭の滝", "戦場ヶ原"].map((spot, index) => (
                <span key={index} className="px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 text-gray-700 rounded-full text-sm border border-gray-200">
                  {spot}
                </span>
              ))}
            </div>
            <p className="text-center text-gray-600 text-sm mt-6">
              日光の主要観光スポット10箇所以上に対応
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 relative bg-white w-full">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              かんたん3ステップ
            </h2>
            <p className="text-gray-600 text-lg">
              シンプルな操作で、あなただけの観光プランが完成
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: "📍",
                title: "位置情報取得",
                description: "現在地から日光までの距離を自動計算"
              },
              {
                step: "02",
                icon: "⚙️",
                title: "条件入力",
                description: "滞在時間、人数、年齢層を選択"
              },
              {
                step: "03",
                icon: "🎯",
                title: "プラン提案",
                description: "天気を考慮した最適なルートを表示"
              }
            ].map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:bg-gray-50 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="text-6xl text-gray-300 font-bold mb-4">{item.step}</div>
                  <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <span className="text-3xl">{item.icon}</span>
                  </div>
                  <h3 className="text-gray-900 text-xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-600"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
