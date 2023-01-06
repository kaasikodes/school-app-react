import { Typography, Input, Button, Drawer, Breadcrumb } from "antd";

import { useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { Link } from "react-router-dom";
import { IAuthDets } from "../../appTypes/auth";
import AddCourse from "./AddCourse";
import CoursesViewContainer from "./CoursesViewContainer";
import { DownloadOutlined } from "@ant-design/icons";

interface IProps {
  classId?: string;
}
const CoursesWrapper = ({ classId }: IProps) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <div className="flex flex-col justify-between">
        <Typography.Title level={3}>School Courses</Typography.Title>

        <Breadcrumb>
          {classId && (
            <Breadcrumb.Item>
              <Link to={`/classes/${classId}`}>{classId}</Link>
            </Breadcrumb.Item>
          )}
          <Breadcrumb.Item>
            <span>These are the Courses offered in school</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className=" mt-4 flex md:justify-end">
        <div className="flex gap-4">
          <Input.Search
            placeholder="Search courses"
            onSearch={(val) => setSearchTerm(val)}
            allowClear
            onChange={(e) => e.target.value === "" && setSearchTerm("")}
          />
          <Button onClick={() => setShowDrawer(true)} type="primary">
            Add Course
          </Button>
          <Button
            type="text"
            icon={<DownloadOutlined />}
            title={`Download courses`}
          />
        </div>
      </div>
      <div className="mt-8">
        <CoursesViewContainer searchTerm={searchTerm} />
      </div>

      <Drawer
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        title="Add Course"
      >
        <AddCourse closeDrawer={() => setShowDrawer(false)} />
      </Drawer>
    </div>
  );
};

export default CoursesWrapper;
