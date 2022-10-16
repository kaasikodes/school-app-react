import axios from "axios";

interface ILoginProps {
  email: string;
  password: string;
}
export const loginUser = async ({ email, password }: ILoginProps) => {
  const url = `${process.env.REACT_APP_BASE_URL}/auth/cpaat-admin/login`;

  const data = {
    email,
    password,
  };

  const response = await axios.post(url, data);
  return response;
};
