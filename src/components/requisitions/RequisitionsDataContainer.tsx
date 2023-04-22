import { Button, Select, Table } from "antd";
import React, { useState } from "react";
import { TRequistionType } from "../courses/SubmitCourseAssessment4Compilation";
import { ColumnsType } from "antd/lib/table";
import {
  TRequisition,
  useFetchRequisitions,
} from "../../helpersAPIHooks/requisitions/useFetchRequisitions";
import moment from "moment";
import { ViewRequisition } from "./ViewRequisition";
import { AddRequisition } from "./AddRequisition";

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
    // disabled: true, // if role is not admin
  },
];
type TApprovalStatus = "pending" | "rejected" | "approved";
const RequisitionsDataContainer: React.FC<{ status: TApprovalStatus }> = ({
  status,
}) => {
  const [type, setType] = useState<TRequistionType>();
  const { data, isLoading } = useFetchRequisitions({ status, type });
  const [showM, setShowM] = useState(false);
  const [showA, setShowA] = useState(false);
  const [id, setId] = useState<number>();
  const handleClick = (id: number) => {
    setId(id);
    setShowM(true);
  };
  const columns: ColumnsType<TRequisition> = [
    {
      title: "Title",
      dataIndex: "title",
      render: (_, item) => <span className="capitalize">{item.title}</span>,
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (_, item) => (
        <span className="capitalize">{item.type.split("_").join(" ")}</span>
      ),
    },
    {
      title: "Current Approver",
      dataIndex: "approver",
      render: (_, item) => (
        <span className="capitalize">{item.current_approver.name}</span>
      ),
    },
    {
      title: "Date Requested",
      dataIndex: "created_at",
      render: (val) => moment(val).format("YYYY-MM-DD"),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, item) => (
        <div>
          <Button size="small" onClick={() => handleClick(item.id)}>
            View
          </Button>
        </div>
      ),
    },
  ];
  return (
    <>
      {id && (
        <ViewRequisition
          open={showM}
          handleClose={() => setShowM(false)}
          id={id}
        />
      )}
      <AddRequisition open={showA} handleClose={() => setShowM(false)} />
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 justify-end">
          <Button type="primary" onClick={() => setShowA(true)}>
            Make a request
          </Button>
          <Select
            options={requisitionTypes}
            onSelect={(val: TRequistionType) => setType(val)}
            placeholder="Filter Based by Requisition Type"
          />
        </div>
        <Table columns={columns} dataSource={data?.data} loading={isLoading} />
      </div>
    </>
  );
};

export default RequisitionsDataContainer;
