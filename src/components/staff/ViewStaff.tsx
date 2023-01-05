import { Form, Input, Button, DatePicker, Avatar } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { openNotification } from "../../helpers/notifications";

import { LoadingOutlined } from "@ant-design/icons";

import ComponentLoader from "../loaders/ComponentLoader";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import { GlobalContext } from "../../contexts/GlobalContextProvider";

import { useFetchSingleStaff } from "../../helpersAPIHooks/staff";
import { TStaff } from "../../appTypes/staff";

interface IProps {
  closeDrawer: Function;

  id: string;
}

const ViewStaff = ({ closeDrawer, id }: IProps) => {
  const [form] = Form.useForm();

  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;

  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;

  const { isSuccess, data } = useFetchSingleStaff({
    id,
    schoolId,
    token,
    onSuccess: (data: TStaff) => {
      form.setFieldsValue({
        name: data.name,
        staffNo: data.staffNo,
        email: data.email,
        firstName: data.name.split(" ")[0],
        lastName: data.name.split(" ")[2] ?? data.name.split(" ")[1],
        middleName: data.name.split(" ")[2] ? data.name.split(" ")[1] : null,
      });
    },
  });

  // pheripherals

  return (
    <div>
      {!isSuccess ? (
        <ComponentLoader />
      ) : (
        <Form requiredMark={false} labelCol={{ span: 24 }} form={form} disabled>
          <div className="flex flex-col gap-2 mb-4">
            <Avatar alt="profile pic" src={data?.photo} />
          </div>
          <Form.Item label={`Staff No`} name="staffNo">
            <Input placeholder="Staff no" required />
          </Form.Item>
          <Form.Item label={`First Name`} name="firstName">
            <Input placeholder="First name" required />
          </Form.Item>
          <Form.Item label={`Middle Name`} name="middleName">
            <Input placeholder="Middle name" required />
          </Form.Item>
          <Form.Item label={`Last Name`} name="lastName">
            <Input placeholder="Last name" required />
          </Form.Item>
          <Form.Item label={`Staff Email`} name="email">
            <Input placeholder="Staff Email" required />
          </Form.Item>
          {/* <Form.Item label={`Staff Password`} name="password">
            <Input placeholder="Staff Password" required />
          </Form.Item> */}
        </Form>
      )}
    </div>
  );
};

export default ViewStaff;
