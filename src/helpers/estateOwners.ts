import axios from "axios";

const token = localStorage.getItem("cpaat_auth") as unknown as string;

// const token = "red";
// console.log(localStorage.getItem("cpaat_auth"), "POPIPO");

export interface ICreateProps {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  address: string;
  password: string;
}

export const addEstateOwner = async (props: ICreateProps) => {
  const url = `${process.env.REACT_APP_BASE_URL}/estate-owner`;

  const data = props;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(url, data, config);
  return response;
};
interface IEditProps {
  ownerId: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  gender?: string;
  address?: string;
  password?: string;
}

export const updateEstateOwner = async (props: IEditProps) => {
  const url = `${process.env.REACT_APP_BASE_URL}/estate-owner/${props.ownerId}`;

  const data = props;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.patch(url, data, config);
  return response;
};
interface IGetProps {
  limit?: string;
  offset?: string;
}
export const getEstateOwners = async ({
  limit = "",
  offset = "",
}: IGetProps) => {
  const url = `${process.env.REACT_APP_BASE_URL}/estate-owner?limit=${limit}&offset=${offset}`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(url, config);
  return response;
};
interface ISingleGetProps {
  ownerId: string;
}
export const getEstateOwner = async ({ ownerId }: ISingleGetProps) => {
  const url = `${process.env.REACT_APP_BASE_URL}/estate-owner/${ownerId}`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(url, config);
  return response;
};
