import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import toast from "react-hot-toast";
import { VITE_API_URL } from "../config/api";
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
  const [generatingPrice, setGeneratingPrice] = useState(false);
  const [aiImage, setAiImage] = useState("");
  const handleGenerateImage = async () => {
    if (!formData.title || !formData.description) {
      toast.error("Please enter title and description first.");
      return;
    }

    if (
      photo &&
      !window.confirm("Replace the current image?")
    ) {
      return;
    }

    try {
      setGenerating(true);

      const res = await fetch(`${VITE_API_URL}/api/ai/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message)
        toast.error(data.message);
        return;
      }

      // Save filename
      setAiImage(data.filename);
      setPhoto(null);
      setPreview(data.imageUrl);

      toast.success("AI Image Generated!");

    } catch (err) {
      console.log(err);
      toast.error("Failed to generate image.");
    } finally {
      setGenerating(false);
    }
  };
  const handleGeneratePrice = async () => {

    if (!formData.title || !formData.tag || !formData.description) {
      toast.error("Please enter title and category first and Description first");
      return;
    }
    if (
      formData.price &&
      !window.confirm("Replace the current Price?")
    ) {
      return;
    }


    try {

      setGeneratingPrice(true);


      const res = await fetch(
        `${VITE_API_URL}/api/ai/price`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify({
            title: formData.title,
            tag: formData.tag,
            description: formData.description
          })
        }
      );


      const data = await res.json();


      if (data.success) {

        setFormData(prev => ({
          ...prev,
          price: data.price
        }));

      }


    }
    catch (err) {
      toast.error(err.message)
    }
    finally {
      setGeneratingPrice(false);
    }

  }
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

      const res = await fetch(`${VITE_API_URL}/api/ai/description`, {
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

    setAiImage("");   // Clear AI image
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo && !aiImage) {
      toast.error("Please select or generate an image.");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      if (aiImage) {
        data.append("photo", aiImage);
        data.append("isAI", "true");
      } else {
        data.append("photo", photo);
      }
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("tag", formData.tag);
      data.append("isForSale", formData.isForSale);
      const res = await fetch(`${VITE_API_URL}/api/photo`, {
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
      setAiImage("");
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 py-10 px-4">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] grid lg:grid-cols-2">

        {/* Left */}
        <div className="p-10 lg:p-12">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-slate-800">
              📸 Upload Your Photo
            </h1>
            <p className="mt-3 text-slate-500">
              Share your best work with thousands of buyers around the world.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title */}
            <div className="space-y-2">
              <label className="font-semibold text-slate-700">
                📝 Photo Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="Amazing Sunset"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 to-indigo-50 p-5">

              <div className="mb-3 flex items-center justify-between">

                <label className="font-semibold text-slate-700">
                  🤖 AI Description
                </label>

                <button
                  type="button"
                  onClick={handleGenerateDescription}
                  disabled={generating}
                  className="rounded-xl cursor-pointer bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {generating ? "Generating..." : "✨ Generate"}
                </button>

              </div>

              <textarea
                rows={5}
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition-all duration-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
              />
            </div>

            {/* Price */}
            <div className="rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-5">

              <div className="mb-3 flex items-center justify-between">

                <label className="font-semibold text-slate-700">
                  💰 Price
                </label>

                <button
                  type="button"
                  onClick={handleGeneratePrice}
                  disabled={generatingPrice}
                  className="rounded-xl cursor-pointer bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-60"
                >
                  {generatingPrice ? "Predicting..." : "💵 Predict Price"}
                </button>

              </div>

              <input
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition-all duration-300 focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="font-semibold text-slate-700">
                🏷️ Category
              </label>

              <input
                type="text"
                name="tag"
                required
                placeholder="Nature, Wildlife, Portrait..."
                value={formData.tag}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            {/* Checkbox */}
            <label className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
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

            {/* Upload */}
            <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-5">

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="font-semibold text-slate-700">
                    🤖 AI Image
                  </h3>

                  <p className="text-sm text-slate-500">
                    Generate an image from the title and description.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleGenerateImage}
                  disabled={generating}
                  className=" bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2 text-white font-semibold rounded-xl cursor-pointer  text-sm   shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-60"
                >
                  {generating ? "Generating..." : "✨ Generate"}
                </button>

              </div>

            </div>
            <div>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />

              <label
                htmlFor="photo-upload"
                className="flex cursor-pointer items-center justify-between rounded-2xl border-2 border-dashed border-indigo-300 bg-gradient-to-r from-indigo-50 to-violet-50 p-6 transition-all duration-300 hover:border-indigo-500 hover:shadow-lg"
              >
                <div className="flex items-center gap-5">
                  <div className="text-5xl">🖼️</div>

                  <div>
                    <h3 className="font-semibold text-slate-800 m-5">
                      {photo
                        ? photo.name
                        : aiImage
                          ? aiImage
                          : "Choose an Image or Generate with AI"}
                    </h3>

                    <p className="text-sm text-slate-500">
                      JPG, PNG, JPEG
                    </p>
                  </div>
                </div>

                <span className="rounded-xl bg-indigo-600 px-5 py-2 font-semibold text-white shadow transition hover:bg-indigo-700">
                  Browse
                </span>
              </label>
            </div>

            <button
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl disabled:opacity-60"
            >
              {loading ? "Uploading..." : "🚀 Upload Photo"}
            </button>

          </form>
        </div>

        {/* Right */}
        <div className="flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-10">

          {preview ? (
            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <img
                src={preview}
                alt="Preview"
                className="max-h-[650px] w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>
          ) : (
            <div className="text-center">

              <div className="mb-5 text-8xl">📸</div>

              <h2 className="text-3xl font-bold text-white">
                Live Preview
              </h2>

              <p className="mt-3 text-slate-400">
                Your uploaded image will appear here.
              </p>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Upload;
