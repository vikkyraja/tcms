import { useLocation } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../hooks/useAuth";

export default function Executions() {
  const location = useLocation();
  const { role } = useAuth();

  const canExecute = ["ADMIN", "TEST_LEAD", "TESTER"].includes(role);

  const [testCaseId] = useState(location.state?.testCaseId || "");
  const [testSuiteId] = useState(location.state?.testSuiteId || "");
  const [status, setStatus] = useState("Pass");
  const [comment, setComment] = useState("");

  if (!canExecute) {
    return (
      <p className="text-gray-500">
        Read-only users cannot execute tests.
      </p>
    );
  }

  const submit = async () => {
    await api.post("/executions", {
      test_case_id: testCaseId,
      test_suite_id: testSuiteId,
      status,
      comment,
    });

    alert("Execution saved");
  };

  return (
    <div className="bg-white p-6 rounded shadow w-96">
      <h2 className="font-bold mb-4">Execute Test</h2>

      <div className="mb-3 text-sm text-gray-600">
        <p>Test Case ID: {testCaseId}</p>
        {testSuiteId && <p>Suite ID: {testSuiteId}</p>}
      </div>

      <select
        className="border p-2 w-full mb-3"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Pass</option>
        <option>Fail</option>
        <option>Blocked</option>
        <option>Skipped</option>
      </select>

      <textarea
        className="border p-2 w-full mb-3"
        placeholder="Execution comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        onClick={submit}
        className="bg-green-600 text-white w-full p-2 rounded"
      >
        Submit Execution
      </button>
    </div>
  );
}
