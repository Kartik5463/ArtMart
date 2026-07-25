
import { Navigate, useNavigate } from "react-router-dom";
import useAuthStore from "../Store/useAuthStore.js";
const Home = () => {
  const { token } = useAuthStore();
  const navigate = useNavigate();

  // If user is already logged in, send to feed
  if (token) {
    return <Navigate to="/feed" replace />;
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center px-6">

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">

        {/* Left Content */}
        <div className="space-y-6">

          <h1 className="text-5xl font-bold leading-tight text-gray-900">
            Capture Moments.
            <span className="text-primary block">
              Sell Stories.
            </span>
          </h1>

          <p className="text-lg text-gray-600 max-w-lg">
            ArtMart connects talented photographers with people
            looking for unique and beautiful photographs.
            Discover, buy, and showcase amazing photography.
          </p>


          <div className="flex gap-4">

            <button
              onClick={() => navigate("/signup")}
              className="btn btn-primary px-8"
            >
              Get Started
            </button>


            <button
              onClick={() => navigate("/login")}
              className="btn btn-outline px-8"
            >
              Login
            </button>

          </div>


          <div className="flex gap-8 pt-6">

            <div>
              <h3 className="text-2xl font-bold">
                1000+
              </h3>
              <p className="text-gray-500">
                Photos
              </p>
            </div>


            <div>
              <h3 className="text-2xl font-bold">
                500+
              </h3>
              <p className="text-gray-500">
                Creators
              </p>
            </div>


            <div>
              <h3 className="text-2xl font-bold">
                24/7
              </h3>
              <p className="text-gray-500">
                Access
              </p>
            </div>

          </div>

        </div>



        {/* Right Image Section */}
        <div className="flex justify-center">

          <div className="card bg-base-100 shadow-2xl p-4 rotate-3 hover:rotate-0 transition duration-500">

            <img
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
              alt="Photography"
              className="rounded-xl w-[450px] h-[450px] object-cover"
            />

          </div>

        </div>


      </div>

    </div>
  );
};

export default Home;