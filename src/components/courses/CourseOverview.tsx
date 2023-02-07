import React, { useContext, useState } from "react";
import { EditFilled, SaveFilled } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import {
  useFetchCourseOverview,
  useSaveCourseOverview,
} from "../../helpersAPIHooks/courses";
import { ISaveCourseOverviewProps } from "../../helpers/courses";
import { useAuthUser } from "react-auth-kit";
import { useQueryClient } from "react-query";
import { IAuthDets } from "../../appTypes/auth";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { openNotification } from "../../helpers/notifications";
import { LoadingOutlined } from "@ant-design/icons";

interface IProps {
  levelId: string;
  courseId: string;
}

const CourseOverview = ({ levelId, courseId }: IProps) => {
  const [edit, setEdit] = useState(false);
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;
  const sessionId = globalState?.currentSchool?.currentSessionId as string;
  const { data, isSuccess } = useFetchCourseOverview({
    courseId,
    levelId,
    sessionId,
    token,
    schoolId,
  });

  if (isSuccess) {
    form.setFieldsValue({
      breakDown: data.breakDown,
      brief: data.brief,
    });
  }

  const { mutate } = useSaveCourseOverview();

  const handleFinish = (data: any) => {
    if (schoolId) {
      const props: ISaveCourseOverviewProps = {
        schoolId,
        token,
        brief: data.brief,
        breakDown: data.breakDown,
        sessionId,
        levelId,
        courseId,
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

          queryClient.invalidateQueries({
            queryKey: ["course-overview"],
            // exact: true,
          });
        },
      });
    }
  };
  const handleSave = () => {
    form.submit();
    setEdit(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        {edit ? (
          <Button
            icon={<SaveFilled />}
            type="text"
            onClick={() => handleSave()}
          />
        ) : (
          <Button
            icon={<EditFilled />}
            type="text"
            onClick={() => setEdit(true)}
          />
        )}
      </div>

      {edit ? (
        <>
          <Form labelCol={{ span: 24 }} form={form} onFinish={handleFinish}>
            <Form.Item label="Brief" name="brief">
              <Input />
            </Form.Item>
            <Form.Item label="Breakdown" name="breakDown">
              <Input.TextArea rows={12} />
            </Form.Item>
          </Form>
        </>
      ) : (
        <>
          {/* brief */}
          <div className="border p-4 ">
            <p>{data?.brief}</p>
          </div>
          {/* brakdown */}
          <div className="p-4">
            <p>{data?.breakDown}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseOverview;
