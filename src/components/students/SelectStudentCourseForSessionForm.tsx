import { Checkbox, Collapse, Form, Select, Typography } from "antd";
import React from "react";
import { ICourseEntry } from "../courses/SchoolSessionCoursesTable";

const SelectStudentCourseForSessionForm = () => {
  return (
    <div>
      {" "}
      <Collapse.Panel header="Select Courses" key="3">
        <div className="my-2 flex justify-end">
          {/* should be a policy to prevent this field from showing */}
          <Form.Item label="Fliter By Class">
            <Select size="small" placeholder="Select courses by class" disabled>
              <Select.Option key="Jss 1a" value={12}>
                Jss 1a
              </Select.Option>
              <Select.Option key="Jss 2a" value={13}>
                Jss 2a
              </Select.Option>
            </Select>
          </Form.Item>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <Form.Item
            name={"courses"}
            label={
              <Typography.Title level={5}>Select the courses</Typography.Title>
            }
            labelCol={{ span: 24 }}
            // wrapperCol={{ span: 24 }}
          >
            <Checkbox.Group className="w-full">
              <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
                {true &&
                  [].map((item: ICourseEntry) => (
                    <div key={item.id}>
                      <Checkbox value={item.id}>{item.name}</Checkbox>
                    </div>
                  ))}
              </div>
            </Checkbox.Group>
          </Form.Item>
        </div>
      </Collapse.Panel>
    </div>
  );
};

export default SelectStudentCourseForSessionForm;
