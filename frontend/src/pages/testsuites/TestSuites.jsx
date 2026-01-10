import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function TestSuites() {
  const [suites, setSuites] = useState([]);

  useEffect(() => {
    api.get("/testsuites").then(res => setSuites(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Test Suites</h1>

      <ul className="bg-white rounded shadow divide-y">
        {suites.map(s => (
          <li key={s.id} className="p-4">
            {s.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
