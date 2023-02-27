import RegisterSchoolForm from "./RegisterSchoolForm";

import AuthLayout from "./AuthLayout";
import { routes } from "../../routes";

const RegisterSchoolWrapper = () => {
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
        <RegisterSchoolForm />
      </AuthLayout>
    </>
  );
};

export default RegisterSchoolWrapper;
