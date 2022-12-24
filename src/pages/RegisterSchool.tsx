import { useIsAuthenticated } from "react-auth-kit";
import { Navigate } from "react-router-dom";
import RegisterSchoolWrapper from "../components/auth/RegisterSchoolWrapper";
import { routes } from "../routes";

const RegisterSchool = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      {isAuthenticated() && <Navigate to={routes.index} replace={true} />}

      <RegisterSchoolWrapper />
    </>
  );
};

export default RegisterSchool;
