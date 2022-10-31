import { Button, Form, Input } from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

import { useAuthUser, useSignIn } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import { openNotification } from "../../helpers/notifications";
import { saveSchool } from "../../helpers/schools";

interface IProps {
  closeDrawer: Function;
}

const AddSchoolForm = ({ closeDrawer }: IProps) => {
  const [form] = Form.useForm();
  const auth = useAuthUser();
  const authDetails = auth() as unknown as IAuthDets;
  const token = authDetails.userToken;
  const signIn = useSignIn();

  const handleFinish = (data: any) => {
    console.log(data, "sasa");
    openNotification({
      state: "info",
      title: "Wait a minute",
      description: <LoadingOutlined />,
    });

    saveSchool({
      name: data.name,
      description: data.description,
      token,
    })
      .then((res: any) => {
        console.log(res, "id ..");
        const result = res.data;
        //  sign in again with changes reflected
        const schoolId = result.result.id;
        const possUserRolesInSchool = JSON.parse(
          result.schools.find((school: any) => school.id === schoolId)?.pivot
            .school_user_roles ?? null
        );
        const currentUserRoleInSchool = result.schools.find(
          (school: any) => school.id === schoolId
        )?.pivot.choosen_role;
        const schools = [
          {
            id: schoolId,
            name: data.name,
            description: data.description,
            roles: possUserRolesInSchool,
            currentRole: currentUserRoleInSchool,
          },
          ...authDetails.schools,
        ];

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
          description: `${data.name} school was added successfully!`,
        });
        form.resetFields();
        closeDrawer();
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
        form={form}
        requiredMark={false}
        labelCol={{ span: 24 }}
        onFinish={handleFinish}
      >
        <Form.Item label={`Name`} name="name">
          <Input placeholder="School name" required />
        </Form.Item>
        <Form.Item label={`Description (optional)`} name="description">
          <Input.TextArea placeholder="Describe the school" rows={4} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" className="w-full">
            Add School
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddSchoolForm;
