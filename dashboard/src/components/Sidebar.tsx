import { NavLink } from "react-router-dom";

function Sidebar() {
  const links = [
    { to: "/users", label: "Users" },
    { to: "/products", label: "Products" },
    { to: "/analytics", label: "Analytics" },
    { to: "/settings", label: "Settings" },
  ];
  return (
    <aside className="bg-gray-800 text-white w-full min-h-screen flex flex-col p-6">
      <div className="mb-8">
        <NavLink to="/">
          <div className="text-2xl font-bold mb-6 text-center tracking-wide">
            Dashboard
          </div>
        </NavLink>
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
        />
      </div>
      <nav className="flex-1">
        <ul className="flex flex-col space-y-2">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded hover:bg-gray-700 transition-colors ${
                    isActive ? "bg-gray-700 font-bold" : ""
                  }`
                }>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
