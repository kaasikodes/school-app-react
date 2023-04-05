import RegisterSchoolForm from "./RegisterSchoolForm";

import AuthLayout from "./AuthLayout";
import { routes } from "../../routes";
import { useEffect, useState } from "react";
import { SelectRegistrationType } from "./SelectRegistrationType";
import { RegisterStaffForm } from "./RegisterStaffForm";
import { RegisterCustodianForm } from "./RegisterCustodianForm";
import { useSearchParams } from "react-router-dom";
import { RegisterStudentForm } from "./RegisterStudentForm";
import { useGetUserByEmail } from "../../helpersAPIHooks/users/useFetchSingleUser";
import { RegisterAdminForm } from "./RegisterAdminForm";

type TUserType = "admin" | "staff" | "custodian" | "student" | "school-owner";

export type TAutoDetail = {
  code: string;
  schoolId: number;
  email: string;
  sessionId: number;
  userName: string;
};

const RegisterSchoolWrapper = () => {
  const [searchParams] = useSearchParams();
  // check from backend if user exists with email, if he does populate name otherwise set to empty string
  const { data } = useGetUserByEmail({
    email: searchParams.get("email"),
  });

  const [userType, setUserType] = useState<TUserType>();
  const [autoDetails, setAutoDetails] = useState<TAutoDetail>();

  useEffect(() => {
    if (searchParams.get("type")) {
      setUserType(searchParams.get("type") as unknown as TUserType);
      setAutoDetails({
        code: searchParams.get("code") as unknown as string,
        email: searchParams.get("email") as unknown as string,
        schoolId: +(searchParams.get("schoolId") as unknown as string),
        sessionId: +(searchParams.get("schoolId") as unknown as string),
        userName: data?.name ?? "",
      });
    }
  }, [searchParams, data]);
  const handleFin = (data: any) => {
    setUserType(data.userType);
  };
  const headingText = (val?: TUserType): string => {
    let text = "Create Account";
    switch (val) {
      case "school-owner":
        text = "Create School Account";
        break;
      case "admin":
        text = "Create Administrator Account";

        break;

      case "staff":
        text = "Accept Staff Invitation";

        break;
      case "custodian":
        text = "Accept Custodian Invitation";

        break;
      case "student":
        text = "Accept Student Invitation";

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
        {userType === "school-owner" && (
          <RegisterSchoolForm goBack={() => setUserType(undefined)} />
        )}
        {userType === "admin" && (
          <RegisterAdminForm
            goBack={() => setUserType(undefined)}
            autoDetail={autoDetails}
          />
        )}
        {userType === "staff" && (
          <RegisterStaffForm
            goBack={() => setUserType(undefined)}
            autoDetail={autoDetails}
          />
        )}
        {userType === "custodian" && (
          <RegisterCustodianForm
            goBack={() => setUserType(undefined)}
            autoDetail={autoDetails}
          />
        )}
        {userType === "student" && (
          <RegisterStudentForm
            goBack={() => setUserType(undefined)}
            autoDetail={autoDetails}
          />
        )}
      </AuthLayout>
    </>
  );
};

export default RegisterSchoolWrapper;
