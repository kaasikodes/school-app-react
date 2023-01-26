import axios from "axios";
import { IPaginationProps, ISearchParams } from "../appTypes/requestParams";
import { IAuthProps } from "./auth";

export interface ICustAuthProps extends IAuthProps {
  schoolId: string;
}

export interface ISaveCustProps extends ICustAuthProps {
  studentId: string;

  occupation: string;
  email: string;
  name: string;
  phone: string;
}
interface IGetMultipleCustProps extends ICustAuthProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}

export const getAllCustodians = ({
  token,
  schoolId,
  pagination,
  searchParams,
}: IGetMultipleCustProps) => {
  const limit = pagination?.limit ?? 10;
  const page = pagination?.page ?? 0;
  const name = searchParams?.name ?? "";

  let url = `${process.env.REACT_APP_APP_URL}/api/schools/${schoolId}/custodians`;

  if (pagination || searchParams) {
    url += "?";
  }
  if (pagination) {
    url += `limit=${limit}&page=${page}&`;
  }
  if (searchParams) {
    url += `searchTerm=${name}&`;
  }

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res: any = axios.get(url, config);
  return res;
};

interface IGetSingleStaffProps extends ICustAuthProps {
  custodianId: string;
  sessionId?: string;
}
export const getSingleCustodian = ({
  token,
  schoolId,
  custodianId,
  sessionId,
}: IGetSingleStaffProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/custodians/${custodianId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res: any = axios.get(url, config);
  return res;
};
export const saveSchoolCustodian = ({
  token,
  schoolId,
  studentId,

  email,
  name,
  occupation,
}: ISaveCustProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/custodians/save`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  let data: any = {
    studentId,
    schoolId,
    name,
    email,
    occupation,
  };

  const res: any = axios.post(url, data, config);
  return res;
};
