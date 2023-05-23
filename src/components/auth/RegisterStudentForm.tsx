import { Button, Form, Input } from "antd";
import { useContext, useEffect } from "react";
import {
  emailValidationRules,
  textInputValidationRules,
} from "../../formValidation";
import { LeftCircleOutlined as LeftOutlined } from "@ant-design/icons";
import { useRegisterUserThroughInvitation } from "../../helpersAPIHooks/auth";
import { openNotification } from "../../helpers/notifications";
import { IAuthDets, IAuthSchool } from "../../appTypes/auth";
import { useSignIn } from "react-auth-kit";
import {
  GlobalContext,
  EGlobalOps,
} from "../../contexts/GlobalContextProvider";
import { TAutoDetail } from "./RegisterSchoolWrapper";
import { FormSchoolsInput } from "../../customFormComponents/FormSchoolInput";

export const RegisterStudentForm: React.FC<{
  goBack: () => void;
  autoDetail?: TAutoDetail;
}> = ({ goBack, autoDetail }) => {
  const signIn = useSignIn();
  const [form] = Form.useForm();
  const globalCtx = useContext(GlobalContext);
  const { dispatch: globalDispatch } = globalCtx;
  useEffect(() => {
    if (autoDetail) {
      form.setFieldsValue({
        schoolId: autoDetail.schoolId,
        inviteCode: autoDetail.code,
        userEmail: autoDetail.email,
        userName: autoDetail.userName,
      });
    }
  }, [form, autoDetail]);

  useEffect(() => {
    openNotification({
      state: "info",
      title: "Warning",
      description:
        "Please Contact Admin to turn on the server 4 testing, before proceeding. Thank You. Email: odehisaac1998@gmail.com  || phone: +234 8144893734",
    });
  }, []);
  const { mutate, isLoading } = useRegisterUserThroughInvitation();

  const handleFinish = (data: any) => {
    mutate(
      {
        email: data.userEmail,
        inviteCode: data.inviteCode,
        schoolId: data.schoolId,
        sessionId: autoDetail?.sessionId, // if not provided backend will use the current session Id in the backend
        userType: "student",
        userName: data.userName,
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
          const result = res.data;
          // save the token in local storage

          if (result.status) {
            const choosenSchoolId = result.user.choosen_school_id;
            const possUserRolesInChoosenSchool = JSON.parse(
              result.schools.find(
                (school: any) => school.id === choosenSchoolId
              )?.pivot.school_user_roles ?? null
            );
            const currentUserRoleInChoosenSchool = result.schools.find(
              (school: any) => school.id === choosenSchoolId
            )?.pivot.choosen_role;
            const choosenSchoolCurrentSessionId = result.schools.find(
              (school: any) => school.id === choosenSchoolId
            )?.current_session_id;
            if (result.schools.length === 0) {
              openNotification({
                state: "error",
                title: "UnSuccessful login",
                description: "You don not belong to any school",
                duration: 0.5,
              });

              return;
            }
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
            const authData: IAuthDets = {
              loggedIn: true,
              user: {
                name: result.user.name,
                email: result.user.email,
                id: result.user.id,
              },
              userToken: result.token,
              choosenSchoolId: result.user.choosen_school_id,
              choosenSchoolCurrentSessionId,

              currentUserRoleInChoosenSchool: currentUserRoleInChoosenSchool,
              possibleUserRolesInChoosenSchool: possUserRolesInChoosenSchool,

              //   staff in the following schools
              schools: schools,
            };

            if (
              signIn({
                token: authData.userToken,
                expiresIn: process.env.REACT_APP_SESSION_TIME
                  ? +process.env.REACT_APP_SESSION_TIME
                  : 120,

                tokenType: "Bearer",
                authState: authData,
              })
            ) {
              // if (!globalState.currentSchool) {
              globalDispatch({
                type: EGlobalOps.setCurrentSchool,
                payload: authData.schools.find(
                  (school: any) => school.id === choosenSchoolId
                ),
              });
              // }
              openNotification({
                state: "success",

                title: "Login Successfull!",
                description: `Welcome to ${process.env.REACT_APP_APP_NAME}, ${authData.user.name}`,
                // duration: 0.4,
              });
            }

            openNotification({
              state: "success",
              title: "Successful login",
              description: result.message,
              duration: 0.5,
            });
          }
          // form.resetFields();

          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });
        },
      }
    );
  };
  return (
    <div className="flex flex-col gap-4">
      <Form
        layout="vertical"
        requiredMark={false}
        onFinish={handleFinish}
        form={form}
      >
        <FormSchoolsInput
          Form={Form}
          control={{ label: "School", name: "schoolId" }}
        />
        <Form.Item
          label="Name"
          name="userName"
          rules={textInputValidationRules}
        >
          <Input
            placeholder="Your name"
            disabled={
              autoDetail && autoDetail.userName.split(" ").join() !== ""
            }
          />
        </Form.Item>

        <Form.Item label="Email " name="userEmail" rules={emailValidationRules}>
          <Input placeholder="User Email" />
        </Form.Item>

        <Form.Item
          name="inviteCode"
          label="Invitation code"
          rules={textInputValidationRules}
        >
          <Input
            placeholder="Invite Code"
            className="rounded border-slate-400"
            style={{ padding: "6px 5px" }}
            // autoComplete="new-password"
          />
        </Form.Item>
        <Form.Item>
          <div className="flex flex-col gap-4">
            <Button
              type="primary"
              className="w-full"
              htmlType="submit"
              loading={isLoading}
            >
              Register
            </Button>
            <Button
              type="ghost"
              className="w-full items-center"
              icon={<LeftOutlined className="text-xl " />}
              onClick={goBack}
            >
              Go back
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
