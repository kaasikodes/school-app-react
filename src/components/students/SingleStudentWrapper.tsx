import { Tabs } from "antd";
import React from "react";
import Profile from "./singleStudent/Profile";
import StudentClasses from "./singleStudent/StudentClasses";

// staff details, image, id,
// from - to
// sess being a part of
// classes heading (current sess)
// courses teaching (c sess)
// skills & Proficiencies(that is courses capable of teaching)
// Rating of teacher in each course
// groups part of
interface IProps {
  studentId?: string;
}
const SingleStudentWrapper = ({ studentId }: IProps) => {
  return (
    <div>
      {/* header */}
      Back & Breadcrumbs for admin
      {studentId ? (
        <Tabs>
          <Tabs.TabPane tab="Profile" key="item-1">
            <Profile studentId={studentId} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Classes" key="item-2">
            <StudentClasses studentId={studentId} />
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

export default SingleStudentWrapper;
