import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function TestCaseRow({ test, selected, onToggle }) {
  const { role } = useAuth();
  const navigate = useNavigate();

  const canEdit = ["ADMIN", "TEST_LEAD"].includes(role);
  const canExecute = ["ADMIN", "TEST_LEAD", "TESTER"].includes(role);

  return (
    <div className="grid grid-cols-12 gap-2 items-center px-4 py-2 border-b">
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onToggle(test.id)}
        className="col-span-1"
      />

      <div className="col-span-3">{test.title}</div>
      <div className="col-span-2">{test.priority}</div>
      <div className="col-span-2">{test.type}</div>
      <div className="col-span-2">{test.status || "-"}</div>

      <div className="col-span-2 flex gap-2">
        {canEdit && (
          <button
            onClick={() =>
              navigate(`/testcases/${test.id}/edit`)
            }
            className="text-blue-600"
          >
            Edit
          </button>
        )}
        {canExecute && (
          <button
            onClick={() =>
              navigate("/executions", {
                state: { testCaseId: test.id },
              })
            }
            className="text-green-600"
          >
            Execute
          </button>
        )}
      </div>
    </div>
  );
}
