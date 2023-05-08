import { Typography, Input, Button, Breadcrumb, Tabs, Modal, Tag } from "antd";
import { ExclamationCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useFetchSingleClass } from "../../helpersAPIHooks/classes";
import { useFetchSingleCourse } from "../../helpersAPIHooks/courses";
import { routes } from "../../routes";
import ComponentLoader from "../loaders/ComponentLoader";
import AddCourseParticipantForm from "./AddCourseParticipantForm";
import CourseOverview from "./CourseOverview";
import CourseParticipantTable from "./CourseParticipantTable";

import useApiAuth from "hooks/useApiAuth";
import { openNotification } from "helpers/notifications";
import { useSubmitCourseAssesment4Compilation } from "helpersAPIHooks/courses/useSubmitCourseAssesment4Compilation";
import { useQueryClient } from "react-query";
import {
  QUERY_KEY_FOR_SINGLE_COURSE_TEACHER_RECORD,
  useFetchSingleStaffSingleCourseTeacherRecord,
} from "helpersAPIHooks/staff";

interface IProps {
  courseId: string;
  classId: string;
}
type TComp =
  | "Add Participant"
  | "Upload Assessmnet"
  | "Submit Assessment for Compilation"
  | "";
const SingleCourseWrapper = ({ courseId, classId }: IProps) => {
  const queryClient = useQueryClient();

  const [showDrawer, setShowDrawer] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { currentSchool, token, schoolId, sessionId } = useApiAuth();
  const [comp, setComp] = useState<TComp>("");

  const handleClick = (val: TComp) => {
    setComp(val);
    setShowDrawer(true);
  };

  const { data: courseTeacher } = useFetchSingleStaffSingleCourseTeacherRecord({
    courseId: +courseId,
    levelId: classId,
    sessionId: `${sessionId}`,
    schoolId: `${schoolId}`,
    token,
    staffId: currentSchool?.staffId as unknown as string,
  });

  const { isSuccess: isCSuccess, data: course } = useFetchSingleCourse({
    id: courseId as string,
    schoolId: `${schoolId}`,
    token,
  });
  const { isSuccess: isLSuccess, data: level } = useFetchSingleClass({
    id: classId as string,
    schoolId: `${schoolId}`,

    token,
  });
  const { mutate, isLoading } = useSubmitCourseAssesment4Compilation();

  const handleSubmit4Compilation = useCallback(() => {
    if (course && level) {
      openNotification({
        state: "info",
        title: "Wait a second ...",
        description: <LoadingOutlined />,
      });
      mutate(
        {
          courseId: course?.id,
          levelId: level?.id,
          staffId: +(currentSchool?.staffId as unknown as number) ?? 0,
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occured",
              description:
                err?.response.data.message ?? err?.response.data.error.message,
            });
          },
          onSuccess: (res: any) => {
            openNotification({
              state: "success",

              title: "Success",
              description: res.data.message,
              // duration: 0.4,
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_SINGLE_COURSE_TEACHER_RECORD],
            });
          },
        }
      );
    }
  }, [level, course, currentSchool, mutate, queryClient]);
  const showModal4AssCompilation = () => {
    Modal.confirm({
      title: `Do you Want to submit assessment for compilation?`,
      icon: <ExclamationCircleOutlined />,

      content:
        "This will submit assessment in its current state and will prevent you from making any changes",
      width: 600,
      onOk() {
        handleSubmit4Compilation();
      },
    });
  };

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
            <CourseOverview
              {...{ courseId: courseId as string, levelId: classId as string }}
            />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Participants" key="item-1">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 items-center md:flex-row  md:justify-between">
                <div>
                  <Input.Search
                    placeholder="Search by ID no."
                    onSearch={(val) => setSearchTerm(val)}
                    allowClear
                    onChange={(e) => e.target.value === "" && setSearchTerm("")}
                  />
                </div>

                {courseTeacher?.submitted_assessment_for_compilation ===
                  "NO" && (
                  <div className="flex gap-4">
                    <Button
                      onClick={() => handleClick("Add Participant")}
                      type="ghost"
                    >
                      Add Participant
                    </Button>

                    <Button
                      onClick={() => showModal4AssCompilation()}
                      type="primary"
                      loading={isLoading}
                    >
                      Submit Assessment for Compilation
                    </Button>

                    {/* <Button onClick={() => setShowDrawer(true)} type="ghost">
                    Upload Assessment
                  </Button>
                  <Button onClick={() => setShowDrawer(true)} type="primary">
                    Submit Assessment
                  </Button> */}
                  </div>
                )}
                {courseTeacher?.submitted_assessment_for_compilation ===
                  "YES" && (
                  <Tag color="green">
                    Course Assessment has been submitted for compilation
                  </Tag>
                )}
              </div>
              <div>
                <CourseParticipantTable
                  courseId={courseId as string}
                  levelId={classId as string}
                  searchParticipantTerm={searchTerm}
                  disableActions={
                    courseTeacher?.submitted_assessment_for_compilation ===
                    "YES"
                  }
                />
              </div>
            </div>
          </Tabs.TabPane>
          {/* TO DO -> list out teavhers 4 the course (available to everyone) */}
          {/* <Tabs.TabPane tab="Lessons" key="item-2">
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
                <div className="flex gap-2">
                  <Button onClick={() => setShowDrawer(true)} type="ghost">
                    Lesson Groups
                  </Button>
                  <Button onClick={() => setShowDrawer(true)} type="primary">
                    Add Lesson
                  </Button>
                </div>
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
          </Tabs.TabPane> */}
        </Tabs>
        {/* Course Paticipant Table that takes in class id and course id, and sessId */}
      </div>

      <Modal
        style={{ top: 30 }}
        open={showDrawer}
        onCancel={() => setShowDrawer(false)}
        title={comp}
        footer={null}
      >
        {comp === "Add Participant" && (
          <AddCourseParticipantForm
            {...{ courseId, levelId: classId }}
            closeModal={() => setShowDrawer(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default SingleCourseWrapper;
