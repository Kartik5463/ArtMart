import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isPhotographer: false,
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  useEffect(()=>{

if(toast){

    const timerId = setTimeout(()=>{
            setToast(null)
    },3000)
    return ()=>clearTimeout(timerId)

}
},[toast])

 const handleSubmit = async (e) =>{
    e.preventDefault()

try {   
        setLoading(true)
        const response = await fetch('http://localhost:5000/api/auth/signup',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })
    
        const data = await response.json()

        if(!response.ok){
            throw new Error(data.message || "Signup failed")
        }

        setToast({message: "Signup successfully", type: 'success'})
        setTimeout(()=>{navigate('/login')},1500)

} catch (err) {
        setToast({message: err.message, type: 'error'})
        
} finally {
    setLoading(false)
}
}

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-sky-100 via-white to-indigo-100 px-4 py-10">

      <div className="card w-full max-w-md bg-white shadow-2xl rounded-3xl">

        <div className="card-body p-8">

          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800">
              Welcome to ArtMart
            </h1>

            <p className="text-gray-500 mt-3">
              Create your account and start buying or selling amazing photography.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <fieldset className="fieldset">
              <label className="label text-gray-700 font-semibold">
                Full Name
              </label>

              <input
                type="text"
                className="input input-bordered rounded-xl w-full focus:input-primary"
                placeholder="Enter Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </fieldset>

            <fieldset className="fieldset">
              <label className="label text-gray-700 font-semibold">
                Email
              </label>

              <input
                type="email"
                className="input input-bordered rounded-xl w-full focus:input-primary"
                placeholder="Enter Your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </fieldset>

            <fieldset className="fieldset">
              <label className="label text-gray-700 font-semibold">
                Password
              </label>

              <input
                type="password"
                className="input input-bordered rounded-xl w-full focus:input-primary"
                placeholder="Enter Your Password "
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </fieldset>

            <div className="divider text-gray-500">
              Account Type
            </div>

            <label className="flex items-start gap-4 border rounded-2xl p-4 cursor-pointer hover:bg-sky-50 transition-all duration-300">

              <input
                type="checkbox"
                className="checkbox checkbox-primary mt-1"
                checked={formData.isPhotographer}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isPhotographer: e.target.checked,
                  })
                }
              />

              <div>
                <h3 className="font-semibold text-gray-800">
                  Register as Photographer
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Upload your photos, build your portfolio, and earn by selling
                  your work.
                </p>
              </div>
            </label>

            <button
              type="submit"
              className="btn btn-primary w-full rounded-xl mt-2 text-base"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            <div className="divider">OR</div>

            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <span
                className="text-primary font-semibold cursor-pointer hover:underline"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>

          </form>
        </div>
      </div>

      {toast && (
        <div className="toast toast-top toast-end">
          <div
            className={`alert ${
              toast.type === "success"
                ? "alert-success"
                : "alert-error"
            }`}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;