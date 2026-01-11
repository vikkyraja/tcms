import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

const PRIORITIES = ["Low", "Medium", "High", "Critical"];
const TYPES = ["Functional", "Integration", "Regression", "Smoke", "UI", "API"];

export default function TestCaseForm({
  initialData = null,
  onSubmit,
}) {
  const { role } = useAuth();

  const canEdit = role === "ADMIN" || role === "TEST_LEAD";
  const isEditMode = Boolean(initialData);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    type: "Functional",
    pre_conditions: "",
    post_conditions: "",
    steps: [{ step: "", expected: "" }],
    tags: "",
  });

  // ✅ Populate data in EDIT / VIEW mode
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        priority: initialData.priority || "Medium",
        type: initialData.type || "Functional",
        pre_conditions: initialData.pre_conditions || "",
        post_conditions: initialData.post_conditions || "",
        steps: initialData.steps?.length
          ? initialData.steps
          : [{ step: "", expected: "" }],
        tags: Array.isArray(initialData.tags)
          ? initialData.tags.join(",")
          : initialData.tags || "",
      });
    }
  }, [initialData]);

  const update = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const updateStep = (index, key, value) => {
    const steps = [...form.steps];
    steps[index][key] = value;
    update("steps", steps);
  };

  const addStep = () =>
    update("steps", [...form.steps, { step: "", expected: "" }]);

  const removeStep = (index) =>
    update(
      "steps",
      form.steps.filter((_, i) => i !== index)
    );

  const submit = () => {
    if (!canEdit) return;

    onSubmit({
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
  };

  return (
    <div className="bg-white p-6 rounded border space-y-5">
      <h2 className="text-xl font-semibold">
        {isEditMode ? "Edit Test Case" : "Create Test Case"}
      </h2>

      {/* TITLE */}
      <input
        disabled={!canEdit}
        placeholder="Title"
        value={form.title}
        onChange={(e) => update("title", e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      {/* DESCRIPTION */}
      <textarea
        disabled={!canEdit}
        placeholder="Description"
        value={form.description}
        onChange={(e) => update("description", e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      {/* PRIORITY & TYPE */}
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

      {/* PRE / POST CONDITIONS */}
      <textarea
        disabled={!canEdit}
        placeholder="Pre-conditions"
        value={form.pre_conditions}
        onChange={(e) =>
          update("pre_conditions", e.target.value)
        }
        className="w-full border rounded px-3 py-2"
      />

      <textarea
        disabled={!canEdit}
        placeholder="Post-conditions"
        value={form.post_conditions}
        onChange={(e) =>
          update("post_conditions", e.target.value)
        }
        className="w-full border rounded px-3 py-2"
      />

      {/* TEST STEPS */}
      <div className="space-y-3">
        <p className="font-medium">Test Steps</p>

        {form.steps.map((s, i) => (
          <div key={i} className="grid grid-cols-12 gap-2">
            <input
              disabled={!canEdit}
              placeholder="Step"
              value={s.step}
              onChange={(e) =>
                updateStep(i, "step", e.target.value)
              }
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

      {/* TAGS */}
      <input
        disabled={!canEdit}
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={(e) => update("tags", e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      {/* ACTION */}
      {canEdit ? (
        <button
          onClick={submit}
          className="bg-indigo-600 text-white px-6 py-2 rounded"
        >
          {isEditMode ? "Update Test Case" : "Create Test Case"}
        </button>
      ) : (
        <p className="text-sm text-gray-500">
          You have read-only access.
        </p>
      )}
    </div>
  );
}
