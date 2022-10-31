import axios from "axios";
import { IAuthProps } from "./auth";

interface ICSUProps extends IAuthProps {
  schoolId: string;
  userId: string;
}

export const updateChoosenSchool = (props: ICSUProps) => {
  const { token } = props;
  const url = `${process.env.REACT_APP_APP_URL}/api/users/${props.userId}/update-choosenSchool`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const data = {
    schoolId: props.schoolId,
  };

  const res: any = axios.post(url, data, config);
  return res;
};
interface ICSURProps extends ICSUProps {
  role: string;
}
export const updateUserChoosenRoleInSchool = (props: ICSURProps) => {
  const { token } = props;
  const url = `${process.env.REACT_APP_APP_URL}/api/users/${props.userId}/update-user_rolein-school`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const data = {
    schoolId: props.schoolId,
    role: props.role,
  };

  const res: any = axios.post(url, data, config);
  return res;
};
interface IRetrieveProps extends IAuthProps {
  userId: string;
}
export const retrieveUser = ({ token, userId }: IRetrieveProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/users/${userId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res: any = axios.get(url, config);
  return res;
};
