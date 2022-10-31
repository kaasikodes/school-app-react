import { Breadcrumb, Card, Drawer, Steps, Typography } from "antd";

import React, { useState } from "react";
import { Link } from "react-router-dom";
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

const { Step } = Steps;

enum EAction {
  START_NEW_SESSION = "Start New Session",
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
                <Steps progressDot current={0} direction="vertical">
                  <Step
                    title={
                      <Typography.Text
                        className="cursor-pointer"
                        onClick={() => handleAction(EAction.START_NEW_SESSION)}
                      >
                        <span className="text-[#109fff]">
                          Start new session
                        </span>
                      </Typography.Text>
                    }
                    description="This will begin a new academic session"
                  />
                  <Step
                    title={
                      <Typography.Text
                        className="cursor-pointer"
                        onClick={() =>
                          handleAction(EAction.STUDENT_ENROLLMENT_POLICY)
                        }
                      >
                        <span className="text-[#109fff]">
                          Student Enrollment Policy
                        </span>
                      </Typography.Text>
                    }
                    description="Establish the policy for the student enrollment policy"
                  />
                  <Step
                    title={
                      <Typography.Text
                        className="cursor-pointer"
                        onClick={() =>
                          handleAction(EAction.COURSE_ENROLLMENT_POLICY)
                        }
                      >
                        <span className="text-[#109fff]">
                          Course Enrollment Policy
                        </span>
                      </Typography.Text>
                    }
                    description="Establish the policy for the student enrollment policy"
                  />
                  <Step
                    title={
                      <Typography.Text
                        className="cursor-pointer"
                        onClick={() => handleAction(EAction.GRADING_POLICY)}
                      >
                        <span className="text-[#109fff]">Grading Policy</span>
                      </Typography.Text>
                    }
                    description="What is the grading policy used for this session (research on common ones & also allow them to create custom policies)"
                  />
                  <Step
                    title={
                      <Typography.Text
                        className="cursor-pointer"
                        onClick={() =>
                          handleAction(EAction.STUDENT_PROMOTION_POLICY)
                        }
                      >
                        <span className="text-[#109fff]">
                          {EAction.STUDENT_PROMOTION_POLICY}
                        </span>
                      </Typography.Text>
                    }
                    description="What is the grading policy used for this session (research on common ones & also allow them to create custom policies)"
                  />

                  <Step
                    title={
                      <Typography.Text
                        className="cursor-pointer"
                        onClick={() =>
                          handleAction(EAction.SETUP_CLASSES_FOR_SESSION)
                        }
                      >
                        <span className="text-[#109fff]">
                          {EAction.SETUP_CLASSES_FOR_SESSION}
                        </span>
                      </Typography.Text>
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
                          Set up Class Teachers
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
                          handleAction(
                            EAction.SETUP_COURSES_TAUGHT_IN_EACH_CLASS
                          )
                        }
                      >
                        <span className="text-[#109fff]">
                          Establish the class courses will be taught in
                        </span>
                      </Typography.Text>
                    }
                    description="Assign staff to the courses they will be teaching this session.| OPTIONS: student, admin, custodian | the policy should also detect wether the course teacher needs to approve of a student participating in a course"
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
                      <Typography.Text
                        className="cursor-pointer"
                        onClick={() =>
                          handleAction(
                            EAction.CREATE_OR_SELECT_ASSESSMENT_TEMPLATE
                          )
                        }
                      >
                        <span className="text-[#109fff]">
                          {EAction.CREATE_OR_SELECT_ASSESSMENT_TEMPLATE}
                        </span>
                      </Typography.Text>
                    }
                    description="Select or create a template to be applied to assessments for this session"
                  />
                  {/* if the student enrollment policy says that the admin should enroll students for this session */}
                  {
                    <Step
                      title={<Link to="/students">Enroll students</Link>}
                      description="Enroll students for their courses this session"
                    />
                  }

                  <Step
                    title={
                      <Link to="/courses/id">
                        Review Course assesment Submissions
                      </Link>
                    }
                    description="Have all classes submitted their CA | Also applies to class teachers = Have all course taeacher submitted their CA"
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
                    title={<Link to="/courses/id">Submit/Send CA</Link>}
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
          <div className="flex justify-end items-start">
            <Card className="shadow-lg ">
              <Typography.Title level={5}>Previous Sessions</Typography.Title>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default SessionsWrapper;
