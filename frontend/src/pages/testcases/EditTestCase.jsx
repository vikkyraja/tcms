import TestCaseForm from "../../components/testcases/TestCaseForm";

const MOCK_TEST_CASE = {
  title: "Verify login",
  description: "Check valid login",
  priority: "High",
  type: "Functional",
  pre: "User exists",
  post: "Dashboard visible",
  steps: [
    { step: "Open login page", expected: "Page loads" },
    { step: "Enter valid creds", expected: "Login success" },
  ],
  tags: "auth,smoke",
};

export default function EditTestCase() {
  const submit = (data) => {
    alert("Update Test Case\n" + JSON.stringify(data, null, 2));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <TestCaseForm initialData={MOCK_TEST_CASE} onSubmit={submit} />
    </div>
  );
}
