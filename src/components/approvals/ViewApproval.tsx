import { Modal } from "antd";
import React from "react";
import { BeatLoader } from "react-spinners";
import moment from "moment";
import { useFetchSingleApproval } from "../../helpersAPIHooks/approvals/useFetchSingleApproval";

export const ViewApproval: React.FC<{
  open: boolean;
  handleClose: () => void;
  id: number;
}> = ({ open, handleClose, id }) => {
  const { data, isFetching, isSuccess } = useFetchSingleApproval({ id });
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
        </div>
      ) : (
        <BeatLoader />
      )}
    </Modal>
  );
};
