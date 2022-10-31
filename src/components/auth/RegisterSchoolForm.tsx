import { Avatar, Button, Form, Input, Spin, Upload } from "antd";
import React from "react";
import { EditOutlined } from "@ant-design/icons";
import { ELoginStep } from "./LoginWrapper";
import { openNotification } from "../../helpers/notifications";
import { saveSchool } from "../../helpers/schools";
import { IAuthDets } from "../../appTypes/auth";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

interface IProps {
  handleStep: Function;
  authDetails: IAuthDets;
}
const RegisterSchoolForm = ({ handleStep, authDetails }: IProps) => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const handleFinish = (data: any) => {
    console.log(data, "sasa");
    openNotification({
      state: "info",
      title: "Wait a minute",
      description: <Spin />,
    });

    saveSchool({
      name: data.name,
      description: data.description,
      token: authDetails.userToken,
    })
      .then((res: any) => {
        console.log(res);
        const newSchool = res.data.result;
        const fschools = res.data.schools;
        openNotification({
          state: "success",
          title: "Success",
          description: `${data.name} school was added successfully!`,
        });
        const choosenSchoolId = newSchool.id;
        const possUserRolesInChoosenSchool = JSON.parse(
          fschools.find((school: any) => school.id === choosenSchoolId)?.pivot
            .school_user_roles ?? null
        );
        const currentUserRoleInChoosenSchool = fschools.find(
          (school: any) => school.id === choosenSchoolId
        )?.pivot.choosen_role;
        const schools = fschools.map((school: any) => {
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
        console.log("auth", newAuth);

        if (
          signIn({
            token: authDetails.userToken,
            expiresIn: 120000000000,
            tokenType: "Bearer",
            authState: newAuth,
          })
        ) {
          openNotification({
            state: "success",

            title: "Login Successfull!",
            description: `Welcome to ${process.env.REACT_APP_APP_NAME}, ${authDetails.user.name}`,
            // duration: 0.4,
          });
          navigate("/");
        }
      })
      .catch((err: any) => {
        console.log(err);
        openNotification({
          state: "error",
          title: "Error occures",
          description: `${data.name} school was not created!`,
        });
      });
  };
  return (
    <div>
      <Form
        requiredMark={false}
        labelCol={{ span: 24 }}
        onFinish={handleFinish}
      >
        <Form.Item name="logo">
          <div className="flex justify-center">
            <Upload>
              <Avatar
                shape="circle"
                icon={<EditOutlined />}
                size={60}
                className="border-sky-800 border-2 bg-slate-300"
              />
            </Upload>
          </div>
        </Form.Item>
        <Form.Item name={"name"}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name={"description"}>
          <Input.TextArea placeholder="Description" />
        </Form.Item>
        <Form.Item>
          <div className="grid grid-cols-2 gap-4">
            <Button
              className="w-full"
              type="ghost"
              onClick={() => handleStep(ELoginStep.LOGIN)}
            >
              Go back
            </Button>
            <Button className="w-full" type="primary" htmlType="submit">
              Proceed
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterSchoolForm;
