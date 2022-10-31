import { Form, Input, Checkbox, Button, Spin, Col, Row } from "antd";
import React from "react";
import { loginUser, signupUser } from "../../helpers/auth";
import { openNotification } from "../../helpers/notifications";
import axios from "axios";

axios.defaults.withCredentials = true;

const RegisterUserForm = () => {
  const onFinish = (values: any) => {
    const props = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    openNotification({
      state: "info",
      title: "Wait a minute",
      description: <Spin />,
    });

    signupUser(props)
      .then((res: any) => {
        console.log(res.data);
        const result = res.data;
        // save the token in local storage
        if (result.status) {
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
        size="middle"
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
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input placeholder="Name" />
        </Form.Item>
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

export default RegisterUserForm;
