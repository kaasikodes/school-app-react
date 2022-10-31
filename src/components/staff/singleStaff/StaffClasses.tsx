import { Button, Dropdown, Menu, Space, Table } from "antd";

import React from "react";
import {
  ExclamationCircleOutlined,
  LoadingOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const StaffClasses = () => {
  const data = [
    {
      id: "erere",
      name: "JSS 3A",
      courseCount: 23,
      classTeacher: true,
    },
  ];
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_: string, record: any) => (
        <Link to={`/classes/${record.id}`}>{record.name}</Link>
      ),
    },
    {
      title: "Courses teaching",
      dataIndex: "courseCount",
      key: "courseCount",
    },
    {
      title: "Class Teacher",
      dataIndex: "classTeacher",
      key: "classTeacher",
      render: (_: string, record: any) => (
        <span>{record.classTeacher ? "Yes" : "No"}</span>
      ),
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
                      {/* the courses he/she is teaching */}
                      View Details
                    </button>
                  ),
                },
                {
                  key: "2",
                  label: (
                    <button className="w-full text-left">
                      Drop as class teacher{" "}
                    </button>
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
    <div className="mt-4">
      <Table columns={columns} size="small" dataSource={data} />
    </div>
  );
};

export default StaffClasses;
