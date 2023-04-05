import axios from "axios";
import { TUserType } from "../helpersAPIHooks/invites/useCreateSingleInvitation";
axios.defaults.withCredentials = true;

export interface IAuthProps {
  token: string;
}
export const setCSRFToken = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_APP_URL}/sanctum/csrf-cookie`
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

interface ISignupProps {
  name: string;
  email: string;
  password: string;
}

export const signupUser = async (props: ISignupProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/register`;

  const data = {
    email: props.email,
    password: props.password,
    name: props.name,
  };

  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  await setCSRFToken();
  const res: any = axios.post(url, data, config);
  return res;
};
interface ILoginProps {
  email: string;
  password: string;
}
interface IRegisterThruInviteProps {
  email: string;
  inviteCode: string;
  userType: TUserType;
  schoolId: number;
  sessionId?: number;
  userName?: string;
}

export const registerUserThroughInvitation = async (
  props: IRegisterThruInviteProps
) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/register/${props.schoolId}/user-type`;

  const data = {
    email: props.email,
    inviteCode: props.inviteCode,
    sessionId: props.sessionId,
    userType: props.userType,
    userName: props.userName,
  };

  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  await setCSRFToken();
  const res: any = await axios.post(url, data, config);
  return res;
};
export const loginUser = async (props: ILoginProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/login`;

  const data = {
    email: props.email,
    password: props.password,
  };

  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  await setCSRFToken();
  const res: any = await axios.post(url, data, config);
  return res;
};
interface ILProps extends IAuthProps {
  id: string;
}
export const logoutUser = ({ token, id }: ILProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/logout/${id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // await setCSRFToken();
  const res: any = axios.get(url, config);
  return res;
};

export interface IRegSchoolProps {
  userFullName: string;
  userEmail: string;
  userPhone: string;
  schoolName: string;
  password: string;
}
export const registerSchool = async (props: IRegSchoolProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/schools/register-school`;

  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  const data = {
    ...props,
  };

  await setCSRFToken();
  const res: any = axios.post(url, data, config);
  return res;
};
