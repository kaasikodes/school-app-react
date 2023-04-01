import RegisterSchoolForm from "./RegisterSchoolForm";

import AuthLayout from "./AuthLayout";
import { routes } from "../../routes";
import { useState } from "react";
import { SelectRegistrationType } from "./SelectRegistrationType";
import { RegisterStaffForm } from "./RegisterStaffForm";
import { RegisterCustodianForm } from "./RegisterCustodianForm";

type TUserType = "admin" | "staff" | "custodian" | "student";

const RegisterSchoolWrapper = () => {
  const [userType, setUserType] = useState<TUserType>();
  const handleFin = (data: any) => {
    setUserType(data.userType);
  };
  const headingText = (val?: TUserType): string => {
    let text = "Create Account";
    switch (val) {
      case "admin":
        text = "Create School Account";

        break;
      case "staff":
        text = "Create Staff Account";

        break;
      case "custodian":
        text = "Create Custodian Account";

        break;
      case "student":
        text = "Create Student Account";

        break;

      default:
        break;
    }
    return text;
  };
  return (
    <>
      <AuthLayout
        alternativeAction={{
          text: "Sign in",
          link: routes.login,
          promptText: "Already have an account!",
        }}
        heading={headingText(userType)}
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
        {userType === "custodian" && (
          <RegisterCustodianForm goBack={() => setUserType(undefined)} />
        )}
        {userType === "student" && (
          <RegisterStaffForm goBack={() => setUserType(undefined)} />
        )}
      </AuthLayout>
    </>
  );
};

export default RegisterSchoolWrapper;
