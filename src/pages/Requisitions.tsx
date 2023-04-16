import RequisitionsDataContainer from "../components/requisitions/RequisitionsDataContainer";
import { Typography, Tabs } from "antd";
const tabItems = [
  {
    label: "Ongoing",
    children: <RequisitionsDataContainer status="pending" />,
    key: "Ongoing",
  },

  {
    label: "Rejected",
    children: <RequisitionsDataContainer status="rejected" />,
    key: "Rejected",
  },

  {
    label: "Approved",
    children: <RequisitionsDataContainer status="approved" />,
    key: "Approved",
  },
];
const Requisitions = () => {
  return (
    <div className="flex flex-col gap-4">
      <Typography.Title level={3}>Requisitions</Typography.Title>

      <Tabs items={tabItems} />
    </div>
  );
};

export default Requisitions;
