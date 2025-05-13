import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../actions/userAction";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react"; // Optional: use any icon library or custom SVG

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { error, success, loading } = useSelector((state) => state.forgetPassword);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(token, { password, confirmPassword }));
  };

  useEffect(() => {
    if (error) toast.error(error);
    if (success) {
      toast.success("Password reset successful");
      navigate("/login");
    }
  }, [error, success, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Set your new password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Make sure it's strong and secure
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={submitHandler}>
          <div className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 
                  placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 
                  focus:border-indigo-500 sm:text-sm pr-10"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 
                  placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 
                  focus:border-indigo-500 sm:text-sm pr-10"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent 
                text-sm font-medium rounded-md text-white ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
