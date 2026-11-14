import { useState } from "react";

function ProfileCard({
   user: { name, description, hobby, learning }
  
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-sm mx-auto">

      <h2 className="text-xl font-bold text-gray-800">
        {name}
      </h2>

      <p className="text-gray-600 mt-2">
        {description}
      </p>

      <button
        onClick={() => setShow(!show)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600"
      >
        {show ? "閉じる" : "詳細を見る"}
      </button>

      {show && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p>趣味：{hobby}</p>
          <p>学習中：{learning}</p>
        </div>
      )}

    </div>
  );
}

export default ProfileCard;
