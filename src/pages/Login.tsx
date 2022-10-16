import { useEffect } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  useEffect(() => {
    if (isAuthenticated()) {
      // Redirect to Dashboard
      navigate("/");
    } else {
      // Redirect to Login
    }
  }, []);

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-gradient-to-br bg-slate-800">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md max-w-sm lg:max-w-lg">
        <div className="flex justify-center mb-6">
          <img src="/assets/brandlogo.png" className="object-contain h-8" />
        </div>
        <h1 className="text-3xl font-semibold text-center text-slate-500  mb-12">
          Welcome to Gatehouse,
        </h1>
        <LoginForm />
        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <a href="#" className="font-medium text-slate-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
