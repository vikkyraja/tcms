import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const PRIORITIES = ["Low", "Medium", "High", "Critical"];
const TYPES = ["Functional", "Integration", "Regression", "Smoke", "UI", "API"];

export default function TestCaseForm({ initialData = {}, onSubmit }) {
  const { role } = useAuth();
  const canEdit = role === "admin" || role === "test-lead";

  const [form, setForm] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    priority: initialData.priority || "Medium",
    type: initialData.type || "Functional",
    pre: initialData.pre || "",
    post: initialData.post || "",
    steps: initialData.steps || [{ step: "", expected: "" }],
    tags: initialData.tags || "",
  });

  const update = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const updateStep = (i, key, value) => {
    const steps = [...form.steps];
    steps[i][key] = value;
    update("steps", steps);
  };

  const addStep = () =>
    update("steps", [...form.steps, { step: "", expected: "" }]);

  const removeStep = (i) =>
    update(
      "steps",
      form.steps.filter((_, index) => index !== i)
    );

  const submit = () => {
    if (!canEdit) return;
    onSubmit(form);
  };

  return (
    <div className="bg-white p-6 rounded border space-y-5">
      <h2 className="text-lg font-semibold">Test Case</h2>

      <input
        disabled={!canEdit}
        placeholder="Title"
        value={form.title}
        onChange={(e) => update("title", e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <textarea
        disabled={!canEdit}
        placeholder="Description"
        value={form.description}
        onChange={(e) => update("description", e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <div className="grid grid-cols-2 gap-4">
        <select
          disabled={!canEdit}
          value={form.priority}
          onChange={(e) => update("priority", e.target.value)}
          className="border rounded px-3 py-2"
        >
          {PRIORITIES.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>

        <select
          disabled={!canEdit}
          value={form.type}
          onChange={(e) => update("type", e.target.value)}
          className="border rounded px-3 py-2"
        >
          {TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      <textarea
        disabled={!canEdit}
        placeholder="Pre-conditions"
        value={form.pre}
        onChange={(e) => update("pre", e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <textarea
        disabled={!canEdit}
        placeholder="Post-conditions"
        value={form.post}
        onChange={(e) => update("post", e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      {/* Steps */}
      <div className="space-y-3">
        <p className="font-medium">Test Steps</p>

        {form.steps.map((s, i) => (
          <div key={i} className="grid grid-cols-12 gap-2">
            <input
              disabled={!canEdit}
              placeholder="Step"
              value={s.step}
              onChange={(e) => updateStep(i, "step", e.target.value)}
              className="col-span-5 border rounded px-2 py-1"
            />
            <input
              disabled={!canEdit}
              placeholder="Expected Result"
              value={s.expected}
              onChange={(e) =>
                updateStep(i, "expected", e.target.value)
              }
              className="col-span-5 border rounded px-2 py-1"
            />
            {canEdit && (
              <button
                onClick={() => removeStep(i)}
                className="col-span-2 text-red-500 text-sm"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        {canEdit && (
          <button
            onClick={addStep}
            className="text-indigo-600 text-sm"
          >
            + Add Step
          </button>
        )}
      </div>

      <input
        disabled={!canEdit}
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={(e) => update("tags", e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      {canEdit && (
        <button
          onClick={submit}
          className="bg-indigo-600 text-white px-5 py-2 rounded"
        >
          Save Test Case
        </button>
      )}

      {!canEdit && (
        <p className="text-sm text-gray-500">
          You have read-only access.
        </p>
      )}
    </div>
  );
}
