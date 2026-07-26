import { Navigate, useNavigate } from "react-router-dom";
import useAuthStore from "../store/UseAuthStore.js";
const Home = () => {
  const { token } = useAuthStore();
  const navigate = useNavigate();

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen  from-slate-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">

        <div className="grid lg:grid-cols-2 items-center gap-24">

          {/* Left Section */}
          <div>

            <span className="inline-block rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-600">
              📸 Welcome to ArtMart
            </span>

            <h1 className="mt-8 text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-slate-900">
              Capture Moments.
              <br />
              <span className="text-indigo-500">
                Sell Stories.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-9 text-slate-500">
              ArtMart is a marketplace where photographers showcase their
              creativity and buyers discover breathtaking images from around
              the world. Buy, sell, and inspire through photography.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">

              <button
                onClick={() => navigate("/signup")}
                className="rounded-xl bg-indigo-600 px-8 py-4 text-white font-semibold shadow-lg shadow-indigo-200 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-700"
              >
                Get Started
              </button>

              <button
                onClick={() => navigate("/login")}
                className="rounded-xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-100"
              >
                Login
              </button>

            </div>

            {/* Stats */}
            <div className="mt-16 flex gap-14">

              <div>
                <h2 className="text-4xl font-bold text-indigo-500">
                  1000+
                </h2>
                <p className="mt-2 text-slate-500">
                  Photos
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-indigo-500">
                  500+
                </h2>
                <p className="mt-2 text-slate-500">
                  Creators
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-indigo-500">
                  24/7
                </h2>
                <p className="mt-2 text-slate-500">
                  Access
                </p>
              </div>

            </div>

          </div>

          {/* Right Section */}
          <div className="relative flex justify-center">

            {/* Glow */}
            <div className="absolute h-80 w-80 rounded-full bg-indigo-200 blur-3xl opacity-40"></div>

            {/* Card */}
            <div className="relative rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl">

              <img
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80"
                alt="Photography"
                className="h-[550px] w-[500px] rounded-2xl object-cover transition duration-500 hover:scale-105"
              />

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Home;