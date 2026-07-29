import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const SideBar = () => {

  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  console.log(user?.profileImg)
  console.log(user)
  const HandleLogOut = async () => {
    await logout()
    navigate('/');
  }
  return (
  <div className="flex min-h-screen bg-gray-100">
    {/* Sidebar */}
    <aside className="sticky top-0 h-screen w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white shadow-2xl">
      {/* Logo */}
      <div className="px-6 py-7 border-b border-gray-700">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          ArtMart
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Digital Marketplace
        </p>
      </div>

      {/* Profile */}
      <NavLink
        to="/dashboard/profile"
        className="mx-4 mt-6 flex items-center gap-4 rounded-2xl bg-gray-800 hover:bg-gray-700 transition-all duration-300 p-4"
      >
        <img
          src={
            user?.profileImg?.startsWith("http")
              ? user.profileImg
              : `http://localhost:5000${user?.profileImg}`
          }
          className="h-14 w-14 rounded-full border-2 border-indigo-500 object-cover"
        />

        <div>
          <h2 className="font-semibold text-lg">{user.userName}</h2>
          <p className="text-xs text-gray-400">View Profile</p>
        </div>
      </NavLink>

      {/* Navigation */}
      <nav className="px-4 mt-8 space-y-2">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `block px-4 py-3 rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-indigo-600 shadow-lg"
                : "hover:bg-gray-700"
            }`
          }
        >
          Feed
        </NavLink>

        <NavLink
          to="/dashboard/upload"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-indigo-600 shadow-lg"
                : "hover:bg-gray-700"
            }`
          }
        >
          Upload
        </NavLink>

        <NavLink
          to="/dashboard/myphotos"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-indigo-600 shadow-lg"
                : "hover:bg-gray-700"
            }`
          }
        >
          My Photos
        </NavLink>

        <NavLink
          to="/dashboard/purchases"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-indigo-600 shadow-lg"
                : "hover:bg-gray-700"
            }`
          }
        >
          Purchases
        </NavLink>

        <NavLink
          to="/dashboard/sales"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-indigo-600 shadow-lg"
                : "hover:bg-gray-700"
            }`
          }
        >
          Sales
        </NavLink>

        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-indigo-600 shadow-lg"
                : "hover:bg-gray-700"
            }`
          }
        >
          Settings
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="px-4 mt-8">
        <button
          onClick={HandleLogOut}
          className="w-full rounded-xl bg-red-500 py-3 font-semibold transition-all duration-300 hover:bg-red-600 hover:shadow-lg"
        >
          Log Out
        </button>
      </div>
    </aside>

    {/* Content */}
    <main className="flex-1 p-8">
      <Outlet />
    </main>
  </div>
);
};

export default SideBar;