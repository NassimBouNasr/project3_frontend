import { useEffect, useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Members() {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null); // Optional: if you want to hide yourself

  useEffect(() => {
    axios
      .get("http://localhost:8080/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));

    // Get current user ID from session (you can modify this if stored elsewhere)
    axios
      .get("http://localhost:8080/friends") // You'll need to implement this endpoint or pass it in props/state
      .then((res) => setCurrentUserId(res.data.userId))
      .catch(() => {});
  }, []);

  const addFriend = (friendId) => {
    if (currentUserId === null) return;

    axios
      .post("http://localhost:8080/friends", {
        userId1: currentUserId,
        userId2: friendId,
      })
      .then(() => alert("Friend added!"))
      .catch((err) => console.error("Error adding friend:", err));
  };

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {users
        .filter((user) => user.id !== currentUserId)
        .map((user) => (
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
                onClick={() => addFriend(user.id)}
                className="rounded-md bg-blue-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
              >
                Add Friend
              </button>
              {/* <Menu as="div" className="relative flex-none">
                <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                          )}
                        >
                          View Profile
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                          )}
                        >
                          Block User
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu> */}
            </div>
          </li>
        ))}
    </ul>
  );
}
