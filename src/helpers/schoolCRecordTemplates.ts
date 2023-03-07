import axios from "axios";
import { IAuthProps } from "./auth";
// schools/{id}/save-course-record-template

interface ISaveCRTemplateProps extends IAuthProps {
  title: string;
  breakDown: {
    name: string;
    value: string;
  }[];
  isActive?: boolean;
  crtId?: string;
  schoolId: string;
}
export const saveSchoolCRTemplate = (props: ISaveCRTemplateProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/schools/${props.schoolId}/save-course-record-template`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };
  let data = props;

  const res: any = axios.post(url, data, config);
  return res;
};
export interface ISetupSchoolSessCRT extends IAuthProps {
  schoolId: string;
  templateId: string;
  sessionId: string;
}
export const setupSchoolSessionCRTemplate = (props: ISetupSchoolSessCRT) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/schools/${props.schoolId}/setup-session-course-record-template`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };
  let data = props;

  const res: any = axios.post(url, data, config);
  return res;
};
interface IGetCRTProps extends IAuthProps {
  id: string;
}
export const getCRTemplate = (props: IGetCRTProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/course-record-templates/${props.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res: any = axios.get(url, config);
  return res;
};

export interface IGetCRTsProps extends IAuthProps {
  schoolId: string;
}
export const getCRTemplates = (props: IGetCRTsProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/schools/${props.schoolId}/course-record-templates`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res: any = axios.get(url, config);
  return res;
};
