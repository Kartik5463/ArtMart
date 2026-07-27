import { useEffect, useState } from "react";
import PhotoCard from "../components/PhotoCard";
import useAuthStore from "../store/UseAuthStore";

const MyPhotos = () => {
  const { token, user } = useAuthStore();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPortfolio = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/photo/portfolio/${user.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await res.json();
        console.log(result)
        if (result.success) {
          setPhotos(result.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.userId) {
      getPortfolio();
    }
  }, [user, token]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-10">
      <h1 className="text-4xl font-bold mb-8">My Portfolio</h1>

      {photos.length === 0 ? (
        <div className="text-center text-gray-500 mt-20 text-xl">
          You haven't uploaded any photos yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {photos.map((photo) => (
            <PhotoCard key={photo._id} photo={photo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPhotos;