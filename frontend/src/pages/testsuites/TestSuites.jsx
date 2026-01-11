import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useProject } from "../../context/ProjectContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function TestSuites() {
  const { project } = useProject();
  const { role } = useAuth();
  const navigate = useNavigate();

  const [suites, setSuites] = useState([]);

  const canExecute = ["ADMIN", "TEST_LEAD", "TESTER"].includes(role);

  useEffect(() => {
    if (!project) return;

    api
      .get(`/testsuites?projectId=${project.id}`)
      .then((res) => setSuites(res.data.data || res.data));
  }, [project]);

  if (!project) {
    return <p>Select a project to view test suites.</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">📁 Test Suites</h1>

      {suites.map((suite) => (
        <div
          key={suite.id}
          className="bg-white border rounded p-4"
        >
          <h2 className="font-semibold text-lg">
            {suite.name}
          </h2>

          <ul className="mt-3 space-y-2">
            {(suite.test_cases || []).map((tc) => (
              <li
                key={tc.id}
                className="flex justify-between items-center border rounded px-3 py-2"
              >
                <span>{tc.title}</span>

                {canExecute && (
                  <button
                    onClick={() =>
                      navigate("/executions", {
                        state: {
                          testCaseId: tc.id,
                          testSuiteId: suite.id,
                        },
                      })
                    }
                    className="text-green-600 text-sm"
                  >
                    Execute
                  </button>
                )}
              </li>
            ))}

            {(!suite.test_cases ||
              suite.test_cases.length === 0) && (
              <p className="text-sm text-gray-500">
                No test cases in this suite
              </p>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
