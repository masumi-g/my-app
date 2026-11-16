import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Login() {
  const [name, setName] = useState('');
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim()) return;

    login(name);
    navigate('/articles');
  }

  function handleLogout() {
    logout();
    navigate('/articles');
  }

  return (
    <main className="mx-auto w-full max-w-xl px-6 py-10 text-left">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">ログイン</h1>

      {user ? (
        <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-slate-700">{user.name} さんでログイン中です。</p>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-slate-600 px-5 py-3 font-semibold text-white hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
          >
            ログアウト
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="space-y-2">
            <label
              htmlFor="login-name"
              className="block font-semibold text-slate-700"
            >
              名前
            </label>
            <input
              id="login-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            ログイン
          </button>
        </form>
      )}

      <p className="mt-5">
        <Link
          to="/articles"
          className="text-blue-700 underline underline-offset-4 hover:text-blue-900"
        >
          記事一覧に戻る
        </Link>
      </p>
    </main>
  );
}

export default Login;