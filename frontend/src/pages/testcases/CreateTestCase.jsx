import TestCaseForm from "../../components/testcases/TestCaseForm";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useProject } from "../../context/ProjectContext";
import { useAuth } from "../../hooks/useAuth";

export default function CreateTestCase() {
  const navigate = useNavigate();
  const { project } = useProject();
  const { role } = useAuth();
console.log("User role:", role);
  const canCreate = role === "ADMIN" || role === "TEST_LEAD";

  const submit = async (data) => {
    if (!canCreate) return;

    await api.post("/testcases", {
      ...data,
      project_id: project.id,
    });

    navigate("/testcases");
  };

  if (!canCreate) {
    return (
      <div className="bg-white p-6 rounded border text-gray-500">
        You have read-only access. Only Admins and Test Leads can create test cases.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <TestCaseForm onSubmit={submit} />
    </div>
  );
}
