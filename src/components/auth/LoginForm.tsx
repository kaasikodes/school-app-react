import { Input, Button, Form, Spin } from "antd";
import { useSignIn } from "react-auth-kit";
import { useMutation } from "react-query";
import { loginUser } from "../../helpers/auth";
import { openNotification } from "../utils/notifcations";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const { mutate } = useMutation(loginUser);
  const handleSubmit = async (data: any) => {
    openNotification({
      state: "info",
      title: "Wait a minute ...",
      description: <Spin />,
    });
    mutate(
      { email: data.email, password: data.password },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res) => {
          const result = res.data.data;
          if (!result.user.isCpaatAdmin) {
            return openNotification({
              state: "error",

              title: "Not Allowed!",
              description: "You are not authorized to use this application",
              // duration: 0.4,
            });
          }
          if (
            signIn({
              token: result.token,
              expiresIn: 120000000000,
              tokenType: "Bearer",
              authState: result.user,
            })
          ) {
            openNotification({
              state: "success",

              title: result.status,
              description: result.message,
              // duration: 0.4,
            });
            navigate("/");
          }
        },
      }
    );
  };
  return (
    <Form labelCol={{ span: 24 }} onFinish={handleSubmit}>
      <Form.Item name={"email"}>
        <Input placeholder="email" />
      </Form.Item>
      <Form.Item name={"password"}>
        <Input.Password placeholder="password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" className="w-full" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
