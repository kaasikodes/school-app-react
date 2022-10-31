import { Form, Button, Typography, Checkbox, Input, Select } from "antd";
import React from "react";
import { IClassEntry } from "../ClassesTable";

const SetupClassesTeacherForSession = () => {
  const handleSubmit = (data: any) => {
    console.log("DATA TEACH", data);
  };
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
      id: " 1",
      studentCount: 0,
      teacherCount: 0,
      description: "",
    },
    {
      name: "Jss3",
      courseCount: 0,
      id: "3",
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
              Save Class Teachers
            </Button>
          </div>
          <div className="mt-2">
            <Typography.Title level={5}>
              Select the class teacher for each class
            </Typography.Title>

            <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
              {levels.map((item: IClassEntry) => (
                <Form.Item
                  name={`${item.id}`}
                  label={item.name}
                  labelCol={{ span: 24 }}
                  // wrapperCol={{ span: 24 }}
                >
                  <Select key={item.id} placeholder={`${item.name}`}>
                    <Select.Option value="1" key={"1"}>
                      test
                    </Select.Option>
                    <Select.Option value="2" key={"2"}>
                      test2
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

export default SetupClassesTeacherForSession;
