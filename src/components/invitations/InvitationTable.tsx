import { Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";

import React from "react";
import { TInvite } from "../../helpersAPIHooks/invites/useFetchInvitations";
import moment from "moment";

export const InvitationTable: React.FC<{
  data?: TInvite[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TInvite>["onChange"];
}> = ({ data, onChange, pagination, loading }) => {
  const columns: ColumnsType<TInvite> = [
    { title: "Email", dataIndex: "email" },
    { title: "Invitation Code", dataIndex: "code" },
    {
      title: "Sent",
      dataIndex: "updatedAt",
      render: (val) => moment(val).fromNow(),
    },
    {
      title: "Accepted",
      dataIndex: "accepted",
      render: (val) => (
        <span className="capitalize font-semibold">
          {val === 0 ? "No" : "Yes"}{" "}
        </span>
      ),
    },

    {
      title: "Accepted At",
      dataIndex: "acceptedAt",
      render: (val) => (val ? moment(val).fromNow() : ""),
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        pagination={pagination}
        loading={loading}
      />
    </div>
  );
};
