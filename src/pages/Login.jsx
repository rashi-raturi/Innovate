import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaLock,
  FaEnvelope,
  FaUserGraduate,
  FaSignInAlt,
  FaUserPlus,
  FaHome,
  FaHeart,
  FaIdCard,
  FaArrowRight,
  FaUtensils,
} from "react-icons/fa";
import LoginBackground from "../components/LoginBackground/LoginBackground";

const Login = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [isVendor, setIsVendor] = useState(false);
  const [loginForm, setLoginForm] = useState({
    rollNumber: "",
    password: "",
  });
  const [vendorLoginForm, setVendorLoginForm] = useState({
    vendorId: "",
    password: "",
  });
  const [signupForm, setSignupForm] = useState({
    fullName: "",
    email: "",
    rollNumber: "",
    password: "",
    confirmPassword: "",
  });

  const currentDateTime = "2025-04-05 22:41:19";
  const currentUser = "tanishyadav06012005";
  const navigate = useNavigate();
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    setAnimationClass("animate-fade-in");
  }, []);

  // Handle input changes for login form
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle input changes for vendor login form
  const handleVendorLoginChange = (e) => {
    const { name, value } = e.target;
    setVendorLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle input changes for signup form
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle login form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (isVendor) {
      console.log("Vendor login attempted with:", vendorLoginForm);
      navigate("/vendor-dashboard");
    } else {
      console.log("Student login attempted with:", loginForm);
      onLogin();
      navigate("/home");
    }
  };

  // Handle signup form submission
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle user registration
    if (signupForm.password !== signupForm.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Signup attempted with:", signupForm);
    alert("Account created successfully! Please log in.");
    setActiveTab("login");
  };

  // Handle guest login
  const handleGuestLogin = () => {
    onLogin();
    navigate("/home");
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-900 to-slate-800 flex flex-col">
      <LoginBackground />

      <div className="container mx-auto py-12 px-4 relative z-10 flex flex-col items-center justify-center flex-grow">
        <div
          className={`w-full max-w-4xl transition-all duration-1000 ${animationClass}`}
        >
          {/* Two-column Layout */}
          <div className="flex flex-col md:flex-row bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            {/* Left Column - Branding */}
            <div className="md:w-5/12 relative overflow-hidden bg-gradient-to-br from-indigo-600/90 via-purple-600/90 to-cyan-600/90">
              <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
              <div className="relative flex flex-col justify-between h-full p-8 md:p-12">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    <span className="text-white/90">Campus</span>Pulse
                  </h1>
                  <div className="w-16 h-1 bg-gradient-to-r from-orange-400 via-white to-cyan-400 rounded-full my-4"></div>
                  <p className="text-white/80 text-lg font-light mt-4">
                    Connect with your campus. Everything you need in one place.
                  </p>
                </div>

                <div className="hidden md:block mt-auto">
                  <div className="space-y-6">
                    {/* Feature 1 */}
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <FaUserGraduate className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">
                          Personalized Experience
                        </h3>
                        <p className="text-white/70 text-sm">
                          Tailored services and updates.
                        </p>
                      </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <FaIdCard className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">
                          Secure Access
                        </h3>
                        <p className="text-white/70 text-sm">
                          Your data is always protected.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-white/60 text-sm mt-8"></div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-gradient-to-r from-cyan-400/30 to-purple-400/30 blur-3xl -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-gradient-to-r from-orange-400/30 to-pink-400/30 blur-3xl -ml-32 -mb-32"></div>
            </div>

            {/* Right Column - Forms */}
            <div className="md:w-7/12 p-6 md:p-12 bg-white/5">
              <div className="flex justify-between">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {activeTab === "login" ? "Welcome Back" : "Create Account"}
                </h2>

                <div className="inline-flex bg-white/10 backdrop-blur-md p-1 rounded-lg">
                  <button
                    className={`py-1.5 px-3 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeTab === "login"
                        ? "bg-white text-indigo-700"
                        : "text-white hover:bg-white/10"
                    }`}
                    onClick={() => setActiveTab("login")}
                  >
                    <span className="hidden md:inline">Sign In</span>
                    <span className="md:hidden">Login</span>
                  </button>
                  <button
                    className={`py-1.5 px-3 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeTab === "signup"
                        ? "bg-white text-indigo-700"
                        : "text-white hover:bg-white/10"
                    }`}
                    onClick={() => setActiveTab("signup")}
                  >
                    <span className="hidden md:inline">Create Account</span>
                    <span className="md:hidden">Sign Up</span>
                  </button>
                </div>
              </div>

              {activeTab === "login" && (
                <div className="mt-4 flex">
                  <button
                    onClick={() => setIsVendor(false)}
                    className={`flex-1 py-2 text-center text-sm font-medium rounded-l-lg transition-all duration-200 ${
                      !isVendor
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    <FaUserGraduate className="inline-block mr-1" /> Student
                  </button>
                  <button
                    onClick={() => setIsVendor(true)}
                    className={`flex-1 py-2 text-center text-sm font-medium rounded-r-lg transition-all duration-200 ${
                      isVendor
                        ? "bg-primary text-white"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    <FaUtensils className="inline-block mr-1" /> Vendor
                  </button>
                </div>
              )}

              <div className="mt-8">
                {activeTab === "login" ? (
                  <form onSubmit={handleLoginSubmit} className="space-y-5">
                    {!isVendor ? (
                      // Student Login Form
                      <>
                        <div className="space-y-2">
                          <label className="flex text-sm font-medium text-white/90 mb-1 ml-1">
                            Roll Number
                          </label>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all">
                              <FaIdCard className="text-indigo-400 group-focus-within:text-indigo-300" />
                            </div>
                            <input
                              type="text"
                              name="rollNumber"
                              required
                              placeholder="Enter your roll number"
                              value={loginForm.rollNumber}
                              onChange={handleLoginChange}
                              className="w-full pl-12 pr-4 py-3.5 bg-white/10 border-0 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder-white/50"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-sm font-medium text-white/90 ml-1">
                              Password
                            </label>
                            <a
                              href="#"
                              className="text-xs text-indigo-300 hover:text-white transition-colors"
                            >
                              Forgot password?
                            </a>
                          </div>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <FaLock className="text-indigo-400 group-focus-within:text-indigo-300" />
                            </div>
                            <input
                              type="password"
                              name="password"
                              required
                              placeholder="Enter your password"
                              value={loginForm.password}
                              onChange={handleLoginChange}
                              className="w-full pl-12 pr-4 py-3.5 bg-white/10 border-0 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder-white/50"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      // Vendor Login Form
                      <>
                        <div className="space-y-2">
                          <label className="flex text-sm font-medium text-white/90 mb-1 ml-1">
                            Vendor ID
                          </label>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all">
                              <FaIdCard className="text-primary group-focus-within:text-orange-300" />
                            </div>
                            <input
                              type="text"
                              name="vendorId"
                              required
                              placeholder="Enter your vendor ID"
                              value={vendorLoginForm.vendorId}
                              onChange={handleVendorLoginChange}
                              className="w-full pl-12 pr-4 py-3.5 bg-white/10 border-0 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder-white/50"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-sm font-medium text-white/90 ml-1">
                              Password
                            </label>
                            <a
                              href="#"
                              className="text-xs text-orange-300 hover:text-white transition-colors"
                            >
                              Forgot password?
                            </a>
                          </div>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <FaLock className="text-primary group-focus-within:text-orange-300" />
                            </div>
                            <input
                              type="password"
                              name="password"
                              required
                              placeholder="Enter your password"
                              value={vendorLoginForm.password}
                              onChange={handleVendorLoginChange}
                              className="w-full pl-12 pr-4 py-3.5 bg-white/10 border-0 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder-white/50"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 bg-white/10 border-white/30 rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-white/80"
                      >
                        Remember me
                      </label>
                    </div>

                    <button
                      type="submit"
                      className={`w-full py-3.5 px-4 flex items-center justify-center rounded-xl text-sm font-semibold text-white transition-all duration-200 group ${
                        isVendor
                          ? "bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary shadow-lg shadow-primary/30"
                          : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-600/30"
                      }`}
                    >
                      <span>
                        {isVendor
                          ? "Access Vendor Dashboard"
                          : "Sign In to Dashboard"}
                      </span>
                      <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleSignupSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="flex text-sm font-medium text-white/90 mb-1 ml-1">
                        Full Name
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <FaUserGraduate className="text-indigo-400 group-focus-within:text-indigo-300" />
                        </div>
                        <input
                          type="text"
                          name="fullName"
                          required
                          placeholder="Enter your full name"
                          value={signupForm.fullName}
                          onChange={handleSignupChange}
                          className="w-full pl-12 pr-4 py-3.5 bg-white/10 border-0 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder-white/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="flex text-sm font-medium text-white/90 mb-1 ml-1">
                        Email
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <FaEnvelope className="text-indigo-400 group-focus-within:text-indigo-300" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="Enter your email"
                          value={signupForm.email}
                          onChange={handleSignupChange}
                          className="w-full pl-12 pr-4 py-3.5 bg-white/10 border-0 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder-white/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="flex text-sm font-medium text-white/90 mb-1 ml-1">
                        Roll Number
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <FaIdCard className="text-indigo-400 group-focus-within:text-indigo-300" />
                        </div>
                        <input
                          type="text"
                          name="rollNumber"
                          required
                          placeholder="Enter your roll number"
                          value={signupForm.rollNumber}
                          onChange={handleSignupChange}
                          className="w-full pl-12 pr-4 py-3.5 bg-white/10 border-0 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder-white/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="flex text-sm font-medium text-white/90 mb-1 ml-1">
                        Password
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <FaLock className="text-indigo-400 group-focus-within:text-indigo-300" />
                        </div>
                        <input
                          type="password"
                          name="password"
                          required
                          placeholder="Create a password"
                          value={signupForm.password}
                          onChange={handleSignupChange}
                          className="w-full pl-12 pr-4 py-3.5 bg-white/10 border-0 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder-white/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="flex text-sm font-medium text-white/90 mb-1 ml-1">
                        Confirm Password
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <FaLock className="text-indigo-400 group-focus-within:text-indigo-300" />
                        </div>
                        <input
                          type="password"
                          name="confirmPassword"
                          required
                          placeholder="Confirm your password"
                          value={signupForm.confirmPassword}
                          onChange={handleSignupChange}
                          className="w-full pl-12 pr-4 py-3.5 bg-white/10 border-0 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder-white/50"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 flex items-center justify-center rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg shadow-blue-600/30 transition-all duration-200 group"
                    >
                      <span>Create Your Account</span>
                      <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                )}

                {/* Social logins */}
                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-slate-800/80 text-white/50 backdrop-blur-lg">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <button
                      type="button"
                      className="flex items-center justify-center py-3 px-4 bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-xl text-white text-sm font-medium transition-colors border border-white/5"
                    >
                      <svg
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                          <path
                            fill="#4285F4"
                            d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                          />
                          <path
                            fill="#34A853"
                            d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                          />
                          <path
                            fill="#EA4335"
                            d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                          />
                        </g>
                      </svg>
                      Google
                    </button>

                    <button
                      type="button"
                      className="flex items-center justify-center py-3 px-4 bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-xl text-white text-sm font-medium transition-colors border border-white/5"
                    >
                      <svg
                        className="h-5 w-5 mr-2 text-[#1DA1F2]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                      Twitter
                    </button>
                  </div>

                  {/* Guest Access */}
                  <div className="mt-8 text-center">
                    <button
                      onClick={handleGuestLogin}
                      className="inline-flex items-center text-indigo-300 hover:text-white transition-colors"
                    >
                      <FaHome className="mr-2" />
                      <span>Continue as Guest</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center text-sm text-white/60">
            <div className="space-x-4">
              <a href="#" className="hover:text-white/90 transition-colors">
                Terms of Service
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white/90 transition-colors">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white/90 transition-colors">
                Help Center
              </a>
            </div>

            {/* Team Credit */}
            <div className="mt-4 flex items-center justify-center">
              <span>Crafted with</span>
              <FaHeart className="mx-1 text-pink-500 animate-pulse" />
              <span>
                by{" "}
                <span className="font-medium text-indigo-300">
                  Team Moye Moye
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
