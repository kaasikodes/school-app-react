import { useEffect } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import LoginWrapper from "../components/auth/LoginWrapper";

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
  }, [isAuthenticated, navigate]);

  return (
    <>
      <LoginWrapper />
    </>
  );
};

export default Login;
