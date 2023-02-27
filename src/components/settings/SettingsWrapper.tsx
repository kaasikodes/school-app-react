import { Typography, Breadcrumb } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../routes";
import SettingCards from "./SettingCards";
import { ISettingCardProps } from "./SettingsCard";

const items: ISettingCardProps[] = [
  {
    title: "Classes",
    actions: [{ name: "Set up school Classes", link: routes.classes }],
  },
  {
    title: "Departments",
    actions: [{ name: "Set up school Departments", link: routes.departments }],
  },
  {
    title: "Courses",
    actions: [{ name: "Set up school courses", link: routes.courses }],
  },
  {
    title: "Policies",
    actions: [{ name: "Set up school Policies", link: routes.policies }],
  },
  {
    title: "Session",
    actions: [{ name: "Set up school Session", link: routes.sessions }],
  },
  {
    title: "Staff",
    actions: [{ name: "Set up school Staff", link: routes.staff }],
  },
  {
    title: "Students",
    actions: [{ name: "Set up school Students", link: routes.students }],
  },
  {
    title: "Custodian",
    actions: [{ name: "Set up school Custodian", link: routes.custodians }],
  },
];

const SettingsWrapper = () => {
  return (
    <div>
      <div className="flex flex-col justify-between">
        <Typography.Title level={3}>Settings</Typography.Title>

        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/settings">Settings</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/settings">Home</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <SettingCards items={items} />
    </div>
  );
};

export default SettingsWrapper;
