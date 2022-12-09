import { Tabs } from "antd";
import React from "react";
import Profile from "./singleStaff/Profile";
import StaffClasses from "./singleStaff/StaffClasses";

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
}
const SingleStaffWrapper = ({ staffId }: IProps) => {
  return (
    <div>
      {/* header */}
      Back & Breadcrumbs for admin
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
            Staff recorded scores of student in SS3A Physics
          </Tabs.TabPane>
        </Tabs>
      ) : (
        "not found"
      )}
    </div>
  );
};

export default SingleStaffWrapper;
