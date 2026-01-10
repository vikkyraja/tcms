import { useAuth } from "../../hooks/useAuth";

export default function TestCaseRow({ test, selected, onToggle }) {
  const { role } = useAuth();

  return (
    <div className="grid grid-cols-12 gap-2 items-center border-b px-4 py-2 text-sm">
      <div className="col-span-1">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggle(test.id)}
        />
      </div>

      <div className="col-span-3 font-medium">{test.title}</div>
      <div className="col-span-2">{test.priority}</div>
      <div className="col-span-2">{test.type}</div>
      <div className="col-span-2">{test.status}</div>

      <div className="col-span-2 flex gap-2">
        {(role === "admin" || role === "test-lead") && (
          <button className="text-blue-600 hover:underline">
            Edit
          </button>
        )}

        {(role === "tester" || role === "admin" || role === "test-lead") && (
          <button className="text-green-600 hover:underline">
            Execute
          </button>
        )}
      </div>
    </div>
  );
}
