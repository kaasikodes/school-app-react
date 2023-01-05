import { Form, Input, Button, DatePicker, Avatar } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { openNotification } from "../../helpers/notifications";

import { LoadingOutlined } from "@ant-design/icons";

import ComponentLoader from "../loaders/ComponentLoader";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { useQueryClient } from "react-query";
import {
  useFetchSingleClass,
  useUpdateSingleClass,
} from "../../helpersAPIHooks/classes";
import { TLevel } from "../../appTypes/levels";
import { IUpdateClassProps } from "../../helpers/classes";
import { IUpdateCourseProps } from "../../helpers/courses";
import { useUpdateSingleCourse } from "../../helpersAPIHooks/courses";
import {
  useFetchSingleStaff,
  useUpdateSingleStaff,
} from "../../helpersAPIHooks/staff";
import { TStaff } from "../../appTypes/staff";
import { IUpdateStaffProps } from "../../helpers/staff";

interface IProps {
  closeDrawer: Function;

  id: string;
}

const EditStaffForm = ({ closeDrawer, id }: IProps) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;

  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;
  // const adminId = globalState?.currentSchool?.adminId as string;

  const { mutate, isLoading } = useUpdateSingleStaff();

  const handleFinish = (data: any) => {
    if (schoolId) {
      const props: IUpdateStaffProps = {
        schoolId,
        token,
        staffNo: data.staffNo,
        staffId: id,
      };
      // return;
      openNotification({
        state: "info",
        title: "Wait a second ...",
        description: <LoadingOutlined />,
      });
      mutate(props, {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });
          form.resetFields();

          closeDrawer();

          queryClient.invalidateQueries({
            queryKey: ["staff"],
            // exact: true,
          });
        },
      });
    }
  };

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
        <Form
          requiredMark={false}
          labelCol={{ span: 24 }}
          onFinish={handleFinish}
          form={form}
        >
          <div className="flex flex-col gap-2 mb-4">
            <Avatar alt="profile pic" src={data?.photo} />
          </div>
          <Form.Item label={`Staff No`} name="staffNo">
            <Input placeholder="Staff no" required disabled={false} />
          </Form.Item>
          <Form.Item label={`First Name`} name="firstName">
            <Input placeholder="First name" required disabled />
          </Form.Item>
          <Form.Item label={`Middle Name`} name="middleName">
            <Input placeholder="Middle name" required disabled />
          </Form.Item>
          <Form.Item label={`Last Name`} name="lastName">
            <Input placeholder="Last name" required disabled />
          </Form.Item>
          <Form.Item label={`Staff Email`} name="email">
            <Input placeholder="Staff Email" required disabled />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary" className="w-full">
              Update Staff
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default EditStaffForm;
