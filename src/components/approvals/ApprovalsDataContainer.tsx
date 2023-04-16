import { Select, Table } from "antd";
import React from "react";
import { TRequistionType } from "../courses/SubmitCourseAssessment4Compilation";

const requisitionTypes: {
  label: string;
  value: TRequistionType;
  disabled?: boolean;
}[] = [
  {
    label: "Course Result Compilation",
    value: "course_result_compilation",
  },
  {
    label: "Level Result Compilation",
    value: "level_result_compilation",
    disabled: true, // if role is not admin
  },
];
type TApprovalStatus = "pending" | "rejected" | "approved";
const ApprovalsDataContainer: React.FC<{ status: TApprovalStatus }> = ({
  status,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Select
          options={requisitionTypes}
          placeholder="Filter Based by Requisition Type"
        />
      </div>
      <Table
        columns={[
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Type",
            dataIndex: "type",
          },
          {
            title: "Requester",
            dataIndex: "requester",
          },
          {
            title: "Date Requested",
            dataIndex: "dateRequested",
          },
          {
            title: "Status",
            dataIndex: "status",
          },
          {
            title: "Action",
            dataIndex: "action",
          },
        ]}
      />
    </div>
  );
};

export default ApprovalsDataContainer;
