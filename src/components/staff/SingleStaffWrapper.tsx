import { Tabs, Typography } from "antd";
import React from "react";
import Profile from "./singleStaff/Profile";
import StaffClasses from "./singleStaff/StaffClassesAndCourses";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { routes } from "../../routes";
import StaffActivities from "./singleStaff/StaffActivities";

// staff details, image, id,
// from - to
// sess being a part of
// classes heading (current sess)
// courses teaching (c sess)
// skills & Proficiencies(that is courses capable of teaching)
// Rating of teacher in each course
// groups part of
interface IProps {
  staffId?: string;
  isUser?: boolean;
}
const SingleStaffWrapper = ({ staffId, isUser }: IProps) => {
  return (
    <div>
      {/* header */}
      <div className="flex justify-end">
        {!isUser && (
          <div className="flex gap-3 items-center">
            <Link to={routes.staff} className="relative bottom-2">
              <ArrowLeftOutlined />
            </Link>
            <Typography.Title level={4}>
              <span className="mb-0 text-slate-500">Staff Profile</span>
            </Typography.Title>
          </div>
        )}
      </div>

      {staffId ? (
        <Tabs>
          <Tabs.TabPane tab="Profile" key="item-1">
            <Profile staffId={staffId} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Classes" key="item-2">
            <StaffClasses staffId={staffId} />
          </Tabs.TabPane>

          {/* for admin */}
          <Tabs.TabPane tab="Activities" key="item-3">
            <StaffActivities />
          </Tabs.TabPane>
        </Tabs>
      ) : (
        "staff profile not found"
      )}
    </div>
  );
};

export default SingleStaffWrapper;
