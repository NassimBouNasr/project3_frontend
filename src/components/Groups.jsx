import React, { useEffect, useState } from "react";

export default function Groups({ currentUser }) {
  const [groups, setGroups] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/groups", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setGroups)
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const groupData = {
      name,
      description,
      creator: currentUser, // Include current user here
    };

    try {
      const res = await fetch("http://localhost:8080/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(groupData),
      });

      if (res.ok) {
        const newGroup = await res.json();
        setGroups((prev) => [...prev, newGroup]);
        setName("");
        setDescription("");
      } else {
        alert("Failed to create group.");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Groups</h2>

      <form
        onSubmit={handleSubmit}
        className="mb-6 bg-white shadow rounded p-4"
      >
        <h3 className="text-lg font-medium mb-2">Create a New Group</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Group Name"
          required
          className="block w-full mb-2 p-2 border rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          className="block w-full mb-2 p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
        >
          Create Group
        </button>
      </form>

      <div>
        {groups.length === 0 ? (
          <p>No groups yet.</p>
        ) : (
          groups.map((group) => (
            <div
              key={group.id}
              className="mb-4 p-4 border border-gray-200 rounded bg-gray-50"
            >
              <h4 className="text-xl font-semibold">{group.name}</h4>
              <p className="text-sm text-gray-600">{group.description}</p>
              <p className="text-xs text-gray-400 mt-1">
                Created at: {new Date(group.createdAt).toLocaleString()}
              </p>
              {group.creator && (
                <p className="text-xs text-gray-500">
                  By: {group.creator.name || group.creator.username}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
