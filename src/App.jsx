// 画面の振り分け担当。
//- Routesでルートをまとめる
//- RouteでURLと画面を関連付ける

import './App.css'
import { useAuth } from './contexts/AuthContext';
import { Navigate, Routes, Route, NavLink } from 'react-router-dom';
import Home  from "./components/pages/Home";
import Users from "./components/pages/users";
import UserDetail from "./components/pages/UserDetail";
import Login from './components/pages/Login';
import Articles from "./components/pages/Articles";
import ArticleDetail from "./components/pages/ArticleDetail";
import ArticleForm from "./components/pages/ArticleForm";

function App() {
  const { user } = useAuth();
  return (
    <>
      <nav>
        <NavLink to="/" end>記事一覧</NavLink>
        {' | '}
        <NavLink to="/login">
          {user ? `アカウント（${user.name}）` : 'ログイン'}
        </NavLink>
      </nav>

      <Routes>
        {/* 考査課題：記事一覧をTOPページにする */}
        <Route path="/" element={<Articles />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/new" element={user ? <ArticleForm /> : <Navigate to="/" replace />} />
        <Route
          path="/create"
          element={user ? <ArticleForm /> : <Navigate to="/" replace />}
        />
        <Route path="/articles/:articleId" element={<ArticleDetail />} />
        <Route
          path="/articles/:articleId/edit"
          element={user ? <ArticleForm /> : <Navigate to="/" replace />}
        />

        {/* 以前の実習ページ：ファイルは残して別URLに置く */}
        <Route path="/practice" element={<Home />} />
        <Route path="/practice/users" element={<Users />} />
        <Route path="/practice/users/:userId" element={<UserDetail />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;






/* 
//Sample Code
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
*/