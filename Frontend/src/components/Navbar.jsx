import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const Navbar = () => {
  const { token, logout } = useAuthStore();
  return (
    <nav className="relative bg-[#141210] px-8 py-4 flex justify-between items-center shadow-[0_4px_20px_rgba(0,0,0,0.4)] z-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,480;9..144,600&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Amber baseline to separate from page below */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C88A3E]/40" />

      {/* Logo */}
      <Link to="/" className="font-display text-2xl tracking-tight text-[#F3EEE3]">
        Art<span className="italic text-[#C88A3E]">Mart</span>
      </Link>

      {/* Navigation */}
      <div className="font-body flex items-center gap-3">
        {token===null&&<Link
          to="/login"
          className="border border-[#3A362F] text-[#F3EEE3] px-5 py-2 rounded-full font-medium transition-all duration-300 hover:border-[#C9C2B3] hover:bg-white/[0.03]"
        >
          Login
        </Link>}

        {token===null&&<Link
          to="/signup"
          className="bg-[#C88A3E] text-[#1B1816] px-5 py-2 rounded-full font-semibold transition-all duration-300 hover:bg-[#DBA05A] hover:-translate-y-0.5"
        >
          Sign Up
        </Link>}

        {token && (
          <Link
            to="/"
            className="border border-red-500/40 text-red-400 px-5 py-2 rounded-full font-medium transition-all duration-300 hover:bg-red-500/10 hover:border-red-500"
            onClick={() => {
              logout();
            }}
          >
            Log Out
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;