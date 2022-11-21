import { Table } from "antd";
import React from "react";

const ClassFeesTable = () => {
  const columns = [
    {
      title: "Class",
      dataIndex: "levelId",
      key: "levelId",
    },
    {
      title: "Payment Category",
      dataIndex: "categoryId",
      key: "categoryId",
    },
    {
      title: "Total Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Installmental",
      dataIndex: "installmental",
      key: "installmental",
    },
    {
      title: "Breakdown",
      dataIndex: "document",
      key: "document",
    },
  ];
  return (
    <div>
      <Table columns={columns} />
    </div>
  );
};

export default ClassFeesTable;
