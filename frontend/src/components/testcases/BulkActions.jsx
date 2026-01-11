import { useAuth } from "../../hooks/useAuth";

export default function BulkActions({ selectedCount, onDelete, onAssign }) {
  const { role } = useAuth();
  const canManage = ["ADMIN", "TEST_LEAD"].includes(role);

  if (!selectedCount) return null;

  return (
    <div className="bg-indigo-50 border p-3 rounded flex justify-between">
      <span>{selectedCount} selected</span>

      {canManage && (
        <div className="flex gap-2">
          <button
            onClick={onAssign}
            className="bg-indigo-600 text-white px-3 py-1 rounded"
          >
            Assign Suite
          </button>
          <button
            onClick={onDelete}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
