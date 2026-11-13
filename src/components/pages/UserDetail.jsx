import { useParams } from 'react-router-dom';
import { users } from '/src/components/data/users';

function UserDetail() {

  // URLに含まれるuserIdを取得する
  const { userId, userName } = useParams();

// IDを使って該当するユーザーを探す
  const user = users.find(
    (user) => user.id === Number(userId)
  );

  
  return (
    <div>
      <h1>ユーザー詳細画面</h1>

      {user ? (
        <>
          <p>ユーザーID：{user.id}</p>
          <p>ユーザー名：{user.name}</p>
        </>
      ) : (
        <p>ユーザーが見つかりません。</p>
      )}
    </div>
  );
}

export default UserDetail;
