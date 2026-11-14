import ProfileCard from "../ProfileCard";
import { users } from "../data/users";

const Home = () => {
  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        プロフィール紹介
      </h1>

      <div className="flex flex-wrap justify-center gap-6">

        {users.map((user) => (
          <ProfileCard
            key={user.id}
            user={user}
            
          />
        ))}

      </div>

    </div>
  );
};

export default Home;
