import { useState } from "react";
import AttachmentUpload from "./AttachmentUpload";
import { useAuth } from "../../hooks/useAuth";
import api from "../../api/axios";

export default function ExecutionForm({ testCase }) {
  const { role } = useAuth();
  const canExecute = ["ADMIN", "TEST_LEAD", "TESTER"].includes(role);

  const [status, setStatus] = useState("Pass");
  const [comment, setComment] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!canExecute) {
    return (
      <div className="text-gray-500">
        Read-only users cannot execute tests.
      </div>
    );
  }

  const submit = async () => {
    setLoading(true);

    await api.post("/executions", {
      test_case_id: testCase.id,
      status,
      comment,
    });

    setLoading(false);
    alert("Execution saved");
  };

  return (
    <div className="space-y-4 bg-white p-6 rounded border">
      <h2 className="text-lg font-semibold">
        Execute: {testCase.title}
      </h2>

      <div>
        <label className="block text-sm font-medium mb-1">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        >
          <option>Pass</option>
          <option>Fail</option>
          <option>Blocked</option>
          <option>Skipped</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Comment
        </label>
        <textarea
          rows="3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      <AttachmentUpload onAdd={setFiles} />

      <button
        disabled={loading}
        onClick={submit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Saving…" : "Submit Execution"}
      </button>
    </div>
  );
}
