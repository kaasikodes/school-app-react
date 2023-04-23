import axios from "axios";

import { useQuery } from "react-query";

export interface IGetUserByEmail {
  email: string | null;
}

type TAppUser = {
  id: number;
  name: string;
  email: string;
  photo?: string;
  // schoools -> role in school and all
};

export const getUserByEmail = async ({
  email,
}: IGetUserByEmail): Promise<TAppUser> => {
  let url = `${process.env.REACT_APP_APP_URL}/api/user-by-email`;

  const config = {
    headers: {
      Accept: "application/json",
      // Authorization: `Bearer ${token}`,
    },
    params: {
      email,
    },
  };

  const res: any = await axios.get(url, config);
  const data = res.data;

  return {
    id: data.user.id,
    email: data.user.email,
    name: data.user.name,
    photo: data.user?.profile_photo_path ?? data.user?.profile_photo_url,
  };
};

export const useGetUserByEmail = (props: IGetUserByEmail) => {
  // as per user Type and as per session
  return useQuery(
    ["user-by-email", props.email],
    () => getUserByEmail({ ...props }),
    {
      enabled: !!props.email,
    }
  );
};
