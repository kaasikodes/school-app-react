import {
  Checkbox,
  Input,
  Skeleton,
  Typography,
  Form,
  Button,
  Spin,
} from "antd";
import React, { useContext, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { IAuthDets } from "../../appTypes/auth";
import { TLevel } from "../../appTypes/levels";
import { IClassEntry } from "../../components/classes/ClassesTable";
import { ICourseEntry } from "../../components/courses/SchoolSessionCoursesTable";
import { ICGByLevel } from "../../components/students/singleStudent/StudentClasses";
import { IStudentEntry } from "../../components/students/StudentsTable";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { generalValidationRules } from "../../formValidation";
import {
  getCoursesGroupedByLevel,
  IASCParticipant,
} from "../../helpers/courses";
import { openNotification } from "../../helpers/notifications";
import {
  getStudent,
  getStudentCoursesGroupedByLevel,
} from "../../helpers/students";
import { useFetchClasses } from "../../helpersAPIHooks/classes";
import { useAddSessionCourseParticipantHook } from "../../helpersAPIHooks/courses";

interface ICourse {
  id: number;
  name: string;
  assessmentCount: number;
  breakdown: string;
  grade: string;
  total: number;
}

interface IReturnProps {
  coursesGroupedByLevel: ICGByLevel[];
  courses: ICourse[];
}

const AssignSessionCoursesToStudent = () => {
  let { studentId } = useParams();

  const auth = useAuthUser();
  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;

  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;
  const sessionId = globalState?.currentSchool?.currentSessionId as string;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<TLevel | undefined>(
    undefined
  );
  const [form] = Form.useForm();

  const handleSearch = (e: any) => {
    const val = e.target.value;
    setSearchTerm(val);
  };

  const handleCategoryClick = (val: number) => {
    const level = classesData?.data.find((item) => item.id === val);
    setSelectedCategory(level);
  };

  const {
    data: student,
    isSuccess,
    error,
    refetch,
    isFetching,
  } = useQuery<any, any, any, any>(
    ["single-student", studentId],
    () => {
      return getStudent({
        token,
        schoolId: schoolId as string,
        studentId: studentId as string,
        sessionId,
      });
    },
    {
      refetchOnWindowFocus: false,
      onError: (err) => {
        openNotification({
          state: "error",
          title: "Error occures",
          description: `Oops, an err occured: ${err?.message}`,
        });
      },

      select: (res: any) => {
        const item = res.data;

        const data: IStudentEntry = {
          id: item.data.id,
          name: item.user.name,
          studentNo: item.data.id_number,
          photo: item.user.profile_photo_url ?? "",
          currentClass: item.currentLevel.name,
          sessionPaymentStatus: "not paid",
          enrollmentStatus: item.currentSessionEnrollmentStatus,
        };

        return data;
      },
    }
  );

  const {
    data: classesData,
    isError,
    isSuccess: isCSuccess,
  } = useFetchClasses({
    schoolId,
    token,
    pagination: {
      limit: 100,

      page: 1,
    },
    searchParams: {
      name: searchTerm,
    },
  });
  // TO DO
  // get student route
  // check if school fee is paid, if not inform the staff that student cannot be assigned courses cos of that
  // display student name
  // The courses of the current class will be selected, you would also be able to search for course name
  // The courses selected will be shown by the side along side the level name, no grouped by level
  //   the submission of this form (create a form component) fills out the course_participant_records table
  // this suppose to be dependent on the students enrolled for academic session, hence e_student_id
  // or should there be a check to see if student is enrolled for session (I think this better) - resource handles

  // student info from url
  // courses in the school as per each class
  const { mutate, isLoading: isASCPLoading } =
    useAddSessionCourseParticipantHook();

  const handleSubmit = (data: any) => {
    if (sessionId && studentId && schoolId) {
      const props: IASCParticipant = {
        sessionId,
        token,
        studentId,
        courses: data.courses,
        schoolId,
      };
      // return;
      openNotification({
        state: "info",
        title: "Wait a second ...",
        // description: <Progress percent={80} status="active" />,
        description: <Spin />,
      });
      mutate(props, {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          const result = res.data.data;

          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });

          form.resetFields();
        },
      });
    }
  };
  return (
    <div>
      <Skeleton active loading={isFetching}>
        {isSuccess && isCSuccess && (
          <>
            <div className="flex flex-col gap-4">
              <div>
                <p>Assign session courses to</p>
                <Typography.Title level={3}>{student.name}</Typography.Title>
              </div>

              {/* body */}
              <div>
                {student.enrollmentStatus ? (
                  <div>
                    <Form form={form} onFinish={handleSubmit}>
                      <div className="flex flex-col gap-4">
                        <Typography.Title level={5}>
                          Assign Courses
                        </Typography.Title>
                        {/* permission categories */}
                        <div className="flex flex-wrap gap-4 pb-3 border-b ">
                          {classesData.data.map((item) => (
                            <div className="" key={item.id}>
                              <button
                                type="button"
                                className={` capitalize hover:bg-sky-700 hover:border-sky-700 focus:bg-sky-700 active:bg-sky-700 text-white block rounded-full text-sm cursor-pointer px-2 py-1 hover:text-white ${
                                  item.id === selectedCategory?.id
                                    ? "bg-sky-700"
                                    : "bg-transparent border border-slate-400 text-slate-400"
                                }`}
                                onClick={() =>
                                  handleCategoryClick(
                                    item.id as unknown as number
                                  )
                                }
                              >
                                {item.name}
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-end my-2">
                          <div className="w-48">
                            <Input
                              onChange={handleSearch}
                              placeholder="Search courses"
                              disabled
                            />
                          </div>
                        </div>
                        <Form.Item
                          name="courses"
                          rules={generalValidationRules}
                        >
                          <Checkbox.Group style={{ width: "100%" }}>
                            <div className="my-6 grid grid-cols-4 gap-4">
                              {selectedCategory?.courses?.map((item) => (
                                <div key={item.id}>
                                  <Checkbox
                                    value={{
                                      courseId: item.id,
                                      levelId: selectedCategory.id,
                                    }}
                                    onChange={(e) => {
                                      console.log(e);
                                    }}
                                  >
                                    {item.name}
                                  </Checkbox>
                                </div>
                              ))}
                            </div>
                          </Checkbox.Group>
                        </Form.Item>
                        <Form.Item>
                          <Button type="primary" htmlType="submit">
                            Save
                          </Button>
                        </Form.Item>
                      </div>
                    </Form>
                  </div>
                ) : (
                  <div>
                    The Student is not enrolled for this acaedemic session
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </Skeleton>
    </div>
  );
};

export default AssignSessionCoursesToStudent;
