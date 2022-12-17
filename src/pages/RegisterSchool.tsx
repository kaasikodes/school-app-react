import { useEffect } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { Navigate, useNavigate } from "react-router-dom";
import LoginWrapper from "../components/auth/LoginWrapper";
import RegisterSchoolForm from "../components/auth/ORegisterSchoolForm";
import RegisterSchoolWrapper from "../components/auth/RegisterSchoolWrapper";

const RegisterSchool = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      {isAuthenticated() && <Navigate to="/" replace={true} />}

      <RegisterSchoolWrapper />
    </>
  );
};

export default RegisterSchool;
