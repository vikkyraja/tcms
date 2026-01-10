import { useLocation } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axios";

export default function Executions() {
  const location = useLocation();
  const [testCaseId, setTestCaseId] = useState(
    location.state?.testCaseId || ""
  );
  const [status, setStatus] = useState("PASS");

  const submit = async () => {
    await api.post("/executions", { test_case_id: testCaseId, status });
    alert("Execution saved");
  };

  return (
    <div className="bg-white p-6 rounded shadow w-96">
      <h2 className="font-bold mb-4">Execute Test</h2>

      <input
        className="border p-2 w-full mb-3"
        value={testCaseId}
        onChange={e => setTestCaseId(e.target.value)}
      />

      <select
        className="border p-2 w-full mb-3"
        value={status}
        onChange={e => setStatus(e.target.value)}
      >
        <option>PASS</option>
        <option>FAIL</option>
        <option>BLOCKED</option>
        <option>SKIPPED</option>
      </select>

      <button
        onClick={submit}
        className="bg-green-600 text-white w-full p-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}
