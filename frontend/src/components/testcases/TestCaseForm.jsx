import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const PRIORITIES = ["Low", "Medium", "High", "Critical"];
const TYPES = ["Functional", "Integration", "Regression", "Smoke", "UI", "API"];

export default function TestCaseForm({ initialData = {}, onSubmit }) {
  const { role } = useAuth();
  const canEdit = role === "ADMIN" || role === "TEST_LEAD";

  const [form, setForm] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    priority: initialData.priority || "Medium",
    type: initialData.type || "Functional",
    pre_conditions: initialData.pre_conditions || "",
    post_conditions: initialData.post_conditions || "",
  });

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!canEdit) return;
    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }
    onSubmit(form);
  };

  return (
    <div className="bg-white p-6 rounded border space-y-5">
      <h2 className="text-lg font-semibold">Test Case</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          disabled={!canEdit}
          placeholder="Enter test case title"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          disabled={!canEdit}
          placeholder="Enter description"
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            disabled={!canEdit}
            value={form.priority}
            onChange={(e) => update("priority", e.target.value)}
            className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            disabled={!canEdit}
            value={form.type}
            onChange={(e) => update("type", e.target.value)}
            className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Pre-conditions
        </label>
        <textarea
          disabled={!canEdit}
          placeholder="Enter pre-conditions"
          value={form.pre_conditions}
          onChange={(e) => update("pre_conditions", e.target.value)}
          className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
          rows={2}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Post-conditions
        </label>
        <textarea
          disabled={!canEdit}
          placeholder="Enter post-conditions"
          value={form.post_conditions}
          onChange={(e) => update("post_conditions", e.target.value)}
          className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
          rows={2}
        />
      </div>

      {canEdit && (
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700"
        >
          Save Test Case
        </button>
      )}

      {!canEdit && (
        <p className="text-sm text-gray-500 bg-yellow-50 p-3 rounded border border-yellow-200">
          You have read-only access.
        </p>
      )}
    </div>
  );
}