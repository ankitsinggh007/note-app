import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IoHomeSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { useState } from "react";

const Sidebar = () => {
  const { logout } = useAuth();
  const user = {
    name: "ankit singh",
    email: "ankit@example.com",
    id: 12123978687678678687687,
  };

  const [toggle, setToggle] = useState(false);

  // Extract initials from username
  const getInitials = (name) => {
    return name ? name.split(" ").map((word) => word[0]).join("").toUpperCase() : "";
  };

  // Helper function to determine the dynamic classes for NavLink
  const getLinkClasses = (isActive) => {
    return `flex items-center space-x-3 p-3 rounded-md ${
      isActive ? "bg-[#F6EAFF] text-[#6C31A8]" : "text-gray-600"
    }`;
  };

  return (
    <aside className="w-1/4 min-h-screen bg-white shadow-md p-4 flex flex-col justify-between relative">
      {/* Logo & App Name */}
      <div className="flex items-center space-x-2 mb-6">
        <img src="/logo.png" alt="Logo" className="w-8 h-8" />
        <h2 className="text-lg font-bold text-black">AI Notes</h2>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2">
        <NavLink to="/" className={({ isActive }) => getLinkClasses(isActive)}>
          <IoHomeSharp className="text-xl" />
          <span>Home</span>
        </NavLink>

        <NavLink to="/favorites" className={({ isActive }) => getLinkClasses(isActive)}>
          <FaStar className="text-xl" />
          <span>Favorite</span>
        </NavLink>
      </nav>

      {/* User Profile & Logout */}
      {user && (
        <div className="flex items-center space-x-3 p-3 mt-auto border relative">
          <div
            onClick={() => setToggle((prev) => !prev)}
            className="w-10 h-10 flex items-center justify-center bg-black text-slate-100 font-bold rounded-full cursor-pointer"
          >
            {getInitials(user.name)}
          </div>

          {/* Profile Menu Dropdown */}
          {toggle && (
            <div className="absolute bottom-full  -left-3   w-full bg-white border border-gray-300 rounded-md z-10">
              <ul className="text-sm">
                <li
                  onClick={logout}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
