import { Form, Input, Button, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { openNotification } from "../../helpers/notifications";

import { LoadingOutlined } from "@ant-design/icons";

import ComponentLoader from "../loaders/ComponentLoader";

import { IDepartmentEntry } from "./DepartmentsTable";
import { getDepartment, saveSchoolDepartment } from "../../helpers/department";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";

interface IProps {
  closeDrawer: Function;
  setRefresh: Function;
  id: string;
}

const EditClassForm = ({ closeDrawer, setRefresh, id }: IProps) => {
  const [session, setSession] = useState<IDepartmentEntry | null>(null);
  const [fetching, setFetching] = useState(false);
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
    if (typeof schoolId === "string") {
      saveSchoolDepartment({
        name: data.name,
        description: data.description,
        schoolId: schoolId,
        token,
        id,
      })
        .then((res: any) => {
          const result = res.data;
          console.log(result, "res");

          openNotification({
            state: "success",
            title: "Success",
            description: `${
              result.message ?? data.name + " was updated successfully."
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
            description: `${data.name} school was not updated!`,
          });
        });
    }
  };

  // pheripherals
  useEffect(() => {
    setFetching(true);
    if (schoolId)
      getDepartment({ token, departmentId: id, schoolId })
        .then((res: any) => {
          const result = res.data.data;
          console.log(result, "sess");
          const fSession: IDepartmentEntry = {
            id: result.id,
            name: result.name,

            description: result.description,

            staffCount: 0,
            courseCount: 0,
            studentCount: 0,
          };

          setSession(fSession);
          setFetching(false);
        })
        .catch((err: any) => {
          console.log(err);
        });
  }, [token, id]);
  return (
    <div>
      {fetching ? (
        <ComponentLoader />
      ) : (
        <Form
          requiredMark={false}
          labelCol={{ span: 24 }}
          onFinish={handleFinish}
          initialValues={{
            name: session?.name,
            description: session?.description,
          }}
        >
          <Form.Item label={`Department name`} name="name">
            <Input placeholder="Department name" required />
          </Form.Item>
          <Form.Item label={`Description (optional)`} name="description">
            <Input.TextArea placeholder="Describe the department" rows={4} />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary" className="w-full">
              Update Department
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default EditClassForm;
