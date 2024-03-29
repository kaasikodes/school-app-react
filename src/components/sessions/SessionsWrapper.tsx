import {
  Breadcrumb,
  Button,
  Card,
  Drawer,
  Modal,
  Steps,
  Typography,
} from "antd";
import { ExclamationCircleOutlined, LoadingOutlined } from "@ant-design/icons";

import React, { useContext, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { IAuthDets } from "../../appTypes/auth";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import {
  QUERY_KEY_FOR_SESSION_COMPLETION,
  useEndSchoolSession,
  useFetchSessions,
  useFetchSingleSessionTaskCompletion,
  useIssueResultForSession,
} from "../../helpersAPIHooks/sessions";
import { routes } from "../../routes";
import CreateAssessmentTemplate from "../assessments/settings/CreateAssessmentTemplate";
import GradingPolicy from "../assessments/settings/GradingPolicy";
import ClassesForSessionSetUp from "../classes/settings/ClassesForSessionSetUp";
import SetupClassesTeacherForSession from "../classes/settings/SetupClassesTeacherForSession";
import SetupCoursesTaughtInEachClass from "../classes/settings/SetupCoursesTaughtInEachClass";
import SessionCourseEnrollmentPolicy from "../courses/SessionCourseEnrollmentPolicy";
import AssignStaffToCourse from "../courses/settings/AssignStaffToCourse";
import SessionStudentEnrollmentPolicy from "../students/SessionStudentEnrollmentPolicy";
import SessionStudentPromotionPolicy from "../students/SessionStudentPromotionPolicy";
import AddSessionForm from "./AddSessionForm";
import SetUpCurrentSessionForm from "./SetUpCurrentSessionForm";
import { openNotification } from "helpers/notifications";
import { useQueryClient } from "react-query";

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
  const queryClient = useQueryClient();

  const [action, setAction] = useState<EAction>(EAction.NO_ACTION);
  const [showD, setShowD] = useState(false);
  const handleAction = (val: EAction) => {
    setAction(val);
    setShowD(true);
  };
  const whatSize = action === EAction.START_NEW_SESSION;
  //   const whatSize = action === EAction.NO_ACTION;
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const currentSchool = globalState.currentSchool;

  const currentSchoolSessionId = currentSchool?.currentSessionId as string;

  const token = authDetails.userToken;
  const { data: sessions, isSuccess: isSessSuccess } = useFetchSessions({
    token,
    schoolId: currentSchool?.id as string,
  });
  const currentSchoolSessionDetail = sessions?.data.find(
    (item) => item.id === +currentSchoolSessionId
  );

  const { data: sessionTaskCompletion } = useFetchSingleSessionTaskCompletion({
    token,
    sessionId: currentSchoolSessionId,
  });
  const { mutate: issResultMutate } = useIssueResultForSession();
  const issueResult = () => {
    openNotification({
      state: "info",
      title: "Wait a second ...",
      description: <LoadingOutlined />,
    });
    issResultMutate(
      {
        sessionId: +currentSchoolSessionId,
        token,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
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
            queryKey: [QUERY_KEY_FOR_SESSION_COMPLETION],
            // exact: true,
          });
        },
      }
    );
  };
  const handleIssueResult = () => {
    Modal.confirm({
      title: `Do you Want to issue academic results for this session?`,
      icon: <ExclamationCircleOutlined />,

      content:
        "This will enable students to be able to view/downlaod their final academic results, as well as their custodians",
      width: 600,
      onOk() {
        issueResult();
      },
    });
  };
  const { mutate: endSessMutate } = useEndSchoolSession();
  const endSession = () => {
    // only allow this to happen if the necessary steps have been completed
    openNotification({
      state: "info",
      title: "Wait a second ...",
      description: <LoadingOutlined />,
    });
    endSessMutate(
      {
        sessionId: +currentSchoolSessionId,
        token,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
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
            queryKey: [QUERY_KEY_FOR_SESSION_COMPLETION],
            // exact: true,
          });
        },
      }
    );
  };
  const handleEndSession = () => {
    Modal.confirm({
      title: `Do you want to end this academic session?`,
      icon: <ExclamationCircleOutlined />,

      content: "This implies that all activities in this session will not be ",
      width: 600,
      onOk() {
        endSession();
      },
    });
  };
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
              <Link to={routes.sessions}>Sessions</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span>{currentSchoolSessionDetail?.name}</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="mt-8 grid md:grid-cols-3 grid-cols-1 gap-8">
          <div className="col-span-2">
            <Card className="shadow-lg ">
              <Typography.Title level={5}>
                Tasks to be completed
              </Typography.Title>
              <div className="mt-4">
                <Steps
                  progressDot
                  current={sessionTaskCompletion?.status}
                  direction="vertical"
                >
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
                    description="This involves updating the current school session and configuring the settings that will be used during the academic session"
                  />
                  <Step
                    title={
                      <Link to={routes.departments}>
                        <span className="text-[#109fff]">
                          Setup Departments
                        </span>
                      </Link>
                    }
                    description="This involves setting up the departments that will be used to group courses"
                  />
                  <Step
                    title={
                      <Link to={routes.classes}>
                        <span className="text-[#109fff]">Setup Classes</span>
                      </Link>
                    }
                    description="This involves setting up the classes which various courses will be taught in"
                  />
                  <Step
                    title={
                      <Link to={routes.courses}>
                        <span className="text-[#109fff]">Setup courses</span>
                      </Link>
                    }
                    description="This involves creating the courses that will be taught, as well as establishing the classes these courses will be taught in"
                  />

                  <Step
                    title={
                      <Link to={routes.staff}>
                        <span className="text-[#109fff]">Setup Staff</span>
                      </Link>
                    }
                    description={
                      "This involves adding the staff that will be responsible for handling classes, courses, as well other academic activities within the system."
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
                    description="Add students to your school."
                  />

                  <Step
                    title={<span className="text-[#109fff]">Compile CA</span>}
                    description="The compilation process begins the moment a teacher records the assessment of a student"
                  />
                  <Step
                    title={
                      <span className="text-[#109fff]">Review Compiled CA</span>
                    }
                    description="This involves every course teacher reviewing the assessments recorded and signing off on the assessment in order for results to be issued."
                  />
                  <Step
                    title={
                      <span
                        className="text-[#109fff] cursor-pointer"
                        onClick={() => handleIssueResult()}
                      >
                        Issue Result
                      </span>
                    }
                    description="This will issue out result to students, and copies of the result will also be available for concerned parties"
                  />
                  <Step
                    title={
                      <span
                        className="text-[#109fff] cursor-pointer"
                        onClick={() => handleEndSession()}
                      >
                        End Current Session
                      </span>
                    }
                    description="This will end the current academic session"
                  />
                </Steps>
              </div>
            </Card>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-end">
              <Button
                onClick={() => handleAction(EAction.START_NEW_SESSION)}
                type="primary"
              >
                Add Session
              </Button>
            </div>
            <Card className="shadow-lg ">
              <Typography.Title level={5}>All Sessions</Typography.Title>
              <div className="flex flex-col gap-2">
                {isSessSuccess ? (
                  sessions.data.map(({ id, name, starts, ends }) => (
                    <Link to={`${routes.sessions}/${id}`}>
                      {name} ({starts} - {ends ? ends : "present"})
                    </Link>
                  ))
                ) : (
                  <BeatLoader color="#7393B3" />
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default SessionsWrapper;
