import { Button, Form, Input, Select } from "antd";
import React, { useContext } from "react";
import {
  textInputValidationRules,
  generalValidationRules,
  emailValidationRules,
  passwordValidationRules,
} from "../../formValidation";
import { GooglePlusCircleFilled } from "@ant-design/icons";
import { useRegisterSchool } from "../../helpersAPIHooks/auth";
import { IRegSchoolProps } from "../../helpers/auth";
import { openNotification } from "../../helpers/notifications";
import { IAuthDets, IAuthSchool } from "../../appTypes/auth";
import { useSignIn } from "react-auth-kit";
import {
  GlobalContext,
  EGlobalOps,
} from "../../contexts/GlobalContextProvider";

const RegisterSchoolForm = () => {
  const signIn = useSignIn();
  const [form] = Form.useForm();
  const { mutate, isLoading } = useRegisterSchool();
  const globalCtx = useContext(GlobalContext);
  const { state: globalState, dispatch: globalDispatch } = globalCtx;

  const handleFinish = (data: any) => {
    const props: IRegSchoolProps = {
      userFullName: data.userFullName,
      userEmail: data.userEmail,
      userPhone: `${data.phone.code}-${data.phone.number}`,
      schoolName: data.schoolName,
      password: data.password,
    };

    mutate(props, {
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
        console.log(res.data, "server");
        const result = res.data;
        // save the token in local storage

        if (result.status) {
          const choosenSchoolId = result.user.choosen_school_id;
          const possUserRolesInChoosenSchool = JSON.parse(
            result.schools.find((school: any) => school.id === choosenSchoolId)
              ?.pivot.school_user_roles ?? null
          );
          const currentUserRoleInChoosenSchool = result.schools.find(
            (school: any) => school.id === choosenSchoolId
          )?.pivot.choosen_role;
          const choosenSchoolCurrentSessionId = result.schools.find(
            (school: any) => school.id === choosenSchoolId
          )?.current_session_id;
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
              expiresIn: process.env
                .REACT_APP_SESSION_TIME as unknown as number,

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
        form.resetFields();

        openNotification({
          state: "success",

          title: "Success",
          description: res.data.message,
          // duration: 0.4,
        });
      },
    });
  };
  return (
    <Form
      layout="vertical"
      requiredMark={false}
      onFinish={handleFinish}
      form={form}
    >
      <Form.Item
        // label="Full Name"
        name="userFullName"
        rules={textInputValidationRules}
      >
        <Input placeholder="Full Name" />
      </Form.Item>
      <Form.Item
        // label="School Name"
        name="schoolName"
        rules={textInputValidationRules}
      >
        <Input placeholder="School Name" />
      </Form.Item>
      <Form.Item
        // label="Email"
        name="userEmail"
        rules={emailValidationRules}
      >
        <Input placeholder="School Email" />
      </Form.Item>
      <Form.Item
        name="phone"
        //   label="Phone"
      >
        <Input.Group compact>
          <Form.Item
            noStyle
            rules={generalValidationRules}
            name={["phone", "code"]}
          >
            {
              <Select
                placeholder="Country Code"
                // showSearch
                // allowClear
                // optionLabelProp="label"
                className="rounded border-slate-400"
                style={{ width: "25%" }}
                options={[{ id: "234", code: "234" }].map((item) => ({
                  label: `+${item.code}`,
                  value: item.id,
                }))}
              />
            }
          </Form.Item>
          <Form.Item
            noStyle
            rules={textInputValidationRules}
            name={["phone", "number"]}
          >
            <Input
              style={{ width: "75%" }}
              placeholder="Phone Number"
              className="rounded border-slate-400 text-left"
              autoComplete="phone"
            />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item
        name="password"
        // label="Password"
        rules={passwordValidationRules}
      >
        <Input.Password
          placeholder="Password"
          className="rounded border-slate-400"
          style={{ padding: "6px 5px" }}
          autoComplete="new-password"
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
            icon={<GooglePlusCircleFilled className="text-xl " />}
          >
            Sign up with Google
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default RegisterSchoolForm;
