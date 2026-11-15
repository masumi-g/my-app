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
    <main className="mx-auto w-full max-w-3xl px-6 py-8 text-left">
      <h1>ログイン</h1>

      {user ? (
        <div>
          <p>{user.name} さんでログイン中です。</p>
          <button type="button" onClick={handleLogout}>
            ログアウト
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="login-name">名前</label>
            <input
              id="login-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <button type="submit">ログイン</button>
        </form>
      )}

      <p>
        <Link to="/articles">記事一覧に戻る</Link>
      </p>
    </main>
  );
}

export default Login;