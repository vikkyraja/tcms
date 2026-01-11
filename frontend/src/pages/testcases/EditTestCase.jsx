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

  useEffect(() => {
    api.get(`/testcases/${id}`).then((res) => {
      setTestCase(res.data);
    });
  }, [id]);

  const submit = async (data) => {
    if (!canEdit) return;

    await api.put(`/testcases/${id}`, data);
    navigate("/testcases");
  };

  if (!testCase) return <p>Loading…</p>;

  return (
    <div className="max-w-4xl mx-auto">
      {!canEdit && (
        <div className="mb-4 bg-yellow-50 border border-yellow-200 p-3 rounded text-sm text-yellow-700">
          You have read-only access. Editing is disabled.
        </div>
      )}

      <TestCaseForm initialData={testCase} onSubmit={submit} />
    </div>
  );
}
