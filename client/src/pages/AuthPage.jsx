import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MdEmail,
  MdLock,
  MdPerson,
  MdVisibility,
  MdVisibilityOff,
  MdCheckCircle,
  MdCancel,
  MdBusiness,
  MdSchool,
  MdArrowBack,
} from "react-icons/md";
import { FaGoogle } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import { toast } from "sonner";
import { useEffect } from "react";

const AuthPage = () => {
  const navigate = useNavigate();
  const { register, login, user, loading: appLoading } = useAppContext();
  const [userType, setUserType] = useState(null); // null, "student", or "company"
  const [isLogin, setIsLogin] = useState(true);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!appLoading && user) {
      // User is already logged in, redirect to appropriate dashboard
      if (user.userType === "student") {
        navigate("/student/dashboard");
      } else if (user.userType === "company") {
        navigate("/company/dashboard");
      } else {
        // Fallback to home if userType is not set
        navigate("/");
      }
    }
  }, [user, appLoading, navigate]);

  // Password strength states
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  // Password strength check function
  const checkPasswordStrength = (pass) => {
    setPasswordStrength({
      length: pass.length >= 8,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      number: /[0-9]/.test(pass),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
    });
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  // Calculate password strength percentage
  const getPasswordStrengthPercentage = () => {
    const requirements = Object.values(passwordStrength);
    const metCount = requirements.filter(Boolean).length;
    return (metCount / requirements.length) * 100;
  };

  // Get password strength color and message
  const getPasswordStrengthInfo = () => {
    const percentage = getPasswordStrengthPercentage();
    if (percentage === 100)
      return {
        color: "bg-green-500",
        message: "Strong password",
        textColor: "text-green-600",
      };
    if (percentage >= 60)
      return {
        color: "bg-yellow-500",
        message: "Medium password",
        textColor: "text-yellow-600",
      };
    return {
      color: "bg-red-500",
      message: "Weak password",
      textColor: "text-red-600",
    };
  };

  const strengthInfo = getPasswordStrengthInfo();

  // Handle Google Sign In
  const handleGoogleSignIn = () => {
    console.log(`Google Sign In clicked as ${userType}`);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate passwords match for signup
    if (!isLogin && password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const userData = {
        userType,
        email,
        password,
        ...(userType === "student" ? { name } : { companyName }),
      };

      let result;
      if (isLogin) {
        result = await login({ email, password });
        console.log("Login result:", result);
      } else {
        result = await register(userData);
        console.log("Register result:", result);
      }

      if (result?.data?.success) {
        toast.success(isLogin ? result.data.message : result.data.message);
        // Redirect based on user type
        if (userType === "student") {
          navigate("/student/dashboard");
        } else {
          navigate("/company/dashboard");
        }
      } else {
        toast.error(result?.error?.message || "Authentication failed");
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast.error(error.message || "An error occurred during authentication");
    } finally {
      setLoading(false);
    }
  };

  // Reset and go back to user type selection
  const goBackToUserType = () => {
    setUserType(null);
    setShowEmailForm(false);
    setEmail("");
    setPassword("");
    setName("");
    setCompanyName("");
  };

  // If no user type selected, show selection screen
  if (!userType) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="text-3xl font-bold text-gray-900">
              InternshipHub
            </Link>
            <h2 className="mt-6 text-2xl font-bold text-gray-900">Welcome!</h2>
            <p className="mt-2 text-sm text-gray-600">
              Choose your account type to continue
            </p>
          </div>

          {/* User Type Selection Card */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="space-y-4">
              {/* Student Option */}
              <button
                onClick={() => setUserType("student")}
                className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-gray-500 hover:bg-blue-50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-gray-200">
                    <MdSchool size={24} className="text-gray-900" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Student
                    </h3>
                    <p className="text-sm text-gray-600">
                      Looking for internships or attachments
                    </p>
                  </div>
                </div>
              </button>

              {/* Company Option */}
              <button
                onClick={() => setUserType("company")}
                className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-gray-900 hover:bg-blue-50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-gray-200">
                    <MdBusiness size={24} className="text-gray-900" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Company
                    </h3>
                    <p className="text-sm text-gray-600">
                      Post internship opportunities
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* Already have account */}
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => {
                  setUserType("student"); // Default to student for login
                  setIsLogin(true);
                }}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Main Auth Card (after user type selected)
  return (
    <div className="min-h-screen mt-6 bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <button
          onClick={goBackToUserType}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <MdArrowBack size={20} className="mr-1" />
          Change account type
        </button>

        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-gray-900">
            InternshipHub
          </Link>

          {/* User Type Badge */}
          <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
            {userType === "student" ? (
              <>
                <MdSchool className="text-blue-600" size={18} />
                <span className="text-sm font-medium text-blue-700">
                  Signing in as Student
                </span>
              </>
            ) : (
              <>
                <MdBusiness className="text-purple-600" size={18} />
                <span className="text-sm font-medium text-purple-700">
                  Signing in as Company
                </span>
              </>
            )}
          </div>

          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            {isLogin ? "Welcome back!" : `Create your ${userType} account`}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setShowEmailForm(false);
                setEmail("");
                setPassword("");
                setName("");
                setCompanyName("");
              }}
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        {/* Main Auth Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Google Sign In Button - Shows user type context */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors mb-4"
          >
            <FaGoogle size={20} className="text-red-500" />
            Continue with Google as{" "}
            {userType === "student" ? "Student" : "Company"}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Email Option Button */}
          {!showEmailForm ? (
            <button
              onClick={() => setShowEmailForm(true)}
              className="w-full flex items-center justify-center gap-3 bg-gray-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-gray-700 transition-colors"
            >
              <MdEmail size={20} />
              Continue with Email
            </button>
          ) : (
            /* Email/Password Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name/Company Name Field - Only for Sign Up */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {userType === "student" ? "Full Name" : "Company Name"}
                  </label>
                  <div className="relative">
                    {userType === "student" ? (
                      <MdPerson
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                    ) : (
                      <MdBusiness
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                    )}
                    <input
                      type="text"
                      value={userType === "student" ? name : companyName}
                      onChange={(e) => {
                        if (userType === "student") {
                          setName(e.target.value);
                        } else {
                          setCompanyName(e.target.value);
                        }
                      }}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={
                        userType === "student" ? "Your name" : "Your company"
                      }
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <MdEmail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={
                      userType === "student"
                        ? "you@student.com"
                        : "company@example.com"
                    }
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <MdLock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <MdVisibilityOff size={18} />
                    ) : (
                      <MdVisibility size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Password Strength Check - Only for Sign Up */}
              {!isLogin && password && (
                <div className="space-y-3">
                  {/* Strength Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className={strengthInfo.textColor}>
                        {strengthInfo.message}
                      </span>
                      <span className="text-gray-500">
                        {Object.values(passwordStrength).filter(Boolean).length}
                        /5
                      </span>
                    </div>
                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${strengthInfo.color} transition-all duration-300`}
                        style={{ width: `${getPasswordStrengthPercentage()}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Requirements Checklist */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div
                      className={`flex items-center ${passwordStrength.length ? "text-green-600" : "text-gray-400"}`}
                    >
                      {passwordStrength.length ? (
                        <MdCheckCircle className="mr-1" size={14} />
                      ) : (
                        <MdCancel className="mr-1" size={14} />
                      )}
                      At least 8 characters
                    </div>
                    <div
                      className={`flex items-center ${passwordStrength.uppercase ? "text-green-600" : "text-gray-400"}`}
                    >
                      {passwordStrength.uppercase ? (
                        <MdCheckCircle className="mr-1" size={14} />
                      ) : (
                        <MdCancel className="mr-1" size={14} />
                      )}
                      Uppercase letter
                    </div>
                    <div
                      className={`flex items-center ${passwordStrength.lowercase ? "text-green-600" : "text-gray-400"}`}
                    >
                      {passwordStrength.lowercase ? (
                        <MdCheckCircle className="mr-1" size={14} />
                      ) : (
                        <MdCancel className="mr-1" size={14} />
                      )}
                      Lowercase letter
                    </div>
                    <div
                      className={`flex items-center ${passwordStrength.number ? "text-green-600" : "text-gray-400"}`}
                    >
                      {passwordStrength.number ? (
                        <MdCheckCircle className="mr-1" size={14} />
                      ) : (
                        <MdCancel className="mr-1" size={14} />
                      )}
                      Number
                    </div>
                    <div
                      className={`flex items-center col-span-2 ${passwordStrength.special ? "text-green-600" : "text-gray-400"}`}
                    >
                      {passwordStrength.special ? (
                        <MdCheckCircle className="mr-1" size={14} />
                      ) : (
                        <MdCancel className="mr-1" size={14} />
                      )}
                      Special character (!@#$%^&*)
                    </div>
                  </div>
                </div>
              )}

              {/* Confirm Password - Only for Sign Up */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <MdLock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="••••••••"
                      required={!isLogin}
                    />
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <p className="mt-1 text-xs text-red-600">
                      Passwords do not match
                    </p>
                  )}
                </div>
              )}

              {/* Forgot Password - Only for Login */}
              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || (!isLogin && password !== confirmPassword)}
                className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Processing..."
                  : isLogin
                    ? "Sign In"
                    : `Create ${userType === "student" ? "Student" : "Company"} Account`}
              </button>

              {/* Back to email options */}
              <button
                type="button"
                onClick={() => setShowEmailForm(false)}
                className="w-full text-sm text-gray-500 hover:text-gray-700"
              >
                ← Back to all options
              </button>
            </form>
          )}
        </div>

        {/* Terms and Privacy */}
        <p className="mt-4 text-center text-xs text-gray-500">
          By continuing, you agree to our{" "}
          <Link to="/terms" className="text-blue-600 hover:text-blue-500">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
