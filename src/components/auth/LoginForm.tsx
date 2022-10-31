import { Form, Input, Checkbox, Button, Spin, Col, Row } from "antd";

import React from "react";

import { IAuthProps, loginUser } from "../../helpers/auth";
import { openNotification } from "../../helpers/notifications";
import axios from "axios";

import { ELoginStep } from "./LoginWrapper";
import { useAuthUser, useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { IAuthDets } from "../../appTypes/auth";

axios.defaults.withCredentials = true;

interface IProps {
  handleStep: Function;
  authDetails: IAuthDets;
  setAuthDetails: Function;
}

const LoginForm = ({ handleStep, authDetails, setAuthDetails }: IProps) => {
  const auth = useAuthUser();
  const signIn = useSignIn();

  const user = auth();
  const navigate = useNavigate();

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

    loginUser(props)
      .then((res: any) => {
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
          const schools = result.schools.map((school: any) => {
            return {
              name: school.name,
              id: school.id,
              description: school.description,
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

            currentUserRoleInChoosenSchool: currentUserRoleInChoosenSchool,
            possibleUserRolesInChoosenSchool: possUserRolesInChoosenSchool,

            //   staff in the following schools
            schools: schools,
          };

          setAuthDetails(authData);

          // handle next steps
          if (result.schools.length === 0) {
            handleStep(ELoginStep.REGISTER_SCHOOL);
          }
          if (result.schools.length === 1) {
            if (
              signIn({
                token: authDetails.userToken,
                expiresIn: 120000000000,
                tokenType: "Bearer",
                authState: authData,
              })
            ) {
              openNotification({
                state: "success",

                title: "Login Successfull!",
                description: `Welcome to ${process.env.REACT_APP_APP_NAME}, ${authData.user.name}`,
                // duration: 0.4,
              });
              navigate("/");
            }
          }
          if (result.schools.length > 1) {
            handleStep(ELoginStep.SELECT_EXISTING_SCHOOL);
          }
          openNotification({
            state: "success",
            title: "Successful login",
            description: result.message,
            duration: 0.5,
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
        openNotification({
          state: "error",
          title: "Unsuccessful login attempt",
          description: "Please input your correct login details",
        });
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
        size="small"
        // wrapperCol={{
        //   span: 16,
        // }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelAlign="left"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Row gutter={20}>
          <Col span={12} className="flex justify-center">
            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
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
