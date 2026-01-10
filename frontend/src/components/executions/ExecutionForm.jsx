import { useState } from "react";
import AttachmentUpload from "./AttachmentUpload";
import { useAuth } from "../../hooks/useAuth";

export default function ExecutionForm({ testCase }) {
  const { role } = useAuth();
  const canExecute = ["admin", "test-lead", "tester"].includes(role);

  const [status, setStatus] = useState("Pass");
  const [comment, setComment] = useState("");
  const [files, setFiles] = useState([]);

  if (!canExecute) {
    return (
      <div className="text-gray-500">
        Read-only users cannot execute tests.
      </div>
    );
  }

  const submit = () => {
    alert(
      JSON.stringify(
        {
          testCaseId: testCase.id,
          status,
          comment,
          filesCount: files.length,
        },
        null,
        2
      )
    );
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
        onClick={submit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Submit Execution
      </button>
    </div>
  );
}
