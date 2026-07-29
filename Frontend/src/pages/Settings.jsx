import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { User, Lock, LogOut, ChevronRight } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = async() => {
    await logout()
    navigate('/');
  };

  const settingsOptions = [
    {
      icon: <User size={20} />,
      title: "Edit Profile",
      description: "Update your name, email, and profile picture",
      onClick: () => navigate("/dashboard/profile"),
    },
    {
      icon: <Lock size={20} />,
      title: "Change Password",
      description: "Update your account password",
      onClick: () => navigate("/change-password"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1>
        <p className="text-slate-500 mb-8">
          Manage your account settings and preferences.
        </p>

        {/* User summary card */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6 flex items-center gap-4">
          <img
            src={
              user?.profileImg
                ? user.profileImg.startsWith("http")
                  ? user.profileImg
                  : `http://localhost:5000${user.profileImg}`
                : `https://ui-avatars.com/api/?background=random&name=${user?.name}`
            }
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
          />
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {user?.userName}
            </h2>
            <p className="text-slate-500 text-sm">{user?.userEmail}</p>
          </div>
        </div>

        {/* Settings list */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
          {settingsOptions.map((option, index) => (
            <button
              key={option.title}
              onClick={option.onClick}
              className={`w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition cursor-pointer ${
                index !== settingsOptions.length - 1
                  ? "border-b border-gray-100"//added bottom border to every element 
                  : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  {option.icon}
                </div>
                <div>
                  <p className="font-medium text-slate-900">{option.title}</p>
                  <p className="text-sm text-slate-500">
                    {option.description}
                  </p>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-400" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 font-semibold py-4 rounded-2xl hover:bg-red-100 transition cursor-pointer"
        >
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Settings;
