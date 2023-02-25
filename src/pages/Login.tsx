import { useIsAuthenticated } from "react-auth-kit";
import { Navigate } from "react-router-dom";
import LoginWrapper from "../components/auth/LoginWrapper";
import { routes } from "../routes";

const Login = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      {isAuthenticated() && <Navigate to={routes.index} replace={true} />}
      <LoginWrapper />
    </>
  );
};

export default Login;
