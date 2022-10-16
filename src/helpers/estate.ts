import axios from "axios";

const token = JSON.parse(
  localStorage.getItem("cpaat_auth") as unknown as string
);

interface IAddProps {
  estateOwnerId: string;
  name: string;
  description: string;
  location: string;
  nextRenewalDate: string;
  dependantFee: number;
  primaryResidentFee: number;
  accountNumber: string;
  bankCode: string;
  addGatePassApproval?: boolean;
}

export const addEstate = async (props: IAddProps) => {
  const url = `${process.env.REACT_APP_BASE_URL}/estate`;

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
  estateId: string;
  estateOwnerId?: string;
  name?: string;
  description?: string;
  location?: string;
  nextRenewalDate?: string;
  dependantFee?: number;
  primaryResidentFee?: number;
  accountNumber?: string;
  bankCode?: string;
  addGatePassApproval?: boolean;
}

export const updateEstate = async (props: IEditProps) => {
  const url = `${process.env.REACT_APP_BASE_URL}/estate/${props.estateId}`;

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
  status?: string;
  isDeleted?: string;
}
export const getEstates = async ({
  limit = "",
  offset = "",
  status = "",
  isDeleted = "",
}: IGetProps) => {
  const url = `${process.env.REACT_APP_BASE_URL}/estate?limit=${limit}&offset=${offset}&status=${status}&isDeleted=${isDeleted}`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(url, config);
  return response;
};

interface ISingleGetProps {
  estateId: string;
}
export const getEstate = async ({ estateId }: ISingleGetProps) => {
  const url = `${process.env.REACT_APP_BASE_URL}/estate/${estateId}`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(url, config);
  return response;
};
