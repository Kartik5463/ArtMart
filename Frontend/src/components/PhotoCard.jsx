import { Heart } from "lucide-react";
import useAuthStore from "../store/UseAuthStore";
import { useState } from "react";

const PhotoCard = ({ photo }) => {
  const {token,user}=useAuthStore()
  const [isLiked, setIsLiked] = useState(
  photo.likedBy?.includes(user.userId)
);
  console.log(photo)
  const handleClick=async()=>{
     const url = isLiked
    ? `http://localhost:5000/api/photo/unlike/${photo._id}`
    : `http://localhost:5000/api/photo/like/${photo._id}`;
    try{
             const response=await fetch(url,{
                     method:"PATCH",
                      headers: {
             Authorization: `Bearer ${token}`,
           },
             })
             const data= await response.json();
             console.log(data.photo)

        }
      
      catch(err){
          console.log(err.message)
      }
      finally{
         setIsLiked(!isLiked)
      }
       
  }
  const handleTransaction=async()=>{
     try {
    const response = await fetch("http://localhost:5000/api/transaction/buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        photoId: photo._id,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.log(data.message);
      return;
    }
    window.location.reload();

    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
  }
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
           src={`http://localhost:5000${photo.imageUrl}`}
          alt={photo.title}
          className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
        />
        {/* Sale Badge */}
          <span className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {photo.isForSale?"For Sale":<span className="text-red-500">Not for sale</span>}
          </span>
        {/* Like Button */}
        <button
  onClick={handleClick}
  className={`absolute top-4 right-4 backdrop-blur-sm p-2 rounded-full transition ${
    isLiked ? "bg-red-500 text-white" : "bg-white/80 hover:bg-red-500 hover:text-white"
  }`}
>
  <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
</button>
      </div>

      {/* Details */}
      <div className="p-5 space-y-3">
        <div>
          <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
            {photo.title}
          </h2>

          <p className="text-gray-500 text-sm">
            by{" "}
            <span className="font-medium text-gray-700">
              {photo.photographer.name}
            </span>
          </p>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-indigo-600">
            ₹{photo.price}
          </span>
          {(photo.photographer._id!=user.userId&&photo.photographer!=user.userId&&photo.isForSale)&&<button onClick={handleTransaction} className="bg-green-400 hover:bg-green-700 text-white px-5 py-2 rounded-xl transition">
            Buy Now 
          </button>}
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl transition">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;