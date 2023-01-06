import { Form, Input, Button } from "antd";
import React, { useContext } from "react";
import { openNotification } from "../../helpers/notifications";

import { LoadingOutlined } from "@ant-design/icons";

import ComponentLoader from "../loaders/ComponentLoader";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { useQueryClient } from "react-query";

import { TLevel } from "../../appTypes/levels";
import { IUpdateCourseProps } from "../../helpers/courses";
import {
  useFetchSingleCourse,
  useUpdateSingleCourse,
} from "../../helpersAPIHooks/courses";

interface IProps {
  closeDrawer: Function;

  id: string;
}

const EditCourseForm = ({ closeDrawer, id }: IProps) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;

  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;
  // const adminId = globalState?.currentSchool?.adminId as string;

  const { mutate, isLoading } = useUpdateSingleCourse();

  const handleFinish = (data: any) => {
    if (schoolId) {
      const props: IUpdateCourseProps = {
        schoolId,
        token,
        name: data.name,
        description: data.description,
        // adminId,
        courseId: id,
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
          // const result = res.data.data;
          console.log("BULK", res);

          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });
          form.resetFields();

          closeDrawer();

          queryClient.invalidateQueries({
            queryKey: ["courses"],
            // exact: true,
          });
        },
      });
    }
  };

  const { isSuccess } = useFetchSingleCourse({
    id,
    schoolId,
    token,
    onSuccess: (data: TLevel) => {
      form.setFieldsValue({
        name: data.name,
        description: data.description,
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
          disabled={!isSuccess}
        >
          <Form.Item label={`Course name`} name="name">
            <Input placeholder="Course name" required />
          </Form.Item>
          <Form.Item label={`Description (optional)`} name="description">
            <Input.TextArea placeholder="Describe the course" rows={4} />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              className="w-full"
              loading={isLoading}
            >
              Update Course
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default EditCourseForm;
