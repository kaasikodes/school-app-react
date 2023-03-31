import RegisterSchoolForm from "./RegisterSchoolForm";

import AuthLayout from "./AuthLayout";
import { routes } from "../../routes";
import { useState } from "react";
import { SelectRegistrationType } from "./SelectRegistrationType";
import { RegisterStaffForm } from "./RegisterStaffForm";

const RegisterSchoolWrapper = () => {
  const [userType, setUserType] = useState<
    "admin" | "staff" | "custodian" | "student"
  >();
  const handleFin = (data: any) => {
    setUserType(data.userType);
  };
  return (
    <>
      <AuthLayout
        alternativeAction={{
          text: "Sign in",
          link: routes.login,
          promptText: "Already have an account!",
        }}
        heading="Create School Account"
      >
        {userType === undefined && (
          <SelectRegistrationType handleFin={handleFin} />
        )}
        {userType === "admin" && (
          <RegisterSchoolForm goBack={() => setUserType(undefined)} />
        )}
        {userType === "staff" && (
          <RegisterStaffForm goBack={() => setUserType(undefined)} />
        )}
      </AuthLayout>
    </>
  );
};

export default RegisterSchoolWrapper;
