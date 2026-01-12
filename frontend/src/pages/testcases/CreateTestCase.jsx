import TestCaseForm from "../../components/testcases/TestCaseForm";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useProject } from "../../context/ProjectContext";
import { useAuth } from "../../hooks/useAuth";

export default function CreateTestCase() {
  const navigate = useNavigate();
  const { project } = useProject();
  const { role } = useAuth();

  const canCreate = role === "ADMIN" || role === "TEST_LEAD";

  const handleSubmit = async (formData) => {
    if (!canCreate) return;

    if (!project?.id) {
      alert("Please select a project first");
      return;
    }

    try {
      await api.post("/testcases", {
        project_id: project.id,
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        type: formData.type,
        pre_conditions: formData.pre_conditions,
        post_conditions: formData.post_conditions,
      });

      navigate("/testcases");
    } catch (error) {
      console.error("Create error:", error);
      alert(error.response?.data?.message || "Failed to create test case");
    }
  };

  if (!project) {
    return (
      <div className="bg-white p-6 rounded border text-gray-500">
        Please select a project first.
      </div>
    );
  }

  if (!canCreate) {
    return (
      <div className="bg-white p-6 rounded border text-gray-500">
        You have read-only access. Only Admins and Test Leads can create test cases.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <TestCaseForm onSubmit={handleSubmit} />
    </div>
  );
}