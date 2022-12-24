import { routes } from "../../routes";
import AuthLayout from "./AuthLayout";
import LoginForm from "./LoginForm";

const LoginWrapper = () => {
  return (
    <AuthLayout
      alternativeAction={{
        text: "Sign Up",
        link: routes.registerSchool,
        promptText: "Don't have an account!",
      }}
      heading="Login"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginWrapper;
