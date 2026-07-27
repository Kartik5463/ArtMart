import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "../store/UseAuthStore";

const SideBar = () => {
  const navigate=useNavigate()
  const {logout}=useAuthStore()
  const HandleLogOut=async()=>{
    await logout()
    navigate('/');
  }
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-60 bg-gray-900 text-white p-5">
        <h1 className="text-2xl font-bold mb-8">ArtMart</h1>

        <div className="flex flex-col gap-3">
          <NavLink
            to="/dashboard"
            end
            className="hover:bg-gray-700 px-3 py-2 rounded"
          >
            Feed
          </NavLink>

          <NavLink
            to="/dashboard/upload"
            className="hover:bg-gray-700 px-3 py-2 rounded"
          >
            Upload
          </NavLink>

          <NavLink
            to="/dashboard/myphotos"
            className="hover:bg-gray-700 px-3 py-2 rounded"
          >
            My Photos
          </NavLink>

          <NavLink
            to="/dashboard/purchases"
            className="hover:bg-gray-700 px-3 py-2 rounded"
          >
            Purchases
          </NavLink>

          <NavLink
            to="/dashboard/sales"
            className="hover:bg-gray-700 px-3 py-2 rounded"
          >
            Sales
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className="hover:bg-gray-700 px-3 py-2 rounded"
          >
            Profile
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            className="hover:bg-gray-700 px-3 py-2 rounded"
          >
            Settings
          </NavLink>
          <div
            onClick={HandleLogOut}
            className="hover:bg-gray-700 px-3 py-2 rounded text-red-500"
          >
            Log Out
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default SideBar;