import { Form, Input, Button, DatePicker, Select } from "antd";
import React, { useState } from "react";
import { openNotification } from "../../helpers/notifications";
import { saveSchool } from "../../helpers/schools";

import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import { addSchoolSession } from "../../helpers/sessions";
import { saveSchoolClass } from "../../helpers/classes";
import { saveSchoolDepartment } from "../../helpers/department";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";

interface IProps {
  closeDrawer: Function;
  setRefresh: Function;
}
interface IDepartment {
  id: number;
  name: string;
  description?: string;
}

const AddDeptForm = ({ closeDrawer, setRefresh }: IProps) => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;
  const token = authDetails.userToken;
  const schoolId = authDetails.choosenSchoolId;

  const handleFinish = (data: any) => {
    openNotification({
      state: "info",
      title: "Wait a minute",
      description: <LoadingOutlined />,
    });

    if (schoolId) {
      saveSchoolDepartment({
        name: data.name,
        description: data.description,
        schoolId: schoolId,
        token,
      })
        .then((res: any) => {
          const result = res.data;
          console.log(result, "res");

          openNotification({
            state: "success",
            title: "Success",
            description: `${
              result.message ?? data.name + " was created successfully."
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
    }
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
            Add Department
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddDeptForm;
