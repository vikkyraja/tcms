import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useProject } from "../../context/ProjectContext";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Pagination from "../../components/testcases/Pagination";
import usePermissions from "../../hooks/usePermission";




export default function TestCases() {
  
const { canManageTestCases, canExecuteTests } = usePermissions();
  const { role } = useAuth();
  const { project } = useProject();
  const navigate = useNavigate();

  const [cases, setCases] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!project?.id) {
      setCases([]);
      return;
    }

    setLoading(true);

    api
      .get(`/testcases`, {
        params: {
          page,
          limit: 10,
          projectId: project.id,
        },
      })
      .then((res) => {
        // ✅ SUPPORT BOTH API SHAPES
        const responseData = res.data?.data ?? res.data ?? [];
        const responsePagination =
          res.data?.pagination ?? { page: 1, totalPages: 1 };

        setCases(responseData);
        setPagination(responsePagination);
      })
      .catch((err) => {
        console.error("Failed to load test cases", err);
        setCases([]);
      })
      .finally(() => setLoading(false));
  }, [page, project]);

  if (!project) {
    return (
      <p className="text-gray-500">
        Please select a project to view test cases.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">🧪 Test Cases</h1>


      </div>
{canManageTestCases && (
  <button
    onClick={() => navigate("/testcases/new")}
    className="bg-indigo-600 text-white px-4 py-2 rounded"
  >
    + New Test Case
  </button>
)}
{canExecuteTests && (
  <button
    onClick={() => navigate(`/executions/${tc.id}`)}
    className="bg-indigo-600 text-white px-4 py-2 rounded ml-4 " 
  >
    Execute
  </button>
)}

      {/* Loading */}
      {loading && (
        <p className="text-gray-500">Loading test cases…</p>
      )}

      {/* Empty State */}
      {!loading && cases.length === 0 && (
        <div className="bg-white border rounded p-6 text-center text-gray-500">
          No test cases found for this project.
        </div>
      )}

      {/* Table */}
      {!loading && cases.length > 0 && (
        <div className="bg-white border rounded overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Type</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((tc) => (
                <tr key={tc.id} className="border-t">
                  <td className="p-3">{tc.title}</td>

                  <td className="p-3 text-center">
                    <span className="px-2 py-1 rounded text-xs bg-yellow-100">
                      {tc.priority}
                    </span>
                  </td>

                  <td className="p-3 text-center">
                    {tc.type || "-"}
                  </td>

                  <td className="p-3 flex gap-3 justify-center">
                    <button
                      onClick={() =>
                        navigate(`/executions/${tc.id}`)
                      }
                      className="text-green-600"
                    >
                      Execute
                    </button>

                    {(role === "ADMIN" ||
                      role === "TEST_LEAD") && (
                      <button
                        onClick={() =>
                          navigate(`/testcases/${tc.id}/edit`)
                        }
                        className="text-blue-600"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {pagination?.totalPages > 1 && (
        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          onChange={setPage}
        />
      )}
    </div>
  );
}
