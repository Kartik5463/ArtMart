import { useEffect, useState } from "react";
import PhotoCard from "../components/PhotoCard";
import useAuthStore from "../store/useAuthStore";
import { VITE_API_URL } from "../config/api";
import { useNavigate } from "react-router-dom";
const Feed = () => {
  const [photos, setPhotos] = useState([]);
  const { token } = useAuthStore()
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate();

  useEffect(() => {

    const getPhotos = async () => {

      console.log("useEffect called");

      console.log("Token:", token);

      try {

        const url = searchTerm

          ? `${VITE_API_URL}/api/photo/search?tag=${encodeURIComponent(searchTerm)}`

          : `${VITE_API_URL}/api/photo/sale`;

        const res = await fetch(url, {

          method: "GET",

          headers: {

            Authorization: `Bearer ${token}`,

          },

        });

        const result = await res.json();

        console.log("Response:", result);

        setPhotos(result?.data);

      } catch (err) {

        if (err.response?.status === 401) {
        localStorage.removeItem("loginStorage");
        navigate("/");
        }

      }

    };

    const timerId = setTimeout(() => {

      getPhotos();

    }, 500);

    return () => clearTimeout(timerId);

  }, [searchTerm]);

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
          Explore Photos
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Discover stunning photography from talented creators around the world.
        </p>
      </div>

      {/* Search Box */}
      <div className="mb-10">
        <div className="relative max-w-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M16 10.5A5.5 5.5 0 115 10.5a5.5 5.5 0 0111 0z"
            />
          </svg>

          <input
            type="text"
            placeholder="Search photos by tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-14 pr-5 text-gray-700 shadow-lg transition-all duration-300 placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
          />
        </div>
      </div>

      {/* Photo Grid */}
      {photos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {photos.map((photo) => (
            <PhotoCard key={photo._id} photo={photo} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white py-20 shadow-md">
          <div className="text-6xl mb-4">📷</div>
          <h2 className="text-2xl font-bold text-gray-800">
            No Photos Found
          </h2>
          <p className="mt-2 text-gray-500">
            Try searching with another tag.
          </p>
        </div>
      )}
    </div>
  </div>
);
};

export default Feed;