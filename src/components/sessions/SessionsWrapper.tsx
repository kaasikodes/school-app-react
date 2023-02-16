import { Breadcrumb, Button, Card, Drawer, Steps, Typography } from "antd";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../routes";
import CreateAssessmentTemplate from "../assessments/settings/CreateAssessmentTemplate";
import GradingPolicy from "../assessments/settings/GradingPolicy";
import ClassesForSessionSetUp from "../classes/settings/ClassesForSessionSetUp";
import SetupClassesTeacherForSession from "../classes/settings/SetupClassesTeacherForSession";
import SetupCoursesTaughtInEachClass from "../classes/settings/SetupCoursesTaughtInEachClass";
import AssignCourseTeacher from "../courses/AssignCourseTeacher";
import SessionCourseEnrollmentPolicy from "../courses/SessionCourseEnrollmentPolicy";
import AssignStaffToCourse from "../courses/settings/AssignStaffToCourse";
import SessionStudentEnrollmentPolicy from "../students/SessionStudentEnrollmentPolicy";
import SessionStudentPromotionPolicy from "../students/SessionStudentPromotionPolicy";
import AddSessionForm from "./AddSessionForm";
import SetUpCurrentSessionForm from "./SetUpCurrentSessionForm";

const { Step } = Steps;

enum EAction {
  START_NEW_SESSION = "Start new session",
  SET_UP_CURRENT_SESSION = "Set up current session",
  STUDENT_ENROLLMENT_POLICY = "Student Enrollment Policy",
  STUDENT_PROMOTION_POLICY = "Student Promotion Policy",
  COURSE_ENROLLMENT_POLICY = "Course Enrollment Policy",
  GRADING_POLICY = "Grading Policy",
  SETUP_CLASSES_FOR_SESSION = "Setting up classes for session",
  SETUP_CLASS_TEACHERS_FOR_SESSION = "Setting up class teachers for session",
  SETUP_COURSES_TAUGHT_IN_EACH_CLASS = "Setting up courses taught in each class",
  ASSIGN_COURSE_TEACHERS = "Assign Course Teachers",
  CREATE_OR_SELECT_ASSESSMENT_TEMPLATE = "Create or Assign Assessment Template to Session",
  NO_ACTION = "No Action",
}

