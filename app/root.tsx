import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" data-theme="nikko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏔️</text></svg>" />
      </head>
      <body className="min-h-screen bg-black overflow-x-hidden">
        <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-gray-800">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                    <span className="text-white text-xl">🏔️</span>
                  </div>
                  <a href="/" className="text-white text-xl font-bold">
                    日光観光プランナー
                  </a>
                </div>
                <nav className="hidden md:flex items-center space-x-8">
                  <a href="/" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium">
                    ホーム
                  </a>
                  <a href="/plan" className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105">
                    プラン作成
                  </a>
                </nav>
              </div>
            </div>
          </header>
          
          <main className="flex-1">
            {children}
          </main>
          
          <footer className="border-t border-gray-800 bg-gray-900">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <span className="text-2xl">🏔️</span>
                  <span className="text-white font-bold">日光観光プランナー</span>
                </div>
                <p className="text-gray-400 text-sm mb-2">GPS位置情報と天気予報を活用した観光プラン提案サービス</p>
                <p className="text-gray-500 text-xs">Copyright © 2024 - All rights reserved</p>
              </div>
            </div>
          </footer>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
