import { Form, Input, Button, Spin, Col, Row } from "antd";

import { useContext, useEffect } from "react";

import { openNotification } from "../../helpers/notifications";
import axios from "axios";

import { useSignIn } from "react-auth-kit";

import { IAuthDets, IAuthSchool } from "../../appTypes/auth";
import { useLoginUser } from "../../helpersAPIHooks/auth";
import {
  emailValidationRules,
  textInputValidationRules,
} from "../../formValidation";
import {
  EGlobalOps,
  GlobalContext,
} from "../../contexts/GlobalContextProvider";

axios.defaults.withCredentials = true;

const LoginForm = () => {
  const signIn = useSignIn();
  const [form] = Form.useForm();
  const { mutate, isLoading } = useLoginUser();
  const globalCtx = useContext(GlobalContext);
  const { state: globalState, dispatch: globalDispatch } = globalCtx;

  useEffect(() => {
    openNotification({
      state: "info",
      title: "Warning",
      description:
        "Please Contact Admin to turn on the server 4 testing, before proceeding. Thank You. Email: odehisaac1998@gmail.com  || phone: +234 8144893734",
    });
  }, []);

  const onFinish = (values: any) => {
    const props = {
      email: values.email,
      password: values.password,
    };
    openNotification({
      state: "info",
      title: "Wait a minute",
      description: <Spin />,
    });
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

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Form
        className=""
        name="basic"
        requiredMark={false}
        labelCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelAlign="left"
        form={form}
      >
        <Form.Item label="Email" name="email" rules={emailValidationRules}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={textInputValidationRules}
        >
          <Input.Password />
        </Form.Item>

        <Row gutter={20}>
          <Col span={12} className="flex justify-center">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={isLoading}
              >
                Login
              </Button>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Button type="dashed" className="w-full">
                Forgot Password
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default LoginForm;
