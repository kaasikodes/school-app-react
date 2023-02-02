import { Typography, Input, Button, Drawer, Breadcrumb, Tabs } from "antd";

import { useState, useContext } from "react";
import { useAuthUser } from "react-auth-kit";
import { Link } from "react-router-dom";
import { IAuthDets } from "../../appTypes/auth";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { useFetchSingleClass } from "../../helpersAPIHooks/classes";
import { useFetchSingleCourse } from "../../helpersAPIHooks/courses";
import { routes } from "../../routes";
import ComponentLoader from "../loaders/ComponentLoader";
import AddSchoolCourse from "../settings/courses/AddSchoolCourse";
import AddCourseParticipantForm from "./AddCourseParticipantForm";
import CourseLessonTable from "./CourseLessonTable";
import CourseParticipantTable from "./CourseParticipantTable";
import CourseRecordAssessmentTable from "./CourseRecordAssessmentTable";

interface IProps {
  courseId?: string;
  classId?: string;
}
type TComp = "Add Participant" | "Upload Assessmnet" | "";
const SingleCourseWrapper = ({ courseId, classId }: IProps) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;

  const token = authDetails.userToken;

  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;
  const [comp, setComp] = useState<TComp>("");

  const handleClick = (val: TComp) => {
    setComp(val);
    setShowDrawer(true);
  };

  const { isSuccess: isCSuccess, data: course } = useFetchSingleCourse({
    id: courseId as string,
    schoolId,
    token,
  });
  const { isSuccess: isLSuccess, data: level } = useFetchSingleClass({
    id: classId as string,
    schoolId,
    token,
  });

  if (!isCSuccess || !isLSuccess) {
    return <ComponentLoader />;
  }

  return (
    <div>
      <div className="flex flex-col justify-between items-end border-0  ">
        <Typography.Title level={4} className="">
          <span className="text-slate-400 italic font-light">
            {level.name}:
          </span>{" "}
          <span className="text-slate-700 uppercase">{course.name}</span>
        </Typography.Title>

        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={routes.classes}>Classes</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={`/classes/${classId}`}>{level.name}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{course.name}</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="mt-8 flex flex-col gap-2">
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
              <div className="flex flex-col gap-4 items-center md:flex-row  md:justify-between">
                <div>
                  <Input.Search
                    placeholder="Search participant"
                    onSearch={(val) => setSearchTerm(val)}
                    allowClear
                    onChange={(e) => e.target.value === "" && setSearchTerm("")}
                  />
                </div>
                <div className="flex gap-4">
                  <Button
                    onClick={() => handleClick("Add Participant")}
                    type="text"
                  >
                    Add Participant
                  </Button>
                  <Button onClick={() => setShowDrawer(true)} type="ghost">
                    Upload Assessment
                  </Button>
                  <Button onClick={() => setShowDrawer(true)} type="primary">
                    Submit Assessment
                  </Button>
                </div>
              </div>
              <div>
                <CourseParticipantTable
                  courseId={courseId as string}
                  levelId={classId as string}
                />
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
          <Tabs.TabPane tab="Resources" key="item-3">
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
              </div>
              <CourseRecordAssessmentTable />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Assessments" key="item-20">
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
                  Add Assessment (mcq, submission, exam)
                </Button>
              </div>

              <CourseRecordAssessmentTable />
            </div>
            <p>
              assessment | no of submissions (out of ...) | link to see
              submissions i.e breakdown | in future should be able to grade a
              student single submission and assign to an assessment in CA
            </p>
            <p>
              student submissions (include assessment their submitting for -
              also dropdown to chooose the assessment teacher wishes to see)
            </p>
          </Tabs.TabPane>
        </Tabs>
        {/* Course Paticipant Table that takes in class id and course id, and sessId */}
      </div>

      <Drawer
        visible={showDrawer}
        onClose={() => setShowDrawer(false)}
        title={comp}
      >
        {comp === "Add Participant" && (
          <AddCourseParticipantForm {...{ courseId, levelId: classId }} />
        )}
      </Drawer>
    </div>
  );
};

export default SingleCourseWrapper;
