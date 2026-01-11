import { useEffect, useState } from "react";
import api from "../../api/axios";
import Pagination from "../../components/testcases/Pagination";


export default function Users() {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    api.get(`/users?page=${page}&limit=10`).then((res) => {
      setUsers(res.data.data);
      setPagination(res.data.pagination);
    });
  }, [page]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">👥 Users</h1>

      <div className="bg-white border rounded overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">
                  <span className="px-2 py-1 rounded text-xs bg-indigo-100">
                    {u.role}
                  </span>
                </td>
                <td className="p-3">
                  {new Date(u.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        onChange={setPage}
      />
    </div>
  );
}
