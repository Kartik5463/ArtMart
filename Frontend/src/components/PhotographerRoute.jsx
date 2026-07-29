

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { ShieldAlert } from "lucide-react";

const PhotographerRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const blocked = !user?.isPhotographer;

  useEffect(() => {
    if (!blocked) return;

    const timerId = setTimeout(() => {
      navigate("/dashboard", { replace: true });
    }, 3000);

    return () => clearTimeout(timerId);
  }, []);

 

  if (blocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-5">
            <ShieldAlert size={28} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Access Denied
          </h2>
          <p className="text-slate-500">
            Only photographers can access this page. Redirecting you to the
            dashboard...
          </p>
        </div>

        <div className="fixed top-5 right-5 z-50">
          <div className="px-5 py-3 rounded-lg shadow-lg text-sm font-medium text-white bg-red-600">
            Only photographers can access this page.
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default  PhotographerRoute;