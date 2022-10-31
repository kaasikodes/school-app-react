import { Button, Dropdown, Menu, Space, Table } from "antd";
import React from "react";
import { EllipsisOutlined } from "@ant-design/icons";

const CourseAssessmentsSubmissionsTable = () => {
  const columns = [
    { title: "Course", dataIndex: "course", key: "course" },
    { title: "Submitted by", dataIndex: "submittedBy", key: "submittedBy" },
    { title: "Submitted On", dataIndex: "submittedOn", key: "submittedOn" },
    { title: "Status", dataIndex: "status", key: "status" },
    // in review, approved, rejected

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: any) => (
        <Dropdown
          overlay={
            <Menu
              items={[
                {
                  key: "1",
                  label: <button className="w-full text-left">Download</button>,
                },
                {
                  key: "2",
                  label: <button className="w-full text-left">Review</button>,
                },
                {
                  key: "3",
                  label: <button className="w-full text-left">Approve</button>,
                },
                {
                  key: "4",
                  label: <button className="w-full text-left">Reject</button>,
                },
              ]}
            />
          }
          trigger={["click"]}
        >
          <Space>
            <Button icon={<EllipsisOutlined />} type="text" />
          </Space>
        </Dropdown>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columns} />
    </div>
  );
};

export default CourseAssessmentsSubmissionsTable;
