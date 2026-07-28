import { Link } from "react-router-dom";
import useAuthStore from "../store/UseAuthStore";

const Navbar = () => {
  const {token,logout}=useAuthStore()
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-3xl font-extrabold text-blue-600 tracking-wide">
        Art<span className="text-emerald-500">Mart</span>
      </Link>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        {token===null&&<Link
          to="/login"
          className=" bg-blue-600 600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 font-medium transition"
        >
          Login
        </Link>}

        {token===null&&<Link
          to="/signup"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
        >
          Sign Up
        </Link>}
        {token&&<Link to="/" 
        className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-800 transition shadow-md"
        onClick={()=>{
            logout()
        }}>Log Out</Link>}
      </div>
    </nav>
  );
};

export default Navbar;