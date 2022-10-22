import axios from "axios";

const token = localStorage.getItem("cpaat_auth") as unknown as string;

export interface ICreateStaffProps {
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  homeAddress: string;
  suffix: string;
  prefix: string;
  role: string;
  middleName: string;
  accessLevel?: string;
  photo?: any;
  estateId: string;
}

export const createStaff = (props: ICreateStaffProps) => {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/staff`;
  const estateId = props.estateId;

  const data = {
    email: props.email,
    estate: [
      {
        estateId: estateId,
        prefix: props.prefix,
        firstName: props.firstName,
        middleName: props.middleName,
        lastName: props.lastName,
        suffix: props.suffix,
        phoneNumber: props.phoneNumber,
        gender: props.gender,
        homeAddress: props.homeAddress,
        role: props.role,
        accessLevel: props.accessLevel,
        photo: props.photo,
      },
    ],
  };
  let formData = new FormData();
  formData.append("photo", props.photo?.originFileObj);
  formData.append("email", data.email);
  formData.append("estate[0]", JSON.stringify(data.estate[0]));
  // formData.append("estate", data.estate);
  formData.append("estate[0].estateId", data.estate[0].estateId);
  formData.append("estate[0].firstName", data.estate[0].firstName);
  formData.append("estate[0].lastName", data.estate[0].lastName);
  formData.append("estate[0].middleName", data.estate[0].middleName);
  formData.append("estate[0].prefix", data.estate[0].prefix);
  formData.append("estate[0].suffix", data.estate[0].suffix);
  formData.append("estate[0].phoneNumber", data.estate[0].phoneNumber);
  formData.append("estate[0].gender", data.estate[0].gender);
  formData.append("estate[0].homeAddress", data.estate[0].homeAddress);
  formData.append("estate[0].role", data.estate[0].role);
  data.estate[0].accessLevel &&
    formData.append("estate[0].accessLevel", data.estate[0].accessLevel);
  // formData.append("estate[0].photo", data.estate[0].photo?.originFileObj);

  const config = {
    headers: {
      estateId: estateId,
      Authorization: `Bearer ${token}`,
    },
  };

  // if (formData){
  const res: any = axios.post(url, formData, config);
  return res;

  // }
  // const res:any = axios.post(url, data, config)
  // return res;
};

interface IUpdateStaffProps {
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  phoneNumber?: string;
  homeAddress?: string;
  suffix?: string;
  prefix?: string;
  role?: string;
  middleName?: string;
  accessLevel?: string;
  isActive?: boolean;
  staffId: string;
  photo?: any;
  estateId: string;
}

export const updateStaff = (props: IUpdateStaffProps) => {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/staff/${props.staffId}`;
  const estateId = props.estateId;

  const data = { ...props };

  const config = {
    headers: {
      estateId: estateId,
      Authorization: `Bearer ${token}`,
    },
  };
  let formData = new FormData();
  formData.append("photo", props.photo?.originFileObj);
  // formData.append("estate[0]", JSON.stringify(data.estate[0]));
  // formData.append("estate", data.estate);
  formData.append("firstName", data.firstName as string);
  formData.append("lastName", data.lastName as string);
  formData.append("middleName", data.middleName as string);
  formData.append("prefix", data.prefix as string);
  formData.append("suffix", data.suffix as string);
  formData.append("phoneNumber", data.phoneNumber as string);
  formData.append("gender", data.gender as string);
  formData.append("homeAddress", data.homeAddress as string);
  formData.append("role", data.role as string);
  data.accessLevel &&
    formData.append("estate[0].accessLevel", data.accessLevel);

  const res: any = axios.patch(url, formData, config);
  return res;
};

interface IGetSingleProps {
  estateId: string;
  staffId: string;
}

export const getOneStaff = ({ staffId, estateId }: IGetSingleProps) => {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/staff/${staffId}`;
  const config = {
    headers: {
      estateId: estateId,
      Authorization: `Bearer ${token}`,
    },
  };

  const res: any = axios.get(url, config);
  return res;
};

// refactor
interface IPaginationProps {
  limit?: string;
  offset?: string;
}
interface IGetProps {
  query?: string;
  pagProps?: IPaginationProps;
  searchQuery?: string;
  timeQuery?: string;
  estateId: string;
}
export const getOneEstateStaff = ({
  pagProps,
  searchQuery,
  timeQuery,
  estateId,
  query,
}: IGetProps) => {
  const limit = pagProps?.limit ?? 10;
  const offset = pagProps?.offset ?? 0;

  const url = `${process.env.REACT_APP_BASE_URL}/staff/estate/${estateId}?limit=${limit}&offset=${offset}
      `;
  const config = {
    headers: {
      estateId: estateId,
      Authorization: `Bearer ${token}`,
    },
  };

  const res: any = axios.get(url, config);
  return res;
};
