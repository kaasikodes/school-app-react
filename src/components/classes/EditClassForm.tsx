import { Form, Input, Button, DatePicker } from "antd";
import React, { useEffect, useState } from "react";

import { openNotification } from "../../helpers/notifications";
import { saveSchool } from "../../helpers/schools";

import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  addSchoolSession,
  getSession,
  updateSchoolSession,
} from "../../helpers/sessions";
import ComponentLoader from "../loaders/ComponentLoader";
import { IClassEntry } from "./ClassesTable";
import { getClass, saveSchoolClass } from "../../helpers/classes";
import { IAuthDets } from "../../appTypes/auth";
import { useAuthUser } from "react-auth-kit";

interface IProps {
  closeDrawer: Function;
  setRefresh: Function;
  id: string;
}

const EditClassForm = ({ closeDrawer, setRefresh, id }: IProps) => {
  const [session, setSession] = useState<IClassEntry | null>(null);
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

    saveSchoolClass({
      name: data.name,
      description: data.description,
      schoolId: schoolId as string,
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
            result.message ?? data.name + "was updated successfully."
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
  };

  // pheripherals
  useEffect(() => {
    // const token = localStorage.getItem(LOCAL_USER_TOKEN_KEY);
    console.log(token);
    setFetching(true);
    if (schoolId)
      getClass({ token, classId: id, schoolId })
        .then((res: any) => {
          const result = res.data.data;
          console.log(result, "sess");
          const fSession: IClassEntry = {
            id: result.id,
            name: result.name,

            description: result.description,

            teacherCount: 0,
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
          <Form.Item label={`Class name`} name="name">
            <Input placeholder="Class name" required />
          </Form.Item>
          <Form.Item label={`Description (optional)`} name="description">
            <Input.TextArea placeholder="Describe the school" rows={4} />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary" className="w-full">
              Update Class
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default EditClassForm;
