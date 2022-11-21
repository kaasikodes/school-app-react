import { Form, Input, Button } from "antd";
import { useState } from "react";

import { openNotification } from "../../helpers/notifications";

import { LoadingOutlined } from "@ant-design/icons";
import { saveSchoolClass } from "../../helpers/classes";
import { IAuthDets } from "../../appTypes/auth";
import { useAuthUser } from "react-auth-kit";

interface IProps {
  closeDrawer: Function;
  setRefresh: Function;
}

const AddClassForm = ({ closeDrawer, setRefresh }: IProps) => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;
  const token = authDetails.userToken;
  const schoolId = authDetails.choosenSchoolId;

  // const [departments, setDepartments] = useState([]);

  const handleFinish = (data: any) => {
    openNotification({
      state: "info",
      title: "Wait a minute",
      description: <LoadingOutlined />,
    });

    saveSchoolClass({
      name: data.name,
      description: data.description,
      schoolId: schoolId as string,
      token,
    })
      .then((res: any) => {
        const result = res.data;
        console.log(result, "res");

        openNotification({
          state: "success",
          title: "Success",
          description: `${
            result.message ?? data.name + "was created successfully."
          } `,
        });
        setRefresh((val: boolean) => !val);

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
        requiredMark={false}
        labelCol={{ span: 24 }}
        onFinish={handleFinish}
      >
        <Form.Item label={`Class name`} name="name">
          <Input placeholder="Class name" required />
        </Form.Item>
        <Form.Item label={`Description (optional)`} name="description">
          <Input.TextArea placeholder="Describe the class" rows={4} />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary" className="w-full">
            Add Class
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddClassForm;
