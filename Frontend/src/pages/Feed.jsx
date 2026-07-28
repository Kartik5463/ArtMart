import { useEffect, useState } from "react";
import PhotoCard from "../components/PhotoCard";
import useAuthStore from "../store/UseAuthStore";

const Feed = () => {
  const [photos, setPhotos] = useState([]);
  const { token } = useAuthStore()
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {

    const getPhotos = async () => {

      console.log("useEffect called");

      console.log("Token:", token);

      try {

        const url = searchTerm

          ? `http://localhost:5000/api/photo/search?tag=${encodeURIComponent(searchTerm)}`

          : "http://localhost:5000/api/photo/sale";

        const res = await fetch(url, {

          method: "GET",

          headers: {

            Authorization: `Bearer ${token}`,

          },

        });

        const result = await res.json();

        console.log("Response:", result);

        setPhotos(result.data);

      } catch (err) {

        console.log("Error:", err);

      }

    };

    const timerId = setTimeout(() => {

      getPhotos();

    }, 500);

    return () => clearTimeout(timerId);

  }, [searchTerm]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">
        Explore Photos
      </h1>
      <input
        type="text"
        placeholder="Search by tag..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <PhotoCard key={photo._id} photo={photo} />
        ))}
      </div>
    </div>
  );
};

export default Feed;