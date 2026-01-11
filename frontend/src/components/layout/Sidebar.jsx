import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; // Assuming this is your custom hook

// --- Optional: Add Icons for a more engaging sidebar ---
// You would typically import these from an icon library like Heroicons, Font Awesome, etc.
// For this example, I'll use placeholders or simple SVGs if needed, but primarily focus on structure.
import {
  HomeIcon,
  FolderIcon,
  DocumentTextIcon,
  ClipboardListIcon,
  PlayIcon, // Or a similar icon for executions
  UsersIcon,
} from '@heroicons/react/24/outline'; // Example from Heroicons

const nav = [
  { label: "Dashboard", path: "/", icon: HomeIcon },
  { label: "Projects", path: "/projects", icon: FolderIcon },
  { label: "Test Cases", path: "/testcases", icon: DocumentTextIcon },
  { label: "Test Suites", path: "/testsuites", icon: ClipboardListIcon },
  { label: "Executions", path: "/executions", icon: PlayIcon },
  { label: "Users", path: "/users", role: "ADMIN", icon: UsersIcon } // Assuming role is "ADMIN"
];

export default function Sidebar() {
  const { role } = useAuth(); // Assuming useAuth provides the user's role

  return (
    // The main sidebar container: fixed, full height, with modern styling
    <aside className="
      hidden md:block                   {/* Hide on small screens, show on medium and up */}
      fixed top-0 left-0 h-screen w-64 {/* Fixed position, full height, specific width */}
      bg-gradient-to-br from-white to-gray-50 {/* Soft gradient background */}
      border-r border-gray-200         {/* Subtle right border */}
      shadow-xl                        {/* More pronounced shadow for depth */}
      overflow-y-auto                  {/* Allows sidebar content to scroll if it exceeds screen height */}
      z-30                             {/* Ensure it stays above other content */}
      font-sans                        {/* Consistent font */}
    ">
      {/* Logo/Brand Section */}
      <div className="p-6 pb-4 border-b border-gray-200">
        <h1 className="text-4xl font-extrabold text-blue-700 tracking-tight">
          TCMS
        </h1>
        {/* Optional: Add a tagline or sub-logo here */}
        {/* <p className="text-sm text-gray-500 mt-1">Test Case Management</p> */}
      </div>

      {/* Navigation Links Section */}
      <nav className="p-4 space-y-2">
        {nav.map(item => {
          // Check role for conditional rendering
          const isAllowed = !item.role || (role && item.role === role);

          if (!isAllowed) {
            return null;
          }

          // Render NavLink
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex items-center space-x-3         {/* For icon and text alignment */}
                px-4 py-3 rounded-lg                 {/* Generous padding, soft rounded corners */}
                text-base font-medium                {/* Larger, clear text */}
                transition-all duration-200 transform {/* Smooth transitions for hover/active states */}
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md hover:bg-blue-700 scale-[1.01]" // Active state: blue background, white text, subtle shadow and scale
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"             // Inactive state: gray text, light hover background
                }
                `
              }
            >
              {item.icon && ( // Render icon if provided
                <item.icon className="h-6 w-6" aria-hidden="true" />
              )}
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};