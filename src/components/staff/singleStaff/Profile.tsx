import { Avatar, Divider, Rate, Space, Table, Tag, Typography } from "antd";
import React from "react";

const Profile = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Members",
      dataIndex: "memberCount",
      key: "memberCount",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];
  const data = [
    {
      name: "Grad Commitee",
      memberCount: 9,
      role: "Admin",
    },
    {
      name: "Cleaning",
      memberCount: 4,
      role: "Member",
    },
  ];
  return (
    <div className="mt-4 flex flex-col gap-12">
      <div className="grid md:grid-cols-6 gap-8">
        {/* info */}
        <div className="flex flex-col gap-6 col-span-4">
          <div>
            <h4 className="text-4xl text-sky-800 mb-0">Isaac Odeh</h4>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.{" "}
          </p>
          <div>
            <h5 className="text-lg">Proficiencies</h5>
            <Space>
              {["Physics", "Chemistry", "English"].map((item) => (
                <Tag>{item}</Tag>
              ))}
            </Space>
          </div>
          <div>
            <h5 className="text-lg">Skills</h5>
            <Space>
              {["Soccer", "Management", "Coding"].map((item) => (
                <Tag>{item}</Tag>
              ))}
            </Space>
          </div>
        </div>
        {/* avatar */}
        <div className="md:col-start-5 col-span-2 md:pl-14 flex flex-col gap-4 border-l-2">
          <Avatar
            shape="square"
            size={200}
            src="https://images.pexels.com/photos/1681040/pexels-photo-1681040.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
          <div className="bg-slate-800 rounded-md px-2 pt-3 w-max">
            <span className="text-xs text-white">Staff Number</span>
            <p className="text-2xl font-bold text-slate-400">LJ-6799</p>
          </div>
          <div>
            {/* <h5 className="text-lg">Resume</h5> */}
            <Space>
              <Tag color="#104a8e" className="cursor-pointer">
                {"Download Resume"}
              </Tag>
            </Space>
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-2">
        <Typography.Title level={4}>
          <span className="text-slate-400">Groups</span>{" "}
        </Typography.Title>
        <Table dataSource={data} columns={columns} size="small" />
      </div>
    </div>
  );
};

export default Profile;
