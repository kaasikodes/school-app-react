import { Typography, Input, Button, Drawer, Breadcrumb } from "antd";
import { useState } from "react";

import SchoolCoursesTable from "./SchoolCoursesTable";
import AddSchoolCourse from "./AddSchoolCourse";

import { Link } from "react-router-dom";

const CoursesWrapper = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <div>
      <div className="flex flex-col justify-between">
        <Typography.Title level={3}>Settings</Typography.Title>

        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/settings">Settings</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/settings/courses">Courses</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className=" mt-4 flex md:justify-end">
        <div className="flex gap-4">
          <Input.Search
            placeholder="Search courses"
            // onSearch={(val) => setSearchTerm(val)}
            allowClear
            // onChange={(e) => e.target.value === "" && setSearchTerm("")}
          />
          <Button onClick={() => setShowDrawer(true)} type="primary">
            Add Course
          </Button>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-2">
        <SchoolCoursesTable />
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
