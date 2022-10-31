import {
  Button,
  Col,
  Collapse,
  Form,
  message,
  Row,
  Select,
  Steps,
  Tag,
  Typography,
} from "antd";
import React, { useState } from "react";

const { Step } = Steps;
const { Panel } = Collapse;

const AssignStaffToCourse = () => {
  const [currentClass, setCurrentClass] = useState("");

  const steps = [
    {
      title: "Select Course",
      content: (
        <div className="w-full flex flex-col gap-4">
          <Typography.Title level={5}>
            Select the class for which you would like to assign course teachers
          </Typography.Title>
          <div className=" flex  justify-center ">
            <Select
              className="w-3/4"
              placeholder="Select a class"
              onChange={(val) => setCurrentClass(val)}
            >
              <Select.Option key={2} value="Test 1">
                Test 1
              </Select.Option>
              <Select.Option key={3} value="Test 3">
                Test 3
              </Select.Option>
            </Select>
          </div>
        </div>
      ),
    },
    {
      title: "Assign teachers to courses",
      content: (
        <div className="w-full flex flex-col gap-4">
          {/* "list of courses taught in the class selected, then a multiple select to allow teachers to be assigned then when teachers >= 1, a select populated from teachers will know allow for selection of primary teacher" */}
          <Typography.Title level={5}>
            Assign teachers to the courses taught in {currentClass}
          </Typography.Title>
          <Form labelCol={{ span: 4 }}>
            {["Physics", "Chemistry", "Geography"].map((item) => (
              <Row gutter={4}>
                <Col span={4}>
                  <span>{item}</span>
                </Col>
                <Col span={20}>
                  <div className="flex gap-2">
                    <Form.Item className="flex-1">
                      <Select placeholder="Select teacher(s)" mode="tags">
                        <Select.Option key={2} value="Test 1">
                          James Dauda
                        </Select.Option>
                        <Select.Option key={3} value="Test 3">
                          Matt Walsh
                        </Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item className="flex-1">
                      <Select placeholder="Select primary teacher">
                        <Select.Option key={2} value="Test 1">
                          James Dauda
                        </Select.Option>
                        <Select.Option key={3} value="Test 3">
                          Matt Walsh
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
              </Row>
            ))}
          </Form>
        </div>
      ),
    },
    {
      title: "Confirm Selection",
      content: (
        <div>
          {/* "The Class selcted will be shown, alongside the courses as an accordian with each accod showing teachers , and primary teacher" */}
          <Typography.Title level={5}>{currentClass} Courses</Typography.Title>
          <div className="flex flex-col gap-4">
            <Collapse accordion>
              {["Physics", "Chemistry", "Geography"].map((item) => (
                <Panel header={item} key={item}>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-3">
                      <Typography.Text className="font-semibold">
                        Teachers:
                      </Typography.Text>
                      <div>
                        {["Matt Walsh", "Peter Simon"].map((item) => (
                          <Tag key={item} color="#2db7f5">
                            {item}
                          </Tag>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Typography.Text className="font-semibold">
                        Main Teacher:
                      </Typography.Text>
                      <div>
                        {["Matt Walsh"].map((item) => (
                          <Tag key={item} color="#87d068">
                            {item}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  </div>
                </Panel>
              ))}
            </Collapse>
          </div>
        </div>
      ),
    },
  ];

  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  return (
    <div>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="w-full min-h-32 p-4 m-2 mt-6">
        {steps[current].content}
      </div>
      <div className="flex justify-end">
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignStaffToCourse;
