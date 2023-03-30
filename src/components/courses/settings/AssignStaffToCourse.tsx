import { Button, Collapse, message, Steps, Tag, Typography } from "antd";
import { useState } from "react";
import { AssignStaffAsSessionTeacher } from "./AssignStaffAsSessionTeacher";
import SelectClassForm from "./SelectClassForm";

const { Step } = Steps;
const { Panel } = Collapse;

const AssignStaffToCourse = () => {
  const [currentClass, setCurrentClass] = useState<number>();
  const handleCurrentClass = (val: number) => {
    setCurrentClass(val);
  };

  const steps = [
    {
      title: "Select Course",
      content: <SelectClassForm handleCurrentClass={handleCurrentClass} />,
    },
    {
      title: "Assign teachers to courses",
      content: <AssignStaffAsSessionTeacher />,
    },
    {
      title: "Confirm Selection",
      content: (
        <div>
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
