import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-3xl font-extrabold text-blue-600 tracking-wide">
        Art<span className="text-emerald-500">Mart</span>
      </Link>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <Link
          to="/login"
          className=" bg-blue-600 600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 font-medium transition"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;