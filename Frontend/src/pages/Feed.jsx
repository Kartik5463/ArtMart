import { useEffect, useState } from "react";
import PhotoCard from "../components/PhotoCard";
import useAuthStore from "../store/UseAuthStore";

const Feed = () => {
  const [photos, setPhotos] = useState([]);
  const {token}=useAuthStore()
  useEffect(() => {
  const getPhotos = async () => {
     console.log("useEffect called");
     console.log("Token:", token);
    if(!token)return
    try {
      const res = await fetch("http://localhost:5000/api/photo", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      console.log("Response:",result);
      setPhotos(result.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  getPhotos();
}, [token]);
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Explore Photos
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <PhotoCard key={photo._id} photo={photo} />
        ))}
      </div>
    </div>
  );
};

export default Feed;