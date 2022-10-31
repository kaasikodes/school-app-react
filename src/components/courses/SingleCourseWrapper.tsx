import {
  Typography,
  Input,
  Button,
  Drawer,
  Breadcrumb,
  TablePaginationConfig,
  Tabs,
} from "antd";

import React, { useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import { IAuthDets } from "../../appTypes/auth";
import { getCourses, saveSchoolCourse } from "../../helpers/courses";
import AddSchoolCourse from "../settings/courses/AddSchoolCourse";
import CourseLessonTable from "./CourseLessonTable";
import CourseParticipantTable from "./CourseParticipantTable";
import CourseRecordAssessmentTable from "./CourseRecordAssessmentTable";
import CoursesTable from "./SchoolSessionCoursesTable";

interface IProps {
  courseId: string;
  classId: string;
}

const SingleCourseWrapper = ({ courseId, classId }: IProps) => {
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
        <Typography.Title level={3}>{classId} Physics</Typography.Title>

        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={`/classes/${classId}`}>
              <a>{classId} bb</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={`/classes/${classId}/courses`}>
              <a>Courses</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>Physics</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Tabs>
        <Tabs.TabPane tab="Course Overview" key="item-4">
          <div className="flex flex-col gap-4">
            <div className="flex md:justify-between">
              <div>
                <Input.Search
                  placeholder="Search assessment"
                  onSearch={(val) => setSearchTerm(val)}
                  allowClear
                  onChange={(e) => e.target.value === "" && setSearchTerm("")}
                />
              </div>
              <Button onClick={() => setShowDrawer(true)} type="primary">
                Record Assessment
              </Button>
            </div>
            <p>This is to show the lesson plan for course</p>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Categories" key="item-5">
          <div className="flex flex-col gap-4">
            <div className="flex md:justify-between">
              <div>
                <Input.Search
                  placeholder="Search assessment"
                  onSearch={(val) => setSearchTerm(val)}
                  allowClear
                  onChange={(e) => e.target.value === "" && setSearchTerm("")}
                />
              </div>
              <Button onClick={() => setShowDrawer(true)} type="primary">
                Record Assessment
              </Button>
            </div>
            <p>This is to show the categories lessons will be grouped into</p>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Participants" key="item-1">
          <div className="flex flex-col gap-4">
            <div className="flex md:justify-between">
              <div>
                <Input.Search
                  placeholder="Search participant"
                  onSearch={(val) => setSearchTerm(val)}
                  allowClear
                  onChange={(e) => e.target.value === "" && setSearchTerm("")}
                />
              </div>
              <Button onClick={() => setShowDrawer(true)} type="primary">
                Add Participant
              </Button>
            </div>
            <div>
              <CourseParticipantTable />
            </div>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Lessons" key="item-2">
          <div className="flex flex-col gap-4">
            <div className="flex md:justify-between">
              <div>
                <Input.Search
                  placeholder="Search lessons"
                  onSearch={(val) => setSearchTerm(val)}
                  allowClear
                  onChange={(e) => e.target.value === "" && setSearchTerm("")}
                />
              </div>
              <Button onClick={() => setShowDrawer(true)} type="primary">
                Add Lesson
              </Button>
            </div>
            <CourseLessonTable />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Assessment Records" key="item-3">
          <div className="flex flex-col gap-4">
            <div className="flex md:justify-between">
              <div>
                <Input.Search
                  placeholder="Search assessment"
                  onSearch={(val) => setSearchTerm(val)}
                  allowClear
                  onChange={(e) => e.target.value === "" && setSearchTerm("")}
                />
              </div>
              <Button onClick={() => setShowDrawer(true)} type="primary">
                Record Assessment
              </Button>
            </div>
            <CourseRecordAssessmentTable />
          </div>
        </Tabs.TabPane>
      </Tabs>
      <div className="mt-8 flex flex-col gap-2">
        Course Paticipant Table that takes in class id and course id, and sessId
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

export default SingleCourseWrapper;
