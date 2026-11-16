import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Layout({ children }) {
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

      {children}
    </>
  );
}

export default Layout;