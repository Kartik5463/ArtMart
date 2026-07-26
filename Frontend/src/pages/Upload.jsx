import { useState } from "react";
import useAuthStore from "../store/UseAuthStore";

const Upload = () => {
  const { token} = useAuthStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    tag: "",
    isForSale: true,
  });

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
      alert("Please select an image.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("photo", photo);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("tag", formData.tag);
      data.append("isForSale", formData.isForSale);
      const res = await fetch("http://localhost:5000/api/photo", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });
      if (!res.ok) {
        const error = await res.json();
        console.log(error);
        alert(error.message);
        return;
      }
      const result = await res.json();
      console.log(result);
      alert("Photo uploaded successfully!");

      setFormData({
        title: "",
        description: "",
        price: "",
        tag: "",
        isForSale: true,
      });

      setPhoto(null);
      setPreview(null);
    } catch (err) {
      console.log(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white shadow-2xl overflow-hidden grid lg:grid-cols-2">
        <div className="p-10">
          <h1 className="text-4xl font-bold text-slate-800">Upload Photo</h1>

          <p className="text-slate-500 mt-2 mb-8">
            Share your creativity with thousands of buyers.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="title"
              placeholder="Photo Title"
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered w-full bg-amber-50 rounded p-2"
            />

            <textarea
              name="description"
              placeholder="Description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full bg-amber-50 rounded p-2"
            />

            <input
              type="number"
              name="price"
              placeholder="Price ($)"
              value={formData.price}
              onChange={handleChange}
              className="input input-bordered w-full bg-amber-50 rounded p-2"
            />

            <input
              type="text"
              name="tag"
              placeholder="Nature, Wildlife, Portrait..."
              value={formData.tag}
              onChange={handleChange}
              className="input input-bordered w-full bg-amber-50 rounded p-2"
            />

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isForSale"
                checked={formData.isForSale}
                onChange={handleChange}
                className="checkbox checkbox-primary"
              />
              Available for Sale
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="file-input file-input-bordered w-full  bg-amber-50 rounded p-2"
            />

            <button disabled={loading} className="btn btn-primary w-full">
              {loading ? "Uploading..." : "Upload Photo"}
            </button>
          </form>
        </div>

        <div className="bg-slate-900 flex items-center justify-center p-8">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="rounded-2xl shadow-2xl max-h-[600px] object-cover"
            />
          ) : (
            <div className="text-center text-slate-400">
              <div className="text-7xl mb-5">📸</div>
              <p>No Image Selected</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;
