import React from "react";
import { Button, Dropdown, Menu, Tag, Typography } from "antd";
import { MoreOutlined } from "@ant-design/icons";

interface IProps {
  id: string;
  title: string;
  sessionsUsedIn: { id: string; name: string }[];
}

const StudentEnrollmentPolicyCard = ({ id, title, sessionsUsedIn }: IProps) => {
  const menu = (
    <Menu>
      <Menu.Item>Edit</Menu.Item>
      <Menu.Item>Assign Policy to session</Menu.Item>
    </Menu>
  );
  return (
    <div className="shadow-md flex flex-col gap-4 py-4 px-2 bg-white rounded-sm">
      <div className="flex justify-between">
        <Typography.Title level={5}>{title}</Typography.Title>
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button icon={<MoreOutlined />} size="small" type="text" />
        </Dropdown>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-semibold text-sky-700">Sessions used in:</span>
        <div className="flex gap-2">
          {sessionsUsedIn.map((item) => (
            <Tag key={item.id}>{item.name}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentEnrollmentPolicyCard;
