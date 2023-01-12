import { Tabs, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../routes";
import Profile from "./singleStudent/Profile";
import StudentClasses from "./singleStudent/StudentClasses";
import { ArrowLeftOutlined } from "@ant-design/icons";

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
  isUser?: boolean;
}
const SingleStudentWrapper = ({ studentId, isUser }: IProps) => {
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
