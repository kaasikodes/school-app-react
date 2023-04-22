import { Button, Drawer, Form, Input, Select } from "antd";
import React from "react";
import { TRequistionType } from "../courses/SubmitCourseAssessment4Compilation";
import { useAddRequisition } from "../../helpersAPIHooks/requisitions/useAddRequisition";
import { useQueryClient } from "react-query";
import { openNotification } from "../../helpers/notifications";

const REQUISITION_TYPES: TRequistionType[] = [
  "course_result_compilation",
  "level_result_compilation",
  "other",
];
const REQUISITION_TYPES_OPTIONS: { value: TRequistionType; label: string }[] =
  REQUISITION_TYPES.map((item) => ({
    value: item,
    label: item.split("_").join(" "),
  }));

export const AddRequisition: React.FC<{
  open: boolean;
  handleClose: () => void;
}> = ({ open, handleClose }) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useAddRequisition();
  const [form] = Form.useForm();
  const handleFinish = (data: any) => {
    mutate(
      {
        type: data.type,
        content: data.content,
        title: data.title,
      },
      {
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

          handleClose();

          queryClient.invalidateQueries({
            queryKey: ["invites"],
            // exact: true,
          });
        },
      }
    );
  };
  return (
    <Drawer open={open} onClose={handleClose} title="Make Requisition">
      <Form labelCol={{ span: 24 }} form={form} onFinish={handleFinish}>
        <Form.Item name={"title"} label="Title">
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item name={"type"} label="Type">
          <Select
            options={REQUISITION_TYPES_OPTIONS}
            placeholder="Type"
            className="capitalize"
          />
        </Form.Item>
        <Form.Item name={"content"} label="Content">
          <Input.TextArea rows={4} placeholder="Content" />
        </Form.Item>

        <Button htmlType="submit" type="primary" loading={isLoading}>
          Submit{" "}
        </Button>
      </Form>
    </Drawer>
  );
};
