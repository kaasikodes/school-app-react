import { Form, Button, Typography, Checkbox } from "antd";
import React from "react";
import { IClassEntry } from "../ClassesTable";

const ClassesForSessionSetUp = () => {
  const handleSubmit = () => {};
  const levels: IClassEntry[] = [
    {
      name: "Jss1",
      courseCount: 0,
      id: "0",
      studentCount: 0,
      teacherCount: 0,
      description: "",
    },
    {
      name: "Jss2",
      courseCount: 0,
      id: "1",
      studentCount: 0,
      teacherCount: 0,
      description: "",
    },
    {
      name: "Jss3",
      courseCount: 0,
      id: " 3",
      studentCount: 0,
      teacherCount: 0,
      description: "",
    },
    {
      name: "Sss3",
      courseCount: 0,
      id: "4",
      studentCount: 0,
      teacherCount: 0,
      description: "",
    },
  ];
  return (
    <div>
      {" "}
      <div className="mt-6">
        <Form onFinish={handleSubmit} initialValues={{ Quantum: true }}>
          <div className="flex items-center justify-end">
            <Button type="primary" htmlType="submit">
              Save Classes
            </Button>
          </div>
          <div className="mt-2">
            <Form.Item
              name={"courses"}
              label={
                <Typography.Title level={5}>
                  Select the classes that will be active this session
                </Typography.Title>
              }
              labelCol={{ span: 24 }}
              // wrapperCol={{ span: 24 }}
            >
              <Checkbox.Group className="w-full">
                <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
                  {levels.map((item: IClassEntry) => (
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

export default ClassesForSessionSetUp;
