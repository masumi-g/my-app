import { Link } from 'react-router-dom';
import { users } from '/src/components/data/users';

function Users() {
 
  return (
    <div>
        <h1>ユーザー一覧</h1>
        <p>登録されているユーザ情報です。</p>
        {users.map((user) => (
            <div key={user.id}>
            <Link to={`/practice/users/${user.id}`}>
                {user.name}
            </Link>
            </div>
      ))}
    </div>
  );
}

export default Users;