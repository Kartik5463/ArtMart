import  { useEffect, useState } from "react";
import useAuthStore from "../store/UseAuthStore";

const PurchasedImages = () => {
  const { token } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          "http://localhost:5000/api/profile/my-purchases",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }

        setImages(data.user.purchasedImages);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-xl text-gray-500">Loading purchased images...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            Purchased Images
          </h1>

          <span className="text-gray-500 font-medium">
            {images.length} Images
          </span>
        </div>

        {images.length === 0 ? (

          <div className="h-72 bg-white rounded-2xl shadow flex items-center justify-center border-2 border-dashed border-gray-300">
            <p className="text-2xl text-gray-400">
              No Purchased Images
            </p>
          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {images.map((image) => (

              <div
               
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
              >

                <img
                  src={
                    image.imageUrl.startsWith("http")
                      ? image.imageUrl
                      : `http://localhost:5000${image.imageUrl}`
                  }
                  alt={image.title}
                  className="w-full h-60 object-cover"
                />

                <div className="p-5">

                  <h2 className="text-xl font-semibold">
                    {image.title}
                  </h2>

                  <p className="text-gray-500 mt-2 text-sm line-clamp-3">
                    {image.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">

                    <span className="text-sm font-medium text-blue-600">
                      Photographer : {image.photographer?.name || "Unknown Photographer"}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </div>
  );
};

export default PurchasedImages;