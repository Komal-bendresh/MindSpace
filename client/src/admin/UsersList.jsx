
import { useEffect, useState } from "react";
import axios from '../api/axios';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  const fetchUsers = async () => {
    const res = await axios.get("/api/admin/users", { withCredentials: true });
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`/api/admin/delete-user/${id}`, { withCredentials: true });
    fetchUsers(); // refresh
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (u) => u.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      <input
        type="text"
        placeholder="Search by email"
        className="p-2 border mb-4 w-full max-w-md"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <table className="w-full text-left border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Email</th>
            <th className="p-2">Admin</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id} className="border-t">
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.isPremium ? "Yes" : "No"}</td>
              <td className="p-2">
                <button
                  onClick={() => deleteUser(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
