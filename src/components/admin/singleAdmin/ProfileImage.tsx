import { Avatar, Button, Skeleton } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useCurrentFileUploadUrl } from "../../../hooks/useCurrentFileUploadUrl";
import { FileUpload } from "../../files/FileUpload";
import { useUpdateProfilePhoto } from "../../../helpersAPIHooks/users/useUpdateProfilePhoto";
import { useQueryClient } from "react-query";
import useApiAuth from "../../../hooks/useApiAuth";
import { openNotification } from "../../../helpers/notifications";
import { useGetUserByEmail } from "../../../helpersAPIHooks/users/useFetchSingleUser";
import {
  EGlobalOps,
  GlobalContext,
} from "../../../contexts/GlobalContextProvider";

export const ProfileImage = () => {
  const [edit, setEdit] = useState(false);
  const queryClient = useQueryClient();
  const { userId, userEmail } = useApiAuth();
  const { data: user } = useGetUserByEmail({ email: userEmail });
  const { dispatch } = useContext(GlobalContext);
  const FILE_KEY = "photo";
  const photo = useCurrentFileUploadUrl(FILE_KEY);
  const { mutate, isLoading } = useUpdateProfilePhoto();
  useEffect(() => {
    if (photo) {
      mutate(
        {
          photo,
          userId,
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occurred",
              description:
                err?.response.data.message ?? err?.response.data.error.message,
            });
          },
          onSuccess: (res: any) => {
            // const result = res.data.data;
            console.log("BULK", res);

            openNotification({
              state: "success",

              title: "Success",
              description: res.data.message,
              // duration: 0.4,
            });
            setEdit(false);
            // delete the file string from context
            dispatch({
              type: EGlobalOps.setUploadFileString,
              payload: { value: "", key: FILE_KEY },
            });

            queryClient.invalidateQueries({
              queryKey: ["user-by-email"],
              // exact: true,
            });
          },
        }
      );
    }
  }, [photo, userId, dispatch, queryClient, mutate]);
  return (
    <>
      <Button
        icon={<MdOutlineModeEditOutline />}
        onClick={() => setEdit((val) => !val)}
        type="text"
      />
      {edit ? (
        <div>
          <FileUpload
            allowedFileTypes={["image/jpeg", "image/jpg", "image/png"]}
            fileKey={FILE_KEY}
          />
        </div>
      ) : (
        <Skeleton loading={isLoading} active avatar>
          <Avatar shape="circle" size={200} src={user?.photo} />
        </Skeleton>
      )}
    </>
  );
};
