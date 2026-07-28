import { useState } from "react";
import useAuthStore from "../store/UseAuthStore";
import toast from "react-hot-toast";
const Upload = () => {
  const { token } = useAuthStore();

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
  const [generating, setGenerating] = useState(false);

  const handleGenerateDescription = async () => {
    if (!formData.title || !formData.tag) {
       toast.error("Please enter title and category first.");
      return;
    }
    if (
      formData.description &&
      !window.confirm("Replace the current description?")
    ) {
      return;
    }

    try {
      setGenerating(true);

      const res = await fetch("http://localhost:5000/api/ai/description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // if your route is protected
        },
        body: JSON.stringify({
          title: formData.title,
          tag: formData.tag,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          description: data.description,
        }));
      } else {
        toast.error("Please enter title and category first.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to generate description.");
    } finally {
      setGenerating(false);
    }
  };
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
      toast.error("Please select an image.");
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
        toast.error(error.message)
        return;
      }

      const result = await res.json();
      console.log(result);

      toast.success("Photo uploaded successfully!");

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
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8 ">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white shadow-2xl overflow-hidden grid lg:grid-cols-2">
        {/* Left */}
        <div className="p-10">
          <h1 className="text-4xl font-bold text-slate-800">
            Upload Photo
          </h1>

          <p className="text-slate-500 mt-2 mb-8">
            Share your creativity with thousands of buyers.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="title"
              placeholder="Photo Title"
              required
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered w-full bg-amber-50 rounded-xl p-3"
            />
            <div className="flex justify-between items-center mb-2">
              <label className="font-medium text-gray-700">
                Description
              </label>

              <button
                type="button"
                onClick={handleGenerateDescription}
                disabled={generating}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-sm disabled:opacity-50"
              >
                {generating ? "Generating..." : "✨ AI Generate"}
              </button>
            </div>

            <textarea
              value={formData.description}
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              rows={5}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="number"
              name="price"
              required
              min="0"
              placeholder="(₹) Price"
              value={formData.price}
              onChange={handleChange}
              className="input input-bordered w-full bg-amber-50 rounded-xl p-3"
            />
            <input
              type="text"
              name="tag"
              required
              placeholder="Nature, Wildlife, Portrait..."
              value={formData.tag}
              onChange={handleChange}
              className="input input-bordered w-full bg-amber-50 rounded-xl p-3"
            />

            <label className="flex items-center gap-3">
              <input
                required
                type="checkbox"
                name="isForSale"
                checked={formData.isForSale}
                onChange={handleChange}
                className="checkbox checkbox-primary"
              />
              <span className="font-medium text-slate-700">
                Available for Sale
              </span>
            </label>

            {/* Premium File Picker */}
            <div>
              <input
                required
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />

              <label
                htmlFor="photo-upload"
                className="flex items-center justify-between w-full cursor-pointer rounded-2xl border-2 border-dashed border-indigo-300 bg-indigo-50 px-5 py-5 hover:border-indigo-500 hover:bg-indigo-100 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">🖼️</div>

                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {photo ? photo.name : "Choose an Image"}
                    </h3>

                    <p className="text-sm text-slate-500">
                      JPG, PNG, JPEG • Click to Browse
                    </p>
                  </div>
                </div>

                <span className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-semibold shadow hover:bg-indigo-700 transition">
                  Browse
                </span>
              </label>
            </div>

            <button
              disabled={loading}
              className="btn btn-primary w-full rounded-xl text-lg bg-green-300 py-2"
            >
              {loading ? "Uploading..." : "Upload Photo"}
            </button>
          </form>
        </div>

        {/* Right */}
        <div className="bg-slate-900 flex items-center justify-center p-8">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="rounded-3xl shadow-2xl max-h-[600px] w-full object-cover"
            />
          ) : (
            <div className="text-center text-slate-400">
              <div className="text-8xl mb-5">📸</div>

              <h2 className="text-2xl font-semibold">
                No Image Selected
              </h2>

              <p className="mt-2 text-slate-500">
                Upload an image to preview it here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;
