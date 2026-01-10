import { useAuth } from "../../hooks/useAuth";

export default function BulkActions({ selectedCount, onDelete, onAssign }) {
  const { role } = useAuth();

  if (selectedCount === 0) return null;

  const canManage = role === "admin" || role === "test-lead";

  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded p-3 flex items-center justify-between">
      <span className="text-sm">
        {selectedCount} selected
      </span>

      {canManage && (
        <div className="flex gap-2">
          <button
            onClick={onAssign}
            className="px-3 py-1.5 text-sm rounded bg-indigo-600 text-white"
          >
            Assign to Suite
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-1.5 text-sm rounded bg-red-600 text-white"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
