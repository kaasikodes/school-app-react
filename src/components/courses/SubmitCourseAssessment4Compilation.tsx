import { Button, Form, Input, Spin } from "antd";

import { textInputValidationRulesOp } from "../../formValidation";

import { openNotification } from "../../helpers/notifications";
import { useQueryClient } from "react-query";
import { useSubmitCourseAssesment4Compilation } from "../../helpersAPIHooks/courses/useSubmitCourseAssesment4Compilation";

interface IProps {
  courseId: number;
  levelId: number;
  closeModal: () => void;
}
export type TRequistionType =
  | "course_result_compilation"
  | "level_result_compilation"
  | "other";

const SubmitCourseAssessment4Compilation = ({
  courseId,
  levelId,
  closeModal,
}: IProps) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate } = useSubmitCourseAssesment4Compilation();

  const handleSubmit = (data: any) => {
    // return;
    openNotification({
      state: "info",
      title: "Wait a second ...",
      // description: <Progress percent={80} status="active" />,
      description: <Spin />,
    });
    mutate(
      {
        comment: data.comment,
        courseId,
        levelId,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
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
          queryClient.invalidateQueries({
            queryKey: ["requisitions"],
          });
          //   TO DO : Also invalide approvals

          form.resetFields();
          closeModal();
        },
      }
    );
  };

  return (
    <div>
      <Form
        labelCol={{ span: 24 }}
        requiredMark={false}
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Comment"
          name="comment"
          rules={textInputValidationRulesOp}
        >
          <Input.TextArea
            rows={5}
            placeholder="What would you like the class teacher to know ?"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SubmitCourseAssessment4Compilation;
