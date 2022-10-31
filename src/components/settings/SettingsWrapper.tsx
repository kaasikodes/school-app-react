import { Typography, Breadcrumb, Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";

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
      <div className=" mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card
          title="Set up Courses"
          bordered={false}
          className="shadow-sm"
          hoverable
        >
          <div className="flex flex-col gap-2">
            {Array(3)
              .fill(0)
              .map((item: any) => (
                <Link to="settings/courses/associate-courses-to-session">
                  Associate Courses to Session
                </Link>
              ))}
          </div>
        </Card>
        <Card
          title="Set up Departments"
          bordered={false}
          className="shadow-sm"
          hoverable
        >
          <div className="flex flex-col gap-2">
            {Array(3)
              .fill(0)
              .map((item: any) => (
                <Link to="settings/sessions">Add departments to school</Link>
              ))}
          </div>
        </Card>
        <Card
          title="Set up Classes"
          bordered={false}
          className="shadow-sm"
          hoverable
        >
          <div className="flex flex-col gap-2">
            {Array(3)
              .fill(0)
              .map((item: any) => (
                <Link to="settings/sessions">Add Class to school</Link>
              ))}
          </div>
        </Card>
        <Card
          title="Set up Session"
          bordered={false}
          className="shadow-sm"
          hoverable
        >
          <div className="flex flex-col gap-2">
            {Array(3)
              .fill(0)
              .map((item: any) => (
                <Link to="settings/sessions">Add Session to school</Link>
              ))}
          </div>
        </Card>
        <Card
          title="Set up Workflows"
          bordered={false}
          className="shadow-sm"
          hoverable
        >
          <div className="flex flex-col gap-2">
            {Array(3)
              .fill(0)
              .map((item: any) => (
                <Link to="settings/sessions">Add workflow to school</Link>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsWrapper;
