import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users").then(res => setUsers(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u.id} className="border-t">
              <td className="p-2">{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
