import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useProject } from "../../context/ProjectContext";

export default function TestSuites() {
  const { project } = useProject();
  const [suites, setSuites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!project) {
      setSuites([]);
      return;
    }

    setLoading(true);

    api
      .get(`/testsuites?projectId=${project.id}`)
      .then((res) => {
        setSuites(res.data.data || res.data || []);
      })
      .finally(() => setLoading(false));
  }, [project]);

  if (!project) {
    return (
      <p className="text-gray-500">
        Please select a project to view test suites.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">📁 Test Suites</h1>

      {loading && <p>Loading test suites…</p>}

      {!loading && suites.length === 0 && (
        <p className="text-gray-500">
          No test suites found for this project.
        </p>
      )}

      <ul className="bg-white rounded border divide-y">
        {suites.map((s) => (
          <li key={s.id} className="p-4">
            <p className="font-medium">{s.name}</p>
            {s.description && (
              <p className="text-sm text-gray-500">
                {s.description}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
