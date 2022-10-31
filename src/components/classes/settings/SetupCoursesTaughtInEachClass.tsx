import { Form, Button, Typography, Select } from "antd";
import React from "react";
import { ICourseEntry } from "../../courses/SchoolSessionCoursesTable";

const SetupCoursesTaughtInEachClass = () => {
  const handleSubmit = (data: any) => {
    console.log("DATA TEACH", data);
  };
  const courses: ICourseEntry[] = [
    {
      id: "23",
      addedBy: "James",
      createdAt: "2 minutes ago",
      isActive: true,
      levelCount: 23,
      name: "Physics",
      studentCount: 0,
      teacherCount: 0,
      description: "weird",
    },
    {
      id: "24",
      addedBy: "James",
      createdAt: "2 minutes ago",
      isActive: true,
      levelCount: 23,
      name: "Chemistry",
      studentCount: 0,
      teacherCount: 0,
      description: "weird",
    },
  ];
  return (
    <div>
      {" "}
      <div className="mt-6">
        <Form onFinish={handleSubmit} initialValues={{ Quantum: true }}>
          <div className="flex items-center justify-end">
            <Button type="primary" htmlType="submit">
              Save Classes for Course
            </Button>
          </div>
          <div className="mt-2">
            <Typography.Title level={5}>
              Select the classes the course will be taught in
            </Typography.Title>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              {courses.map((item: ICourseEntry) => (
                <Form.Item
                  name={`${item.id}`}
                  label={item.name}
                  labelCol={{ span: 24 }}
                  // wrapperCol={{ span: 24 }}
                >
                  <Select
                    key={item.id}
                    placeholder={`${item.name}`}
                    mode="multiple"
                  >
                    <Select.Option value="1" key={"1"}>
                      Jss1A
                    </Select.Option>
                    <Select.Option value="2" key={"2"}>
                      Jss1A
                    </Select.Option>
                    <Select.Option value="3" key={"3"}>
                      Jss2
                    </Select.Option>
                  </Select>
                </Form.Item>
              ))}
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SetupCoursesTaughtInEachClass;
