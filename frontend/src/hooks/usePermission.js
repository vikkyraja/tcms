import { useAuth } from "./useAuth";

export default function usePermissions() {
  const { role } = useAuth();

  return {
    canManageProjects:
      role === "ADMIN" || role === "TEST_LEAD",

    canManageTestCases:
      role === "ADMIN" || role === "TEST_LEAD",

    canExecuteTests:
      role === "ADMIN" ||
      role === "TEST_LEAD" ||
      role === "TESTER",

    isReadOnly: role === "READ_ONLY",
  };
}
