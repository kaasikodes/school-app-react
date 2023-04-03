import RegisterSchoolForm from "./RegisterSchoolForm";

import AuthLayout from "./AuthLayout";
import { routes } from "../../routes";
import { useEffect, useState } from "react";
import { SelectRegistrationType } from "./SelectRegistrationType";
import { RegisterStaffForm } from "./RegisterStaffForm";
import { RegisterCustodianForm } from "./RegisterCustodianForm";
import { useSearchParams } from "react-router-dom";

type TUserType = "admin" | "staff" | "custodian" | "student";

export type TAutoDetail = { code: string; schoolId: number; email: string };

const RegisterSchoolWrapper = () => {
  const [searchParams] = useSearchParams();

  const [userType, setUserType] = useState<TUserType>();
  const [autoDetails, setAutoDetails] = useState<TAutoDetail>();
  useEffect(() => {
    if (searchParams.get("type")) {
      setUserType(searchParams.get("type") as unknown as TUserType);
      setAutoDetails({
        code: searchParams.get("code") as unknown as string,
        email: searchParams.get("email") as unknown as string,
        schoolId: +(searchParams.get("schoolId") as unknown as string),
      });
    }
  }, [searchParams]);
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
          <RegisterCustodianForm
            goBack={() => setUserType(undefined)}
            autoDetail={autoDetails}
          />
        )}
        {userType === "student" && (
          <RegisterStaffForm goBack={() => setUserType(undefined)} />
        )}
      </AuthLayout>
    </>
  );
};

export default RegisterSchoolWrapper;
