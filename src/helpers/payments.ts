import axios from "axios";
import { IAuthProps } from "./auth";

export interface IPaymentCatAuthProps extends IAuthProps {
  schoolId: string;
}

export const getCurrencies = ({ token, schoolId }: IPaymentCatAuthProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/schools/${schoolId}/currencies`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res: any = axios.get(url, config);
  return res;
};
export const getPaymentCategories = ({
  token,
  schoolId,
}: IPaymentCatAuthProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/schools/${schoolId}/payment-categories`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res: any = axios.get(url, config);
  return res;
};
interface IGetLevelFees extends IPaymentCatAuthProps {
  sessionId: string;
}
export const getLevelFees = ({ token, schoolId, sessionId }: IGetLevelFees) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/schools/${schoolId}/level-fees?sessionId=${sessionId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res: any = axios.get(url, config);
  return res;
};
interface IGetStudentSessPaymentRecs extends IPaymentCatAuthProps {
  sessionId: string;
}
export const getStudentSessPaymentRecs = ({
  token,
  schoolId,
  sessionId,
}: IGetStudentSessPaymentRecs) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/schools/${schoolId}/student-payment-records?sessionId=${sessionId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res: any = axios.get(url, config);
  return res;
};

export interface ICreatePaymentCatProps extends IPaymentCatAuthProps {
  description?: string;
  name: string;
}
export const createPaymentCategory = (props: ICreatePaymentCatProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/payment-categories/create`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };
  let data = {
    name: props.name,
    description: props.description,
    schoolId: props.schoolId,
  };

  const res: any = axios.post(url, data, config);
  return res;
};

export interface ICreateClassFeeProps extends IPaymentCatAuthProps {
  levelId: string;
  sessionId: string;
  categoryId: string;
  docUrl: string;
  amount: number;
  inPart: boolean;
  currencyId: string;
}
export const createClassFee = (props: ICreateClassFeeProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/level-fees/create`;

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
