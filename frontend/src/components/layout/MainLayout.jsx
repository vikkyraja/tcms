import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const linkClass =
  "flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-800";

export default function MainLayout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-gray-700">
          TCMS
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <NavLink to="/" className={linkClass}>📊 Dashboard</NavLink>
          <NavLink to="/projects" className={linkClass}>📁 Projects</NavLink>
          <NavLink to="/testcases" className={linkClass}>🧪 Test Cases</NavLink>
          <NavLink to="/testsuites" className={linkClass}>📦 Test Suites</NavLink>
          <NavLink to="/executions" className={linkClass}>▶️ Executions</NavLink>

          {user?.role === "ADMIN" && (
            <NavLink to="/users" className={linkClass}>👥 Users</NavLink>
          )}
        </nav>

        <div className="p-4 border-t border-gray-700 text-sm">
          <p className="mb-2">Role: {user?.role}</p>
          <button
            onClick={logout}
            className="bg-red-600 w-full py-1 rounded"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
