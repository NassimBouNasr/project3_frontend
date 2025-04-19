import { useEffect, useState } from "react";
import axios from "axios";

export default function Friends() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/friends", { withCredentials: true })
      .then((res) => setFriends(res.data))
      .catch((err) => console.error("Error fetching friends:", err));
  }, []);

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {friends.map((user) => (
        <li
          key={user.id}
          className="flex items-center justify-between gap-x-6 py-5"
        >
          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {user.username}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
            </div>
            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
              <p className="whitespace-nowrap">
                Joined on{" "}
                <time dateTime={user.createdAt}>
                  {new Date(user.createdAt).toLocaleDateString()}
                </time>
              </p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
            <button
              className="rounded-md bg-blue-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
              onClick={() => alert("Messaging is not implemented yet")}
            >
              Message
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
