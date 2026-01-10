import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="flex justify-between items-center bg-white px-4 py-3 border-b">
      <h2 className="font-semibold text-gray-800">Test Case Management</h2>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {user?.name} ({user?.role})
        </span>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1.5 rounded-md text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
