import { Modal } from "antd";
import React from "react";
import { useFetchSingleRequisition } from "../../helpersAPIHooks/requisitions/useFetchSingleRequisition";
import { BeatLoader } from "react-spinners";
import moment from "moment";

export const ViewRequisition: React.FC<{
  open: boolean;
  handleClose: () => void;
  id: number;
}> = ({ open, handleClose, id }) => {
  const { data, isFetching, isSuccess } = useFetchSingleRequisition({ id });
  return (
    <Modal
      open={open}
      onCancel={handleClose}
      title="View Requisition"
      style={{ top: 30 }}
      footer={null}
    >
      {!isFetching && isSuccess ? (
        <div className="flex flex-col gap-4">
          <p className="capitalize">
            <span className="font-semibold text-sky-600">Title:</span>{" "}
            {data?.title}
          </p>
          <p>
            <span className="font-semibold text-sky-600">
              Current Approver:
            </span>{" "}
            {data?.current_approver.name}
          </p>
          <p className="capitalize">
            <span className="font-semibold text-sky-600">Approval Status:</span>{" "}
            {data?.status}
          </p>
          <p>
            <span className="font-semibold text-sky-600">Date Requested:</span>{" "}
            {moment(data?.created_at).format("YYYY-MM-DD")}
          </p>
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-sky-600">Content:</span>
            <div className="border border-slate-200 rounded-md px-4 py-3">
              {data?.content}
            </div>
          </div>
        </div>
      ) : (
        <BeatLoader />
      )}
    </Modal>
  );
};
