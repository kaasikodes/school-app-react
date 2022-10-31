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

const SingleStaffWrapper = () => {
  return (
    <div>
      {/* header */}
      <Tabs>
        <Tabs.TabPane tab="Profile" key="item-1">
          <Profile />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Classes" key="item-2">
          <StaffClasses />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default SingleStaffWrapper;
