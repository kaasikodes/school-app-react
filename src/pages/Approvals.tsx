import React from "react";
import { Typography, Tabs } from "antd";
import ApprovalsDataContainer from "../components/approvals/ApprovalsDataContainer";

const tabItems = [
  {
    label: "Pending",
    children: <ApprovalsDataContainer status="pending" />,
    key: "Pending",
  },

  {
    label: "Rejections",
    children: <ApprovalsDataContainer status="rejected" />,
    key: "Rejections",
  },

  {
    label: "Approved",
    children: <ApprovalsDataContainer status="approved" />,
    key: "Approved",
  },
];

const Approvals = () => {
  return (
    <div className="flex flex-col gap-4">
      <Typography.Title level={3}>Approvals</Typography.Title>

      <Tabs items={tabItems} />
    </div>
  );
};

export default Approvals;
