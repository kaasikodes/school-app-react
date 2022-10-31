import { Typography, Breadcrumb, Form, Checkbox, Button, Input } from "antd";

import React from "react";
import { useAuthUser } from "react-auth-kit";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { IAuthDets } from "../../../appTypes/auth";
import { getCourses } from "../../../helpers/courses";
import { ICourseEntry } from "./SchoolCoursesTable";

const AssCourseToSessWrapper = () => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;
  const token = authDetails.userToken;
  const schoolId = authDetails.choosenSchoolId;
  const {
    data: courses,
    isLoading,
    isError,
    isFetched,
    isSuccess,
  } = useQuery<ICourseEntry, any, any, any>(
    ["courses"],
    () =>
      getCourses({
        token,
        schoolId: schoolId as string,
        limit: 1000,
      }),

    {
      select: (res: any) => {
        const result = res.data.data;
        console.log(res.data);

        const fCourses: ICourseEntry[] = result.map(
          (item: any): ICourseEntry => ({
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
          })
        );

        return fCourses;
      },
    }
  );
  const handleSubmit = (data: any) => {
    console.log("DATA ", data);
  };
  if (isLoading) {
    return <p>Loading ...</p>;
  }
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
          <Breadcrumb.Item>
            <Link to="associate-courses-to-session">
              Associate Courses to Session
            </Link>{" "}
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="mt-6">
        <Form onFinish={handleSubmit} initialValues={{ Quantum: true }}>
          <div className="flex items-center justify-end">
            <Button type="primary" htmlType="submit">
              Associate Courses
            </Button>
          </div>
          <div className="mt-2">
            <Form.Item
              name={"courses"}
              label={
                <Typography.Title level={5}>
                  Select the courses
                </Typography.Title>
              }
              labelCol={{ span: 24 }}
              // wrapperCol={{ span: 24 }}
            >
              <Checkbox.Group className="w-full">
                <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
                  {courses.map((item: ICourseEntry) => (
                    <div key={item.id}>
                      <Checkbox value={item.id}>{item.name}</Checkbox>
                    </div>
                  ))}
                </div>
              </Checkbox.Group>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AssCourseToSessWrapper;
