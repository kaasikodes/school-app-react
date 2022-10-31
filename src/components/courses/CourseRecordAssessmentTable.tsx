import { Button, Dropdown, Menu, Space, Table } from "antd";
import React from "react";
import { EllipsisOutlined } from "@ant-design/icons";

const CourseRecordAssessmentTable = () => {
  const columns = [
    { title: "Title", dataIndex: "name", key: "name" },
    { title: "In Use", dataIndex: "inUse", key: "inUse" },
    // could be sent, N/A, or rejected or accepted
    { title: "Status", dataIndex: "inUse", key: "inUse" },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    { title: "Author", dataIndex: "author", key: "author" },
    {
      title: "Created on",
      dataIndex: "createdOn",
      key: "createdOn",
    },
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
                  label: (
                    <button className="w-full text-left">
                      Use This record
                    </button>
                  ),
                },
                {
                  key: "2",
                  label: (
                    <button className="w-full text-left">
                      Download record
                    </button>
                  ),
                },
                {
                  key: "2",
                  label: (
                    <button className="w-full text-left">View record</button>
                    // use a full drawer to display record
                  ),
                },
                {
                  key: "2",
                  label: (
                    <button className="w-full text-left">
                      Submit for Compilation
                    </button>
                    // warn user that if submission is accepted , it will be used permenantly
                    // and only one record can submitted for compilation
                  ),
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

export default CourseRecordAssessmentTable;
