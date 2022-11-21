import { Typography, Input, Button, Drawer, Breadcrumb } from "antd";

import { useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { Link } from "react-router-dom";
import { IAuthDets } from "../../appTypes/auth";

import AddSchoolCourse from "../settings/courses/AddSchoolCourse";
import CoursesTable from "./SchoolSessionCoursesTable";

interface IProps {
  classId?: string;
}
const CoursesWrapper = ({ classId }: IProps) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;
  const token = authDetails.userToken;
  const schoolId = authDetails.choosenSchoolId;

  return (
    <div>
      <div className="flex flex-col justify-between">
        <Typography.Title level={3}>{classId} Courses</Typography.Title>

        <Breadcrumb>
          {classId && (
            <Breadcrumb.Item>
              <Link to={`/classes/${classId}`}>{classId}</Link>
            </Breadcrumb.Item>
          )}
          <Breadcrumb.Item>
            <span>Courses</span>
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
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-2">
        <CoursesTable />
      </div>

      <Drawer
        visible={showDrawer}
        onClose={() => setShowDrawer(false)}
        title="Add Course"
      >
        <AddSchoolCourse handleClose={() => setShowDrawer(false)} />
      </Drawer>
    </div>
  );
};

export default CoursesWrapper;
