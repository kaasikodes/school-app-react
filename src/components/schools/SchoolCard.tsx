import { Typography, Button, Drawer, Modal } from "antd";
import React, { useState } from "react";
import EditSchoolForm from "./EditSchoolForm";
import { ExclamationCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { useAuthUser, useSignIn } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import { openNotification } from "../../helpers/notifications";
import { deleteSchool } from "../../helpers/schools";
import { updateChoosenSchool } from "../../helpers/users";

export interface ISchoolCardEntry {
  item: {
    id: string;
    name: string;
    description?: string;
  };
  selected?: boolean;
}

const SchoolCard = ({ item, selected }: ISchoolCardEntry) => {
  const [showEditSchoolForm, setShowEditSchoolForm] = useState(false);
  const auth = useAuthUser();
  const signIn = useSignIn();

  const authDetails = auth() as unknown as IAuthDets;
  const user = authDetails.user;
  const token = authDetails.userToken;
  const handleDelete = () => {
    Modal.confirm({
      title: "Delete School",
      icon: <ExclamationCircleOutlined className="text-red-500" />,
      content: "Are you sure you want to delete this school ?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        openNotification({
          state: "info",
          title: "Wait a minute",
          description: <LoadingOutlined />,
        });

        deleteSchool({
          token,
          id: item.id,
        })
          .then((res: any) => {
            console.log(res);
            //  sign in again with changes reflected
            const schools = authDetails.schools.filter(
              (school) => school.id !== item.id
            );

            const newAuth: IAuthDets = {
              ...authDetails,
              loggedIn: true,

              schools,
            };
            signIn({
              token: authDetails.userToken,
              expiresIn: 120000000000,
              tokenType: "Bearer",
              authState: newAuth,
            });
            openNotification({
              state: "success",
              title: "Success",
              description: `${item.name}  was deleted successfully!`,
            });
          })
          .catch((err: any) => {
            console.log(err);
            openNotification({
              state: "error",
              title: "Error occures",
              description: `${item.name} school was not deleted!`,
            });
          });
      },
    });
  };
  const switchToAnotherSchool = () => {
    Modal.confirm({
      title: "Switch School",
      icon: <ExclamationCircleOutlined className="text-red-500" />,
      content: `You are about to switch to ${item.name}.`,
      okText: "Proceed",
      cancelText: "Cancel",
      onOk: () => {
        openNotification({
          state: "info",
          title: "Wait a minute",
          description: <LoadingOutlined />,
        });

        updateChoosenSchool({
          token,
          schoolId: item.id,
          userId: user.id,
        })
          .then((res: any) => {
            console.log(res);
            const result = res.data;
            //  update sign in
            const choosenSchoolId = result.data.choosen_school_id;
            const possUserRolesInChoosenSchool = JSON.parse(
              result.schools.find(
                (school: any) => school.id === choosenSchoolId
              )?.pivot.school_user_roles ?? null
            );
            const currentUserRoleInChoosenSchool = result.schools.find(
              (school: any) => school.id === choosenSchoolId
            )?.pivot.choosen_role;
            const schools = result.schools.map((school: any) => {
              return {
                name: school.name,
                id: school.id,
                description: school.description,
              };
            });

            const newAuth: IAuthDets = {
              ...authDetails,
              loggedIn: true,
              choosenSchoolId,
              currentUserRoleInChoosenSchool: currentUserRoleInChoosenSchool,
              possibleUserRolesInChoosenSchool: possUserRolesInChoosenSchool,
              schools,
            };
            signIn({
              token: authDetails.userToken,
              expiresIn: 120000000000,
              tokenType: "Bearer",
              authState: newAuth,
            });

            openNotification({
              state: "success",
              title: "Success",
              description: `${item.name}  is now the school you\'re currently on!`,
            });
          })
          .catch((err: any) => {
            console.log(err);
            openNotification({
              state: "error",
              title: "Error occures",
              description: `Issue switching to ${item.name}!`,
            });
          });
      },
    });
  };

  return (
    <div>
      <div
        className={`${
          selected ? "border border-sky-500 shadow-lg" : "shadow-sm"
        } px-3 py-4  bg-white flex flex-col  md:flex-row md:justify-between md:items-center hover:shadow-lg rounded-md`}
      >
        <Typography.Title level={5}>{item.name}</Typography.Title>
        <div className="flex gap-2 items-center">
          <Button
            size="small"
            type="primary"
            disabled={selected}
            onClick={switchToAnotherSchool}
          >
            {selected ? "Currently on" : "Switch to"}
          </Button>
          <Button
            size="small"
            type="dashed"
            onClick={() => setShowEditSchoolForm(true)}
          >
            Edit
          </Button>
          <Button
            size="small"
            className="text-red-800"
            type="ghost"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
        <Drawer
          visible={showEditSchoolForm}
          onClose={() => setShowEditSchoolForm(false)}
          title="Edit School"
        >
          <EditSchoolForm
            id={item.id}
            closeDrawer={() => setShowEditSchoolForm(false)}
          />
        </Drawer>
      </div>
    </div>
  );
};

export default SchoolCard;
