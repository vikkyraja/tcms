import { useAuth } from "./useAuth";
import { PERMISSIONS } from "../utils/permissions";

export const usePermission = (permission) => {
  const { role } = useAuth();
  return PERMISSIONS[role]?.includes("ALL") ||
         PERMISSIONS[role]?.includes(permission);
};
