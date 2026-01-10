import ExecutionForm from "../../components/executions/ExecutionForm";

const MOCK_TEST_CASE = {
  id: 101,
  title: "Verify login with valid credentials",
};

export default function ExecutionDetail() {
  return (
    <div className="max-w-3xl mx-auto">
      <ExecutionForm testCase={MOCK_TEST_CASE} />
    </div>
  );
}
