import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/UseAuthStore";

function Profile() {
  const navigate = useNavigate();

  const { token, user, setUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      console.log("user object:", user);
      setFormData({
        name: user.userName,
        email: user.userEmail,
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancel = () => {
    setFormData({
      name: user.userName,
      email: user.userEmail,
    });

    setSelectedImage(null);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const form = new FormData();

      form.append("name", formData.name);

      if (selectedImage) {
        form.append("profileImg", selectedImage);
      }

      const response = await fetch(
        "http://localhost:5000/api/profile/update",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setUser(data.updatedUser);

      setSelectedImage(null);
      setIsEditing(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cover */}
      <div className="h-60 bg-linear-to-r from-indigo-600 via-blue-600 to-cyan-500"></div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Profile Card */}
        <div className="-mt-24 bg-white rounded-3xl shadow-xl p-8">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left */}
            <div className="md:w-1/3 flex flex-col items-center">
              <img
              src={
  selectedImage
    ? URL.createObjectURL(selectedImage)
    : user.profileImg
    ? (user.profileImg.startsWith("http")
        ? user.profileImg
        : `http://localhost:5000${user.profileImg}`)
    : `https://ui-avatars.com/api/?background=random&name=${user.userName}`
}
                alt="Profile"
                className="w-44 h-44 rounded-full object-cover border-4 border-white shadow-lg"
              />

              {isEditing && (
                <div className="mt-5 w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Change Profile Picture
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedImage(e.target.files[0])}
                    className="block w-full text-sm text-gray-700
                    file:mr-4
                    file:rounded-lg
                    file:border-0
                    file:bg-blue-600
                    file:px-4
                    file:py-2
                    file:text-white
                    hover:file:bg-blue-700
                    cursor-pointer"
                  />
                </div>
              )}
            </div>
               
            {/* Right */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-8">
                My Profile
              </h2>

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Name
                  </label>

                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="rounded-xl bg-gray-100 p-4">
                      {user.userName}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Email
                  </label>

                  <div className="rounded-xl bg-gray-100 p-4">
                    {user.userEmail}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  {!isEditing ? (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className=" cursor-pointer rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition"
                      >
                        Edit Profile
                      </button>

                      <button
                        onClick={() => navigate("/change-password")}
                        className=" cursor-pointer rounded-xl bg-gray-800 px-6 py-3 text-white hover:bg-black transition"
                      >
                        Change Password
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleSave}
                        disabled={loading}
                        className=" cursor-pointer rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700 transition"
                      >
                        {loading ? "Saving..." : "Save Changes"}
                      </button>

                      <button
                        onClick={handleCancel}
                        className=" cursor-pointer rounded-xl bg-red-500 px-6 py-3 text-white hover:bg-red-600 transition"
                      >
                        Cancel
                      </button>
                    </>
                  )} 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;