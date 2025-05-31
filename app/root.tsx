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
      <body className="min-h-screen bg-base-100">
        <div className="flex flex-col min-h-screen">
          <header className="navbar bg-primary text-primary-content shadow-lg">
            <div className="container mx-auto">
              <div className="flex-1">
                <a href="/" className="btn btn-ghost text-xl font-bold">
                  🏔️ 日光観光プランナー
                </a>
              </div>
              <div className="flex-none hidden md:flex">
                <ul className="menu menu-horizontal px-1">
                  <li><a href="/" className="hover:bg-primary-focus">ホーム</a></li>
                  <li><a href="/plan" className="hover:bg-primary-focus">プラン作成</a></li>
                </ul>
              </div>
            </div>
          </header>
          
          <main className="flex-1">
            {children}
          </main>
          
          <footer className="footer footer-center p-10 bg-base-200 text-base-content">
            <aside>
              <p className="font-bold">
                🏔️ 日光観光プランナー
              </p>
              <p>GPS位置情報と天気予報を活用した観光プラン提案サービス</p>
              <p>Copyright © 2024 - All rights reserved</p>
            </aside>
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
