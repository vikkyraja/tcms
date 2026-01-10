import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function TestCases() {
  const { role } = useAuth();
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);

  useEffect(() => {
    api.get("/testcases").then(res => setCases(res.data));
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Test Cases</h1>

        {["ADMIN", "TEST_LEAD"].includes(role) && (
          <button
            onClick={() => navigate("/testcases/new")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + New
          </button>
        )}
      </div>

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Title</th>
            <th>Priority</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {cases.map(tc => (
            <tr key={tc.id} className="border-t">
              <td className="p-2">{tc.title}</td>
              <td>
                <span className="px-2 py-1 text-xs bg-yellow-200 rounded">
                  {tc.priority}
                </span>
              </td>
              <td>{tc.type}</td>
              <td className="space-x-2">
                <button
                  onClick={() => navigate(`/testcases/${tc.id}/edit`)}
                  className="text-blue-600"
                >
                  Edit
                </button>

                {["ADMIN", "TESTER", "TEST_LEAD"].includes(role) && (
                  <button
                    onClick={() =>
                      navigate("/executions", { state: { testCaseId: tc.id } })
                    }
                    className="text-green-600"
                  >
                    Execute
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
