import axios from "axios";

const token = JSON.parse(
  localStorage.getItem("cpaat_auth") as unknown as string
);

interface ICreateProps {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  address: string;
  password: string;
}

export const createEstateOwner = async (props: ICreateProps) => {
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
