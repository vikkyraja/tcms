import TestCaseForm from "../../components/testcases/TestCaseForm";

export default function CreateTestCase() {
  const submit = (data) => {
    alert("Create Test Case\n" + JSON.stringify(data, null, 2));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <TestCaseForm onSubmit={submit} />
    </div>
  );
}
