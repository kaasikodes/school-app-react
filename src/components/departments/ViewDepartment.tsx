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

import { IDepartmentEntry } from "./DepartmentsTable";
import { getDepartment } from "../../helpers/department";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";

interface IProps {
  id: string;
}

const ViewDepartment = ({ id }: IProps) => {
  const [session, setSession] = useState<IDepartmentEntry | null>(null);
  const [fetching, setFetching] = useState(false);
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;
  const token = authDetails.userToken;
  const schoolId = authDetails.choosenSchoolId;

  // pheripherals
  useEffect(() => {
    // const token = localStorage.getItem(LOCAL_USER_TOKEN_KEY);
    console.log(token);
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
          initialValues={{
            name: session?.name,
            description: session?.description,
          }}
        >
          <Form.Item label={`Department name`} name="name">
            <Input placeholder="Department name" required disabled />
          </Form.Item>
          <Form.Item label={`Description (optional)`} name="description">
            <Input.TextArea
              placeholder="Describe the department"
              rows={4}
              disabled
            />
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default ViewDepartment;
