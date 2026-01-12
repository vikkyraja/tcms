import TestCaseForm from "../../components/testcases/TestCaseForm";
import api from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function EditTestCase() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useAuth();

  const canEdit = role === "ADMIN" || role === "TEST_LEAD";

  const [testCase, setTestCase] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/testcases/${id}`)
      .then((res) => setTestCase(res.data))
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (formData) => {
    if (!canEdit) return;

    try {
      await api.put(`/testcases/${id}`, {
        project_id: testCase.project_id,
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        type: formData.type,
        pre_conditions: formData.pre_conditions,
        post_conditions: formData.post_conditions,
      });

      navigate("/testcases");
    } catch (error) {
      console.error("Update error:", error);
      alert(error.response?.data?.message || "Failed to update test case");
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (!testCase) return <p className="text-gray-500">Test case not found.</p>;

  return (
    <div className="max-w-4xl mx-auto">
      {!canEdit && (
        <div className="mb-4 bg-yellow-50 border border-yellow-200 p-3 rounded text-sm text-yellow-700">
          You have read-only access. Editing is disabled.
        </div>
      )}
      <TestCaseForm initialData={testCase} onSubmit={handleSubmit} />
    </div>
  );
}