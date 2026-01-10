import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const nav = [
  { label: "Dashboard", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "Test Cases", path: "/testcases" },
  { label: "Test Suites", path: "/testsuites" },
  { label: "Executions", path: "/executions" },
  { label: "Users", path: "/users", role: "admin" }
];

export default function Sidebar() {
  const { role } = useAuth();

  return (
    <aside className="hidden md:block w-64 bg-white border-r">
      <div className="p-4">
        <h1 className="text-xl font-bold text-indigo-600 mb-6">TCMS</h1>
        <nav className="space-y-2">
          {nav.map(item =>
            item.role && item.role !== role ? null : (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md text-sm ${
                    isActive
                      ? "bg-indigo-100 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>
      </div>
    </aside>
  );
}
