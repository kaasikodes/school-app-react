import { Button, Select, Table } from "antd";
import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";
import {
  TApproval,
  useFetchApprovals,
} from "../../helpersAPIHooks/approvals/useFetchApprovals";
import { ViewApproval } from "./ViewApproval";
import moment from "moment";
import { usePagination } from "../../hooks/usePagination";
import { REQUISITION_TYPES_OPTIONS } from "../requisitions/AddRequisition";
import { TRequistionType } from "helpersAPIHooks/requisitions/useFetchSingleRequisitionByParams";

type TApprovalStatus = "pending" | "rejected" | "approved";
const ApprovalsDataContainer: React.FC<{ status: TApprovalStatus }> = ({
  status,
}) => {
  const { onChange, pagination } = usePagination();
  const [type, setType] = useState<TRequistionType>();
  const [showM, setShowM] = useState(false);
  const [id, setId] = useState<number>();
  const handleClick = (id: number) => {
    setId(id);
    setShowM(true);
  };
  const { data, isLoading } = useFetchApprovals({
    status,
    type,
    pagination: {
      limit: pagination.pageSize,

      page: pagination.current,
    },
  });

  const columns: ColumnsType<TApproval> = [
    {
      title: "Title",
      dataIndex: "title",
      render: (_, item) => (
        <span className="capitalize">{item.requisition.title}</span>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (_, item) => (
        <span className="capitalize">
          {item.requisition.type.split("_").join(" ")}
        </span>
      ),
    },
    {
      title: "Requester",
      dataIndex: "requester",
      render: (_, item) => <span>{item.requisition.requester.name}</span>,
    },
    {
      title: "Date Requested",
      dataIndex: "dateRequested",
      render: (_, item) => (
        <span>{moment(item.requisition.created_at).format("YYYY-MM-DD")}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_, item) => <span>{item.status}</span>,
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
        <ViewApproval
          open={showM}
          handleClose={() => setShowM(false)}
          id={id}
        />
      )}
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <Select
            options={REQUISITION_TYPES_OPTIONS}
            onSelect={(val: TRequistionType) => setType(val)}
            placeholder="Filter Based by Requisition Type"
          />
        </div>
        <Table
          columns={columns}
          dataSource={data?.data}
          loading={isLoading}
          onChange={onChange}
          pagination={{ ...pagination, total: data?.total }}
        />
      </div>
    </>
  );
};

export default ApprovalsDataContainer;