const SessionsWrapper = () => {
  const [action, setAction] = useState<EAction>(EAction.NO_ACTION);
  const [showD, setShowD] = useState(false);
  const handleAction = (val: EAction) => {
    setAction(val);
    setShowD(true);
  };
  const whatSize = action === EAction.START_NEW_SESSION;
  //   const whatSize = action === EAction.NO_ACTION;
  return (
    <>
      <Drawer
        visible={showD}
        title={action}
        onClose={() => setShowD(false)}
        size={whatSize ? "default" : "large"}
      >
        {action === EAction.START_NEW_SESSION && (
          <AddSessionForm closeDrawer={() => setShowD(false)} />
        )}
        {action === EAction.SET_UP_CURRENT_SESSION && (
          <SetUpCurrentSessionForm closeDrawer={() => setShowD(false)} />
        )}
        {action === EAction.STUDENT_ENROLLMENT_POLICY && (
          <SessionStudentEnrollmentPolicy />
        )}
        {action === EAction.STUDENT_PROMOTION_POLICY && (
          <SessionStudentPromotionPolicy />
        )}
        {action === EAction.COURSE_ENROLLMENT_POLICY && (
          <SessionCourseEnrollmentPolicy />
        )}
        {action === EAction.GRADING_POLICY && <GradingPolicy />}
        {action === EAction.SETUP_CLASSES_FOR_SESSION && (
          <ClassesForSessionSetUp />
        )}
        {action === EAction.SETUP_CLASS_TEACHERS_FOR_SESSION && (
          <SetupClassesTeacherForSession />
        )}
        {action === EAction.SETUP_COURSES_TAUGHT_IN_EACH_CLASS && (
          <SetupCoursesTaughtInEachClass />
        )}
        {action === EAction.ASSIGN_COURSE_TEACHERS && <AssignStaffToCourse />}
        {action === EAction.CREATE_OR_SELECT_ASSESSMENT_TEMPLATE && (
          <div>
            <CreateAssessmentTemplate handleClose={() => setShowD(false)} />
            <p>OR</p>
            <p>Select an existing template</p>
          </div>
        )}
      </Drawer>
      <div>
        <div className="flex flex-col justify-between">
          <Typography.Title level={3}>Sessions</Typography.Title>

          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/courses">Sessions</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/courses/id">Current Session</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className=" mt-4 grid md:grid-cols-2 grid-cols-1 gap-8">
          <div>
            <Card className="shadow-lg ">
              <Typography.Title level={5}>
                Tasks to be completed
              </Typography.Title>

              <div className="mt-4">
                <Steps progressDot current={1} direction="vertical">
                  <Step
                    title={
                      <Typography.Text
                        className="cursor-pointer"
                        onClick={() =>
                          handleAction(EAction.SET_UP_CURRENT_SESSION)
                        }
                      >
                        <span className="text-[#109fff]">
                          Set up Current Session
                        </span>
                      </Typography.Text>
                    }
                    description="This will begin a new academic session"
                  />
                  <Step
                    title={
                      <Link to={routes.departments}>
                        <span className="text-[#109fff]">
                          Setup Departments
                        </span>
                      </Link>
                    }
                    description="Establish the policy for the student enrollment policy"
                  />
                  <Step
                    title={
                      <Link to={routes.classes}>
                        <span className="text-[#109fff]">Setup Classes</span>
                      </Link>
                    }
                    description="Establish the policy for the student enrollment policy"
                  />
                  <Step
                    title={
                      <Link to={routes.courses}>
                        <span className="text-[#109fff]">Setup courses</span>
                      </Link>
                    }
                    description="What is the grading policy used for this session (research on common ones & also allow them to create custom policies)"
                  />
                  {/* <Step ->is XXXXXX_NEEDED?
                    title={
                      <Typography.Text
                        className="cursor-pointer"
                        onClick={() =>
                          handleAction(EAction.STUDENT_PROMOTION_POLICY)
                        }
                      >
                        <span className="text-[#109fff]">
                          Create/Assign Course Assessment Template
                        </span>
                      </Typography.Text>
                    }
                    description="What is the grading policy used for this session (research on common ones & also allow them to create custom policies)"
                  /> */}

                  <Step
                    title={
                      <Link to={routes.staff}>
                        <span className="text-[#109fff]">Setup Staff</span>
                      </Link>
                    }
                    description={
                      <span title="Establish the courses that will be taught at each class in your school this session.">
                        What classes will be taught this session
                      </span>
                    }
                  />
                  <Step
                    title={
                      <Typography.Text
                        className="cursor-pointer"
                        onClick={() =>
                          handleAction(EAction.SETUP_CLASS_TEACHERS_FOR_SESSION)
                        }
                      >
                        <span className="text-[#109fff]">
                          Assign Class Teachers
                        </span>
                      </Typography.Text>
                    }
                    description="Assign teachers to head a class"
                  />

                  <Step
                    title={
                      <Typography.Text
                        className="cursor-pointer"
                        onClick={() =>
                          handleAction(EAction.ASSIGN_COURSE_TEACHERS)
                        }
                      >
                        <span className="text-[#109fff]">
                          {EAction.ASSIGN_COURSE_TEACHERS}
                        </span>
                      </Typography.Text>
                    }
                    description={
                      <span title="">
                        Establish the courses that will be taught at each class
                        in your school this session.
                      </span>
                    }
                  />
                  <Step
                    title={
                      <Link to={routes.students}>
                        <span className="text-[#109fff]">Enroll Students</span>
                      </Link>
                    }
                    description="Assign staff to the courses they will be teaching this session.| OPTIONS: student, admin, custodian | the policy should also detect wether the course teacher needs to approve of a student participating in a course"
                  />

                  <Step
                    title={<Link to="/courses/id">Compile CA</Link>}
                    description="Click on the compile button  to generate result (how to handle the queing of this like payroll) [you can download as well as roll back]"
                  />
                  <Step
                    title={<Link to="/courses/id">Review Compiled CA</Link>}
                    description="Have all classes submitted their CA | Also applies to class teachers = Have all course taeacher submitted their CA"
                  />
                  <Step
                    title={<Link to="/courses/id">Issue Result</Link>}
                    description="for Disbursement to student, and those
                    concerned(once clicked no going back cos it will be sent to parents)"
                  />
                  <Step
                    title={<Link to="/courses/id">End Current Session</Link>}
                    description="This will end the current academic session"
                  />
                </Steps>
              </div>
            </Card>
          </div>
          <div className="flex justify-end items-start ">
            <Card className="shadow-lg ">
              <Typography.Title level={5}>All Sessions</Typography.Title>
              <div className="flex flex-col gap-2">
                {Array(2)
                  .fill(0)
                  .map((item) => (
                    <Typography.Text>
                      Session 1 (12/03/2019 - 1/04/2020)
                    </Typography.Text>
                  ))}
              </div>
            </Card>
            <Button onClick={() => handleAction(EAction.START_NEW_SESSION)}>
              Add Session
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SessionsWrapper;
