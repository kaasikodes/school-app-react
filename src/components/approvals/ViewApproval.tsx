import { Button, Form, Input, Modal, Radio } from "antd";
import React from "react";
import { BeatLoader } from "react-spinners";
import moment from "moment";
import { useFetchSingleApproval } from "../../helpersAPIHooks/approvals/useFetchSingleApproval";
import { useQueryClient } from "react-query";
import { openNotification } from "../../helpers/notifications";
import { useApproveOrRejectRequisition } from "../../helpersAPIHooks/approvals/useApproveOrRejectRequisition";
import { TApprovalStatus } from "../../helpersAPIHooks/approvals/useFetchApprovals";

const APPROVAL_OPTIONS: { label: string; value: TApprovalStatus }[] = [
  {
    label: "Approve",
    value: "approved",
  },
  {
    label: "Reject",
    value: "rejected",
  },
];
export const ViewApproval: React.FC<{
  open: boolean;
  handleClose: () => void;
  id: number;
}> = ({ open, handleClose, id }) => {
  const { data, isFetching, isSuccess } = useFetchSingleApproval({ id });
  const queryClient = useQueryClient();

  const [form] = Form.useForm();

  const { mutate, isLoading } = useApproveOrRejectRequisition();

  const handleFinish = (data: any) => {
    mutate(
      {
        id,
        status: data.status,
        comment: data.comment,
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
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });
          form.resetFields();

          queryClient.invalidateQueries({
            queryKey: ["approvals"],
            // exact: true,
          });
        },
      }
    );
  };
  return (
    <Modal
      open={open}
      onCancel={handleClose}
      title="View Approval"
      style={{ top: 30 }}
      footer={null}
    >
      {!isFetching && isSuccess ? (
        <div className="flex flex-col gap-4">
          <p className="capitalize">
            <span className="font-semibold text-sky-600">Title:</span>{" "}
            {data?.requisition.title}
          </p>
          <p>
            <span className="font-semibold text-sky-600">Requestor:</span>{" "}
            {data?.requisition.requester.name}
          </p>
          <p className="capitalize">
            <span className="font-semibold text-sky-600">Approval Status:</span>{" "}
            {data?.status}
          </p>
          <p>
            <span className="font-semibold text-sky-600">Date Requested:</span>{" "}
            {moment(data?.requisition.created_at).format("YYYY-MM-DD")}
          </p>
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-sky-600">Content:</span>
            <div className="border border-slate-200 rounded-md px-4 py-3">
              {data?.requisition.content}
            </div>
          </div>
          <Form form={form} onFinish={handleFinish}>
            <Form.Item
              name={"status"}
              label={`Do you want to approve or reject this request?`}
            >
              <Radio.Group>
                {APPROVAL_OPTIONS.map((item) => (
                  <Radio value={item.value} key={item.value}>
                    {item.label}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
            <Form.Item name="comment" label="Comment">
              <Input.TextArea rows={3} />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Save
            </Button>
          </Form>
        </div>
      ) : (
        <BeatLoader />
      )}
    </Modal>
  );
};
