import { useEffect, useState } from "react";
import axios from "axios";

export default function Members({ currentUser }) {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]); // Track the added friends

  useEffect(() => {
    // Fetch all users and exclude the current user from the list
    axios
      .get("http://localhost:8080/users", { withCredentials: true })
      .then((res) => {
        const filteredUsers = res.data.filter(
          (user) => user.id !== currentUser.id
        ); // Exclude current user
        setUsers(filteredUsers);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, [currentUser]);

  useEffect(() => {
    // Fetch the list of friends for the current user to track existing friends
    axios
      .get("http://localhost:8080/friends", { withCredentials: true })
      .then((res) => {
        const friendIds = res.data.map((friend) => friend.id); // Assuming response contains friend IDs
        setFriends(friendIds); // Store the friend IDs
      })
      .catch((err) => console.error("Error fetching friends:", err));
  }, [currentUser]);

  const addFriend = (friendId) => {
    // Send the friend request
    axios
      .post(
        "http://localhost:8080/friends",
        { id: friendId },
        { withCredentials: true }
      )
      .then(() => {
        alert("Friend added!");
        setFriends((prevFriends) => [...prevFriends, friendId]); // Add the new friend to the state
      })
      .catch((err) => console.error("Error adding friend:", err));
  };

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {users.map((user) => (
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
            {friends.includes(user.id) ? (
              <button
                disabled
                className="rounded-md bg-gray-400 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm cursor-default"
              >
                Already friends
              </button>
            ) : (
              <button
                onClick={() => addFriend(user.id)}
                className="rounded-md bg-blue-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
              >
                Add Friend
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
