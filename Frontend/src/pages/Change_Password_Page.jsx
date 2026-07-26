import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Change_Password_Page = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    oldPassword: '', 
    newPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setSuccess('');
      setIsLoading(true);

      const response = await fetch("http://localhost:5000/api/profile/change-password", {
         method: "PUT",
         headers: { 
           "Content-Type": "application/json" // FIX 2: Added Content-Type
         },
         body: JSON.stringify(formData)

      });
      
      const result = await response.json();

      // FIX 3: Catch backend errors (like 400 or 401 status codes)
      if (!response.ok) {
        throw new Error(result.message || "Something went wrong.");
      }

      setSuccess(result.message || "Password updated successfully!");
      
      // Optional: Clear the form on success
      setFormData({ email: '', oldPassword: '', newPassword: '' });
      navigate("/login");

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Change Password
        </h2>
        
        {error && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
            {error}
          </div>
        )}
        
        {success && (
          <div className="p-3 mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label 
              htmlFor="email" 
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label 
              htmlFor="oldPassword" 
              className="text-sm font-medium text-gray-700"
            >
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword" // FIX 1: Matched name to state
              value={formData.currentPassword}
              onChange={handleChange}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter old password"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label 
              htmlFor="newPassword" 
              className="text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter new password (min. 8 characters)"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="mt-2 w-full py-2.5 px-4 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Change_Password_Page;