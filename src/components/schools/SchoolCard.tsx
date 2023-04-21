import { Typography, Button, Drawer, Modal } from "antd";
import { useContext, useState } from "react";
import EditSchoolForm from "./EditSchoolForm";
import { ExclamationCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { useAuthUser, useSignIn } from "react-auth-kit";
import { IAuthDets, IAuthSchool } from "../../appTypes/auth";
import { openNotification } from "../../helpers/notifications";
import { deleteSchool } from "../../helpers/schools";
import { updateChoosenSchool } from "../../helpers/users";
import {
  EGlobalOps,
  GlobalContext,
} from "../../contexts/GlobalContextProvider";
import { ERole } from "../../appTypes/roles";

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

  const globalCtx = useContext(GlobalContext);
  const { state: globalState, dispatch: globalDispatch } = globalCtx;
  const userCurrentRole = globalState.currentSchool?.currentRole;

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
            console.log(res, "SWITCH");
            const result = res.data;
            //  update sign in
            const choosenSchoolId = result.data.choosen_school_id;
            const schools = result.schools.map((school: any): IAuthSchool => {
              return {
                name: school.name,
                id: school.id,
                description: school.description,
                roles: JSON.parse(school.pivot.school_user_roles),
                staffId: school.pivot.staff_id,
                studentId: school.pivot.student_id,
                custodianId: school.pivot.custodian_id,
                adminId: school.pivot.admin_id,
                currentRole: school.pivot.choosen_role,
                currentSessionId: school.current_session_id,
              };
            });

            globalDispatch({
              type: EGlobalOps.setCurrentSchool,
              payload: schools.find(
                (school: any) => school.id === choosenSchoolId
              ),
            });

            openNotification({
              state: "success",
              title: "Success",
              description: `${item.name}  is now the school you're currently on!`,
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
          {userCurrentRole === ERole.ADMIN && (
            <>
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
            </>
          )}
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
