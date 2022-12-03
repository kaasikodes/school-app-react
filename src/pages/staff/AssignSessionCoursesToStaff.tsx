import {
  Checkbox,
  Input,
  Skeleton,
  Typography,
  Form,
  Button,
  Spin,
} from "antd";
import React, { useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { IAuthDets } from "../../appTypes/auth";
import { IStaffEntry } from "../../appTypes/staff";
import { IClassEntry } from "../../components/classes/ClassesTable";
import { ICourseEntry } from "../../components/courses/SchoolSessionCoursesTable";
import { IStudentEntry } from "../../components/students/StudentsTable";
import { generalValidationRules } from "../../formValidation";
import {
  getCoursesGroupedByLevel,
  IASCParticipant,
  IASCTeacher,
} from "../../helpers/courses";
import { openNotification } from "../../helpers/notifications";
import { getSingleStaff } from "../../helpers/staff";
import { getStudent } from "../../helpers/students";
import {
  useAddSessionCourseParticipantHook,
  useAddSessionCourseTeacher,
} from "../../helpersAPIHooks/courses";

const AssignSessionCoursesToStaff = () => {
  let { staffId } = useParams();

  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  // const user = authDetails.user;
  const token = authDetails.userToken;
  const schoolId = authDetails.choosenSchoolId;
  const sessionId = authDetails.choosenSchoolCurrentSessionId ?? "1";
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [form] = Form.useForm();

  const handleSearch = (e: any) => {
    const val = e.target.value;
    setSearchTerm(val);
  };

  const handleCategoryClick = (val: number) => {
    console.log(val, "catLevel");
    setSelectedCategory(val);
  };

  const {
    data: staff,
    isSuccess,

    isFetching,
  } = useQuery<any, any, any, any>(
    ["single-staff", staffId],
    () => {
      return getSingleStaff({
        token,
        schoolId: schoolId as string,
        staffId: staffId as string,
        sessionId,
      });
    },
    {
      // refetchOnWindowFocus: false,
      onError: (err) => {
        openNotification({
          state: "error",
          title: "Error occures",
          description: `Oops, an err occured: ${err?.message}`,
        });
      },

      select: (res: any) => {
        const item = res.data;

        const data: IStaffEntry = {
          id: item.data.id,
          name: item.user.name,
          staffNo: item.staff_no,
          enrollmentStatus: true,
          photo: item.user.profile_photo_url ?? "",
        };

        return data;
      },
    }
  );

  const {
    data: courseData,

    isSuccess: isCSuccess,
  } = useQuery(
    ["coursesGroupedByLevel"],
    () =>
      getCoursesGroupedByLevel({
        token,
        schoolId: schoolId as string,
      }),

    {
      select: (res: any) => {
        const result = res.data.data;
        console.log(result, "new");

        // const fCourses: ICourseEntry[] = result.map(
        //   (item: any): ICourseEntry => ({
        //     id: item.id,
        //     name: item.name,
        //     description: item.description,
        //     department: item?.department_id,
        //     isActive: item.isActive,
        //     levelCount: item?.levelCount,
        //     studentCount: item?.studentCount,
        //     teacherCount: item?.teacherCount,
        //     addedBy: item?.addedBy,
        //     createdAt: item?.created_at,
        //   })
        // );

        const levels: IClassEntry[] = [];
        const courses: ICourseEntry[] = [];

        result.forEach((level: any) => {
          levels.push({ id: level.id, name: level.name });
          level.courses.forEach((item: any) => {
            courses.push({
              id: item.id,
              name: item.name,
              description: item.description,
              department: item?.department_id,
              isActive: item.isActive,
              levelCount: item?.levelCount,
              studentCount: item?.studentCount,
              teacherCount: item?.teacherCount,
              addedBy: item?.addedBy,
              createdAt: item?.created_at,
              levelId: item?.pivot?.level_id,
            });
          });
        });

        return {
          courses,
          levels: [
            {
              id: 0,
              name: "all",
            },
            ...levels,
          ],
        };
      },
    }
  );
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
  const { mutate, isLoading: isASCPLoading } = useAddSessionCourseTeacher();

  const handleSubmit = (data: any) => {
    if (sessionId && staffId && schoolId) {
      const props: IASCTeacher = {
        sessionId,
        token,
        staffId,
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
                <p>Assign session courses to Staff</p>
                <Typography.Title level={3}>{staff.name}</Typography.Title>
              </div>

              {/* body */}
              <div>
                {staff.enrollmentStatus ? (
                  <div>
                    <Form form={form} onFinish={handleSubmit}>
                      <div className="flex flex-col gap-4">
                        <Typography.Title level={5}>
                          Assign Courses
                        </Typography.Title>
                        {/* permission categories */}
                        <div className="flex flex-wrap gap-4 pb-3 border-b ">
                          {courseData.levels.map((item) => (
                            <div className="" key={item.id}>
                              <button
                                type="button"
                                className={` capitalize hover:bg-sky-700 hover:border-sky-700 focus:bg-sky-700 active:bg-sky-700 text-white block rounded-full text-sm cursor-pointer px-2 py-1 hover:text-white ${
                                  item.id === selectedCategory
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
                              {courseData.courses.map((item) => (
                                <div
                                  key={item.id}
                                  className={`${
                                    item.levelId === selectedCategory ||
                                    selectedCategory === 0
                                      ? //   ||
                                        //   searchTerm
                                        //     .toLowerCase()
                                        //     .search(item.name.toLowerCase()) !== -1
                                        "flex"
                                      : "hidden"
                                  }`}
                                >
                                  <Checkbox
                                    value={{
                                      courseId: item.id,
                                      levelId: item.levelId,
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
                    The Staff is not enrolled for this acaedemic session
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

export default AssignSessionCoursesToStaff;
